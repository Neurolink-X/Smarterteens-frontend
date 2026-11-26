-- STAGING ONLY. Never apply this marker to a production database.
-- Apply on a dedicated disposable SmarterTeens QA database after the pilot schemas.
begin;
create table public.st_qa_environment (
  id integer primary key check(id=1),
  purpose text not null check(purpose='synthetic-staging-only')
);
insert into public.st_qa_environment(id,purpose) values(1,'synthetic-staging-only');
alter table public.st_qa_environment enable row level security;
revoke all on public.st_qa_environment from public,anon,authenticated;
grant select on public.st_qa_environment to authenticated;
create policy qa_marker_read on public.st_qa_environment for select to authenticated using (not coalesce((select (auth.jwt()->>'is_anonymous')::boolean),false));
commit;
