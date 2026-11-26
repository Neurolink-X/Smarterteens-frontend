-- Only assigned teachers or existing owners may insert attendance.
begin;
create policy assigned_teacher_attendance_insert on public.st_attendance for insert to authenticated
 with check(exists(select 1 from public.st_memberships m where m.institute_id=st_attendance.institute_id and m.role='teacher')
 and exists(select 1 from public.st_learners l join public.st_teacher_batches b on b.institute_id=l.institute_id and b.batch_id=l.batch_id where l.institute_id=st_attendance.institute_id and l.id=st_attendance.learner_id));
commit;
