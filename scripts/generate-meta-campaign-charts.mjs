import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "outputs/meta-campaign-flowcharts";

const theme = {
  navy: "#10243f",
  ink: "#263647",
  muted: "#6a7480",
  border: "#dce6ee",
  paper: "#f7f9fb",
  panel: "#ffffff",
  blue: "#3f5ca5",
  sky: "#5195cf",
  teal: "#4393a2",
  mint: "#4ea793",
  green: "#96c355",
  sage: "#add081",
  paleGreen: "#cfe3b3"
};

const cardColors = [theme.blue, theme.sky, theme.teal, theme.mint, theme.green, theme.sage];
const ribbonColors = [theme.blue, theme.sky, theme.teal, theme.mint, theme.green, theme.sage, "#b4d38f", "#c8dea9", "#d9e8c5"];

const campaigns = [
  {
    slug: "fight-the-power",
    title: "FIGHT THE POWER",
    subtitle: "Solar savings review funnel",
    source: "AllSeason Meta Fight The Power",
    sourceLines: ["AllSeason Meta", "Fight The Power"],
    route: "/meta/fight-the-power",
    cta: "Check my savings",
    hook: ["Your electric company hopes", "you never check what solar", "could do for the monthly bill."],
    audience: ["NJ homeowners with", "$150+ electric bills,", "roof-aware solar curiosity."],
    formFields: ["ZIP, monthly bill,", "roof status, ownership,", "name, phone, email."],
    p0: ["Owns home, bill $150+,", "valid phone + consent,", "service-area ZIP."],
    queue: "solar_preview_queue",
    sequence: "solar_day0_high_intent",
    script: "fight_the_power_opener",
    opener: ["I am not calling to pitch", "panels cold. I am calling", "to verify bill, roof, and fit."],
    review: ["Validate bill level,", "roof age/status, ownership,", "shade + backup interest."],
    nextStep: ["Solar savings review", "or roof-first timing", "if the roof is older."],
    metrics: ["CPL by creative", "Valid phone rate", "Cost per booked review", "Bill-fit conversion"],
    cutRule: ["Pause if bill-fit rate", "or booked-review CAC", "misses target after 20 leads."],
    scaleRule: ["Scale creative with best", "cost per qualified booked", "solar review, not lowest CPL."]
  },
  {
    slug: "old-roof-15",
    title: "15+ YEAR OLD ROOF",
    subtitle: "Aging roof inspection funnel",
    source: "AllSeason Meta Old Roof 15",
    sourceLines: ["AllSeason Meta", "Old Roof 15"],
    route: "/meta/old-roof",
    cta: "Schedule free inspection",
    hook: ["If your roof is 15+ years", "old, do not wait for", "the leak."],
    audience: ["Homeowners with older", "asphalt roofs, storm worry,", "or visible wear signs."],
    formFields: ["Name, ZIP, state,", "roof age, concern,", "timing, phone, email."],
    p0: ["15+ roof age or", "active leak/storm concern,", "valid phone + consent."],
    queue: "roofing_preview_queue",
    sequence: "roofing_day0_high_intent",
    script: "old_roof_15_opener",
    opener: ["You came through the", "15+ year roof page, so", "I am calling to help check it."],
    review: ["Confirm roof age,", "leak/stain/shingle signs,", "storm exposure + timing."],
    nextStep: ["Free inspection,", "repair review, or", "replacement planning."],
    metrics: ["CPL by creative", "Inspection booked rate", "Show rate", "Sold job CAC"],
    cutRule: ["Pause if valid phone", "rate falls below 60%", "after 10 leads."],
    scaleRule: ["Scale the creative with", "best cost per qualified", "inspection booked."]
  },
  {
    slug: "roof-warranty",
    title: "ROOF WARRANTY",
    subtitle: "Protection-led roofing quote funnel",
    source: "AllSeason Meta Lifetime Warranty",
    sourceLines: ["AllSeason Meta", "Lifetime Warranty"],
    route: "/meta/roof-warranty",
    cta: "Get free quote",
    hook: ["The roof above", "everything that matters.", "Your family. Protected."],
    audience: ["Premium homeowners", "comparing trust, warranty,", "installer quality, and value."],
    formFields: ["Name, ZIP, roof age,", "main concern, timing,", "contact preference."],
    p0: ["Warranty comparison,", "15+ roof age, leak/storm,", "valid phone + consent."],
    queue: "roofing_preview_queue",
    sequence: "roofing_day0_high_intent",
    script: "lifetime_warranty_roofing_opener",
    opener: ["You came through the", "warranty page, so I want", "to compare system and protection."],
    review: ["Roof condition,", "warranty expectations,", "quote timing + financing."],
    nextStep: ["Good/better/best", "roofing review with", "warranty differences clear."],
    metrics: ["Quote request rate", "Warranty interest rate", "Appointment booked CAC", "Close rate by tier"],
    cutRule: ["Pause low-trust creative", "if appointments skew", "price-only after 20 leads."],
    scaleRule: ["Scale the angle with", "highest gross-margin", "roofing opportunity rate."]
  }
];

