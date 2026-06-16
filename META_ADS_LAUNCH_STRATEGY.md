# Meta Ads Launch Strategy for AllSeason

## Executive Summary

This is the in-house Meta Ads operating plan for 2Stack to launch and manage AllSeason's paid social demand engine.

The goal is not cheap form fills. The goal is source-owned, context-rich roofing and solar leads that can be contacted quickly, routed correctly, and judged by appointment economics.

AllSeason already knows the problem with third-party lead buying:

- shared leads create a race to the bottom;
- roofing cannot absorb a $3,000 job acquisition cost;
- high-intent homeowners should not be handled like cold outbound;
- every dollar sent to lead vendors builds someone else's brand.

Meta should be used to build owned demand around AllSeason's own website, landing pages, quote flows, phone numbers, tracking, and day-zero lead handling process.

The first campaign should launch from the existing `Fight The Power` solar creative and landing page route:

```text
/meta/fight-the-power
```

The second campaign should expand into the roof-first offer:

```text
/roof-quote
```

The operating principle:

```text
Spend small enough to learn cleanly, produce enough creative to find winners, and scale only when booked appointment cost and projected job acquisition cost make sense.
```

## Business Context

AllSeason is a roofing, solar, battery, and generator company with deep construction experience and an owner who understands unit economics. The business wants to rebuild toward profitable volume, not vanity revenue.

Important context from the discovery process:

- Roofing target job acquisition cost should ideally stay below `$1,000`.
- Average roofing job is roughly `$10,000-$12,000`.
- Roofing gross margin before overhead is roughly `30%`.
- Shared roofing leads are often `$150-$200+` and sold to multiple contractors.
- Some exclusive Meta-style lead sources have been closer to `$75/lead`, but lead quality and handling determine whether that is profitable.
- Solar can tolerate a higher acquisition cost because the ticket is larger, but the lease market is more commoditized.
- Owner priority is building brand equity and first-party demand rather than continuing to fund third-party lead sellers.

Meta is a fit when it is treated as:

- a demand creation channel;
- a creative testing channel;
- a retargeting channel;
- a way to drive homeowners into owned qualification flows;
- not a replacement for lead handling discipline.

## Strategic Positioning

### Core Market Problem

Homeowners are not waking up excited to buy a roof or solar system. They are reacting to one of four pressure points:

- their electric bill feels too high;
- their roof is old, leaking, or nearing replacement;
- they are considering solar and do not know whether the roof can support it;
- they want backup power because outages or rate increases feel less predictable.

The creative should not sound like a generic contractor ad. It should feel like a homeowner's private thought said out loud.

### Core Offer Architecture

Use two primary offers in the first 90 days.

#### Offer 1: Fight The Power Bill

Primary route:

```text
/meta/fight-the-power
```

Best for:

- solar demand;
- high electric bill homeowners;
- solar curiosity;
- roof-aware solar qualification.

Core promise:

```text
Your electric company hopes you never check whether solar could lower your bill.
```

Primary CTA:

```text
Check my savings
```

Operational note:

This should route as `AllSeason Meta Fight The Power` and trigger the matching touch sequence in `META_FIGHT_THE_POWER_TOUCH_SEQUENCE.md`.

#### Offer 2: Roof First. Solar Smarter.

Primary route:

```text
/roof-quote
```

Best for:

- roofing demand;
- roof replacement leads;
- roof plus solar timing;
- homeowners who want price context before a sales visit.

Core promise:

```text
Compare good, better, and best roof options before the hard sell.
```

Primary CTA:

```text
Start my roof quote
```

Operational note:

This should route as `AllSeason Roof Quote`, priority `P0`, queue `roofing_preview_queue`, and script `roof_quote_widget_opener`.

## Pre-Launch Requirements

Do not put meaningful media spend behind the campaign until these are complete.

### Tracking

Required events:

- `PageView`
- `ViewContent`
- `Lead`
- `Contact`
- `call_clicked`
- `form_submitted`
- `quote_started`
- `zip_checked`
- `contact_submitted`
- `estimate_shown`

