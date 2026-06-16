import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const packageDir = join(root, "OPTION_A_CLOSE_PACKAGE");
const exportDir = join(packageDir, "export");
const logoPath = "/Users/surfturf/Downloads/2Stack_Long_TransBLK.png";
const deckPath = join(root, "outputs/manual-allseason-owner-pitch-v3/presentations/allseason-owner-pitch-v3/output/allseason-owner-pitch-v3.pptx");
const htmlPath = join(exportDir, "option-a-close-package.html");
const pdfPath = join(exportDir, "option-a-close-package.pdf");

const docs = [
  "OPTION_A_ONE_PAGE_SOW.md",
  "OPTION_A_90_DAY_SCORECARD.md",
  "OPTION_A_PRODUCTION_PROOF_LOG.md",
  "CHRIS_CLOSE_CALL_TALK_TRACK.md",
  "FOLLOW_UP_EMAIL_TO_CHRIS.md",
  "INTERNAL_CLOSE_CHECKLIST.md"
];

mkdirSync(exportDir, { recursive: true });

const sections = docs.map((file) => {
  const absolute = join(packageDir, file);
  return {
    file,
    html: markdownToHtml(readFileSync(absolute, "utf8"))
  };
});

const html = renderHtml(sections);
writeFileSync(htmlPath, html);

