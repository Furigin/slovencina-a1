// =====================================================================
//  ПРОГРЕСС УЧЕНИКА: хранение, интервальное повторение, опыт, серия дней.
//  Прогресс всегда сохраняется в браузере (localStorage) и, если ученик
//  вошёл в аккаунт, ещё и в облако (см. cloud.js).
//  Слияние двух копий (merge) ничего не теряет: берётся максимум.
// =====================================================================
import { WORDS, LESSONS, UNIT_BY_ID } from "./data.js";

const PREFIX = "sk-a1:";
// Через сколько дней повторять слово в каждой «коробке» (0 = новое)
export const INTERVALS = [0, 1, 2, 4, 7, 15, 30, 60];
export const GOALS = [20, 50, 100];

// ---------- даты ----------
export function dayKey(d = new Date()) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
// номер дня (для расписания повторений) по локальному времени
export function dayNum(d = new Date()) {
  return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
}
function weekId(d = new Date()) {
  // неделя начинается с понедельника
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return dayKey(monday);
}

// ---------- пустой прогресс ----------
export function emptyProgress() {
  return {
    v: 1,
    words: {},   // id слова → { b: коробка, due: день повтора, n: показов, ok, bad, t: время }
    units: {},   // id темы → { plays, t }
    drills: {},  // id тренажёра → { best, plays, t }
    sents: {},   // номер урока → { best, plays, t }
    days: {},    // "2026-10-27" → опыт за день
    ach: {},     // достижение → когда получено
    settings: { lang: "ru", goal: 50, sound: true, autoplay: true, welcomed: false },
    nick: "",
    created: Date.now(),
    updated: 0,
  };
}

// ---------- слияние двух копий (без потерь) ----------
export function merge(a, b) {
  if (!a) return normalize(b);
  if (!b) return normalize(a);
  a = normalize(a); b = normalize(b);
  const out = emptyProgress();
  // слово: берём более свежую запись
  for (const id of new Set([...Object.keys(a.words), ...Object.keys(b.words)])) {
    const x = a.words[id], y = b.words[id];
    out.words[id] = !x ? y : !y ? x : (y.t || 0) > (x.t || 0) ? y : x;
  }
  const maxRec = (p, q, fields) => {
    const r = {};
    for (const id of new Set([...Object.keys(p), ...Object.keys(q)])) {
      const x = p[id] || {}, y = q[id] || {};
      r[id] = {};
      for (const f of fields) r[id][f] = Math.max(x[f] || 0, y[f] || 0);
    }
    return r;
  };
  out.units = maxRec(a.units, b.units, ["plays", "t"]);
  out.drills = maxRec(a.drills, b.drills, ["best", "plays", "t"]);
  out.sents = maxRec(a.sents, b.sents, ["best", "plays", "t"]);
  for (const d of new Set([...Object.keys(a.days), ...Object.keys(b.days)])) out.days[d] = Math.max(a.days[d] || 0, b.days[d] || 0);
  for (const k of new Set([...Object.keys(a.ach), ...Object.keys(b.ach)])) {
    const x = a.ach[k], y = b.ach[k];
    out.ach[k] = x && y ? Math.min(x, y) : x || y;
  }
  const newer = (b.updated || 0) > (a.updated || 0) ? b : a;
  out.settings = { ...a.settings, ...b.settings, ...newer.settings };
  out.nick = newer.nick || a.nick || b.nick;
  out.created = Math.min(a.created || Date.now(), b.created || Date.now());
  out.updated = Math.max(a.updated || 0, b.updated || 0);
  return out;
}

function normalize(p) {
  const e = emptyProgress();
  if (!p || typeof p !== "object") return e;
  return {
    ...e, ...p,
    words: p.words || {}, units: p.units || {}, drills: p.drills || {}, sents: p.sents || {},
    days: p.days || {}, ach: p.ach || {}, settings: { ...e.settings, ...(p.settings || {}) },
  };
}