Recommended Meta setup:

- Meta Pixel installed sitewide.
- Conversion API added server-side when possible.
- Event Match Quality reviewed weekly during launch.
- UTMs required on every ad.
- Separate source names for each landing route.
- CRM/Supabase intake receives the same source, campaign, ad set, ad, and placement context visible in Ads Manager.

Minimum UTM format:

```text
utm_source=meta
utm_medium=paid_social
utm_campaign={{campaign.name}}
utm_content={{ad.name}}
utm_term={{adset.name}}
```

Add these where available:

```text
campaign_id={{campaign.id}}
adset_id={{adset.id}}
ad_id={{ad.id}}
placement={{placement}}
```

### Lead Delivery

Every paid social lead must become actionable within seconds.

Minimum route fields:

- source name;
- source type;
- ad hook;
- landing page;
- ZIP;
- service interest;
- electric bill or roof size;
- roof status;
- owns home;
- preferred contact;
- consent;
- UTM fields;
- created timestamp.

For the first launch, use preview dialing, not predictive dialing. The rep needs context before the first touch.

### Compliance And Claim Review

Avoid:

- guaranteed savings claims;
- "free solar" language;
- misleading financing language;
- broad tax credit claims without current legal review;
- implying the utility company is literally hiding information;
- before/after roof claims without proof;
- customer likenesses or testimonials without permission.

Use:

- "may qualify";
- "see whether the numbers make sense";
- "review bill, roof, and home fit";
- "estimate range";
- "not a final proposal";
- "financing subject to approval" when financing is mentioned.

If ads lead with financing, payment plans, or credit offers, confirm Meta policy handling before launch.

## Recommended Account Structure

Keep the structure simple. Small local accounts get hurt when the budget is split into too many campaigns and ad sets.

### Campaign 1: Solar Savings Prospecting

Objective:

```text
Leads or website conversions
```

Destination:

```text
/meta/fight-the-power
```

Ad sets:

- Core Service Area Broad
- Electric Bill / Solar Interest Test
- Homeowner Energy Interest Test

Optimization:

- Start with website lead if tracking is clean.
- Use lead objective with website conversion location if the pixel has enough signal.
- Test Instant Forms only as a controlled comparison, not the default.

### Campaign 2: Roofing / Roof + Solar Prospecting

Objective:

```text
Leads or website conversions
```

Destination:

```text
/roof-quote
```

Ad sets:

- Core Service Area Broad
- Roof Age / Storm / Leak Angle
- Roof + Solar Timing Angle

Optimization:

- Optimize for completed roof quote lead once volume supports it.
- If volume is too low, use `quote_started` or `contact_submitted` temporarily, then graduate to completed lead.

### Campaign 3: Retargeting

Objective:

```text
Leads
```

Audience:

- 7-day landing page visitors;
- 30-day landing page visitors;
- quote starters who did not submit;
- video viewers;
- social engagers;
- past leads excluded where appropriate.

Destinations:

- `/meta/fight-the-power`
- `/roof-quote`
- `/financing-warranty`
- `/roof-solar-readiness`

### Campaign 4: Creative Lab

Objective:

```text
Traffic, landing page views, or leads depending on budget
```

Purpose:

- test raw creative angles;
- find thumb-stopping hooks;
- evaluate which message earns qualified clicks before pushing it into conversion campaigns.

This is where 2Stack can learn cheaply without destabilizing the core campaigns.

## Audience Strategy

### Geographic Rollout

Start tight, then expand.

Phase 1:

- South Jersey;
- core AllSeason service areas;
- ZIPs with known installation density;
- areas where crews and sales coverage are easiest.

Phase 2:

- broader New Jersey;
- nearby Pennsylvania markets;
- Delaware and Maryland pockets where licensing and operations are ready.

Phase 3:

- expansion states only after source CAC and rep capacity prove stable.

### Targeting Approach

Run three audience styles in the first 30 days.

#### Broad Local

Use location, minimum age, and homeowner-relevant creative. Let Meta find the people responding to the offer.

