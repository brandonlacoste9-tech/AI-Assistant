---
name: justbookme-prompts
description: "Use when designing, editing, testing, or optimizing LLM prompts in JustBookMe. Triggers: Vapi voice system prompt, voice_greeting, voice_instructions, SMS intent extraction, Ollama/Gemma, tool descriptions, prompt accuracy, token cost, bilingual FR/EN prompt tuning, edge cases for salons/trades/offices."
---

# JustBookMe Prompt Engineering

Optimize prompts for JustBookMe's two LLM surfaces: **Vapi voice receptionist** and **SMS intent extraction** (regex + Ollama fallback).

Read [references/prompt-catalog.md](references/prompt-catalog.md) for file locations.

For app implementation patterns, load `justbookme-dev` skill.

## Prompt surfaces

| Surface | Primary file | Model | Output |
|---------|--------------|-------|--------|
| Voice calls | `lib/vapi/prompt.ts` | Vapi-hosted LLM | Tool calls + spoken replies |
| SMS booking | `lib/intent/llm-intent.ts` | Ollama (`gemma4` default) | JSON intent |

**Rule:** Prompts live in `lib/` only. Components pass context; they do not embed instructions.

## Before changing a prompt

1. Read the current prompt and what context is injected (services, hours, `voiceInstructions`).
2. Identify the failure mode: wrong service match, language mix, tool skip, JSON parse fail, verbosity.
3. Add a repro case to `scripts/test-salon-intent.mjs` or `test-intent-llm.mjs` before editing.
4. Prefer small diffs — one hypothesis per change.

## Voice prompt architecture (`buildReceptionistSystemPrompt`)

Structure (keep this order — models anchor on early instructions):

1. **Role** — receptionist for `{business}`, Quebec, warm not robotic
2. **Capability examples** — salon, trade, HVAC, dental (few-shot style, not a wall of text)
3. **Language rule** — detect FR/EN from first sentence; never mix in one reply
4. **Date anchor** — `today` in America/Montreal
5. **Conversation flow** — numbered steps ending in tool calls
6. **Goals priority** — book → lead capture → human transfer
7. **Core rules** — never invent availability; one question at a time; 1–2 sentences
8. **Locale style** — Quebec French « vous »; North American English
9. **Injected data** — services JSON, hours JSON
10. **Owner override** — `voiceInstructions` appended last (cannot override tool/safety rules)

### Voice prompt patterns that work here

- **Tool-forcing**: "Never invent availability — always call check_availability" (reduces hallucinated slots)
- **Negative constraints**: "Do not assume salon" + explicit anti-patterns block wrong vertical assumptions
- **Structured injection**: Services as JSON with `service_id` — model maps natural language → closest ID
- **Urgency handling**: Explicit rule for leaks/no heat/pain → soonest slot
- **Brevity for voice**: 1–2 sentences — long prompts ok in system; short replies in behavior rules

### Voice anti-patterns

- Bilingual instructions in the same reply rule violated by mixed example text
- Prices or services not in the injected list
- Removing tool call requirements to "sound friendlier"
- `voiceInstructions` that contradict safety (e.g. skip phone confirmation)

### First message (`resolveFirstMessage`)

- Default: `receptionistFirstMessage` (FR/EN)
- Custom `voice_greeting`: max 500 chars — test speakability (no URLs, no bullet lists)
- Greeting is separate from system prompt — don't duplicate full flow in greeting

## SMS intent prompt architecture (`llm-intent.ts`)

Regex handles high-confidence patterns first (`salon-intent-bridge.ts`). LLM is **fallback only** — optimize for:

- **JSON-only output** — `format: "json"` via Ollama; parser extracts `{...}` on failure
- **Closed action enum** — `booking.create | reschedule | cancel | transfer.human | none`
- **Service list injection** — configured services as bullet list; free-text `service_label` if no match
- **Locale field** — `fr` | `en` for reply templating downstream

### SMS prompt patterns

- **Schema in prompt** — show exact JSON shape (models copy structure)
- **Vertical examples in rules** — haircut, plumber, HVAC, dental (mirrors voice prompt)
- **"Respond with JSON only, no markdown"** — reduces parse failures

### SMS anti-patterns

