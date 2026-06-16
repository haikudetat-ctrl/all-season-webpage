# AllSeason RevOps Operating Map

## Purpose

This is the locked RevOps map for the AllSeason owned acquisition system.

It defines how 2Stack will capture, route, work, and measure leads from the rebuilt website, native roof quote engine, Meta landing pages, LSA, vendor leads, CallRail/offline sources, and future source imports.

The goal is not to create another reporting document. The goal is to create the operating contract between:

- website and landing page capture;
- Supabase lead intake;
- source attribution;
- preview queue routing;
- rep follow-up;
- CRM dispositions;
- owner-level source economics.

If the implementation, CRM fields, dialer queues, or dashboards disagree with this map, this map is the decision reference.

## Source Of Truth Files

Current implementation references:

- `src/lib/revops/intakePayload.ts`
- `src/lib/revops/backend.ts`
- `src/lib/revops/rest.ts`
- `src/components/QuoteFlow.tsx`
- `src/components/SolarSavingsForm.tsx`
- `META_FIGHT_THE_POWER_TOUCH_SEQUENCE.md`
- `META_OLD_ROOF_15_TOUCH_SEQUENCE.md`
- `META_ROOF_WARRANTY_TOUCH_SEQUENCE.md`
- `META_ROOFING_CAMPAIGNS_GTM_PACKAGE.md`
- `META_ADS_LAUNCH_STRATEGY.md`
- `OPTION_A_CLOSE_PACKAGE/OPTION_A_90_DAY_SCORECARD.md`
- `../allseason-revops-hub/supabase/functions/lead-intake/index.ts`
- `../allseason-revops-hub/supabase/migrations/001_revops_stage1.sql`
- `../allseason-revops-hub/supabase/migrations/003_website_quote_engine.sql`

## Operating Principles

1. Every lead must keep its source context through the first rep touch.
2. Owned website and owned quote leads are never treated like cold leads.
3. P0 leads get preview handling, not predictive dialer handling.
4. The first call opener must match the source the homeowner came from.
5. Lead quality is judged by qualified booked appointment and sold-job CAC, not raw CPL.
6. Suppression is tracked, not hidden.
7. Every scale/fix/cut decision needs source economics and handling data.

## Canonical Source Fields

Every captured lead should be shaped into this payload before hitting Supabase `lead-intake`.

### Required Top-Level Shape

```json
{
  "lead": {
    "external_ids": {},
    "person": {},
    "property": {},
    "interest": {},
    "source": {},
    "consent": {}
  }
}
```

### `external_ids`

| Field | Required | Source | Notes |
|---|---:|---|---|
| `quote_session_id` | When quote flow | Website | Current website sends this for roof quote. Store as the bridge to `quote_sessions`. |
| `leadmaster_id` | Optional | CRM | Used when updating an existing LeadMaster record. |
| `callrail_id` | Optional | CallRail | Required for offline call attribution imports. |
| `activeprospect_event_id` | Optional | ActiveProspect | Future production adapter. |
| `trustedform_cert_url` | Vendor/owned form if available | TrustedForm | Can also live under `consent.trustedform_cert_url`. |
| `vendor_lead_id` | Vendor leads | Vendor | Required for Roofing Calculator, Nest, lead seller dedupe. |

### `person`

| Field | Required | Normalization | Notes |
|---|---:|---|---|
| `first_name` | Yes | Trim | Minimum required by current intake. |
| `last_name` | No | Trim | Empty string allowed. |
| `phone` | Strongly yes | E.164 where possible | P0/P1 call routing requires valid US phone. |
| `email` | Strongly yes | Lowercase | Required for email fallback and dedupe. |
| `preferred_contact_method` | Yes | `phone`, `sms`, `email`, `unknown` | Default `phone` for roof quote. |

### `property`

