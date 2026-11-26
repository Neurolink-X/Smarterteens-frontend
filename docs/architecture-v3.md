# SmarterTeens architecture decision — 2026-11-26

## Decision
Keep the Next.js App Router rebuild. Adopt TypeScript incrementally for frontend components, server handlers and shared contracts; existing JS modules remain supported during migration. Deploy Node.js route handlers in the existing Vercel Next.js project. No Java process or extra backend hosting is required by this application. Preserve the separate SmarterTeens Java repository as a reference/optional future service, not a production dependency. Do not delete its history.

## Current delivery
- Six existing API routes migrated to TypeScript, unchanged public paths, centralized response/error contracts, typed server-derived owner context. Existing bounded JSON reader and calculation engines remain in use.
- Node 22 CI runs typecheck, tests, production build and HTTP smoke tests. Pin dependency versions and commit a reproducible lockfile once regenerated from a trusted npm install.
- Supabase Auth and PostgreSQL use the existing pilot database adapter with publishable key and authenticated user token. No service-role credentials in the client. Existing bootstrap SQL is owner-only and not yet deployed here.
- Health endpoint reports configuration presence, not verified database health. Do not infer readiness from a successful HTTP response.

## Coaching OS multi-tenancy target
Owner, institute admin, teacher, finance staff, student and guardian roles. Institute membership is explicit and revocable; resolve membership server-side per request, with RLS as a second enforcement layer. Use institute_id on all tenant data and composite foreign keys. Teacher access limited to assigned batches, guardian only consented linked learners, finance only authorized fee operations. Avoid user-editable authorization metadata and cross-tenant search or cache leakage. Public branded websites expose published content only, with explicit tenant mapping, not operational data.
Add memberships, admissions, branding, schedules, attendance, ledger and receipts, assessments, progress evidence, guardian links, audit events and subscription entitlements through reviewed additive migrations. Keep payment and real student enrollment disabled until authorization, privacy and billing reviews and real database tests pass. The current owner-only API must not be described as complete staff or guardian RBAC.

## Deployment and database
Dedicated SmarterTeens Supabase project required; never reuse Neerva or AuroTap production databases. No dedicated SmarterTeens project was visible in the connected account during the audit. Provision only after organization and cost confirmation, then apply reviewed schema, configure Vercel server-only environment variables, test two independent tenant accounts and cross-tenant read/write attempts, review security advisors and backup/restore. Do not expose secret keys or enable paid infrastructure without approval.
Use one production branch (main), one canonical Vercel project, automated CI, authenticated end-to-end checks and verified production deployment. The older Vite project and its domain mappings must be retired only after a verified cutover.

## Next steps
1. Complete TypeScript migration of frontend and legacy JS service modules without changing route contracts.
2. Provision isolated database and verify owner pilot first.
3. Introduce tenant memberships and role authorization in SQL and TypeScript together; run real RLS adversarial tests.
4. Deliver Coaching OS revenue features in small reviewed vertical slices. AI-assisted tools stay optional and cost-controlled.
5. Add curriculum, Future World, simulation and portfolio modules with evidence/safety reviews, mobile and accessibility tests.
