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

// Короткие звуки «правильно / ошибка» (генерируются, файлы не нужны)
let ctx = null;
export function beep(ok) {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = ok ? [660, 880] : [220, 180];
    notes.forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = ok ? "sine" : "square";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.09);
      g.gain.exponentialRampToValueAtTime(ok ? 0.15 : 0.06, ctx.currentTime + i * 0.09 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.09 + 0.16);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.09);
      o.stop(ctx.currentTime + i * 0.09 + 0.18);
    });
  } catch (e) { /* */ }
}