| Field | Required | Notes |
|---|---:|---|
| `street` | Preferred | Needed for strong property dedupe and eventual roof measurement. |
| `city` | Preferred | Used for rep context. |
| `state` | Yes | Supported states: `NJ`, `PA`, `MD`, `VA`, `DE`, `IL`. |
| `zip` | Yes | Normalize to first five digits. |
| `county` | Optional | Useful for territory reporting. |
| `home_type` | Optional | Default `unknown`; roof quote uses `single_family`. |
| `roof_age` | Optional | Future qualification field. |
| `roof_material` | Optional | Default `asphalt_shingle` for roof quote. |
| `electric_bill_range` | Solar leads | Required for Fight The Power route once intake is wired. |
| `solar_existing` | Optional | Useful for roof plus solar and service leads. |

### `interest`

| Field | Required | Allowed / Expected Values | Notes |
|---|---:|---|---|
| `service_line` | Yes | `roofing`, `solar`, `generator`, `battery`, `roof_plus_solar`, `unknown` | Drives default routing. |
| `secondary_interest` | Optional | `solar_ready_roof`, `roof_only`, `battery_backup`, `generator_backup`, etc. | Helps script selection. |
| `urgency` | Yes | `active_leak`, `storm_damage`, `planning`, `selling_home`, `urgent`, `unknown` | Urgent/leak can force P0. |
| `pain_points` | Optional | Array | Examples: `leak`, `warranty`, `financing`, `decking_concern`, `solar_ready`. |
| `requested_quote_type` | Optional | `good_better_best`, `solar_savings_review`, `callback`, etc. | Useful for route-specific opener. |
| `vendor_intent_score` | Vendor leads | `1`, `2`, `3`, `4`, or vendor-native | Roofing Calculator `3` and `4` route P0. |

### `source`

| Field | Required | Notes |
|---|---:|---|
| `source_name` | Yes | Canonical source name. Never freehand this in forms. |
| `source_type` | Yes | Examples below. |
| `exclusive_status` | Yes | `exclusive`, `shared`, `multi_sold`, `unknown`. |
| `vendor` | Source-dependent | Vendor or platform name. |
| `landing_page` | Website/paid media | Full landing page URL. |
| `utm_source` | Paid/owned campaigns | `meta`, `google`, `email`, `direct`, etc. |
| `utm_medium` | Paid/owned campaigns | `paid_social`, `cpc`, `organic`, `referral`, etc. |
| `utm_campaign` | Paid/owned campaigns | Campaign naming convention from media plan. |
| `utm_content` | Paid/owned campaigns | Ad or creative name. |
| `keyword` | Search/vendor | Google keyword or vendor keyword context. |
| `gclid` | Google Ads | Preserve if present. |
| `gbraid` | Google Ads | Preserve if present. |
| `wbraid` | Google Ads | Preserve if present. |
| `fbclid` | Meta | Preserve if present. |
| `callrail_tracking_number` | CallRail | Required for phone source attribution. |
| `quote_session_id` | Roof quote | Current website source object includes this. |
| `quote_estimate` | Roof quote | Good/better/best estimate context. |

### `consent`

| Field | Required | Notes |
|---|---:|---|
| `tcpa_consent` | Yes for call/text | Current consent check passes if any channel consent exists or TrustedForm exists. |
| `sms_consent` | Yes for SMS | If false, SMS row is blocked. |
| `email_consent` | Yes for email | If false, email row is blocked. |
| `trustedform_cert_url` | Preferred | Claim/retain when available. |
| `consent_language_version` | Yes | Examples: `roof_quote_v1`, `meta_fight_power_v1`, `contact_form_v1`. |

## Canonical Source Names

Use these exact values for `source.source_name`.

