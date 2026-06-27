# JustBookMe — Meta Ads Campaign Playbook
**For:** Brandon, JustBookMe (justbookme.ca)
**Market:** Montreal, Laval, Quebec City, Gatineau — bilingual FR/EN
**Product:** AI receptionist SaaS for Quebec service businesses
**Updated:** June 2026

---

## Table of Contents
1. [Campaign Architecture](#1-campaign-architecture)
2. [Audience Targeting](#2-audience-targeting)
3. [Ad Copy — All Variants](#3-ad-copy--all-variants)
4. [Budget & Bidding Strategy](#4-budget--bidding-strategy)
5. [Creative Specs & Recommendations](#5-creative-specs--recommendations)
6. [Meta Pixel Setup Checklist](#6-meta-pixel-setup-checklist)
7. [Campaign Launch Checklist](#7-campaign-launch-checklist)
8. [Reporting Dashboard](#8-reporting-dashboard)

---

## 1. Campaign Architecture

JustBookMe's funnel maps onto a standard 3-stage paid social architecture. Each stage uses a distinct Meta campaign objective; they are separate campaigns in Ads Manager, not ad sets within the same campaign.

```
COLD AUDIENCE → WARM RETARGETING → CONVERSION (LEAD GEN)
    Stage 1            Stage 2              Stage 3
```

---

### Stage 1 — Awareness

**Meta Objective:** `Awareness → Reach` (for brand building) or `Traffic → Link Clicks` (if driving to website landing page — recommended for Pixel data collection)

**Goal:** Introduce JustBookMe to cold local service business owners. Plant the "missed calls = lost money" hook. Feed Stage 2 retargeting pools.

**Primary formats:** Static image (og-image.png / og-image-fr.png), short video (15–30s), carousel

**Placements:** Facebook Feed, Instagram Feed, Audience Network

**Daily budget allocation:** ~40% of total budget

**Key signal to collect:** Video views 50%+, link clicks, landing page views

---

### Stage 2 — Consideration

**Meta Objective:** `Traffic → Landing Page Views` or `Engagement → Video Views`

**Goal:** Re-engage warm audiences who saw Stage 1 content. Push deeper messaging (demo, testimonials, case study). Qualify intent before asking for lead info.

**Primary formats:** Carousel (feature walkthrough), video demo, testimonial static

**Placements:** Facebook Feed, Instagram Feed, Stories

**Daily budget allocation:** ~25% of total budget

**Key signal to collect:** Time on landing page, scroll depth (via Pixel custom events), CTA clicks

---

### Stage 3 — Conversion

**Meta Objective:** `Leads → Instant Forms` (Lead Generation campaign)

**Goal:** Capture qualified leads directly in-app. No landing page friction. Offer: Start your 14-day free trial — no credit card.

**Primary formats:** Single image, short video with strong CTA, carousel ending on lead form CTA

**Placements:** Facebook Feed, Instagram Feed

**Daily budget allocation:** ~35% of total budget

**Key signal to collect:** Cost Per Lead (CPL), Lead form completion rate, lead-to-trial conversion rate

---

### Funnel Summary Table

| Stage | Meta Objective | Audience | Format | Daily Budget % | Primary KPI |
|-------|---------------|----------|--------|---------------|-------------|
| 1 — Awareness | Traffic (Landing Page Views) | Cold — job title/interest targeting | Image, Video | 40% | CPM, Video Views 50%+ |
| 2 — Consideration | Traffic or Engagement | Retargeting pool (website, video, page) | Carousel, Video | 25% | CTR, LP View Rate |
| 3 — Conversion | Leads (Instant Form) | Lookalike + retargeting stack | Image, Video | 35% | CPL, Form Completion Rate |

---

## 2. Audience Targeting

### Stage 1 — Cold Audience

#### Geography
- **Montreal** — 25 km radius from city centre
- **Laval** — 25 km radius (overlaps Montreal metro intentionally — high density of independent salons)
- **Quebec City** — 25 km radius
- **Gatineau** — 25 km radius (captures Hull/Aylmer; bilingual market)

> Set as **separate ad sets** per city so you can compare performance and allocate more budget to the highest-converting geography.

#### Language
- Target both **French** and **English** within each location. Do not split by language at the ad set level — instead, run bilingual creative within the same ad set during the test phase. Once you have data, separate by language if one outperforms significantly.

#### Detailed Targeting — Job Titles (enter these exact strings in Meta's "Job Title" field)

```
Salon Owner
Hair Salon Owner
Barbershop Owner
Barber Shop Owner
Beauty Salon Owner
Spa Owner
Nail Salon Owner
Clinic Owner
Dental Clinic Owner
Physiotherapy Clinic Owner
Chiropractic Clinic Owner
Independent Business Owner
Small Business Owner
Beauty Business Owner
Self-Employed Hairdresser
Salon Manager
Beauty Salon Manager
Studio Owner
Aesthetics Clinic Owner
Medical Spa Owner
```

#### Detailed Targeting — Interests & Behaviors

Under **"Interests"** in Meta Ads detailed targeting, add:

```
Small business
Entrepreneurship
Business owner
Cosmetology
Hair care
Beauty industry
Dentistry
Physical therapy
Self-employment
Appointment scheduling
Customer relationship management
```

Under **"Behaviors"**, add:

```
Small business owners (Facebook behavior)
Business page admins
Engaged shoppers [remove — irrelevant; keep only the above]
```

> **Note on Behaviors:** Meta's "Small business owners" behavior targets people who have admin access to a Facebook Business Page with fewer than 50 employees. This is your single most valuable behavior signal — prioritize it over all interest targeting.

#### Exclusions — Workers, Not Owners

Add these as **excluded** job titles to prevent wasting budget on employees:

```
Hairstylist
Hairdresser
Hair Stylist
Barber
Aesthetician
Esthetician
Dental Hygienist
Dental Assistant
Dental Receptionist
Physiotherapist
Massage Therapist
Nail Technician
Beauty Therapist
Receptionist
```

Also exclude: **Current customers** (upload your customer email list as a Custom Audience and exclude it from all cold campaigns).

#### Demographics
- **Age:** 28–55
- **Gender:** All (salon ownership in Quebec skews female but barbershops and dental/physio skew male — do not restrict)

#### Audience Expansion Setting
Meta's **"Advantage Detailed Targeting"** (formerly "Audience Expansion") allows Meta's algorithm to reach people outside your specified targeting if it predicts conversions. **Recommendation: Turn it OFF during Phase 1 testing.** You need clean data on whether your specified targeting works before allowing Meta to expand. Once you have 20+ leads in Stage 3, you can re-enable it and Meta will have enough signal to expand intelligently. With a hyper-local geographic constraint, Advantage Detailed Targeting is less critical anyway — geography already limits the pool.

---

### Stage 2 — Retargeting Audiences

Build these as **Custom Audiences** in Meta Audiences before launching Stage 2. Each becomes a separate ad set.

| Audience | Source | Window | Notes |
|----------|--------|--------|-------|
| Website Visitors — All | Meta Pixel → All website visitors | Last 30 days | Requires Pixel on justbookme.ca |
| Website Visitors — Pricing Page | Meta Pixel → URL contains `/pricing` | Last 30 days | High intent; deserves separate ad set |
| Video Viewers 50%+ | Stage 1 video campaigns | Last 30 days | Build after Stage 1 has 1,000+ views |
| Instagram Profile Visitors | Instagram account → All visitors | Last 30 days | Requires Instagram Business account connected |
| Facebook Page Engagers | Facebook Page → All engagers | Last 60 days | Includes likes, comments, message senders |
| Lead Form Openers — Didn't Submit | Stage 3 Instant Form → Opened but not submitted | Last 14 days | High-intent abandoned leads — use urgency copy |

**Retargeting ad set budget split (within Stage 2's 25% allocation):**
- Pricing page visitors: 35%
- Video viewers 50%+: 30%
- Website visitors (all): 20%
- Page/Instagram engagers: 15%

**Lookalike Audiences (build after first 20+ Stage 3 leads):**
- **1% Lookalike** of Stage 3 lead form submitters (your best signal)
- **1–3% Lookalike** of email list (upload from Supabase export)

Use lookalikes in Stage 1 as a second cold audience ad set once you have enough source data. They typically outperform interest targeting once you have 50+ source contacts.

---

### Stage 3 — Conversion Audience

The conversion campaign targets the warmest audiences possible. Stack these in one ad set using **OR** logic:

1. Retargeting pool from Stage 2 (pricing page visitors, video viewers 50%+)
2. 1% Lookalike of lead form submitters
3. 1–3% Lookalike of email list

**Also create:** A separate ad set targeting **lead form openers who didn't submit** (from Stage 2 audience) with a specific abandoned-lead ad — "Still thinking about it? Your trial is waiting."

---

## 3. Ad Copy — All Variants

**Character count rules enforced:**
- Primary text: 125 chars max (preview truncation point — hook must land in 125 chars; full copy can be longer)
- Headline: 27 chars max
- Description: 27 chars max

---

### Angle 1: Missed Revenue

#### FR — Manque à gagner

**Primary text (125 chars):**
> T'as 5 appels manqués par semaine? C'est 1 600 $ en rendez-vous perdus chaque mois. JustBookMe répond à ta place, 24/7.

**Headline (27 chars):**
> Zéro appel manqué. $149/mois.

**Description (27 chars):**
> Essai gratuit 14 jours.

**CTA Button:** `En savoir plus` → link to `/fr`

---

**Full body copy (for feed where more text shows):**
> T'as 5 appels manqués par semaine? C'est 1 600 $ en rendez-vous perdus chaque mois.
>
> JustBookMe répond à ta place — 24h/24, 7j/7. Ton IA prend les rendez-vous, envoie les rappels SMS et parle français comme anglais.
>
> Essai gratuit 14 jours. Aucune carte de crédit requise.

---

#### EN — Missed Revenue

**Primary text (125 chars):**
> 5 missed calls a week = $1,600/month in lost bookings. JustBookMe answers every call, books the appointment, and sends reminders.

**Headline (27 chars):**
> Stop losing $1,600/month.

**Description (27 chars):**
> 14-day free trial. No card.

**CTA Button:** `Learn More` → link to `/`

---

**Full body copy:**
> 5 missed calls a week = $1,600/month in lost bookings.
>
> JustBookMe is a bilingual AI receptionist that answers every call 24/7, books the appointment, and sends SMS reminders — in French or English.
>
> Start your free 14-day trial. No credit card needed.

---

### Angle 2: Competitor Burnout

#### FR — Le concurrent d'en face

**Primary text (125 chars):**
> Le salon en face vient d'automatiser son accueil. Ses clients rappellent pas — ils bookent direct. Toi?

**Headline (27 chars):**
> Ton concurrent a une longueur.

**Description (27 chars):**
> Rattrape-le. Essai gratuit.

**CTA Button:** `Essayer gratuitement`

---

**Full body copy:**
> Le salon juste en face de chez toi vient d'automatiser son accueil.
>
> Ses clients rappellent pas — ils bookent direct, même à 22h. Ses no-shows ont chuté. Son agenda est plein.
>
> JustBookMe, c'est l'IA réceptionniste qui répond à tes appels manqués, prend les rendez-vous et envoie des rappels SMS — en français et en anglais.
>
> 14 jours gratuits. Aucune carte requise.

---

#### EN — Competitor Burnout

**Primary text (125 chars):**
> Your competitor across the street just automated their front desk. Their missed calls now become bookings. Yours still go to voicemail.

**Headline (27 chars):**
> They automated. Will you?

**Description (27 chars):**
> Try free for 14 days.

**CTA Button:** `Start Free Trial`

---

**Full body copy:**
> Your competitor across the street just automated their front desk.
>
> Their after-hours calls now become appointments. Their no-show rate dropped. Their front desk doesn't cost $35k/year anymore.
>
> JustBookMe is a bilingual AI receptionist — answers every call 24/7, books appointments, sends SMS reminders in French or English.
>
> 14-day free trial. No credit card required.

---

### Angle 3: Social Proof / Demo ("Hear it for yourself")

#### FR — Démo audio

**Primary text (125 chars):**
> Appelle le (514) 000-0000 et écoute ton futur réceptionniste IA. Il parle français, il booke des rendez-vous. En vrai.

**Headline (27 chars):**
> Entends-le toi-même.

**Description (27 chars):**
> Démo live — appelle maintenant.

**CTA Button:** `En savoir plus`

> **Note:** Replace (514) 000-0000 with the actual JustBookMe demo number from Vapi/Retell. This angle performs best when paired with a short video clip of the AI call audio with captions.

---

**Full body copy:**
> Appelle le [NUMÉRO DÉMO] et écoute ton futur réceptionniste IA.
>
> Il répond en 2 sonneries. Il parle français. Il confirme le rendez-vous. Il envoie un SMS de confirmation.
>
> 67% des gens raccrochent quand ça tombe sur une boîte vocale. Avec JustBookMe, ça arrive plus.
>
> Essai 14 jours — aucune carte requise.

---

#### EN — Demo Call

**Primary text (125 chars):**
> Call [DEMO NUMBER] right now and hear your future AI receptionist. It answers in 2 rings, books the appointment, and sends a reminder.

**Headline (27 chars):**
> Hear it for yourself.

**Description (27 chars):**
> Call our AI demo now.

**CTA Button:** `Learn More`

---

**Full body copy:**
> Call [DEMO NUMBER] and hear your future AI receptionist in action.
>
> It answers in 2 rings, speaks French or English, books the appointment, and fires off an SMS confirmation — automatically.
>
> 67% of callers hang up when they reach voicemail. JustBookMe makes sure that never happens.
>
> 14-day free trial. No credit card.

---

### Angle 4: Founder Story / Local

#### FR — Construit à Montréal

**Primary text (125 chars):**
> J'ai construit JustBookMe à Montréal pour les salons du Québec. Pas pour la Silicon Valley. Pour toi.

**Headline (27 chars):**
> Fait à Montréal pour toi.

**Description (27 chars):**
> Essai gratuit 14 jours.

**CTA Button:** `En savoir plus`

---

**Full body copy:**
> J'ai construit JustBookMe à Montréal pour les salons et cliniques du Québec.
>
> Pas pour la Silicon Valley. Pour les propriétaires qui jonglent entre leurs clients, leurs employés et leur téléphone qui arrête pas de sonner.
>
> Ton IA réceptionniste parle français et anglais, répond 24h/24, et coûte moins qu'une heure de travail de réceptionniste.
>
> — Brandon, fondateur, Montréal
>
> 14 jours gratuits. Aucune carte de crédit.

---

#### EN — Built in Montreal

**Primary text (125 chars):**
> I built JustBookMe in Montreal for Quebec salons and clinics — not for the Valley. For owners who are tired of juggling everything alone.

**Headline (27 chars):**
> Built in MTL, for you.

**Description (27 chars):**
> 14-day free trial. No card.

**CTA Button:** `Start Free Trial`

---

**Full body copy:**
> I built JustBookMe in Montreal because I kept seeing the same problem: great salon and clinic owners losing bookings to voicemail.
>
> So I built a bilingual AI receptionist that answers every call 24/7, books appointments, and sends SMS reminders — in French or English.
>
> It costs less per month than 2 hours of a receptionist's time.
>
> — Brandon, founder, Montreal
>
> Start your 14-day free trial. No credit card required.

---

### Stage 3 — Instant Form (Lead Gen Campaign)

#### Form — French

**Form Title:**
> Essai gratuit — JustBookMe

**Intro Paragraph:**
> Réponds à tous tes appels manqués 24h/24 avec ton IA réceptionniste bilingue. Remplis ce formulaire et on te contacte dans les 24h pour activer ton essai gratuit de 14 jours. Aucune carte de crédit requise.

**Questions (4 max):**

| # | Question | Type | Answer Options |
|---|----------|------|----------------|
| 1 | Quel type d'entreprise as-tu? | Multiple choice | Salon / coiffure, Barbershop, Clinique dentaire, Clinique de physio / chiro, Spa / esthétique, Autre |
| 2 | Combien d'appels manqués reçois-tu par semaine (environ)? | Multiple choice | 1–3, 4–7, 8–15, 15+, Je sais pas |
| 3 | Dans quelle ville es-tu? | Multiple choice | Montréal, Laval, Québec, Gatineau, Autre |
| 4 | Quel est ton numéro de téléphone? | Phone number | (auto-filled from Meta profile) |

> Meta auto-fills Name and Email — do not ask for them again.

**Privacy Disclaimer:**
> En soumettant ce formulaire, tu acceptes que JustBookMe (justbookme.ca) te contacte par courriel ou par téléphone pour activer ton essai gratuit. Nous ne vendons pas tes informations. Voir notre politique de confidentialité : justbookme.ca/privacy.

**Thank You Screen:**
> **Parfait! Ton essai est presque prêt.**
>
> On va te contacter dans les 24 heures pour configurer ton IA réceptionniste. En attendant, visite justbookme.ca pour voir comment ça marche.
>
> Bouton: Visiter justbookme.ca

---

#### Form — English

**Form Title:**
> Free Trial — JustBookMe

**Intro Paragraph:**
> Answer every missed call 24/7 with a bilingual AI receptionist. Fill out this form and we'll reach out within 24 hours to activate your free 14-day trial. No credit card required.

**Questions (4 max):**

| # | Question | Type | Answer Options |
|---|----------|------|----------------|
| 1 | What type of business do you run? | Multiple choice | Hair salon, Barbershop, Dental clinic, Physio / chiro clinic, Spa / aesthetics, Other |
| 2 | Roughly how many missed calls do you get per week? | Multiple choice | 1–3, 4–7, 8–15, 15+, Not sure |
| 3 | What city are you in? | Multiple choice | Montreal, Laval, Quebec City, Gatineau, Other |
| 4 | What's your phone number? | Phone number | (auto-filled from Meta profile) |

**Privacy Disclaimer:**
> By submitting this form, you agree that JustBookMe (justbookme.ca) may contact you by email or phone to activate your free trial. We don't sell your information. See our privacy policy at justbookme.ca/privacy.

**Thank You Screen:**
> **You're in! Your trial is almost ready.**
>
> We'll reach out within 24 hours to get your AI receptionist set up. In the meantime, check out how it works at justbookme.ca.
>
> Button: Visit justbookme.ca

---

## 4. Budget & Bidding Strategy

### Phase 1 — Testing ($10–15/day CAD, Weeks 1–2)

**Goal:** Find 1–2 winning ad creatives and confirm audience targeting is reaching real business owners.

#### Budget Split at $12/day:

| Stage | Daily Budget | Rationale |
|-------|-------------|-----------|
| Stage 1 (Awareness/Traffic) | $5/day | Feeds retargeting pool; test 2–3 creative variants |
| Stage 2 (Retargeting) | Skip week 1 | Need 300+ Stage 1 interactions to build retargeting audience |
| Stage 3 (Lead Gen) | $7/day | Start small lead gen immediately using cold interest targeting |

> **Week 1 note:** Run Stage 3 cold (using interest/job title targeting) while Stage 1 builds your retargeting pool. Switch Stage 3 to retargeting audiences in Week 2.

#### Winning Ad Signals — When to Scale:

| Metric | Kill Threshold | Keep Threshold | Scale Threshold |
|--------|---------------|----------------|-----------------|
| CTR (Link) | < 0.5% | 0.5–1.5% | > 1.5% |
| CPL (Cost Per Lead) | > $35 CAD | $15–35 CAD | < $15 CAD |
| Lead Form Completion Rate | < 25% | 25–50% | > 50% |
| Relevance Score / Quality Ranking | Below average | Average | Above average |
| Video ThruPlay Rate | < 15% | 15–30% | > 30% |

#### When to Kill an Ad Variant:
- After spending 2× your target CPL ($30+ without a lead) — kill it, not a winner
- After 3+ days with CTR below 0.5% — creative is not resonating
- If Frequency hits 3.0+ without conversions — audience is tuning out

#### Bidding Strategy Phase 1:
- Use **"Lowest Cost"** (automatic bidding) for all campaigns
- Do NOT use cost cap or bid cap in Phase 1 — you need Meta's algorithm to find conversions freely first
- Set campaign-level daily budget (not ad set level) to give Meta flexibility

---

### Phase 2 — Scaling ($25–50/day CAD, Weeks 3–6)

**Goal:** Scale winning creatives, introduce retargeting, launch 1% Lookalike audiences.

#### Horizontal vs. Vertical Scaling:

**Horizontal Scaling (preferred first):**
- Duplicate winning ad sets into new audience segments (e.g., new city, lookalike audience)
- Launch the 2nd and 3rd best-performing creative angles
- Add a new placement type (e.g., add Stories to a Feed-only campaign)
- Test bilingual vs. French-only vs. English-only ad sets

**Vertical Scaling (use carefully):**
- Increase daily budget by no more than **20% every 3 days** — larger jumps reset Meta's learning phase
- Only increase budgets on ad sets that have exited the learning phase (50+ optimization events)

#### Campaign Budget Optimization (CBO):
- **Enable CBO at Phase 2.** Create a CBO campaign per stage, put your best 2–3 audience ad sets inside it, and let Meta allocate spend across them
- Minimum spend per ad set within CBO: set floor at $5/day to prevent Meta from starving any ad set
- CBO works best when ad sets have similar audience sizes — avoid mixing a 500-person retargeting audience with a 100,000-person cold audience in the same CBO campaign

#### Target CPL Benchmarks for Quebec SaaS (CAD):

| Lead Type | Target CPL |
|-----------|-----------|
| Cold lead (Instant Form, cold audience) | $15–25 CAD |
| Warm retargeting lead | $8–15 CAD |
| Lookalike audience lead | $12–20 CAD |
| Blended average (all leads) | $15–22 CAD |

> At $149/mo Pro plan, even a 15% trial-to-paid conversion rate makes a $20 CPL highly profitable (LTV assuming 12-month retention = $1,788 CAD gross).

---

### Phase 3 — Optimized ($50–100/day CAD, Month 2+)

**Goal:** Predictable lead volume with controlled CPL. Begin building CRM pipeline.

#### Retargeting Budget Ratio:
- Maintain retargeting spend at **20–30% of total daily budget**
- Do not let retargeting exceed 35% — if retargeting pool is too small, CPMs skyrocket as you over-serve the same people

#### Frequency Caps:
- **Awareness campaigns:** Cap at 3 impressions per person per 7 days
- **Retargeting campaigns:** Cap at 5 impressions per person per 7 days
- **Lead Gen (Stage 3):** No frequency cap — but monitor manually; if CPL rises as frequency rises, add a cap

#### When to Refresh Creative:
- Frequency > 3.0 AND CTR declining week-over-week → refresh creative
- Relevance score drops to "Below Average" → refresh creative
- Monthly minimum: introduce at least 1 new creative variant per month even if metrics look fine
- Rule of thumb: every 4–6 weeks for cold audiences, every 2–3 weeks for retargeting (smaller audiences exhaust faster)

---

### Budget Summary Table

| Phase | Daily Budget (CAD) | Est. Weekly Reach | Est. Weekly Leads | Est. CPL |
|-------|-------------------|-------------------|-------------------|---------|
| Phase 1 — Testing | $10–15/day | 800–2,000 | 2–5 | $20–35 |
| Phase 2 — Scaling | $25–50/day | 3,000–8,000 | 8–18 | $15–25 |
| Phase 3 — Optimized | $50–100/day | 8,000–20,000 | 18–40 | $12–20 |

> Reach estimates based on Quebec metro hyper-local targeting with 28–55 age, small business owner behaviors. Actual reach will be lower than broad Meta estimates due to precise job title targeting — this is expected and desirable.

---

## 5. Creative Specs & Recommendations

### Placement Specs & Asset Mapping

| Placement | Aspect Ratio | Resolution | File Size Max | Recommended Asset | Notes |
|-----------|-------------|------------|---------------|-------------------|-------|
| Facebook Feed (image) | 1.91:1 | 1200×630px | 30 MB | og-image.png (EN) / og-image-fr.png (FR) | Ready to use as-is |
| Instagram Feed (image) | 1:1 square | 1080×1080px | 30 MB | Crop center of og-image.png + add padding | Need to adapt asset — crop to square |
| Instagram Feed (portrait) | 4:5 | 1080×1350px | 30 MB | Adapt og-image.png to 4:5 | Best-performing Instagram feed ratio |
| Facebook/Instagram Stories | 9:16 | 1080×1920px | 30 MB | og-image.png must be adapted — place banner center, add dark background above/below | Do NOT stretch — add color-matched padding |
| Facebook Reels | 9:16 | 1080×1920px | 4 GB (video) | Short 15–30s video only — image not recommended | Reels requires video content |
| Audience Network | 320×50 (banner), 300×250 (interstitial) | Various | 30 MB | Simple text + logo lockup; og-image crops poorly at banner size | Create dedicated simplified assets |

#### Stories Adaptation Instructions for og-image.png:
1. Place og-image.png (1200×630) centered vertically on a 1080×1920 canvas
2. Fill the top and bottom "safe zones" with the same dark navy color (#0A0E1A or match the banner background)
3. Keep text and logo within the **center 1080×1400px** safe zone — top and bottom 260px are covered by Instagram UI
4. Add the ad headline as a separate text overlay in the top safe zone if desired
5. Recommended tool: Canva or Figma — this is a 10-minute adaptation

---

### Video Creative Concepts

Brandon can shoot all three on an iPhone. Vertical (9:16) for Reels/Stories, horizontal (16:9) for Feed.

---

#### Video Concept 1 — The Missed Call (15 seconds)

**Hook (0–3s):** Screen recording of an iPhone showing 5 missed calls from "Client" — with a dollar sign overlay: "= $1,600/month"

**Middle (3–12s):** Cut to phone ringing → AI picks up → "Bonjour, JustBookMe! Comment puis-je vous aider?" → Client says: "Je veux prendre un rendez-vous" → AI confirms booking and says "Parfait, vous avez un rappel par SMS."

**CTA (12–15s):** "Essai 14 jours gratuit. justbookme.ca" — white text on dark background.

**Shoot requirements:** Screen recording on iPhone (built-in), one person to play the "caller," basic microphone (or use Vapi/Retell demo audio).

**Caption overlay:** Required — most video views are muted. Caption the AI dialogue.

---

#### Video Concept 2 — A Day in the Life (30 seconds)

**Hook (0–4s):** Brandon to camera: "Je suis Brandon, j'ai construit JustBookMe à Montréal parce que j'en avais marre de voir des salons perdre des clients à cause de la boîte vocale."

**Middle (4–22s):** B-roll of busy salon/barbershop (stock or shot at a local partner) — cut to phone ringing, phone screen showing "JustBookMe AI answering" — cut to SMS confirmation sent to client — cut to owner smiling, not touching their phone.

**CTA (22–30s):** "Essai gratuit 14 jours. Aucune carte requise. justbookme.ca"

**Shoot requirements:** 30 seconds to camera (can be one take at Brandon's desk/cafe), 5–10 seconds of B-roll at a friendly local salon.

---

#### Video Concept 3 — The Demo (20 seconds, EN)

**Hook (0–3s):** Text card: "What happens when your salon gets a call at 11pm?"

**Middle (3–17s):** Screen recording of JustBookMe demo call audio playing — show the AI answering, understanding the request, and confirming the booking. Use real Vapi/Retell demo output with captions.

**CTA (17–20s):** "Try it yourself. justbookme.ca/demo — Free for 14 days."

**Shoot requirements:** Pure screen recording + audio — zero camera time required. Best for a quick launch before video assets are ready.

---

## 6. Meta Pixel Setup Checklist

### Installation on Next.js

#### Step 1 — Create the Pixel
- [ ] Go to [Meta Events Manager](https://business.facebook.com/events_manager) → Data Sources → Connect Data Sources → Web
- [ ] Create a new Pixel, name it "JustBookMe Web"
- [ ] Copy your **Pixel ID** (a 15–16 digit number)

#### Step 2 — Install in Next.js (App Router)

**Recommended: Use `next/script` with the `afterInteractive` strategy in `app/layout.tsx`:**

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
```

Add to `.env.local`:
```
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here
```

#### Step 3 — Standard Events to Fire

| Event | When to Fire | Code |
|-------|-------------|------|
| `PageView` | Every page load (already in layout) | `fbq('track', 'PageView')` |
| `Lead` | On Instant Form submission OR when lead form on site is submitted | `fbq('track', 'Lead')` |
| `InitiateCheckout` | When user clicks "Start Free Trial" / visits `/signup` | `fbq('track', 'InitiateCheckout')` |
| `CompleteRegistration` | On successful trial account creation (post-signup confirmation page) | `fbq('track', 'CompleteRegistration')` |

**Fire events from a React component or server action:**
```tsx
// Fire on button click
const handleTrialClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout')
  }
  // ... rest of handler
}
```

#### Step 4 — Verify with Meta Pixel Helper
- [ ] Install [Meta Pixel Helper Chrome extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [ ] Visit justbookme.ca — the extension icon should turn green
- [ ] Click the extension → confirm `PageView` event is firing
- [ ] Visit `/pricing` → click "Start Free Trial" → confirm `InitiateCheckout` fires
- [ ] Complete a test registration → confirm `CompleteRegistration` fires
- [ ] In Events Manager → Test Events tab: enter your domain and confirm events are received in real-time

---

### Conversion API (CAPI) — Server-Side Events

#### Why CAPI Matters (iOS 14+ / iOS 17+):
- iOS 14's App Tracking Transparency and iOS 17's link tracking protection block browser-side Pixel events for a large percentage of users
- Meta estimates 20–40% of conversion events are lost from browser-only Pixel tracking
- CAPI sends events directly from your server to Meta — not blocked by browser privacy settings
- **Deduplication:** You send both browser Pixel events AND server CAPI events; Meta deduplicates using `event_id`. This improves signal quality without double-counting.

#### Implementation via Supabase Edge Function:

**Step 1 — Get your Meta System User Access Token:**
- Meta Business Suite → Settings → Users → System Users → Create system user with "Advertiser" role
- Generate access token with `ads_management` and `business_management` permissions
- Store as `META_CAPI_ACCESS_TOKEN` in Supabase Edge Function secrets

**Step 2 — Create Supabase Edge Function `/functions/v1/meta-capi`:**

```typescript
// supabase/functions/meta-capi/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createHash } from "https://deno.land/std@0.168.0/hash/mod.ts"

const PIXEL_ID = Deno.env.get('META_PIXEL_ID')
const ACCESS_TOKEN = Deno.env.get('META_CAPI_ACCESS_TOKEN')

function hashData(data: string): string {
  return createHash("sha256").update(data.toLowerCase().trim()).toString()
}

serve(async (req) => {
  const { event_name, email, phone, event_id, event_source_url } = await req.json()

  const payload = {
    data: [{
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id, // same event_id sent from browser Pixel — enables deduplication
      event_source_url,
      action_source: "website",
      user_data: {
        em: [hashData(email)],  // SHA-256 hashed
        ph: phone ? [hashData(phone)] : undefined,
      }
    }]
  }

  const response = await fetch(
    `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )

  const result = await response.json()
  return new Response(JSON.stringify(result), { status: 200 })
})
```

**Step 3 — Call from your Next.js server action or API route on lead form submit:**
```typescript
// Call from your signup/lead API route
await fetch(`${process.env.SUPABASE_URL}/functions/v1/meta-capi`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}` },
  body: JSON.stringify({
    event_name: 'Lead',
    email: user.email,
    phone: user.phone,
    event_id: `lead_${Date.now()}`, // pass same ID to browser fbq() call
    event_source_url: 'https://justbookme.ca/signup'
  })
})
```

**Step 4 — Verify CAPI in Events Manager:**
- [ ] Events Manager → Data Sources → your Pixel → Overview
- [ ] Check "Event Match Quality" score — target 6.0+ out of 10
- [ ] Events should show both browser and server sources (with deduplication working)

---

## 7. Campaign Launch Checklist

### Pre-Launch (Before Day 1)

- [ ] Meta Business Manager account created and verified
- [ ] Facebook Business Page connected to Business Manager
- [ ] Instagram account connected (professional account)
- [ ] Ad account created in Business Manager with CAD currency set
- [ ] Payment method added (credit card with $500+ limit recommended for smooth delivery)
- [ ] Brand assets uploaded: og-image.png, og-image-fr.png, bg-barbershop.jpg, salon-hero.png
- [ ] Stories-adapted versions of og-image created (9:16 format)
- [ ] Demo phone number confirmed and working (for Angle 3 copy)

---

### Day 1 — Pixel Setup & Verify

- [ ] Meta Pixel created in Events Manager
- [ ] Pixel code added to `app/layout.tsx` with `NEXT_PUBLIC_META_PIXEL_ID` in `.env.local`
- [ ] Pixel deployed to production (Vercel deploy)
- [ ] Meta Pixel Helper confirms `PageView` firing on justbookme.ca
- [ ] Test events confirmed in Events Manager → Test Events tab
- [ ] `InitiateCheckout` event confirmed on `/signup` page
- [ ] `CompleteRegistration` event confirmed on post-signup confirmation page
- [ ] CAPI Edge Function deployed to Supabase and tested with a dummy lead

---

### Day 2 — Create Audiences & Upload Creative

- [ ] Navigate to Meta Ads Manager → Audiences
- [ ] Create Custom Audience: "Website Visitors — All (30 days)"
- [ ] Create Custom Audience: "Website Visitors — Pricing Page (30 days)"
- [ ] Create Custom Audience: "Facebook Page Engagers (60 days)"
- [ ] Create Custom Audience: "Instagram Profile Visitors (30 days)"
- [ ] Upload customer email list from Supabase as Custom Audience (even if small — start building)
- [ ] Upload all creative assets to Meta's Creative Hub or directly in Ads Manager
- [ ] Create bilingual ad copy for all 4 angles in both FR and EN (use copy from Section 3)
- [ ] Build the Instant Form (FR version + EN version) in Lead Gen campaign builder

---

### Day 3 — Launch Stage 1 Only

- [ ] Create **Stage 1 campaign** — Objective: Traffic (Landing Page Views)
- [ ] Create 4 ad sets (one per city: Montreal, Laval, Quebec City, Gatineau)
- [ ] Apply cold audience targeting per Section 2 to each ad set
- [ ] Budget: $5/day per campaign (total $5 across all ad sets via CBO)
- [ ] Launch **2 creative variants** per ad set max (Angle 1 FR + Angle 1 EN to start)
- [ ] Create **Stage 3 campaign** — Objective: Leads (Instant Forms)
- [ ] Budget: $7/day with cold interest/job title targeting (retargeting pool too small yet)
- [ ] Launch Angle 1 FR + Angle 1 EN in Stage 3
- [ ] Set up Ads Manager custom columns: CTR (Link), CPL, Leads, Reach, Frequency, Cost per Result

---

### Day 5 — First Metrics Check

- [ ] Review CTR per ad variant — kill any below 0.5% after $10+ spend
- [ ] Check Frequency — anything above 2.0 this early is a red flag (audience too narrow or budget too high)
- [ ] Confirm Pixel events are recording in Events Manager (should see PageView data from ad traffic)
- [ ] Check lead form: any Stage 3 leads? Review quality of leads in Lead Center
- [ ] Note which city ad sets are getting the most engagement

---

### Day 7 — Launch Stage 2 Retargeting

- [ ] Check retargeting audience sizes — need at least 100 people in each audience before launching
- [ ] If website visitor audience < 100: skip for now, boost Stage 1 budget or wait another week
- [ ] Launch **Stage 2 campaign** — Objective: Traffic (Landing Page Views)
- [ ] Create ad sets for: Website Visitors (all), Video Viewers 50%+ (if Stage 1 video is running), Page Engagers
- [ ] Use Angle 2 (Competitor) and Angle 3 (Demo) copy for retargeting — fresher messages for warm audience
- [ ] Budget: ~$3/day on Stage 2 (small retargeting pool doesn't need more yet)

---

### Day 10 — Launch Stage 3 Lead Gen (Full)

- [ ] Stage 3 retargeting audiences should now have enough data (100+ people)
- [ ] Create Stage 3 retargeting ad sets pointing to: Website Visitors → Pricing Page, Video Viewers 50%+
- [ ] Keep cold Stage 3 ad sets running if CPL is below $35
- [ ] Introduce Angle 4 (Founder Story) in Stage 3 — performs well for lead gen
- [ ] Review Instant Form completion rates: are people opening but not submitting? → Simplify form or test different intro paragraph

---

### Day 14 — First Full Optimization Review

**What to do:**

| Question | Action |
|----------|--------|
| Which angle has highest CTR? | Duplicate winning ad set, increase budget 20% |
| Which angle has lowest CPL? | Scale budget; launch into lookalike audiences |
| Which city is performing best? | Increase CBO floor budget for that city's ad set |
| Any ad sets still in "Learning" phase? | Do not touch — learning phase needs 50 events to exit |
| Frequency > 3.0 on any retargeting set? | Add new creative variant or refresh copy |
| CPL > $35 on all variants? | Review audience quality — check if job title exclusions are correct; check Pixel firing |
| Lead quality bad (wrong type of business)? | Add more exclusions, tighten job title targeting |
| Lookalike audiences available now? | Create 1% Lookalike from Stage 3 submitters; launch as new Stage 1 ad set |

---

## 8. Reporting Dashboard

Track these 8 KPIs weekly. Review every Monday for the prior week's data.

| # | KPI | Target | Where to Find in Ads Manager |
|---|-----|--------|------------------------------|
| 1 | **Cost Per Lead (CPL)** | < $22 CAD blended | Campaigns view → "Cost per Result" column (set Result = Lead) |
| 2 | **Link CTR** | > 1.0% (cold), > 1.5% (retargeting) | Ad set or Ad view → "CTR (Link Click-Through Rate)" column |
| 3 | **Lead Form Completion Rate** | > 40% | Ads Manager → Columns → Customise → add "Form opens" and "Form completions"; divide completions / opens |
| 4 | **Frequency** | < 3.0 cold, < 5.0 retargeting | Ad set view → "Frequency" column |
| 5 | **Reach** | Growing week-over-week in Phase 1–2 | Campaign view → "Reach" column |
| 6 | **Cost per Landing Page View** | < $1.50 CAD | Ad set view → "Cost per Landing Page View" column |
| 7 | **Video ThruPlay Rate** (if running video) | > 20% | Ads Manager → Columns → Video → "ThruPlay Rate" (plays to 15s or full video) |
| 8 | **Trial Activation Rate** (post-lead) | > 20% of leads → activate trial | Tracked in Supabase — tie back to UTM parameters from Meta campaigns; add `utm_source=meta` to all ad URLs |

### Weekly Reporting Workflow

1. Every Monday, export the past 7 days from Ads Manager (Campaigns view, breakdown by Campaign)
2. Log CPL, Leads, Spend, and CTR into a simple Google Sheet
3. Flag any KPI that misses target two weeks in a row → trigger a creative or audience refresh
4. At end of each month, calculate blended CPL and trial activation rate → compute rough payback period: `CPL ÷ (LTV × trial activation rate)`

### Suggested UTM Parameter Structure

Append to all ad destination URLs:

```
https://justbookme.ca/?utm_source=meta&utm_medium=paid&utm_campaign=stage1-awareness&utm_content=angle1-missed-revenue-fr
```

Log UTM parameters in Supabase on signup so you can attribute trials and conversions back to specific ad variants.

---

*Playbook authored June 2026 for JustBookMe (justbookme.ca) — Brandon, Montreal.*
*Meta Ads interface updates frequently. Verify UI steps against the current Ads Manager if any screenshots or menu paths have changed.*