Why:

Meta increasingly recommends broader audience structures and Advantage+ audience testing for many campaign types. This works best when tracking and creative are strong.

#### Interest-Guided

Use broad homeowner and energy signals as suggestions, not tiny boxes.

Possible interests/signals:

- solar energy;
- renewable energy;
- home improvement;
- roofing;
- home renovation;
- backup generator;
- electric vehicle;
- energy efficiency;
- utility bill savings.

#### First-Party And Retargeting

Use:

- website visitors;
- quote starters;
- existing unsold leads;
- customer list, if clean and consented;
- lookalike of sold jobs, not all leads.

The best lookalike seed is sold customers with real revenue, not raw form fills.

## Creative Production Plan

### Minimum Weekly Creative Volume

2Stack should plan on producing this volume in-house:

| Stage | Weekly Output | Notes |
|---|---:|---|
| Pre-launch | 20-30 total assets | Build the first bank before spend starts. |
| Weeks 1-4 | 12-16 new creatives/week | Enough to test 3-4 angles with multiple formats. |
| Weeks 5-8 | 8-12 new creatives/week | Iterate from winners; retire weak angles. |
| Scaling phase | 15-20 new creatives/week | Required once spend rises and fatigue appears faster. |
| Maintenance | 6-10 new creatives/week | Minimum to keep account learning and avoid stale ads. |

Creative is the main lever on Meta. If production slows, scale slows.

### Recommended Weekly Mix

For each weekly batch:

- `4` static image ads;
- `4` short-form vertical videos;
- `2` carousel or sequence ads;
- `2` testimonial/proof ads;
- `2` landing-page-specific variants;
- `2` retargeting-only ads.

If capacity is limited, prioritize vertical video and strong statics. Do not spend production time on minor copy variants before testing different angles.

### Format Requirements

Every winning concept should be adapted into:

- `4:5` feed image/video;
- `1:1` feed image/video;
- `9:16` Reels and Stories;
- thumbnail-safe first frame;
- captions burned into video;
- CTA visible without sound.

### Creative Angles To Launch

#### Angle 1: Fight The Power Bill

Buyer psychology:

The homeowner feels the utility bill rising and wants control.

Sample hooks:

- "Your electric company hopes you never check."
- "That bill is not going to lower itself."
- "Before you pay another summer bill, check the numbers."

Destination:

```text
/meta/fight-the-power
```

#### Angle 2: Roof First. Solar Smarter.

Buyer psychology:

The homeowner is solar-curious but unsure whether the roof is ready.

Sample hooks:

- "Thinking about solar? Check the roof first."
- "Panels on an old roof can get expensive later."
- "Do the roof once. Build it for what comes next."

Destination:

```text
/roof-solar-readiness
```

#### Angle 3: Good / Better / Best Roof Quote

Buyer psychology:

The homeowner wants a real price range without a pushy appointment.

Sample hooks:

- "See a roof range before the sales visit."
- "Compare good, better, and best roof options."
- "A roof quote should explain more than one number."

Destination:

```text
/roof-quote
```

#### Angle 4: Warranty Over Cheapest Bid

Buyer psychology:

The homeowner is comparing roof proposals and does not understand what they are risking.

Sample hooks:

- "The cheapest roof can be expensive twice."
- "Ask who stands behind the labor."
- "Price matters. Coverage matters more when something leaks."

Destination:

```text
/financing-warranty
```

#### Angle 5: Backup Power And Outage Anxiety

Buyer psychology:

The homeowner wants reliability, not just savings.

Sample hooks:

- "What stays on when the grid goes down?"
- "Solar is one part. Backup power is the plan."
- "Keep the essentials running."

Destination:

```text
/batteries-generators
```

#### Angle 6: Local Proof / One Accountable Team

Buyer psychology:

The homeowner is skeptical of lead vendors and fly-by-night installers.

Sample hooks:

- "One local team for roof, solar, and backup power."
- "Roofing and solar should not be separate guesses."
- "Know who is coming back if something needs service."

Destination:

```text
/about-proof
```