| Source Name | Source Type | Exclusive Status | Primary Service | Default Priority | Notes |
|---|---|---|---|---|---|
| `AllSeason Roof Quote` | `owned_website` | `exclusive` | Roofing | P0 | Native roof quote engine. |
| `AllSeason Meta Fight The Power` | `paid_social_landing_page` | `exclusive` | Solar | P0/P1 | P0 only when homeownership, bill, ZIP, phone, and consent qualify. |
| `AllSeason Meta Old Roof 15` | `paid_social_landing_page` | `exclusive` | Roofing | P0/P1 | P0 for 15+ roof age, leak/storm concern, or valid phone/consent inspection request. |
| `AllSeason Meta Lifetime Warranty` | `paid_social_landing_page` | `exclusive` | Roofing | P0/P1 | P0 for warranty comparison, 15+ roof age, leak/storm concern, or valid phone/consent quote request. |
| `AllSeason Contact Form` | `owned_website` | `exclusive` | Unknown/service-selected | P1 | Upgrade to P0 when urgent leak or LSA-style high intent. |
| `AllSeason Phone Click` | `owned_website` | `exclusive` | Unknown/service-selected | P1 | Track call click even before call outcome. |
| `Google LSA` | `local_services_ads` | `exclusive` | Service-selected | P0 | Must include dispute/invalid-lead review. |
| `Google Search Ads` | `paid_search` | `exclusive` | Service-selected | P0/P1 | P0 for urgent roof/leak and quote intent. |
| `Meta Roof Quote` | `paid_social_landing_page` | `exclusive` | Roofing | P0/P1 | Planned paid route to `/roof-quote`. |
| `Roofing Calculator` | `vendor_lead` | `shared` or `multi_sold` | Roofing | P0/P1 | P0 for vendor intent score `3` or `4`. |
| `Nest Builders` | `vendor_lead` | `shared` or `multi_sold` | Roofing | P0 | Routes to vendor roof quote opener. |
| `CallRail Offline` | `offline_call_tracking` | `unknown` | Service-selected | P1 | Radio, receipts, trucks, yard signs, print. |
| `Referral` | `referral` | `exclusive` | Service-selected | P0/P1 | P0 if active project need or existing customer referral. |
| `Manual Import` | `manual_import` | `unknown` | Unknown | P2 | Requires cleaning before high-priority routing. |

## Source Type Values

Use one of these controlled values:

- `owned_website`
- `paid_social_landing_page`
- `paid_search`
- `local_services_ads`
- `vendor_lead`
- `offline_call_tracking`
- `referral`
- `manual_import`
- `organic`
- `unknown`

## Priority Definitions

| Priority | Meaning | Owner | Default Action |
|---|---|---|---|
| P0 | Hot, high-intent, callable now | Inside rep / preview queue | Immediate preview call plus sequence. |
| P1 | Same-day workable lead | Inside rep / same-day queue | Same-day call and nurture sequence. |
| P2 | Low-friction nurture or data gap | Nurture / email-first queue | Email/SMS-first or manual enrichment. |
| P3 | Suppressed, rejected, or manual review | RevOps manager | No normal sequence. Review reason code. |

## Locked Routing Table

This is the route map to preserve in Supabase and any downstream CRM/dialer integration.

