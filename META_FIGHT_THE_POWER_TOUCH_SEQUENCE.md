# Meta Campaign Touch Sequence: Fight The Power

## Campaign Context

**Ad matched:** `Fight The Power` static Meta creative
**Core promise:** Your electric company hopes you never check whether solar could lower your bill.
**Landing route:** `/meta/fight-the-power`
**Primary CTA:** Qualify now / check my savings
**Lead source name:** `AllSeason Meta Fight The Power`
**Lead type:** Paid social, solar savings review, roof-aware qualification

This sequence should feel like a direct continuation of the ad. The homeowner should hear the same idea in plain language: "You asked us to check whether your electric bill, roof, and home make solar worth reviewing." Do not open with generic solar pitch language.

## Operating Principle

Paid social leads are usually curiosity-led, not search-led. The sequence should move fast, acknowledge the exact ad context, and reduce pressure:

> "I am not calling to sell you panels on the first call. I am calling to verify whether the numbers are even worth a closer look."

That line protects trust, lowers resistance, and creates a reason for the call.

## Lead Routing Rules

Route every completed `Fight The Power` form as a high-intent solar review lead.

**Priority:** P0 when all are true:

- Owns home: `Yes`
- Monthly electric bill: `$150+`
- ZIP is in service area
- Valid phone and consent captured

**P1 when:**

- Monthly electric bill is below `$150`
- Roof status is `Older roof` or `Planning roof work`
- Preferred contact method is not phone

**Disqualify or nurture when:**

- Does not own the home
- Outside service area
- Invalid contact information
- Explicit opt-out

**Assigned queue:** `solar_preview_queue`
**Recommended dial mode:** Preview dialer, not predictive. Reps need to see bill, ZIP, roof status, and ad context before the first touch.

## Required Rep Screen Context

Show these fields before call or text:

- Source: `AllSeason Meta Fight The Power`
- Ad hook: `Fight The Power / Your electric company hopes you never check`
- Landing page: `/meta/fight-the-power`
- ZIP
- Monthly electric bill
- Roof status
- Owns home
- Preferred follow-up
- UTM campaign, ad set, ad, placement when available
- Submitted timestamp

## Day 0 Speed-To-Lead Sequence

### Touch 1: Immediate SMS, 0-30 seconds

Send only after consent is captured.

```text
Hi {first_name}, this is {rep_name} with AllSeason Solar. You just asked to check whether solar could help with your electric bill from our Fight The Power page.

I see you entered about {monthly_bill}/mo and roof status: {roof_status}. Is that still accurate?
```

If preferred follow-up is SMS:

```text
Hi {first_name}, this is {rep_name} with AllSeason Solar. I saw you prefer text. Quick check from your Fight The Power request: is {monthly_bill}/mo your average bill, or more of a recent high month?
```

### Touch 2: First Call, 0-60 seconds

**Opener**

```text
Hi {first_name}, this is {rep_name} with AllSeason Solar. You just came through our Fight The Power page, the one about checking whether your electric company is getting more of your money than it needs to.

I am not calling to pitch you panels cold. I just want to verify three things: your electric bill, your roof condition, and whether your home is a fit. If the numbers do not make sense, I will tell you that. Do you have two minutes?
```

**If they say yes**

```text
Great. I have your bill at about {monthly_bill}. Is that your average month, or was that a recent high bill?
```

Then continue:

```text
And for the roof, you selected {roof_status}. About how old is the roof?
```

```text
Any shade issues, big trees, leaks, or roof work already planned?
```

```text
Are you mainly looking to lower the bill, get backup power, or see whether solar is even worth considering?
```

**Close for next step**

```text
Based on that, the right next step is a short solar savings review. We will look at the bill, roof fit, and options before anyone talks numbers too seriously.

I have {time_option_1} or {time_option_2}. Which is easier?
```

### Touch 3: Voicemail After First Call

Leave a voicemail. Do not hang up silently.

```text
Hi {first_name}, this is {rep_name} with AllSeason Solar. You asked us to check whether solar could help with your electric bill from our Fight The Power page.

I am calling because the bill and roof details you entered are exactly what we use to see whether solar is worth reviewing. I will send a quick text too. You can call me back at {callback_number}.
```

### Touch 4: Email, 2-5 minutes

**Subject:** Your solar savings check request
**Preview:** We just need to verify bill, roof, and home fit before giving next steps.

```text
Hi {first_name},

Thanks for asking AllSeason Solar to check whether solar could help with your electric bill.

The first thing we review is not a panel package. It is the fit:

- Your average monthly electric bill
- Your ZIP and utility context
- Whether you own the home
- Roof age, condition, and solar readiness

If the numbers make sense, we can show you the next step. If they do not, we will tell you that before you waste time on a sales appointment.

Want the fastest answer? Reply with a photo or PDF of a recent electric bill, or call us at 1 (888) 832-5050.

AllSeason Solar
```