const stages = [
  "Ad",
  "Click",
  "Landing",
  "Form",
  "Intake",
  "Call",
  "Appt",
  "Quote",
  "Revenue"
];

const aiLayer = [
  "Ad Match Summary",
  "Source Context",
  "SLA Monitor",
  "Script Match",
  "Lead Scoring",
  "Appointment Notes",
  "Objection Tags",
  "CAC Scorecard",
  "Creative Loop"
];

const width = 1540;
const height = 1025;
const margin = 30;
const cardW = 232;
const cardGap = 21;
const cardY = 280;
const cardH = 565;
const cardHeaderH = 82;

mkdirSync(OUT_DIR, { recursive: true });

for (const campaign of campaigns) {
  writeFileSync(join(OUT_DIR, `${campaign.slug}-full-cycle.svg`), renderChart(campaign));
}

writeFileSync(
  join(OUT_DIR, "README.md"),
  [
    "# Meta Campaign Flowcharts",
    "",
    "Generated chart assets for the current AllSeason Meta campaign set.",
    "",
    "| Campaign | SVG | Route | Source |",
    "|---|---|---|---|",
    ...campaigns.map(
      (campaign) =>
        `| ${campaign.title} | \`${campaign.slug}-full-cycle.svg\` | \`${campaign.route}\` | \`${campaign.source}\` |`
    ),
    "",
    "These charts follow the same full-cycle revenue-engine structure as the 2Stack reference asset while tailoring the funnel, scripts, routing, and scorecard to each ad theme."
  ].join("\n")
);