| Condition | Priority | Route Name | Sequence Name | Script ID | Decision Reason |
|---|---|---|---|---|---|
| Missing/invalid consent | P3 | `manual_consent_review` | `no_sequence` | `consent_review` | `missing_or_invalid_consent` |
| Duplicate within 7 days | P3 | `suppressed_duplicate` | `no_sequence` | `duplicate_review` | `duplicate_seen_recently:{lead_id}` |
| Outside service area | P3 | `manual_service_area_review` | `no_sequence` | `service_area_review` | `outside_service_area:{state}` |
| Bad/missing phone, valid email | P2 | `email_first_nurture` | `no_phone_email_first` | `email_first_opener` | `bad_or_missing_phone_email_valid` |
| `AllSeason Roof Quote`, roofing, valid phone | P0 | `roofing_preview_queue` | `roofing_day0_high_intent` | `roof_quote_widget_opener` | `owned_roof_quote_roofing` |
| Legacy `InstaQuote`, roofing, valid phone | P0 | `roofing_preview_queue` | `roofing_day0_high_intent` | `instaquote_roofing_opener` | `owned_instaquote_roofing` |
| `AllSeason Meta Old Roof 15`, roofing, 15+ roof age or valid phone/consent | P0 | `roofing_preview_queue` | `roofing_day0_high_intent` | `old_roof_15_opener` | `meta_old_roof_15_qualified` |
| `AllSeason Meta Lifetime Warranty`, roofing, warranty interest or valid phone/consent | P0 | `roofing_preview_queue` | `roofing_day0_high_intent` | `lifetime_warranty_roofing_opener` | `meta_lifetime_warranty_qualified` |
| Roofing Calculator score `3` or `4` | P0 | `vendor_roofing_preview_queue` | `roofing_vendor_quote_request` | `roofing_calculator_opener` | `roofing_calculator_high_intent` |
| Nest Builders roofing lead | P0 | `vendor_roofing_preview_queue` | `roofing_vendor_quote_request` | `nest_builder_opener` | `nest_builder_roofing_quote_request` |
| LSA / Local Services source | P0 | `{service_line}_preview_queue` | `{service_line}_day0_high_intent` | `lsa_opener` | `google_lsa_high_intent` |
| Urgency contains leak or urgent | P0 | `roofing_preview_queue` | `roofing_day0_high_intent` | `urgent_roofing_opener` | `urgent_need` |
| Solar with valid phone | P1 | `solar_same_day_queue` | `solar_2026_options_high_intent` | `solar_2026_options_opener` | `solar_same_day_response` |
| Default accepted lead | P1 | `{service_line}_same_day_queue` | `{service_line}_standard_followup` | `{service_line}_default_opener` | `default_same_day_followup` |

## Locked Meta Fight The Power Routing

The current standalone form tracks events but does not yet post the completed solar form into `lead-intake`. When wired, use this locked rule.

### P0 Conditions

Route `AllSeason Meta Fight The Power` as P0 when all are true:

- `owns_home = Yes`
- monthly electric bill is `$150+`
- ZIP/state is in service area
- valid US phone
- TCPA or channel consent captured

Locked route:

| Priority | Route Name | Sequence Name | Script ID |
|---|---|---|---|
| P0 | `solar_preview_queue` | `solar_day0_high_intent` | `fight_the_power_opener` |

Decision reason:

```text
meta_fight_power_solar_qualified
```

### P1 Conditions

Route as P1 when any of these are true:

- monthly bill below `$150`;
- preferred contact method is SMS or email;
- roof status is `Older roof` or `Planning roof work` and a roof-first review is needed before solar;
- phone is valid but qualification is incomplete.

Locked route:

| Priority | Route Name | Sequence Name | Script ID |
|---|---|---|---|
| P1 | `solar_same_day_queue` | `solar_2026_options_high_intent` | `solar_2026_options_opener` |

### P2/P3 Conditions

| Condition | Priority | Route |
|---|---|---|
| Email valid but bad/missing phone | P2 | `email_first_nurture` |
| Does not own home | P2 | `solar_renter_nurture` |
| Outside service area | P3 | `manual_service_area_review` |
| Missing consent | P3 | `manual_consent_review` |
| Explicit opt-out | P3 | `suppressed_opt_out` |

## Locked Meta Roofing Campaign Routing

The roofing campaign landing pages submit through the server-side `/api/roof-quote` endpoint with campaign-specific
source fields. Browser code never sees the private Supabase intake key.

### Source Names

Use these exact values:

```text
AllSeason Meta Old Roof 15
AllSeason Meta Lifetime Warranty
```

### Shared P0 Conditions

Route as P0 when all are true:

- service line is roofing
- valid US phone
- TCPA or channel consent captured
- ZIP/state is in service area

