// =====================================================================
//  ОЗВУЧКА словацких слов встроенным голосом браузера (Web Speech API).
//  Берём ТОЛЬКО словацкий голос (sk-SK). Чешский не подставляем никогда —
//  произношение другое. Если словацкого голоса нет — задания на слух
//  просто не показываются.
// =====================================================================
let voice = null;
const subs = new Set();

function pickVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  const sk = voices.filter((v) => /^sk([-_]|$)/i.test(v.lang));
  // предпочитаем «естественные» онлайн-голоса (Edge), затем Google
  voice = sk.find((v) => /natural|online/i.test(v.name)) || sk.find((v) => /google/i.test(v.name)) || sk[0] || null;
  for (const fn of subs) fn(!!voice);
}

if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.addEventListener?.("voiceschanged", pickVoice);
  // некоторые браузеры отдают голоса с задержкой
  setTimeout(pickVoice, 500);
  setTimeout(pickVoice, 2000);
}

export function hasVoice() { return !!voice; }
export function onVoice(fn) { subs.add(fn); }

export function speak(text, { slow = false } = {}) {
  if (!voice) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/\.\.\./g, ""));
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = slow ? 0.6 : 0.9;
    speechSynthesis.speak(u);
  } catch (e) { /* озвучка не критична */ }
}

// =====================================================================
//  ЗВУКИ интерфейса — синтезируются на лету, файлы не нужны.
//  sfx("ok" | "bad" | "tap" | "combo" | "finish" | "level")
// =====================================================================
let ctx = null;
function audio() {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}
// одна нота: частота, начало (с), длительность (с), громкость, тип волны
function note(f, at, dur, vol = 0.12, type = "sine") {
  const c = audio(), t0 = c.currentTime + at;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}
const SOUNDS = {
  ok: () => { note(784, 0, 0.18, 0.12, "triangle"); note(1175, 0.08, 0.28, 0.1, "triangle"); },
  bad: () => { note(196, 0, 0.22, 0.07, "sawtooth"); note(165, 0.1, 0.28, 0.06, "sawtooth"); },
  tap: () => note(1400, 0, 0.05, 0.05, "sine"),
  combo: () => [659, 784, 988, 1319].forEach((f, i) => note(f, i * 0.07, 0.22, 0.1, "triangle")),
  finish: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => note(f, i * 0.11, i === 5 ? 0.6 : 0.2, 0.11, "triangle")),
  level: () => [392, 523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.09, 0.35, 0.1, "square")),
};
export function sfx(name) {
  try { SOUNDS[name]?.(); } catch (e) { /* звук не критичен */ }
}
// лёгкая вибрация на телефоне при ошибке
export function vibrate(ms = 70) {
  // вибрация разрешена только после касания пользователя
  try { if (navigator.userActivation?.hasBeenActive !== false) navigator.vibrate?.(ms); } catch (e) { /* */ }
}