function renderChart(campaign) {
  const cardTitles = [
    ["AD HOOK", "& AUDIENCE"],
    ["LANDING PAGE", "& FORM"],
    ["LEAD INTAKE", "& ROUTING"],
    ["DAY 0", "FOLLOW-UP"],
    ["APPOINTMENT", "& SALES CONTEXT"],
    ["SCORECARD", "& SCALE"]
  ];

  const cards = [
    [
      section("Creative Hook", campaign.hook),
      section("Target Homeowner", campaign.audience),
      section("Primary CTA", [campaign.cta]),
      section("Test Lens", ["Hook strength", "visual trust", "qualified click quality"])
    ],
    [
      section("Route", [campaign.route]),
      section("Captured Fields", campaign.formFields),
      section("Consent + Events", ["TCPA/channel consent", "contact_submitted", "form_submitted"]),
      section("Friction Rule", ["Ask only for what", "sales needs on first touch."])
    ],
    [
      section("Source", campaign.sourceLines ?? [campaign.source]),
      section("P0 Trigger", campaign.p0),
      section("Queue", [campaign.queue]),
      section("Script ID", [campaign.script])
    ],
    [
      section("0-30 sec", ["Immediate SMS", "source hook included"]),
      section("0-60 sec", ["Preview call", "then voicemail if missed"]),
      section("2-5 min", ["Context email", "with exact ad promise"]),
      section("Opener", campaign.opener)
    ],
    [
      section("Rep Validates", campaign.review),
      section("Next Step", campaign.nextStep),
      section("Disposition", ["Booked", "bad fit", "nurture", "call later"]),
      section("No Generic Pitch", ["The ad hook leads", "the first conversation."])
    ],
    [
      section("Daily Metrics", campaign.metrics),
      section("Cut Rule", campaign.cutRule),
      section("Scale Rule", campaign.scaleRule),
      section("Weekly Readout", ["Spend, CAC, show rate,", "gross margin, creative fatigue."])
    ]
  ];

  return [
    `<svg id="meta-campaign-${escapeAttr(campaign.slug)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">`,
    "<title id=\"title\">2Stack Meta Campaign Full Cycle Chart</title>",
    `<desc id="desc">Full-cycle revenue-engine chart for ${escapeText(campaign.title)}.</desc>`,
    defs(campaign),
    `<rect width="${width}" height="${height}" fill="${theme.paper}"/>`,
    `<rect x="0" y="0" width="${width}" height="${height}" fill="url(#bgGrid)" opacity="0.35"/>`,
    renderHeader(campaign),
    renderStageRibbon(campaign),
    ...cards.map((items, index) => renderCard(campaign, index, cardTitles[index], items)),
    renderAILayer(campaign),
    `</svg>`
  ].join("\n");
}

function defs() {
  return `
  <defs>
    <linearGradient id="campaignGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${theme.blue}"/>
      <stop offset="0.22" stop-color="${theme.sky}"/>
      <stop offset="0.46" stop-color="${theme.teal}"/>
      <stop offset="0.7" stop-color="${theme.mint}"/>
      <stop offset="1" stop-color="${theme.green}"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${theme.teal}"/>
      <stop offset="1" stop-color="${theme.green}"/>
    </linearGradient>
    <pattern id="bgGrid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="#d9e3ec" stroke-width="1"/>
    </pattern>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="11" flood-color="${theme.navy}" flood-opacity="0.11"/>
    </filter>
    <filter id="chipShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="${theme.navy}" flood-opacity="0.16"/>
    </filter>
  </defs>`;
}

function renderHeader(campaign) {
  return `
  <g transform="translate(48 54)">
    <g aria-label="2Stack logo">
      <path d="M0 15 34 2l34 13v48L34 76 0 63Z" fill="#02060b"/>
      <path d="M17 25 34 19l17 6v7L34 26l-17 6Z" fill="#f7f9fb"/>
      <path d="M17 43 34 37l17 6-17 7Z" fill="#f7f9fb"/>
      <path d="M17 55 34 61l17-6v8L34 69 17 63Z" fill="#f7f9fb"/>
    </g>
    <text x="86" y="50" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800" fill="#02060b">2Stack</text>
  </g>
  <g transform="translate(390 54)">
    <text x="0" y="48" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="900" fill="#02060b">${escapeText(campaign.title)}</text>
    <text x="0" y="90" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="1.6" fill="${theme.navy}">META FULL CYCLE | ${escapeText(campaign.subtitle).toUpperCase()}</text>
  </g>
  <g transform="translate(1188 58)">
    <rect x="0" y="0" width="300" height="72" rx="14" fill="#ffffff" stroke="#d6e0ea"/>
    <text x="22" y="29" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="800" fill="${theme.muted}">LANDING ROUTE</text>
    <text x="22" y="54" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="850" fill="${theme.navy}">${escapeText(campaign.route)}</text>
  </g>`;
}

