# Meta Roofing Campaign GTM Package

## Purpose

This package prepares two roofing Meta campaigns for launch:

1. `15+ Year Old Roof`
2. `Lifetime Warranty Protection`

The goal is not raw lead volume. The goal is booked roofing appointments at a job-acquisition cost that makes sense for South Jersey roof economics.

## Campaign Inventory

| Campaign | Route | Source Name | Core Angle | CTA | Script ID |
|---|---|---|---|---|---|
| 15+ Year Old Roof | `/meta/old-roof` | `AllSeason Meta Old Roof 15` | Prevent the leak before it happens | Schedule free inspection | `old_roof_15_opener` |
| Lifetime Warranty Protection | `/meta/roof-warranty` | `AllSeason Meta Lifetime Warranty` | Protect the home with certified, warranty-backed roofing | Get free quote | `lifetime_warranty_roofing_opener` |

## Creative Assets

### 15+ Year Old Roof

Use:

- `public/campaigns/old-roof-15-primary.png`
- `public/campaigns/old-roof-15-sunny.png`
- `public/campaigns/old-roof-15-family.png`

Primary test:

- Storm urgency creative vs. bright prevention creative vs. family protection creative

Hypothesis:

- Storm urgency should produce higher CTR and CPL efficiency.
- Family protection should produce better appointment quality.
- Bright prevention should work best in retargeting and older-home neighborhoods.

### Lifetime Warranty Protection

Use:

- `public/campaigns/roof-warranty-primary.png`
- `public/campaigns/roof-warranty-neighborhood.png`
- `public/campaigns/roof-warranty-family.png`

Primary test:

- Warranty checklist creative vs. neighborhood protection creative vs. family-protected-forever creative

Hypothesis:

- Warranty checklist should attract quote/comparison shoppers.
- Neighborhood protection should attract premium homeowners.
- Family-protected-forever should improve form completion quality.

## Account Structure

Use one campaign per offer angle at launch.

```text
META_Lead_Roofing_OldRoof15_2026Q3
META_Lead_Roofing_LifetimeWarranty_2026Q3
```

Ad set naming:

```text
{Campaign}_{Geo}_{Audience}_{Optimization}_{Date}
```

Example:

```text
OldRoof15_SouthNJ_Homeowners35Plus_Leads_2026-06
```

Ad naming:

```text
{Campaign}_{CreativeConcept}_{Format}_{Hook}
```

Example:

```text
OldRoof15_Storm_4x5_DontWaitForLeak
```

## Budget Recommendation

Launch with controlled spend until routing and speed-to-lead are verified.

| Phase | Timeline | Daily Budget | Notes |
|---|---:|---:|---|
| QA launch | Days 1-3 | $50-$75/day total | Confirm pixel, events, routing, calls, and form reliability. |
| Learning | Days 4-14 | $100-$150/day total | Keep both campaigns live. Do not over-optimize before 20+ leads. |
| First scale | Weeks 3-4 | $200-$300/day total | Shift spend toward lowest cost per qualified booked appointment. |
| Controlled scale | Month 2 | $300-$600/day total | Increase 20%-30% every 3-5 days only if appointment economics hold. |

Suggested launch split:

- 55% to `15+ Year Old Roof`
- 45% to `Lifetime Warranty Protection`

Reason:

- The roof-age campaign should generate faster intent.
- The warranty campaign may create better homeowner trust and stronger close quality.

## A/B Testing Plan

### Week 1: Creative Concept

Test three creatives per campaign.

Hold constant:

- landing page
- audience
- objective
- CTA

Measure:

- thumb-stop rate / CTR
- CPL
- landing page form completion rate
- valid phone rate
- booked appointment rate

Do not declare a winner on CPL alone.

### Week 2: Copy Angle

Keep top two creatives per campaign and test:

- direct urgency copy
- protection/family copy
- practical inspection copy

### Week 3: Landing Intent

Test CTA language:

- `Schedule Free Inspection`
- `Get Free Roof Quote`
- `Check My Roof`

Expected behavior:

- Inspection CTA should increase volume and reduce friction.
- Quote CTA should reduce volume but may improve buyer readiness.

### Week 4: Audience Expansion

Test:

