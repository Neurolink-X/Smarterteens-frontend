-- Apply to dedicated SmarterTeens production and QA after bootstrap and admissions.
-- Add only indexes; no data deletion or changes to permissions.
begin;
create index if not exists st_batches_recent_idx on public.st_batches(institute_id,created_at desc,id desc);
create index if not exists st_learners_recent_idx on public.st_learners(institute_id,created_at desc,id desc);
create index if not exists st_attendance_recent_idx on public.st_attendance(institute_id,created_at desc,id desc);
create index if not exists st_invoices_recent_idx on public.st_invoices(institute_id,created_at desc,id desc);
create index if not exists st_receipts_recent_idx on public.st_receipts(institute_id,created_at desc,id desc);
create index if not exists st_admissions_recent_idx on public.st_admissions(institute_id,created_at desc,id desc);
commit;