- Open-ended prose responses
- New action types without updating `VALID_ACTIONS` and downstream handlers
- Few-shot examples that contradict the schema
- Running LLM when regex already matches (wastes latency + cost)

## Optimization priorities

For JustBookMe, optimize in this order:

1. **Correctness** — right service, right action, tools called when needed
2. **Consistency** — same input → same intent across FR/EN variants
3. **Latency** — voice < 3s perceived; SMS regex path < 100ms; LLM fallback < 45s timeout
4. **Token cost** — trim redundant examples; inject only needed service fields
5. **Safety** — no payment collection on phone; no invented availability

### Token reduction tactics (safe to use)

- Remove duplicate rule statements (voice prompt has some intentional repetition — trim only proven redundant blocks)
- Compress service list to `id, name, duration` when price not needed for the task
- Replace long example blocks with 2–3 representative vertical lines
- Keep rules that prevent costly failures (tool-forcing, JSON-only)

## Testing methodology

### Intent tests (required for SMS prompt changes)

```bash
cd web
npm run test:intent        # Regex cases — must pass without Ollama
npm run test:intent:llm    # LLM fallback — needs Ollama + gemma4
```

Add cases covering:
- Quebec French colloquial ("chu chaud pour...", "demain à 14h")
- Trade urgency ("fuite sous l'évier", "drain clogged")
- English booking ("book a haircut Friday at 2")
- Non-booking ("what are your hours") → `action: none`
- Ambiguous service → `service_label` free text, not wrong ID

### Voice prompt validation

No automated accuracy suite yet — manual checklist:
- [ ] FR caller → French only, « vous » default
- [ ] EN caller → English only, no French words
- [ ] Unknown service → asks from list, doesn't invent
- [ ] Booking flow → check_availability before offering times
- [ ] `voiceInstructions` respected for tone, not for skipping tools
- [ ] Re-provision after system prompt change (Settings or `npm run vapi:provision:update`)

### Edge case matrix

| Input type | Expected behavior |
|------------|-------------------|
| Mixed FR/EN in one message | Pick dominant language; stay consistent |
| Slang / typo | Map to closest service via `service_label` |
| Reschedule/cancel | `booking.reschedule` / `booking.cancel` + time reference |
| Human request | `transfer.human` |
| Outside hours | capture_lead or offer next available per prompt rules |

## Safety & injection defense

- **Owner instructions** (`voiceInstructions`) are appended to system prompt — sanitize length (DB column limits), strip control chars; never execute as code
- **SMS body** is user input — intent prompt treats it as data in user message, not instructions
- **Tool descriptions** in `tool-schemas.ts` are part of the prompt surface — keep aligned with `prompt.ts` rules
- Do not add "ignore previous instructions" mitigation prose — rely on clear role hierarchy: system rules > owner instructions > user message

## Versioning & deployment

- Prompts are version-controlled in git (this repo) — no separate prompt CMS
- Voice changes require Vapi re-provision to take effect in production
- Document significant prompt changes in commit message: what failure mode was fixed + test added
- Track before/after on a small fixed test set (scripts), not ad-hoc manual checks only

## Evaluation metrics (practical targets)

Don't chase arbitrary "95% accuracy" without a labeled set. For this project:

| Metric | How to measure |
|--------|----------------|
| Intent parse rate | `test:intent` + `test:intent:llm` pass count |
| JSON validity | LLM test script + `parseJsonResponse` success |
| Regex coverage | % of production SMS handled without LLM (log `source` in bridge) |
| Voice booking completion | Manual call test + webhook conversation outcome |
| Regression | Re-run full test scripts after every prompt edit |

## Definition of done (prompt changes)

1. Prompt edited in `lib/vapi/prompt.ts` and/or `lib/intent/llm-intent.ts` (and `tool-schemas.ts` if tools change)
2. At least one new test case in intent test scripts (if SMS-related)
3. `npm run test:intent` passes
4. `npm run build` passes
5. Voice changes: note re-provision step for operator
6. No new env vars or model dependencies unless user requested

## What not to do

- Context-manager JSON handoff protocols — not used in this repo
- Separate prompt microservice or CMS — overkill for current scale
- Chain-of-thought in SMS JSON prompt — adds tokens, hurts parse reliability
- Constitutional AI layers — safety is rule-based in system prompt + tool constraints
- Mandatory A/B testing infrastructure — use script-based regression first