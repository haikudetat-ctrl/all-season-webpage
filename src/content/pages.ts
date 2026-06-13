import { BatteryCharging, Calculator, CheckCircle2, ClipboardCheck, Home, ShieldCheck, Sun, Wrench } from "lucide-react";

export const hero = {
  eyebrow: "Roofing, solar, batteries, and generators",
  title: "Roof first. Solar smarter.",
  titleBeforeImage: "Roof first.",
  titleAfterImage: "Solar smarter.",
  body: "Replace a worn roof, compare solar options, or plan backup power with one team that understands how the whole home energy system fits together.",
  image: "/homeowner/roof-solar-home-consultation.jpg"
};

export const proofStats = [
  { value: "40+", label: "years around roofing and construction" },
  { value: "5", label: "licensed operating states" },
  { value: "3", label: "roof packages to compare" },
  { value: "25 yr", label: "solar warranty options on qualifying systems" }
] as const;

export const serviceCards = [
  {
    title: "Roof replacement",
    href: "/roofing",
    icon: Home,
    text: "Compare good, better, and best roofing options with warranty, financing, and timing explained clearly."
  },
  {
    title: "Solar",
    href: "/solar",
    icon: Sun,
    text: "Review lease, ownership, prepaid lease, roof fit, and battery options before you commit to a system."
  },
  {
    title: "Roof + solar readiness",
    href: "/roof-solar-readiness",
    icon: ClipboardCheck,
    text: "Avoid paying twice by checking roof age, penetrations, flashing, and warranty before panels go on."
  },
  {
    title: "Battery and generator",
    href: "/batteries-generators",
    icon: BatteryCharging,
    text: "Plan backup power for outages, peak usage, and the appliances your home needs to keep running."
  }
] as const;

