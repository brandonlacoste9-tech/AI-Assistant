---
name: justbookme-dev
description: "Use when implementing features, fixing bugs, or reviewing code in the JustBookMe (AI-Assistant) repo. Triggers: Next.js dashboard, public booking, Supabase migrations/RLS, Stripe billing, Twilio SMS, Vapi voice assistant, onboarding, i18n FR/EN, API routes, cron jobs. Full-stack patterns for this Quebec bilingual AI receptionist SaaS."
---

# JustBookMe Development

Bilingual AI receptionist SaaS for Quebec service businesses (salons, trades, offices).  
App root: `web/`. Production: https://justbookme.ca

Read [references/project-map.md](references/project-map.md) for routes, APIs, libs, and migrations.

## Before you code

1. **Read existing code** in the area you're changing — match naming, patterns, and file layout.
2. **Small focused diffs** — no drive-by refactors, no new dependencies unless necessary.
3. **Supabase work** — also load `C:\Users\north\OneDrive\Documents\GitHub\Cyberhound\.agents\skills\supabase\SKILL.md`.
4. **Verify** — run `npm run build` in `web/` before marking work done.

## Stack (do not substitute)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router, React 19 |
| Styling | Tailwind v4 + CSS variables in `globals.css` |
| Icons | Lucide React |
| DB/Auth | Supabase (`@supabase/ssr`, `@supabase/supabase-js`) |
| Payments | Stripe |
| SMS | Twilio |
| Voice | Vapi |
| State | React server components + minimal `"use client"` — **no** TanStack Query, Zustand, or Storybook |

## Architecture patterns

### Server Components default

- Pages and data-fetching components stay server-side.
- Add `"use client"` only for interactivity (forms, modals, client nav state).
- Push client boundaries as deep as possible.

### Auth

- **Middleware** (`web/src/middleware.ts`): protects `/dashboard`, `/onboarding`; redirects unauthenticated users to `/login`.
- **API routes**: use `getApiUser()` from `lib/auth/api-auth.ts` — returns `{ supabase, user, businessId }` or an error response.
- **Never** expose `service_role` or secret keys via `NEXT_PUBLIC_*`.

### Business-scoped mutations

All operator data is scoped to `business_id`. Deletes use service role when RLS DELETE may be absent:

```ts
import { deleteBusinessRow } from "@/lib/auth/business-mutation";

const result = await deleteBusinessRow("appointments", id, businessId);
```

Tables: `appointments`, `leads`, `conversations`, `customers`, `staff`.

### Public routes

- `/book/[slug]` and `/embed/[slug]` resolve business via `lib/public/resolve-business.ts`.
- Public booking POST → `api/public/book` — no auth; validate slug, hours, services server-side.

### Voice (Vapi)

- System prompt: `lib/vapi/prompt.ts` (`buildReceptionistSystemPrompt`)
- Custom greeting/instructions: `voice_greeting`, `voice_instructions` on business row
- Provision/update: Settings UI → `lib/vapi/provision-service.ts`
- Webhook: `api/vapi/webhook` → `lib/vapi/webhook.ts`

### SMS (Twilio)

- Inbound: webhook handler in `lib/twilio/inbound-sms.ts`
- Outbound booking/reply: `lib/twilio/send-booking-sms.ts`, `lib/twilio/booking-reply.ts`
- Include `voice_instructions` in fallback SMS replies when relevant

### Stripe

- Plans: `lib/stripe/plans.ts`
- Checkout from pricing/signup query params: `?plan=X&interval=month|year`
- Webhook: `api/stripe/webhook` — idempotent handlers in `lib/stripe/webhook-handlers.ts`

### Onboarding

- Wizard: `components/onboarding/onboarding-wizard.tsx`
- Step 1 business type (salon · trade · office) → presets in `lib/onboarding/presets.ts`
- Post-onboarding may redirect to Stripe Checkout

## i18n (mandatory)

All user-facing copy lives in `web/src/lib/i18n/dictionaries.ts`.  
**Always add both `fr` and `en` keys** for any new string. Quebec market — French is not optional.

Pass locale from page/layout; do not hardcode English in components.

## UI implementation

Use existing design tokens — do not invent parallel color systems:

```css
/* globals.css — use these, not raw hex in components */
var(--primary)   /* navy #1e3a5f */
var(--accent)    /* gold #c4a035 */
var(--surface)   /* white cards */
var(--background)/* warm paper #faf7f2 */
```

Reuse utility classes: `.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.select-field`, `.section-label`, `.font-display`.

For UX review criteria, load `justbookme-ui` skill when auditing interfaces.

## API route checklist

```ts
export async function POST(request: Request) {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;
  const { businessId } = auth;

  // Parse + validate body
  // Scope all queries: .eq("business_id", businessId)
  // Return JSON with appropriate status codes
}
```

- Validate input; return 400 for bad requests, 404 for missing scoped rows.
- Public endpoints: rate-limit awareness, no PII leakage across businesses.

## Database changes

1. New file: `supabase/migrations/NNN_description.sql` (next number after 011).
2. Enable RLS on new tables; add SELECT/INSERT/UPDATE policies scoped to `business_id`.
3. Remember: UPDATE requires a SELECT policy in Postgres RLS.
4. Tell user to run migration in Supabase SQL Editor if not using CLI push.

## Accessibility & performance (implementation)

- Interactive targets ≥ 44×44px on touch surfaces
- Visible focus rings (`.input-field:focus` pattern — `box-shadow: 0 0 0 3px var(--primary-light)`)
- Semantic HTML: `<button>`, `<label>`, `<nav>`, form `aria-*` where needed
- Prefer CSS transitions over JS animation (INP)
- Lazy-load heavy client components; avoid blocking dashboard paint

## Testing & scripts

```bash
cd web
npm run build          # Required gate
npm run lint           # When touching many files
npm run verify:prod    # Post-deploy smoke
npm run test:intent    # Intent matching
npm run test:vapi:webhook
```

No mandatory unit test coverage — manual verification + build pass is the bar unless user asks for tests.

## Common pitfalls

| Pitfall | Fix |
|---------|-----|
| Delete returns 0 rows silently | Use `deleteBusinessRow()` or ensure RLS DELETE + SELECT policies |
| English-only strings | Add `fr` + `en` in dictionaries |
| `user_metadata` in RLS | Use `business_id` from `users` table, not JWT metadata |
| Client component fetching secrets | Keep secrets in server actions / API routes only |
| New migration not run | Document migration number for user to apply in Supabase |

## Definition of done

1. `npm run build` passes
2. Bilingual strings if UI changed
3. Business scoping on all mutations
4. Migration file if schema changed
5. Focused diff — every line serves the task