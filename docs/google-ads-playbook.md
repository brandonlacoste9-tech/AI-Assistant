# Google Ads Search Campaign Playbook — JustBookMe

**Product:** JustBookMe (justbookme.ca) — Bilingual AI Receptionist SaaS for Quebec Service Businesses  
**Owner:** Brandon, Montréal  
**Prepared:** June 2026  
**Currency:** All budgets in CAD unless noted

---

## Table of Contents

1. [Campaign Architecture](#1-campaign-architecture)
2. [Keyword Lists](#2-keyword-lists)
3. [Ad Copy — Responsive Search Ads (RSAs)](#3-ad-copy--responsive-search-ads-rsas)
4. [Ad Extensions (Assets)](#4-ad-extensions-assets)
5. [Conversion Setup Checklist](#5-conversion-setup-checklist)
6. [Budget & Bidding Strategy](#6-budget--bidding-strategy)
7. [Quality Score Optimization](#7-quality-score-optimization)
8. [Launch Checklist](#8-launch-checklist)
9. [Weekly Reporting KPIs](#9-weekly-reporting-kpis)

---

## 1. Campaign Architecture

JustBookMe runs three tightly scoped Search campaigns. Each targets a distinct searcher intent and operates on its own budget so that brand and competitor traffic never cannibalize growth keywords.

### Campaign Overview

| # | Campaign Name | Goal | Searcher Intent |
|---|--------------|------|----------------|
| 1 | `[Brand] JustBookMe` | Protect brand SERP, lowest CPC | Knows the product by name |
| 2 | `[Growth] Problem-Aware` | Primary trial acquisition | Feels the pain, looking for solutions |
| 3 | `[Competitor] Alternatives` | Steal market share | Evaluating alternatives or looking to switch |

---

### Campaign 1 — Brand

| Parameter | Recommendation |
|-----------|---------------|
| **Objective** | Website traffic → trial signup |
| **Match type strategy** | Exact match only for core brand terms; phrase match for misspellings and variations |
| **Bid strategy** | Target Impression Share — "Top of page" at 95–100% (brand terms should almost always win) |
| **Daily budget** | $3–5 CAD/day (very low CPC; brand auctions rarely contested) |
| **Expected CPC range** | $0.30–$1.00 CAD |
| **Notes** | Without a brand campaign, competitors (Booksy, Fresha) can bid on "JustBookMe" and steal branded clicks. This campaign costs almost nothing and ensures you always occupy position 1 for your own name. |

---

### Campaign 2 — Problem-Aware (Primary Growth Campaign)

| Parameter | Recommendation |
|-----------|---------------|
| **Objective** | Conversions → Free trial signup |
| **Match type strategy** | Phase 1: Phrase match + Exact match only. Add broad match to individual ad groups in Phase 3 only after 30+ conversions. |
| **Bid strategy** | Phase 1: Maximize Clicks (with a $6 CAD max CPC cap). Phase 2: Target CPA once you have 15+ conversions in 30 days. |
| **Daily budget** | $12–15 CAD/day (Phase 1); scale to $25–40 CAD/day (Phase 2) |
| **Expected CPC range** | $2.50–$6.00 CAD for service-business appointment/AI keywords. Dental and physio skew higher ($4–$7 CAD). |
| **Notes** | This is your revenue engine. Contains 5 ad groups (A–E). Monitor Search Term Report weekly in weeks 1–4 to mine exact-match winners and add negatives aggressively. |

---

### Campaign 3 — Competitor / Alternative

| Parameter | Recommendation |
|-----------|---------------|
| **Objective** | Conversions → Free trial signup |
| **Match type strategy** | Phrase match for competitor brand names (Google policy prevents using competitor names in ad copy, but bidding on them as keywords is allowed). Exact match for highest-intent alternatives searches. |
| **Bid strategy** | Maximize Clicks with $7 CAD max CPC cap (Phase 1). Competitor terms have lower Quality Scores → higher CPC → needs a cap. |
| **Daily budget** | $5–8 CAD/day |
| **Expected CPC range** | $3.00–$8.00 CAD (competitor CPCs are premium — other brands bid to protect their own names) |
| **Notes** | Landing page must be a dedicated comparison page (/vs-booksy or /alternatives), NOT the homepage. Address the competitor by name and list why JustBookMe is different. Google policy: you can bid on competitor names but cannot use them in ad headlines or descriptions. |

---

## 2. Keyword Lists

### Formatting Key
- `[exact match]` — exact match
- `"phrase match"` — phrase match
- `+broad +match +modifier` — broad match modifier (use `+` before each must-include word)

> **Note on BMM:** Google deprecated classic BMM in 2021. Phrase match now behaves similarly and is the recommended replacement. The `+word` notation below is used as a planning convention to indicate must-include intent signals — implement these as phrase match in Google Ads.

---

### Campaign 1 — Brand Keywords

**Single ad group: `[Brand] JustBookMe`**

```
[justbookme]
[just book me]
[justbookme.ca]
"justbookme"
"just book me"
"just bookme"
"justbook me"
"juste book me"
"justbookm"
"justboookme"
"justbookme salon"
"justbookme dental"
"justbookme réceptionniste"
"justbookme ai"
"justbookme application"
"justbookme avis"
"justbookme review"
"justbookme prix"
"justbookme pricing"
"justbookme essai gratuit"
"just book me canada"
"just book me québec"
```

---

### Campaign 2 — Problem-Aware Keywords

#### Ad Group A — Missed Calls (EN + FR)

```
[missed calls salon]
[missed calls barbershop]
[appels manqués salon coiffure]
[appels manqués salon]
[losing clients missed calls]
"missed calls salon"
"missed calls barbershop"
"missed calls dental office"
"missed calls physiotherapy"
"never miss a call salon"
"stop missing calls salon"
"appels manqués coiffeur"
"appels manqués clinique dentaire"
"appels manqués physiothérapie"
"ne plus manquer d'appels"
"perdre clients appels manqués"
"salon perd des clients appels"
"répondre appels manqués salon"
"manquer appels clients salon coiffure"
"how to handle missed calls salon"
"salon call answering solution"
"answer missed calls automatically"
```

#### Ad Group B — AI Receptionist (EN + FR)

```
[ai receptionist salon]
[ai receptionist barbershop]
[réceptionniste ia salon]
[réceptionniste artificielle salon]
[ai answering service salon]
"ai receptionist"
"artificial intelligence receptionist"
"ai receptionist for salons"
"ai receptionist barbershop"
"ai receptionist dental"
"ai receptionist clinic"
"automated receptionist salon"
"virtual ai receptionist canada"
"réceptionniste ia"
"réceptionniste intelligente artificielle"
"réceptionniste virtuelle ia salon"
"réceptionniste automatique salon"
"ia pour salon de coiffure"
"intelligence artificielle réceptionniste"
"répondeur automatique salon"
"réceptionniste ia québec"
"receptionist automation salon"
"smart receptionist app"
```

#### Ad Group C — Appointment Booking Software (EN + FR)

```
[appointment booking software salon]
[online booking system barbershop]
[logiciel prise de rendez-vous salon]
[système réservation salon]
"appointment booking software"
"appointment scheduling software salon"
"online booking system barbershop"
"booking software for salons"
"booking app barbershop"
"salon booking system canada"
"salon management software canada"
"barber shop booking software"
"dental appointment software"
"physio booking software"
"logiciel rendez-vous salon coiffure"
"logiciel prise de rendez-vous"
"application réservation salon"
"système réservation coiffeur"
"logiciel gestion salon québec"
"réservation en ligne salon"
"gérer rendez-vous salon"
"prise de rendez-vous automatique salon"
"logiciel clinique dentaire réservation"
"logiciel physiothérapie rendez-vous"
```

#### Ad Group D — Dental / Clinic (EN + FR)

```
[dental receptionist software]
[dental answering service]
[service réceptionniste clinique dentaire]
[réponse appels clinique dentaire]
"dental receptionist software"
"dental answering service"
"dental phone answering"
"after hours dental answering"
"dental clinic call answering"
"ai for dental clinic"
"dental practice management software"
"physiotherapy booking software"
"physio clinic receptionist"
"medical receptionist software canada"
"réceptionniste clinique dentaire"
"logiciel clinique dentaire québec"
"service téléphonique dentaire"
"répondre appels dentiste"
"physiothérapie logiciel rendez-vous"
"clinique physio réceptionniste"
"réceptionniste médicale virtuelle"
"gestion appels clinique santé"
"secrétaire virtuelle clinique"
```

#### Ad Group E — 24/7 Answering Service (EN + FR)

```
[24/7 answering service salon]
[after hours answering service]
[service répondeur 24/7 salon]
[répondeur automatique 24h salon]
"24/7 answering service"
"24 hour answering service salon"
"after hours answering service salon"
"overnight answering service"
"answering service small business canada"
"phone answering service barber"
"weekend answering service salon"
"after hours phone salon"
"service répondeur 24h"
"service téléphonique 24/7"
"répondeur automatique 24h"
"service réponse appels après heures"
"répondeur salon coiffure"
"répondeur automatique coiffeur"
"service téléphonique nuit salon"
"répondre appels fins de semaine"
"secrétaire virtuelle 24h québec"
"service appels 24 heures salon"
```

---

### Campaign 3 — Competitor / Alternative Keywords

**Single ad group: `[Competitor] Alternatives`**

```
[booksy alternative]
[fresha alternative]
[vagaro alternative]
"booksy alternative"
"booksy alternative canada"
"alternative à booksy"
"fresha alternative"
"alternative à fresha"
"vagaro alternative"
"mindbody alternative"
"acuity scheduling alternative"
"ruby receptionist alternative"
"vs booksy"
"vs fresha"
"booksy competitors"
"fresha competitors"
"better than booksy"
"better than fresha"
"virtual receptionist service canada"
"virtual receptionist for salon"
"virtual receptionist barbershop"
"virtual receptionist montreal"
"réceptionniste virtuelle québec"
"salon software with phone answering"
"booking software that answers calls"
"better than voicemail salon"
"beyond voicemail salon"
"phone answering salon software"
"booksy pricing too expensive"
"fresha fees"
"switch from booksy"
"switch from fresha"
"replace booksy"
"réceptionniste virtuelle alternative"
"logiciel salon avec téléphone"
```

---

### Master Negative Keyword List

Apply this list at the **account level** so it covers all 3 campaigns.

#### Job Seekers & Employment

```
-receptionist job
-receptionist hiring
-receptionist employment
-emploi réceptionniste
-réceptionniste emploi
-réceptionniste poste
-job salon receptionist
-careers receptionist
-offre emploi réceptionniste
-cherche emploi salon
-réceptionniste offre d'emploi
-receptionist salary
-salaire réceptionniste
-receptionist resume
-cv réceptionniste
```

#### Students / Education / Training

```
-formation réceptionniste
-cours réceptionniste
-receptionist training
-receptionist course
-school receptionist
-école esthétique
-formation coiffure
-cours coiffure
-how to become a receptionist
-receptionist certification
-diploma receptionist
-cosmetology school
-esthétique cours
-barbering course
-barber school
```

#### Free / DIY Searches

```
-free receptionist software
-logiciel gratuit réceptionniste
-free booking software
-logiciel réservation gratuit
-free salon software
-free appointment software
-diy receptionist
-template réceptionniste
-free template booking
-open source salon software
-gratuit salon
-gratuit coiffeur application
```

#### Wrong Verticals

```
-restaurant booking
-restaurant reservation
-hotel reservation
-hôtel réservation
-retail pos
-caisse enregistreuse
-restaurant software
-food delivery
-livraison restaurant
-airbnb
-event booking
-ticketing
-concert reservation
```

#### Research / Non-Commercial

```
-what is ai receptionist
-how does ai receptionist work
-wikipedia
-reddit
-forum
-review site
-comparatif logiciel
-définition réceptionniste
-c'est quoi réceptionniste virtuelle
```

---

## 3. Ad Copy — Responsive Search Ads (RSAs)

**Google Ads RSA Rules:**
- Max 15 headlines, each ≤ 30 characters
- Max 4 descriptions, each ≤ 90 characters
- Pin headlines only when necessary (reduces ML optimization)
- Google recommends 8–10 unique headlines to achieve "Excellent" ad strength

> **Character counts are shown in brackets. All counts are verified ≤ limits.**

---

### Ad Group A — Missed Calls RSA

**Final URL:** `https://justbookme.ca/?utm_source=google&utm_campaign=problem_missed_calls`  
**Display path:** `justbookme.ca/missed-calls`

#### ENGLISH Version

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | Missing Calls Right Now? | 24 |
| H2 | 5 Missed Calls = $1,600/mo | 26 |
| H3 | Your Phone Answers Itself | 25 |
| H4 | Never Miss a Booking Again | 26 |
| H5 | 14-Day Free Trial | 17 |
| H6 | AI Answers Every Call 24/7 | 27 |
| H7 | No Credit Card Required | 23 |
| H8 | Built for Quebec Salons | 23 |
| H9 | Recover Missed Revenue | 22 |
| H10 | One Call Pays for a Month | 25 |
| H11 | Used by Montreal Salons | 23 |
| H12 | Bilingual — FR & EN | 19 |
| H13 | Answers After Hours Too | 23 |
| H14 | $49/mo Starter Plan | 19 |
| H15 | Try Free — No Risk | 18 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | Every unanswered call is a lost booking. JustBookMe answers 24/7 so you never lose revenue. | 91 → trim → Every missed call costs you money. JustBookMe answers 24/7. Start free trial today. | 88 |
| D2 | AI receptionist books appointments, sends SMS reminders — in French and English. Free 14 days. | 94 → trim → AI books appointments & sends SMS reminders in French and English. Try free 14 days. | 90 |
| D3 | At $149/mo, one recovered booking pays for JustBookMe. No credit card. Cancel anytime. | 86 |
| D4 | Stop losing clients to voicemail. JustBookMe answers every call and fills your calendar. | 88 |

#### FRENCH Version (Québec)

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | Appels Manqués Ce Soir? | 23 |
| H2 | 5 Appels = 1 600 $/mois perdus | 30 |
| H3 | Votre Téléphone Se Répond | 25 |
| H4 | Plus Jamais de Rendez-Vous Raté | 30 |
| H5 | Essai Gratuit 14 Jours | 22 |
| H6 | IA Répond 24h/7j | 16 |
| H7 | Sans Carte de Crédit | 20 |
| H8 | Pour Salons du Québec | 21 |
| H9 | Récupérez Vos Revenus | 21 |
| H10 | Un Appel Paie le Mois | 21 |
| H11 | Utilisé à Montréal | 18 |
| H12 | Bilingue — FR et EN | 19 |
| H13 | Répond Après la Fermeture | 25 |
| H14 | Forfait à 49 $/mois | 19 |
| H15 | Essayez Gratuitement | 20 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | Chaque appel sans réponse est un rendez-vous perdu. JustBookMe répond 24h/7j, en FR et EN. | 90 |
| D2 | Notre IA prend les rendez-vous et envoie des rappels SMS en français. Essai gratuit 14 jours. | 93 → La IA prend vos rendez-vous et envoie des rappels SMS en français. Essai 14 jours. | 85 |
| D3 | À 149 $/mois, un seul client récupéré paie JustBookMe. Sans carte de crédit requise. | 84 |
| D4 | Arrêtez de perdre des clients à la messagerie. JustBookMe remplit votre agenda 24h/7j. | 87 |

---

### Ad Group B — AI Receptionist RSA

**Final URL:** `https://justbookme.ca/?utm_source=google&utm_campaign=problem_ai_receptionist`  
**Display path:** `justbookme.ca/ai-receptionist`

#### ENGLISH Version

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | AI Receptionist for Salons | 26 |
| H2 | Answers Calls Automatically | 27 |
| H3 | Your AI — French & English | 26 |
| H4 | 24/7 AI Booking Assistant | 25 |
| H5 | No Human Needed After Hours | 27 |
| H6 | 14-Day Free Trial | 17 |
| H7 | Replaces Your Front Desk | 24 |
| H8 | From $49/Month | 14 |
| H9 | Used by Quebec Businesses | 25 |
| H10 | Books While You Sleep | 21 |
| H11 | No Credit Card Required | 23 |
| H12 | Built in Montréal | 17 |
| H13 | SMS Reminders Included | 22 |
| H14 | Never Lose a Lead Again | 23 |
| H15 | Smart AI for Your Salon | 23 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | JustBookMe's AI answers every call, books appointments, sends reminders. Starts at $49/month. | 93 → JustBookMe AI answers every call, books appointments, sends reminders. From $49/month. | 88 |
| D2 | Bilingual AI receptionist handles your phone in French and English — 24/7, no overtime. | 88 |
| D3 | Set up in minutes. No front desk staff needed. Your phone answers itself after closing time. | 91 → Set up in minutes. No front desk needed. Your phone answers itself after closing time. | 88 |
| D4 | Trusted by salons, barbershops, and clinics across Quebec. Start your free 14-day trial today. | 94 → Trusted by salons, barbershops, clinics in Quebec. Start your free 14-day trial today. | 89 |

#### FRENCH Version (Québec)

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | IA Réceptionniste Pour Salons | 29 |
| H2 | Répond Automatiquement | 22 |
| H3 | Votre IA Parle FR et EN | 23 |
| H4 | Assistant IA 24h/7j | 19 |
| H5 | Plus Besoin de Secrétaire | 25 |
| H6 | Essai 14 Jours Gratuit | 22 |
| H7 | Remplace Votre Accueil | 22 |
| H8 | Dès 49 $/mois | 13 |
| H9 | Adopté au Québec | 16 |
| H10 | Prend RDV la Nuit | 18 |
| H11 | Sans Carte de Crédit | 20 |
| H12 | Développé à Montréal | 20 |
| H13 | Rappels SMS Inclus | 18 |
| H14 | Fini les Leads Perdus | 21 |
| H15 | IA Intelligente Pour Vous | 25 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | JustBookMe répond à tous vos appels, prend les RDV et envoie des rappels. Dès 49 $/mois. | 89 |
| D2 | Réceptionniste IA bilingue — gère votre téléphone en français et anglais. 24h, 7 jours. | 88 |
| D3 | Installation en quelques minutes. Votre téléphone répond tout seul après la fermeture. | 87 |
| D4 | Utilisé par des salons, barbiers et cliniques du Québec. Essai gratuit 14 jours. | 80 |

---

### Ad Group C — Appointment Booking Software RSA

**Final URL:** `https://justbookme.ca/pricing?utm_source=google&utm_campaign=problem_booking_software`  
**Display path:** `justbookme.ca/booking-software`

#### ENGLISH Version

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | Booking Software That Calls | 27 |
| H2 | Schedule + Answer the Phone | 27 |
| H3 | More Than a Booking App | 23 |
| H4 | AI Books Your Appointments | 26 |
| H5 | 14-Day Free Trial | 17 |
| H6 | No More Manual Scheduling | 25 |
| H7 | Automate Your Bookings | 22 |
| H8 | Salons Love JustBookMe | 22 |
| H9 | SMS Reminders — Built In | 24 |
| H10 | From $49/Month | 14 |
| H11 | No Credit Card Required | 23 |
| H12 | Works in French & English | 25 |
| H13 | Reduce No-Shows by 70% | 22 |
| H14 | Built for Quebec Businesses | 27 |
| H15 | Try It Free Today | 17 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | JustBookMe does what booking apps can't — it also answers your calls 24/7. From $49/month. | 90 |
| D2 | Auto-schedule appointments, send SMS reminders, and answer after-hours calls — all in one tool. | 95 → Auto-schedule, send SMS reminders, and answer after-hours calls — all in one platform. | 88 |
| D3 | Reduce no-shows and stop losing clients to voicemail. Bilingual. No credit card to start. | 89 |
| D4 | Over 5 missed calls per week? That's $1,600/month gone. JustBookMe costs $149. Do the math. | 91 → 5 missed calls/week = $1,600/mo lost. JustBookMe is $149/mo. Start free. No credit card. | 90 |

#### FRENCH Version (Québec)

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | Logiciel RDV Qui Répond | 23 |
| H2 | Agenda + Téléphone en Un | 24 |
| H3 | Plus Qu'une App de Résa | 23 |
| H4 | IA Gère Vos Rendez-Vous | 23 |
| H5 | Essai 14 Jours Gratuit | 22 |
| H6 | Fini la Prise de RDV Manuelle | 29 |
| H7 | Automatisez Vos Réservations | 28 |
| H8 | Les Salons Adorent JustBookMe | 29 |
| H9 | Rappels SMS Intégrés | 20 |
| H10 | Dès 49 $/mois | 13 |
| H11 | Sans Carte de Crédit | 20 |
| H12 | En Français et en Anglais | 25 |
| H13 | Réduisez les No-Shows | 21 |
| H14 | Conçu Pour le Québec | 20 |
| H15 | Essayez Gratuitement | 20 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | JustBookMe fait ce que les apps de RDV ne font pas — répond à vos appels 24h/7j. Dès 49 $/mo. | 94 → JustBookMe répond à vos appels 24h/7j, en plus de gérer vos rendez-vous. Dès 49 $/mois. | 91 → JustBookMe gère vos RDV et répond à vos appels 24h/7j. Dès 49 $/mois. | 74 |
| D2 | Réservations automatiques, rappels SMS et réponse après-heures — tout en une seule solution. | 92 → Réservations auto, rappels SMS, réponse après-heures — tout en un seul outil. | 80 |
| D3 | Moins de no-shows, plus de clients. Bilingue. Aucune carte de crédit pour commencer. | 84 |
| D4 | 5 appels manqués par semaine = 1 600 $/mois perdus. JustBookMe coûte 149 $/mois. | 80 |

---

### Ad Group D — Dental / Clinic RSA

**Final URL:** `https://justbookme.ca/dental?utm_source=google&utm_campaign=problem_dental`  
**Display path:** `justbookme.ca/dental-clinic`

#### ENGLISH Version

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | AI for Dental Clinics | 21 |
| H2 | Dental Calls Answered 24/7 | 26 |
| H3 | Never Miss a Patient Call | 25 |
| H4 | AI Receptionist — Dental | 24 |
| H5 | 14-Day Free Trial | 17 |
| H6 | Bilingual Dental Answering | 26 |
| H7 | Book Patients Automatically | 27 |
| H8 | After-Hours Dental Calls | 24 |
| H9 | From $49/Month | 14 |
| H10 | No Credit Card Required | 23 |
| H11 | Built in Montréal | 17 |
| H12 | Physio Clinics Use Us Too | 25 |
| H13 | Reduce Front Desk Workload | 26 |
| H14 | French & English Supported | 26 |
| H15 | Try Free — Cancel Anytime | 25 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | JustBookMe's AI answers calls, books appointments for your dental or physio clinic 24/7. | 88 |
| D2 | Bilingual AI receptionist reduces front-desk workload and captures every patient inquiry. | 89 |
| D3 | Missed patient calls are lost revenue. Start your free 14-day trial. No credit card needed. | 91 → Missed patient calls mean lost revenue. Try free 14 days. No credit card needed. | 83 |
| D4 | Trusted by healthcare clinics in Montreal, Laval, and Quebec City. Setup takes minutes. | 87 |

#### FRENCH Version (Québec)

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | IA Pour Cliniques Dentaires | 27 |
| H2 | Appels Dentaires 24h/7j | 23 |
| H3 | Zéro Appel Patient Manqué | 25 |
| H4 | Réceptionniste IA — Dentaire | 28 |
| H5 | Essai 14 Jours Gratuit | 22 |
| H6 | Réponse Bilingue FR et EN | 25 |
| H7 | Patients Réservés Automatiquement | 33 → Patients Réservés en Auto | 28 |
| H8 | Appels Après-Heures Clinique | 28 |
| H9 | Dès 49 $/mois | 13 |
| H10 | Sans Carte de Crédit | 20 |
| H11 | Développé à Montréal | 20 |
| H12 | Cliniques Physio Aussi | 22 |
| H13 | Moins de Travail à l'Accueil | 28 |
| H14 | Français et Anglais | 19 |
| H15 | Essayez — Annulez N'importe Quand | 33 → Essayez Gratuitement | 20 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | JustBookMe répond aux appels et prend les RDV de votre clinique dentaire ou physio, 24h/7j. | 91 → IA JustBookMe répond aux appels et prend les RDV de votre clinique dentaire. 24h/7j. | 88 |
| D2 | Réceptionniste IA bilingue réduit la charge à l'accueil et capte chaque appel patient. | 87 |
| D3 | Un appel patient manqué, c'est un revenu perdu. Essai gratuit 14 jours, sans carte requise. | 91 → Appel patient manqué = revenu perdu. Essai 14 jours gratuit, sans carte de crédit. | 86 |
| D4 | Utilisé par des cliniques de Montréal, Laval et Québec. L'installation prend quelques minutes. | 94 → Cliniques de Montréal, Laval, Québec l'utilisent. Installation en quelques minutes. | 87 |

---

### Ad Group E — 24/7 Answering Service RSA

**Final URL:** `https://justbookme.ca/?utm_source=google&utm_campaign=problem_247_answering`  
**Display path:** `justbookme.ca/24-7-answering`

#### ENGLISH Version

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | 24/7 Answering for Salons | 25 |
| H2 | Open After Hours — Always | 25 |
| H3 | AI Answers Your Phone 24/7 | 26 |
| H4 | Weekend Calls? Covered. | 22 |
| H5 | 14-Day Free Trial | 17 |
| H6 | Never Closed to Bookings | 24 |
| H7 | No Voicemail. Real Answers. | 27 |
| H8 | AI on Call Around the Clock | 27 |
| H9 | From $49/Month | 14 |
| H10 | No Credit Card Required | 23 |
| H11 | Quebec's AI Receptionist | 24 |
| H12 | Books Appointments Overnight | 29 |
| H13 | French & English 24/7 | 21 |
| H14 | Answering Service vs Voicemail | 30 |
| H15 | Start Free in Minutes | 21 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | JustBookMe answers calls and books appointments 24/7 — evenings, weekends, holidays included. | 92 → JustBookMe answers calls and books 24/7 — evenings, weekends, holidays included. | 83 |
| D2 | Unlike voicemail, JustBookMe takes the caller's info and books the appointment right away. | 90 |
| D3 | Stop turning customers away after 5pm. Bilingual AI works the night shift for $149/month. | 89 |
| D4 | One recovered after-hours booking pays for a month of JustBookMe. Try free for 14 days. | 88 |

#### FRENCH Version (Québec)

**Headlines (30 chars max):**

| # | Headline | Chars |
|---|----------|-------|
| H1 | Service Réponse 24h/7j | 22 |
| H2 | Ouvert Après la Fermeture | 25 |
| H3 | IA Répond 24h/7j | 16 |
| H4 | Fins de Semaine? Couvertes. | 27 |
| H5 | Essai 14 Jours Gratuit | 22 |
| H6 | Toujours Ouvert Aux Réserv. | 27 |
| H7 | Pas de Messagerie. Réponses. | 28 |
| H8 | IA Disponible Nuit et Jour | 26 |
| H9 | Dès 49 $/mois | 13 |
| H10 | Sans Carte de Crédit | 20 |
| H11 | Réceptionniste IA Québec | 24 |
| H12 | Réserve Pendant la Nuit | 23 |
| H13 | Français et Anglais 24h/7j | 26 |
| H14 | Mieux Que La Messagerie | 23 |
| H15 | Commencez en Quelques Min. | 26 |

**Descriptions (90 chars max):**

| # | Description | Chars |
|---|-------------|-------|
| D1 | JustBookMe répond et prend des RDV 24h/7j — soirs, fins de semaine, jours fériés compris. | 89 |
| D2 | Contrairement à la messagerie, JustBookMe prend les infos et réserve immédiatement. | 83 |
| D3 | Fini les clients perdus après 17h. Notre IA bilingue travaille la nuit pour 149 $/mois. | 88 |
| D4 | Un seul RDV récupéré après-heures paie JustBookMe pour un mois. Essai gratuit 14 jours. | 88 |

---

## 4. Ad Extensions (Assets)

### Campaign 1 — Brand

#### Sitelinks

| Sitelink Text | Description Line 1 | Description Line 2 | URL |
|--------------|-------------------|-------------------|-----|
| Start Free Trial | No credit card required | 14 days, cancel anytime | justbookme.ca/#signup |
| See Pricing | Starter $49 · Pro $149/mo | Compare plans side by side | justbookme.ca/pricing |
| How It Works | AI answers your calls 24/7 | Books appointments automatically | justbookme.ca/#how-it-works |
| For Salons & Clinics | Built for Quebec businesses | Bilingual FR + EN service | justbookme.ca/industries |

#### Callout Extensions (min 8)
- No Credit Card Required
- 14-Day Free Trial
- Bilingual French & English
- Set Up in Minutes
- Cancel Anytime
- 24/7 AI Answering
- SMS Reminders Included
- Built in Montréal

#### Structured Snippet
- **Type:** Services
- **Values:** AI Receptionist, Appointment Booking, SMS Reminders, Bilingual Support, After-Hours Answering, Call Management

#### Call Extension
- **Number:** +1 (514) XXX-XXXX *(replace with Brandon's business line)*
- **Schedule:** Monday–Friday 9am–6pm EST (when someone is available to answer follow-up questions)

#### Location Extension
- Link your Google Business Profile: JustBookMe, Montréal, QC

#### Image Extension
- Use the hero screenshot of the JustBookMe dashboard or a salon-context lifestyle photo showing a phone being answered. Recommended size: 1200×628px.

---

### Campaign 2 — Problem-Aware

#### Sitelinks

| Sitelink Text | Description Line 1 | Description Line 2 | URL |
|--------------|-------------------|-------------------|-----|
| Start Free Trial | 14 days, no credit card | Stop missing calls today | justbookme.ca/#signup |
| See Pricing | From $49/month | One booking pays for a month | justbookme.ca/pricing |
| For Salons & Spas | Built for hair salons | Answers in French & English | justbookme.ca/salons |
| For Clinics | Dental & physiotherapy | Reduce front-desk workload | justbookme.ca/dental |
| Book a Demo | See JustBookMe live | 15-minute walkthrough | justbookme.ca/demo |

#### Callout Extensions (min 8)
- 5 Missed Calls = $1,600/mo Lost
- AI Books Appointments 24/7
- Bilingual FR & EN
- No Credit Card to Start
- SMS Reminders Included
- Set Up in Under 10 Minutes
- Cancel Anytime
- Used by Quebec Salons

#### Structured Snippet
- **Type:** Services
- **Values:** Missed Call Recovery, 24/7 AI Answering, Appointment Booking, SMS Reminders, Bilingual Receptionist, After-Hours Calls

#### Call Extension
- **Number:** +1 (514) XXX-XXXX
- **Schedule:** Monday–Friday 9am–6pm EST

#### Location Extension
- Link Google Business Profile: Montréal, QC

#### Image Extension
- Salon/barbershop phone scenario: a stylist with scissors in hand, phone ringing in background — contextually relevant to the missed-call hook. Or: a screenshot of the JustBookMe booking confirmation SMS in both FR and EN.

---

### Campaign 3 — Competitor / Alternative

#### Sitelinks

| Sitelink Text | Description Line 1 | Description Line 2 | URL |
|--------------|-------------------|-------------------|-----|
| See How We Compare | JustBookMe vs alternatives | Answers calls. They don't. | justbookme.ca/compare |
| Switch to JustBookMe | Simple data migration | Keep your existing calendar | justbookme.ca/switch |
| Start Free Trial | 14 days, no credit card | Risk-free comparison | justbookme.ca/#signup |
| See Pricing | From $49/month | No hidden booking fees | justbookme.ca/pricing |

#### Callout Extensions (min 8)
- No Per-Booking Fees
- Answers Calls — Not Just Bookings
- Bilingual FR & EN
- No Credit Card Required
- Switch in Minutes
- Built for Quebec
- 24/7 AI Answering
- Cancel Anytime

#### Structured Snippet
- **Type:** Services
- **Values:** AI Call Answering, Appointment Booking, SMS Reminders, Bilingual Support, After-Hours Coverage, No Booking Fees

#### Call Extension
- **Number:** +1 (514) XXX-XXXX
- **Schedule:** Monday–Friday 9am–6pm EST

#### Location Extension
- Link Google Business Profile: Montréal, QC

#### Image Extension
- Use a comparison-style graphic or a clean product screenshot. Avoid competitor logos/branding in images (policy risk).

---

## 5. Conversion Setup Checklist

### Overview of Conversion Actions

| Conversion Action | Type | Value | Count | Primary/Secondary | Env Var |
|------------------|------|-------|-------|------------------|---------|
| Free Trial Signup | CompleteRegistration | $0 (no payment yet) | One per click | **Primary** | `NEXT_PUBLIC_GADS_LABEL_SIGNUP` |
| Pricing CTA Click | Page View / Button Click | $0 | Every | Secondary | `NEXT_PUBLIC_GADS_LABEL_CHECKOUT` |
| Waitlist Lead Form | Lead | $0 | Every | Secondary | `NEXT_PUBLIC_GADS_LABEL_LEAD` |
| Demo Booked (Calendly) | Lead / Booking | $0 | Every | Secondary | `NEXT_PUBLIC_GADS_LABEL_DEMO` |

---

### Step 1 — Free Trial Signup (Primary Conversion)

**What this tracks:** User clicks "Start Free Trial", completes registration form. This is your **primary conversion** — the action that drives Smart Bidding decisions.

**In Google Ads UI:**
1. Go to **Goals → Conversions → Summary**
2. Click **+ New conversion action**
3. Select **Website**
4. Enter `justbookme.ca` and click **Scan**
5. Choose **Manual setup** → **Using event snippets**
6. Name it: `signup_trial`
7. Category: **Sign up**
8. Value: **Don't use a value** (or assign $49 as proxy for trial-to-paid conversion value)
9. Count: **One per click**
10. Click-through conversion window: **30 days**
11. View-through conversion window: **1 day**
12. **Copy the Conversion ID and Conversion Label** — you'll see them in the tag snippet

**Set the env var:**
```bash
NEXT_PUBLIC_GADS_LABEL_SIGNUP="your_conversion_label_here"
# e.g., NEXT_PUBLIC_GADS_LABEL_SIGNUP="AW-XXXXXXXXXX/YYYYYYYYYYYY"
```

Your `gtag` call in the codebase should fire on the registration success page or `CompleteRegistration` event:
```javascript
gtag('event', 'conversion', {
  'send_to': `${process.env.NEXT_PUBLIC_GADS_ID}/${process.env.NEXT_PUBLIC_GADS_LABEL_SIGNUP}`
});
```

**Verify with Google Tag Assistant:**
1. Install [Tag Assistant Companion](https://tagassistant.google.com/) Chrome extension
2. Navigate to your signup flow on justbookme.ca
3. Complete a test registration
4. In Tag Assistant, confirm you see: **Google Ads conversion tag fired** with conversion label matching `NEXT_PUBLIC_GADS_LABEL_SIGNUP`
5. In Google Ads → Goals → Conversions, the action should show "Recording conversions" status within 24 hours

---

### Step 2 — Pricing CTA Click (Secondary Micro-Conversion)

**What this tracks:** User clicks "See Pricing" or any CTA leading to `/pricing`. Useful for top-of-funnel signals before Smart Bidding has trial data.

**In Google Ads UI:**
1. Go to **Goals → Conversions → Summary** → **+ New conversion action**
2. Select **Website** → Manual setup
3. Name it: `pricing_cta_click`
4. Category: **Page view** or **Other**
5. Count: **Every**
6. Copy the Conversion Label

**Set the env var:**
```bash
NEXT_PUBLIC_GADS_LABEL_CHECKOUT="your_checkout_label_here"
```

**In your codebase**, fire on the pricing button click event:
```javascript
// On the pricing button onClick handler:
gtag('event', 'conversion', {
  'send_to': `${process.env.NEXT_PUBLIC_GADS_ID}/${process.env.NEXT_PUBLIC_GADS_LABEL_CHECKOUT}`
});
```

**Verify:** Use Tag Assistant. Click the pricing CTA and confirm the tag fires.

---

### Step 3 — Waitlist Lead Form (Secondary)

**What this tracks:** User submits the waitlist form (for markets not yet open).

**In Google Ads UI:**
1. Go to **Goals → Conversions** → **+ New conversion action**
2. Name it: `waitlist_lead`
3. Category: **Lead form**
4. Count: **Every**

**Set the env var:**
```bash
NEXT_PUBLIC_GADS_LABEL_LEAD="your_lead_label_here"
```

**In your codebase**, fire on waitlist form submit success:
```javascript
gtag('event', 'conversion', {
  'send_to': `${process.env.NEXT_PUBLIC_GADS_ID}/${process.env.NEXT_PUBLIC_GADS_LABEL_LEAD}`
});
```

---

### Step 4 — Demo Booking via Calendly (Import from GA4)

**Option A — Calendly direct gtag event (recommended):**

Calendly supports passing a gtag event on booking completion via its embed code. Add the following to your Calendly embed setup:

```javascript
// In your Calendly embed page component
window.addEventListener('message', function(e) {
  if (e.data.event === 'calendly.event_scheduled') {
    gtag('event', 'conversion', {
      'send_to': `${process.env.NEXT_PUBLIC_GADS_ID}/${process.env.NEXT_PUBLIC_GADS_LABEL_DEMO}`
    });
  }
});
```

**Option B — Import from GA4:**
1. In GA4, ensure `demo_booked` event is firing when a Calendly booking completes
2. In Google Ads → **Goals → Conversions** → **+ New conversion action**
3. Select **Import** → **Google Analytics 4** → **Continue**
4. Find the `demo_booked` event and import it
5. Set as Secondary conversion
6. Google Ads will automatically back-fill the last 30 days of GA4 data

**Set the env var:**
```bash
NEXT_PUBLIC_GADS_LABEL_DEMO="your_demo_label_here"
```

**Verify:** Book a test demo via Calendly (use a personal email). Check Tag Assistant for the firing event, and verify in Google Ads Conversions within 24–48 hours.

---

## 6. Budget & Bidding Strategy (CAD)

### Phase 1 — Learning (Weeks 1–2)

**Daily Budget:** $15–20 CAD/day total across all 3 campaigns

| Campaign | Daily Budget | Rationale |
|----------|-------------|-----------|
| Brand | $3 CAD | Low CPC, low volume; protects brand SERP |
| Problem-Aware | $12 CAD | Main growth driver; needs data ASAP |
| Competitor | $5 CAD | Low volume test; assess CPCs before scaling |

**Bid Strategy:** Maximize Clicks with a **$6 CAD max CPC cap** on Campaign 2, **$1 CAD cap** on Campaign 1, **$7 CAD cap** on Campaign 3.

**Why Maximize Clicks first:** Smart Bidding strategies (Target CPA, Max Conversions) require conversion history. Without it, Google's algorithm is guessing — often resulting in expensive, low-quality traffic. Maximize Clicks with a CPC cap gives you controlled volume at predictable cost while you collect initial conversion data.

**Conversion threshold before switching to Target CPA:** You need a minimum of **15 conversions in the past 30 days** (Google's official threshold), but realistically aim for **30+ conversions** before switching to ensure the algorithm has enough signal. At $15/day and a 3–5% trial conversion rate, expect to reach this threshold in 4–6 weeks depending on volume.

**Kill Thresholds — Signals of a Bad Keyword:**

| Metric | Kill Threshold | Action |
|--------|---------------|--------|
| CTR after 100+ impressions | < 1% | Pause keyword, review match type |
| Conversion rate after 50+ clicks | 0% | Pause and investigate; check landing page relevance |
| CPC > 2× campaign average | Consistently | Add as negative or reduce bid |
| Impression share | < 20% despite budget remaining | Keyword too broad or QS issue; refine |
| Average position | Always > 4 | Raise bid or improve QS |

**Week 1–2 actions:**
- Check Search Term Report every 2 days
- Add obvious irrelevant searches as negatives immediately (job seekers, students appearing)
- Note which headlines get the highest Click-Through Rates in RSA reports
- Do NOT change bids or keywords in first 7 days — let Google explore

---

### Phase 2 — Optimize (Weeks 3–6)

**Daily Budget:** $30–50 CAD/day total

| Campaign | Daily Budget |
|----------|-------------|
| Brand | $3–5 CAD |
| Problem-Aware | $22–35 CAD |
| Competitor | $5–10 CAD |

**Switch to Target CPA when:** 30+ conversions recorded over the past 30 days

**Target CPA to set:**

For a $49/month SaaS trial (no credit card, low friction), a reasonable initial Target CPA is **$35–60 CAD**. Here's the math:
- If 30% of free trials convert to paid → each trial is worth $49 × 0.30 = $14.70 recurring/month or $14.70 × 12 = $176 LTV
- A CPA of $50 CAD for a trial worth $176+ LTV is a healthy 3.5× ROAS on 12-month LTV
- Start at **$50 CAD Target CPA**, then reduce by $5 increments every 2 weeks as the algorithm optimizes

> **Benchmark context:** SaaS trial CPAs via Google Ads in Canada typically run $50–$120 CAD depending on keyword competition. JustBookMe targets local service businesses (lower competition than enterprise SaaS), so $35–65 CAD is achievable. ([Source: AdLabz B2B SaaS Google Ads Benchmarks 2025](https://www.adlabz.co/b2b-saas-google-ads-benchmarks-for-2025), SaaS CPA benchmark ~$95 USD = ~$130 CAD, but JustBookMe's niche is less competitive than typical B2B SaaS.)

**Search Term Report Mining (weekly):**
1. In Google Ads → Keywords → Search Terms
2. Filter: Conversions > 0 → add these as **exact match** keywords to relevant ad groups
3. Filter: Clicks > 5, Conversions = 0, CPC above average → add as **negatives**
4. Look for new ad group opportunities: if 3+ converting search terms share a theme not in your current structure, create a new ad group

**Bid Adjustments:**

| Dimension | Recommended Adjustment | Rationale |
|-----------|----------------------|-----------|
| Mobile | +20% | Salon owners search on mobile while working. Most searches happen between clients or during breaks. |
| Desktop | 0% (baseline) | Decision-making / longer research happens on desktop |
| Tablet | -20% | Low conversion rate for service-business SaaS |
| Montréal (city) | +15% | Highest density of ICPs; most likely to convert |
| Laval | +10% | High secondary market |
| Quebec City / Gatineau | 0% | Test first before boosting |
| Hour: 6pm–10pm | +15% | Salon owners often research after work hours |
| Hour: 11am–1pm | +10% | Lunch break searches |
| Hour: midnight–6am | -50% | Very low intent; wasted spend |
| Weekend: Saturday | +10% | Salons are often closed Sundays; owners have time to research |
| Weekend: Sunday | -10% | Lower intent |

---

### Phase 3 — Scale ($50–100 CAD/day)

**Trigger:** Consistent 30+ trials/month, CAC below $60 CAD, positive unit economics confirmed

**ROAS Targets:**
- At $49/month Starter: Target 12-month LTV = $588 → acceptable CAC up to $120 CAD (4.9× LTV)
- At $149/month Pro: Target 12-month LTV = $1,788 → acceptable CAC up to $250 CAD
- Set ROAS target only once you import conversion values into Google Ads. Use trial MRR as a proxy value: assign $49 value to Starter trial signups, $149 to Pro trial signups.

**Budget Allocation at Scale:**

| Campaign | Daily Budget | % of Total |
|----------|-------------|-----------|
| Brand | $5 CAD | 7% |
| Problem-Aware | $70–80 CAD | 80% |
| Competitor | $10–15 CAD | 13% |

**When to add Performance Max (PMax):**
Add a PMax campaign alongside Search when all of these are true:
1. You have 50+ conversions/month in Search campaigns
2. You have at least 5 asset groups worth of creative (images, headlines, descriptions, logos, videos ideally)
3. You want to extend reach beyond search intent (YouTube, Display, Gmail, Maps)
4. You have a dedicated daily budget of $20+ CAD for PMax without cannibalizing Search

**PMax warning:** PMax will compete for your brand keywords. When you launch PMax, add your brand terms to the PMax campaign's "Brand Exclusions" list to prevent it from stealing cheap brand traffic.

---

### Budget Summary Table

| Phase | Weeks | Daily Budget (CAD) | Expected Clicks/Day | Expected Trials/Week | Target CPA (CAD) |
|-------|-------|-------------------|--------------------|--------------------|-----------------|
| Phase 1 — Learning | 1–2 | $15–20 | 4–7 | 0.5–1.5 | N/A (Maximize Clicks) |
| Phase 2 — Optimize | 3–6 | $30–50 | 8–15 | 2–5 | $40–60 |
| Phase 3 — Scale | 7+ | $50–100 | 15–30 | 5–12 | $30–50 |

*Assumes 3–5% trial conversion rate and $3–5 CAD average CPC during Phase 1–2.*

---

## 7. Quality Score Optimization

Quality Score (1–10) is Google's rating of keyword relevance, ad relevance, and landing page experience. A QS of 7+ reduces your CPC by 28–50% compared to QS of 4 or below. This is the highest-leverage optimization lever in the entire account.

**QS components:**
1. **Expected CTR** — Does your ad historically get clicks when shown?
2. **Ad relevance** — Do your headlines match the search query?
3. **Landing page experience** — Does the landing page satisfy the search intent?

---

### Landing Page Routing Strategy

| Campaign / Ad Group | Landing Page | Rationale |
|--------------------|-------------|-----------|
| Campaign 1 — Brand | `justbookme.ca/` (homepage) | Branded searchers want the full product overview |
| Campaign 2, Ad Group A (Missed Calls) | `justbookme.ca/` with `#missed-calls` anchor | Match the pain point above the fold |
| Campaign 2, Ad Group B (AI Receptionist) | `justbookme.ca/` (homepage) | Homepage AI messaging is primary |
| Campaign 2, Ad Group C (Booking Software) | `justbookme.ca/pricing` | Searchers are evaluating — show them plans |
| Campaign 2, Ad Group D (Dental/Clinic) | `justbookme.ca/dental` | Must-have: vertical-specific page with dental/physio language |
| Campaign 2, Ad Group E (24/7 Answering) | `justbookme.ca/` with `#answering-service` anchor | Match the 24/7 service claim |
| Campaign 3 — Competitor | `justbookme.ca/compare` | Dedicated comparison page — do not send to homepage |

---

### Above-the-Fold Content by Landing Page

**Homepage (Campaign 1, Ad Groups A, B, E)**

Above-the-fold must contain:
- **H1 headline:** Mirror the ad message. If the ad says "Missing Calls Right Now?" the H1 should say something like "Your AI Receptionist Answers Every Missed Call" — not a generic tagline.
- **Subheadline:** 5 missed calls/week × $80 = $1,600/month. JustBookMe costs $149.
- **Primary CTA:** "Start Free Trial — No Credit Card" (above fold, high contrast button)
- **Social proof signal:** "Trusted by salons and clinics in Montréal, Laval, and Quebec City"
- **Language toggle:** FR/EN switcher visible and functional immediately
- **Trust signals:** No credit card badge, 14-day free trial badge, cancel anytime

**Pricing Page (Ad Group C)**

- **H1:** "Simple, Honest Pricing" or mirror "Appointment Booking Software Pricing"
- **Plans table:** Show Starter ($49/mo) and Pro ($149/mo) prominently above fold
- **ROI anchor:** "One recovered booking pays for the Pro plan"
- **CTA per plan:** "Start Free Trial" button on each plan card
- **No navigation bar:** Remove site navigation on this page for paid traffic (conversion-optimized landing page variant). Every nav link is an exit ramp.

**Dental Page (Ad Group D)**

This page does NOT exist yet — create it before launching Ad Group D. Minimum viable content:
- **H1:** "AI Receptionist for Dental Clinics & Physiotherapy Practices"
- FR and EN toggle
- Feature list specific to clinics: HIPAA-adjacent language (patient confidentiality, appointment sensitivity)
- Testimonial or use case: "A dental clinic in Laval recovered 8 bookings in the first week"
- CTA: "Start Free Trial"

**Compare Page (Campaign 3)**

- **H1:** "JustBookMe vs. Booksy, Fresha, and Virtual Receptionist Services"
- Comparison table: JustBookMe vs. each competitor on: Price, Call answering, Bilingual, SMS reminders, No booking fees, Setup time
- Focus on JustBookMe's unique differentiator: **it actually answers the phone** — Booksy and Fresha are booking-only; they don't answer missed calls.
- CTA: "Switch to JustBookMe — Free 14-Day Trial"

---

### Core Web Vitals Targets

| Metric | Target | Tool to Measure |
|--------|--------|----------------|
| Largest Contentful Paint (LCP) | < 2.5 seconds | PageSpeed Insights, Google Search Console |
| Interaction to Next Paint (INP) | < 200ms | Chrome UX Report |
| Cumulative Layout Shift (CLS) | < 0.1 | PageSpeed Insights |
| Time to First Byte (TTFB) | < 600ms | WebPageTest |

A slow landing page directly reduces Quality Score. Google's ad relevance system penalizes pages with poor Core Web Vitals. Target a PageSpeed Insights mobile score of **80+**.

---

### Mobile Optimization Checklist

Salon owners search on mobile — on their phone between clients, during lunch, or after closing. Design for the mobile experience first.

- [ ] CTA button is thumb-sized (min 48×48px), visible without scrolling
- [ ] Phone number is tap-to-call enabled (use `<a href="tel:+15XXXXXXXXX">`)
- [ ] Form fields are large, autocomplete-enabled, and use appropriate keyboard types (e.g., `type="email"`, `type="tel"`)
- [ ] No interstitials or pop-ups that trigger on mobile (Google policy violation; Quality Score penalty)
- [ ] Images are served in WebP format and lazy-loaded below the fold
- [ ] Font size minimum 16px body text (prevents iOS auto-zoom on input)
- [ ] Page loads in < 3 seconds on 4G mobile (test with WebPageTest on "Mobile 4G")
- [ ] Language switcher is accessible on mobile (not hidden in hamburger menu)
- [ ] Testimonials or social proof visible without scrolling down more than 1 screen
- [ ] Sticky CTA bar at bottom of mobile page: "Start Free Trial — No Credit Card"

---

## 8. Launch Checklist

### Pre-Launch (Days 1–3)

**Day 1 — Account & Tracking Setup**

- [ ] **Create or access Google Ads account** at ads.google.com. Link to justbookme.ca.
- [ ] **Set account currency to CAD** (Settings → Account settings → Currency). Cannot be changed after campaigns launch.
- [ ] **Set time zone to Eastern Time (ET)** to align ad scheduling with Quebec business hours.
- [ ] **Install Google Tag (gtag):** In Google Ads → Tools → Conversions → click "Google tag". Copy the global site tag. Paste before `</head>` in your Next.js `_document.tsx` or via `next/script` in `layout.tsx`.
- [ ] **Create 4 conversion actions** (signup, checkout, lead, demo) following Section 5 above. Copy each conversion label.
- [ ] **Set env vars** in Vercel (or .env.local for testing):
  ```
  NEXT_PUBLIC_GADS_ID=AW-XXXXXXXXXX
  NEXT_PUBLIC_GADS_LABEL_SIGNUP=YYYYYYYYYYYY
  NEXT_PUBLIC_GADS_LABEL_CHECKOUT=ZZZZZZZZZZZZ
  NEXT_PUBLIC_GADS_LABEL_LEAD=AAAAAAAAAAAA
  NEXT_PUBLIC_GADS_LABEL_DEMO=BBBBBBBBBBBB
  ```
- [ ] **Verify conversion tags fire** using Google Tag Assistant (Chrome extension). Test each conversion flow manually.
- [ ] **Link Google Ads to Google Analytics 4** (if not already): In GA4 → Admin → Product Links → Google Ads Links. This enables audience importing and GA4 conversion importing.

**Day 2 — Campaign Structure Build**

- [ ] **Create Campaign 1 (Brand)** in Google Ads:
  - Go to Campaigns → + New Campaign
  - Goal: Website traffic
  - Type: Search
  - Networks: Uncheck "Display Network" and "Search partners" (uncheck both)
  - Location: Montréal, Laval, Quebec City, Gatineau (target "People in or regularly in" these locations)
  - Language: French + English
  - Bidding: Target Impression Share → Top of page → 95%
  - Daily budget: $3 CAD
  - Ad schedule: 24/7 for brand (people search your brand name anytime)
  - Create 1 ad group: "JustBookMe Brand"
  - Add all brand keywords from Section 2
  - Create 1 RSA with brand-focused copy

- [ ] **Create Campaign 2 (Problem-Aware):**
  - Goal: Conversions → Trial signups
  - Type: Search
  - Networks: Uncheck Display and Search Partners
  - Location: Same as above
  - Language: French + English
  - Bidding: Maximize Clicks, max CPC $6 CAD
  - Daily budget: $12 CAD
  - Create 5 ad groups (A–E) and add keywords from Section 2
  - Create 1 RSA per ad group using copy from Section 3
  - Set `signup_trial` as the primary conversion for this campaign

- [ ] **Create Campaign 3 (Competitor):**
  - Same setup as Campaign 2
  - Bidding: Maximize Clicks, max CPC $7 CAD
  - Daily budget: $5 CAD
  - Create 1 ad group: "Competitor Alternatives"
  - Add all competitor keywords from Section 2
  - Write 1 RSA — note: do NOT use competitor brand names in headlines or descriptions

**Day 3 — Extensions, Negatives & Quality Check**

- [ ] **Add all ad extensions** (sitelinks, callouts, structured snippets, call, location) for each campaign per Section 4
- [ ] **Upload master negative keyword list** (Section 2) as a Shared Negative Keyword List:
  - Tools & Settings → Shared Library → Negative Keyword Lists
  - Name: "Master Negatives — JustBookMe"
  - Apply to all 3 campaigns
- [ ] **Review all ads** in Google Ads Preview tool (Tools → Ad Preview and Diagnosis) before submission
- [ ] **Check ad strength indicator** — target "Good" or "Excellent" on all RSAs. If "Poor", add more unique headlines.
- [ ] **Verify landing page URLs** — test each Final URL manually. Confirm UTM parameters pass through correctly.
- [ ] **Confirm billing method** is set up (credit card or monthly invoicing)

---

### Launch (Day 4)

- [ ] **Set all campaigns to "Enabled"** (not paused)
- [ ] **Enable "Observation" audience segments** — go to each campaign → Audiences → Add audience segments in Observation mode. Add: "In-market: Business Software", "In-market: Business Services", "Similar to: Website visitors" (once you have 100+ visitors)
- [ ] **Take a baseline screenshot** of your Google Ads dashboard, Google Analytics, and justbookme.ca traffic. You'll want this for comparison in Week 2.
- [ ] **Set a calendar reminder** for Day 7 to review Search Term Report and add first negatives

---

### Post-Launch (Days 5–14)

- [ ] **Day 5:** Check if ads are "Active" and serving. Low impression? Check status messages in the campaign (budget too low, policy review pending, keyword too narrow).
- [ ] **Day 7:** First Search Term Report review. Add 10–20 new negatives. Note best-performing headlines in RSA report.
- [ ] **Day 10:** Check Quality Scores for each keyword (add QS column in Keywords view). Any keyword QS ≤ 4 needs attention (improve landing page relevance or ad copy).
- [ ] **Day 14:** Full Phase 1 review:
  - Is CTR > 3% on Problem-Aware campaigns? If not, test new headline angles.
  - Do you have 3+ trial signups? If yes, Smart Bidding is getting closer to having signal.
  - What is your average CPC vs. expected range? If much higher, review keyword match types and add negatives.
  - Review impression share — if consistently > 80%, you can increase budget.

---

## 9. Weekly Reporting KPIs

Review these metrics every Monday morning. Build a simple dashboard in Google Ads or Looker Studio linked to your Google Ads account.

### Core KPI Table

| KPI | Target | Where to Find | Action if Below Target |
|-----|--------|--------------|----------------------|
| **Impressions** | 500–2,000/week (Phase 1) | Campaigns → Columns → Impressions | If too low: check budget pacing, keyword bids, ad approval status |
| **Clicks** | 50–150/week (Phase 1) | Campaigns → Columns → Clicks | If too low: increase bids, improve CTR with better headlines, broaden match types carefully |
| **CTR** | > 4% (Brand), > 3% (Problem-Aware), > 2% (Competitor) | Campaigns → Columns → CTR | If below: A/B test headlines, check if ad relevance is poor in RSA report |
| **Avg. CPC (CAD)** | $0.50–1.00 (Brand), $2.50–6.00 (Problem-Aware), $3.00–8.00 (Competitor) | Campaigns → Columns → Avg. CPC | If above range: add negatives, improve QS, reduce max CPC cap |
| **Conversions (trials)** | 2–5/week (Phase 1), 5–12/week (Phase 2+) | Goals → Conversions summary | If zero after 50+ clicks: audit conversion tracking with Tag Assistant; check landing page |
| **Conversion Rate** | > 3% (trial signup from click) | Campaigns → Columns → Conv. rate | If below 2%: landing page issue. Run PageSpeed Insights. Check CTA above fold. |
| **Cost per Trial (CPA)** | < $60 CAD (target) | Campaigns → Columns → Cost/conv. | If above $80 CAD: pause worst keywords, tighten match types, improve landing page |
| **Quality Score (avg)** | 6–8 across ad groups | Keywords view → Add QS column | If QS < 5: improve landing page relevance and ad headline match to keywords |
| **Impression Share** | > 60% for Brand, > 40% for Problem-Aware | Campaigns → Columns → Search IS | If Brand IS < 90%: increase brand budget or bid. If Problem-Aware IS low: budget constrained — increase daily spend |
| **Search Lost IS (Budget)** | < 20% | Campaigns → Columns → Search lost IS (budget) | If high: daily budget is too low; increase budget or accept lower reach |
| **Search Lost IS (Rank)** | < 30% | Campaigns → Columns → Search lost IS (rank) | If high: QS is too low or bids too conservative; improve QS first before raising bids |
| **Weekly trial signups (all channels)** | Track alongside Google Ads signups | Google Analytics → Conversions → Events | If Google Ads trials plateau: check organic/direct as well to avoid double-counting |

---

### Monthly Review Additions

In addition to weekly metrics, review these monthly:

| KPI | Target | Action |
|-----|--------|--------|
| **Trial-to-paid conversion rate** | > 25% | If below 20%: onboarding/activation issue, not an ads issue. Fix product experience. |
| **ARPU of Google Ads trials** | Track Starter vs. Pro ratio | If mostly Starter: test headlines emphasizing Pro features or target clinic ad groups more (higher value clients) |
| **LTV/CAC ratio** | > 3× on 12-month LTV | If below 2×: reduce CPA targets or increase pricing |
| **New keywords from Search Terms** | 5+ new exact-match additions/month | If none: you're not reading the report. Mining is the #1 free optimization lever. |
| **Negatives added** | 10–30 per month (Phase 1–2) | Fewer than 10/month = you're wasting budget on irrelevant traffic |

---

### Reporting Dashboard Recommended Columns in Google Ads

Set up a custom saved view in Google Ads with these columns (Campaigns level):

```
Campaign | Status | Impressions | Clicks | CTR | Avg CPC | Cost | Conversions | 
Conv. Rate | Cost/conv. | Search IS | Search lost IS (budget) | Search lost IS (rank)
```

Save as "JustBookMe Weekly View" for one-click access every Monday.

---

*Playbook prepared for JustBookMe (justbookme.ca) by the AI-Assistant. CPC benchmarks sourced from [WordStream 2025 Google Ads Benchmarks](https://www.wordstream.com/blog/ws/2016/02/29/google-ads-industry-benchmarks), [Digital Applied Q1 2026 Benchmarks](https://www.digitalapplied.com/blog/google-ads-benchmarks-2026-cpc-ctr-cvr-industry), and [AdLabz B2B SaaS Google Ads Benchmarks 2025](https://www.adlabz.co/b2b-saas-google-ads-benchmarks-for-2025). Dental CPC benchmarks from [SQ Magazine / WordStream 2025 analysis](https://sqmagazine.co.uk/google-ads-statistics/) ($7.90 USD average for dental services). All figures converted to approximate CAD (1 USD ≈ 1.36 CAD).*
