# Meta Campaign Touch Sequence: 15+ Year Old Roof

## Campaign Context

**Ad matched:** `If Your Roof Is 15+ Years Old, Don't Wait For The Leak` static Meta creative
**Core promise:** Older roofs are more vulnerable to costly damage. Schedule a free inspection before a leak forces the issue.
**Landing route:** `/meta/old-roof`
**Primary CTA:** Schedule free roof inspection
**Lead source name:** `AllSeason Meta Old Roof 15`
**Lead type:** Paid social, roofing inspection, aging-roof prevention

This campaign should feel practical, not fear-mongering. The homeowner clicked because the roof-age trigger made them wonder whether they are overdue. The first touch should acknowledge that exact concern and offer a low-pressure inspection.

## Operating Principle

Paid social roofing leads are often problem-aware, not quote-ready. The goal of the first touch is to turn concern into an inspection appointment:

```text
I am not calling to pressure you into a roof. I am calling because you asked us to check whether a 15+ year roof is still in good shape before a leak makes the decision.
```

## Lead Routing Rules

Route every completed `15+ Year Old Roof` form as a roofing inspection lead.

**Priority:** P0 when any are true:

- roof age is `15+`
- urgency is `active_leak` or `storm_damage`
- valid phone and consent are captured
- homeowner requests inspection timing in the next 30 days

**P1 when:**

- roof age is under 15 years
- homeowner is planning ahead
- preferred contact method is SMS or email
- contact details are valid but inspection urgency is soft

**P2/P3 when:**

- email valid but phone invalid: P2 email-first nurture
- outside service area: P3 manual service-area review
- missing consent: P3 manual consent review
- explicit opt-out: P3 suppressed

**Assigned queue:** `roofing_preview_queue`
**Recommended dial mode:** Preview dialer. Reps need to see roof age, concern, ZIP, and source hook before calling.

## Required Rep Screen Context

Show these fields before call or text:

- Source: `AllSeason Meta Old Roof 15`
- Ad hook: `If your roof is 15+ years old, don't wait for the leak`
- Landing page: `/meta/old-roof`
- ZIP and state
- Roof age
- Main concern
- Urgency
- Preferred follow-up
- UTM campaign, ad set, ad, placement when available
- Submitted timestamp

## Day 0 Speed-To-Lead Sequence

### Touch 1: Immediate SMS, 0-30 seconds

Send only after consent is captured.

```text
Hi {first_name}, this is {rep_name} with AllSeason Roofing. You just asked about a roof inspection from our 15+ year roof page.

I see the roof may be around {roof_age} years old and your main concern is {roof_concern}. Is that right?
```

### Touch 2: First Call, 0-60 seconds

```text
Hi {first_name}, this is {rep_name} with AllSeason Roofing. You just came through our page about 15+ year old roofs and not waiting for a leak.

I am not calling to pressure you into a roof. I am calling because you asked us to check whether the roof is still in good shape before a leak makes the decision. Do you have two minutes?
```

If yes:

```text
Great. I have the roof age at about {roof_age}. Is that based on when it was installed, or is that your best estimate?
```

```text
Are you seeing anything specific right now: missing shingles, staining, granules in the gutters, soft spots, or an active leak?
```

Close for appointment:

```text
The right next step is a roof inspection so we can tell you whether it is still serviceable, needs repair, or is getting close to replacement.

I have {time_option_1} or {time_option_2}. Which is easier?
```

### Touch 3: Voicemail After First Call

```text
Hi {first_name}, this is {rep_name} with AllSeason Roofing. You asked us to check on a roof that may be 15+ years old.

I am calling to help schedule the inspection and make sure there is not an issue hiding before the next storm. I will send a quick text too. You can call me back at {callback_number}.
```

### Touch 4: Email, 2-5 minutes

**Subject:** Your roof inspection request
**Preview:** We just need to confirm roof age, concern, and timing.

```text
Hi {first_name},

Thanks for asking AllSeason Roofing to review your roof.

The reason the 15+ year mark matters is simple: a roof can look fine from the ground while shingles, flashing, ventilation, or decking are starting to fail. A quick inspection helps you decide whether you can plan ahead or need action sooner.

We will review:

- Approximate roof age
- Any leak, staining, storm, or shingle concerns
- Whether repair, monitoring, or replacement makes sense
- Warranty and financing options if a new roof is the right move

For the fastest answer, reply to this email or call 1 (888) 832-5050.

AllSeason Roofing
```

