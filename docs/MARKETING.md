# JustBookMe — Marketing Playbook (execute this)

**Product:** JustBookMe — bilingual AI receptionist  
**Site:** https://justbookme.ca  
**Founder:** Brandon · Montreal  
**Goal (next 30 days):** 20 demos booked · 5 trials started · 1–2 paying customers  

Use **JustBookMe** and **justbookme.ca** everywhere. Ignore old “RendezVous AI” / Netlify preview links in older docs.

---

## Positioning (one line)

> Never miss a booking — AI answers the phone 24/7, books in French or English, and texts reminders while you’re with a client.

**30-second ROI (FR):**

> Un rendez-vous manqué = 80–150 $. Cinq appels manqués par semaine ≈ 1 600 $/mois. JustBookMe paie pour lui-même avec un seul rdv récupéré par semaine.

**Who we sell to (ICP):**

| Field | Value |
|-------|--------|
| Type | Salon, barbershop, esthétique, nails (then dental / trades) |
| Geo | Montréal, Laval, Rive-Sud, Québec City |
| Size | 1–8 staff, owner still answers (or ignores) the phone |
| Disqualify | “We never miss calls”, multi-location franchise (later) |

---

## Funnel

```
Cold (Maps / IG / walk-in / ads)
   → Landing / pricing / demo video
   → Signup trial OR 15-min demo
   → Onboarding + phone/voice setup
   → Paying (Starter / White Glove)
```

**Primary CTA:** Start free trial → justbookme.ca/signup  
**Secondary CTA:** Book demo (Calendly or mailto)  
**Proof assets:** Demo video on landing + dashboard; vertical pages `/barbershop`, `/dental`

---

## Channel mix (what to run this month)

### 1) Outbound (highest control — start here)

| Activity | Volume / week | Asset |
|----------|---------------|--------|
| Cold email (FR first) | 30–50 | [outreach/cold-emails-ready.md](./outreach/cold-emails-ready.md) + [outreach/outreach-kit-complete.md](./outreach/outreach-kit-complete.md) |
| Instagram DMs | 20 | Outreach kit § Instagram |
| Walk-ins (Plateau / Mile End / Rosemont) | 5–10 | Walk-in script in outreach kit |
| Warm intros | 5 | Friends, suppliers, existing clients |

**Prospect list:** [outreach/prospect-list-montreal.csv](./outreach/prospect-list-montreal.csv) — fill email/phone from Google Maps before send.

**Cadence:** Day 0 email → Day 4 ROI → Day 10 breakup. Max 3 touches, then stop.

### 2) Content (organic, low cost)

| Piece | Where | Frequency |
|-------|--------|-----------|
| 15–30s demo clip (from YouTube walkthrough) | IG Reels + TikTok | 3×/week |
| “Appels manqués le samedi” carousel | IG | 1×/week |
| Founder walk-in / setup story | Stories | daily while selling |
| Before/after: voicemail vs booked SMS | Reel | 1×/week |

Hook formulas:

1. Missed call = lost money  
2. FR/EN bilingual advantage  
3. “While your hands are busy…”

### 3) Paid (after 5+ organic demos or if budget ready)

| Channel | Doc | Start budget |
|---------|-----|--------------|
| Google Search | [google-ads-playbook.md](./google-ads-playbook.md) | $15–25 CAD/day |
| Meta (FB/IG) | [meta-ads-playbook.md](./meta-ads-playbook.md) | $15–25 CAD/day |

**Before spend:**

- [ ] Meta Pixel ID in env (`NEXT_PUBLIC_META_PIXEL_ID` or equivalent)  
- [ ] Google Ads / GA4 IDs + conversion labels in `web/src/lib/gtag.ts`  
- [ ] Conversion events: Lead (waitlist/signup), CompleteRegistration, InitiateCheckout  
- [ ] Landing loads fast on mobile FR  

### 4) Partnerships

