import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "outputs/meta-campaign-pitch-pipelines";

const theme = {
  navy: "#10243f",
  ink: "#263647",
  muted: "#6a7480",
  border: "#d8e4ed",
  panel: "#ffffff",
  paper: "#f7f9fb",
  blue: "#3f5ca5",
  sky: "#5195cf",
  teal: "#4393a2",
  mint: "#4ea793",
  green: "#96c355",
  sage: "#add081"
};

const stageColors = [theme.blue, theme.sky, theme.teal, theme.mint, theme.green, theme.sage];

const campaigns = [
  {
    slug: "fight-the-power",
    title: "Fight The Power",
    subtitle: "Solar savings lead to booked reviews",
    route: "/meta/fight-the-power",
    source: "AllSeason Meta Fight The Power",
    promise: "Homeowner clicks because the electric bill feels too high.",
    capture: "Page checks bill amount, roof status, ownership, and contact consent.",
    routeRule: "Qualified leads route to the solar preview queue with the ad hook attached.",
    firstTouch: "Rep opens with bill, roof, and fit. No cold panel pitch.",
    appointment: "Book a solar savings review or redirect to roof-first planning.",
    optimize: "Scale by cost per qualified booked review, not lowest CPL.",
    opener: "You asked us to check whether your bill, roof, and home make solar worth reviewing.",
    scorecard: ["Bill-fit rate", "Valid phone rate", "Booked solar review CAC", "Roof-first redirects"]
  },
  {
    slug: "old-roof-15",
    title: "15+ Year Old Roof",
    subtitle: "Aging roof concern to inspection appointment",
    route: "/meta/old-roof",
    source: "AllSeason Meta Old Roof 15",
    promise: "Homeowner clicks because a 15+ year roof may be close to trouble.",
    capture: "Page captures roof age, concern, timing, ZIP, contact, and consent.",
    routeRule: "Lead routes P0 to the roofing preview queue when roof age or urgency qualifies.",
    firstTouch: "Rep calls around inspection first, not replacement pressure.",
    appointment: "Book a free inspection, then decide repair, monitor, or replace.",
    optimize: "Scale by qualified inspections booked and sold-job acquisition cost.",
    opener: "You came through the 15+ year roof page, so I am calling to help check it before a leak makes the decision.",
    scorecard: ["Inspection booked rate", "Show rate", "Sold roof CAC", "Valid phone rate"]
  },
  {
    slug: "roof-warranty",
    title: "Roof Warranty",
    subtitle: "Protection-led click to warranty-backed quote",
    route: "/meta/roof-warranty",
    source: "AllSeason Meta Lifetime Warranty",
    promise: "Homeowner clicks because protection, trust, and warranty matter.",
    capture: "Page captures roof condition, warranty interest, timing, contact, and consent.",
    routeRule: "Lead routes to roofing preview with warranty context before the first call.",
    firstTouch: "Rep compares roof system, certified install, warranty level, and timing.",
    appointment: "Book a roof review and present good, better, best options clearly.",
    optimize: "Scale by margin-quality appointments, quote rate, and close rate by tier.",
    opener: "You came through the warranty page, so I want to compare system, installation, and protection before price by itself.",
    scorecard: ["Quote request rate", "Warranty interest rate", "Booked quote CAC", "Close rate by tier"]
  }
];

const stages = [
  ["Ad Promise", "promise"],
  ["Landing Capture", "capture"],
  ["RevOps Routing", "routeRule"],
  ["Day 0 Outreach", "firstTouch"],
  ["Appointment Path", "appointment"],
  ["Scale Loop", "optimize"]
];

mkdirSync(OUT_DIR, { recursive: true });

const readmeRows = [];

for (const campaign of campaigns) {
  const svg = render(campaign);
  const file = `${campaign.slug}-pitch-pipeline.svg`;
  writeFileSync(join(OUT_DIR, file), svg);
  readmeRows.push(`| ${campaign.title} | \`${file}\` | \`${campaign.route}\` |`);
}

writeFileSync(
  join(OUT_DIR, "README.md"),
  [
    "# Deck-Readable Meta Campaign Pipelines",
    "",
    "Pitch-deck versions of the full-cycle outreach pipeline for the current AllSeason Meta campaigns.",
    "",
    "| Campaign | Asset | Route |",
    "|---|---|---|",
    ...readmeRows,
    "",
    "These are intentionally less dense than the operational flowcharts. Use them to explain the offer in a sales deck or owner presentation."
  ].join("\n")
);

writeFileSync(
  join(OUT_DIR, "META_FULL_CYCLE_PIPELINE_COPY.md"),
  renderCopyDoc()
);

function render(campaign) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc">
  <title id="title">${esc(campaign.title)} full-cycle outreach pipeline</title>
  <desc id="desc">Pitch-deck readable full-cycle outreach pipeline for ${esc(campaign.title)}.</desc>
  <defs>
    <linearGradient id="topGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${theme.blue}"/>
      <stop offset="0.22" stop-color="${theme.sky}"/>
      <stop offset="0.46" stop-color="${theme.teal}"/>
      <stop offset="0.7" stop-color="${theme.mint}"/>
      <stop offset="1" stop-color="${theme.green}"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f4f8fb"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="${theme.navy}" flood-opacity="0.11"/>
    </filter>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="#dfe8f0" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1600" height="900" fill="${theme.paper}"/>
  <rect width="1600" height="900" fill="url(#grid)" opacity="0.35"/>

  ${header(campaign)}
  ${pipeline(campaign)}
  ${openerAndScorecard(campaign)}