- broad homeowners 35+
- older-home ZIP clusters
- retargeting website visitors
- lookalike from closed-won roofing customers if available

## Event Tracking

Required events:

- `contact_submitted`
- `form_submitted`
- `estimate_shown`
- `call_clicked`

Recommended GTM labels:

| Event | Required Parameters |
|---|---|
| `contact_submitted` | `source_name`, `campaign`, `zip`, `roof_age`, `roof_concern`, `preferred_contact_method` |
| `form_submitted` | `source_name`, `campaign`, `priority` |
| `estimate_shown` | `source_name`, `campaign`, `route_name`, `sequence_name`, `script_id` |
| `call_clicked` | `source_name`, `campaign`, `location` |

Primary conversion:

```text
form_submitted
```

Secondary conversion:

```text
call_clicked
```

Do not optimize Meta toward page views or clicks once enough form data exists.

## Source Fields

### 15+ Year Old Roof

```json
{
  "source_name": "AllSeason Meta Old Roof 15",
  "source_type": "paid_social_landing_page",
  "exclusive_status": "exclusive",
  "utm_source": "meta",
  "utm_medium": "paid_social",
  "utm_campaign": "roofing_old_roof_15"
}
```

### Lifetime Warranty Protection

```json
{
  "source_name": "AllSeason Meta Lifetime Warranty",
  "source_type": "paid_social_landing_page",
  "exclusive_status": "exclusive",
  "utm_source": "meta",
  "utm_medium": "paid_social",
  "utm_campaign": "roofing_lifetime_warranty"
}
```

## Routing

Both campaigns route to:

```text
roofing_preview_queue
```

Default sequence:

```text
roofing_day0_high_intent
```

Campaign-specific opener:

```text
old_roof_15_opener
lifetime_warranty_roofing_opener
```

SLA:

- First SMS: 0-30 seconds
- First call: 0-60 seconds
- Voicemail: after first unanswered call
- Second call: 5-10 minutes
- Day 0 evening SMS: 5:30-7:00 PM local time
- Day 1 follow-up: morning SMS plus midday call

## Sales Handling Notes

These are not cold calls. Do not use generic roofing scripts.

For `15+ Year Old Roof`, lead with:

```text
You came through the 15+ year roof page, so I am calling to help check whether the roof is still in good shape before a leak makes the decision.
```

For `Lifetime Warranty Protection`, lead with:

```text
You came through the warranty page, so I want to compare the roof system, installer certification, and warranty level before we talk about price by itself.
```

## Performance Scorecard

Daily:

- spend
- impressions
- CTR
- CPL
- valid lead rate
- first-call SLA hit rate
- contact rate
- booked appointment rate

Weekly:

- cost per booked appointment
- demo/inspection show rate
- proposal rate
- sold job count
- sold job CAC
- gross margin by campaign
- creative fatigue

Cut rules:

- Pause creative after 1,500 impressions with CTR under 0.7% unless CPL is strong.
- Pause ad set after 10 leads if valid phone rate is below 60%.
- Pause campaign after 20 leads if booked appointment cost is above target and speed-to-lead SLA was met.
- Do not cut a campaign for poor appointments until rep handling and SLA are verified.

Scale rules:

- Increase budget 20%-30% every 3-5 days when booked appointment CAC is inside target.
- Scale the campaign with the best cost per qualified booked appointment, not the lowest CPL.
- Keep one challenger creative live in each campaign weekly.

## Launch Checklist

- Routes live:
  - `/meta/old-roof`
  - `/meta/roof-warranty`
- Images uploaded into `public/campaigns`
- Form submission tested end to end
- RevOps source names locked
- Meta pixel/GTM conversion events verified
- UTMs applied at ad level
- Call click tracking verified
- Rep scripts loaded into preview queue
- SLA alerts turned on
- Daily scorecard owner assigned

## Recommended First 10 Creatives Per Week

Per week, produce:

- 3 static variants for `15+ Year Old Roof`
- 3 static variants for `Lifetime Warranty Protection`
- 2 story/reel crops from winning static concepts
- 2 retargeting proof/warranty variants

Minimum viable creative cadence:

```text
8-10 new creative variants per week
```

This keeps the account from starving the algorithm and gives 2Stack enough testing surface without creating unmanageable production load.
