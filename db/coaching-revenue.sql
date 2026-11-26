-- Additive, pilot only. No payment collection or automatic entitlement.
begin;
create table public.st_platform_reviewers (
 user_id uuid primary key references auth.users(id),
 active boolean not null default false
);
alter table public.st_platform_reviewers enable row level security;
revoke all on public.st_platform_reviewers from public,anon,authenticated;
grant select on public.st_platform_reviewers to authenticated;
create policy reviewer_self on public.st_platform_reviewers for select to authenticated
 using(user_id=(select auth.uid()) and active and not (select coalesce((auth.jwt()->>'is_anonymous')::boolean,false)));
create table public.st_plan_versions (
 plan_code text not null check(plan_code in ('starter','pro','business')),
 version integer not null check(version>0),
 monthly_paise integer not null check(monthly_paise between 100 and 100000000),
 available boolean not null default false,
 primary key(plan_code,version),
 unique(plan_code,version,monthly_paise)
);
create unique index st_current_plan_idx on public.st_plan_versions(plan_code) where available;
insert into public.st_plan_versions values ('starter',1,49900,true),('pro',1,99900,true),('business',1,249900,true);
alter table public.st_plan_versions enable row level security;
revoke all on public.st_plan_versions from public,anon,authenticated;
grant select on public.st_plan_versions to authenticated;
create policy plan_read on public.st_plan_versions for select to authenticated using(available);
create table public.st_subscription_quotes (
 id uuid primary key default gen_random_uuid(),
 institute_id uuid not null references public.st_institutes(id),
 plan_code text not null,
 plan_version integer not null,
 monthly_paise integer not null,
 months integer not null check(months between 1 and 12),
 subtotal_paise bigint generated always as (monthly_paise::bigint*months) stored,
 request_key uuid not null,
 created_at timestamptz not null default now(),
 unique(institute_id,request_key),
 foreign key(plan_code,plan_version,monthly_paise) references public.st_plan_versions(plan_code,version,monthly_paise)
);
create index st_quote_plan_idx on public.st_subscription_quotes(plan_code,plan_version,monthly_paise);
create index st_quote_recent_idx on public.st_subscription_quotes(created_at desc,id desc);
alter table public.st_subscription_quotes enable row level security;
revoke all on public.st_subscription_quotes from public,anon,authenticated;
grant select on public.st_subscription_quotes to authenticated;
grant insert(institute_id,plan_code,plan_version,monthly_paise,months,request_key) on public.st_subscription_quotes to authenticated;
create policy quote_owner_read on public.st_subscription_quotes for select to authenticated
 using(exists(select 1 from public.st_institutes i where i.id=st_subscription_quotes.institute_id and i.owner_id=(select auth.uid())));
create policy quote_reviewer_read on public.st_subscription_quotes for select to authenticated
 using(exists(select 1 from public.st_platform_reviewers));
create policy quote_owner_create on public.st_subscription_quotes for insert to authenticated
 with check(exists(select 1 from public.st_institutes i where i.id=st_subscription_quotes.institute_id and i.owner_id=(select auth.uid()))
 and exists(select 1 from public.st_plan_versions p where p.plan_code=st_subscription_quotes.plan_code and p.version=st_subscription_quotes.plan_version and p.monthly_paise=st_subscription_quotes.monthly_paise and p.available));
create table public.st_quote_reviews (
 quote_id uuid primary key references public.st_subscription_quotes(id),
 reviewer_id uuid not null references public.st_platform_reviewers(user_id),
 decision text not null check(decision in ('approved','rejected')),
 created_at timestamptz not null default now()
);
create index st_review_reviewer_idx on public.st_quote_reviews(reviewer_id);
alter table public.st_quote_reviews enable row level security;
revoke all on public.st_quote_reviews from public,anon,authenticated;
grant select(quote_id,decision,created_at) on public.st_quote_reviews to authenticated;
grant insert(quote_id,reviewer_id,decision) on public.st_quote_reviews to authenticated;
create policy review_visible on public.st_quote_reviews for select to authenticated
 using(exists(select 1 from public.st_subscription_quotes q where q.id=st_quote_reviews.quote_id));
create policy reviewer_decision on public.st_quote_reviews for insert to authenticated
 with check(reviewer_id=(select auth.uid()) and exists(select 1 from public.st_platform_reviewers) and exists(select 1 from public.st_subscription_quotes q where q.id=st_quote_reviews.quote_id));
-- No update or delete grants: quote snapshots and decisions are immutable.
commit;
