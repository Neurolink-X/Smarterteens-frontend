-- Additive marketplace. Only reviewed, published listings are public.
begin;
create table public.st_marketplace_moderators (
 user_id uuid primary key references auth.users(id), active boolean not null default false
);
alter table public.st_marketplace_moderators enable row level security;
revoke all on public.st_marketplace_moderators from public,anon,authenticated;
grant select on public.st_marketplace_moderators to authenticated;
create policy moderator_self on public.st_marketplace_moderators for select to authenticated
 using(user_id=(select auth.uid()) and active and not (select coalesce((auth.jwt()->>'is_anonymous')::boolean,false)));
create table public.st_marketplace_listings (
 id uuid primary key default gen_random_uuid(),
 institute_id uuid not null references public.st_institutes(id),
 display_name text not null check(length(btrim(display_name)) between 2 and 100),
 city text not null check(length(btrim(city)) between 2 and 80),
 subject text not null check(subject in ('school','competitive','skills','science','commerce')),
 description text not null check(length(btrim(description)) between 10 and 400),
 created_at timestamptz not null default now(),
 unique(institute_id,id)
);
create index st_listing_institute_idx on public.st_marketplace_listings(institute_id,created_at desc);
create table public.st_marketplace_reviews (
 listing_id uuid primary key,
 institute_id uuid not null,
 reviewer_id uuid not null references public.st_marketplace_moderators(user_id),
 status text not null check(status in ('published','rejected','withdrawn')),
 verified_identity boolean not null,
 verified_details boolean not null,
 reviewed_at timestamptz not null default now(),
 foreign key(institute_id,listing_id) references public.st_marketplace_listings(institute_id,id),
 check(status<>'published' or (verified_identity and verified_details))
);
create index st_market_review_institute_idx on public.st_marketplace_reviews(institute_id,listing_id);
create index st_market_review_reviewer_idx on public.st_marketplace_reviews(reviewer_id);
create index st_market_review_public_idx on public.st_marketplace_reviews(status,listing_id);
alter table public.st_marketplace_listings enable row level security;
alter table public.st_marketplace_reviews enable row level security;
revoke all on public.st_marketplace_listings,public.st_marketplace_reviews from public,anon,authenticated;
grant select(id,display_name,city,subject,description) on public.st_marketplace_listings to anon;
grant select(listing_id,status) on public.st_marketplace_reviews to anon;
grant select on public.st_marketplace_listings,public.st_marketplace_reviews to authenticated;
grant insert(institute_id,display_name,city,subject,description) on public.st_marketplace_listings to authenticated;
grant insert(listing_id,institute_id,reviewer_id,status,verified_identity,verified_details) on public.st_marketplace_reviews to authenticated;
grant update(status) on public.st_marketplace_reviews to authenticated;
create policy public_review_read on public.st_marketplace_reviews for select to anon,authenticated using(status='published');
create policy private_review_read on public.st_marketplace_reviews for select to authenticated
 using(exists(select 1 from public.st_marketplace_moderators) or exists(select 1 from public.st_institutes i where i.id=st_marketplace_reviews.institute_id and i.owner_id=(select auth.uid())));
create policy public_listing_read on public.st_marketplace_listings for select to anon,authenticated
 using(exists(select 1 from public.st_marketplace_reviews r where r.listing_id=st_marketplace_listings.id and r.status='published'));
create policy private_listing_read on public.st_marketplace_listings for select to authenticated
 using(exists(select 1 from public.st_marketplace_moderators) or exists(select 1 from public.st_institutes i where i.id=st_marketplace_listings.institute_id and i.owner_id=(select auth.uid())));
create policy owner_listing_create on public.st_marketplace_listings for insert to authenticated
 with check(exists(select 1 from public.st_institutes i where i.id=st_marketplace_listings.institute_id and i.owner_id=(select auth.uid())));
create policy moderator_review_create on public.st_marketplace_reviews for insert to authenticated
 with check(reviewer_id=(select auth.uid()) and exists(select 1 from public.st_marketplace_moderators)
 and status in ('published','rejected') and not exists(select 1 from public.st_institutes i where i.id=st_marketplace_reviews.institute_id and i.owner_id=(select auth.uid())));
create policy moderator_withdraw on public.st_marketplace_reviews for update to authenticated
 using(status='published' and reviewer_id=(select auth.uid()) and exists(select 1 from public.st_marketplace_moderators)
 and not exists(select 1 from public.st_institutes i where i.id=st_marketplace_reviews.institute_id and i.owner_id=(select auth.uid())))
 with check(status='withdrawn' and reviewer_id=(select auth.uid()) and exists(select 1 from public.st_marketplace_moderators));
-- Withdrawal is terminal; submit a new reviewed listing to republish.
commit;
