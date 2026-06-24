# JustBookMe API Patterns

App: Next.js 15 Route Handlers in `web/src/app/api/`. Business logic in `web/src/lib/`.

## Route inventory

| Route | Auth | Notes |
|-------|------|-------|
| `bookings` | `getApiUser()` | GET/POST/PATCH/DELETE, business-scoped |
| `leads` | `getApiUser()` | Lead CRUD |
| `customers` | `getApiUser()` | PATCH/DELETE via scoped queries |
| `staff` | `getApiUser()` | Staff CRUD |
| `conversations` | `getApiUser()` | Call/SMS log |
| `settings` | `getApiUser()` | Business + voice settings PATCH |
| `onboarding` | `getApiUser()` | Wizard completion |
| `signup` | Public | Account creation |
| `public/book` | Public (slug) | Service role for writes |
| `public/slots` | Public (slug) | Availability |
| `public/leads` | Public (slug) | Embed lead capture |
| `stripe/checkout` | `getApiUser()` | Checkout session |
| `stripe/portal` | `getApiUser()` | Billing portal |
| `stripe/webhook` | Stripe signature | Idempotent handlers |
| `vapi/webhook` | `verifyVapiWebhook` | Tool calls, status, EOC |
| `sms/inbound` | Twilio signature | Inbound SMS |
| `sms/send` | `getApiUser()` | Outbound SMS |
| `cron/reminders` | `CRON_SECRET` Bearer | 24h reminders |
| `cron/reminders-2h` | `CRON_SECRET` Bearer | 2h reminders |
| `health` | Public | Liveness |

## Authenticated handler template

```ts
import { getApiUser } from "@/lib/auth/api-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await getApiUser();
  if ("error" in auth) return auth.error;
  const { supabase, businessId } = auth;

  const body = await req.json().catch(() => null);
  if (!body?.required_field) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("table")
    .insert({ business_id: businessId, ... })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id: data.id });
}
```

## Public handler template

```ts
const business = await resolveBusinessBySlug(slug);
if (!business) return NextResponse.json({ error: "Business not found" }, { status: 404 });

const db = getSupabaseService();
if (!db) return NextResponse.json({ error: "Not configured" }, { status: 503 });

// Always scope writes to business.id from resolved slug — never trust body.business_id
```

## Webhook template

```ts
// 1. Verify signature/secret first
// 2. Parse body (raw text for Stripe)
// 3. Dispatch to lib/* handler — keep route thin
// 4. Return 200 quickly; log failures
```

## Status codes

| Code | When |
|------|------|
| 400 | Bad input, validation fail, business rule fail |
| 401 | Missing/invalid auth or webhook signature |
| 403 | Authenticated but no business profile |
| 404 | Scoped row not found |
| 500 | Unexpected DB/server error |
| 503 | Missing env (Supabase, Stripe, Vapi) |

## Lib placement

| Concern | Location |
|---------|----------|
| Booking logic | `lib/appointments/`, `lib/public/public-booking.ts` |
| Voice tools | `lib/vapi/booking-service.ts`, `lib/vapi/webhook.ts` |
| SMS | `lib/twilio/*` |
| Stripe | `lib/stripe/webhook-handlers.ts` |
| Cron jobs | `lib/cron/reminder-job.ts` |
| Deletes | `lib/auth/business-mutation.ts` |

## Query rules

- Always `.eq("business_id", businessId)` on operator routes
- Use `.select()` with explicit columns — avoid `select("*")` on list endpoints
- `.limit(50)` on dashboard lists unless paginating
- `.maybeSingle()` when row may not exist; `.single()` when must exist
- Indexes: ensure `business_id` + common filters (`starts_at`, `phone`) are indexed in migrations