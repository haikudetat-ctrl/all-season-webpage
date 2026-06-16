# Option A Production Proof Log

## Purpose

This log records the production-proof checks completed for the Option A package so Chris can see the system is more than a website mockup.

## Current Production URLs

| Item | URL |
|---|---|
| Public site | `https://all-season-webpage.vercel.app` |
| Roof quote route | `https://all-season-webpage.vercel.app/roof-quote` |
| Fight The Power route | `https://all-season-webpage.vercel.app/meta/fight-the-power` |
| Roof quote API | `https://all-season-webpage.vercel.app/api/roof-quote` |
| Fight The Power API | `https://all-season-webpage.vercel.app/api/solar-savings` |

## Verification Summary

| Check | Status | Notes |
|---|---|---|
| Next.js tests | Passed | `4` test files, `10` tests passed after adding Fight The Power intake. |
| Next.js build | Passed | Production build includes `/api/roof-quote`, `/api/solar-savings`, and `/api/website-event`. |
| RevOps hub tests | Passed | `2` test files, `9` tests passed after adding Fight The Power P0 routing. |
| Supabase Edge Function deploy | Passed | `lead-intake` deployed to version `3` with `verify_jwt: false`. |
| Live roof quote lead | Passed | Production request created accepted `P0` roofing lead. |
| Live Fight The Power lead | Passed | Production request created accepted `P0` solar lead. |
| Website event persistence | Blocked | Vercel is missing `SUPABASE_SERVICE_ROLE_KEY`, so `/api/website-event` returns `stored:false`. |

## Live Roof Quote Test

| Field | Value |
|---|---|
| Test email | `production-test+1781630677@2stacksystems.com` |
| Session ID | `c80c8a90-cb9f-4505-8968-6093438ae414` |
| Lead ID | `6bb749f5-fa65-4a72-88e4-29b16ac423f3` |
| Priority | `P0` |
| Route | `roofing_preview_queue` |
| Sequence | `roofing_day0_high_intent` |
| Script | `roof_quote_widget_opener` |
| Decision reason | `owned_roof_quote_roofing` |

## Live Fight The Power Test

| Field | Value |
|---|---|
| Test email | `fight-power-test+1781630952@2stacksystems.com` |
| Session ID | `52e513a2-19b7-4521-a6ad-42e35a015a14` |
| Lead ID | `0293c254-43ad-47ed-87c6-2fdc3b7ed6d4` |
| Priority | `P0` |
| Route | `solar_preview_queue` |
| Sequence | `solar_day0_high_intent` |
| Script | `fight_the_power_opener` |
| Decision reason | `meta_fight_power_solar_qualified` |

## Remaining Production Blocker

Add this Vercel environment variable to Production and Development:

```text
SUPABASE_SERVICE_ROLE_KEY
```

The only local candidate key failed a read-only Supabase REST auth check with `401`, so it was not added to Vercel.

Once the real key is added, rerun:

1. Submit `/api/roof-quote`.
2. Confirm `quote_sessions` has the session row.
3. Confirm `quote_estimates` has the estimate row.
4. Confirm `website_events` has `estimate_shown`.
5. Submit `/api/website-event` directly and confirm it returns `stored:true`.

## Operator Readout

The owned acquisition loop is now production-proven for lead creation and routing. The remaining gap is event/session persistence, which is an environment secret issue rather than an application logic issue.