## A/B Testing Rollout

### Testing Principle

Test the thing that can change the business:

1. offer;
2. creative angle;
3. landing route;
4. lead form friction;
5. follow-up speed and script.

Do not start by testing tiny design details.

### Phase 0: Tracking And Smoke Test

Timing:

```text
3-5 days before launch
```

Goal:

Confirm that every lead source is captured and every event fires once.

Tests:

- submit test lead from `/meta/fight-the-power`;
- submit test lead from `/roof-quote`;
- verify Ads Manager receives events;
- verify Supabase/CRM receives source details;
- verify phone clicks track;
- verify UTMs survive the journey;
- verify internal team gets notifications.

Pass condition:

```text
No media spend until a test lead can be traced from ad URL to CRM/lead intake to rep script.
```

### Phase 1: Initial Creative Test

Timing:

```text
Weeks 1-2
```

Budget:

```text
$100-$200/day
```

Test design:

- `3-4` angles;
- `3-4` creatives per angle;
- same destination inside each angle;
- avoid changing budget daily;
- evaluate after at least `3-5` days unless there is a tracking issue.

Primary learning:

Which promise gets qualified homeowners to stop, click, and submit?

Decision rules:

- Kill obvious weak creatives after enough spend to learn.
- Keep any creative with strong CTR and qualified form submits.
- Do not call a winner from one cheap lead.
- Do not judge by CPL alone.

### Phase 2: Offer And Landing Route Test

Timing:

```text
Weeks 3-4
```

Test:

- Fight The Power landing page vs solar/homepage route;
- Roof Quote route vs Roofing page;
- Roof + Solar Readiness route vs Roof Quote route for solar-curious traffic.

Primary metric:

```text
cost per qualified booked appointment
```

Secondary metrics:

- cost per lead;
- landing page conversion rate;
- contact rate;
- appointment set rate;
- show rate;
- disqualification rate.

### Phase 3: Lead Form Friction Test

Timing:

```text
Weeks 5-6
```

Test:

- website form vs Meta Instant Form;
- low-friction form vs higher-intent qualifier;
- phone-first CTA vs form-first CTA.

Recommendation:

Start with website conversion routes because AllSeason wants owned context and source attribution. Use Instant Forms only if lead volume is too low or as a controlled test.

If Instant Forms are tested, use higher-intent style questions:

- ZIP;
- monthly electric bill;
- roof status;
- owns home;
- timeline;
- best contact method;
- consent;
- confirmation/review step.

Do not use a bare name-phone-email Instant Form for this client. It will likely create cheap leads that waste the call center.

### Phase 4: Scaling Test

Timing:

```text
Weeks 7-12
```

Test:

- broaden geography;
- increase budgets;
- introduce lookalikes from qualified appointments or sold jobs;
- split roofing and solar if both have enough conversion volume;
- test retargeting sequences by service interest.

Scale only after:

- tracking is clean;
- contact rate is stable;
- booked appointment cost is acceptable;
- lead quality is understood;
- reps are following the source-specific opener.

## Media Budget Recommendations

### Month 1: Validation Budget

Recommended spend:

```text
$3,000-$6,000/month
```

Daily spend:

```text
$100-$200/day
```

Allocation:

| Bucket | % | Monthly at $4,500 |
|---|---:|---:|
| Solar prospecting | 45% | $2,025 |
| Roofing / roof + solar prospecting | 35% | $1,575 |
| Retargeting | 10% | $450 |
| Creative lab | 10% | $450 |

Expected outcome:

- establish baseline CPL by offer;
- identify first winning creative angles;
- validate landing page conversion;
- validate contact and appointment set rates;
- decide whether Meta deserves more spend.

### Month 2: Controlled Growth Budget

Recommended spend:

```text
$6,000-$12,000/month
```

Daily spend:

```text
$200-$400/day
```

Move here only if Month 1 produces:

- qualified CPL within expected range;
- contact rate above `50%`;
- appointment set rate above `20-25%`;
- clear creative winners;
- no intake or speed-to-lead failures.

