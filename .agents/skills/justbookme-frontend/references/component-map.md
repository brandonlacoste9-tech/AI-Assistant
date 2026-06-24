# JustBookMe Component Map

Root: `web/src/components/`

## By area

| Folder | Role | Server vs client |
|--------|------|------------------|
| `ui/` | Primitives — `Button`, `Input`, `Logo`, `LanguageToggle` | Mixed (`Logo`, `LanguageToggle` client) |
| `layout/` | `Header`, `Footer` | Server |
| `marketing/` | Homepage sections, hero, pricing, waitlist | Mostly server; `WaitlistForm` client |
| `auth/` | `LoginForm` | Client |
| `signup/` | `SignupForm` | Client |
| `onboarding/` | `OnboardingWizard` | Client |
| `dashboard/` | Operator UI — lists, forms, settings cards | Mostly client (mutations) |
| `public/` | `PublicBookingForm`, `EmbedLeadForm` | Client |
| `legal/` | `LegalPage` | Server |
| `pricing/` | `PricingSection` | Client (interval toggle) |

## Page → data flow

```
page.tsx (server)
  ├─ getLocale() + getDictionary(locale)
  ├─ requireBusinessContext() / createSupabaseServerClient()
  ├─ fetch data server-side
  └─ pass dict + data as props → client list/form components
       └─ mutations: fetch("/api/...") → router.refresh()
```

## Route layouts

| Layout | File | Notes |
|--------|------|-------|
| Root | `app/layout.tsx` | Fonts, `lang`, metadata |
| Marketing | `app/(marketing)/layout.tsx` | Header + footer |
| Dashboard | `app/(app)/dashboard/layout.tsx` | `DashboardNav`, onboarding gate |
| Public book | `app/(public)/layout.tsx` | Minimal chrome |

## Styling sources

1. `app/globals.css` — CSS variables + `.card`, `.btn-primary`, `.input-field`, etc.
2. Tailwind v4 utilities — `className` with `var(--token)` for colors
3. `cn()` from `lib/utils.ts` — `clsx` + `tailwind-merge`

## Fonts

Loaded in root layout via `next/font/google`:
- `--font-dm-sans` (body)
- `--font-fraunces` (`.font-display` headlines)

## i18n

- Strings: `lib/i18n/dictionaries.ts` — **always `fr` + `en`**
- Locale: `getLocale()` (cookie → Accept-Language → default `fr`)
- Pass `dict={t}` from server pages; do not import dictionary in client unless type-only (`import type`)

## Client component triggers

Use `"use client"` when the component needs:
- `useState`, `useEffect`, event handlers
- `useRouter` for `refresh()` after API mutation
- Browser APIs (`window.confirm`, cookies via client action)

Keep everything else server-side.