// Generates the profile README artwork in assets/ for both GitHub color schemes.
// Usage: node scripts/build.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "profile.json"), "utf8"));
const outDir = join(root, "assets");
mkdirSync(outDir, { recursive: true });

const THEMES = {
  dark: {
    bg: "#0d1117",
    panel: "#161b22",
    panelHi: "#1c2330",
    border: "#30363d",
    grid: "#1b222c",
    fg: "#e6edf3",
    muted: "#8b949e",
    faint: "#484f58",
    accent: "#4f8ff7",
    accentSoft: "rgba(79,143,247,0.12)",
    before: "#6e7681",
  },
  light: {
    bg: "#ffffff",
    panel: "#f6f8fa",
    panelHi: "#eef2f5",
    border: "#d0d7de",
    grid: "#eef1f4",
    fg: "#1f2328",
    muted: "#59636e",
    faint: "#afb8c1",
    accent: "#1f5fd1",
    accentSoft: "rgba(31,95,209,0.07)",
    before: "#8c959f",
  },
};

const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif";
const MONO =
  "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const svg = (w, h, t, body, extraCss = "") => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
<style>
  .sans { font-family: ${SANS}; }
  .mono { font-family: ${MONO}; }
  .flow { stroke-dasharray: 3 7; animation: flow 1.6s linear infinite; }
  .blink { animation: blink 1.1s steps(1) infinite; }
  .pulse { animation: pulse 2.4s ease-in-out infinite; }
  @keyframes flow { to { stroke-dashoffset: -20; } }
  @keyframes blink { 50% { opacity: 0; } }
  @keyframes pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
  ${extraCss}
  @media (prefers-reduced-motion: reduce) { .flow, .blink, .pulse { animation: none; } }
</style>
<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="12" fill="${t.panel}" stroke="${t.border}"/>
${body}
</svg>
`;

const gridPattern = (t, id = "grid") => `<defs>
  <pattern id="${id}" width="24" height="24" patternUnits="userSpaceOnUse">
    <path d="M24 0H0V24" stroke="${t.grid}" stroke-width="1"/>
  </pattern>
  <linearGradient id="${id}-fade" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="${t.panel}" stop-opacity="1"/>
    <stop offset="0.45" stop-color="${t.panel}" stop-opacity="0.6"/>
    <stop offset="1" stop-color="${t.panel}" stop-opacity="0"/>
  </linearGradient>
</defs>`;

const label = (x, y, text, t, opts = {}) =>
  `<text x="${x}" y="${y}" class="mono" font-size="${opts.size ?? 12}" letter-spacing="${opts.ls ?? 1.5}" fill="${opts.fill ?? t.muted}"${opts.anchor ? ` text-anchor="${opts.anchor}"` : ""}>${esc(text)}</text>`;

// --- Hero ---------------------------------------------------------------
function hero(t) {
  const { name, headline, location, stack, status } = data.hero;
  const W = 1200;
  const H = 300;
  const statusRows = status
    .map(
      ([k, v], i) =>
        `<text x="760" y="${144 + i * 26}" class="mono" font-size="14" fill="${t.muted}">${esc(k)}</text>
<text x="852" y="${144 + i * 26}" class="mono" font-size="14" fill="${t.fg}">${esc(v)}</text>`,
    )
    .join("\n");
  const chips = stack
    .map((s, i) => {
      const x = 48 + stack.slice(0, i).reduce((a, c) => a + c.length * 7.8 + 30, 0);
      const w = s.length * 7.8 + 20;
      return `<rect x="${x}" y="226" width="${w}" height="28" rx="6" fill="${t.accentSoft}" stroke="${t.border}"/>
<text x="${x + 10}" y="245" class="mono" font-size="13" fill="${t.fg}">${esc(s)}</text>`;
    })
    .join("\n");
  return svg(
    W,
    H,
    t,
    `${gridPattern(t)}
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="11" fill="url(#grid)"/>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="11" fill="url(#grid-fade)"/>
${label(48, 62, "~/zxzinn", t, { fill: t.accent })}
<rect x="118" y="51" width="8" height="14" fill="${t.accent}" class="blink"/>
<text x="48" y="122" class="sans" font-size="46" font-weight="700" fill="${t.fg}" letter-spacing="-0.5">${esc(name)}</text>
<text x="48" y="162" class="sans" font-size="20" fill="${t.muted}">${esc(headline[0])}</text>
<text x="48" y="190" class="sans" font-size="20" fill="${t.muted}">${esc(headline[1])}</text>
${chips}
<rect x="732" y="40" width="420" height="220" rx="10" fill="${t.bg}" stroke="${t.border}"/>
<circle cx="754" cy="62" r="5" fill="${t.faint}"/><circle cx="772" cy="62" r="5" fill="${t.faint}"/><circle cx="790" cy="62" r="5" fill="${t.faint}"/>
<text x="1134" y="66" class="mono" font-size="12" fill="${t.muted}" text-anchor="end">${esc(location)}</text>
<line x1="733" y1="82" x2="1151" y2="82" stroke="${t.border}"/>
<text x="760" y="114" class="mono" font-size="14"><tspan fill="${t.accent}">$</tspan><tspan fill="${t.fg}"> whoami --now</tspan></text>
${statusRows}
<text x="760" y="${144 + status.length * 26}" class="mono" font-size="14" fill="${t.accent}">$</text>
<rect x="774" y="${132 + status.length * 26}" width="8" height="15" fill="${t.accent}" class="blink"/>`,
  );
}

// --- Architecture ---------------------------------------------------------
function architecture(t) {
  const { title, subtitle, lanes } = data.architecture;
  const W = 1200;
  const top = 104;
  const laneH = 74;
  const H = top + lanes.length * laneH + 28;
  const x0 = 180;
  const x1 = W - 40;
  const gap = 14;
  const centers = [];
  const rows = lanes
    .map((lane, li) => {
      const y = top + li * laneH;
      const n = lane.nodes.length;
      const bw = (x1 - x0 - gap * (n - 1)) / n;
      centers[li] = lane.nodes.map((_, i) => x0 + i * (bw + gap) + bw / 2);
      const boxes = lane.nodes
        .map(([head, sub, hot], i) => {
          const bx = x0 + i * (bw + gap);
          return `<rect x="${bx}" y="${y}" width="${bw}" height="52" rx="8" fill="${hot ? t.accentSoft : t.bg}" stroke="${hot ? t.accent : t.border}"/>
