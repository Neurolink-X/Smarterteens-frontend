# Practical Learning Studios — engineering queue
Recorded 2026-11-26. Scope: six interconnected studios. Queued is not implemented or deployed. Extend the existing courses, labs, missions, diagnostic, and local learner roadmap; do not create duplicate engines or move unfinished work into public navigation as though it were ready.

## Shared learning contract
Each activity includes a concept, worked example, adjustable simulation or practical task, predicted outcome, feedback with reasoning, reflection and clear next step. Use stable activity IDs, versioned content, accessible controls, English/Hindi/Hinglish content review, mobile-first layouts, low-bandwidth local assets, keyboard support and reduced-motion support. Keep self-directed learning free to explore without an account. Do not collect minors' identifiers, real banking credentials, private health details or unreviewed public submissions. Record practice evidence separately from independently verified mastery. No invented outcomes, rankings, partner claims or certificates.

## P0 — Financial Intelligence Lab
Existing: money/profit/cash simulator, foundational math and budget check.
Queue FIN-01: monthly budgeting, needs versus wants, emergency reserve, fictional ledger and reconciliation.
FIN-02: banking and simulated UPI transactions, payee/amount confirmation, scam and OTP safety; no payment rail, real accounts or PINs.
FIN-03: loan/EMI, amortization, total interest, fees and zero-interest edge case. Show assumptions and rounding.
FIN-04: simple and compound interest, inflation and purchasing power, risk/diversification, fictional investment scenarios; no personalized advice or real transactions.
FIN-05: illustrative tax concepts with jurisdiction/date labels; current legal rates require verified primary sources, review and versioning.
Acceptance: mathematically tested results, invalid-input rejection, no misleading guaranteed returns, explanation of each output, scenario comparison.

## P0 — AI & Technology Lab
Existing: AI fact-checking, digital safety, web development and algorithms foundations.
Queue TECH-01: guided AI tool literacy, source verification, hallucination detection, responsible prompts.
TECH-02: coding playground with small HTML/CSS/JS applications, accessible task list, input validation, test cases and export of user-created code. Isolate untrusted execution in a sandbox without same-origin privileges, network or credentials.
TECH-03: visual automation and simulated agent workflows (trigger, conditions, actions, verification, failure recovery); no external actions by default.
TECH-04: defensive cybersecurity exercises in fictional/offline environments, phishing recognition, credential safety, permissions and secure coding.
TECH-05: real AI tutor integration only after provider selection, cost controls, child-safe output evaluation, privacy review and human escalation; clearly distinguish simulations from live AI.
Acceptance: repeatable projects and feedback, sandbox isolation tests, no secret exposure, no unsupported claims that a live AI service exists.

## P1 — Young Entrepreneur Studio
Existing: money simulator, customer discovery lesson, project briefs.
Queue BIZ-01: identify problem and customer, compare hypotheses, ethical research using fictional data or consenting trusted adults.
BIZ-02: business idea canvas, costing, pricing, unit economics, break-even, cash versus profit and inventory.
BIZ-03: brand identity and sample marketing, sales role-play, customer feedback, iteration and simulated monthly profitability.
Acceptance: complete staged journey with a fictional venture, calculated outputs consistent with existing money engine, downloadable project reflection without personal details; no real selling/payment requirement.

## P1 — Science & Engineering Lab
Existing: scientific reasoning, energy use and data-rate experiments.
Queue SCI-01: low-voltage virtual circuit, Ohm's law, series/parallel, power and energy; no mains wiring.
SCI-02: virtual levers, gears, pulleys, motion and forces, basic sensor/robot logic, renewable energy scenarios.
SCI-03: virtual construction concepts (loads, material trade-offs, stable shapes), not structural engineering approval.
SCI-04: age-appropriate chemistry and physics simulations, safe teacher-reviewed activities; avoid hazardous substances, heat, pressure and unsafe experiments.
Acceptance: explicit units and model assumptions, predictable results and boundary tests; independent educator/safety review before release.

## P1 — Career Discovery Studio
Existing: five interest-based roadmaps, career activities.
Queue CAREER-01: doctor, engineer, scientist, entrepreneur, designer and additional verified profession profiles with real responsibilities and multiple education routes.
CAREER-02: role-based fictional missions: clinical communication and hygiene (no diagnosis/treatment), engineering design, scientific evidence, business planning, accessible design.
CAREER-03: compare skills, daily tasks, education and interests; sources and dates for changing career requirements, no aptitude prediction, salary promises or stereotyping.
Acceptance: every profile has a project and links to actual available lessons, student controls interest selection and can reset it.

## P1 — Communication & Life Skills
Existing: claim/evidence, listening, pitching and design courses.
Queue LIFE-01: spoken English, pronunciation/listening exercises, everyday and professional dialogue, self-paced speaking scripts. Speech capture/AI feedback only after explicit consent and privacy review; provide non-microphone alternative.
LIFE-02: public speaking, negotiation, active listening, teamwork and leadership scenarios.
LIFE-03: decision-making with trade-offs, respectful disagreement, email and workplace communication, reflection rubric.
Acceptance: scenario feedback explains choices, multiple reasonable responses where appropriate, no unsupported emotion or personality inference.

## Integration and release order
1. Stabilize PR #15 and confirm latest CI, browser and production release gates.
2. Add a shared studio/activity catalog and reusable simulation shell, then FIN-01/03/04 and TECH-01/03.
3. Expand entrepreneur and science engines, followed by career and communication scenario libraries.
4. Add multilingual coverage, educator review, accessibility and performance budgets.
5. Add authenticated progress and guardian/teacher access only after dedicated database, authorization and privacy gates. Keep public pilot local-only until then.

Definition of done per activity: unit/boundary tests, user-flow smoke tests, real 360–430px mobile and desktop browser checks, no console errors, accessible input/output, content/safety review, no regression to existing course IDs/progress and verified deployment. Use free-tier resources where practical; no paid service activation without approval. Batch related commits to limit Vercel builds.