function renderStageRibbon(campaign) {
  const x = 32;
  const y = 168;
  const h = 58;
  const segW = 164;
  const arrow = 28;
  return `
  <g transform="translate(${x} ${y})" filter="url(#chipShadow)">
    ${stages
      .map((stage, index) => {
        const sx = index * (segW - 4);
        const fill = ribbonColors[index] ?? theme.paleGreen;
        const points =
          index === stages.length - 1
            ? `${sx},0 ${sx + segW},0 ${sx + segW},${h} ${sx},${h} ${sx + arrow},${h / 2}`
            : `${sx},0 ${sx + segW - arrow},0 ${sx + segW},${h / 2} ${sx + segW - arrow},${h} ${sx},${h} ${sx + arrow},${h / 2}`;
        return `
      <polygon points="${points}" fill="${fill}" stroke="#ffffff" stroke-width="1.4"/>
      <circle cx="${sx + 44}" cy="${h / 2}" r="20" fill="#ffffff" opacity="0.92"/>
      <text x="${sx + 44}" y="${h / 2 + 6}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="900" fill="${theme.navy}">${index + 1}</text>
      <text x="${sx + 76}" y="${h / 2 + 5}" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="850" fill="#ffffff">${escapeText(stage)}</text>`;
      })
      .join("\n")}
  </g>`;
}

function renderCard(campaign, index, titleLines, sections) {
  const x = margin + index * (cardW + cardGap);
  const hue = cardColors[index] ?? theme.green;
  return `
  <g transform="translate(${x} ${cardY})" filter="url(#softShadow)">
    <rect x="0" y="0" width="${cardW}" height="${cardH}" rx="15" fill="#ffffff" stroke="${hue}" stroke-width="1.5"/>
    <path d="M0 15Q0 0 15 0H217Q232 0 232 15V${cardHeaderH}H0Z" fill="${hue}"/>
    <circle cx="35" cy="40" r="22" fill="#ffffff"/>
    <text x="35" y="48" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="900" fill="${hue}">${index + 1}</text>
    <text x="72" y="33" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="900" fill="#ffffff">${escapeText(titleLines[0])}</text>
    <text x="72" y="56" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="900" fill="#ffffff">${escapeText(titleLines[1])}</text>
    ${renderSections(sections, hue)}
  </g>`;
}

function renderSections(sections, hue) {
  let y = 102;
  return sections
    .map((item, index) => {
      const blockH = 82 + Math.max(0, item.lines.length - 2) * 15;
      const rendered = `
    <g transform="translate(14 ${y})">
      <rect x="0" y="0" width="${cardW - 28}" height="${blockH}" rx="9" fill="${index % 2 === 0 ? "#f8fbfd" : "#ffffff"}" stroke="${theme.border}"/>
      <circle cx="18" cy="22" r="8" fill="${hue}" opacity="0.88"/>
      <text x="34" y="26" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="900" fill="${theme.navy}">${escapeText(item.title)}</text>
      ${item.lines
        .map(
          (line, lineIndex) =>
            `<text x="18" y="${50 + lineIndex * 16}" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" fill="${theme.ink}">${escapeText(line)}</text>`
        )
        .join("\n")}
    </g>`;
      y += blockH + 12;
      return rendered;
    })
    .join("\n");
}

function renderAILayer(campaign) {
  const x = 30;
  const y = 884;
  const w = 1480;
  const h = 90;
  const itemW = w / aiLayer.length;
  return `
  <g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="#dce6ee"/>
    <text x="26" y="31" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="900" fill="${theme.navy}">2STACK AI + OPS LAYER</text>
    ${aiLayer
      .map(
        (label, index) => `
    <g transform="translate(${index * itemW} 48)">
      <circle cx="${itemW / 2}" cy="0" r="5" fill="${ribbonColors[index] ?? theme.green}"/>
      <text x="${itemW / 2}" y="26" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="750" fill="#263647">${escapeText(label)}</text>
    </g>`
      )
      .join("\n")}
  </g>`;
}

function section(title, lines) {
  return { title, lines };
}

function escapeText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value) {
  return escapeText(value).replaceAll('"', "&quot;");
}
