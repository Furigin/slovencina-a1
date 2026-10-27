// Проверка словаря: node tools/check-data.mjs
// Ищет чешские буквы, дубли, пустые переводы и битые ссылки на антонимы.
import { WORDS, LESSONS } from "../js/data.js";
import { DRILLS } from "../js/grammar.js";

let errors = 0;
const err = (m) => { errors++; console.log("✖", m); };
const CZECH = /[řůěŘŮĚ]/;

const seen = new Map();
for (const w of WORDS) {
  if (CZECH.test(w.sk) || (w.fem && CZECH.test(w.fem))) err(`чешская буква: ${w.id}`);
  if (!w.ru || !w.en) err(`нет перевода: ${w.id}`);
  if (seen.has(w.id)) err(`дубль id: ${w.id}`);
  seen.set(w.id, w);
  if (w.opp && !WORDS.some((x) => x.sk === w.opp) && !w.opp.startsWith("ne")) err(`антоним не найден: ${w.sk} ↔ ${w.opp}`);
}
// одно и то же словацкое слово в разных темах
const bySk = {};
for (const w of WORDS) (bySk[w.sk.toLowerCase()] ||= []).push(w.unit);
for (const [sk, units] of Object.entries(bySk)) if (units.length > 1) console.log("• повтор слова", sk, units.join(", "));

for (const l of LESSONS) for (const s of l.sentenceList) {
  if (CZECH.test(s.sk)) err(`чешская буква в предложении: ${s.sk}`);
  if (!s.ru || !s.en) err(`нет перевода предложения: ${s.sk}`);
}

// каждый тренажёр должен выдавать вопросы без ошибок
for (const d of DRILLS) {
  for (let i = 0; i < 300; i++) {
    const q = d.gen();
    if (!q.answer) err(`${d.id}: пустой ответ (${q.prompt})`);
    if (q.options && !q.options.includes(q.answer)) err(`${d.id}: ответа нет среди вариантов (${q.prompt} → ${q.answer})`);
    if (q.options && new Set(q.options).size !== q.options.length) err(`${d.id}: повтор вариантов (${q.prompt})`);
    if (CZECH.test(q.answer)) err(`${d.id}: чешская буква (${q.answer})`);
  }
}

const units = LESSONS.reduce((s, l) => s + l.units.length, 0);
console.log(`\nСлов: ${WORDS.length}, тем: ${units}, предложений: ${LESSONS.reduce((s, l) => s + l.sentenceList.length, 0)}, тренажёров: ${DRILLS.length}`);
console.log(errors ? `Ошибок: ${errors}` : "✔ Ошибок нет");
process.exit(errors ? 1 : 0);
