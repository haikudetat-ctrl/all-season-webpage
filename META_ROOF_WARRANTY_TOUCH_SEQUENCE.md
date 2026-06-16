# Meta Campaign Touch Sequence: Roof Warranty Protection

## Campaign Context

**Ad matched:** `The Roof Above Everything That Matters` / `Your Family. Protected. Forever.` static Meta creative
**Core promise:** A roof is not just shingles. It is protection, certified installation, and long-term warranty confidence.
**Landing route:** `/meta/roof-warranty`
**Primary CTA:** Get your free quote
**Lead source name:** `AllSeason Meta Lifetime Warranty`
**Lead type:** Paid social, roofing quote, warranty/protection angle

This sequence should sound steady and premium. The homeowner clicked because protection, family, and warranty mattered more than bargain-roof language. The first touch should respect that signal.

## Operating Principle

Do not race to price. Anchor the conversation around the protection standard:

```text
You came through the warranty page, so I want to make sure we compare the roof system, installer certification, and warranty level before we talk about a number by itself.
```

## Lead Routing Rules

Route every completed `Lifetime Warranty` form as a roofing quote/review lead.

**Priority:** P0 when any are true:

- valid phone and consent are captured
- homeowner selected warranty comparison
- roof age is `15+`
- urgency is `active_leak` or `storm_damage`
- homeowner requested quote timing in the next 30 days

**P1 when:**

- roof is newer but homeowner is researching warranty options
- preferred contact method is SMS or email
- qualification is complete but timing is soft

**Assigned queue:** `roofing_preview_queue`
**Recommended dial mode:** Preview dialer. Reps need to see warranty interest before the call so they do not lead with discounting.

## Required Rep Screen Context

Show these fields before call or text:

- Source: `AllSeason Meta Lifetime Warranty`
- Ad hook: `The roof above everything that matters / lifetime warranty`
- Landing page: `/meta/roof-warranty`
- ZIP and state
- Roof age
- Main concern
- Urgency
- Preferred follow-up
- UTM campaign, ad set, ad, placement when available
- Submitted timestamp

## Day 0 Speed-To-Lead Sequence

### Touch 1: Immediate SMS, 0-30 seconds

```text
Hi {first_name}, this is {rep_name} with AllSeason Roofing. You just asked about a roof quote from our warranty page.

I see your main concern is {roof_concern}. Are you looking to compare warranty-backed roof options, or do you already have a roof issue happening?
```

### Touch 2: First Call, 0-60 seconds

```text
Hi {first_name}, this is {rep_name} with AllSeason Roofing. You just came through our roof warranty page, the one about the roof above everything that matters.

You came through the warranty page, so I want to make sure we compare the roof system, installer certification, and warranty level before we talk about a number by itself. Do you have two minutes?
```

If yes:

```text
Great. First, do you know roughly how old the current roof is?
```

```text
Are you comparing roof quotes already, or are you trying to understand what a warranty-backed roof would cost?
```

```text
If you did replace the roof, is the priority lowest upfront price, strongest warranty, financing, or getting it done quickly?
```

Close for appointment:

```text
The right next step is a roofing review so we can see the roof, understand the scope, and show you the good, better, best options with the warranty differences clear.

I have {time_option_1} or {time_option_2}. Which is easier?
```

### Touch 3: Voicemail After First Call

```text
Hi {first_name}, this is {rep_name} with AllSeason Roofing. You asked us about a warranty-backed roof quote.

I am calling to help schedule the review and explain the roof system and warranty options. I will send a quick text too. You can call me back at {callback_number}.
```

### Touch 4: Email, 2-5 minutes

**Subject:** Your warranty-backed roof quote request
**Preview:** We will compare roof system, installation, and warranty before price.

```text
Hi {first_name},

Thanks for asking AllSeason Roofing about a warranty-backed roof quote.

The right roof decision is not just a number. It should answer:

- What roof system is being installed?
- Who is installing it?
- What does the warranty actually protect?
- What happens if something goes wrong years from now?
- Which good, better, best option fits your home?

We can help you compare the roof condition, warranty options, timing, and financing.

For the fastest answer, reply to this email or call 1 (888) 832-5050.

AllSeason Roofing
```

