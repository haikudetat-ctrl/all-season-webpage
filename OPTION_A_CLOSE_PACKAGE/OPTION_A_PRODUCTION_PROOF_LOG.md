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
| Website event persistence | Passed | Vercel `SUPABASE_SERVICE_ROLE_KEY` is now present; `/api/website-event` returns `stored:true`. |
| Quote/session/event persistence | Passed | Production roof quote path created the quote journey and accepted lead without storage errors. |

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

## Service Role Key Verification

After `SUPABASE_SERVICE_ROLE_KEY` was added to Vercel Production, 2Stack reran the production checks.

### Direct Website Event Test

| Field | Value |
|---|---|
| API | `https://all-season-webpage.vercel.app/api/website-event` |
| Event | `quote_started` |
| Response | `200` / `{"ok":true,"stored":true}` |
| Notes | Stored without a quote session, proving direct event persistence is active. |

### Full Roof Quote Storage Test

| Field | Value |
|---|---|
| Test email | `service-role-verified+1781710403743@2stacksystems.com` |
| Session ID | `47ee6dc8-41f5-43e9-bcdd-1f7fb3739490` |
| Lead ID | `9e7ee141-bc06-4502-bae7-05ab2887a041` |
| Priority | `P0` |
| Route | `roofing_preview_queue` |
| Sequence | `roofing_day0_high_intent` |
| Script | `roof_quote_widget_opener` |
| Estimate event | `estimate_shown` stored during quote path |

### Existing Session Event Test

| Field | Value |
|---|---|
| Session ID | `47ee6dc8-41f5-43e9-bcdd-1f7fb3739490` |
| Event | `quote_step_completed` |
| Response | `200` / `{"ok":true,"stored":true}` |
| Notes | Stored against the quote session created by the production roof quote path. |

## Resolved Production Blocker

This former blocker is resolved:

```text
SUPABASE_SERVICE_ROLE_KEY
```

Vercel now lists `SUPABASE_SERVICE_ROLE_KEY` for Production and Preview. Production event storage returns `stored:true`, and the full quote path returns an accepted `P0` lead while completing the server-side quote journey.

## Operator Readout

The owned acquisition loop is now production-proven for lead creation, routing, quote journey persistence, and website event storage. The remaining non-product limitation is that the Supabase MCP token in the local Codex session expired during SQL verification, so direct SQL count checks should be rerun after reconnecting Supabase MCP if a database-row screenshot is needed.
