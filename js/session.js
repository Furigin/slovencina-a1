// =====================================================================
//  ЗАНЯТИЕ: сборка набора заданий и их показ (как в Duolingo).
//  Типы заданий: intro (новое слово), mc (выбор), listen (на слух),
//  type (ввод), match (пары), tiles (собрать предложение), q (грамматика).
// =====================================================================
import { WORDS, LESSONS } from "./data.js";
import { DRILLS, shuffle } from "./grammar.js";
import { store } from "./store.js";
import { t, tr, getLang } from "./i18n.js";
import { speak, hasVoice, beep } from "./speech.js";

// ссылка «сообщить об ошибке» — новый issue на GitHub с подставленным заданием
const REPO = "https://github.com/Furigin/slovencina-a1";
const reportUrl = (ctx) => `${REPO}/issues/new?title=${encodeURIComponent("Ошибка: " + ctx)}&body=${encodeURIComponent("Что не так и как правильно:\n\n")}`;

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const trW = (w) => (getLang() === "en" ? w.en : w.ru); // перевод слова на язык интерфейса

// ---------- сравнение ответов ----------
const norm = (s) => String(s).toLowerCase().replace(/[.,!?;:«»"„“…–—]/g, " ").replace(/\s+/g, " ").trim();
const strip = (s) => norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "");
// "ok" — точно, "almost" — без диакритики, "bad" — неверно
export function checkAnswer(input, answers) {
  const n = norm(input);
  if (!n) return "bad";
  if (answers.some((a) => norm(a) === n)) return "ok";
  if (answers.some((a) => strip(a) === strip(input))) return "almost";
  return "bad";
}
const mainTr = (s) => norm(s.replace(/\(.*?\)/g, "")); // перевод без пояснений в скобках

// =====================================================================
//  СБОРКА ЗАНЯТИЙ
// =====================================================================
function pool(word, size = 3) {
  // неправильные варианты: сначала из той же темы, потом из того же урока
  const same = WORDS.filter((x) => x.unit === word.unit && x.id !== word.id);
  const lesson = WORDS.filter((x) => x.lesson === word.lesson && x.unit !== word.unit);
  // Перевод делим на синонимы («доктор, врач» → [доктор, врач]). Если у варианта
  // есть общий синоним с уже выбранными — пропускаем, иначе правильных ответов будет два.
  const syn = (x) => mainTr(trW(x)).split(/[,;/]/).map((t) => t.trim()).filter(Boolean);
  const used = new Set([...syn(word), norm(word.sk)]);
  const res = [];
  for (const x of [...shuffle(same), ...shuffle(lesson), ...shuffle(WORDS)]) {
    const keys = syn(x);
    if (keys.some((k) => used.has(k)) || used.has(norm(x.sk))) continue;
    keys.forEach((k) => used.add(k)); used.add(norm(x.sk));
    res.push(x);
    if (res.length >= size) break;
  }
  return res;
}

// задание на слово в зависимости от того, насколько хорошо оно известно
function wordTask(w, level = null) {
  const b = level ?? (store.word(w.id)?.b || 0);
  const voice = hasVoice();
  let types;
  if (b <= 1) types = voice ? ["mc-sk", "mc-sk", "listen"] : ["mc-sk"];
  else if (b <= 3) types = voice ? ["mc-tr", "listen", "type"] : ["mc-tr", "type"];
  else types = voice ? ["type", "listen-type", "mc-tr"] : ["type", "mc-tr"];
  const kind = types[Math.floor(Math.random() * types.length)];
  if (kind === "mc-sk") return { type: "mc", dir: "sk", word: w, options: shuffle([w, ...pool(w)]) };
  if (kind === "mc-tr") return { type: "mc", dir: "tr", word: w, options: shuffle([w, ...pool(w)]) };
  if (kind === "listen") return { type: "listen", word: w, options: shuffle([w, ...pool(w)]) };
  if (kind === "listen-type") return { type: "type", word: w, listen: true };
  return { type: "type", word: w };
}

export function buildUnitSession(unit) {
  const list = unit.list;
  const fresh = list.filter((w) => !store.word(w.id));
  const newOnes = fresh.slice(0, 5);
  const seenAll = list.filter((w) => !newOnes.includes(w));
  const seen = shuffle(seenAll).sort((a, b) => (store.word(a.id)?.b || 0) - (store.word(b.id)?.b || 0)).slice(0, newOnes.length ? 6 : 10);
  const items = [];
  for (let i = 0; i < newOnes.length; i += 2) {
    const pair = newOnes.slice(i, i + 2);
    pair.forEach((w) => items.push({ type: "intro", word: w }));
    pair.forEach((w) => items.push(wordTask(w, 0)));
  }
  const forMatch = shuffle([...newOnes, ...seen]).slice(0, 5);
  if (forMatch.length >= 4) items.push({ type: "match", words: forMatch });
  shuffle(seen).forEach((w) => items.push(wordTask(w)));
  newOnes.forEach((w) => items.push(wordTask(w, 2)));
  return { kind: "unit", id: unit.id, title: `${unit.icon} ${tr(unit)}`, items };
}

export function buildReviewSession(words) {
  const list = words.slice(0, 15);
  const items = shuffle(list).map((w) => wordTask(w));
  if (list.length >= 5) items.splice(Math.min(4, items.length), 0, { type: "match", words: shuffle(list).slice(0, 5) });
  return { kind: "review", id: "review", title: t("reviewTitle"), items };
}

export function buildSentenceSession(lesson) {
  const all = lesson.sentenceList;
  const items = shuffle(all).slice(0, 7).map((s) => {
    const tokens = s.sk.split(" ");
    const extra = shuffle(all.filter((x) => x !== s).flatMap((x) => x.sk.split(" ")))
      .filter((tok) => !tokens.some((y) => norm(y) === norm(tok))).slice(0, 3);
    return { type: "tiles", sent: s, tiles: shuffle([...tokens, ...extra]) };
  });
  return { kind: "sent", id: String(lesson.id), title: `${t("sentences")} · ${t("lesson")} ${lesson.id}`, items };
}

export function buildDrillSession(drill) {
  const items = [];
  const seen = new Set();
  let guard = 0;
  while (items.length < 10 && guard++ < 200) {
    const q = drill.gen();
    const key = q.prompt + "|" + q.hint?.ru;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({ type: "q", q });
  }
  return { kind: "drill", id: drill.id, title: `${drill.icon} ${tr(drill.t)}`, items };
}

// =====================================================================
//  ПОКАЗ ЗАНЯТИЯ
// =====================================================================
const SPECIAL = ["á", "ä", "č", "ď", "é", "í", "ĺ", "ľ", "ň", "ó", "ô", "ŕ", "š", "ť", "ú", "ý", "ž"];

export function runSession(root, session, onDone) {
  const queue = [...session.items];
  const graded = new Set();   // слова, которые уже оценены в этом занятии
  const retried = new Set();
  let idx = 0, correct = 0, total = 0, mistakes = 0;
  let current = null, answerFn = null, state = "answer"; // answer | feedback

  root.innerHTML = `
    <div class="session">
      <div class="s-top">
        <button class="icon-btn s-close" aria-label="${esc(t("close"))}">✕</button>
        <div class="bar"><div class="bar-fill"></div></div>
      </div>
      <div class="s-body"></div>
      <div class="s-foot">
        <div class="s-feedback"></div>
        <div class="s-actions">
          <button class="btn ghost s-skip">${esc(t("skip"))}</button>
          <button class="btn primary s-main" disabled>${esc(t("check"))}</button>
        </div>
      </div>
    </div>`;
  const body = root.querySelector(".s-body");
  const foot = root.querySelector(".s-foot");
  const fb = root.querySelector(".s-feedback");
  const mainBtn = root.querySelector(".s-main");
  const skipBtn = root.querySelector(".s-skip");
  const barFill = root.querySelector(".bar-fill");

  root.querySelector(".s-close").onclick = () => { if (confirm(t("quitQ"))) cleanup(), onDone(null); };
  mainBtn.onclick = () => (state === "answer" ? doCheck() : next());
  skipBtn.onclick = () => { if (state === "answer" && answerFn) doCheck(true); };

  const onKey = (e) => {
    if (e.key === "Enter" && !mainBtn.disabled) { e.preventDefault(); mainBtn.click(); }
    else if (state === "answer" && /^[1-6]$/.test(e.key) && document.activeElement?.tagName !== "INPUT") {
      body.querySelectorAll(".opt")[+e.key - 1]?.click();
    }
  };
  document.addEventListener("keydown", onKey);
  function cleanup() { document.removeEventListener("keydown", onKey); }

  const settings = store.settings;
  const say = (text) => { if (settings.sound) speak(text); };

  function setReady(ok) { mainBtn.disabled = !ok; }
  function progress() { barFill.style.width = `${Math.round((idx / queue.length) * 100)}%`; }

  function show() {
    progress();
    if (idx >= queue.length) return finish();
    current = queue[idx];
    state = "answer"; answerFn = null;
    foot.className = "s-foot";
    fb.innerHTML = "";
    mainBtn.textContent = t("check");
    skipBtn.style.visibility = "visible";
    setReady(false);
    const r = RENDER[current.type](current);
    answerFn = r;
  }

  function doCheck(skipped = false) {
    // карточка нового слова — просто идём дальше, без «Правильно!»
    if (current.type === "intro") return next();
    const res = skipped ? { verdict: "bad", answer: current.__answer } : answerFn.check();
    if (!res) return;
    state = "feedback";
    const ok = res.verdict === "ok" || res.verdict === "almost";
    const isRetry = retried.has(current) && current.__retry;
    if (current.type !== "intro") {
      if (!current.__retry) { total++; if (ok) correct++; else mistakes++; }
      // оценка слова для интервального повторения (один раз за занятие)
      const w = current.word;
      if (w && !graded.has(w.id) && !current.__retry) { graded.add(w.id); store.grade(w.id, ok); }
      if (!ok && !isRetry && !current.__retry) { const copy = { ...current, __retry: true }; retried.add(copy); queue.push(copy); }
    }
    if (settings.sound && current.type !== "intro") beep(ok);
    foot.className = "s-foot " + (ok ? "ok" : "bad");
    const title = res.verdict === "ok" ? t("correct") : res.verdict === "almost" ? t("almost") : t("wrong");
    fb.innerHTML = `<div class="fb-title">${ok ? "✔" : "✖"} ${esc(title)}</div>` +
      (res.verdict !== "ok" && res.answer ? `<div class="fb-ans">${esc(t("rightAnswer"))} <b>${esc(res.answer)}</b></div>` : "") +
      (res.explain && res.verdict !== "ok" ? `<div class="fb-exp">${esc(res.explain)}</div>` : "") +
      (res.verdict !== "ok" ? `<a class="fb-report" target="_blank" rel="noopener" href="${reportUrl(reportContext())}">${esc(t("reportHere"))}</a>` : "");
    mainBtn.textContent = t("next");
    mainBtn.disabled = false;
    skipBtn.style.visibility = "hidden";
    body.querySelectorAll("input, .opt, .tile").forEach((x) => (x.disabled = true));
    if (res.speak) say(res.speak);
    mainBtn.focus();
  }

  function next() { idx++; show(); }
  // что именно было в задании — для сообщения об ошибке
  function reportContext() {
    if (current.word) return `${current.word.sk} — ${trW(current.word)} (${current.word.unit})`;
    if (current.sent) return current.sent.sk;
    if (current.q) return `${session.id}: ${current.q.prompt} → ${current.q.answer}`;
    return session.id;
  }

  function finish() {
    cleanup();
    const result = store.finishSession(session.kind, session.id, { correct, total, mistakes });
    onDone({ ...result, correct, total, mistakes });
  }

  // ---------- отрисовка каждого типа задания ----------
  const RENDER = {
    intro(it) {
      const w = it.word;
      store.introduce(w.id);
      body.innerHTML = `
        <div class="ex-label">${esc(t("newWord"))}</div>
        <div class="intro-card">
          <button class="speak big" title="🔊">🔊</button>
          <div class="intro-sk">${esc(w.sk)}</div>
          ${w.fem ? `<div class="intro-fem">♀ ${esc(w.fem)}</div>` : ""}
          <div class="intro-tr">${esc(trW(w))}</div>
          ${w.g ? `<div class="intro-g">${genderLabel(w.g)}</div>` : ""}
        </div>`;
      body.querySelector(".speak").onclick = () => speak(w.sk);
      if (settings.autoplay) say(w.sk);
      mainBtn.textContent = t("gotIt");
      skipBtn.style.visibility = "hidden";
      setReady(true);
      return { check: () => ({ verdict: "ok" }) };
    },

    mc(it) {
      const w = it.word, toSk = it.dir === "tr";
      const prompt = toSk ? trW(w) : w.sk;
      body.innerHTML = `
        <div class="ex-label">${esc(toSk ? t("chooseSlovak") : t("chooseTranslation"))}</div>
        <div class="prompt">${!toSk ? `<button class="speak">🔊</button>` : ""}<span>${esc(prompt)}</span></div>
        <div class="opts">${it.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span>${esc(toSk ? o.sk : trW(o))}</button>`).join("")}</div>`;
      if (!toSk) { body.querySelector(".speak").onclick = () => speak(w.sk); if (settings.autoplay) say(w.sk); }
      return choice(it.options, (o) => o === w, w.sk + (toSk ? "" : " — " + trW(w)), w.sk);
    },

    listen(it) {
      const w = it.word;
      body.innerHTML = `
        <div class="ex-label">${esc(t("listenChoose"))}</div>
        <div class="listen-btns"><button class="speak huge">🔊</button><button class="speak slow">🐢</button></div>
        <div class="opts">${it.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span>${esc(o.sk)}</button>`).join("")}</div>`;
      body.querySelector(".huge").onclick = () => speak(w.sk);
      body.querySelector(".slow").onclick = () => speak(w.sk, { slow: true });
      setTimeout(() => speak(w.sk), 250);
      return choice(it.options, (o) => o === w, `${w.sk} — ${trW(w)}`, w.sk);
    },

    type(it) {
      const w = it.word;
      body.innerHTML = `
        <div class="ex-label">${esc(it.listen ? t("listenType") : t("typeSlovak"))}</div>
        ${it.listen
          ? `<div class="listen-btns"><button class="speak huge">🔊</button><button class="speak slow">🐢</button></div>`
          : `<div class="prompt"><span>${esc(trW(w))}</span></div>`}
        ${typeBox()}`;
      if (it.listen) {
        body.querySelector(".huge").onclick = () => speak(w.sk);
        body.querySelector(".slow").onclick = () => speak(w.sk, { slow: true });
        setTimeout(() => speak(w.sk), 250);
      }
      const input = wireTypeBox();
      return {
        check() {
          const v = checkAnswer(input.value, [w.sk, ...w.alt]);
          return { verdict: v, answer: w.sk + " — " + trW(w), speak: w.sk };
        },
      };
    },

    match(it) {
      const left = shuffle(it.words), right = shuffle(it.words);
      body.innerHTML = `
        <div class="ex-label">${esc(t("matchPairs"))}</div>
        <div class="match">
          <div class="col">${left.map((w) => `<button class="opt m" data-id="${esc(w.id)}" data-side="l">${esc(w.sk)}</button>`).join("")}</div>
          <div class="col">${right.map((w) => `<button class="opt m" data-id="${esc(w.id)}" data-side="r">${esc(trW(w))}</button>`).join("")}</div>
        </div>`;
      let sel = null, done = 0, errors = 0;
      skipBtn.style.visibility = "hidden";
      body.querySelectorAll(".m").forEach((b) => {
        b.onclick = () => {
          if (b.classList.contains("done")) return;
          if (b.dataset.side === "l") speak(b.textContent);
          if (!sel || sel.dataset.side === b.dataset.side) {
            body.querySelectorAll(`.m[data-side="${b.dataset.side}"]`).forEach((x) => x.classList.remove("sel"));
            b.classList.add("sel"); sel = b; return;
          }
          if (sel.dataset.id === b.dataset.id) {
            [sel, b].forEach((x) => { x.classList.remove("sel"); x.classList.add("done"); x.disabled = true; });
            done++;
            if (settings.sound) beep(true);
            if (done === it.words.length) { setReady(true); mainBtn.click(); }
          } else {
            errors++;
            const a = sel, c = b;
            [a, c].forEach((x) => x.classList.add("shake"));
            setTimeout(() => [a, c].forEach((x) => x.classList.remove("shake", "sel")), 450);
          }
          sel = null;
        };
      });
      return { check: () => ({ verdict: errors === 0 ? "ok" : errors <= 2 ? "almost" : "bad" }) };
    },

    tiles(it) {
      const s = it.sent;
      body.innerHTML = `
        <div class="ex-label">${esc(t("buildSentence"))}</div>
        <div class="prompt"><span>${esc(getLang() === "en" ? s.en : s.ru)}</span></div>
        <div class="tiles-answer"></div>
        <div class="tiles-bank">${it.tiles.map((tok, i) => `<button class="tile" data-i="${i}">${esc(tok)}</button>`).join("")}</div>`;
      const ans = body.querySelector(".tiles-answer");
      const picked = [];
      current.__answer = s.sk;
      body.querySelectorAll(".tiles-bank .tile").forEach((b) => {
        b.onclick = () => {
          if (b.classList.contains("used")) return;
          b.classList.add("used");
          const chip = document.createElement("button");
          chip.className = "tile";
          chip.textContent = b.textContent;
          chip.onclick = () => { if (state !== "answer") return; chip.remove(); b.classList.remove("used"); picked.splice(picked.indexOf(chip), 1); setReady(picked.length > 0); };
          ans.appendChild(chip);
          picked.push(chip);
          setReady(true);
        };
      });
      return {
        check() {
          const v = checkAnswer(picked.map((c) => c.textContent).join(" "), [s.sk]);
          return { verdict: v === "almost" ? "bad" : v, answer: s.sk, speak: s.sk };
        },
      };
    },

    q(it) {
      const q = it.q;
      const typed = q.typed && (!q.options || Math.random() < 0.5);
      body.innerHTML = `
        <div class="ex-label">${esc(typed ? t("grammarType") : t("grammarQ"))}</div>
        <div class="prompt grammar"><span>${esc(q.prompt)}</span>${q.hint ? `<small>${esc(tr(q.hint))}</small>` : ""}</div>
        ${typed ? typeBox() : `<div class="opts">${q.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span>${esc(o)}</button>`).join("")}</div>`}`;
      const explain = q.explain ? tr(q.explain) : "";
      const answers = [q.answer, ...(q.alts || [])];
      if (typed) {
        const input = wireTypeBox();
        return { check: () => ({ verdict: checkAnswer(input.value, answers), answer: q.answer, explain, speak: q.audio || q.answer }) };
      }
      const c = choice(q.options, (o) => o === q.answer, q.answer, q.audio || q.answer);
      return { check: () => ({ ...c.check(), explain }) };
    },
  };

  // общий выбор из вариантов
  function choice(options, isRight, answerText, speakText) {
    let chosen = null;
    current.__answer = answerText;
    body.querySelectorAll(".opt").forEach((b) => {
      b.onclick = () => {
        body.querySelectorAll(".opt").forEach((x) => x.classList.remove("sel"));
        b.classList.add("sel");
        chosen = options[+b.dataset.i];
        setReady(true);
      };
    });
    return {
      check() {
        const ok = isRight(chosen);
        body.querySelectorAll(".opt").forEach((b) => {
          const o = options[+b.dataset.i];
          if (isRight(o)) b.classList.add("right");
          else if (o === chosen) b.classList.add("wrong");
        });
        return { verdict: ok ? "ok" : "bad", answer: answerText, speak: speakText };
      },
    };
  }

  function typeBox() {
    return `<input class="type-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(t("typeHere"))}">
      <div class="special">${SPECIAL.map((c) => `<button class="sp" type="button">${c}</button>`).join("")}</div>`;
  }
  function wireTypeBox() {
    const input = body.querySelector(".type-in");
    const w = current.word;
    current.__answer = w ? `${w.sk} — ${trW(w)}` : current.q?.answer;
    input.oninput = () => setReady(input.value.trim().length > 0);
    body.querySelectorAll(".sp").forEach((b) => {
      b.onmousedown = (e) => e.preventDefault(); // не терять фокус поля
      b.onclick = () => {
        const s = input.selectionStart ?? input.value.length, e = input.selectionEnd ?? s;
        input.value = input.value.slice(0, s) + b.textContent + input.value.slice(e);
        input.setSelectionRange(s + 1, s + 1);
        input.focus();
        setReady(true);
      };
    });
    setTimeout(() => input.focus(), 50);
    return input;
  }

  show();
}

export function genderLabel(g) {
  const m = { m: ["муж. род · ten", "masculine · ten"], f: ["жен. род · tá", "feminine · tá"], n: ["ср. род · to", "neuter · to"], pl: ["только мн. число", "plural only"] }[g];
  return m ? esc(getLang() === "en" ? m[1] : m[0]) : "";
}

export { LESSONS, DRILLS };