// =====================================================================
//  ХРАНИЛИЩЕ (одно на всё приложение)
// =====================================================================
export const store = {
  key: "guest",          // "guest" или uid аккаунта
  p: emptyProgress(),
  listeners: new Set(),

  load(key) {
    this.key = key;
    this.p = readLocal(key) || emptyProgress();
    this.emit(false);
  },
  // сохранить локально и сообщить облаку (cloud = true → надо отправить в облако)
  save(cloud = true) {
    this.p.updated = Date.now();
    writeLocal(this.key, this.p);
    this.emit(cloud);
  },
  replace(p, cloud = true) {
    this.p = normalize(p);
    this.save(cloud);
  },
  subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  emit(cloud) { for (const fn of this.listeners) fn(this.p, cloud); },

  get settings() { return this.p.settings; },
  setSetting(k, v) { this.p.settings[k] = v; this.save(); },

  // ---------- слова ----------
  word(id) { return this.p.words[id]; },
  status(id) {
    const w = this.p.words[id];
    if (!w || !w.b) return "new";
    return w.b >= 4 ? "known" : "learning";
  },
  // ответ на слово: correct = true/false. Возвращает новую коробку.
  grade(id, correct) {
    const today = dayNum();
    const w = this.p.words[id] || { b: 0, due: today, n: 0, ok: 0, bad: 0, t: 0 };
    w.n++;
    if (correct) {
      w.ok++;
      // коробка растёт, только если слово новое или пора повторять
      if (w.b === 0 || w.due <= today) {
        w.b = Math.min(w.b + 1, INTERVALS.length - 1);
        w.due = today + INTERVALS[w.b];
      }
    } else {
      w.bad++;
      w.b = w.b > 3 ? 2 : 1;
      w.due = today; // вернётся в повторение сегодня же
    }
    w.t = Date.now();
    this.p.words[id] = w;
    return w.b;
  },
  // слово показано впервые (карточка «новое слово»)
  introduce(id) {
    if (!this.p.words[id]) this.p.words[id] = { b: 0, due: dayNum(), n: 0, ok: 0, bad: 0, t: Date.now() };
  },

  // ---------- опыт ----------
  addXp(n) {
    const k = dayKey();
    this.p.days[k] = (this.p.days[k] || 0) + n;
  },
  get xp() { return Object.values(this.p.days).reduce((s, x) => s + x, 0); },
  get todayXp() { return this.p.days[dayKey()] || 0; },
  get weekXp() {
    const start = weekId();
    return Object.entries(this.p.days).filter(([d]) => d >= start).reduce((s, [, x]) => s + x, 0);
  },
  get weekId() { return weekId(); },
  get streak() {
    let n = 0;
    const d = new Date();
    if (!this.p.days[dayKey(d)]) d.setDate(d.getDate() - 1); // сегодня ещё не занимался — считаем со вчера
    while (this.p.days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  },

  // ---------- итог занятия ----------
  // kind: "unit" | "drill" | "sent" | "review" | "cards"; score — доля правильных (0..1)
  finishSession(kind, id, { correct, total, mistakes }) {
    const perfect = total > 0 && mistakes === 0;
    const xp = correct + 5 + (perfect ? 5 : 0);
    this.addXp(xp);
    const now = Date.now();
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const bump = (obj, key, withBest) => {
      const r = obj[key] || { plays: 0, best: 0, t: 0 };
      r.plays++; r.t = now;
      if (withBest) r.best = Math.max(r.best || 0, pct);
      obj[key] = r;
    };
    if (kind === "unit") bump(this.p.units, id);
    if (kind === "drill") bump(this.p.drills, id, true);
    if (kind === "sent") bump(this.p.sents, id, true);
    const newAch = this.checkAchievements(perfect);
    this.save();
    return { xp, pct, perfect, newAch };
  },

  // ---------- статистика ----------
  counts(ids = null) {
    let learned = 0, known = 0, total = 0;
    for (const w of WORDS) {
      if (ids && !ids.has(w.id)) continue;
      total++;
      const s = this.status(w.id);
      if (s !== "new") learned++;
      if (s === "known") known++;
    }
    return { learned, known, total };
  },
  // освоение темы 0..1: средняя «коробка» слов (4+ = выучено твёрдо)
  unitMastery(unit) {
    const list = unit.list;
    if (!list.length) return 0;
    const sum = list.reduce((s, w) => s + Math.min((this.p.words[w.id]?.b || 0), 4) / 4, 0);
    return sum / list.length;
  },
  dueWords() {
    const today = dayNum();
    return WORDS.filter((w) => {
      const r = this.p.words[w.id];
      return r && r.b > 0 && r.due <= today;
    }).sort((a, b) => this.p.words[a.id].due - this.p.words[b.id].due);
  },
  weakWords() {
    return WORDS.filter((w) => this.p.words[w.id]?.b > 0)
      .sort((a, b) => {
        const x = this.p.words[a.id], y = this.p.words[b.id];
        return (y.bad - y.ok * 0.3) - (x.bad - x.ok * 0.3) || x.b - y.b;
      });
  },

  checkAchievements(perfect) {
    const got = [];
    const give = (id, cond) => { if (cond && !this.p.ach[id]) { this.p.ach[id] = Date.now(); got.push(id); } };
    const { learned } = this.counts();
    const plays = Object.values(this.p.units).length + Object.values(this.p.drills).length + Object.values(this.p.sents).length;
    give("first", plays >= 1 || this.xp > 0);
    give("perfect", perfect);
    give("words25", learned >= 25);
    give("words100", learned >= 100);
    give("words300", learned >= 300);
    give("streak3", this.streak >= 3);
    give("streak7", this.streak >= 7);
    give("streak30", this.streak >= 30);
    give("xp500", this.xp >= 500);
    give("xp2000", this.xp >= 2000);
    give("grammar5", Object.keys(this.p.drills).length >= 5);
    give("lesson", LESSONS.some((l) => l.units.every((u) => this.p.units[u.id]?.plays)));
    give("allLessons", LESSONS.every((l) => l.units.every((u) => this.p.units[u.id]?.plays)));
    return got;
  },
};

export const ACHIEVEMENTS = [
  ["first", "🐣", "Первые шаги", "First steps", "Пройди первое занятие", "Finish your first session"],
  ["perfect", "💎", "Без единой ошибки", "Flawless", "Пройди занятие без ошибок", "Finish a session with no mistakes"],
  ["words25", "🌱", "25 слов", "25 words", "Выучи 25 слов", "Learn 25 words"],
  ["words100", "🌿", "100 слов", "100 words", "Выучи 100 слов", "Learn 100 words"],
  ["words300", "🌳", "300 слов", "300 words", "Выучи 300 слов", "Learn 300 words"],
  ["streak3", "🔥", "3 дня подряд", "3-day streak", "Занимайся 3 дня подряд", "Practise 3 days in a row"],
  ["streak7", "⚡", "Неделя подряд", "Week streak", "Занимайся 7 дней подряд", "Practise 7 days in a row"],
  ["streak30", "🏆", "Месяц подряд", "Month streak", "Занимайся 30 дней подряд", "Practise 30 days in a row"],
  ["xp500", "⭐", "500 XP", "500 XP", "Набери 500 опыта", "Earn 500 XP"],
  ["xp2000", "🌟", "2000 XP", "2000 XP", "Набери 2000 опыта", "Earn 2000 XP"],
  ["grammar5", "🧠", "Грамматик", "Grammarian", "Пройди 5 разных тренажёров", "Try 5 different grammar drills"],
  ["lesson", "📗", "Урок пройден", "Lesson done", "Пройди все темы одного урока", "Finish all topics of a lesson"],
  ["allLessons", "🎓", "Весь учебник", "Whole book", "Пройди все темы всех 6 уроков", "Finish every topic of all 6 lessons"],
];

// уровень по опыту: 0, 50, 150, 300, 500, 750…
export function levelInfo(xp) {
  let lvl = 1;
  while (25 * (lvl + 1) * lvl <= xp) lvl++;
  const from = 25 * lvl * (lvl - 1), to = 25 * (lvl + 1) * lvl;
  return { lvl, from, to, frac: (xp - from) / (to - from) };
}

// ---------- localStorage ----------
function readLocal(key) {
  try {
    const raw = localStorage.getItem(PREFIX + "progress:" + key);
    if (raw) return normalize(JSON.parse(raw));
  } catch (e) {
    // основная копия повреждена — пробуем запасную
    try {
      const bak = localStorage.getItem(PREFIX + "progress-bak:" + key);
      if (bak) return normalize(JSON.parse(bak));
    } catch (e2) { /* ничего не поделать */ }
  }
  return null;
}
function writeLocal(key, p) {
  try {
    const k = PREFIX + "progress:" + key;
    const prev = localStorage.getItem(k);
    if (prev) localStorage.setItem(PREFIX + "progress-bak:" + key, prev);
    localStorage.setItem(k, JSON.stringify(p));
  } catch (e) { console.warn("Не удалось сохранить в браузере", e); }
}
export function readLocalProgress(key) { return readLocal(key); }
export function clearLocalProgress(key) {
  try { localStorage.removeItem(PREFIX + "progress:" + key); localStorage.removeItem(PREFIX + "progress-bak:" + key); } catch (e) { /* */ }
}
export function localGet(k, def = null) { try { const v = localStorage.getItem(PREFIX + k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } }
export function localSet(k, v) { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch (e) { /* */ } }

// ---------- резервная копия файлом ----------
export function exportProgress() {
  const data = JSON.stringify({ app: "slovencina-a1", exported: new Date().toISOString(), progress: store.p }, null, 1);
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `slovencina-progress-${dayKey()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
export async function importProgress(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  if (data?.app !== "slovencina-a1" || !data.progress) throw new Error("bad file");
  store.replace(merge(store.p, data.progress));
}

export { UNIT_BY_ID };
