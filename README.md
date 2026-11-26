# SmarterTeens 2.0 — Next.js rebuild
Isolated draft replacement for the Vite frontend and new Java endpoints. Existing repository history and Java repository remain intact. No production data deletion or deployment promotion.
## Run
Node 22; npm install; npm test; npm run dev. npm run build for production. Generate and commit reviewed package-lock.json before release, switch CI to npm ci.
## Available in this branch
Responsive home, money simulation, three AI literacy questions, four career exploration activities, indicative coaching plan estimator, same-origin validated JSON APIs, and process health. No accounts, enrollments, payments or AI provider calls.
## Release gates
Review dependencies and generate lockfile; verify Vercel framework, root, output directory and Node version (no old Vite overrides); preview deployment; mobile accessibility and browser tests; review privacy and security. Keep preview noindex; enable indexing only after production approval. Do not merge before legacy feature parity or explicit release acceptance. Preserve existing production data and confirm backups before migration.
## Phases
1. Full-stack foundation and free learning labs (implemented in this branch, pending CI).
2. Secure institute onboarding: verify owners, roles and tenant isolation; admission, batches, attendance, fee ledger, receipts and audit logs. PostgreSQL schema proposal in docs, not applied.
3. Evidence-based student/teacher/parent portals; guardian links and consent; skill rubric and reviewed projects.
4. Payment provider sandbox, idempotent webhook reconciliation, subscription entitlements, refunds, pricing governance and analytics. Do not collect real funds before compliance review.
5. AI assistance with teacher review, limited costs, multilingual content, low-bandwidth mode and local institute marketplace.
6. Security/load/accessibility testing, migration rehearsal, feature parity and production release.