export const servicePages = {
  roofing: {
    eyebrow: "Roofing",
    title: "Get a roof quote without the hard sell.",
    body: "Tell us what is going on with the roof, how urgent it is, and whether solar may be part of the plan. We will help you compare practical roof options before you invite anyone onto the job.",
    image: "/homeowner/roof-shingle-inspection.jpg",
    bullets: ["Good, better, and best roof packages", "15-year, 30-year, and lifetime labor warranty options", "Financing windows explained before you decide", "Solar-readiness review when it matters"],
    cta: { label: "Start my roof quote", href: "/roof-quote" },
    introTitle: "A roof is too important to shop like a commodity.",
    introBody: "The lowest bid can become expensive if the warranty, crew, material, ventilation, or future solar plan is wrong. The roofing page is built to help homeowners understand the tradeoffs before price becomes the only conversation.",
    highlights: [
      { title: "Clear package comparison", text: "See how roof tiers differ by labor coverage, material confidence, and long-term protection." },
      { title: "Fast quote context", text: "Share roof size, condition, urgency, and home details so the first conversation starts in the right place." },
      { title: "Roof-plus-energy planning", text: "If solar may happen later, we help you avoid roof decisions that create extra work down the line." }
    ],
    steps: [
      { title: "Share the roof details", text: "ZIP, roof size, age, urgency, layers, pitch, and current condition." },
      { title: "Review a practical range", text: "Use the quote tool to get a good, better, best estimate range before a final proposal." },
      { title: "Choose the right next step", text: "Schedule a review, ask warranty questions, or compare roof-plus-solar timing." }
    ],
    faqs: [
      { question: "Can I get a quote before an in-person visit?", answer: "Yes. The online quote gives a planning range. A final proposal still depends on the roof details and project scope." },
      { question: "Why show good, better, and best?", answer: "Most homeowners need to compare warranty, lifespan, and budget in plain language instead of staring at one number." }
    ]
  },
  solar: {
    eyebrow: "Solar",
    title: "See if solar makes sense before you sit through a pitch.",
    body: "Solar is not one-size-fits-all. Your bill, roof condition, usage, financing preference, and backup needs all change the answer. Start with the facts, then decide whether a deeper solar review is worth it.",
    image: "/homeowner/solar-home-consultation.jpg",
    bullets: ["Lease, ownership, and prepaid lease education", "Roof-fit review before system design", "Battery-ready planning", "Warranty and service questions answered upfront"],
    cta: { label: "Check solar options", href: "/contact" },
    introTitle: "The right solar plan starts with your roof and your electric bill.",
    introBody: "A good solar conversation should not start with pressure. It should start with whether your home, roof, utility bill, and savings goals make solar worth considering.",
    highlights: [
      { title: "Bill-first review", text: "Your current electric bill frames the savings conversation and helps avoid unrealistic assumptions." },
      { title: "Roof-aware design", text: "Older roofs, shade, penetrations, and warranty questions are reviewed before panel placement is treated as final." },
      { title: "Storage and backup options", text: "Battery and generator questions can be discussed alongside solar instead of after the fact." }
    ],
    steps: [
      { title: "Share your electric bill context", text: "Monthly bill range, home ownership, ZIP, and goals." },
      { title: "Check roof and usage fit", text: "Review whether roof condition, direction, and timing support a solar project." },
      { title: "Compare the path forward", text: "Lease, ownership, prepaid lease, battery, or waiting until the roof is ready." }
    ],
    faqs: [
      { question: "Should I go solar if my roof is older?", answer: "Maybe, but the roof should be reviewed first. Replacing a roof after panels are installed can add avoidable cost." },
      { question: "Do you only install solar?", answer: "No. The team can discuss roofing, batteries, generators, and solar as connected decisions." }
    ]
  },
  "roof-solar-readiness": {
    eyebrow: "Roof + Solar Readiness",
    title: "Do the roof once. Build it for the panels that may come next.",
    body: "If your roof is aging and solar is on the table, the order matters. AllSeason helps homeowners plan around roof life, flashing, penetrations, service access, and warranty before panels are installed.",
    image: "/homeowner/roof-solar-readiness-install.jpg",
    bullets: ["Roof age and condition review", "Solar-ready flashing and penetration planning", "Warranty-aware installation sequence", "One team looking at the full roof and energy picture"],
    cta: { label: "Check roof readiness", href: "/roof-quote" },
    introTitle: "Solar can save money. Removing panels to fix a bad roof does not.",
    introBody: "This page helps homeowners avoid the classic mistake: treating the roof and solar system like separate projects. They share the same surface, so the plan should be connected.",
    highlights: [
      { title: "Better installation sequence", text: "Know whether roof work should happen before panels, during the same project, or later." },
      { title: "Cleaner warranty conversations", text: "Understand how roofing labor coverage and solar workmanship questions affect each other." },
      { title: "Fewer surprises later", text: "Plan around skylights, decking concerns, pitch, layers, and panel penetrations early." }
    ],
    steps: [
      { title: "Check roof condition", text: "Age, leaks, layers, pitch, and decking concerns." },
      { title: "Review solar intent", text: "Timing, bill size, ownership preference, and battery interest." },
      { title: "Map the right order", text: "Roof first, solar first, combined project, or wait." }
    ],
    faqs: [
      { question: "Can I add solar to an older roof?", answer: "Sometimes, but the risk should be understood before design. A roof review helps decide whether to replace first." },
      { question: "Why use one team?", answer: "One team can look at roofing and energy together instead of leaving the homeowner to coordinate competing recommendations." }
    ]
  },
  "batteries-generators": {
    eyebrow: "Backup Power",
    title: "Keep the essentials running when the grid does not.",
    body: "Battery and generator planning should match the way your home actually uses power. AllSeason can help compare backup options alongside solar and roof timing.",
    image: "/homeowner/backup-power-home-consultation.jpg",
    bullets: ["Battery backup planning", "Generator consultation", "Solar-plus-storage fit checks", "Critical load conversations before equipment is chosen"],
    cta: { label: "Plan backup power", href: "/contact" },
    introTitle: "Backup power is a comfort decision and a safety decision.",
    introBody: "The right setup depends on what needs to stay on, how often you lose power, and whether solar or a generator should be part of the plan.",
    highlights: [
      { title: "Critical load planning", text: "Identify what matters most: refrigeration, HVAC, medical devices, work equipment, or whole-home comfort." },
      { title: "Battery or generator", text: "Compare which backup path makes sense for the home, budget, and outage pattern." },
      { title: "Solar coordination", text: "Discuss whether storage should connect to a current or future solar system." }
    ],
    steps: [
      { title: "List what must stay on", text: "Essential circuits and comfort priorities." },
      { title: "Review equipment options", text: "Battery, generator, or solar-plus-storage." },
      { title: "Plan the installation path", text: "Coordinate electrical, roof, and future energy needs." }
    ],
    faqs: [
      { question: "Is a battery better than a generator?", answer: "It depends on the home, outage length, utility plan, and whether solar is involved." },
      { question: "Can backup power be added later?", answer: "Often yes, but planning for it early can make solar and electrical decisions cleaner." }
    ]
  },
  "financing-warranty": {
    eyebrow: "Financing and Warranty",
    title: "Know what is covered before you choose the cheapest bid.",
    body: "Roofing and solar warranties can sound similar until something goes wrong. We help homeowners compare coverage, labor, materials, financing, and service responsibility in plain English.",
    image: "/homeowner/warranty-proposal-review.jpg",
    bullets: ["Good, better, best warranty comparison", "Financing options reviewed upfront", "Labor and manufacturer coverage explained", "Service responsibility made clear before signing"],
    cta: { label: "Compare roof tiers", href: "/roof-quote" },
    introTitle: "A warranty should be easy to understand before you need it.",
    introBody: "The right roof or solar plan is not just the price on day one. It is the coverage, installation quality, service path, and financing fit over the life of the project.",
    highlights: [
      { title: "Labor coverage clarity", text: "Compare what is covered, for how long, and who is responsible for helping if something fails." },
      { title: "Manufacturer-backed options", text: "Review CertainTeed-backed roofing and solar warranty options where they apply." },
      { title: "Financing fit", text: "Understand promotional windows and payment options before they become the deciding factor." }
    ],
    steps: [
      { title: "Compare the tiers", text: "Good, better, and best roof packages with different warranty positions." },
      { title: "Ask the coverage questions", text: "Labor, material, service, transferability, and exclusions." },
      { title: "Pick the option you can stand behind", text: "Choose the balance of upfront cost, coverage, and long-term confidence." }
    ],
    faqs: [
      { question: "Is the cheapest roof always a bad idea?", answer: "No, but the cheapest proposal should still be compared against warranty, labor coverage, materials, and installer accountability." },
      { question: "Are financing offers available?", answer: "Financing options may be available depending on the project and approval. The team can review current options during the quote process." }
    ]
  }
} as const;

