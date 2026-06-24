---
name: justbookme-ui
description: "Use when reviewing UI/UX, auditing accessibility, critiquing visual design, or implementing dashboard/marketing/public booking interfaces in JustBookMe. Triggers: screenshots, mockups, layout feedback, color/typography decisions, mobile usability, WCAG compliance, AI chat/copilot patterns, conversion friction on signup/pricing/booking flows."
---

# JustBookMe UI/UX

Research-backed design review and implementation guardrails for JustBookMe — professional Quebec SaaS for service businesses.  
Production reference: https://justbookme.ca

For implementation patterns (components, tokens, i18n), load `justbookme-dev` skill.

## Brand constraints (respect, don't override)

JustBookMe already has a cohesive identity. **Do not mandate font overhauls** unless the user explicitly asks for a redesign.

| Token | Value | Role |
|-------|-------|------|
| `--primary` | `#1e3a5f` navy | Trust, professionalism |
| `--accent` | `#c4a035` gold | CTAs, highlights |
| `--background` | `#faf7f2` warm paper | Atmosphere |
| `--foreground` | `#1a2332` | Body text |
| Display font | Fraunces (`.font-display`) | Headlines |
| Body font | DM Sans | UI copy |

Use existing classes: `.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.select-field`, `.grain` (texture).  
Extend tokens in `globals.css` — do not scatter one-off hex values in components.

## When to use full review format

Apply the structured review below when the user shares screenshots, asks for UX audit, or requests design feedback.  
For small implementation tasks, apply guardrails inline without the full template.

## Review structure

```markdown
## Verdict
[One paragraph: what's working, what's not]

## Critical Issues
### [Issue name]
**Problem**: ...
**Evidence**: [NN Group, WCAG, mobile research — link when helpful]
**Impact**: ...
**Fix**: [Specific solution with CSS/JSX using project tokens]
**Priority**: Critical | High | Medium | Low

## Aesthetic Assessment
**Typography** / **Color** / **Layout** / **Motion** — scoped to JustBookMe tokens

## What's Working
- ...

## Implementation Priority
Critical → High → Medium

## One Big Win
[Single highest-impact change if time is limited]
```

## Core usability principles

Apply to marketing (`/`), dashboard, public book (`/book/[slug]`), and embed (`/embed/[slug]`).

### Reading & attention

- **F-pattern**: Front-load value in first two paragraphs; scannable headings (NN Group).
- **Left-side bias**: Primary nav and key actions left-aligned on desktop — not centered nav.
- **Banner blindness**: Don't style critical CTAs like ads in hero sidebars or banner zones.

### Choice & interaction

- **Hick's Law**: Limit visible choices; group related actions; progressive disclosure in settings.
- **Fitts's Law**: Primary buttons large (`btn-primary` min ~44px height); related actions adjacent.
- **Jakob's Law**: Follow SaaS conventions for dashboard nav, forms, billing — novelty costs learning time.

### Mobile (54%+ traffic)

- Touch targets ≥ 44×44px design target (WCAG 2.2 SC 2.5.8 minimum 24×24px + spacing).
- Bottom-weight primary actions on mobile booking flows where possible.
- Avoid sole reliance on top-corner actions for critical paths.
- Test at 375px width — public book and embed must work one-handed.

### Quebec bilingual UX

- Language toggle must be obvious; never hide French.
- Form labels, errors, and confirmations in active locale.
- Date/time formats respect locale (FR: 24h common, day/month ordering).

## AI product patterns (voice + SMS receptionist)

When reviewing operator dashboard or customer-facing AI touchpoints:

| Pattern | Do | Don't |
|---------|-----|-------|
| Input | Multi-line settings for `voice_instructions`; contextual examples in onboarding | Single-line for complex instructions |
| Output | Show call transcripts as editable drafts; label AI-generated content | Present AI output as immutable fact |
| Loading | Skeleton or stage labels ("Connecting…", "Transcribing…") for 5–30s voice ops | Static spinner with no context |
| Trust | Confidence cues on uncertain intent; review before high-stakes send | Auto-send without operator visibility |
| Refinement | Edit greeting/instructions in Settings without reprovisioning from scratch | Full restart as only refinement path |

## Accessibility (WCAG 2.1 AA + 2.2)

Non-negotiables for every review and implementation:

- [ ] Keyboard: Tab order logical; Enter submits; Esc closes modals
- [ ] Focus visible and not obscured by sticky headers (SC 2.4.11)
- [ ] Contrast ≥ 4.5:1 text, ≥ 3:1 UI components — navy on warm paper usually passes; check gold on white
- [ ] Labels on all inputs; errors linked with `aria-describedby`
- [ ] Color not sole indicator of state (add icon/text)
- [ ] `prefers-reduced-motion`: disable decorative transforms

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Anti-patterns to call out

### Generic SaaS slop (fight unless user wants rebrand)

- Purple gradient heroes, Inter/Roboto defaults, three-column feature grids with no hierarchy
- Centered everything, cards-without-purpose, tiny 12px body text

### JustBookMe-specific

- Hardcoded English in FR locale
- Raw hex colors bypassing CSS variables
- Dashboard actions requiring horizontal scroll on mobile
- Public booking form with >7 visible fields before progressive steps
- Delete/destructive actions without confirmation
- Glass effects (`.card-dark`) on dense form content — reduces readability

### Motion

- Animations > 300ms on UI chrome
- JS-driven hover on every row (hurts INP) — use CSS `transition` on `transform`/`box-shadow` like existing `.btn-primary`

## Implementation snippets (use project tokens)

### Focusable primary CTA

```tsx
<button
  type="button"
  className="btn-primary min-h-11 px-5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
>
  {t.bookNow}
</button>
```

### Scannable dashboard section

```tsx
<section className="space-y-4">
  <p className="section-label">{t.today}</p>
  <h2 className="font-display text-2xl text-[var(--foreground)]">{t.overview}</h2>
  {/* content left-aligned, max-w readable */}
</section>
```

### Form field with error

```tsx
<label htmlFor="phone" className="text-sm font-medium text-[var(--foreground)]">
  {t.phone}
</label>
<input
  id="phone"
  name="phone"
  className="input-field"
  aria-invalid={!!error}
  aria-describedby={error ? "phone-error" : undefined}
/>
{error && (
  <p id="phone-error" role="alert" className="text-sm text-red-700">
    {error}
  </p>
)}
```

## Prioritization matrix

| Priority | Examples |
|----------|----------|
| **Critical** | WCAG failures, broken mobile booking, unreadable contrast, no keyboard access |
| **High** | Conversion friction (unclear pricing CTA), tiny touch targets, FR/EN inconsistency |
| **Medium** | Micro-interactions, skeleton loaders, visual hierarchy polish |
| **Low** | Experimental layout, edge-case animations |

## Sources (cite when relevant, don't paste walls of links)

- [Horizontal attention leans left](https://www.nngroup.com/articles/horizontal-attention-leans-left/) — left-align nav and key content
- [F-shaped reading](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) — scan-friendly headings
- [Fitts's Law](https://www.nngroup.com/articles/fittss-law/) — target size and distance
- WCAG 2.2: focus not obscured, target size, accessible authentication

## Personality

Be honest and specific. Say what fails and why. Provide fixes with exact token/class names — not "consider improving contrast." Prefer shipped improvements over theoretical perfection. Respect the existing Fraunces + navy/gold brand unless the user requests a redesign.