Also force P0 when any are true:

- roof age is `15+`
- urgency is `active_leak` or `storm_damage`
- main concern is warranty comparison
- homeowner requests inspection/quote timing in the next 30 days

Locked route:

| Source | Priority | Route Name | Sequence Name | Script ID | Decision Reason |
|---|---|---|---|---|---|
| `AllSeason Meta Old Roof 15` | P0 | `roofing_preview_queue` | `roofing_day0_high_intent` | `old_roof_15_opener` | `meta_old_roof_15_qualified` |
| `AllSeason Meta Lifetime Warranty` | P0 | `roofing_preview_queue` | `roofing_day0_high_intent` | `lifetime_warranty_roofing_opener` | `meta_lifetime_warranty_qualified` |

### P1 Conditions

Route as P1 when:

- roof age is under 15 years;
- urgency is planning-only;
- homeowner prefers SMS/email;
- valid contact exists but timing is soft.

Locked route:

| Priority | Route Name | Sequence Name | Script ID |
|---|---|---|---|
| P1 | `roofing_same_day_queue` | `roofing_standard_followup` | `roofing_default_opener` |

### P2/P3 Conditions

| Condition | Priority | Route |
|---|---|---|
| Email valid but bad/missing phone | P2 | `email_first_nurture` |
| Outside service area | P3 | `manual_service_area_review` |
| Missing consent | P3 | `manual_consent_review` |
| Explicit opt-out | P3 | `suppressed_opt_out` |

## Lead Lifecycle Stages

Supabase currently stores `lead_status` as `accepted`, `held`, `suppressed`, or `rejected`. The operating lifecycle below should be represented through CRM dispositions, `appointments`, `opportunities`, `jobs`, `communications`, and `lead_events`.

### Intake And Routing Stages

| Stage | Entry Criteria | Exit Criteria | System Table / Event |
|---|---|---|---|
| `submitted` | Website/vendor/offline lead received | Payload validated | `lead_received` |
| `validated` | Required fields normalized, consent checked | Duplicate/service area checked | `validation_completed` or intake function equivalent |
| `accepted` | Lead is not P3 | Routing decision created | `leads.lead_status = accepted` |
| `suppressed` | Duplicate, missing consent, outside area, opt-out | Manual review or no action | `leads.lead_status = suppressed` |
| `routed` | Priority/queue/sequence/script assigned | Task/communication rows created | `routing_decision_created` |
| `queued` | Rep/dialer/engagement task created | First touch attempted | `communications.outcome = queued_for_preview_call` or task row |

### Sales Working Stages

These should be stored as CRM dispositions and mirrored into `lead_events` and/or `appointments`.

| Stage | Entry Criteria | Required Disposition |
|---|---|---|
| `first_touch_attempted` | First outbound call/SMS/email attempted | channel, timestamp, rep, outcome |
| `voicemail_left` | No answer and voicemail left | voicemail timestamp and template |
| `sms_sent` | SMS sent with consent | template, status |
| `email_sent` | Email sent with consent | template, status |
| `contacted` | Human response or live call | contact timestamp, rep |
| `qualified` | Homeowner confirms need and fit | service, urgency, state, owner/renter, budget context |
| `appointment_set` | Appointment/demo/savings review booked | appointment time, set by, service line |
| `appointment_showed` | Customer attended appointment | show status |
| `appointment_no_show` | Customer missed appointment | no-show reason if known |
| `proposal_issued` | Rep delivered roof/solar/generator proposal | package tier, proposal amount |
| `sold` | Contract signed | contract value, gross margin estimate, sold by |
| `lost` | Customer declines or chooses competitor | lost reason, competitor if known |
| `recycled` | Not ready but valid future opportunity | recycle reason and next date |
| `nurture` | Lower priority or unresponsive | nurture sequence and next milestone |

## Required Disposition Codes

