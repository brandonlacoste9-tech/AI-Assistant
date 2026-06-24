# JustBookMe Project Map

Production: https://justbookme.ca  
Repo: `web/` (Next.js 15 App Router)  
Supabase ref: `ulbfaxhsbbckotcbmslk`

## Route groups

| Group | Path | Purpose |
|-------|------|---------|
| `(marketing)` | `/`, `/pricing`, `/signup`, `/login`, `/terms`, `/privacy` | Public marketing |
| `(app)` | `/dashboard/*`, `/onboarding` | Authenticated operator |
| `(public)` | `/book/[slug]`, `/embed/[slug]` | Customer booking + lead embed |

## Dashboard pages

- `/dashboard` — Today overview
- `/dashboard/bookings` — Appointments CRUD
- `/dashboard/leads` — Lead inbox
- `/dashboard/calls` — Voice conversation log
- `/dashboard/customers` — Customer list
- `/dashboard/settings` — Business, voice, embed, staff, billing

## API routes (`web/src/app/api/`)

| Route | Purpose |
|-------|---------|
| `bookings` | Operator appointment CRUD |
| `leads` | Lead management |
| `conversations` | Call/SMS thread delete |
| `customers` | Customer CRUD |
| `staff` | Staff CRUD |
| `settings` | Business settings PATCH |
| `public/book` | Public booking POST (no auth) |
| `sms/send` | Outbound SMS |
| `stripe/checkout`, `stripe/webhook`, `stripe/portal` | Billing |
| `vapi/webhook` | Voice assistant events |
| `cron/reminders`, `cron/reminders-2h` | Scheduled SMS reminders |

## Core libs

| Path | Purpose |
|------|---------|
| `lib/auth/api-auth.ts` | `getApiUser()` — auth + business_id |
| `lib/auth/business-mutation.ts` | `deleteBusinessRow()` — service-role deletes |
| `lib/auth/get-business-context.ts` | Server component business context |
| `lib/supabase/server.ts` | SSR + service clients |
| `lib/i18n/dictionaries.ts` | FR/EN strings — **always update both** |
| `lib/onboarding/presets.ts` | Salon · Trade · Office presets |
| `lib/vapi/*` | Voice prompt, provision, webhook, booking tools |
| `lib/twilio/*` | SMS inbound/outbound, templates |
| `lib/stripe/*` | Plans, checkout, webhooks |
| `lib/public/*` | Resolve business by slug, public booking |
| `lib/usage/*` | Plan limits, usage counters |

## Design system (`globals.css`)

CSS variables: `--primary`, `--accent`, `--surface`, `--background`, `--foreground`, `--border`, etc.  
Utility classes: `.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.select-field`, `.section-label`, `.font-display`  
Fonts: DM Sans (body), Fraunces (display) — loaded in root layout.

## Migrations (run in Supabase SQL Editor if not applied)

| # | File | Adds |
|---|------|------|
| 007 | `007_dashboard_delete.sql` | DELETE policies |
| 008 | `008_reminder_columns.sql` | `reminder_24h_sent_at`, `reminder_2h_sent_at` |
| 009 | `009_customers_staff_usage.sql` | customers/staff policies, `usage_counters` |
| 010 | `010_voice_customization.sql` | `voice_greeting`, `voice_instructions` |
| 011 | `011_business_type.sql` | `business_type` (`salon`\|`trade`\|`office`) |

## Scripts (`web/package.json`)

```bash
npm run build          # Required before marking work done
npm run verify:prod    # Smoke test production
npm run cron:reminders # Test reminder cron locally
npm run vapi:provision # Provision voice assistant
```

## Done criteria

1. `npm run build` passes in `web/`
2. New user-facing strings in both `fr` and `en` in `dictionaries.ts`
3. API routes use `getApiUser()` and scope by `business_id`
4. Deletes use `deleteBusinessRow()` when RLS DELETE may be missing
5. Schema changes get a new numbered migration in `supabase/migrations/`
6. Supabase tasks: also follow Cyberhound `.agents/skills/supabase/SKILL.md`