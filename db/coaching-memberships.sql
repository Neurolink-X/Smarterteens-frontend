-- Additive migration; apply only after owner pilot migrations. No existing data is modified.
-- Staff/student/guardian access is read-only; privileged provisioning is out of band.
begin;
create table public.st_memberships (
 institute_id uuid not null references public.st_institutes(id),
 user_id uuid not null references auth.users(id),
 role text not null check(role in ('institute_admin','teacher','finance','student','guardian')),
 active boolean not null default false,
 created_at timestamptz not null default now(),
 primary key(institute_id,user_id)
);
create index st_memberships_user_idx on public.st_memberships(user_id,institute_id) where active;
create table public.st_teacher_batches (
 institute_id uuid not null,
 user_id uuid not null,
 batch_id uuid not null,
 primary key(institute_id,user_id,batch_id),
 foreign key(institute_id,user_id) references public.st_memberships(institute_id,user_id),
 foreign key(institute_id,batch_id) references public.st_batches(institute_id,id)
);
create index st_teacher_batches_batch_idx on public.st_teacher_batches(institute_id,batch_id);
create table public.st_learner_access (
 institute_id uuid not null,
 user_id uuid not null,
 learner_id uuid not null,
 approved_at timestamptz not null,
 revoked_at timestamptz,
 primary key(institute_id,user_id,learner_id),
 foreign key(institute_id,user_id) references public.st_memberships(institute_id,user_id),
 foreign key(institute_id,learner_id) references public.st_learners(institute_id,id),
 check(revoked_at is null or revoked_at >= approved_at)
);
create index st_learner_access_learner_idx on public.st_learner_access(institute_id,learner_id);
alter table public.st_memberships enable row level security;
alter table public.st_teacher_batches enable row level security;
alter table public.st_learner_access enable row level security;
revoke all on public.st_memberships,public.st_teacher_batches,public.st_learner_access from public,anon,authenticated;
grant select on public.st_memberships,public.st_teacher_batches,public.st_learner_access to authenticated;
create policy self_membership on public.st_memberships for select to authenticated
 using(user_id=(select auth.uid()) and active and not (select coalesce((auth.jwt()->>'is_anonymous')::boolean,false)));
create policy self_teacher_batch on public.st_teacher_batches for select to authenticated
 using(exists(select 1 from public.st_memberships m where m.institute_id=st_teacher_batches.institute_id and m.user_id=st_teacher_batches.user_id and m.role='teacher'));
create policy self_learner_link on public.st_learner_access for select to authenticated
 using(revoked_at is null and approved_at<=now() and exists(select 1 from public.st_memberships m where m.institute_id=st_learner_access.institute_id and m.user_id=st_learner_access.user_id and m.role in ('student','guardian')));
create policy member_institute_read on public.st_institutes for select to authenticated
 using(exists(select 1 from public.st_memberships m where m.institute_id=st_institutes.id));
-- Membership policies expose only the current active user's own row; these subqueries
-- deliberately depend on that RLS (no definer or privileged API key).
create policy staff_batch_read on public.st_batches for select to authenticated
 using(exists(select 1 from public.st_memberships m where m.institute_id=st_batches.institute_id and m.role in ('institute_admin','finance'))
 or exists(select 1 from public.st_teacher_batches a where a.institute_id=st_batches.institute_id and a.batch_id=st_batches.id));
create policy member_learner_read on public.st_learners for select to authenticated
 using(exists(select 1 from public.st_memberships m where m.institute_id=st_learners.institute_id and m.role in ('institute_admin','finance'))
 or exists(select 1 from public.st_teacher_batches a where a.institute_id=st_learners.institute_id and a.batch_id=st_learners.batch_id)
 or exists(select 1 from public.st_learner_access a where a.institute_id=st_learners.institute_id and a.learner_id=st_learners.id));
create policy member_attendance_read on public.st_attendance for select to authenticated
 using(exists(select 1 from public.st_memberships m where m.institute_id=st_attendance.institute_id and m.role in ('institute_admin','teacher','student','guardian'))
 and exists(select 1 from public.st_learners l where l.institute_id=st_attendance.institute_id and l.id=st_attendance.learner_id));
create policy admin_admission_read on public.st_admissions for select to authenticated
 using(exists(select 1 from public.st_memberships m where m.institute_id=st_admissions.institute_id and m.role='institute_admin'));
create policy staff_invoice_read on public.st_invoices for select to authenticated
 using(exists(select 1 from public.st_memberships m where m.institute_id=st_invoices.institute_id and m.role in ('institute_admin','finance')));
create policy staff_receipt_read on public.st_receipts for select to authenticated
 using(exists(select 1 from public.st_memberships m where m.institute_id=st_receipts.institute_id and m.role in ('institute_admin','finance')));
-- Direct Data API must still reject writes by nonowners: existing owner policies remain.
-- Add missing FK covering index without dropping any old index.
create index if not exists st_receipts_invoice_amount_idx on public.st_receipts(institute_id,invoice_id,amount_paise);
commit;
