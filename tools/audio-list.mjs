// Список всех текстов для озвучки → tools/audio-texts.json (его читает tools/make-audio.py)
// Ключ и хэш считаются так же, как в js/speech.js (audioKey / audioHash).
import { writeFileSync } from "node:fs";
import { WORDS, LESSONS } from "../js/data.js";
import { PRESENT, MODALS, numToSk } from "../js/grammar.js";
import { timePhrase } from "../js/clock.js";
import { audioKey, audioHash } from "../js/audio-key.js";
import { DIALOGS } from "../js/listening.js";

const texts2 = new Map(); // ключ → { text, voice, rate }
const add = (t, voice = "f", rate = null) => { if (!t) return; const k = audioKey(t, voice); if (k) texts2.set(k, { text: t.replace(/\.\.\./g, "").trim(), voice, rate }); };
for (const w of WORDS) { add(w.sk); add(w.fem); }
for (const l of LESSONS) for (const s of l.sentenceList) add(s.sk);
for (let h = 1; h <= 12; h++) for (let m = 0; m < 60; m += 5) add(timePhrase(h, m));
for (let n = 0; n <= 1000; n++) add(numToSk(n));
for (const t of [PRESENT, MODALS]) for (const [inf, forms] of Object.entries(t)) { add(inf); forms.split(" ").forEach((f) => add(f)); }
// диалоги: каждая реплика своим голосом, обычный темп
for (const d of DIALOGS) for (const [who, sk] of d.lines) add(sk, who, "-5%");

const out = [...texts2].map(([key, o]) => ({ key, text: o.text, voice: o.voice, ...(o.rate ? { rate: o.rate } : {}), hash: audioHash(key) }));
const seen = new Map();
for (const o of out) { if (seen.has(o.hash)) throw new Error("коллизия хэша: " + o.key + " / " + seen.get(o.hash)); seen.set(o.hash, o.key); }
writeFileSync(new URL("./audio-texts.json", import.meta.url), JSON.stringify(out, null, 0));
console.log("текстов для озвучки:", out.length);
