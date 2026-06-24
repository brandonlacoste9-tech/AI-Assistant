---
name: justbookme-analyze
description: "Use for structured deep analysis of JustBookMe product, technical, or strategic decisions. Triggers: architecture trade-offs, build vs buy, scaling, GTM, pricing, feature prioritization, migration choices, risk assessment, /ultra-think, competing solutions, adversarial reasoning. Delivers confidence-calibrated recommendations with actionable next steps."
---

# JustBookMe Deep Analysis

Structured problem-solving for JustBookMe decisions — product, engineering, GTM, and operations.  
Use when the answer is not obvious and trade-offs matter.

After analysis concludes with implementation, hand off to the right skill:
- `justbookme-dev` / `justbookme-frontend` / `justbookme-backend` — build
- `justbookme-ui` — design audit
- `justbookme-prompts` — LLM prompt changes
- Cyberhound `supabase` — database/security

## When to use

- Architectural forks (e.g. new channel, new billing model, cron vs queue)
- Prioritization across batches (what ships before pilots?)
- Scaling or cost questions (Vapi minutes, SMS volume, Supabase limits)
- GTM choices (salon vs trade first, pricing experiments)
- "Should we…?" questions with real constraints

## Before analyzing

Identify from the user's question (ask up to **3 targeted questions** only if critical context is missing):

- **Core challenge** — what decision or outcome is actually at stake?
- **Constraints** — time, budget, solo/small team, Quebec market, bilingual, production at justbookme.ca
- **Assumptions** — what is being taken for granted?
- **Stakeholders** — operators (business owners), end customers (callers/bookers), founder/GTM

If the problem is specific enough, **proceed immediately** — do not pad with unnecessary questions.

## JustBookMe context defaults

Assume unless stated otherwise:

| Factor | Default |
|--------|---------|
| Product | Bilingual AI receptionist — voice (Vapi), SMS (Twilio), public book/embed |
| Stack | Next.js 15, Supabase, Stripe, Netlify |
| Stage | Early production — pilots > premature scale infrastructure |
| Market | Quebec service businesses — salons, trades, offices |
| Team size | Small — favor shipped increments over big rewrites |

## Required analysis elements

Address all of the following; depth scales with problem complexity:

1. **Problem framing** — What is actually being asked? Hidden assumptions in the question?
2. **Competing solutions** — ≥3 **meaningfully different** approaches (not minor variants)
3. **Multi-lens evaluation** — Pick relevant lenses: technical, economic, human/UX, systemic, temporal, regulatory (Quebec privacy/language). Justify which apply.
4. **Adversarial testing** — For each leading option: argue against it. What must be true for it to fail badly? Inversion: how would you guarantee failure — then avoid those paths.
5. **Cross-domain insight** — ≥1 non-obvious parallel from another field (hospitality ops, telecom IVR, franchise onboarding, etc.)
6. **Second-order effects** — 6 months / 2 years / 10 years per leading option
7. **Synthesis** — Recommended approach or hybrid; explicit trade-offs
8. **Confidence calibration** — High-uncertainty claims flagged; what evidence would change the recommendation

## Output template

Use this structure (omit sections that don't apply; don't pad):

```markdown
## Problem Analysis
- Core challenge
- Key constraints
- Critical success factors

## Solution Options
### Option 1: [Name]
- Description
- Pros / Cons
- Implementation approach (JustBookMe-specific files/systems if relevant)
- Risk assessment

### Option 2: [Name]
[Same structure]

### Option 3: [Name]
[Same structure]

## Recommendation
- Recommended approach
- Rationale (cite trade-offs from analysis)
- Implementation roadmap (ordered, concrete next steps)
- Success metrics
- Risk mitigation plan

## Alternative Perspectives
- Contrarian view
- Future considerations
- Areas for further research / data needed
```

## Output rules

- Evaluate each option on its own merits — not only relative ranking
- Reasoning chains explicit — conclusions tie to evidence or logic stated above
- Surface uncertainty — if data is insufficient, say what would resolve it
- Recommendation must be **actionable this week** — specific files, migrations, pilots, or metrics
- Length matches complexity — a 2-option bug triage needs less than a GTM strategy

## Analysis lenses (pick per problem)

| Lens | Questions |
|------|-----------|
| **Technical** | Fits current stack? Migration cost? `npm run build` / ops burden? |
| **Economic** | Revenue impact, CAC, Vapi/Twilio/Stripe marginal cost per customer? |
| **Human/UX** | Operator workflow, caller experience, FR/EN, mobile book flow? |
| **Systemic** | Support load, onboarding friction, dependency on third parties? |
| **Temporal** | What ships in days vs months? Pilot-blocking vs nice-to-have? |
| **Compliance** | Quebec language, privacy, recording consent if voice? |

## Anti-patterns in analysis

- Recommending microservices, Kubernetes, or GraphQL without JustBookMe-specific forcing function
- "Rewrite everything" when incremental batch (A/B/C/D) fits stage
- Ignoring bilingual requirement or existing migrations/skills
- False precision on metrics without measurement plan
- Single-option analysis disguised as comparison

## Example triggers

- "Should we add a queue before scaling SMS reminders?"
- "Salon-first or trade-first for GTM?"
- "Soft limits on starter plan — how aggressive?"
- "Migrate intent from Ollama to hosted API?"
- "Embed widget vs standalone book page priority?"

## Definition of done

Analysis is complete when the user can:
1. Understand why the recommended path wins over alternatives
2. See what could prove the recommendation wrong
3. Start the first roadmap item without re-asking the original question