-- Apply after all preceding migrations. No existing rows are removed.
begin;
create schema if not exists st_private;
revoke all on schema st_private from public,anon,authenticated;
grant usage on schema st_private to authenticated;
create table st_private.platform_admins(user_id uuid primary key references auth.users(id), active boolean not null default false);
create table st_private.account_controls(user_id uuid primary key references auth.users(id), suspended boolean not null default false, revision integer not null check(revision>0), updated_at timestamptz not null default now());
create table st_private.account_audit(
 id uuid primary key default gen_random_uuid(),actor_id uuid not null references auth.users(id),target_id uuid not null references auth.users(id),
 suspended boolean not null,revision integer not null,reason text not null check(reason in ('security','abuse','account_recovery','policy','resolved')),created_at timestamptz not null default now(),
 unique(target_id,revision)
);
create index account_audit_recent_idx on st_private.account_audit(created_at desc,id desc);
create index account_audit_actor_idx on st_private.account_audit(actor_id);
alter table st_private.platform_admins enable row level security;
alter table st_private.account_controls enable row level security;
alter table st_private.account_audit enable row level security;
revoke all on all tables in schema st_private from public,anon,authenticated;
-- Fixed search path; no caller-supplied identity, SQL, table names or privileged key.
create function st_private.account_allowed() returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and not coalesce((auth.jwt()->>'is_anonymous')::boolean,false)
 and exists(select 1 from auth.users u where u.id=auth.uid() and u.email_confirmed_at is not null)
 and not exists(select 1 from st_private.account_controls c where c.user_id=auth.uid() and c.suspended)
$$;
create function st_private.is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select st_private.account_allowed() and exists(select 1 from st_private.platform_admins a where a.user_id=auth.uid() and a.active)
$$;
create function public.st_account_allowed() returns boolean language sql stable security invoker set search_path='' as $$ select st_private.account_allowed() $$;
create policy st_active_account on public.st_institutes as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_batches as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_learners as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_attendance as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_invoices as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_receipts as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_admissions as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_memberships as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_teacher_batches as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_learner_access as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_platform_reviewers as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_plan_versions as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_subscription_quotes as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_quote_reviews as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_payment_requests as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_upi_claims as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_upi_decisions as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_learning_accounts as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_cloud_progress as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_marketplace_moderators as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_marketplace_listings as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create policy st_active_account on public.st_marketplace_reviews as restrictive for all to authenticated using ((select st_private.account_allowed())) with check ((select st_private.account_allowed()));
create function st_private.directory(search_text text,after_id uuid) returns jsonb language plpgsql stable security definer set search_path='' as $$
declare result jsonb;
begin
 if not st_private.is_admin() then raise exception 'Platform administrator required' using errcode='42501'; end if;
 if search_text is null or length(search_text)>120 then raise exception 'Invalid search' using errcode='22023'; end if;
 select coalesce(jsonb_agg(to_jsonb(q) order by q.id),'[]'::jsonb) into result from (
 select u.id,u.email,u.created_at,(u.email_confirmed_at is not null) as verified,
 coalesce(c.suspended,false) as suspended,coalesce(c.revision,0) as revision,
 exists(select 1 from st_private.platform_admins a where a.user_id=u.id) as protected,
 exists(select 1 from public.st_institutes i where i.owner_id=u.id) as owner,
 coalesce((select jsonb_agg(distinct m.role) from public.st_memberships m where m.user_id=u.id and m.active),'[]'::jsonb) as roles,
 exists(select 1 from public.st_learning_accounts l where l.user_id=u.id and l.active) as learning_enabled
 from auth.users u left join st_private.account_controls c on c.user_id=u.id
 where not coalesce(u.is_anonymous,false) and (after_id is null or u.id>after_id)
 and (search_text='' or strpos(lower(coalesce(u.email,'')),lower(search_text))>0 or strpos(u.id::text,lower(search_text))>0)
 order by u.id limit 51
 ) q;
 return result;
end $$;
create function st_private.change_account(target uuid,expected integer,desired boolean,reason_code text) returns jsonb language plpgsql security definer set search_path='' as $$
declare current_revision integer; current_suspended boolean;
begin
 if not st_private.is_admin() then raise exception 'Platform administrator required' using errcode='42501'; end if;
 if target is null or expected is null or expected<0 or desired is null or reason_code is null or reason_code not in ('security','abuse','account_recovery','policy','resolved') or (desired and reason_code='resolved') or (not desired and reason_code<>'resolved') then raise exception 'Invalid account action' using errcode='22023'; end if;
 if target=auth.uid() or exists(select 1 from st_private.platform_admins a where a.user_id=target) then raise exception 'Protected admin account' using errcode='42501'; end if;
 perform 1 from auth.users u where u.id=target and not coalesce(u.is_anonymous,false) for update;
 if not found then raise exception 'Account unavailable' using errcode='P0002'; end if;
 select c.revision,c.suspended into current_revision,current_suspended from st_private.account_controls c where c.user_id=target;
 current_revision=coalesce(current_revision,0);current_suspended=coalesce(current_suspended,false);
 if expected<>current_revision or desired=current_suspended then raise exception 'Stale or unchanged account state' using errcode='23505'; end if;
 insert into st_private.account_controls(user_id,suspended,revision) values(target,desired,current_revision+1)
 on conflict(user_id) do update set suspended=excluded.suspended,revision=excluded.revision,updated_at=now();
 insert into st_private.account_audit(actor_id,target_id,suspended,revision,reason) values(auth.uid(),target,desired,current_revision+1,reason_code);
 return jsonb_build_object('user_id',target,'suspended',desired,'revision',current_revision+1);