### Touch 5: Second Call, 5-10 minutes

**Opener if answered**

```text
Hi {first_name}, it is {rep_name} with AllSeason Solar again. I wanted to catch you while your Fight The Power request was still fresh.

The quick question is this: is your main goal lowering the monthly bill, getting protection from rate increases, or checking if solar even makes sense?
```

**If busy**

```text
No problem. I can make this easier by text. Should I send the two questions we need to check fit?
```

### Touch 6: SMS After Second Call, 10-15 minutes

```text
Quick version, {first_name}: to see if solar is worth reviewing, we need:

1. Is {monthly_bill}/mo average or high?
2. About how old is the roof?
3. Do you want bill savings only, or backup power too?

Reply with the answers and I can point you in the right direction.
```

### Touch 7: Third Call, 45-90 minutes

**Opener**

```text
Hi {first_name}, {rep_name} with AllSeason Solar. Last try for today unless you want me to text instead.

You came in from the Fight The Power ad, so I wanted to make sure you got a real answer, not just another solar sales call. Do you want us to check whether the bill and roof make sense for solar?
```

### Touch 8: Day 0 Evening SMS

Send around 5:30-7:00 PM local time, unless they opted out.

```text
{first_name}, most people who come through the Fight The Power page just want to know if the bill is high enough for solar to matter.

If you send your average bill amount and roof age, we can tell you whether it is worth a closer look.
```

## Day 1 Sequence

### Touch 9: Morning SMS

```text
Morning {first_name}, this is {rep_name} with AllSeason. Should we close out your solar savings check, or do you still want us to review the bill and roof fit?
```

### Touch 10: Midday Call

**Opener**

```text
Hi {first_name}, this is {rep_name} with AllSeason Solar. I am following up on your Fight The Power request from yesterday.

The reason I am calling is simple: if your bill is around {monthly_bill}, there may be enough there to review. The roof status is the other half of the answer. Do you know roughly how old your roof is?
```

**If roof is older**

```text
That is actually important. Solar on a tired roof can create extra cost later. We may want to look at roof-first or roof-plus-solar timing instead of pretending the roof does not matter.
```

### Touch 11: Education Email

**Subject:** The roof question most solar ads skip
**Preview:** Solar savings only matter if the roof plan makes sense too.

```text
Hi {first_name},

The ad you clicked was about fighting the power bill. That is the attention-grabber.

The real review is a little more practical:

1. Is the electric bill high enough for solar to matter?
2. Does the roof have enough life left?
3. Would solar, a roof project, or roof-plus-solar be the smarter order?

That last question matters. Removing panels later for roof work can erase a lot of the benefit homeowners hoped to get.

If you want us to check the fit, send your average electric bill and approximate roof age, or call 1 (888) 832-5050.

AllSeason Solar
```

## Day 2 Sequence

### Touch 12: SMS With Choice Close

```text
{first_name}, which answer would help more?

A) Can solar lower my bill?
B) Is my roof ready for solar?
C) What would a battery or backup option add?

Reply A, B, or C and I will point you to the right next step.
```

### Touch 13: Call Script

```text
Hi {first_name}, it is {rep_name} with AllSeason. I am following up because you asked to qualify from the Fight The Power ad.

I can keep this simple. If you give me the average electric bill and roof age, I can tell you whether a solar review is worth scheduling or whether we should leave it alone for now.
```

### Touch 14: Voicemail

```text
Hi {first_name}, {rep_name} with AllSeason Solar. I am following up on your request to check solar savings.

The main thing we need is whether {monthly_bill} is your normal electric bill and whether the roof is in good shape. I will send one more text with a simple A, B, C reply.
```

## Day 3 Sequence

### Touch 15: Proof / Trust SMS

```text
Quick note, {first_name}: AllSeason looks at roof condition before recommending solar because the roof and panels share the same surface.

That is why your request asks about both the bill and the roof. Want us to review yours?
```

### Touch 16: Email

**Subject:** If solar is not a fit, we should say so
**Preview:** A good review starts with the bill and roof, not pressure.

```text
Hi {first_name},

Solar should not be treated like a one-size-fits-all product.

For some homes, the numbers are strong. For others, the roof timing, shade, bill size, or ownership situation makes it a poor fit.

That is why our first review is short:

- Confirm the bill
- Check roof readiness
- Understand your goal
- Decide whether a full solar appointment makes sense

If you still want that answer, reply to this email or call 1 (888) 832-5050.

AllSeason Solar
```

