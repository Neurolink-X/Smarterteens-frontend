-- Additive. Private, explicitly provisioned practice accounts only.
-- Practice checks are self-reported learning history, not official grades or certificates.
begin;
create table public.st_learning_accounts (
 user_id uuid primary key references auth.users(id),
 active boolean not null default false
);
create table public.st_cloud_progress (
 user_id uuid primary key references public.st_learning_accounts(user_id),
 checks jsonb not null default '{}'::jsonb check(jsonb_typeof(checks)='object' and octet_length(checks::text)<=16384),
 revision integer not null default 1 check(revision>0),
 updated_at timestamptz not null default now()
);
alter table public.st_learning_accounts enable row level security;
alter table public.st_cloud_progress enable row level security;
revoke all on public.st_learning_accounts,public.st_cloud_progress from public,anon,authenticated;
grant select on public.st_learning_accounts,public.st_cloud_progress to authenticated;
grant insert(user_id,checks) on public.st_cloud_progress to authenticated;
grant update(checks,revision) on public.st_cloud_progress to authenticated;
grant delete on public.st_cloud_progress to authenticated;
create policy learning_account_self on public.st_learning_accounts for select to authenticated
 using(user_id=(select auth.uid()) and active and not (select coalesce((auth.jwt()->>'is_anonymous')::boolean,false)));
create policy progress_self_read on public.st_cloud_progress for select to authenticated
 using(user_id=(select auth.uid()) and exists(select 1 from public.st_learning_accounts a where a.user_id=st_cloud_progress.user_id));
create policy progress_self_insert on public.st_cloud_progress for insert to authenticated
 with check(user_id=(select auth.uid()) and exists(select 1 from public.st_learning_accounts a where a.user_id=st_cloud_progress.user_id));
create policy progress_self_update on public.st_cloud_progress for update to authenticated
 using(user_id=(select auth.uid()) and exists(select 1 from public.st_learning_accounts a where a.user_id=st_cloud_progress.user_id))
 with check(user_id=(select auth.uid()) and exists(select 1 from public.st_learning_accounts a where a.user_id=st_cloud_progress.user_id));
create policy progress_self_delete on public.st_cloud_progress for delete to authenticated
 using(user_id=(select auth.uid()) and exists(select 1 from public.st_learning_accounts a where a.user_id=st_cloud_progress.user_id));
create function public.st_progress_revision() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if new.revision<>old.revision+1 then raise exception 'Invalid progress revision' using errcode='23514'; end if;
 new.updated_at=now();
 return new;
end $$;
revoke all on function public.st_progress_revision() from public,anon,authenticated;
create trigger st_progress_revision before update on public.st_cloud_progress for each row execute function public.st_progress_revision();
commit;