Use controlled outcomes so the scorecard does not become a pile of notes.

### Contact Outcomes

- `answered_connected`
- `no_answer_voicemail_left`
- `no_answer_no_voicemail`
- `sms_reply`
- `email_reply`
- `bad_number`
- `wrong_person`
- `do_not_contact`
- `outside_service_area`
- `duplicate`

### Qualification Outcomes

- `qualified_roofing`
- `qualified_solar`
- `qualified_roof_plus_solar`
- `qualified_backup_power`
- `not_homeowner`
- `bill_too_low`
- `roof_not_ready`
- `timing_future`
- `price_shopping`
- `financing_needed`
- `disqualified_other`

### Appointment Outcomes

- `appointment_set`
- `appointment_showed`
- `appointment_no_show`
- `appointment_cancelled`
- `appointment_rescheduled`
- `demo_completed`

### Sales Outcomes

- `proposal_issued`
- `sold`
- `lost_price`
- `lost_competitor`
- `lost_no_decision`
- `lost_financing`
- `lost_timing`
- `lost_unresponsive`
- `recycle_future`

## SLA Map

SLA clocks start at `lead_received` or the first moment the lead is accepted by intake.

### Business Hours

Default business-hours SLA window:

```text
Monday-Friday, 8:00 AM-7:00 PM local market time
Saturday, 9:00 AM-3:00 PM local market time
```

After-hours leads keep priority but the first-touch due time rolls to the next business-hours opening unless the source is marked active emergency/urgent leak.

### Response SLAs

| Lead Type | Priority | First Touch SLA | Touch Pattern | Escalation |
|---|---|---:|---|---|
| Owned roof quote complete | P0 | 0-5 minutes | Preview call, SMS if consent, voicemail if no answer, email if consent | Manager alert at 10 minutes untouched. |
| Urgent leak / active roof issue | P0 | 0-5 minutes | Call first, then SMS, then voicemail | Manager alert at 10 minutes untouched. |
| Google LSA call/form | P0 | Immediate/same business hour | Call back, log result, dispute invalids | Weekly invalid lead review. |
| Vendor high-intent roofing | P0 | 0-5 minutes | Source-specific opener, preview call | Manager alert at 15 minutes untouched. |
| Meta Fight The Power qualified | P0 | 0-5 minutes | Immediate SMS, preview call, voicemail, email | Manager alert at 10 minutes untouched. |
| Solar same-day valid phone | P1 | 0-30 minutes | Call/SMS/email based on preference | Manager alert if untouched after 2 business hours. |
| Contact form general | P1 | 0-60 minutes | Call if phone valid, otherwise email | Same-day manager review if untouched. |
| Email-first nurture | P2 | 0-2 business hours | Email first, then SMS if consent and phone later becomes valid | No P0 escalation. |
| Suppressed/manual review | P3 | Same business day review | RevOps review only | No sales task until cleared. |

### Day 0 P0 Touch Pattern

| Touch | Timing | Channel | Rule |
|---|---:|---|---|
| 1 | 0-30 seconds | SMS | Only if SMS consent. Source-specific message. |
| 2 | 0-5 minutes | Call | Preview call. Rep must see source context. |
| 3 | After no answer | Voicemail | Leave voicemail. Silent hangups are not allowed for P0 owned leads. |
| 4 | 2-5 minutes | Email | Only if email consent. |
| 5 | 5-10 minutes | Call | Second attempt while intent is fresh. |
| 6 | 10-15 minutes | SMS | Short question set. |
| 7 | 45-90 minutes | Call | Last Day 0 daytime attempt. |
| 8 | 5:30-7:00 PM | SMS | Evening nudge if no opt-out. |

## Required Rep Screen Context

Every P0 and P1 rep task must display:

- `source_name`
- `source_type`
- `exclusive_status`
- landing page
- ad hook or vendor path
- service line
- secondary interest
- urgency
- pain points
- ZIP/state
- roof status or roof age if known
- roof squares if quote flow
- good/better/best estimate if quote flow
- monthly electric bill if solar lead
- owns home if captured
- preferred contact method
- consent flags
- UTM campaign/content
- external IDs
- submitted timestamp
- script ID

## Scorecard Map

Chris should see the scorecard at source level, not just total leads.

### Owner Decision Labels

| Label | Meaning |
|---|---|
| `Scale` | More spend, more creative, or more operational focus. |
| `Fix` | Keep source live but repair offer, script, routing, landing page, or handling. |
| `Cut` | Pause or reduce spend until economics improve. |
| `Watch` | Too little data. Keep collecting but do not scale. |

### Top-Level Weekly Scorecard

| Metric | Definition | Source |
|---|---|---|
| Leads received | Count of intake leads by created date | `leads` |
| Accepted leads | `lead_status = accepted` | `leads` |
| Suppressed leads | P3/suppressed count | `leads` |
| P0 leads | `priority = P0` | `leads` |
| Valid consent leads | `consent_status = valid` | `leads` |
| Quote starts | `quote_started` events | `website_events` |
| Quote completions | `estimate_shown` or completed `quote_sessions` | `quote_sessions`, `website_events` |
| Median speed-to-first-touch | first completed outbound touch minus lead received | `communications`, dialer webhook |
| Contact rate | contacted leads / accepted leads | CRM/dialer disposition |
| Appointment set rate | appointment_set / contacted leads or accepted leads | `appointments` |
| Show rate | appointment_showed / appointment_set | `appointments` |
| Proposal rate | proposal_issued / appointment_showed | `opportunities` |
| Close rate | sold_jobs / appointment_showed or proposals | `jobs`, `opportunities` |
| Sold-job CAC | spend / sold jobs | `spend`, `jobs` |
| Gross margin after CAC | gross margin estimate - spend | `jobs`, `spend` |

### Source Scorecard

| Source | Spend | Leads | P0 | Accepted | Suppressed | Contact % | Set % | Show % | Sold | Revenue | CAC | Decision |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| AllSeason Roof Quote | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| AllSeason Meta Fight The Power | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| Meta Roof Quote | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| Google LSA | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| Roofing Calculator | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| Nest Builders | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| CallRail Offline | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |

### Quote Funnel Scorecard

| Step | Event / Table | Question |
|---|---|---|
| Visit | `PageView` / analytics | Is the campaign sending traffic? |
| Quote start | `quote_started` | Is the CTA pulling intent? |
| ZIP checked | `zip_checked` | Are users in service area? |
| Step completed | `quote_step_completed` | Where does the flow lose people? |
| Contact submitted | `contact_submitted` | Are visitors willing to identify themselves? |
| Estimate shown | `estimate_shown` | Did they finish the quote? |
| Lead accepted | `lead-intake` response | Did backend route correctly? |
| First touch | communication/dialer event | Did SLA happen? |
| Appointment set | `appointments` | Did the quote create a sales conversation? |
| Sold | `jobs` | Did the source produce revenue? |

### SLA Scorecard

| Metric | Definition | Target |
|---|---|---:|
| P0 untouched after 5 minutes | P0 leads with no first touch in 5 minutes | 0 |
| P0 untouched after 10 minutes | P0 leads with no first touch in 10 minutes | 0 |
| P0 median speed-to-touch | median first touch lag | Under 5 minutes |
| P1 same-day untouched | P1 leads with no same-day attempt | 0 |
| Voicemail left rate | no-answer calls with voicemail | 80%+ for P0 |
| Disposition completeness | worked leads with required outcome | 95%+ |

## Scale / Fix / Cut Rules

### Scale

Scale a source when:

- tracking and source attribution are clean;
- P0/P1 routing is accurate;
- contact rate is at least `50%`;
- appointment set rate is at least `20-25%` early or `30%+` mature;
- show rate is at least `65%`;
- projected CAC is inside source target;
- sales team has capacity to work the added volume.