### Touch 5: Second Call, 5-10 minutes

```text
Hi {first_name}, it is {rep_name} with AllSeason Roofing again. I wanted to catch you while your roof inspection request was fresh.

The quick question is this: are you trying to prevent a future leak, or is there already something happening with the roof?
```

### Touch 6: SMS After Second Call, 10-15 minutes

```text
Quick version, {first_name}: is the roof concern more about age, a current leak, storm damage, or getting ahead of replacement timing?

Reply with one word and I can point you to the right next step.
```

### Touch 7: Day 0 Evening SMS

```text
{first_name}, older roofs do not always give much warning before water gets in.

Do you want us to hold a roof inspection time for this week, or should we check back later?
```

## Day 1 Sequence

### Morning SMS

```text
Morning {first_name}, this is {rep_name} with AllSeason. Should we close out your 15+ year roof inspection request, or do you still want us to take a look?
```

### Midday Call

```text
Hi {first_name}, this is {rep_name} with AllSeason Roofing. I am following up on your roof inspection request from yesterday.

The reason I am calling is that roof age plus weather exposure is exactly when small issues can turn expensive. Do you know if the roof is closer to 15 years, 20 years, or older?
```

### Education Email

**Subject:** Why roof age matters before the leak
**Preview:** The best time to inspect an aging roof is before water shows up inside.

```text
Hi {first_name},

The ad you clicked was direct: if your roof is 15+ years old, do not wait for the leak.

That does not mean every older roof needs replacement immediately. It means the roof deserves a real look before weather, interior damage, or emergency pricing force the decision.

An inspection can help answer:

1. Is the roof still serviceable?
2. Are there repairable weak points?
3. Is replacement worth planning now?
4. Which warranty level makes sense if you do replace it?

Reply here or call 1 (888) 832-5050 when you want us to schedule it.

AllSeason Roofing
```

## Days 3-7 Nurture

### Day 3 SMS

```text
{first_name}, should we help you check the roof before the next heavy rain, or is this more of a later planning item?
```

### Day 5 Email

**Subject:** A roof inspection is cheaper than guessing

```text
Hi {first_name},

If your roof is 15+ years old, guessing can get expensive.

The inspection gives you a clear answer: keep monitoring, repair a specific issue, or start comparing replacement options with warranty protection.

If you want a time on the calendar, call 1 (888) 832-5050 or reply with a day that works.
```

### Day 7 SMS Breakup

```text
{first_name}, I will close this out for now. If you want AllSeason to check the roof before it becomes urgent, reply INSPECT and we will reopen the request.
```

## Rep Opener Tags

Use `old_roof_15_opener`.

Required first-call phrases:

- "15+ year roof page"
- "not waiting for a leak"
- "check before weather makes the decision"
- "inspection first, no pressure"

Avoid:

- "You need a new roof"
- "This is your final chance"
- "We are in your neighborhood"
- generic "roof quote request" language

## Meta Ad Copy Set

### Primary Text Variations

1. If your roof is 15+ years old, the best time to check it is before the leak. Schedule a free AllSeason roof inspection.
2. Older roofs can fail quietly. Get a clear inspection before storm season turns a small issue into a bigger repair.
3. A roof can look fine from the street and still be near the end of its life. Check your roof before water shows up inside.
4. Protect your home before the next heavy rain. AllSeason can inspect aging roofs and help you understand your options.
5. Not sure how much life your roof has left? If it is around 15+ years old, start with a free inspection.

### Headlines

- 15+ Year Roof? Check It.
- Do Not Wait For The Leak
- Free Roof Inspection
- Protect Your Home
- Is Your Roof Aging Out?

### Descriptions

- Schedule a free roof review.
- Plan before damage appears.
- Local roofing team.
- Warranty options available.

## GTM Tracking

Use these UTMs:

```text
utm_source=meta
utm_medium=paid_social
utm_campaign=roofing_old_roof_15
utm_content={creative_name}
```

Primary conversion event: `form_submitted`
Supporting events: `contact_submitted`, `estimate_shown`, `call_clicked`
Lead source: `AllSeason Meta Old Roof 15`
