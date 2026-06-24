# JustBookMe Prompt Catalog

All production prompts live in `web/src/lib/`. Edit here — do not scatter prompts in components or API routes.

## Voice receptionist (Vapi)

| File | Function | Purpose |
|------|----------|---------|
| `lib/vapi/prompt.ts` | `buildReceptionistSystemPrompt(ctx)` | Main system prompt — tools, flow, FR/EN, services JSON |
| `lib/vapi/prompt-utils.ts` | `receptionistFirstMessage`, `resolveFirstMessage` | First spoken line; custom `voice_greeting` capped at 500 chars |
| `lib/vapi/tool-schemas.ts` | `VAPI_TOOL_FUNCTIONS` | Tool descriptions the model sees |
| `lib/vapi/assistant-builder.ts` | — | Wires prompt + tools into Vapi assistant |
| `lib/vapi/provision-service.ts` | — | Pushes prompt to Vapi on settings save |

**Dynamic context injected at runtime:**
- `services` JSON (from DB)
- `workingHours` JSON
- `today` (America/Montreal)
- `voiceInstructions` (owner override — appended, cannot break tool rules)
- `voiceGreeting` (replaces default first message)

**Defaults by business type:** `lib/onboarding/presets.ts` → `defaultVoiceInstructions()`

## SMS intent extraction

| File | Function | Purpose |
|------|----------|---------|
| `lib/intent/salon-intent-bridge.ts` | `parseSalonBookingIntentWithFallback` | Regex-first, Ollama LLM fallback |
| `lib/intent/llm-intent.ts` | `buildSystemPrompt`, `parseBookingIntentWithLlm` | JSON-only intent schema |
| `lib/intent/match-service.ts` | `matchBusinessService` | Maps label → configured service |

**LLM backend:** `lib/llm/ollama.ts` — `OLLAMA_BASE_URL`, `OLLAMA_MODEL` (default `gemma4`)

## Test scripts

```bash
cd web
npm run test:intent       # Regex intent cases
npm run test:intent:llm   # Ollama LLM fallback (requires local Ollama)
npm run test:vapi         # Vapi connectivity
```

## Prompt change checklist

1. Edit prompt in `lib/` — single source of truth
2. Add test case to `scripts/test-salon-intent.mjs` or `test-intent-llm.mjs`
3. Re-provision voice if system prompt changed: Settings save or `npm run vapi:provision:update`
4. `npm run build` passes
5. Spot-check FR + EN + one trade + one salon utterance