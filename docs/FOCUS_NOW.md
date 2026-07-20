# JustBookMe — FOCUS NOW (income)

**Decision:** This is the **only** product for first revenue (2026-07-20).  
**Site:** https://justbookme.ca · **Repo:** `AI-Assistant` · **Path:** `C:\Users\north\AI-Assistant`

## Why this one

- Clear B2B pain: missed calls during appointments  
- Live domain + pricing + signup + pilot docs  
- Outbound kit already written (Week 1)  
- Vertical LPs (salon/clinic/barber repos) are demos — don’t build more of those  

## Offer (memorize)

> Un rdv manqué = 80–150 $. Si tu rates 5 appels/semaine, c’est ~1 600 $/mois.  
> JustBookMe répond FR/EN, prend le rdv, envoie des rappels SMS.  
> À 149 $/mois, un rdv récupéré par semaine paie l’outil. Essai gratuit: justbookme.ca/signup  

**Primary plan to sell:** Pro **$149/mo** (Starter $49 too tight for busy salons in pilot).  
**Trial:** 7 days (confirm live UI matches docs — older docs said 14).

## This week (execute, don’t build)

Follow **[outreach/OUTBOUND_WEEK1.md](./outreach/OUTBOUND_WEEK1.md)** exactly.

| Metric | Target |
|--------|--------|
| Emails | 40 |
| IG DMs | 15 |
| Walk-ins | 8 |
| Replies | 5 |
| Demos | 2 |
| Trial signup | 1 |

**First send today:** Emporium Barbershop (`info@emporiumbarbershop.com`) — already in Week 1 tier A.

## Before demos (founder, once)

**Blockers found 2026-07-20 — fix first:** [PILOT_BLOCKERS.md](./PILOT_BLOCKERS.md)

1. **Signup 500** — shared Supabase `users` table missing `business_id` → **new Supabase project** + `supabase/JUSTBOOKME_FRESH_PROJECT.sql`  
2. **CRON_SECRET** — set on Netlify production  
3. Then: `cd web && npm run pilot:smoke` must pass  
4. Test call FR + EN · `/book/{slug}` on phone (see [PILOT_SALON.md](./PILOT_SALON.md))

## What not to do

- New features unless a pilot is **blocked**  
- Touch DevisPay / Q-Emplois / Zyeute / Empire products this week  
- Build another salon landing repo  

## Code help (only if blocked)

- Skills in `.agents/skills/` (`justbookme-dev`, etc.)  
- Smoke: `cd web && npm run pilot:smoke`  
- Support: info@justbookme.ca  

## Success definition (30 days)

| Milestone | Target |
|-----------|--------|
| Paying customers | ≥1 Pro (or paid after trial) |
| Or LOIs / active trials | ≥3 serious |
| Weekly recurring outreach | Habit locked |

Until then: **outbound > product**.
