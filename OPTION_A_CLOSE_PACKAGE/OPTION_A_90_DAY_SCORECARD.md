# Option A 90-Day Owner Scorecard

## Purpose

This is the scorecard Chris should see during the first 90 days of Option A.

It is designed to answer owner questions:

- Which sources are worth more money?
- Which sources need repair?
- Which sources should be cut?
- Are high-intent leads being contacted fast enough?
- Is the website and quote engine creating better context?
- Are roofing and solar opportunities moving toward profitable jobs?

## Monthly Owner Review Format

Each monthly review should end with three decisions:

| Decision | Meaning |
|---|---|
| Scale | Put more money, creative, or operational focus behind this |
| Fix | Keep testing, but repair the offer, script, landing page, or routing |
| Cut | Stop buying or reduce spend until economics improve |

## Top-Level Scorecard

| Metric | Target / Question | Month 1 | Month 2 | Month 3 | Decision |
|---|---|---:|---:|---:|---|
| Owned website leads | Are owned channels producing real conversations? | TBD | TBD | TBD | TBD |
| Roof quote starts | Are homeowners engaging with the quote tool? | TBD | TBD | TBD | TBD |
| Roof quote completions | Is the quote flow converting? | TBD | TBD | TBD | TBD |
| P0 leads created | Are high-intent leads being routed correctly? | TBD | TBD | TBD | TBD |
| Median speed-to-first-touch | Are reps moving fast enough? | TBD | TBD | TBD | TBD |
| Contact rate | Are we reaching the homeowner? | TBD | TBD | TBD | TBD |
| Appointment set rate | Are first touches converting to appointments? | TBD | TBD | TBD | TBD |
| Demo/sit rate | Are appointments real? | TBD | TBD | TBD | TBD |
| Sold jobs | Are sources producing revenue? | TBD | TBD | TBD | TBD |
| Sold-job CAC | Is the source profitable enough to scale? | TBD | TBD | TBD | TBD |

## Source Scorecard

| Source | Lead Type | Priority | Leads | Contact % | Set % | Demo % | Sold | Spend | CAC | Decision |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| AllSeason Roof Quote | Owned website | P0 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| Fight The Power Meta | Paid social | P0/P1 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| Roofing Calculator | Vendor/shared | P0/P1 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| Nest Builders | Vendor/shared | P0/P1 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| LSA | Paid search/local | P0/P1 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |
| CallRail offline | Radio/print/truck/sign | P1/P2 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Scale/Fix/Cut |

## Lead Handling SLA

| Lead Type | First Touch Target | Required Handling | Escalation |
|---|---:|---|---|
| Owned roof quote | 0-5 minutes | Preview call + SMS + voicemail if no answer | Manager alert if untouched after 10 minutes |
| Fight The Power Meta P0 | 0-5 minutes | SMS + preview call + source-specific opener | Manager alert if untouched after 10 minutes |
| Vendor high intent | 0-5 minutes | Source-specific opener based on vendor path | Manager alert if untouched after 15 minutes |
| LSA call/form | Immediate / same business hour | Call back, dispute invalid leads, log outcome | Review invalid lead disputes weekly |
| Aged/recycled | Same day | Lower-pressure sequence | No P0 escalation |

## Quote Funnel Scorecard

| Step | Event | Question | Count | Conversion |
|---|---|---|---:|---:|
| Quote start | `quote_started` | Is the CTA pulling interest? | TBD | 100% |
| ZIP checked | `zip_checked` | Are visitors inside service area? | TBD | TBD |
| Roof details completed | `quote_step_completed` | Are homeowners giving useful context? | TBD | TBD |
| Contact submitted | `contact_submitted` | Are they willing to identify themselves? | TBD | TBD |
| Estimate shown | `estimate_shown` | Did they finish the flow? | TBD | TBD |
| Lead accepted | Supabase `lead-intake` accepted | Did the backend route correctly? | TBD | TBD |
| Appointment set | CRM disposition | Did the quote create a sales conversation? | TBD | TBD |

## Campaign Scorecard: Fight The Power

| Metric | Month 1 | Month 2 | Month 3 | Notes |
|---|---:|---:|---:|---|
| Spend | TBD | TBD | TBD | Meta spend only |
| Landing page visits | TBD | TBD | TBD | From campaign UTM |
| Form starts | TBD | TBD | TBD | Intent signal |
| Completed forms | TBD | TBD | TBD | Lead count |
| P0 qualified leads | TBD | TBD | TBD | Owns home, $150+ bill, valid ZIP, consent |
| Contact rate | TBD | TBD | TBD | Measures handling |
| Appointment set rate | TBD | TBD | TBD | Measures script/offer |
| Demo/sit rate | TBD | TBD | TBD | Measures quality |
| Sold jobs | TBD | TBD | TBD | Measures revenue |
| CAC | TBD | TBD | TBD | Measures scale decision |

## Month-By-Month Operating Focus

### Month 1: Instrument and Prove Flow

Focus:

- confirm tracking fires correctly;
- verify all P0 leads route correctly;
- watch speed-to-lead;
- identify quote flow drop-offs;
- confirm scripts match source context.

Owner decision:

```text
Is the machine capturing and routing demand correctly?
```

### Month 2: Repair Conversion

Focus:

- adjust landing copy and forms;
- tighten day-zero sequence;
- improve rep opener based on objections;
- identify low-quality sources early;
- add proof/warranty elements where prospects stall.

Owner decision:

```text
Which bottleneck is costing the most money?
```

### Month 3: Scale, Fix, Or Cut

Focus:

- compare source economics;
- recommend spend shifts;
- decide whether to expand Meta creative, LSA management, or owned quote traffic;
- decide whether dialer/CRM limitations now justify a tool change.

Owner decision:

```text
What gets more money, what gets fixed, and what stops?
```

## First 90-Day Success Definition

The first 90 days should be considered successful if:

- owned website leads are captured with clean attribution;
- completed roof quotes route to P0 correctly;
- reps have source-specific context before calling;
- speed-to-lead is visible;
- source performance can be reviewed by contact, set, demo, sold, and CAC;
- Chris has enough clarity to make better spend decisions.

The first 90 days do not need to prove every channel. They need to prove that AllSeason now has a system for deciding what deserves scale.