<text x="${bx + 14}" y="${y + 22}" class="sans" font-size="14" font-weight="600" fill="${t.fg}">${esc(head)}</text>
<text x="${bx + 14}" y="${y + 41}" class="mono" font-size="11.5" fill="${t.muted}">${esc(sub)}</text>`;
        })
        .join("\n");
      return `${label(40, y + 31, lane.name, t, { size: 11 })}
${boxes}`;
    })
    .join("\n");
  // Animated connectors between consecutive lanes, from each node to the closest node below.
  const links = [];
  for (let li = 0; li < lanes.length - 1; li++) {
    const yA = top + li * laneH + 52;
    const yB = top + (li + 1) * laneH;
    for (const cx of centers[li]) {
      const target = centers[li + 1].reduce((a, b) => (Math.abs(b - cx) < Math.abs(a - cx) ? b : a));
      const ym = (yA + yB) / 2;
      links.push(
        `<path d="M${cx} ${yA} C${cx} ${ym} ${target} ${ym} ${target} ${yB}" stroke="${t.faint}" stroke-width="1.2"/>`,
        `<path d="M${cx} ${yA} C${cx} ${ym} ${target} ${ym} ${target} ${yB}" stroke="${t.accent}" stroke-width="1.6" class="flow" style="animation-delay:${(-0.2 * (li + links.length)) % 1.6}s"/>`,
      );
    }
  }
  return svg(
    W,
    H,
    t,
    `${gridPattern(t)}
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="11" fill="url(#grid)" opacity="0.7"/>
<circle cx="48" cy="45" r="5" fill="${t.accent}" class="pulse"/>
${label(62, 49, "NOW", t, { fill: t.accent })}
<text x="40" y="80" class="sans" font-size="22" font-weight="700" fill="${t.fg}">${esc(title)}</text>
${label(W - 40, 49, subtitle, t, { anchor: "end", ls: 0.5 })}
${links.join("\n")}
${rows}`,
  );
}

// --- Metrics strip --------------------------------------------------------
function metrics(t) {
  const { caption, items } = data.metrics;
  const W = 1200;
  const H = 148;
  const pad = 40;
  const cw = (W - pad * 2) / items.length;
  const cells = items
    .map(([value, unit], i) => {
      const x = pad + i * cw;
      const divider = i ? `<line x1="${x}" y1="40" x2="${x}" y2="108" stroke="${t.border}"/>` : "";
      return `${divider}
<text x="${x + (i ? 24 : 0)}" y="86" class="sans" font-size="38" font-weight="700" fill="${t.fg}" letter-spacing="-0.5">${esc(value)}</text>
<text x="${x + (i ? 24 : 0)}" y="110" class="mono" font-size="12" fill="${t.muted}">${esc(unit)}</text>`;
    })
    .join("\n");
  return svg(W, H, t, `${label(pad, 34, caption, t, { size: 11 })}\n${cells}`);
}

// --- Previous role impact -------------------------------------------------
function impact(t) {
  const { title, subtitle, items } = data.impact;
  const W = 1200;
  const H = 250;
  const pad = 40;
  const gap = 16;
  const cw = (W - pad * 2 - gap * (items.length - 1)) / items.length;
  const tiles = items
    .map((it, i) => {
      const x = pad + i * (cw + gap);
      const y = 92;
      let viz = "";
      if (it.bars) {
        const max = Math.max(...it.bars.map((b) => b[1]));
        viz = it.bars
          .map(([lbl, v, isAfter], bi) => {
            const by = y + 92 + bi * 22;
            const bw = Math.max(4, ((cw - 92) * v) / max);
            return `<text x="${x + 18}" y="${by + 10}" class="mono" font-size="11" fill="${t.muted}">${esc(lbl)}</text>