end $$;
create function st_private.overview() returns jsonb language plpgsql stable security definer set search_path='' as $$
begin
 if not st_private.is_admin() then raise exception 'Platform administrator required' using errcode='42501'; end if;
 return jsonb_build_object(
 'accounts',(select count(*) from auth.users where not coalesce(is_anonymous,false)),
 'verifiedAccounts',(select count(*) from auth.users where email_confirmed_at is not null and not coalesce(is_anonymous,false)),
 'suspendedAccounts',(select count(*) from st_private.account_controls where suspended),
 'institutes',(select count(*) from public.st_institutes),
 'activeMemberships',(select count(*) from public.st_memberships where active),
 'batches',(select count(*) from public.st_batches),
 'learnerRecords',(select count(*) from public.st_learners),
 'admissions',(select count(*) from public.st_admissions),
 'attendanceRecords',(select count(*) from public.st_attendance),
 'instituteInvoicePaise',(select coalesce(sum(amount_paise),0) from public.st_invoices),
 'instituteReceiptPaise',(select coalesce(sum(amount_paise),0) from public.st_receipts),
 'subscriptionQuotes',(select count(*) from public.st_subscription_quotes),
 'pendingQuotes',(select count(*) from public.st_subscription_quotes q where not exists(select 1 from public.st_quote_reviews r where r.quote_id=q.id)),
 'verifiedPlatformPaymentPaise',(select coalesce(sum(p.amount_paise),0) from public.st_payment_requests p join public.st_upi_decisions d on d.payment_id=p.id where d.decision='verified'),
 'pendingPaymentClaims',(select count(*) from public.st_upi_claims c where not exists(select 1 from public.st_upi_decisions d where d.claim_id=c.id)),
 'publishedListings',(select count(*) from public.st_marketplace_reviews where status='published'),
 'pendingListings',(select count(*) from public.st_marketplace_listings l where not exists(select 1 from public.st_marketplace_reviews r where r.listing_id=l.id)),
 'cloudAccounts',(select count(*) from public.st_cloud_progress),
 'newAccounts30d',(select count(*) from auth.users where created_at>=now()-interval '30 days' and not coalesce(is_anonymous,false)),
 'newAdmissions30d',(select count(*) from public.st_admissions where created_at>=now()-interval '30 days'),
 'generatedAt',now()
 );
end $$;
create function st_private.recent_audit() returns jsonb language plpgsql stable security definer set search_path='' as $$
begin
 if not st_private.is_admin() then raise exception 'Platform administrator required' using errcode='42501'; end if;
 return (select coalesce(jsonb_agg(to_jsonb(q) order by q.created_at desc,q.id desc),'[]'::jsonb) from (select id,actor_id,target_id,suspended,revision,reason,created_at from st_private.account_audit order by created_at desc,id desc limit 50) q);
end $$;
create function public.st_admin_directory(search_text text,after_id uuid) returns jsonb language sql stable security invoker set search_path='' as $$select st_private.directory(search_text,after_id)$$;
create function public.st_admin_change_account(target uuid,expected integer,desired boolean,reason_code text) returns jsonb language sql security invoker set search_path='' as $$select st_private.change_account(target,expected,desired,reason_code)$$;
create function public.st_admin_overview() returns jsonb language sql stable security invoker set search_path='' as $$select st_private.overview()$$;
create function public.st_admin_audit() returns jsonb language sql stable security invoker set search_path='' as $$select st_private.recent_audit()$$;
-- Public readiness only confirms a real Data API round-trip to the database.
create function public.st_readiness() returns boolean language sql stable security invoker set search_path='' as $$select true$$;
revoke all on all functions in schema st_private from public,anon,authenticated;
grant execute on function st_private.account_allowed(),st_private.is_admin(),st_private.directory(text,uuid),st_private.change_account(uuid,integer,boolean,text),st_private.overview(),st_private.recent_audit() to authenticated;
revoke all on function public.st_account_allowed(),public.st_admin_directory(text,uuid),public.st_admin_change_account(uuid,integer,boolean,text),public.st_admin_overview(),public.st_admin_audit(),public.st_readiness() from public,anon,authenticated;
grant execute on function public.st_account_allowed(),public.st_admin_directory(text,uuid),public.st_admin_change_account(uuid,integer,boolean,text),public.st_admin_overview(),public.st_admin_audit() to authenticated;
grant execute on function public.st_readiness() to anon,authenticated;
commit;
