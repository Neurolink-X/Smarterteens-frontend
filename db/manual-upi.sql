-- Additive manual payment records. No gateway, no auto-activation, no live payment in CI.
begin;
create table public.st_payment_requests (
 id uuid primary key default gen_random_uuid(),
 quote_id uuid not null unique references public.st_subscription_quotes(id),
 amount_paise bigint not null check(amount_paise between 100 and 1200000000),
 reviewer_id uuid not null references public.st_platform_reviewers(user_id),
 created_at timestamptz not null default now()
);
create table public.st_upi_claims (
 id uuid primary key default gen_random_uuid(),
 payment_id uuid not null references public.st_payment_requests(id),
 rrn text not null check(rrn ~ '^[0-9]{12}$'),
 created_at timestamptz not null default now(),
 unique(payment_id,rrn), unique(id,payment_id,rrn)
);
create table public.st_upi_decisions (
 claim_id uuid primary key,
 payment_id uuid not null,
 rrn text not null,
 reviewer_id uuid not null references public.st_platform_reviewers(user_id),
 decision text not null check(decision in ('verified','rejected')),
 created_at timestamptz not null default now(),
 foreign key(claim_id,payment_id,rrn) references public.st_upi_claims(id,payment_id,rrn)
);
create unique index st_verified_rrn_unique on public.st_upi_decisions(rrn) where decision='verified';
create unique index st_verified_payment_unique on public.st_upi_decisions(payment_id) where decision='verified';
create index st_payment_reviewer_idx on public.st_payment_requests(reviewer_id);
create index st_decision_reviewer_idx on public.st_upi_decisions(reviewer_id);
create index st_decision_payment_idx on public.st_upi_decisions(payment_id);
alter table public.st_payment_requests enable row level security;
alter table public.st_upi_claims enable row level security;
alter table public.st_upi_decisions enable row level security;
revoke all on public.st_payment_requests,public.st_upi_claims,public.st_upi_decisions from public,anon,authenticated;
grant select on public.st_payment_requests,public.st_upi_claims,public.st_upi_decisions to authenticated;
grant insert(quote_id,amount_paise,reviewer_id) on public.st_payment_requests to authenticated;
grant insert(payment_id,rrn) on public.st_upi_claims to authenticated;
grant insert(claim_id,payment_id,rrn,reviewer_id,decision) on public.st_upi_decisions to authenticated;
create policy payment_visible on public.st_payment_requests for select to authenticated
 using(exists(select 1 from public.st_subscription_quotes q where q.id=st_payment_requests.quote_id));
create policy payment_reviewer_create on public.st_payment_requests for insert to authenticated
 with check(reviewer_id=(select auth.uid()) and exists(select 1 from public.st_platform_reviewers)
 and exists(select 1 from public.st_quote_reviews r where r.quote_id=st_payment_requests.quote_id and r.decision='approved')
 and not exists(select 1 from public.st_subscription_quotes q join public.st_institutes i on i.id=q.institute_id where q.id=st_payment_requests.quote_id and i.owner_id=(select auth.uid())));
create policy claim_visible on public.st_upi_claims for select to authenticated
 using(exists(select 1 from public.st_payment_requests p where p.id=st_upi_claims.payment_id));
create policy claim_owner_create on public.st_upi_claims for insert to authenticated
 with check(exists(select 1 from public.st_payment_requests p join public.st_subscription_quotes q on q.id=p.quote_id join public.st_institutes i on i.id=q.institute_id where p.id=st_upi_claims.payment_id and i.owner_id=(select auth.uid())));
create policy decision_visible on public.st_upi_decisions for select to authenticated
 using(exists(select 1 from public.st_upi_claims c where c.id=st_upi_decisions.claim_id));
create policy decision_reviewer_create on public.st_upi_decisions for insert to authenticated
 with check(reviewer_id=(select auth.uid()) and exists(select 1 from public.st_platform_reviewers)
 and exists(select 1 from public.st_upi_claims c where c.id=st_upi_decisions.claim_id and c.payment_id=st_upi_decisions.payment_id and c.rrn=st_upi_decisions.rrn)
 and not exists(select 1 from public.st_payment_requests p join public.st_subscription_quotes q on q.id=p.quote_id join public.st_institutes i on i.id=q.institute_id where p.id=st_upi_decisions.payment_id and i.owner_id=(select auth.uid())));
-- Immutable records; a submitted reference never implies receipt. Verified decisions are unique by payment and reference.
commit;
