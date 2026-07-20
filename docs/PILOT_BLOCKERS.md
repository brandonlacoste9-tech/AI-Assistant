# JustBookMe pilot blockers (2026-07-20 smoke)

Smoke: `cd web && npm run pilot:smoke` → **2 failures** on production.

## 1. CRITICAL — Signup broken (500)

```
POST /api/signup → 500
{"error":"Could not find the 'business_id' column of 'users' in the schema cache"}
```

### Root cause (high confidence)

Production Supabase project **`ulbfaxhsbbckotcbmslk`** is **shared** with other products (Wacke, MTLTrades, etc. per env docs).

Wacke’s `public.users` table is streamer/viewer shaped (**no `business_id`**).  
JustBookMe expects RendezVous `users` with **`business_id` → businesses**.

`CREATE TABLE IF NOT EXISTS users` in migration 001 **never alters** an existing foreign table — so JustBookMe migrations did not add `business_id`.

### Fix A — Recommended: **dedicated Supabase project for JustBookMe**

1. Supabase → **New project** e.g. `justbookme-prod` (Canada/US East).  
2. SQL Editor: run migrations **in order**:

```
001_initial.sql
002_grants_triggers.sql
003_waitlist_public_insert.sql
004_operations.sql
005_conversations.sql
006_business_voice.sql
007_dashboard_delete.sql
008_reminder_columns.sql
009_customers_staff_usage.sql
010_google_calendar.sql
010_voice_customization.sql
011_business_type.sql
011_calendar_sync.sql
012_business_industry.sql
013_lead_structure.sql
014_rls_hardening.sql
(+ later numbered files if needed)
```

Or paste `full_schema.sql` if complete, then remaining migrations.

3. Auth → URL config:

| Setting | Value |
|---------|--------|
| Site URL | `https://justbookme.ca` |
| Redirects | `https://justbookme.ca/**`, `http://localhost:3000/**` |

4. Netlify env (production) — update to **new** project keys:

```
NEXT_PUBLIC_SUPABASE_URL=https://NEW_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=https://justbookme.ca
```

5. Trigger **full redeploy**.  
6. Re-run: `cd web && npm run pilot:smoke`  
   Expect signup full → **pass**.

**Do not** reuse Wacke’s project for JustBookMe tenancy.

### Fix B — Emergency only (shared project)

Only if you cannot create a new project today:

```sql
-- DANGEROUS if public.users is Wacke streamers — prefer Fix A
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE;

NOTIFY pgrst, 'reload schema';
```

Wacke inserts may still conflict on column shapes (`username` NOT NULL, etc.).  
**Fix A is the real fix.**

---

## 2. CRON_SECRET missing on production

```
health.checks.cron_secret === false
```

Reminders / 2h reminders / usage rollup **won’t run** without it.

### Fix

1. Generate secret:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. Netlify → Site → Environment variables → Production:

```
CRON_SECRET=<paste>
```

3. Confirm **Scheduled** functions still point at:

- `/api/cron/reminders`
- `/api/cron/reminders-2h`
- `/api/cron/usage-rollup`

   with `Authorization: Bearer $CRON_SECRET` if required by your cron config.

4. Redeploy (or wait for next deploy).  
5. Smoke should show: `✓ CRON_SECRET configured on production`

---

## 3. Auth URL hygiene

`PROJECT_CONNECTED.md` still lists Netlify site `resilient-khapse-ecd31c.netlify.app`.  
Production domain is **justbookme.ca** — update Supabase Auth Site URL + redirects to match.

---

## Smoke results snapshot (2026-07-20)

| Check | Result |
|-------|--------|
| Marketing pages | PASS |
| Waitlist POST | PASS |
| Health / DB connected | PASS |
| Vapi / Twilio status | PASS (configured) |
| Cron reject unauth | PASS |
| USAGE_ENFORCE off | PASS (pilot-safe) |
| **Signup full** | **FAIL — business_id** |
| **CRON_SECRET** | **FAIL** |

---

## After Fix A + CRON_SECRET

```bash
cd C:\Users\north\AI-Assistant\web
npm run pilot:smoke
```

Then:

1. Manual signup at https://justbookme.ca/signup?plan=pro  
2. Onboarding → voice sync → test call  
3. Execute [outreach/OUTBOUND_WEEK1.md](./outreach/OUTBOUND_WEEK1.md)

## What code cannot fix alone

Shared DB tenancy and Netlify secrets require **your dashboard access**.  
This doc is the action list for production repair.
