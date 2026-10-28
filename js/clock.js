// =====================================================================
//  ЧАСЫ: рисунок циферблата (SVG) и время по-словацки, как в учебнике
//  (урок 3, «Koľko je hodín?»): Je jedna. Sú dve. Je päť tridsať.
// =====================================================================
import { numToSk } from "./grammar.js";

// часы словами: 1 — jedna, 2 — dve (женский род: hodina), дальше обычные числа
const HOUR_WORD = ["", "jedna", "dve", "tri", "štyri", "päť", "šesť", "sedem", "osem", "deväť", "desať", "jedenásť", "dvanásť"];

// 0 → "", 5 → "nula päť", 30 → "tridsať"
function minuteWord(m) {
  if (!m) return "";
  return m < 10 ? "nula " + numToSk(m) : numToSk(m);
}

// Koľko je hodín? → "Je jedna.", "Sú dve tridsať.", "Je päť nula päť."
export function timePhrase(h, m) {
  h = ((h - 1) % 12) + 1;
  const verb = h >= 2 && h <= 4 ? "Sú" : "Je";
  const mw = minuteWord(m);
  return `${verb} ${HOUR_WORD[h]}${mw ? " " + mw : ""}.`;
}
export const timeDigits = (h, m) => `${h}:${String(m).padStart(2, "0")}`;

// разбор ввода «7:30», «7.30», «19:30», «7» → { h, m } или null
export function parseTime(s) {
  const t = String(s).trim().replace(/\s+/g, "");
  const mt = t.match(/^(\d{1,2})(?:[:.,](\d{1,2}))?$/);
  if (!mt) return null;
  const h = +mt[1], m = mt[2] ? +mt[2] : 0;
  if (h > 24 || m > 59) return null;
  return { h: h % 12 || 12, m };
}

// Циферблат. size — размер в пикселях. Стрелки: часовая короткая и толстая.
export function clockSvg(h, m, size = 180) {
  const hourA = ((h % 12) + m / 60) * 30;
  const minA = m * 6;
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const big = i % 5 === 0;
    const a = (i * 6 * Math.PI) / 180;
    const r1 = big ? 80 : 85, r2 = 90;
    ticks.push(`<line x1="${100 + r1 * Math.sin(a)}" y1="${100 - r1 * Math.cos(a)}" x2="${100 + r2 * Math.sin(a)}" y2="${100 - r2 * Math.cos(a)}" class="${big ? "tk-big" : "tk"}"/>`);
  }
  const nums = [];
  for (let n = 1; n <= 12; n++) {
    const a = (n * 30 * Math.PI) / 180;
    nums.push(`<text x="${100 + 66 * Math.sin(a)}" y="${100 - 66 * Math.cos(a)}" class="cl-num">${n}</text>`);
  }
  return `<svg class="clock" viewBox="0 0 200 200" width="${size}" height="${size}" role="img" aria-label="${timeDigits(h, m)}">
    <circle cx="100" cy="100" r="96" class="cl-face"/>
    ${ticks.join("")}${nums.join("")}
    <line x1="100" y1="100" x2="100" y2="52" class="cl-hour" transform="rotate(${hourA} 100 100)"/>
    <line x1="100" y1="100" x2="100" y2="24" class="cl-min" transform="rotate(${minA} 100 100)"/>
    <circle cx="100" cy="100" r="6" class="cl-pin"/>
  </svg>`;
}