Allocation:

| Bucket | % |
|---|---:|
| Winning prospecting campaigns | 65% |
| New creative testing | 15% |
| Retargeting | 10% |
| Landing page / offer tests | 10% |

### Month 3: Scaling Budget

Recommended spend:

```text
$12,000-$25,000/month
```

Daily spend:

```text
$400-$850/day
```

Move here only if:

- projected roofing CAC has a credible path to `<$1,000-$1,500`;
- solar CAC is acceptable against gross margin;
- booked appointment volume does not overload the internal team;
- lead handling is audited weekly;
- creative production can support scale.

### Aggressive Scale

Recommended spend:

```text
$25,000-$50,000+/month
```

Use only after a full 90-day proof cycle.

Requirements:

- confirmed CAC by source;
- sales outcomes in the scorecard;
- clean call recordings or call disposition data;
- rep-level appointment and close performance;
- enough creative production to refresh weekly;
- owner approval on geography expansion.

## KPI Targets And Guardrails

These are starting benchmarks, not guarantees.

### Creative Metrics

| Metric | Watch For | Action |
|---|---:|---|
| Thumb-stop / 3-sec video view | Below peer average | Rework first frame and hook. |
| Outbound CTR | Under `0.8%` | Creative or offer is not strong enough. |
| Outbound CTR | `1.0%-1.8%+` | Keep testing post-click quality. |
| CPC | Rising while CTR falls | Creative fatigue or audience mismatch. |
| Frequency | `3+` cold audience | Refresh creative. |

### Funnel Metrics

| Metric | Target Range |
|---|---:|
| Landing page conversion rate | `8%-18%` |
| Qualified lead rate | `60%-80%` |
| Contact rate | `50%-70%` |
| Appointment set rate | `20%-35%` early, `30%-45%` mature |
| Show rate | `65%-80%` |
| Roofing close rate from issued appointment | `15%-25%+` |

### Economic Guardrails

For roofing:

- ideal lead cost: `$50-$125`;
- acceptable early lead cost: `$75-$175` if qualified;
- booked appointment cost target: `<$400-$600`;
- job acquisition cost target: `<$1,000`;
- pause/rework if projected CAC trends above `$1,500` without a clear fix.

For solar:

- ideal lead cost: `$40-$125`;
- acceptable early lead cost: `$75-$200` if bill, ownership, and roof fit are strong;
- booked appointment cost target: `<$500-$900`;
- job acquisition cost depends on lease/ownership economics and must be reviewed against actual margin.

Raw CPL is not the decision metric. Cost per qualified booked appointment and projected job acquisition cost are the decision metrics.

## Scaling Rules

### When To Increase Budget

Increase budget when:

- cost per qualified lead is stable for `3-5` days;
- booked appointment cost is within target;
- lead quality is confirmed by call outcomes;
- form submissions are real and reachable;
- the campaign is not breaking the intake process.

### How To Increase Budget

Use gradual increases:

```text
15%-25% every 3-5 days
```

Avoid doubling budgets overnight unless the owner explicitly accepts volatility.

### When To Hold Budget

Hold when:

- Meta is still learning;
- new creative was added recently;
- lead quality is unclear;
- the call team is behind;
- appointments are not being dispositioned cleanly.

### When To Cut Spend

Cut or pause when:

- tracking breaks;
- leads do not reach the CRM;
- contact rate drops below `35%`;
- disqualification rate is too high;
- reps are not using the correct source-specific opener;
- creative fatigue is obvious and no replacement batch is ready.

## Weekly Operating Cadence

### Monday: Scorecard Review

Review:

- spend;
- leads;
- qualified leads;
- calls placed;
- contact rate;
- appointments set;
- show rate;
- close outcomes if available;
- CPL by campaign;
- booked appointment cost by campaign;
- notes from reps.

Decision output:

```text
scale / hold / fix / cut
```

### Tuesday: Creative Briefs

Create briefs for the next batch:

- winning angle extensions;
- weak angle replacements;
- service-specific retargeting;
- one new test angle;
- one proof/testimonial angle.

