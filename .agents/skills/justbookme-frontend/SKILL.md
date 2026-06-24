---
name: justbookme-frontend
description: "Use when implementing or reviewing JustBookMe frontend features in React 19 and Next.js 15. Triggers: components, pages, layouts, Tailwind CSS, Server/Client Components, dashboard UI, marketing pages, public booking forms, i18n FR/EN, performance, accessibility, Lucide icons."
---

# JustBookMe Frontend

React 19 + Next.js 15 App Router + Tailwind v4 frontend patterns for JustBookMe.

Read [references/component-map.md](references/component-map.md) for folder layout and data flow.

Also load:
- `justbookme-ui` — UX/a11y review criteria
- `justbookme-backend` — API contracts for client `fetch` calls
- `justbookme-dev` — project-wide done criteria

## Stack (actual)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router, React 19 |
| Language | TypeScript strict |
| Styling | Tailwind v4 (`@import "tailwindcss"`) + `globals.css` tokens |
| Icons | `lucide-react` |
| Fonts | `next/font/google` — DM Sans, Fraunces |
| Utils | `cn()` = clsx + tailwind-merge |
| State | Server Components + local `useState` — **no** TanStack Query, Zustand, Redux |

**Dropped from generic senior-frontend:** Python component generators, bundle analyzer scripts, React Native/Flutter, Docker/K8s deploy commands.

## Core rule: Server first

Default to Server Components. Add `"use client"` only when you need interactivity.

| Server (default) | Client (`"use client"`) |
|----------------|-------------------------|
| Pages (`page.tsx`) | Forms with submit handlers |
| Layouts with data fetch | Lists with inline edit/delete |
| Marketing sections | `useRouter().refresh()` after mutations |
| Static display | `useState` for UI state (filters, modals) |

Push the client boundary **down** — page fetches data; pass props to a client list.

### Server page pattern

```tsx
export default async function BookingsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const ctx = await requireOnboardedContext();
  const supabase = await createSupabaseServerClient();
  // ... fetch scoped data ...

  return <BookingsList dict={t} bookings={bookings} services={services} locale={locale} />;
}
```

### Client mutation pattern

```tsx
const res = await fetch("/api/bookings", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id, starts_at, service_id }),
});
if (!res.ok) { /* surface error */ return; }
router.refresh(); // re-run server page data fetch
```

Do not fetch secrets or service-role data from the client.

## Component organization

Place new components in the correct folder:

```
components/
  ui/          # Reusable primitives (Button, Input)
  layout/      # Header, Footer
  marketing/   # Public homepage sections
  dashboard/   # Operator app
  public/      # /book and /embed forms
  auth/        # Login
  signup/      # Signup
  onboarding/  # Wizard
```

Name files `kebab-case.tsx`, exports `PascalCase`. Match sibling file style.

## Styling

### Use design tokens — not random hex

```tsx
className="text-[var(--foreground)] bg-[var(--surface)] border-[var(--border)]"
```

Prefer existing utility classes from `globals.css`:
- `.card` — dashboard/marketing cards
- `.btn-primary` / `.btn-secondary` — CTAs (via `<Button variant="primary">`)
- `.input-field` / `.select-field` — form controls
- `.section-label` — uppercase gold labels
- `.font-display` — Fraunces headlines

### Tailwind conventions in this repo

