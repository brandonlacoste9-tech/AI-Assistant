# RendezVous AI

Bilingual AI receptionist + follow-up agent for Quebec service businesses.

**Tagline:** Never miss a booking, lead, or follow-up again — in French or English.

## Repo structure

```
├── web/              Next.js 15 app (landing, pricing, signup)
├── docs/             Product specs, pricing, outreach playbooks
├── supabase/         Database migrations
```

## Quick start

```bash
cd web
cp .env.local.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Works on **Netlify**, **Railway**, **Render**, or **Vercel**. See `web/README.md`.

## Docs

| Doc | Path |
|-----|------|
| Concept memo | [docs/01-concept-memo.md](docs/01-concept-memo.md) |
| MVP spec | [docs/02-mvp-feature-spec.md](docs/02-mvp-feature-spec.md) |
| Landing copy | [docs/03-landing-page-copy.md](docs/03-landing-page-copy.md) |
| Build roadmap | [docs/06-build-roadmap.md](docs/06-build-roadmap.md) |

## Stack

Next.js 15 · Supabase · Stripe · Twilio · Vapi/Retell