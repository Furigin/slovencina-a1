// =====================================================================
//  РЕЙТИНГ: медали топ-5, цветные ники, борьба за №1, кэш рейтинга.
//  Опыт за место не даём — мотивация только статусом (корона, титул, свечение).
// =====================================================================
import { cloud, fetchLeaderboard } from "./cloud.js";
import { store, localGet, localSet } from "./store.js";

// цвета медалей: [светлый, основной, тёмный]
const MEDAL = {
  1: ["#fff6c2", "#f5b014", "#a8650a"],  // золото
  2: ["#ffffff", "#c9d1de", "#7b8597"],  // серебро
  3: ["#ffd9b5", "#d98a4e", "#8a4a1c"],  // бронза
  4: ["#efe2ff", "#a35bff", "#5b1fa8"],  // аметист
  5: ["#d8e6ff", "#3f7dff", "#1d3b8f"],  // сапфир
};

// медаль с лентой и номером (SVG прямо в разметке)
export function medalSvg(rank) {
  const c = MEDAL[rank];
  if (!c) return `<span class="lb-num">${rank}</span>`;
  const id = `md${rank}`;
  return `<svg class="medal m${rank}" viewBox="0 0 40 46" aria-label="${rank}">
    <defs>
      <radialGradient id="${id}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient>
      <linearGradient id="${id}r" x1="0" x2="1"><stop offset="0" stop-color="${c[2]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>
    </defs>
    <path d="M11 0h7l5 13h-7z" fill="url(#${id}r)"/><path d="M29 0h-7l-5 13h7z" fill="url(#${id}r)" opacity=".85"/>
    <circle cx="20" cy="28" r="15" fill="url(#${id})" stroke="${c[2]}" stroke-width="1.5"/>
    <circle cx="20" cy="28" r="11" fill="none" stroke="${c[0]}" stroke-opacity=".7" stroke-width="1.2"/>
    ${rank === 1 ? `<path d="M13.5 24.5l3.2 2.6 3.3-5 3.3 5 3.2-2.6-1.4 7.2h-10.2z" fill="#fff" fill-opacity=".95"/>` : `<text x="20" y="33" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="800" font-size="14" fill="#fff" stroke="${c[2]}" stroke-width=".6">${rank}</text>`}
  </svg>`;
}
// класс ника по месту: чем выше, тем «дороже» цвет
export const nickClass = (rank) => (rank <= 5 ? `nick-r${rank}` : "");

// ---------- кэш рейтинга (чтобы не читать базу на каждом экране) ----------
let cache = null, cacheAt = 0;
export async function getLeaderboard(force = false) {
  if (!cloud.user) return [];
  if (!force && cache && Date.now() - cacheAt < 5 * 60 * 1000) return cache;
  cache = await fetchLeaderboard();
  cacheAt = Date.now();
  return cache;
}

// места за неделю (только у кого есть опыт на этой неделе)
export function weekRanking(rows) {
  return rows.filter((r) => r.weekXp > 0).sort((a, b) => b.weekXp - a.weekXp);
}
export function allRanking(rows) {
  return rows.filter((r) => r.xp > 0).sort((a, b) => b.xp - a.xp);
}

// сколько дней до конца недели (неделя кончается в воскресенье)
export function daysLeftInWeek() {
  const d = new Date().getDay(); // 0 = воскресенье
  return d === 0 ? 1 : 8 - d;
}

// Данные для карточки «Твоё место» на главной + проверка «тебя обогнали».
// Возвращает null, если пользователь не вошёл или рейтинга нет.
export async function myStanding() {
  if (!cloud.user) return null;
  const rows = await getLeaderboard();
  // свой опыт берём из локального прогресса — он свежее, чем в облаке
  const meUid = cloud.user.uid;
  const merged = rows.map((r) => (r.uid === meUid ? { ...r, weekXp: store.weekXp, xp: store.xp } : r));
  if (!merged.some((r) => r.uid === meUid)) merged.push({ uid: meUid, nick: cloud.user.nick, weekXp: store.weekXp, xp: store.xp, streak: store.streak });
  const week = weekRanking(merged);
  const pos = week.findIndex((r) => r.uid === meUid);
  const res = { week, pos: pos >= 0 ? pos + 1 : null, me: merged.find((r) => r.uid === meUid), leader: week[0] || null, dethroned: null };

  // «тебя обогнали»: был №1 на этой неделе, а теперь нет
  const key = "rank:" + store.weekId;
  const prev = localGet(key, null);
  if (prev === 1 && res.pos && res.pos > 1) res.dethroned = week[0];
  if (res.pos) localSet(key, res.pos);
  return res;
}