### Fix

Fix a source when:

- CPL is acceptable but contact rate is weak;
- contacts happen but appointments do not set;
- appointment set rate is fine but show rate is weak;
- lead quality is mixed but source intent is promising;
- routing is correct but the opener/script does not match the source;
- landing page conversion is below expectation.

### Cut

Cut or pause a source when:

- consent or compliance quality is weak;
- duplicate/suppressed rate is too high;
- bad phone rate is too high;
- projected CAC is structurally unworkable;
- vendor cannot explain resold/shared behavior;
- source consumes rep capacity without qualified conversations.

## Source Economics Targets

### Roofing

| Metric | Target |
|---|---:|
| Ideal lead cost | `$50-$125` |
| Acceptable early lead cost | `$75-$175` if qualified |
| Booked appointment cost | `<$400-$600` |
| Sold-job CAC target | `<$1,000` |
| Caution zone | `$1,000-$1,500` |
| Cut/fix zone | `>$1,500` without clear repair path |

### Solar

| Metric | Target |
|---|---:|
| Ideal lead cost | `$40-$125` |
| Acceptable early lead cost | `$75-$200` if bill, ownership, and roof fit are strong |
| Booked appointment cost | `<$500-$900` |
| Sold-job CAC target | Must be reviewed against lease/ownership margin |

## Dashboard / Warehouse Alignment

Current Supabase tables:

- `lead_sources`
- `people`
- `properties`
- `leads`
- `consent_certificates`
- `routing_decisions`
- `lead_events`
- `communications`
- `appointments`
- `opportunities`
- `jobs`
- `spend`
- `integration_sync_logs`
- `quote_sessions`
- `quote_estimates`
- `website_events`

Current views:

- `revops_dashboard_overview`
- `revops_source_scorecard`

### Dashboard Gaps To Close In Next Build Stage

The current schema is ready, but the following events/imports are still needed for a full operating scorecard:

- dialer webhook for first call attempt and call outcome;
- SMS/email delivery and reply events;
- appointment set/show/no-show sync from LeadMaster or scheduler;
- opportunity/proposal/sold outcome sync from LeadMaster;
- spend imports from Meta, Google Ads, LSA, and vendors;
- CallRail import for offline calls/text/forms;
- explicit Meta Fight The Power submit-to-intake integration.

## Implementation Lock List

Before launch, confirm these are true:

- `AllSeason Roof Quote` posts to Supabase `lead-intake` server-side.
- `REVOPS_INTAKE_URL` and `REVOPS_INTAKE_KEY` are server-only.
- `AllSeason Roof Quote` returns P0 with `roof_quote_widget_opener`.
- Meta `Fight The Power` form posts to intake, not only analytics events.
- Meta qualified solar route can return P0 `solar_preview_queue`.
- Every paid ad has UTMs.
- Every form captures `consent_language_version`.
- P0 tasks include source-specific script ID.
- P0 leads create call/SMS/email communication rows where consent allows.
- P3 leads do not create normal sales tasks.
- Scorecard can answer scale/fix/cut by source.

## Weekly RevOps Review Agenda

1. Review source scorecard.
2. Review P0 SLA misses.
3. Listen to or sample the first-touch calls for each active source.
4. Review suppressed/duplicate/service-area failures.
5. Review appointment and show rates by source.
6. Review spend and projected CAC.
7. Assign each source a decision: `Scale`, `Fix`, `Cut`, or `Watch`.
8. Ship one operational change for the biggest bottleneck.

## Locked Owner Narrative

The owner-facing explanation should stay simple:

```text
We are not just buying leads. We are building a controlled path from source to contact to appointment to sold job.

Every source gets tagged. Every hot lead gets routed. Every first touch has context. Every source gets judged by whether it creates profitable jobs.
```