## Day 5 Sequence

### Touch 17: Offer A Specific Appointment

```text
{first_name}, we still have openings for quick solar savings reviews this week.

Would {time_option_1} or {time_option_2} work to check your bill and roof fit?
```

### Touch 18: Call Script

```text
Hi {first_name}, this is {rep_name} with AllSeason Solar. I am trying to finish up the Fight The Power requests from this week.

Do you still want us to check whether solar could help with your electric bill, or should I close this out?
```

If interested:

```text
Perfect. I only need to confirm a few things before scheduling: average electric bill, roof age, any shade, and whether all decision-makers can be on the review.
```

## Day 7 Breakup Sequence

### Touch 19: Breakup SMS

```text
{first_name}, I do not want to keep bothering you.

Should I close out your solar savings check for now, or do you still want AllSeason to review whether your bill and roof are a fit?
```

### Touch 20: Breakup Email

**Subject:** Should we close this out?
**Preview:** I do not want to keep chasing if solar is no longer on your radar.

```text
Hi {first_name},

We have tried to reach you about the solar savings check you requested from the Fight The Power page.

Should we close this out for now?

If your electric bill is still a concern, we can still review whether solar makes sense around your roof, bill, and home. If not, no problem.

You can reply here or call 1 (888) 832-5050.

AllSeason Solar
```

## Long-Tail Nurture

Use only for leads with consent who have not booked, opted out, or been disqualified.

### Day 14 SMS

```text
{first_name}, electric bills tend to get attention again when the next one arrives.

If you want AllSeason to check whether solar is worth reviewing, send your average bill and roof age.
```

### Day 21 Email

**Subject:** Solar question: bill first or roof first?
**Preview:** The answer depends on your home, not just the monthly payment.

```text
Hi {first_name},

If solar is still on your mind, start with two questions:

1. Is the bill high enough for solar to create meaningful savings?
2. Is the roof ready to carry panels for the long term?

If both answers are yes, a solar review may be worth your time.

If the roof is older, roof-first or roof-plus-solar planning may be the smarter path.

Want us to check? Reply with your average bill and roof age.

AllSeason Solar
```

### Day 30 SMS

```text
{first_name}, still want to fight the power bill, or should we leave this closed?

Reply REVIEW if you want AllSeason to check the bill and roof fit.
```

## Live Call Qualification Script

Use after the opener when the homeowner stays on the phone.

### Step 1: Confirm Permission

```text
Before I ask anything else, is it okay if I take two minutes to see if this is worth your time?
```

### Step 2: Bill Context

```text
You entered {monthly_bill}. Is that your average electric bill, your highest recent bill, or a rough guess?
```

Follow-up questions:

- Who is your electric provider?
- Do you expect usage to go up because of EV, pool, HVAC, additions, or family changes?
- Is lowering the monthly bill the main goal, or are you also thinking about backup power?

### Step 3: Roof Context

```text
You selected {roof_status}. About how old is the roof?
```

Follow-up questions:

- Any leaks, missing shingles, soft decking, skylights, or storm damage?
- Any big trees or heavy shade?
- Are you already planning roof work?
- Would you want to understand roof-plus-solar timing if the roof is close?

### Step 4: Ownership And Timing

```text
Do you own the home, and are you planning to stay there for at least a few years?
```

Follow-up questions:

- Are there any HOA or historic district restrictions?
- Is anyone else involved in the decision?
- Are you looking this month, this season, or just researching?

### Step 5: Set The Appointment

```text
Based on what you told me, it is worth a proper review. The next call is not a hard-close appointment. It is a bill, roof, and savings review so you can see the options clearly.

I have {time_option_1} and {time_option_2}. Which one works better?
```

### Step 6: Appointment Confirmation

```text
Great. I have you down for {appointment_time}. Please have a recent electric bill handy. If you can send a photo of the bill before the appointment, the review will be much more accurate.

I will text you the confirmation now.
```

## Appointment Confirmation SMS

```text
Confirmed, {first_name}: your AllSeason solar savings review is set for {appointment_time}.

Please have a recent electric bill ready. If roof age or condition is a concern, we will talk through that too.

Call or text this number if you need to reschedule.
```

## No-Show Recovery

### 5 Minutes After Missed Appointment

```text
{first_name}, we had you scheduled for your AllSeason solar savings review. Want to reconnect today, or should we move it?
```

### Same-Day Call Opener

```text
Hi {first_name}, this is {rep_name} with AllSeason. We had your solar savings review scheduled today, but it looks like the timing may have gotten away from us.

No problem. Do you want to reschedule, or should I close it out?
```