</svg>`;
}

function header(campaign) {
  return `<g transform="translate(54 48)">
    <g>
      <path d="M0 15 34 2l34 13v48L34 76 0 63Z" fill="#02060b"/>
      <path d="M17 25 34 19l17 6v7L34 26l-17 6Z" fill="${theme.paper}"/>
      <path d="M17 43 34 37l17 6-17 7Z" fill="${theme.paper}"/>
      <path d="M17 55 34 61l17-6v8L34 69 17 63Z" fill="${theme.paper}"/>
    </g>
    <text x="86" y="50" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="850" fill="#02060b">2Stack</text>
  </g>
  <g transform="translate(405 52)">
    <text x="0" y="46" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="900" fill="#02060b">${esc(campaign.title)}</text>
    <text x="0" y="86" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="650" letter-spacing="1.1" fill="${theme.navy}">FULL-CYCLE OUTREACH PIPELINE</text>
  </g>
  <g transform="translate(1170 48)">
    <rect x="0" y="0" width="360" height="92" rx="18" fill="${theme.panel}" stroke="#d5e0ea"/>
    <text x="24" y="32" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="850" fill="${theme.muted}">LIVE CAMPAIGN ROUTE</text>
    <text x="24" y="62" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="850" fill="${theme.navy}">${esc(campaign.route)}</text>
  </g>
  <g transform="translate(54 168)">
    <rect x="0" y="0" width="1492" height="74" rx="18" fill="url(#topGrad)"/>
    <text x="34" y="47" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="900" fill="#ffffff">${esc(campaign.subtitle)}</text>
    <text x="1050" y="47" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="750" fill="#ffffff">Source: ${esc(campaign.source)}</text>
  </g>`;
}

function pipeline(campaign) {
  const x0 = 54;
  const y0 = 290;
  const gap = 22;
  const w = 230;
  const h = 310;
  return `<g>
    ${stages
      .map(([label, key], index) => {
        const x = x0 + index * (w + gap);
        return `<g transform="translate(${x} ${y0})" filter="url(#shadow)">
          <rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="url(#cardGrad)" stroke="#d8e4ed"/>
          <circle cx="34" cy="38" r="22" fill="${stageColors[index]}"/>
          <text x="34" y="46" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="900" fill="#ffffff">${index + 1}</text>
          <text x="66" y="35" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="900" fill="${theme.navy}">${esc(label)}</text>
          <rect x="20" y="76" width="190" height="4" rx="2" fill="${stageColors[index]}" opacity="0.9"/>
          ${wrappedText(campaign[key], 22, 122, 185, 24, 22, theme.ink, 750)}
        </g>`;
      })
      .join("\n")}
  </g>`;
}

function openerAndScorecard(campaign) {
  return `<g transform="translate(54 652)">
    <rect x="0" y="0" width="720" height="158" rx="20" fill="${theme.panel}" stroke="${theme.border}" filter="url(#shadow)"/>
    <text x="28" y="38" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="900" fill="${theme.navy}">REP OPENER</text>
    ${wrappedText(campaign.opener, 28, 78, 642, 26, 22, theme.ink, 800)}
  </g>
  <g transform="translate(826 652)">
    <rect x="0" y="0" width="720" height="158" rx="20" fill="${theme.panel}" stroke="${theme.border}" filter="url(#shadow)"/>
    <text x="28" y="38" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="900" fill="${theme.navy}">OWNER SCORECARD</text>
    ${campaign.scorecard
      .map((metric, index) => {
        const x = 30 + (index % 2) * 330;
        const y = 74 + Math.floor(index / 2) * 44;
        return `<g transform="translate(${x} ${y})">
          <circle cx="10" cy="0" r="7" fill="${stageColors[index + 2]}" opacity="0.95"/>
          <text x="28" y="7" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="${theme.ink}">${esc(metric)}</text>
        </g>`;
      })
      .join("\n")}
  </g>
  <g transform="translate(54 842)">
    <text x="0" y="0" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="750" fill="${theme.muted}">What this shows in the pitch: the ad does not create an isolated lead. It starts a tracked, source-aware outreach system that moves from click to booked review to revenue feedback.</text>
  </g>`;
}

function wrappedText(text, x, y, maxWidth, lineHeight, fontSize, fill, weight) {
  const words = String(text).split(/\s+/);
  const approxChars = Math.floor(maxWidth / (fontSize * 0.52));
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > approxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines
    .slice(0, 6)
    .map(
      (lineText, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="${weight}" fill="${fill}">${esc(lineText)}</text>`
    )
    .join("\n");
}

function renderCopyDoc() {
  const lines = [
    "# Meta Full-Cycle Outreach Pipeline Copy",
    "",
    "Use this language in pitch decks when explaining the three campaign-specific outreach systems.",
    ""
  ];

  for (const campaign of campaigns) {
    lines.push(`## ${campaign.title}`);
    lines.push("");
    lines.push(`**Slide headline:** ${campaign.title}: ${campaign.subtitle}`);
    lines.push("");
    lines.push("| Stage | Deck Copy |");
    lines.push("|---|---|");
    for (const [label, key] of stages) {
      lines.push(`| ${label} | ${campaign[key]} |`);
    }
    lines.push("");
    lines.push(`**Rep opener:** ${campaign.opener}`);
    lines.push("");
    lines.push(`**Owner scorecard:** ${campaign.scorecard.join("; ")}`);
    lines.push("");
  }

  return lines.join("\n");
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