### Touch 5: Second Call, 5-10 minutes

```text
Hi {first_name}, it is {rep_name} with AllSeason Roofing again. I wanted to catch you while the warranty request was fresh.

Quick question: are you comparing a few roofing quotes now, or just starting to understand what a stronger warranty option would look like?
```

### Touch 6: SMS After Second Call, 10-15 minutes

```text
Quick question, {first_name}: when you think about the next roof, what matters most?

A) Lifetime warranty
B) Certified install quality
C) Payment/financing
D) Fast replacement timing

Reply A, B, C, or D.
```

### Touch 7: Day 0 Evening SMS

```text
{first_name}, we can make this simple: start with roof condition, then compare warranty-backed options only if replacement makes sense.

Do you want a morning or afternoon review time?
```

## Day 1 Sequence

### Morning SMS

```text
Morning {first_name}, this is {rep_name} with AllSeason. Should we close out your warranty-backed roof quote request, or do you still want to compare options?
```

### Midday Call

```text
Hi {first_name}, this is {rep_name} with AllSeason Roofing. I am following up on your warranty roof request from yesterday.

The reason I am calling is that warranty quality depends on the roof system and installation standard, not just the brand name. Have you had anyone look at the roof yet?
```

### Education Email

**Subject:** What a roof warranty should really answer
**Preview:** Price matters, but protection matters when something goes wrong.

```text
Hi {first_name},

The ad you clicked was about the roof above everything that matters.

That is why our review looks at more than a price. We want you to understand the roof condition, installation standard, warranty level, and what the next owner or future-you can rely on.

If you want to compare options, reply here or call 1 (888) 832-5050.

AllSeason Roofing
```

## Days 3-7 Nurture

### Day 3 SMS

```text
{first_name}, should we help you compare warranty-backed roof options, or are you only gathering rough pricing right now?
```

### Day 5 Email

**Subject:** Roof quote or roof protection plan?

```text
Hi {first_name},

A roof quote tells you a price.

A roof protection plan helps you understand system, installation, warranty, timing, and financing.

If you want us to walk through both, call 1 (888) 832-5050 or reply with a day that works.
```

### Day 7 SMS Breakup

```text
{first_name}, I will close this out for now. If you want AllSeason to compare warranty-backed roofing options, reply WARRANTY and we will reopen the request.
```

## Rep Opener Tags

Use `lifetime_warranty_roofing_opener`.

Required first-call phrases:

- "warranty page"
- "roof above everything that matters"
- "roof system, installer certification, and warranty level"
- "compare options clearly"

Avoid:

- lowest-price framing
- discount-first language
- generic "just following up on your form"
- overpromising warranty terms without confirming the exact product/system

## Meta Ad Copy Set

### Primary Text Variations

1. Your roof protects everything underneath it. See what a warranty-backed AllSeason roof could look like for your home.
2. A new roof should come with more than a price. Compare certified installation and lifetime warranty options.
3. Protect your family, home, and future with a roof system built around long-term confidence.
4. The roof above everything that matters deserves a serious warranty conversation. Request a free roofing review.
5. Trusted local roofing, certified installation, and warranty options that help protect your home for the long run.

### Headlines

- The Roof Above It All
- Lifetime Warranty Options
- Your Family. Protected.
- Get A Free Roof Quote
- Certified Roofing Experts

### Descriptions

- Compare warranty-backed options.
- Free roofing review.
- Certified local installers.
- Protect what matters.

## GTM Tracking

Use these UTMs:

```text
utm_source=meta
utm_medium=paid_social
utm_campaign=roofing_lifetime_warranty
utm_content={creative_name}
```

Primary conversion event: `form_submitted`
Supporting events: `contact_submitted`, `estimate_shown`, `call_clicked`
Lead source: `AllSeason Meta Lifetime Warranty`