export const processSteps = [
  { title: "Tell us what changed", text: "Leak, age, storm concern, a higher electric bill, or a future solar plan." },
  { title: "Get practical next steps", text: "Use the roof quote tool or contact form to share the details that matter." },
  { title: "Compare with context", text: "Review cost, warranty, timing, and energy fit before choosing a path." }
] as const;

export const proofCards = [
  { icon: ShieldCheck, title: "Warranty-aware guidance", text: "Roofing and solar options are explained around coverage, service, and long-term ownership." },
  { icon: Wrench, title: "One accountable team", text: "Roofing, solar, batteries, and generators are handled as connected home decisions." },
  { icon: Calculator, title: "Clear quote path", text: "Homeowners can start with a practical roof range before scheduling the next step." },
  { icon: CheckCircle2, title: "Local project context", text: "The team understands regional roofs, utility bills, weather, and installation timing." }
] as const;

export const enterpriseBento = [
  {
    title: "Start with the roof you actually have.",
    text: "Age, leaks, pitch, layers, skylights, and solar plans all change the right recommendation. The quote flow captures those details before the first conversation.",
    image: "/homeowner/roof-shingle-inspection.jpg",
    className: "bento-large"
  },
  {
    title: "Compare roof tiers",
    text: "Good, better, and best options make price, warranty, and protection easier to understand.",
    className: "bento-small"
  },
  {
    title: "Check solar timing",
    text: "Find out whether the roof should be handled before panels go on.",
    className: "bento-small"
  },
  {
    title: "Plan backup power",
    text: "Battery and generator questions can be reviewed alongside solar and roof work.",
    className: "bento-small"
  },
  {
    title: "Talk to one team",
    text: "Avoid stitching together roofers, solar reps, electricians, and warranty questions yourself.",
    className: "bento-small"
  }
] as const;

export const accordionPanels = [
  {
    title: "Roofing",
    text: "Replace an aging or damaged roof with a clearer view of price, warranty, timing, and future solar fit.",
    image: "/homeowner/roof-shingle-inspection.jpg"
  },
  {
    title: "Solar",
    text: "Compare solar paths around your electric bill, roof condition, ownership preference, and backup goals.",
    image: "/homeowner/solar-home-consultation.jpg"
  },
  {
    title: "Roof + solar",
    text: "Plan the right order so panels, penetrations, flashing, and warranty do not become a future headache.",
    image: "/homeowner/roof-solar-readiness-install.jpg"
  },
  {
    title: "Backup power",
    text: "Review battery and generator options for outages, peak usage, and future solar storage.",
    image: "/homeowner/backup-power-home-consultation.jpg"
  }
] as const;

export const marqueeItems = [
  "Roof quote ranges",
  "Solar savings review",
  "Roof + solar planning",
  "Warranty clarity",
  "Battery backup",
  "Generator planning",
  "Local service"
] as const;

export const motionProof = [
  {
    title: "A roof and solar system share the same surface.",
    text: "That means roof age, flashing, layers, penetrations, and labor coverage should be discussed before a system is designed.",
    image: "/homeowner/roof-solar-readiness-install.jpg"
  },
  {
    title: "A clear quote makes the next call easier.",
    text: "When you share roof condition, urgency, size, and solar interest, the team can answer the right questions sooner.",
    image: "/homeowner/warranty-proposal-review.jpg"
  },
  {
    title: "The best choice is the one you understand.",
    text: "Price matters, but so do warranty, service, timing, and whether the project sets your home up for the next decade.",
    image: "/homeowner/roof-solar-home-consultation.jpg"
  }
] as const;