- Salon suppliers / product reps (intro for free setup)  
- Accountants / bookkeepers who serve SMBs  
- Barbershop / beauty schools (demo day)

---

## Weekly operating rhythm

| Day | Focus |
|-----|--------|
| Mon | 25 cold emails from CSV |
| Tue | 10 IG DMs + post 1 Reel |
| Wed | 5 walk-ins |
| Thu | Demos + follow-ups |
| Fri | 15 emails + review metrics |
| Sat | Optional walk-ins (busy salons see the pain live) |
| Sun | Off or content batch |

**Track in a sheet:** business · channel · status · last touch · next step  
Statuses: `prospect` → `contacted` → `demo` → `trial` → `paying` · `lost`

**KPIs (weekly):**

| Metric | Target week 1–2 | Target week 3–4 |
|--------|-----------------|-----------------|
| Outbound touches | 50+ | 80+ |
| Replies | 5+ | 10+ |
| Demos | 3+ | 5+ |
| Trials | 1+ | 3+ |
| Paid | 0–1 | 1–2 |

---

## Message by vertical

| Vertical | Hook |
|----------|------|
| Salon | Samedi plein → téléphone dans le vide |
| Barbershop | En fade → appels perdus |
| Dental | High slot value; no-shows kill the day |
| Trades | On the job site → phone in the truck |

Landing variants already exist: `/barbershop`, `/dental`, `/vicpark`.

---

## Founder offer (optional, time-boxed)

Use only if you still want early social proof:

- Free setup  
- Trial (match site: currently **7 days** in product code; say what’s live on justbookme.ca)  
- Founder discount only if you can honor it in Stripe  

Do **not** promise 14 days if the product trial is 7.

---

## Compliance / brand

- 18+ / professional B2B only  
- Don’t spam CASL: identify yourself, physical/business contact, unsubscribe path for email  
- Prefer FR-first for local salons; offer EN if they reply in English  
- Loi 25 / privacy: point to justbookme.ca/privacy  

---

## Asset index (already in repo)

| Asset | Path |
|-------|------|
| This playbook | `docs/MARKETING.md` |
| ICP + scripts | `docs/09-cold-outreach-icp-one-pager.md` |
| Full outreach kit | `docs/outreach/outreach-kit-complete.md` |
| Cold emails (updated URLs) | `docs/outreach/cold-emails-ready.md` |
| Montreal CSV | `docs/outreach/prospect-list-montreal.csv` |
| Google Ads | `docs/google-ads-playbook.md` |
| Meta Ads | `docs/meta-ads-playbook.md` |
| Landing copy | `docs/03-landing-page-copy.md` |
| Pricing draft | `docs/04-pricing.md` |
| Demo video | `web/src/lib/site-config.ts` → `DEMO_VIDEO_URL` |

---

## First 48 hours (do these)

1. Open justbookme.ca on phone FR — fix anything broken for signup.  
2. Fill 15 emails into `prospect-list-montreal.csv` from Google Maps.  
3. Send **10 Email 1** (salon FR) today.  
4. Post one Reel cut from the demo YouTube video.  
5. Book yourself 3 walk-in slots this week.  

### Outbound pack (start here)

| File | Purpose |
|------|---------|
| [outreach/OUTBOUND_WEEK1.md](./outreach/OUTBOUND_WEEK1.md) | Day-by-day week 1 plan |
| [outreach/send-queue-week1.csv](./outreach/send-queue-week1.csv) | Ordered who to contact |
| [outreach/copy-paste-emporium.txt](./outreach/copy-paste-emporium.txt) | First email ready to send |
| [outreach/ig-dms-and-scripts.md](./outreach/ig-dms-and-scripts.md) | IG + walk-in + phone |
| [outreach/tracker.csv](./outreach/tracker.csv) | Log every touch |
| [outreach/cold-emails-ready.md](./outreach/cold-emails-ready.md) | Full email bodies |

Marketing is a system: **outbound + content every week**, paid only when the funnel converts.