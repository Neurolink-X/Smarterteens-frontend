-- SmarterTeens pilot schema. Apply ONLY to the dedicated SmarterTeens project.
-- Owner-only pilot; no real minors' personal data or live payments.
begin;
create table public.st_institutes (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null unique references auth.users(id),
 name text not null check (length(btrim(name)) between 2 and 100),
 created_at timestamptz not null default now()
);
create table public.st_batches (
 id uuid primary key default gen_random_uuid(),
 institute_id uuid not null references public.st_institutes(id),
 name text not null check (length(btrim(name)) between 2 and 80),
 created_at timestamptz not null default now(),
 unique(institute_id,id), unique(institute_id,name)
);
create table public.st_learners (
 id uuid primary key default gen_random_uuid(),
 institute_id uuid not null references public.st_institutes(id),
 batch_id uuid not null,
 code text not null check(code ~ '^[A-Za-z0-9_-]{2,32}$'),
 created_at timestamptz not null default now(),
 unique(institute_id,id), unique(institute_id,code),
 foreign key(institute_id,batch_id) references public.st_batches(institute_id,id)
);
create table public.st_attendance (
 id uuid primary key default gen_random_uuid(),
 institute_id uuid not null references public.st_institutes(id),
 learner_id uuid not null,
 day date not null,
 status text not null check(status in ('present','absent','late')),
 created_at timestamptz not null default now(),
 unique(institute_id,learner_id,day),
 foreign key(institute_id,learner_id) references public.st_learners(institute_id,id)
);
create table public.st_invoices (
 id uuid primary key default gen_random_uuid(),
 institute_id uuid not null references public.st_institutes(id),
 learner_id uuid not null,
 description text not null check(length(btrim(description)) between 2 and 100),
 amount_paise integer not null check(amount_paise between 100 and 100000000),
 due_on date not null,
 created_at timestamptz not null default now(),
 unique(institute_id,id,amount_paise),
 foreign key(institute_id,learner_id) references public.st_learners(institute_id,id)
);
create table public.st_receipts (
 id uuid primary key default gen_random_uuid(),
 institute_id uuid not null references public.st_institutes(id),
 invoice_id uuid not null,
 amount_paise integer not null,
 method text not null check(method in ('cash','bank_transfer','upi_offline')),
 created_at timestamptz not null default now(),
 unique(institute_id,invoice_id),
 foreign key(institute_id,invoice_id,amount_paise) references public.st_invoices(institute_id,id,amount_paise)
);
create index st_learners_batch_idx on public.st_learners(institute_id,batch_id);
create index st_invoices_learner_idx on public.st_invoices(institute_id,learner_id);
create index st_attendance_day_idx on public.st_attendance(institute_id,day desc);
create index st_invoices_due_idx on public.st_invoices(institute_id,due_on);
alter table public.st_institutes enable row level security;
revoke all on public.st_institutes from public,anon,authenticated;
grant select on public.st_institutes to authenticated;
grant insert(owner_id,name) on public.st_institutes to authenticated;
create policy st_owner_read on public.st_institutes for select to authenticated
 using(owner_id=(select auth.uid()) and not coalesce((select (auth.jwt()->>'is_anonymous')::boolean),false));
create policy st_owner_create on public.st_institutes for insert to authenticated
 with check(owner_id=(select auth.uid()) and not coalesce((select (auth.jwt()->>'is_anonymous')::boolean),false));
do $$
declare t text; columns text;
begin
 for t,columns in select * from (values
 ('st_batches','institute_id,name'),
 ('st_learners','institute_id,batch_id,code'),
 ('st_attendance','institute_id,learner_id,day,status'),
 ('st_invoices','institute_id,learner_id,description,amount_paise,due_on'),
 ('st_receipts','institute_id,invoice_id,amount_paise,method')
 ) v(t,c) loop
 execute format('alter table public.%I enable row level security',t);
 execute format('revoke all on public.%I from public,anon,authenticated',t);
 execute format('grant select on public.%I to authenticated',t);
 execute format('grant insert(%s) on public.%I to authenticated',columns,t);
 execute format('create policy owner_read on public.%I for select to authenticated using (exists(select 1 from public.st_institutes i where i.id=institute_id and i.owner_id=(select auth.uid())))',t);
 execute format('create policy owner_insert on public.%I for insert to authenticated with check (exists(select 1 from public.st_institutes i where i.id=institute_id and i.owner_id=(select auth.uid())))',t);
 end loop;
end $$;
commit;
