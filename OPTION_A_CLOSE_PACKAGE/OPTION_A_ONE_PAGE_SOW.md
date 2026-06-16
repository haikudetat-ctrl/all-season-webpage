# Option A One-Page SOW

## Engagement

**Client:** AllSeason Solar / Roofing
**Provider:** 2Stack
**Offer:** Option A - Owned Acquisition Buildout + Revenue System Operation
**Price:** $5,000 buildout + $3,000/month operating retainer
**Recommended term:** 90-day operating cycle after launch readiness

## Objective

Build and operate the first version of AllSeason's owned acquisition system so high-intent roofing and solar demand is captured, routed, handled, and measured with owner-level discipline.

The goal is not simply to launch a better-looking website. The goal is to reduce lead leakage, improve first-touch quality, and give Chris a clean view of which sources deserve more money.

## Included Buildout

### 1. Rebrand-Ready Website MVP

- Standalone modern website built outside the existing WordPress stack.
- Launch brand remains AllSeason.
- Structure supports future rebrand with centralized brand/content controls.
- Core pages:
  - Home
  - Roofing
  - Solar
  - Roof + Solar
  - Warranty / Financing
  - Service Areas
  - About / Proof
  - Contact
  - Roof Quote

### 2. Native Roof Quote Engine

- ZIP/service-area check.
- Roof size, condition, urgency, and complexity inputs.
- Good / better / best estimate logic:
  - good: $550/square
  - better: $650/square
  - best: $750/square
- Configurable modifiers for urgency, steepness, layers, decking concern, skylights, and solar-readiness interest.
- Contact capture before showing final estimate range.
- Consent language and attribution fields.
- Server-side submit to Supabase lead intake.

### 3. Revenue Intake and Routing

- Website API route posts to Supabase using private intake key server-side.
- Browser never sees the private key.
- New owned source configured as:
  - source name: `AllSeason Roof Quote`
  - source type: `owned_website`
  - exclusive: `true`
  - priority: `P0`
  - queue: `roofing_preview_queue`
  - sequence: `roofing_day0_high_intent`
  - script: `roof_quote_widget_opener`

### 4. First Campaign Loop

- Static Meta campaign landing route for `Fight The Power`.
- Source-specific solar savings/roof-readiness capture logic.
- Day-zero call, SMS, email, and voicemail sequence.
- Rep opener matched to ad context.

### 5. Tracking and Reporting Foundation

Events to track:

- `quote_started`
- `zip_checked`
- `quote_step_completed`
- `contact_submitted`
- `estimate_shown`
- `call_clicked`
- `form_submitted`

Initial owner scorecard:

- leads by source;
- speed-to-lead;
- contact rate;
- appointment set rate;
- demo/sit rate;
- sold jobs;
- estimated CAC by source once cost and sales outcome data are available.

## Monthly Operating Retainer

The $3,000/month retainer is for operating the system, not passive maintenance.

Included monthly work:

- campaign and landing page improvement;
- quote flow conversion tuning;
- source-specific script refinement;
- lead routing QA;
- speed-to-lead review;
- tracking and scorecard review;
- monthly owner recommendations:
  - scale this;
  - fix this;
  - cut this.

## Timeline

| Phase | Timing | Work |
|---|---:|---|
| Kickoff | Week 1 | Access, source map, tracking plan, content inventory |
| Build Sprint | Weeks 2-3 | Website MVP, core pages, quote flow UI |
| Integration | Week 4 | API route, Supabase intake, events, attribution fields |
| GTM Setup | Week 5 | Meta route, scripts, sequences, reporting views |
| Launch Readiness | Week 6 | QA, tracking test, mobile review, handoff |
| Operating Cycle | Days 1-90 after launch | Improve conversion, routing, scripts, and scorecard decisions |

## Guarantees

### Launch Readiness Guarantee

If 2Stack causes the scoped launch to miss the agreed launch-readiness window, 2Stack continues buildout work at no added buildout fee until the scoped deliverables are launch-ready.

### Visibility Guarantee

Chris gets a monthly operating review showing what happened, what was learned, and what 2Stack recommends scaling, fixing, or cutting.

### Process Guarantee

P0 owned website leads will have defined routing, context fields, and source-specific scripts. The system will not treat owned quote leads like generic cold leads.

## What Is Not Guaranteed

2Stack cannot honestly guarantee ad platform costs, homeowner behavior, financing market changes, sales rep execution, storm demand, Google/Meta policy changes, or a specific closed-job count.

The guarantee is operating discipline, clean implementation, and transparent measurement.

## Break Clause

After the first 90-day operating cycle, either side may end the monthly retainer with 30 days written notice.

If the client chooses Option B/build-only, there is no ongoing operating commitment after delivery.

## Client Responsibilities

AllSeason provides:

- domain/DNS access as needed;
- website content approvals;
- warranty/legal claim review;
- CRM/dialer access or field mapping support;
- Supabase/lead intake production credentials as needed;
- timely feedback within agreed review windows;
- source cost and sales outcome data for CAC reporting.

## Out Of Scope For Initial Build

- full CRM replacement;
- external roof measurement APIs;
- full rebrand/name change execution;
- broad SEO program;
- call center hiring/training beyond scripts and process design;
- paid media budget;
- legal review of warranty, finance, incentive, or savings claims.

## Decision

Approve Option A:

```text
$5,000 buildout
$3,000/month operating retainer
90-day proof cycle
```

Next step: kickoff call, access checklist, and build sprint start date.
