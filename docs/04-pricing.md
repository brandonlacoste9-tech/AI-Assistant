# JustBookMe — Pricing

All prices in **CAD**. Two self-serve tiers. Annual billing = **17% off** (two months free).

| Tier | Price | Staff | Bookings/mo | SMS | Voice minutes | Checkout |
|------|-------|-------|-------------|-----|---------------|----------|
| **Starter** | $49 | up to 2 | 100 | 500 | 200 | Stripe, `plan=starter` |
| **Pro** | $149 | unlimited | unlimited | 5,000 | 2,500 | Stripe, `plan=pro` |

There is no Premium tier and no mailto-only White Glove tier. Pro is the $149 plan. Its Stripe price env vars keep the historical names `STRIPE_PRICE_WHITE_GLOVE_MONTHLY` and `STRIPE_PRICE_WHITE_GLOVE_ANNUAL` so existing price IDs still resolve. `STRIPE_PRICE_PRO_*` and `STRIPE_PRICE_PREMIUM_*` are not read.

## Trial

- **7 days**, no credit card
- Signup writes `businesses.plan = starter` and a `trialing` subscription. Limits during that window are the trial caps (40 bookings, 80 SMS, 30 voice minutes, 1 staff), not the paid Starter or Pro caps.
- After the trial, checkout Starter ($49) or Pro ($149). Both are self-serve.

## Annual pricing

| Tier | Monthly | Annual (17% off) |
|------|---------|------------------|
| Starter | $49 | $490/yr |
| Pro | $149 | $1,490/yr |

## Env vars checkout reads

| Variable | Amount | Plan |
|----------|--------|------|
| `STRIPE_PRICE_STARTER_MONTHLY` | $49 CAD | starter |
| `STRIPE_PRICE_STARTER_ANNUAL` | $490 CAD | starter |
| `STRIPE_PRICE_WHITE_GLOVE_MONTHLY` | $149 CAD | pro |
| `STRIPE_PRICE_WHITE_GLOVE_ANNUAL` | $1,490 CAD | pro |

Create them in test mode with `cd web && npm run stripe:setup`. The command prints the `price_…` ids to add to `.env.local` / Netlify. This repo does not commit live price ids.