<rect x="${x + 70}" y="${by}" width="${bw}" height="12" rx="3" fill="${isAfter ? t.accent : t.before}" opacity="${isAfter ? 1 : 0.55}"/>`;
          })
          .join("\n");
      } else {
        viz = `<text x="${x + 18}" y="${y + 112}" class="sans" font-size="13" fill="${t.muted}">${esc(it.note)}</text>`;
      }
      return `<rect x="${x}" y="${y}" width="${cw}" height="140" rx="8" fill="${t.bg}" stroke="${t.border}"/>
<text x="${x + 18}" y="${y + 28}" class="mono" font-size="11" letter-spacing="1" fill="${t.muted}">${esc(it.label)}</text>
<text x="${x + 18}" y="${y + 70}" class="sans" font-size="30" font-weight="700" fill="${t.fg}" letter-spacing="-0.5">${it.before ? `<tspan fill="${t.before}" font-weight="500">${esc(it.before)}</tspan><tspan fill="${t.accent}"> → </tspan>` : ""}${esc(it.value)}</text>
${viz}`;
    })
    .join("\n");
  return svg(
    W,
    H,
    t,
    `${label(pad, 49, "PREVIOUSLY", t, { size: 12 })}
<text x="${pad}" y="80" class="sans" font-size="22" font-weight="700" fill="${t.fg}">${esc(title)}</text>
${label(W - pad, 49, subtitle, t, { anchor: "end", ls: 0.5 })}
${tiles}`,
  );
}

// --- Project cards --------------------------------------------------------
const LANG_COLORS = { TypeScript: "#3178c6", Python: "#3572A5", Rust: "#dea584", Go: "#00ADD8" };
function card(t, p) {
  const W = 590;
  const H = 168;
  const desc = p.desc
    .map(
      (line, i) =>
        `<text x="24" y="${100 + i * 20}" class="sans" font-size="13.5" fill="${t.muted}">${esc(line)}</text>`,
    )
    .join("\n");
  return svg(
    W,
    H,
    t,
    `<rect x="24" y="26" width="20" height="18" rx="3" stroke="${t.muted}" stroke-width="1.4"/>
<path d="M29 26v18" stroke="${t.muted}" stroke-width="1.4"/>
<text x="58" y="40" class="mono" font-size="16" font-weight="600" fill="${t.fg}">${esc(p.name)}</text>
<text x="${W - 24}" y="40" class="sans" font-size="20" font-weight="700" fill="${t.accent}" text-anchor="end">${esc(p.metric)}</text>
<text x="${W - 24}" y="60" class="mono" font-size="11" fill="${t.muted}" text-anchor="end">${esc(p.metricLabel)}</text>
<line x1="24" y1="74" x2="${W - 24}" y2="74" stroke="${t.border}"/>
${desc}
<circle cx="30" cy="${H - 22}" r="5" fill="${LANG_COLORS[p.lang] ?? t.faint}"/>
<text x="42" y="${H - 18}" class="mono" font-size="12" fill="${t.muted}">${esc(p.lang)}${p.tags ? `  ·  ${esc(p.tags)}` : ""}</text>`,
  );
}

// --- Upstream contributions ----------------------------------------------
function upstream(t) {
  const { items } = data.upstream;
  const W = 1200;
  const rowH = 46;
  const top = 124;
  const H = top + items.length * rowH + 20;
  const rows = items
    .map(([repo, stars, count, what], i) => {
      const y = top + i * rowH;
      return `${i ? `<line x1="40" y1="${y - 14}" x2="${W - 40}" y2="${y - 14}" stroke="${t.border}"/>` : ""}
<text x="40" y="${y + 10}" class="mono" font-size="14" fill="${t.fg}">${esc(repo)}</text>
<text x="420" y="${y + 10}" class="mono" font-size="12" fill="${t.muted}">★ ${esc(stars)}</text>
<rect x="510" y="${y - 6}" width="${String(count).length * 8 + 70}" height="22" rx="11" fill="${t.accentSoft}" stroke="${t.accent}" stroke-opacity="0.5"/>
<text x="${520}" y="${y + 9}" class="mono" font-size="12" fill="${t.accent}">${esc(count)} merged</text>
<text x="640" y="${y + 10}" class="sans" font-size="13.5" fill="${t.muted}">${esc(what)}</text>`;
    })
    .join("\n");
  return svg(
    W,
    H,
    t,
    `${label(40, 49, "UPSTREAM", t, { size: 12 })}
<text x="40" y="80" class="sans" font-size="22" font-weight="700" fill="${t.fg}">Small contributions upstream</text>
${rows}`,
  );
}

const outputs = {
  hero,
  architecture,
  metrics,
  impact,
  upstream,
  ...Object.fromEntries(data.projects.map((p) => [`card-${p.name}`, (t) => card(t, p)])),
};
for (const [name, render] of Object.entries(outputs)) {
  for (const [mode, theme] of Object.entries(THEMES)) {
    writeFileSync(join(outDir, `${name}-${mode}.svg`), render(theme));
  }
}
console.log(`wrote ${Object.keys(outputs).length * 2} files to assets/`);