- Spacing: `px-4 sm:px-6`, `py-6 sm:py-8`, `gap-4`, `space-y-4`
- Max width: `max-w-6xl mx-auto` for marketing; dashboard uses `lg:pl-64` for nav offset
- Responsive grids: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`
- Min touch height: `h-11` / `min-h-11` on primary actions (44px target)
- Focus: `focus-visible:ring-2 focus-visible:ring-[var(--primary)]`

Use `cn()` for conditional classes — see `dashboard-nav.tsx`, `bookings-list.tsx`.

### Do not

- Add shadcn/ui or new CSS frameworks
- Inline styles except dynamic values
- Create parallel color systems — extend `:root` in `globals.css` if needed

## i18n (mandatory)

1. Add strings to `lib/i18n/dictionaries.ts` in **both** `fr` and `en`
2. Server page: `const t = getDictionary(locale)` → pass `dict={t}` to children
3. Client components: receive `dict` as prop; use `dict.dashboard.bookings.title` etc.
4. Type-only import in client: `import type { Dictionary } from "@/lib/i18n/dictionaries"`
5. Avoid hardcoded `fr ? "..." : "..."` in new code — use dictionary keys (legacy homepage has some inline FR/EN; don't spread that pattern)

`LanguageToggle` sets locale cookie; `getLocale()` reads it on next request.

## UI primitives

Use existing components before creating new ones:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

<Button variant="primary" size="md">{t.save}</Button>
<Input name="phone" type="tel" required />
```

`DeleteItemButton` — reusable confirm + async delete with error state.

## Dashboard patterns

- **Nav**: `DashboardNav` — fixed left sidebar `lg:pl-64` on layout
- **Lists**: client component receives server-fetched data; filter/sort client-side when cheap
- **Inline edit**: local draft state → PATCH API → `router.refresh()`
- **Empty states**: show helpful CTA, not blank cards
- **Loading**: button `disabled` + label change; no global spinner library

## Marketing patterns

- **Hero**: `HeroSection` with `dict` + `locale`
- **Sections**: `SectionHeading` + grid; `grain` class for texture on dark hero
- **Links**: `next/link` for internal; pricing links include `?plan=&interval=`

## Public booking / embed

- `PublicBookingForm` — multi-step client form; fetches slots from `/api/public/slots`
- Minimal layout in `(public)/layout.tsx` — fast LCP, no dashboard chrome
- Mobile-first: single column, large inputs (`input-field` = 2.75rem height)

## Performance

| Technique | Application |
|-----------|-------------|
| Server Components | Default — less JS to client |
| `next/font` | Already in root layout — don't add duplicate font loads |
| `router.refresh()` | Prefer over client-side cache invalidation |
| Lucide imports | Named imports: `import { Phone } from "lucide-react"` |
| Images | Use `next/image` when adding raster images; SVG logo is static |
| CSS transitions | Hover on buttons — not JS animation (INP) |

Verify with `npm run build` — Next.js reports bundle and static/dynamic routes.

No bundle analyzer script in repo; build output + Lighthouse on marketing/book pages is sufficient unless user asks for deep analysis.

## Accessibility (implementation)

- Use `<Button>` / semantic `<button>` — not `<div onClick>`
- `aria-label` on icon-only buttons (`DeleteItemButton`)
- Form labels with `htmlFor` + `id`
- `aria-invalid` + `aria-describedby` for errors
- `lang` on `<html>` set in root layout from locale

Full UX audit criteria: `justbookme-ui` skill.

## Metadata & SEO

Root `generateMetadata()` uses dictionary strings + `getSiteUrl()`.  
New marketing pages: add `generateMetadata` with bilingual titles via dictionary keys.

## New feature checklist

1. Server page fetches data with business/locale context
2. Client component only if interactivity required
3. Strings in `dictionaries.ts` (fr + en)
4. Styling via tokens + existing utility classes
5. Mutations via `/api/*` + `router.refresh()`
6. `npm run build` passes in `web/`

## Definition of done

1. Server/client split is minimal and intentional
2. No hardcoded user-facing English-only strings
3. Uses `Button`/`Input`/`.card` conventions
4. Touch targets ≥ 44px on primary actions
5. `npm run build` passes

## Anti-patterns

| Don't | Do |
|-------|-----|
| `"use client"` on whole pages | Server page + client leaf |
| `useEffect` to fetch dashboard data | Server fetch in `page.tsx` |
| New state library | `useState` + `router.refresh()` |
| `fetch` in Server Components for internal APIs | Direct Supabase/lib calls |
| Inline `fr ? "x" : "y"` for new UI | Dictionary keys |
| Generic purple SaaS styling | Project navy/gold tokens |
| Tiny icon buttons without `aria-label` | Label or `title` + min touch area |