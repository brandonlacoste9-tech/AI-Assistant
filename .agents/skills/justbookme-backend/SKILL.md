---
name: justbookme-backend
description: "Use when designing, implementing, optimizing, or reviewing JustBookMe backend APIs, database access, webhooks, cron jobs, auth, and security. Triggers: API routes, Supabase queries, RLS, Stripe/Twilio/Vapi webhooks, business scoping, migrations, performance, input validation, service role patterns."
---

# JustBookMe Backend

Backend patterns for JustBookMe — Next.js Route Handlers + Supabase Postgres + third-party webhooks.  
No Express, GraphQL, Prisma, or Docker in this repo.

Read [references/api-patterns.md](references/api-patterns.md) for route inventory and templates.

Also load:
- `justbookme-dev` — full project map and done criteria
- Cyberhound `supabase` skill — RLS, migrations, security checklist

## Stack (actual)

| Layer | Choice |
|-------|--------|
| API | Next.js 15 App Router `route.ts` handlers |
| Runtime | Node.js (`export const runtime = "nodejs"` on Stripe webhook) |
| Database | Supabase Postgres via `@supabase/supabase-js` |
| Auth | Supabase Auth + `users.business_id` join |
| Clients | `createSupabaseServerClient()` (RLS), `getSupabaseService()` (elevated) |

**Dropped from generic backend prompts:** Python scaffolders, Express, Go, GraphQL, Kubernetes, load-test scripts that don't exist in repo.

## Architecture rules

### Thin routes, fat libs

Route files: auth → parse → validate → call `lib/*` → JSON response.  
Business logic lives in `web/src/lib/`, not in components or route handlers.

### Three auth tiers

| Tier | Pattern | Use for |
|------|---------|---------|
| **Operator** | `getApiUser()` | Dashboard APIs — RLS via user session |
| **Public** | `resolveBusinessBySlug()` + `getSupabaseService()` | `/api/public/*` — no login |
| **Webhook/Cron** | Signature or `CRON_SECRET` Bearer | Stripe, Vapi, Twilio, reminders |

Never use service role for operator routes when RLS session client suffices.

### Business scoping (mandatory)

Every operator query/mutation must include `.eq("business_id", businessId)` from `getApiUser()`.  
Public routes resolve business from **slug in URL/body** — never trust `business_id` from client input.

### Deletes

Use `deleteBusinessRow(table, id, businessId)` from `lib/auth/business-mutation.ts` when RLS DELETE may be missing. Tables: `appointments`, `leads`, `conversations`, `customers`, `staff`.

## API design

### REST conventions in this project

- Collection routes: `GET` list, `POST` create on same path (`/api/bookings`)
- Updates: `PATCH` with `{ id, ...fields }`
- Deletes: `DELETE` with `{ id }` in body or query — match sibling routes
- Response shape: `{ ok: true, ... }` or `{ error: "message" }` — stay consistent within a resource

### Validation

```ts
const body = await req.json().catch(() => null);
if (!body?.customer_name?.trim() || !body?.starts_at) {
  return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
}
```

- Trim strings; reject empty after trim
- Validate enums against const arrays (`BOOKING_STATUSES`)
- Return 400 for business rule failures (slot taken, invalid service) — not 500
- Wrap POST/PATCH in try/catch only when JSON parse can throw; prefer explicit null checks

### Error handling

- **500** — unexpected DB errors (`error.message` from Supabase)
- **400** — validation, booking conflicts, bad JSON
- **404** — business/slug not found, scoped row missing
- **401/403** — auth failures via `getApiUser()`
- **503** — missing env (`getSupabaseService()` null, Vapi/Stripe not configured)

Do not leak stack traces or internal IDs across business boundaries.

## Webhooks

### Stripe (`api/stripe/webhook`)

- Read **raw body** with `req.text()` — required for signature verification
- `stripe.webhooks.constructEvent(body, signature, secret)`
- Handlers in `lib/stripe/webhook-handlers.ts` — idempotent (check existing subscription state)