### Next-Day SMS

```text
{first_name}, should we reschedule your bill and roof fit review, or is solar off the table for now?
```

## Objection Handling

### "I was just curious."

```text
That makes sense. Most people who click that ad are curious before they are serious.

The quick review is built for that. We can tell you whether the bill and roof make solar worth a closer look, and if not, you do not need to sit through a full pitch.
```

### "I do not want a sales pitch."

```text
I get it. This first call is not the pitch. It is a fit check.

If your bill, roof, or home is not a fit, we should say that early. If it is a fit, then you can decide whether you want a full review.
```

### "My roof is old."

```text
That is exactly why we ask. Solar can still be possible, but putting panels on a roof that needs work soon can create extra cost later.

We can look at roof-first or roof-plus-solar timing so you are not solving one problem and creating another.
```

### "I already talked to another solar company."

```text
That is helpful. Then this should be easier.

What I would suggest is comparing their recommendation against your roof condition, warranty questions, and actual bill. If their plan is strong, you will know. If there is a gap, we can help you spot it.
```

### "I do not have time."

```text
No problem. I can text the three questions instead: average bill, roof age, and whether you want savings only or backup power too.
```

### "Is this free?"

```text
The initial savings and fit review is no cost. A final proposal depends on the home, utility bill, roof, and system design.
```

### "Do you guarantee savings?"

```text
No one should guarantee that without reviewing the bill and home. The review is how we see what may be possible and whether the numbers are worth pursuing.
```

## Rep Notes By Lead Scenario

### High Bill + Good Roof

Lead with savings review and appointment set.

```text
Your bill is high enough that this is worth checking, and the roof sounds like it may be a reasonable fit. Let us schedule the review and look at the actual numbers.
```

### High Bill + Older Roof

Lead with roof-plus-solar planning.

```text
Your bill may make solar worth reviewing, but the roof timing matters. The smart move may be a roof-first or combined roof-plus-solar plan.
```

### Low Bill + Good Roof

Qualify softly. Do not force appointment.

```text
Your bill may be a little low for solar to create a strong result, but we can still check if your usage changes seasonally or if backup power is part of the goal.
```

### Not Sure About Roof

Use uncertainty as reason for review.

```text
That is normal. Most homeowners do not know if the roof is solar-ready. That is one of the first things we check before recommending anything.
```

## Compliance And Deliverability Rules

- Only text leads who provided consent.
- Include opt-out handling in the SMS platform.
- Respect quiet hours and local calling rules.
- Do not imply guaranteed savings.
- Do not say the utility company is acting illegally or maliciously.
- Do not call the review a final quote.
- Stop all automation once the lead books, opts out, is disqualified, or asks not to be contacted.
- Leave useful voicemails. Silent repeated calls increase spam risk and reduce trust.

## Conversion Metrics To Track

- Speed to first touch
- First-call answer rate
- SMS reply rate
- Contact rate by preferred follow-up method
- Appointment set rate
- Appointment show rate
- Bill collected before appointment
- Roof concern identified before appointment
- Appointment-to-sale rate
- Cost per booked appointment
- Cost per sold job

## A/B Tests

### SMS Test 1: Ad Hook vs Practical Hook

**A: Ad hook**

```text
You came through our Fight The Power page. Want us to check whether solar could lower your bill?
```

**B: Practical hook**

```text
Want the quick answer on whether your bill and roof make solar worth reviewing?
```

### Call Opener Test

**A: Anti-pitch**

```text
I am not calling to pitch panels. I am calling to see whether the numbers are worth a closer look.
```

**B: Bill-first**

```text
You entered {monthly_bill}/mo, so I wanted to verify whether that is average before we recommend anything.
```

### Email Subject Test

- `Your solar savings check request`
- `The roof question most solar ads skip`
- `Should we close out your solar review?`

## CRM Dispositions

Use consistent dispositions so the campaign can be improved.

- `Booked - Solar Review`
- `Booked - Roof + Solar Review`
- `Needs Bill`
- `Needs Roof Review`
- `Text Only`
- `No Answer`
- `Bad Number`
- `Renter / Not Homeowner`
- `Outside Service Area`
- `Low Bill Nurture`
- `Not Interested`
- `Opted Out`

## Recommended Handoff Summary For Sales

```text
Lead came from Meta Fight The Power ad. Homeowner asked to check whether solar could help with electric bill.

Bill: {monthly_bill}
Roof status: {roof_status}
Owns home: {owns_home}
Goal: {primary_goal}
Concerns: {concerns}
Appointment: {appointment_time}
Recommended angle: {bill_savings | roof_plus_solar | backup_power | nurture}
```
