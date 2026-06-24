# RendezVous AI — Connected Infrastructure

## Supabase project

| Field | Value |
|-------|-------|
| Name | northern-ventures@outlook.com |
| Project ref | `ulbfaxhsbbckotcbmslk` |
| URL | `https://ulbfaxhsbbckotcbmslk.supabase.co` |
| Region | us-east-2 |
| Status | ACTIVE_HEALTHY |

### Tables deployed

- `waitlist_signups`
- `businesses`
- `users`
- `subscriptions`

### Auth URLs configured

- Site URL: `https://resilient-khapse-ecd31c.netlify.app`
- Redirects: `https://resilient-khapse-ecd31c.netlify.app/**`, `http://localhost:3000/**`

## Netlify — add these env vars NOW

**Site:** https://resilient-khapse-ecd31c.netlify.app

Netlify → Site configuration → Environment variables → add all four, then **Trigger deploy**.

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ulbfaxhsbbckotcbmslk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → `service_role` **secret** |
| `NEXT_PUBLIC_SITE_URL` | `https://resilient-khapse-ecd31c.netlify.app` |

Keys are **not** stored in this repo. Copy from [Supabase API settings](https://supabase.com/dashboard/project/ulbfaxhsbbckotcbmslk/settings/api).

## Maintenance scripts

```bash
# Run migration (requires SUPABASE_ACCESS_TOKEN in env — never commit)
node scripts/run-migration.mjs ulbfaxhsbbckotcbmslk supabase/migrations/001_initial.sql

# Update auth redirect URLs
node scripts/configure-auth.mjs ulbfaxhsbbckotcbmslk https://resilient-khapse-ecd31c.netlify.app
```

## Security

- Rotate your Supabase personal access token (`sbp_...`) if it was shared in chat
- Never commit `web/.env.local` or service role keys