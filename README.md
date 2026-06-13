# AllSeason Rebuild Site

Standalone Next.js website for the rebrand-ready AllSeason rebuild.

## What It Includes

- App Router public site for roofing, solar, roof-plus-solar readiness, batteries/generators, warranty, proof, service areas, contact, and roof quote.
- Code-managed brand/content files under `src/content`.
- Native roof quote flow with contact/consent gate before final estimate display.
- Server-only `POST /api/roof-quote` route that submits completed quote leads to the Supabase RevOps `lead-intake` Edge Function.
- Server-only `POST /api/website-event` route for quote, form, and call events.
- Unit/API tests for quote math, validation, source mapping, service-area rejection, and website event storage.

## Local Development

```bash
npm install
npm run dev -- -p 3001
```

For live backend lead submission, set:

```bash
REVOPS_INTAKE_URL=https://kljrgnfwrcbbiualgufd.supabase.co/functions/v1/lead-intake
REVOPS_INTAKE_KEY=<server-side-intake-key>
```

Optional server-side quote/session persistence uses:

```bash
SUPABASE_URL=https://kljrgnfwrcbbiualgufd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<server-side-service-role-key>
```

Never expose `REVOPS_INTAKE_KEY` or `SUPABASE_SERVICE_ROLE_KEY` through `NEXT_PUBLIC_` variables.

## Verification

```bash
npm test
npm run typecheck
npm run build
```
