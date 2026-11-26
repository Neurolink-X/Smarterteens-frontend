# Coaching OS delivery sequence
## Phase 1 — membership and read-only dashboards (this PR)
Add explicit active memberships, assigned teacher batches and approved/revocable learner links. The verified owner pilot remains unchanged. A member cannot change roles or assignments through the Data API. Institute admin reads own operational records; finance reads fees, receipts, batch and learner codes; teacher reads assigned batches and attendance; student/guardian read only linked learner codes and attendance. All are synthetic-data, invite-only pilot views. Privileged provisioning requires an authorized administrator outside the app. Guardian link approval is a technical gate, not proof of legal consent; no real minor records before consent, retention and safeguarding workflows are reviewed.
## Phase 2 — operational writes and revenue
Scoped admin and teacher mutations with audit trail, transactional admission conversion, batch schedules, pagination, full fee reconciliation. Add subscription plans, immutable price snapshots, plan entitlements, invoices, idempotent payment events, cancellation/refund and reconciliation; no real payment without provider and approval. Distinguish institute fee collection from platform revenue.
## Phase 3 — learning and assessment
Student cloud progress, role-scoped assessment assignment and server scoring, parent consent management, teacher review, optional cost-controlled AI draft generation; no AI grade or rank guarantee.
## Phase 4 — verified marketplace and control centre
Institute verification, moderation, published storefronts and search; platform-admin permission model, audit and operational health, no blanket client privileges. Separate access control tests and reviews.
## Release
Run all existing tests and new real two-tenant authenticated tests. Apply additive SQL only after qualification. Never drop old tables, repositories or production data; retire legacy code only after dependency and migration audits. No paid services. Production cloud parity and backup recovery remain separate checks.