### Vapi (`api/vapi/webhook`)

- `verifyVapiWebhook(req)` before parsing
- Dispatch by `message.type`: `tool-calls`, `status-update`, `end-of-call-report`
- Tool execution in `lib/vapi/webhook.ts` → `booking-service.ts`

### Twilio SMS (`api/sms/inbound`)

- `verifyTwilioSignature(reqUrl, params, signature)` in production
- Handler: `lib/twilio/inbound-sms.ts` — log to `conversations` table

### Cron (`api/cron/reminders`, `reminders-2h`)

```ts
function authorize(req: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return process.env.NODE_ENV !== "production";
  return req.headers.get("authorization") === `Bearer ${secret}`;
}
```

Job logic in `lib/cron/reminder-job.ts`. Mark sent timestamps to prevent duplicate SMS.

## Database

### Migrations

New SQL: `supabase/migrations/NNN_description.sql` (current through 011).  
User applies in Supabase SQL Editor if not using CLI push.

### RLS essentials

- Enable RLS on all `public` tables
- Operator policies: `business_id` matches `users.business_id` for `auth.uid()`
- UPDATE requires SELECT policy
- Service role bypasses RLS — use only in `business-mutation`, public book, webhooks, cron

### Query performance

- Select only needed columns on list endpoints
- `.order("starts_at").limit(50)` for dashboard lists
- Filter on `business_id` first — ensure index exists in migration
- Avoid N+1: use Supabase joins in `.select("..., services(name)")` where already established
- For hot paths (slot availability), keep logic in `lib/public/public-booking.ts` — profile before adding cache

Load `supabase-postgres-best-practices` skill when optimizing slow queries.

## Security checklist

- [ ] All inputs validated server-side
- [ ] `business_id` never taken from unauthenticated client body
- [ ] Webhook signatures verified in production
- [ ] `SUPABASE_SERVICE_ROLE_KEY` never in `NEXT_PUBLIC_*`
- [ ] No `user_metadata` in RLS policies
- [ ] Twilio/Stripe secrets only in server env (Netlify)
- [ ] Cron endpoints require `CRON_SECRET` in production
- [ ] Public book: rate-limit awareness; no cross-tenant data in responses

## Side effects after mutations

Pattern from bookings/public book:

1. Persist to DB
2. If success → optional SMS via `sendBookingSms()`
3. Return `{ ok: true, id, sms_sent }` — don't fail booking if SMS fails

Voice provision after settings PATCH → `provision-service.ts` (async-friendly; surface errors to UI).

## Testing & verification

```bash
cd web
npm run build                    # Required gate
npm run verify:prod              # Smoke production
npm run test:vapi:webhook        # Vapi webhook
node scripts/run-reminders-cron.mjs
```

No mandatory load tester — use `verify:prod` and targeted scripts.

## New API checklist

1. Choose auth tier (operator / public / webhook)
2. Add route under `web/src/app/api/`
3. Implement logic in `web/src/lib/<domain>/`
4. Scope all queries by `business_id`
5. Migration if new tables/columns
6. RLS policies for new tables
7. Update `references/api-patterns.md` route inventory if significant
8. `npm run build` passes

## Definition of done

1. Route thin; logic in `lib/`
2. Correct auth tier and scoping
3. Appropriate HTTP status codes
4. Migration + RLS if schema changed
5. `npm run build` passes
6. No new dependencies unless justified

## Anti-patterns

| Don't | Do instead |
|-------|------------|
| Business logic in React components | Server action or API + lib |
| `select("*")` on list APIs | Explicit column list |
| Service role everywhere | Session client + RLS for operator routes |
| Trust client `business_id` on public routes | Resolve from slug |
| Skip webhook verification in prod | Verify signature/secret |
| Generic Express middleware patterns | Next.js route handler conventions |
| Invent Python/Go scaffold scripts | Follow existing `route.ts` templates |