### Wednesday: Production

Produce:

- static ads;
- short vertical videos;
- carousel variants;
- revised copy;
- landing-page-specific message matches.

### Thursday: Launch And QA

Launch:

- new ads;
- new test ad set if needed;
- retired weak creative;
- UTM QA;
- event QA.

### Friday: Lead Handling Audit

Review:

- speed-to-lead;
- first call opener;
- voicemail usage;
- SMS response quality;
- lead notes;
- source-specific context visible to reps.

### Weekend: Light Monitoring

Monitor only:

- spend pacing;
- broken links;
- form errors;
- obvious CPL spikes;
- comments and page engagement.

Avoid unnecessary edits unless something is broken.

## Creative Brief Template

Use this for every new ad concept.

```text
Campaign:
Service:
Offer:
Landing route:
Audience:
Awareness stage:
Homeowner pain:
Ad hook:
Visual concept:
Primary text:
Headline:
CTA:
Proof point:
Disqualifier or qualifier:
Required disclaimer:
UTM naming:
Expected learning:
```

## First 30-Day Creative Calendar

### Week 1

Produce `16` assets:

- 4 Fight The Power statics;
- 4 Fight The Power vertical videos;
- 4 Roof First / Solar Smarter statics;
- 2 roof quote statics;
- 2 retargeting proof ads.

### Week 2

Produce `12-16` assets:

- 4 new solar bill hooks;
- 4 roof quote comparison ads;
- 2 warranty ads;
- 2 roof + solar readiness videos;
- 2 retargeting objection ads;
- optional 2 testimonial/proof ads.

### Week 3

Produce `12` assets:

- iterate top 2 winning hooks;
- test one landing-route comparison;
- launch backup power angle;
- introduce founder/local accountability proof.

### Week 4

Produce `8-12` assets:

- refresh winners;
- cut bottom quartile concepts;
- create one new aggressive angle;
- create one conservative trust/proof angle;
- build retargeting ads from FAQ objections.

## Recommended Campaign Names

Use clear naming. It will make reporting easier.

```text
META_LEADS_SOLAR_FightThePower_NJ_2026Q3
META_LEADS_ROOF_RoofQuote_NJ_2026Q3
META_RETARGET_AllServices_30D_2026Q3
META_TEST_CreativeLab_AllSeason_2026Q3
```

Ad set naming:

```text
Broad_ServiceArea_NJ
Interest_SolarEnergy_HomeImprovement
Retarget_LPVisitors_7D
Retarget_QuoteStarters_30D
```

Ad naming:

```text
FTP_Static_UtilityPole_Blue_OfferA_v01
FTP_Video_BillShock_UGC_v01
Roof_Static_GoodBetterBest_v01
Warranty_Static_CheapBid_v01
```

## Landing Page Recommendations

### Fight The Power Route

Keep:

- no main nav;
- fast CTA;
- electric bill question;
- roof status question;
- ownership qualifier;
- source-specific follow-up.

Improve before scale:

- submit the lead into the same intake/routing system as the roof quote flow;
- add thank-you step copy that tells the homeowner to expect a quick call/text;
- test a bill-upload option after first conversion baseline;
- add privacy and consent language near the submit button;
- add a stronger local proof strip below the form.

### Roof Quote Route

Keep:

- ZIP check;
- good/better/best price range;
- contact capture before final estimate;
- solar-readiness option.

Improve before scale:

- show "estimate, not final proposal" language near the range;
- add a quick route to call for active leaks;
- add proof for warranty-backed labor coverage;
- segment "roof only" vs "roof plus solar later."

## Lead Handling Requirements

Meta leads must be contacted differently from shared third-party leads.

The first touch must reference:

- the exact ad or hook;
- the page they came from;
- the information they entered;
- the reason for the call.

Example opener for Fight The Power:

```text
Hi {first_name}, this is {rep_name} with AllSeason Solar. You just came through our Fight The Power page about checking whether your electric bill is higher than it needs to be.

I am not calling to pitch panels cold. I just want to verify your bill, roof condition, and home fit. If the numbers do not make sense, I will tell you that. Do you have two minutes?
```