if (existsSync(deckPath)) {
  copyFileSync(deckPath, join(exportDir, basename(deckPath)));
}

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (existsSync(chrome)) {
  try {
    execFileSync(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-background-networking",
      "--disable-component-update",
      "--print-to-pdf-no-header",
      "--no-pdf-header-footer",
      `--user-data-dir=/tmp/option-a-close-package-${Date.now()}`,
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`
    ], { stdio: "ignore", timeout: 20000 });
  } catch {
    // Chrome sometimes writes the PDF and exits slowly. Leave the HTML artifact either way.
  }
}

console.log(JSON.stringify({
  exportDir: resolve(exportDir),
  html: existsSync(htmlPath),
  pdf: existsSync(pdfPath),
  deck: existsSync(join(exportDir, basename(deckPath)))
}, null, 2));

function renderHtml(sections) {
  const logoSrc = existsSync(logoPath) ? `file://${logoPath}` : "";
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Option A Close Package</title>
  <style>
    @page { size: Letter; margin: 0.62in; }
    :root {
      --ink: #111827;
      --muted: #5f6b7a;
      --line: #dce5ec;
      --paper: #f7f9fb;
      --blue: #3f5ca5;
      --teal: #4393a2;
      --green: #96c355;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: white;
      color: var(--ink);
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.48;
    }
    .cover {
      min-height: 9.4in;
      display: grid;
      align-content: space-between;
      padding: 0.1in 0 0.2in;
      break-after: page;
    }
    .grid {
      background:
        linear-gradient(#edf2f6 1px, transparent 1px),
        linear-gradient(90deg, #edf2f6 1px, transparent 1px);
      background-size: 28px 28px;
    }
    .logo { width: 230px; height: auto; }
    .kicker {
      color: var(--blue);
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin: 0 0 14px;
    }
    h1 {
      font-size: 52px;
      line-height: 0.98;
      letter-spacing: -0.02em;
      margin: 0 0 18px;
      max-width: 690px;
    }
    .subtitle {
      color: var(--muted);
      font-size: 19px;
      max-width: 650px;
      margin: 0;
    }
    .ribbon {
      height: 18px;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--blue), var(--teal), var(--green));
      margin: 44px 0 0;
    }
    .cover-meta {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .meta-card, .doc {
      border: 1px solid var(--line);
      border-radius: 14px;
      background: rgba(255,255,255,0.92);
      box-shadow: 0 18px 48px rgba(16, 36, 63, 0.08);
    }
    .meta-card { padding: 18px; }
    .meta-card strong { display: block; font-size: 18px; margin-bottom: 4px; }
    .meta-card span { color: var(--muted); font-size: 13px; }
    .doc {
      padding: 0.1in 0.18in 0.18in;
      margin-bottom: 0.26in;
      break-inside: avoid;
    }
    .doc + .doc { break-before: page; }
    h2 {
      font-size: 31px;
      line-height: 1.05;
      letter-spacing: -0.01em;
      margin: 22px 0 12px;
    }
    h3 {
      font-size: 18px;
      margin: 20px 0 8px;
      color: #183454;
    }
    p, li {
      font-size: 12.5px;
      color: #263647;
    }
    p { margin: 7px 0; }
    ul, ol { margin: 8px 0 8px 20px; padding: 0; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 10.5px;
      break-inside: avoid;
    }
    th {
      text-align: left;
      background: #edf4f6;
      color: #10243f;
      font-weight: 800;
    }
    th, td {
      border: 1px solid var(--line);
      padding: 7px 8px;
      vertical-align: top;
    }
    code, pre {
      font-family: "SFMono-Regular", Consolas, monospace;
      background: #eef3f7;
      border: 1px solid var(--line);
      border-radius: 8px;
      color: #10243f;
    }
    code { padding: 1px 4px; }
    pre { padding: 12px; white-space: pre-wrap; font-size: 11px; }
    blockquote {
      margin: 12px 0;
      padding: 10px 14px;
      border-left: 4px solid var(--teal);
      background: #f3f8f8;
      color: #203446;
    }
    .section-label {
      display: inline-block;
      margin-top: 8px;
      padding: 5px 9px;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(63,92,165,0.12), rgba(150,195,85,0.12));
      color: #10243f;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .footer-note {
      color: var(--muted);
      font-size: 11px;
      border-top: 1px solid var(--line);
      padding-top: 14px;
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <section class="cover grid">
    <div>
      ${logoSrc ? `<img class="logo" src="${logoSrc}" alt="2Stack" />` : `<strong>2Stack</strong>`}
      <div class="ribbon"></div>
    </div>
    <div>
      <p class="kicker">AllSeason Option A Close Package</p>
      <h1>Owned acquisition buildout plus 90-day revenue system operation.</h1>
      <p class="subtitle">A Chris-facing package for approving the $5,000 buildout and $3,000/month operating retainer with scope, scorecard, talk track, production proof, and next-step email.</p>
    </div>
    <div class="cover-meta">
      <div class="meta-card"><strong>$5,000</strong><span>Website, quote engine, intake, and campaign loop buildout</span></div>
      <div class="meta-card"><strong>$3,000/mo</strong><span>90-day operating retainer for source quality, speed-to-lead, and CAC discipline</span></div>
      <div class="meta-card"><strong>30-day notice</strong><span>Break clause after the first 90-day proof cycle</span></div>
    </div>
  </section>
  ${sections.map((section) => `<article class="doc"><span class="section-label">${escapeHtml(section.file.replace(".md", "").replaceAll("_", " "))}</span>${section.html}</article>`).join("\n")}
  <p class="footer-note">Prepared by 2Stack. This package is intended as an operator-facing close and implementation handoff, not legal advice.</p>
</body>
</html>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = "";
  let list = null;
  let paragraph = [];
  let code = false;
  let codeLines = [];
  let table = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    html += `<p>${inline(paragraph.join(" "))}</p>`;
    paragraph = [];
  }

  function flushList() {
    if (!list) return;
    html += `</${list}>`;
    list = null;
  }

  function flushTable() {
    if (!table.length) return;
    const rows = table.filter((row) => !/^\|\s*-/.test(row));
    html += "<table>";
    rows.forEach((row, index) => {
      const cells = row.split("|").slice(1, -1).map((cell) => inline(cell.trim()));
      html += `<tr>${cells.map((cell) => index === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`).join("")}</tr>`;
    });
    html += "</table>";
    table = [];
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushParagraph(); flushList(); flushTable();
      if (code) {
        html += `<pre>${escapeHtml(codeLines.join("\n"))}</pre>`;
        code = false;
        codeLines = [];
      } else {
        code = true;
      }
      continue;
    }
    if (code) {
      codeLines.push(line);
      continue;
    }
    if (line.includes("|") && line.trim().startsWith("|")) {
      flushParagraph(); flushList();
      table.push(line);
      continue;
    } else {
      flushTable();
    }
    if (!line.trim()) {
      flushParagraph(); flushList(); flushTable();
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushParagraph(); flushList();
      const level = Math.min(heading[1].length + 1, 4);
      html += `<h${level}>${inline(heading[2])}</h${level}>`;
      continue;
    }
    const unordered = line.match(/^\s*-\s+(.*)$/);
    if (unordered) {
      flushParagraph();
      if (list !== "ul") {
        flushList();
        list = "ul";
        html += "<ul>";
      }
      html += `<li>${inline(unordered[1])}</li>`;
      continue;
    }
    const ordered = line.match(/^\s*\d+\.\s+(.*)$/);
    if (ordered) {
      flushParagraph();
      if (list !== "ol") {
        flushList();
        list = "ol";
        html += "<ol>";
      }
      html += `<li>${inline(ordered[1])}</li>`;
      continue;
    }
    if (line.startsWith(">")) {
      flushParagraph(); flushList();
      html += `<blockquote>${inline(line.replace(/^>\s?/, ""))}</blockquote>`;
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph(); flushList(); flushTable();
  return html;
}

function inline(value) {
  return escapeHtml(value)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
