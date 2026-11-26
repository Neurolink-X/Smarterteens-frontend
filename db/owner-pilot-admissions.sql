-- Reviewed draft: apply only after bootstrap.sql in dedicated SmarterTeens DB.
-- Synthetic enquiries only. No real student information.
begin;
create table public.st_admissions (
 id uuid primary key default gen_random_uuid(),
 institute_id uuid not null references public.st_institutes(id),
 code text not null check(code ~ '^[A-Za-z0-9_-]{2,32}$'),
 track text not null check(track in ('class11','class12','foundation','competitive','skills')),
 status text not null default 'new' check(status in ('new','contacted','enrolled','closed')),
 created_at timestamptz not null default now(),
 unique(institute_id,code)
);
create index st_admissions_tenant_created_idx on public.st_admissions(institute_id,created_at desc);
alter table public.st_admissions enable row level security;
revoke all on public.st_admissions from public,anon,authenticated;
grant select on public.st_admissions to authenticated;
grant insert(institute_id,code,track) on public.st_admissions to authenticated;
grant update(status) on public.st_admissions to authenticated;
create policy owner_read on public.st_admissions for select to authenticated using(exists(select 1 from public.st_institutes i where i.id=institute_id and i.owner_id=(select auth.uid())));
create policy owner_insert on public.st_admissions for insert to authenticated with check(exists(select 1 from public.st_institutes i where i.id=institute_id and i.owner_id=(select auth.uid())) and status='new');
create policy owner_update on public.st_admissions for update to authenticated using(exists(select 1 from public.st_institutes i where i.id=institute_id and i.owner_id=(select auth.uid()))) with check(exists(select 1 from public.st_institutes i where i.id=institute_id and i.owner_id=(select auth.uid())));
commit;