Example opener for Roof Quote:

```text
Hi {first_name}, this is {rep_name} with AllSeason. You just started the roof quote range on our site. I see you entered {roof_squares} squares in {zip} and selected {urgency}.

I am calling to help turn that online range into the right next step. Is the roof issue active, or are you planning ahead?
```

## Reporting For Chris

Chris should receive a simple weekly owner report.

### Weekly View

| Source | Spend | Leads | Qualified | Contacted | Appts | Showed | Sold | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Meta Fight The Power | | | | | | | | |
| Meta Roof Quote | | | | | | | | |
| Retargeting | | | | | | | | |

### Decision View

For each source:

- scale;
- hold;
- fix;
- cut.

### Required Commentary

Every weekly report should answer:

1. What did we spend?
2. What did we get?
3. What was qualified?
4. How fast did we respond?
5. What became an appointment?
6. What should be scaled, fixed, or cut?

## 90-Day Rollout Plan

### Days 1-7: Setup

- Confirm tracking.
- Confirm intake.
- Confirm campaign naming.
- Build first creative batch.
- QA landing pages.
- Confirm scripts with call team.

### Days 8-21: Launch

- Start at `$100-$200/day`.
- Launch Fight The Power and Roof Quote campaigns.
- Keep structure simple.
- Do not over-edit during the first few days.
- Review lead quality daily.

### Days 22-35: First Optimization

- Cut bottom creative.
- Iterate the top two angles.
- Test landing route variations.
- Add retargeting if audience size supports it.
- Confirm appointment economics.

### Days 36-60: Controlled Scale

- Increase budget `15%-25%` at a time.
- Introduce lookalike audience if enough qualified data exists.
- Launch roof + solar readiness angle.
- Expand service area only if operations are ready.

### Days 61-90: Proof Cycle

- Build owner-level CAC view.
- Compare Meta to third-party lead vendors.
- Identify the best service line for scale.
- Decide whether to increase spend, expand geography, or hold for conversion improvements.

## Why This Beats Generic Lead Vendor Systems

Lead vendors sell the same homeowner context to multiple contractors. AllSeason needs the opposite.

This system gives AllSeason:

- exclusive first-party demand;
- ad-specific landing pages;
- source-aware scripts;
- owned tracking;
- faster learning;
- creative control;
- brand equity;
- better enterprise value;
- clearer CAC decisions.

The win is not that Meta produces cheaper leads. The win is that Meta, the website, the quote engine, and the follow-up process can be tuned together.

That is what third-party lead vendors do not give Chris.

## Sources And Platform Notes

Meta documentation reviewed for this plan:

- Meta Business Help Center, Advantage+ placements: https://www.facebook.com/business/help/196554084569964
- Meta Business Help Center, Advantage+ audience: https://www.facebook.com/business/help/273363992030035
- Meta Business Help Center, learning phase and learning limited: https://www.facebook.com/business/help/112167992830700 and https://www.facebook.com/business/help/269269737396981
- Meta Business Help Center, lead ads and instant forms: https://www.facebook.com/business/help/761812391313386 and https://www.facebook.com/business/help/435270316658768
- Meta Business Help Center, A/B testing: https://www.facebook.com/business/help/1738164643098669

These sources support the operating recommendations to keep account structure learnable, test meaningful variables, use appropriate lead form friction, and avoid overreacting during learning.

## Final Recommendation

Start with a disciplined `90-day proof cycle`.

Recommended launch budget:

```text
$4,500/month media spend
```

Recommended creative pace:

```text
12-16 new creatives per week for the first 4 weeks
```

Recommended first campaigns:

```text
1. Fight The Power solar savings campaign
2. Roof Quote / Roof First campaign
3. Retargeting once enough traffic exists
```

Recommended decision metric:

```text
cost per qualified booked appointment, then projected job acquisition cost
```

Do not scale because leads are cheap. Scale when Chris can see that the source can create profitable jobs.
