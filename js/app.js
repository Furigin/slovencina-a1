// =====================================================================
//  ЭКРАНЫ ПРИЛОЖЕНИЯ И НАВИГАЦИЯ (#/путь в адресе)
// =====================================================================
import { LESSONS, WORDS, UNIT_BY_ID, WORD_BY_ID, EXTRA_UNITS } from "./data.js";
import { DRILLS, CHEATSHEETS, PRESENT, commonPrefix, shuffle, numToSk, randomTime, clockOptions } from "./grammar.js";
import { clockSvg, timePhrase } from "./clock.js";
import { store, ACHIEVEMENTS, levelInfo, dayKey, dayNum, exportProgress, importProgress, GOALS, localGet, localSet } from "./store.js";
import { cloud, initCloud, login, register, logout, resetPassword, authErrorKey, validNick, fetchLeaderboard, takeGuestMergedFlag } from "./cloud.js";
import { t, tr, setLang, getLang } from "./i18n.js";
import { speak, hasVoice, onVoice, sfx, vibrate } from "./speech.js";
import { esc, trW, runSession, buildUnitSession, buildReviewSession, buildSentenceSession, buildDrillSession, genderLabel } from "./session.js";

const app = document.getElementById("app");
const go = (hash) => { location.hash = hash; };
let toastTimer = null;

export function toast(msg) {
  let el = document.querySelector(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

// ---------- общая рамка: верхняя панель + нижнее меню ----------
function frame(active, inner) {
  const goal = store.settings.goal;
  const today = store.todayXp;
  const pct = Math.min(100, Math.round((today / goal) * 100));
  const syncIcon = !cloud.enabled ? "" : !cloud.user ? `<a href="#/login" class="sync warn" title="${esc(t("login"))}">☁️✖</a>`
    : cloud.status === "error" ? `<span class="sync warn" title="${esc(t("syncError"))}">☁️!</span>`
    : cloud.status === "saving" ? `<span class="sync" title="${esc(t("syncing"))}">☁️…</span>` : `<span class="sync ok" title="${esc(t("synced"))}">☁️✓</span>`;
  const tabs = [
    ["learn", "#/", "🏠", t("navLearn")],
    ["review", "#/review", "🔁", t("navReview"), store.dueWords().length],
    ["dict", "#/dict", "📚", t("navDict")],
    ["grammar", "#/grammar", "🧩", t("navGrammar")],
    ["profile", "#/profile", "👤", t("navProfile")],
  ];
  return `
    <header class="topbar">
      <div class="brand"><img class="logo" src="icons/icon.svg" alt=""> <b>${esc(t("appName"))}</b></div>
      <div class="stats">
        <span class="stat streak ${store.todayXp ? "on" : ""}" title="${esc(t("streakDays"))}">🔥 ${store.streak}</span>
        <span class="stat goal" title="${esc(t("dailyGoal"))}"><span class="ring" style="--p:${pct}"></span> ${today}/${goal}</span>
        ${syncIcon}
      </div>
    </header>
    <main class="screen">${inner}</main>
    <nav class="tabbar">${tabs.map(([id, href, ic, label, badge]) =>
      `<a href="${href}" class="tab ${active === id ? "active" : ""}"><span class="ic">${ic}${badge ? `<i class="badge">${badge > 99 ? "99+" : badge}</i>` : ""}</span><span>${esc(label)}</span></a>`).join("")}
    </nav>`;
}

// =====================================================================
//  ГЛАВНАЯ: путь по урокам
// =====================================================================
function recommendedUnit() {
  for (const l of LESSONS) for (const u of l.units) if (!store.p.units[u.id]?.plays) return u.id;
  let best = null, min = 2;
  for (const l of LESSONS) for (const u of l.units) { const m = store.unitMastery(u); if (m < min) { min = m; best = u.id; } }
  return best;
}

function screenLearn() {
  const rec = recommendedUnit();
  const due = store.dueWords().length;
  const html = LESSONS.map((l) => {
    const ids = new Set(l.units.flatMap((u) => u.list.map((w) => w.id)));
    const c = store.counts(ids);
    const drills = DRILLS.filter((d) => d.lesson === l.id);
    const sentRec = store.p.sents[l.id];
    return `
      <section class="lesson" id="lesson-${l.id}">
        <div class="lesson-head">
          <div class="lesson-num">${l.id}</div>
          <div class="lesson-title">
            <div class="sk">${esc(l.sk)}</div>
            <div class="tr">${esc(tr(l))}</div>
          </div>
          <div class="lesson-count">${c.learned}/${c.total}</div>
        </div>
        <div class="lesson-bar"><div style="width:${c.total ? (c.learned / c.total) * 100 : 0}%"></div></div>
        <div class="units">
          ${l.units.map((u) => {
            const m = store.unitMastery(u);
            const plays = store.p.units[u.id]?.plays || 0;
            return `<button class="unit ${u.id === rec ? "rec" : ""} ${m >= 0.99 ? "gold" : ""}" data-unit="${u.id}">
              <span class="unit-ring" style="--p:${Math.round(m * 100)}"><span class="unit-ic">${u.icon}</span></span>
              <span class="unit-name">${esc(tr(u))}</span>
              <span class="unit-sub">${u.list.length} ${esc(t("words"))}${plays ? ` · ${"★".repeat(Math.min(3, plays))}` : ""}</span>
              ${u.id === rec ? `<span class="rec-tag">${esc(t("recommended"))}</span>` : ""}
            </button>`;
          }).join("")}
        </div>
        <div class="extras">
          <a class="chip big" href="#/s/sent/${l.id}">💬 ${esc(t("sentences"))}${sentRec ? ` · ${sentRec.best}%` : ""}</a>
          ${drills.map((d) => {
            const r = store.p.drills[d.id];
            return `<a class="chip" href="#/s/drill/${d.id}">${d.icon} ${esc(tr(d.t))}${r ? ` · ${r.best}%` : ""}</a>`;
          }).join("")}
          ${l.id === 3 ? `<a class="chip big" href="#/verbs">📘 ${esc(t("verbsTitle"))}</a>` : ""}
          ${(BLITZ_BY_LESSON[l.id] || []).map((k) => `<a class="chip blitz" href="#/blitz/${k}">⚡ ${esc(t("blitz_" + k))}${store.p.drills["blitz-" + k] ? ` · ${store.p.drills["blitz-" + k].best}` : ""}</a>`).join("")}
          <a class="chip ghost" href="#/grammar/${l.id}">📄 ${esc(t("cheatsheet"))}</a>
        </div>
      </section>`;
  }).join("");

  app.innerHTML = frame("learn", `
    ${due ? `<a class="banner" href="#/review">🔁 ${esc(t("reviewDue"))}: <b>${due}</b> → </a>` : ""}
    ${!hasVoice() && !localGet("voiceNoteHidden") ? `<div class="note small">🔇 ${esc(t("noVoice"))} <button class="link hide-voice">✕</button></div>` : ""}
    ${html}`);

  app.querySelector(".hide-voice")?.addEventListener("click", () => { localSet("voiceNoteHidden", true); render(); });
  app.querySelectorAll(".unit").forEach((b) => (b.onclick = () => unitSheet(UNIT_BY_ID[b.dataset.unit])));
  maybeRemind();
  // прокрутить к рекомендуемой теме при первом открытии
  if (!screenLearn.scrolled) {
    screenLearn.scrolled = true;
    const el = app.querySelector(".unit.rec");
    if (el && el.getBoundingClientRect().top > innerHeight * 0.7) el.scrollIntoView({ block: "center" });
  }
}

function unitSheet(u) {
  const c = store.counts(new Set(u.list.map((w) => w.id)));
  const sheet = document.createElement("div");
  sheet.className = "sheet-wrap";
  sheet.innerHTML = `
    <div class="sheet">
      <div class="sheet-ic">${u.icon}</div>
      <h2>${esc(tr(u))}</h2>
      <div class="muted">${esc(u.sk)} · ${esc(t("lesson"))} ${u.lesson} · ${c.learned}/${c.total} ${esc(t("learned"))}</div>
      <div class="sheet-words">${u.list.slice(0, 40).map((w) => `<button class="wchip st-${store.status(w.id)}" data-say="${esc(w.sk)}">${esc(w.sk)}</button>`).join("")}</div>
      <a class="btn primary wide" href="#/s/unit/${u.id}">${esc(store.p.units[u.id]?.plays ? t("continue") : t("start"))}</a>
      <a class="btn wide" href="#/cards/${u.id}">🃏 ${esc(t("cards"))}</a>
      <button class="btn ghost wide sheet-close">${esc(t("close"))}</button>
    </div>`;
  document.body.appendChild(sheet);
  const close = () => sheet.remove();
  sheet.onclick = (e) => {
    const chip = e.target.closest("[data-say]");
    if (chip) return speak(chip.dataset.say); // нажал на слово — послушать
    if (e.target === sheet || e.target.classList.contains("sheet-close") || e.target.closest("a")) close();
  };
}

// =====================================================================
//  ПОВТОРЕНИЕ
// =====================================================================
function screenReview() {
  const due = store.dueWords();
  const weak = store.weakWords();
  const learned = weak.length;
  app.innerHTML = frame("review", `
    <h1>🔁 ${esc(t("reviewTitle"))}</h1>
    <p class="muted">${esc(t("reviewHint"))}</p>
    ${!learned ? `<div class="card center">${esc(t("noWordsYet"))}<br><br><a class="btn primary" href="#/">${esc(t("navLearn"))}</a></div>` : `
      <div class="card review-main">
        <div class="big-num">${due.length}</div>
        <div>${esc(t("reviewDue"))}</div>
        ${due.length ? `<a class="btn primary wide" href="#/s/review/due">${esc(t("reviewStart"))}</a>` : `<p class="muted">${esc(t("reviewNone"))}</p>`}
      </div>
      <div class="row2">
        <a class="card link-card" href="#/s/review/weak">💪 ${esc(t("reviewWeak"))}<small>${weak.slice(0, 4).map((w) => esc(w.sk)).join(", ")}</small></a>
        <a class="card link-card" href="#/s/review/all">📦 ${esc(t("reviewAll"))}<small>${learned} ${esc(t("words"))}</small></a>
      </div>
      <div class="boxes">${[1, 2, 3, 4, 5, 6, 7].map((b) => {
        const n = WORDS.filter((w) => store.word(w.id)?.b === b).length;
        return `<div class="box"><div class="box-bar" style="height:${Math.min(100, n * 2)}%"></div><b>${n}</b><small>${b}</small></div>`;
      }).join("")}</div>`}
  `);
}

// =====================================================================
//  СЛОВАРЬ
// =====================================================================
function screenDict() {
  const q = screenDict.q || "";
  const lf = screenDict.lesson || "0";
  const cat = screenDict.cat || "all";
  const extra = WORDS.filter((w) => w.lesson === 0);
  const extraLearned = extra.filter((w) => store.status(w.id) !== "new").length;
  app.innerHTML = frame("dict", `
    <h1>📚 ${esc(t("navDict"))}</h1>
    <div class="card vocab-hero">
      <div class="vh-top"><span class="vh-ic">🎲</span><div><b>${esc(t("vocabTitle"))}</b><small>${extra.length} ${esc(t("words"))} · ${esc(t("learned"))} ${extraLearned}</small></div></div>
      <p class="muted small">${esc(t("vocabSub"))}</p>
      <div class="vh-cats">
        <button class="chip ${cat === "all" ? "active" : ""}" data-cat="all">✨ ${esc(t("allCats"))}</button>
        ${EXTRA_UNITS.map((u) => `<button class="chip ${cat === u.id ? "active" : ""}" data-cat="${u.id}">${u.icon} ${esc(tr(u))}</button>`).join("")}
      </div>
      <a class="btn primary wide vh-go" href="#/rand/${cat}">🎲 ${esc(t("giveWords"))}</a>
    </div>
    <div class="dict-tools">
      <input class="search" type="search" placeholder="${esc(t("search"))}" value="${esc(q)}">
      <select class="lesson-filter">
        <option value="0">${esc(t("allLessons"))}</option>
        ${LESSONS.map((l) => `<option value="${l.id}" ${lf === String(l.id) ? "selected" : ""}>${esc(t("lesson"))} ${l.id}</option>`).join("")}
        <option value="x" ${lf === "x" ? "selected" : ""}>${esc(t("extraDict"))}</option>
      </select>
    </div>
    <div class="dict-list"></div>`);
  const list = app.querySelector(".dict-list");
  const draw = () => {
    const qq = screenDict.q.toLowerCase().trim();
    const plain = (x) => x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const f = screenDict.lesson;
    const items = WORDS.filter((w) => (f === "0" || (f === "x" ? w.lesson === 0 : w.lesson === +f)) &&
      (!qq || plain(w.sk).includes(plain(qq)) || trW(w).toLowerCase().includes(qq)));
    let lastUnit = null;
    list.innerHTML = items.slice(0, 400).map((w) => {
      const u = UNIT_BY_ID[w.unit];
      const where = u.lesson ? `${t("lesson")} ${u.lesson}` : t("extraShort");
      const head = w.unit !== lastUnit ? `<div class="dict-unit">${u.icon} ${esc(tr(u))} <small>· ${esc(where)}</small></div>` : "";
      lastUnit = w.unit;
      return `${head}<div class="dict-row">
        <button class="speak sm" data-say="${esc(w.sk)}">🔊</button>
        <div class="dict-sk">${esc(w.sk)}${w.fem ? ` <span class="muted">/ ${esc(w.fem)}</span>` : ""}${w.g ? ` <span class="g">${w.g === "pl" ? "pl." : w.g}</span>` : ""}</div>
        <div class="dict-tr">${esc(trW(w))}</div>
        <span class="dot st-${store.status(w.id)}" title="${esc(t("status" + { new: "New", learning: "Learning", known: "Known" }[store.status(w.id)]))}"></span>
      </div>`;
    }).join("") + (items.length > 400 ? `<p class="muted center small">+${items.length - 400}…</p>` : "") || `<p class="muted center">—</p>`;
  };
  screenDict.q = q; screenDict.lesson = lf;
  draw();
  app.querySelector(".search").oninput = (e) => { screenDict.q = e.target.value; draw(); };
  app.querySelector(".lesson-filter").onchange = (e) => { screenDict.lesson = e.target.value; draw(); };
  app.querySelectorAll(".vh-cats .chip").forEach((c) => (c.onclick = () => {
    screenDict.cat = c.dataset.cat;
    app.querySelectorAll(".vh-cats .chip").forEach((x) => x.classList.toggle("active", x === c));
    app.querySelector(".vh-go").href = `#/rand/${c.dataset.cat}`;
  }));
  list.onclick = (e) => { const bt = e.target.closest("[data-say]"); if (bt) speak(bt.dataset.say); };
}

// 10 случайных слов из доп. словаря: сначала те, что пора повторить, потом новые
function randomDeck(cat) {
  const pool = WORDS.filter((w) => w.lesson === 0 && (cat === "all" || w.unit === cat));
  const today = dayNum();
  const due = shuffle(pool.filter((w) => { const r = store.word(w.id); return r && r.b > 0 && r.due <= today; })).slice(0, 4);
  const fresh = shuffle(pool.filter((w) => !store.word(w.id)));
  const rest = shuffle(pool.filter((w) => store.word(w.id) && !due.includes(w)));
  return [...due, ...fresh, ...rest].slice(0, 10);
}
let lastDeck = [];

// =====================================================================
//  ГРАММАТИКА (шпаргалки + тренажёры)
// =====================================================================
function screenGrammar(openLesson) {
  const open = +openLesson || 0;
  app.innerHTML = frame("grammar", `
    <h1>🧩 ${esc(t("navGrammar"))}</h1>
    ${LESSONS.map((l) => `
      <details class="gram" id="g-${l.id}" ${open === l.id ? "open" : ""}>
        <summary><span class="lesson-num sm">${l.id}</span> ${esc(l.sk)}</summary>
        ${l.id === 3 ? `<a class="btn primary wide verbs-link" href="#/verbs">📘 ${esc(t("verbsTitle"))}</a>` : ""}
        <div class="gram-drills">${DRILLS.filter((d) => d.lesson === l.id).map((d) => {
          const r = store.p.drills[d.id];
          return `<a class="chip" href="#/s/drill/${d.id}">${d.icon} ${esc(tr(d.t))}${r ? ` · ${r.best}%` : ""}</a>`;
        }).join("")}</div>
        ${(CHEATSHEETS[l.id] || []).map((s) => `
          <div class="cs">
            <h3>${esc(tr(s.t))}</h3>
            ${s.note ? `<p class="muted">${esc(tr(s.note))}</p>` : ""}
            <div class="table-wrap"><table>${s.rows.map((r, i) => `<tr>${r.map((c) => (i === 0 ? `<th>${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join("")}</tr>`).join("")}</table></div>
          </div>`).join("")}
      </details>`).join("")}`);
  if (open) setTimeout(() => document.getElementById("g-" + open)?.scrollIntoView({ block: "start" }), 30);
}

// =====================================================================
//  ПРОФИЛЬ
// =====================================================================
function screenProfile() {
  const xp = store.xp;
  const lv = levelInfo(xp);
  const c = store.counts();
  const s = store.settings;
  const nick = cloud.user?.nick || store.p.nick || "";
  app.innerHTML = frame("profile", `
    <div class="profile-head">
      <div class="avatar">${nick ? esc([...nick][0].toUpperCase()) : "🙂"}</div>
      <div>
        <h1>${esc(nick || (getLang() === "en" ? "Guest" : "Гость"))}</h1>
        <div class="muted">${esc(t("level"))} ${lv.lvl}</div>
        <div class="lvl-bar"><div style="width:${Math.round(lv.frac * 100)}%"></div></div>
        <small class="muted">${xp - lv.from} / ${lv.to - lv.from} XP</small>
      </div>
    </div>

    <div class="stat-grid">
      <div class="card stat-card">🔥<b>${store.streak}</b><small>${esc(t("streakDays"))}</small></div>
      <div class="card stat-card">⭐<b>${xp}</b><small>${esc(t("totalXp"))}</small></div>
      <div class="card stat-card">📗<b>${c.learned}</b><small>${esc(t("wordsLearned"))}</small></div>
      <div class="card stat-card">💎<b>${c.known}</b><small>${esc(t("wordsMastered"))}</small></div>
    </div>

    <h2>${esc(t("activity"))}</h2>
    <div class="card">${heatmap()}</div>

    <h2>${esc(t("account"))}</h2>
    <div class="card account">${accountBlock()}</div>

    ${cloud.user ? `<h2>${esc(t("leaderboard"))}</h2><div class="card lb"><div class="lb-tabs"><button class="chip lb-week active">${esc(t("thisWeek"))}</button><button class="chip lb-all">${esc(t("allTime"))}</button></div><div class="lb-list muted">…</div></div>` : ""}

    <h2>${esc(t("achievements"))}</h2>
    <div class="ach-grid">${ACHIEVEMENTS.map(([id, ic, ru, en, dru, den]) => {
      const got = store.p.ach[id];
      return `<div class="ach ${got ? "got" : ""}" title="${esc(getLang() === "en" ? den : dru)}"><span>${ic}</span><b>${esc(getLang() === "en" ? en : ru)}</b><small>${esc(getLang() === "en" ? den : dru)}</small></div>`;
    }).join("")}</div>

    <h2>${esc(t("settings"))}</h2>
    <div class="card settings">
      <label>${esc(t("uiLang"))}
        <select class="set-lang"><option value="ru" ${s.lang === "ru" ? "selected" : ""}>Русский</option><option value="en" ${s.lang === "en" ? "selected" : ""}>English</option></select>
      </label>
      <label>${esc(t("dailyGoal"))}
        <select class="set-goal">${GOALS.map((g, i) => `<option value="${g}" ${s.goal === g ? "selected" : ""}>${g} XP — ${esc(t(["goalEasy", "goalNormal", "goalHard"][i]))}</option>`).join("")}</select>
      </label>
      <label class="check"><input type="checkbox" class="set-sound" ${s.sound ? "checked" : ""}> ${esc(t("sound"))}</label>
      <label class="check"><input type="checkbox" class="set-auto" ${s.autoplay ? "checked" : ""}> ${esc(t("autoplay"))}</label>
      <label>${esc(t("theme"))}
        <select class="set-theme">${["auto", "light", "dark"].map((v) => `<option value="${v}" ${s.theme === v ? "selected" : ""}>${esc(t("theme_" + v))}</option>`).join("")}</select>
      </label>
      <label class="check"><input type="checkbox" class="set-remind" ${s.remind ? "checked" : ""}> ${esc(t("remindSetting"))}</label>
      <label class="check"><input type="checkbox" class="set-notify" ${s.notify ? "checked" : ""}> ${esc(t("notifySetting"))}</label>
      <p class="muted small">${esc(t("notifyHint"))}</p>
      ${!hasVoice() ? `<p class="muted small">🔇 ${esc(t("noVoice"))}</p>` : ""}
    </div>

    <h2>${esc(t("backup"))}</h2>
    <div class="card">
      <button class="btn wide do-export">⬇️ ${esc(t("exportBtn"))}</button>
      <label class="btn wide">⬆️ ${esc(t("importBtn"))}<input type="file" accept=".json,application/json" class="do-import" hidden></label>
    </div>
    <h2>ℹ️</h2>
    <div class="card">
      <a class="btn wide" href="#/help">📖 ${esc(t("help"))}</a>
      <button class="btn wide do-share">📤 ${esc(t("share"))}</button>
      <a class="btn ghost wide" href="${reportUrl()}" target="_blank" rel="noopener">🐞 ${esc(t("report"))}</a>
      <p class="muted small">${esc(t("about"))}</p>
    </div>
    <p class="muted small center">${esc(t("installApp"))}</p>
  `);

  app.querySelector(".set-lang").onchange = (e) => { store.setSetting("lang", e.target.value); setLang(e.target.value); render(); };
  app.querySelector(".set-goal").onchange = (e) => { store.setSetting("goal", +e.target.value); render(); };
  app.querySelector(".set-sound").onchange = (e) => store.setSetting("sound", e.target.checked);
  app.querySelector(".set-auto").onchange = (e) => store.setSetting("autoplay", e.target.checked);
  app.querySelector(".set-theme").onchange = (e) => { store.setSetting("theme", e.target.value); applyTheme(); };
  app.querySelector(".set-remind").onchange = (e) => store.setSetting("remind", e.target.checked);
  app.querySelector(".set-notify").onchange = (e) => enableNotifications(e.target.checked);
  app.querySelector(".do-export").onclick = exportProgress;
  app.querySelector(".do-share").onclick = shareSite;
  app.querySelector(".do-import").onchange = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try { await importProgress(f); toast(t("importDone")); render(); } catch (err) { toast(t("importBad")); }
  };
  app.querySelector(".do-logout")?.addEventListener("click", async () => { await logout(); go("#/"); });

  if (cloud.user) {
    let rows = null, mode = "week";
    const draw = () => {
      const el = app.querySelector(".lb-list");
      if (!el || !rows) return;
      const list = [...rows].sort((a, b) => (mode === "week" ? b.weekXp - a.weekXp : b.xp - a.xp)).filter((r) => (mode === "week" ? r.weekXp > 0 : r.xp > 0)).slice(0, 50);
      el.classList.remove("muted");
      el.innerHTML = list.map((r, i) => `<div class="lb-row ${r.uid === cloud.user.uid ? "me" : ""}"><span class="lb-pos">${["🥇", "🥈", "🥉"][i] || i + 1}</span><span class="lb-nick">${esc(r.nick)}</span><span class="lb-streak">🔥${r.streak}</span><b>${mode === "week" ? r.weekXp : r.xp} XP</b></div>`).join("") || "—";
    };
    fetchLeaderboard().then((r) => { rows = r; draw(); }).catch(() => { const el = app.querySelector(".lb-list"); if (el) el.textContent = t("syncError"); });
    app.querySelector(".lb-week").onclick = (e) => { mode = "week"; e.target.classList.add("active"); app.querySelector(".lb-all").classList.remove("active"); draw(); };
    app.querySelector(".lb-all").onclick = (e) => { mode = "all"; e.target.classList.add("active"); app.querySelector(".lb-week").classList.remove("active"); draw(); };
  }
}


const HELP = {
  ru: [
    ["🏠", "Учиться", "Каждый урок учебника разбит на темы. Нажми на тему → «Начать». Одно занятие — 3–5 минут: новые слова, выбор перевода, пары, ввод с клавиатуры, задания на слух. Ошибки повторяются в конце."],
    ["⭐", "Кольцо вокруг темы", "Зелёное кольцо — насколько хорошо ты знаешь тему, золотое — тема выучена. Лучше проходить тему несколько дней подряд, чем 5 раз за вечер: так слова запоминаются надолго."],
    ["🔁", "Повторение", "Каждое слово возвращается через 1, 2, 4, 7, 15, 30 дней. Красный кружок на вкладке — сколько слов пора повторить. Хватит 5 минут в день."],
    ["🧩", "Грамматика", "Под каждым уроком — тренажёры (byť, род, падежи, времена…) и «Шпаргалка» с таблицами. «Предложения» — собери фразу из слов."],
    ["🎲", "Новые слова", "Вкладка «Слова» → «Дай слова!»: 10 карточек из ~600 частотных слов вне учебника. Потом можно закрепить квизом."],
    ["🕐", "Часы и блиц", "В уроке 3 — часы с циферблатом и «📘 Окончания глаголов». «⚡ Блиц» — 60 секунд на скорость, побей свой рекорд."],
    ["🧠", "Напоминание", "Раз в 2 дня сайт предложит проверить слова, которые ты давно не видел. Выключается в профиле."],
    ["⌨️", "Ввод", "Под полем есть кнопки á ä č ď ľ ô š ť ž… Если забыл диакритику, ответ засчитается, но ты увидишь правильное написание. На ПК: Enter — проверить, цифры 1–4 — выбрать вариант."],
    ["🔊", "Озвучка", "Работает, если в устройстве есть словацкий голос: обычно в Chrome на Android и в Edge на ПК. Если голоса нет — задания на слух просто пропускаются."],
    ["☁️", "Прогресс", "Создай аккаунт (ник + пароль) — прогресс сохранится в облаке, можно учиться с телефона и компьютера. Значок ☁️✓ сверху — всё сохранено. Запомни пароль: по нику его не восстановить."],
    ["📱", "Как приложение", "Android/Chrome: меню ⋮ → «Добавить на главный экран». iPhone/Safari: «Поделиться» → «На экран Домой»."],
    ["🐞", "Нашёл ошибку", "Если перевод или задание неправильные — нажми «⚑ Ошибка в задании?» после ответа или «Сообщить об ошибке» в профиле."],
  ],
  en: [
    ["🏠", "Learn", "Each textbook lesson is split into topics. Tap a topic → Start. A session takes 3–5 minutes: new words, multiple choice, pairs, typing, listening. Mistakes come back at the end."],
    ["⭐", "Topic ring", "The green ring shows how well you know a topic; gold means mastered. Practise over several days rather than many times in one evening."],
    ["🔁", "Review", "Every word comes back after 1, 2, 4, 7, 15, 30 days. The red badge shows how many words are due. 5 minutes a day is enough."],
    ["🧩", "Grammar", "Under each lesson: grammar drills and a cheat sheet with tables. 'Sentences' — build a phrase from tiles."],
    ["🎲", "New words", "Words tab → 'Give me words!': 10 cards from ~600 common words beyond the textbook, then a quiz."],
    ["🕐", "Clock & blitz", "Lesson 3 has a real clock and the 'Verb endings' guide. '⚡ Blitz' — 60 seconds against your record."],
    ["🧠", "Reminder", "Every 2 days you'll be offered a check of words you haven't seen for a while. Can be turned off in Profile."],
    ["⌨️", "Typing", "Use the á ä č ď ľ ô š ť ž buttons. Missing accents still count, but you'll see the correct spelling. On PC: Enter checks, keys 1–4 pick an option."],
    ["🔊", "Voice", "Works if your device has a Slovak voice (usually Chrome on Android, Edge on PC). Without it, listening tasks are skipped."],
    ["☁️", "Progress", "Create an account (nickname + password) to save progress in the cloud and use several devices. ☁️✓ at the top means saved. Remember your password: it can't be recovered for nicknames."],
    ["📱", "Install", "Android/Chrome: menu ⋮ → Add to Home screen. iPhone/Safari: Share → Add to Home Screen."],
    ["🐞", "Found a mistake", "Tap '⚑ Mistake in this task?' after an answer or 'Report a mistake' in your profile."],
  ],
};
const REPO = "https://github.com/Furigin/slovencina-a1";
function reportUrl(context = "") {
  const title = context ? `Ошибка: ${context}` : "Ошибка на сайте";
  return `${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent("Что не так и как правильно:\n\n")}`;
}

function screenHelp() {
  const items = HELP[getLang() === "en" ? "en" : "ru"];
  app.innerHTML = frame("profile", `
    <h1>📖 ${esc(t("help"))}</h1>
    ${items.map(([ic, h, txt]) => `<div class="card help-item"><span class="help-ic">${ic}</span><div><b>${esc(h)}</b><p>${esc(txt)}</p></div></div>`).join("")}
    <p class="muted small">${esc(t("about"))}</p>
    <a class="btn primary wide" href="#/">${esc(t("helpBack"))}</a>`);
}

async function shareSite() {
  const url = "https://furigin.github.io/slovencina-a1/";
  try {
    if (navigator.share) { await navigator.share({ title: "Slovenčina A1", text: t("shareText"), url }); return; }
    await navigator.clipboard.writeText(url);
    toast(t("linkCopied"));
  } catch (e) { /* пользователь закрыл окно */ }
}

function accountBlock() {
  if (!cloud.enabled) return `<p>⚠️ ${esc(t("cloudOff"))}</p>`;
  if (!cloud.user) return `<p>⚠️ ${esc(t("guestMode"))}</p><a class="btn primary wide" href="#/login">${esc(t("login"))} / ${esc(t("register"))}</a>`;
  const st = cloud.status === "error" ? `⚠️ ${t("syncError")}` : cloud.status === "saving" ? `⏳ ${t("syncing")}` : `✅ ${t("synced")}`;
  return `<p>${esc(t("loggedAs"))} <b>${esc(cloud.user.nick)}</b></p><p class="muted">${esc(st)}</p><button class="btn ghost wide do-logout">${esc(t("logout"))}</button>`;
}

function heatmap() {
  const goal = store.settings.goal;
  const days = [];
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) - 7 * 11); // 12 недель, с понедельника
  for (let i = 0; i < 84; i++) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
  const today = dayKey();
  const names = t("dayNames").split(" ");
  // 7 строк (дни недели) × 12 столбцов (недели)
  return `<div class="heat-wrap"><div class="heat-names">${names.map((n) => `<small>${n}</small>`).join("")}</div>
    <div class="heat-grid">${days.map((day) => {
      const k = dayKey(day), x = store.p.days[k] || 0;
      const lvl = !x ? 0 : x < goal / 2 ? 1 : x < goal ? 2 : 3;
      return `<span class="hd l${lvl} ${k === today ? "today" : ""} ${k > today ? "future" : ""}" title="${k}: ${x} XP"></span>`;
    }).join("")}</div></div>`;
}

// =====================================================================
//  ВХОД / РЕГИСТРАЦИЯ
// =====================================================================
function screenLogin() {
  if (!cloud.enabled) { go("#/profile"); return; }
  if (cloud.user) { go("#/profile"); return; }
  let mode = screenLogin.mode || "register";
  app.innerHTML = `
    <div class="auth">
      <a href="#/" class="icon-btn back">←</a>
      <img class="auth-logo" src="icons/icon.svg" alt="">
      <div class="seg"><button class="seg-reg ${mode === "register" ? "active" : ""}">${esc(t("register"))}</button><button class="seg-log ${mode === "login" ? "active" : ""}">${esc(t("login"))}</button></div>
      <form class="auth-form">
        <input name="nick" autocomplete="username" placeholder="${esc(t("nickOrEmail"))}" required>
        <input name="pass" type="password" autocomplete="${mode === "register" ? "new-password" : "current-password"}" placeholder="${esc(t("password"))}" required minlength="6">
        ${mode === "register" ? `<input name="pass2" type="password" autocomplete="new-password" placeholder="${esc(t("password2"))}" required minlength="6">` : ""}
        <div class="auth-err"></div>
        <button class="btn primary wide" type="submit">${esc(mode === "register" ? t("register") : t("login"))}</button>
        ${mode === "login" ? `<button class="link forgot" type="button">${esc(t("forgot"))}</button>` : ""}
        <p class="muted small">${esc(t("loginHint"))}</p>
      </form>
    </div>`;
  app.querySelector(".seg-reg").onclick = () => { screenLogin.mode = "register"; screenLogin(); };
  app.querySelector(".seg-log").onclick = () => { screenLogin.mode = "login"; screenLogin(); };
  const form = app.querySelector(".auth-form");
  const err = app.querySelector(".auth-err");
  app.querySelector(".forgot")?.addEventListener("click", async () => {
    const nick = form.nick.value.trim();
    if (!nick.includes("@")) { err.textContent = t("resetNick"); return; }
    try { await resetPassword(nick); err.textContent = t("resetSent"); } catch (e) { err.textContent = t(authErrorKey(e)); }
  });
  form.onsubmit = async (e) => {
    e.preventDefault();
    err.textContent = "";
    const nick = form.nick.value.trim(), pass = form.pass.value;
    if (!validNick(nick)) { err.textContent = t("badNick"); return; }
    if (mode === "register" && pass !== form.pass2.value) { err.textContent = t("passMismatch"); return; }
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "…";
    try {
      if (mode === "register") await register(nick, pass); else await login(nick, pass);
      // дальше onAuthStateChanged в cloud.js загрузит прогресс
      const stop = cloud.on(() => {
        if (cloud.user) { stop(); if (takeGuestMergedFlag()) toast(t("mergedGuest")); go("#/"); }
      });
    } catch (ex) {
      err.textContent = t(authErrorKey(ex));
      btn.disabled = false; btn.textContent = mode === "register" ? t("register") : t("login");
    }
  };
}

// =====================================================================
//  ПЕРВЫЙ ЗАПУСК
// =====================================================================
function screenWelcome() {
  const s = store.settings;
  app.innerHTML = `
    <div class="welcome">
      <img class="welcome-flag" src="icons/icon.svg" alt="">
      <h1>${esc(t("welcomeTitle"))}</h1>
      <p>${esc(t("welcomeText"))}</p>
      <div class="seg lang-seg"><button data-l="ru" class="${getLang() === "ru" ? "active" : ""}">Русский</button><button data-l="en" class="${getLang() === "en" ? "active" : ""}">English</button></div>
      <h3>${esc(t("chooseGoal"))}</h3>
      <div class="goals">${GOALS.map((g, i) => `<button class="goal-btn ${s.goal === g ? "active" : ""}" data-g="${g}"><b>${esc(t(["goalEasy", "goalNormal", "goalHard"][i]))}</b><small>${g} XP</small></button>`).join("")}</div>
      ${cloud.enabled ? `<p class="muted">${esc(t("welcomeAccount"))}</p><a class="btn primary wide w-reg" href="#/login">${esc(t("register"))}</a>` : ""}
      <button class="btn ${cloud.enabled ? "ghost" : "primary"} wide w-guest">${esc(cloud.enabled ? t("welcomeGuest") : t("start"))}</button>
      <a class="link w-help" href="#/help">📖 ${esc(t("help"))}</a>
    </div>`;
  app.querySelectorAll(".lang-seg button").forEach((b) => (b.onclick = () => { s.lang = b.dataset.l; setLang(b.dataset.l); store.save(); screenWelcome(); }));
  app.querySelectorAll(".goal-btn").forEach((b) => (b.onclick = () => { s.goal = +b.dataset.g; store.save(); screenWelcome(); }));
  const done = () => { s.welcomed = true; store.save(); localSet("welcomed", true); };
  app.querySelector(".w-reg")?.addEventListener("click", () => { done(); screenLogin.mode = "register"; });
  app.querySelector(".w-help").addEventListener("click", done);
  app.querySelector(".w-guest").onclick = () => { done(); render(); };
}

// =====================================================================
//  КАРТОЧКИ
// =====================================================================
function screenCards(unitId) {
  const u = UNIT_BY_ID[unitId];
  if (!u) return go("#/");
  runCards([...u.list], { id: u.id, title: `${u.icon} ${tr(u)}`, back: "#/" });
}
function screenRandom(cat) {
  const deck = randomDeck(cat || "all");
  if (!deck.length) return go("#/dict");
  const u = UNIT_BY_ID[cat];
  runCards(deck, { id: "rand", title: u ? `${u.icon} ${tr(u)}` : `🎲 ${t("vocabTitle")}`, back: "#/dict", quiz: true });
}

// Карточки: перевернуть → «Знаю» / «Ещё учу». Незнакомые возвращаются в конец.
function runCards(deck, { id, title, back, quiz = false }) {
  const original = [...deck];
  let i = 0, flipped = false, ok = 0, total = 0;
  const draw = () => {
    if (i >= deck.length) {
      const xpBefore = store.xp;
      const res = store.finishSession("cards", id, { correct: ok, total, mistakes: total - ok });
      lastDeck = original;
      app.innerHTML = resultHtml({ ...res, correct: ok, total }, title, xpBefore);
      if (quiz && original.length >= 4) {
        const btn = document.createElement("a");
        btn.className = "btn wide";
        btn.href = "#/s/quiz/last";
        btn.textContent = "🎯 " + t("quizIt");
        app.querySelector(".res-next").before(btn);
      }
      app.querySelector(".res-next").onclick = () => go(back);
      celebrate(res, xpBefore);
      return;
    }
    const w = deck[i];
    const u = UNIT_BY_ID[w.unit];
    app.innerHTML = `
      <div class="session">
        <div class="s-top"><a class="icon-btn" href="${back}">✕</a><div class="bar"><div class="bar-fill" style="width:${(i / deck.length) * 100}%"></div></div><span class="muted">${i + 1}/${deck.length}</span></div>
        <div class="s-body">
          <div class="flash ${flipped ? "flipped" : ""}">
            <div class="flash-inner">
              <div class="flash-face front"><small class="muted">${u.icon} ${esc(tr(u))}</small><div class="intro-sk">${esc(w.sk)}</div>${w.fem ? `<div class="intro-fem">♀ ${esc(w.fem)}</div>` : ""}<small class="muted">${esc(t("flip"))}</small></div>
              <div class="flash-face back"><div class="intro-tr">${esc(trW(w))}</div><div class="intro-sk sm">${esc(w.sk)}</div>${w.g ? `<div class="intro-g">${genderLabel(w.g)}</div>` : ""}</div>
            </div>
          </div>
          <button class="speak big c-say">🔊</button>
        </div>
        <div class="s-foot"><div class="s-actions">
          <button class="btn bad c-no" ${flipped ? "" : "disabled"}>${esc(t("dontKnow"))}</button>
          <button class="btn primary c-yes" ${flipped ? "" : "disabled"}>${esc(t("know"))}</button>
        </div></div>
      </div>`;
    app.querySelector(".flash").onclick = () => { flipped = !flipped; if (store.settings.sound) sfx("tap"); draw(); };
    app.querySelector(".c-say").onclick = () => speak(w.sk);
    if (!flipped && store.settings.autoplay) speak(w.sk);
    const answer = (good) => {
      if (!store.word(w.id)) store.introduce(w.id);
      store.grade(w.id, good);
      if (store.settings.sound) sfx(good ? "ok" : "bad");
      total++; if (good) ok++; else deck.push(w);
      if (deck.length > original.length * 2) deck.length = original.length * 2;
      i++; flipped = false; draw();
    };
    app.querySelector(".c-yes").onclick = () => answer(true);
    app.querySelector(".c-no").onclick = () => answer(false);
  };
  draw();
}

// =====================================================================
//  ЗАНЯТИЕ И РЕЗУЛЬТАТ
// =====================================================================
function startSession(kind, id) {
  let s = null;
  if (kind === "unit" && UNIT_BY_ID[id]) s = buildUnitSession(UNIT_BY_ID[id]);
  if (kind === "drill") { const d = DRILLS.find((x) => x.id === id); if (d) s = buildDrillSession(d); }
  if (kind === "sent") { const l = LESSONS.find((x) => x.id === +id); if (l) s = buildSentenceSession(l); }
  if (kind === "review") {
    const words = id === "weak" ? store.weakWords().slice(0, 15)
      : id === "all" ? [...store.weakWords()].sort(() => Math.random() - 0.5)
      : id === "old" ? store.oldWords().slice(0, 12)
      : store.dueWords();
    if (!words.length) return go("#/review");
    s = buildReviewSession(words);
  }
  if (kind === "quiz") {
    if (!lastDeck.length) return go("#/dict");
    s = buildReviewSession(lastDeck);
    s.title = `🎯 ${t("quizIt")}`;
  }
  if (!s || !s.items.length) return go("#/");
  const back = kind === "review" ? "#/review" : kind === "quiz" ? "#/dict" : "#/";
  const xpBefore = store.xp;
  runSession(app, s, (res) => {
    if (!res) return go(back);
    if (kind === "review" && id === "old") { store.p.lastCheck = Date.now(); store.save(); }
    app.innerHTML = resultHtml(res, s.title, xpBefore);
    app.querySelector(".res-next").onclick = () => go(back);
    app.querySelector(".res-next").focus();
    celebrate(res, xpBefore);
  });
}

function resultHtml(res, title, xpBefore = store.xp) {
  const goal = store.settings.goal;
  const lvlUp = levelInfo(store.xp).lvl > levelInfo(xpBefore).lvl;
  const goalHit = store.todayXp >= goal && store.todayXp - res.xp < goal;
  return `
    <div class="result">
      <div class="res-ic">${res.perfect ? "💎" : res.pct >= 70 ? "🎉" : "💪"}</div>
      <h1>${esc(t("sessionDone"))}</h1>
      <div class="muted">${esc(title)}</div>
      <div class="res-stats">
        <div class="res-box xp"><small>${esc(t("xpEarned"))}</small><b>+${res.xp}</b></div>
        <div class="res-box acc"><small>${esc(t("accuracy"))}</small><b>${res.pct}%</b></div>
        <div class="res-box st"><small>${esc(t("streakDays"))}</small><b>🔥 ${store.streak}</b></div>
      </div>
      ${res.perfect ? `<p class="good">${esc(t("perfect"))}</p>` : ""}
      ${res.bestCombo >= 3 ? `<p class="good">🔥 ${esc(t("bestCombo"))}: ${res.bestCombo}</p>` : ""}
      ${lvlUp ? `<div class="lvl-up">⭐ ${esc(t("levelUp"))} ${levelInfo(store.xp).lvl}!</div>` : ""}
      ${goalHit ? `<p class="good">🎯 ${esc(t("goalDone"))}</p>` : ""}
      ${(res.newAch || []).map((id) => { const a = ACHIEVEMENTS.find((x) => x[0] === id); return a ? `<div class="ach got new"><span>${a[1]}</span><b>${esc(getLang() === "en" ? a[3] : a[2])}</b></div>` : ""; }).join("")}
      <button class="btn primary wide res-next">${esc(t("continue"))}</button>
    </div>`;
}

// праздник в конце занятия: звук, конфетти
function celebrate(res, xpBefore) {
  const lvlUp = levelInfo(store.xp).lvl > levelInfo(xpBefore).lvl;
  if (store.settings.sound) sfx(lvlUp ? "level" : res.pct >= 50 ? "finish" : "tap");
  if (res.pct >= 70 || lvlUp) confetti();
}
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.className = "confetti";
  c.width = innerWidth; c.height = innerHeight;
  document.body.appendChild(c);
  const g = c.getContext("2d");
  const colors = ["#0b4ea2", "#ee1c25", "#ffffff", "#ffb800", "#58cc02"];
  const parts = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
    s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
    col: colors[Math.floor(Math.random() * colors.length)],
  }));
  const t0 = performance.now();
  const frameFn = (now) => {
    g.clearRect(0, 0, c.width, c.height);
    for (const p of parts) {
      p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.col;
      g.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.66); g.restore();
    }
    if (now - t0 < 2200) requestAnimationFrame(frameFn); else c.remove();
  };
  requestAnimationFrame(frameFn);
}

// =====================================================================
//  НАПОМИНАНИЕ «Проверь свои знания» (раз в 2 дня)
// =====================================================================
const DAY = 86400000;
function maybeRemind() {
  if (!store.settings.remind || document.querySelector(".sheet-wrap")) return;
  const old = store.oldWords();
  if (old.length < 8) return;                                  // мало выученных слов
  if (Date.now() - (store.p.lastCheck || 0) < 2 * DAY) return; // уже проверял недавно
  if (Date.now() - (store.word(old[0].id).t || 0) < DAY) return; // все слова свежие
  const sheet = document.createElement("div");
  sheet.className = "sheet-wrap";
  sheet.innerHTML = `
    <div class="sheet remind">
      <div class="sheet-ic">🧠</div>
      <h2>${esc(t("remindTitle"))}</h2>
      <p class="muted">${esc(t("remindText"))}</p>
      <div class="sheet-words">${old.slice(0, 8).map((w) => `<span class="wchip">${esc(w.sk)}</span>`).join("")}</div>
      <a class="btn primary wide r-go" href="#/s/review/old">${esc(t("remindGo"))}</a>
      <button class="btn ghost wide r-later">${esc(t("remindLater"))}</button>
    </div>`;
  document.body.appendChild(sheet);
  if (store.settings.sound) sfx("tap");
  sheet.querySelector(".r-go").onclick = () => sheet.remove();
  sheet.querySelector(".r-later").onclick = () => {
    store.p.lastCheck = Date.now() - DAY; // напомнить завтра
    store.save();
    sheet.remove();
  };
}

// системные уведомления (Chrome на Android, сайт установлен как приложение)
async function enableNotifications(on) {
  store.setSetting("notify", on);
  if (!on) {
    try { const reg = await navigator.serviceWorker?.ready; await reg?.periodicSync?.unregister("check-knowledge"); } catch (e) { /* */ }
    return;
  }
  if (!("Notification" in window) || !("serviceWorker" in navigator)) { toast(t("notifyUnsupported")); return; }
  const perm = await Notification.requestPermission();
  if (perm !== "granted") { toast(t("notifyDenied")); store.setSetting("notify", false); return; }
  try {
    const reg = await navigator.serviceWorker.ready;
    if (!reg.periodicSync) throw new Error("no periodicSync");
    const st = await navigator.permissions.query({ name: "periodic-background-sync" });
    if (st.state !== "granted") throw new Error("not granted");
    await reg.periodicSync.register("check-knowledge", { minInterval: 2 * DAY });
    reg.showNotification("Slovenčina A1", { body: t("notifyOn"), icon: "icons/icon-192.png", tag: "test" });
  } catch (e) {
    toast(t("notifyUnsupported"));
  }
}

// =====================================================================
//  ОКОНЧАНИЯ ГЛАГОЛОВ — объяснение по шагам (урок 3)
// =====================================================================
const VERB_STEPS = {
  ru: [
    ["1", "Окончание показывает, КТО делает", "Как в русском: читаю, читаешь, читает. В словацком тоже по окончанию видно, кто делает действие, поэтому местоимение часто не говорят: «Čítam knihu» = «(Я) читаю книгу»."],
    ["2", "Шесть окончаний — запомни один раз", "ja → -m, ty → -š, on/ona → без окончания, my → -me, vy → -te, oni → -jú / -ia / -ú. Они одинаковые почти для всех глаголов! Меняется только гласная перед ними."],
    ["3", "Три типа глаголов", "A-тип: на -ať → гласная á/a: čítam, hrám. «oni» → -ajú.\nI-тип: на -iť, -ieť (и spať, stáť) → гласная í: robím, sedím. «oni» → -ia.\nE-тип: на -ovať → -ujem (študujem); и другие: píšem, pijem, zabudnem. «oni» → -ú/-jú."],
    ["4", "Как узнать тип?", "Посмотри на форму «ja» в словаре или в учебнике: -ám/-am → A, -ím → I, -em → E. Дальше всё по таблице. Глаголы на -ovať всегда E: pracovať → pracujem."],
    ["5", "Отрицание — слитно с ne-", "čítam → nečítam, robíme → nerobíme. Исключение: byť → nie som, nie si, nie je…"],
    ["6", "Особые глаголы", "byť (som, si, je…), mať (mám… majú), jesť (jem… jedia), ísť (idem… idú), vedieť (viem… vedia) — их просто выучи, они очень частые."],
  ],
  en: [
    ["1", "The ending shows WHO does it", "The verb ending tells you the person, so the pronoun is often dropped: 'Čítam knihu' = '(I) read a book'."],
    ["2", "Six endings — learn them once", "ja → -m, ty → -š, on/ona → no ending, my → -me, vy → -te, oni → -jú / -ia / -ú. Almost all verbs use them; only the vowel before them changes."],
    ["3", "Three verb types", "A-type: -ať → á/a: čítam, hrám; oni → -ajú.\nI-type: -iť, -ieť (and spať, stáť) → í: robím, sedím; oni → -ia.\nE-type: -ovať → -ujem (študujem), also píšem, pijem, zabudnem; oni → -ú/-jú."],
    ["4", "How to tell the type?", "Look at the 'ja' form: -ám/-am → A, -ím → I, -em → E. Verbs in -ovať are always E: pracovať → pracujem."],
    ["5", "Negation: ne- joined", "čítam → nečítam. Exception: byť → nie som, nie si, nie je…"],
    ["6", "Special verbs", "byť, mať, jesť, ísť, vedieť — just memorise them, they're very common."],
  ],
};
const PERSON_ROWS = [["ja", "-m", "я"], ["ty", "-š", "ты"], ["on, ona, ono", "—", "он, она"], ["my", "-me", "мы"], ["vy", "-te", "вы"], ["oni, ony", "-jú / -ia / -ú", "они"]];

function screenVerbs() {
  const steps = VERB_STEPS[getLang() === "en" ? "en" : "ru"];
  const verbs = Object.keys(PRESENT).sort((x, y) => x.localeCompare(y, "sk"));
  const cur = screenVerbs.verb || "čítať";
  app.innerHTML = frame("grammar", `
    <a class="link" href="#/grammar/3">← ${esc(t("navGrammar"))}</a>
    <h1>📘 ${esc(t("verbsTitle"))}</h1>
    <div class="card endings">
      <div class="table-wrap"><table>
        <tr><th></th><th>${esc(t("ending"))}</th><th>A: čítať</th><th>I: robiť</th><th>E: písať</th><th>-ovať</th></tr>
        ${PERSON_ROWS.map(([p, e], i) => `<tr class="p${i}"><th>${p}</th><td><b class="end">${e}</b></td>${["čítať", "robiť", "písať", "študovať"].map((v) => { const f = PRESENT[v].split(" "); const st = commonPrefix(f); return `<td>${esc(st)}<b class="end">${esc(f[i].slice(st.length))}</b></td>`; }).join("")}</tr>`).join("")}
      </table></div>
    </div>
    ${steps.map(([n, h, txt]) => `<div class="card step"><span class="step-n">${n}</span><div><b>${esc(h)}</b><p>${esc(txt).replace(/\n/g, "<br>")}</p></div></div>`).join("")}
    <h2>🔍 ${esc(t("tryVerb"))}</h2>
    <div class="card">
      <select class="verb-pick">${verbs.map((v) => `<option ${v === cur ? "selected" : ""}>${v}</option>`).join("")}</select>
      <div class="conj"></div>
    </div>
    <h2>🎯 ${esc(t("practice"))}</h2>
    <div class="extras">
      <a class="chip big" href="#/s/drill/who">🙋 ${esc(t("drillWho"))}</a>
      <a class="chip big" href="#/s/drill/ending">🧩 ${esc(t("drillEnding"))}</a>
      <a class="chip big" href="#/s/drill/present">⚙️ ${esc(t("drillPresent"))}</a>
      <a class="chip blitz" href="#/blitz/verbs">⚡ ${esc(t("blitz_verbs"))}</a>
    </div>`);
  const drawConj = (v) => {
    const f = PRESENT[v].split(" ");
    const st = commonPrefix(f);
    const w = WORDS.find((x) => x.sk === v);
    app.querySelector(".conj").innerHTML = `
      <div class="conj-head"><button class="speak sm" data-say="${esc(v)}">🔊</button> <b>${esc(v)}</b> <span class="muted">${w ? esc(trW(w)) : ""}</span></div>
      ${f.map((form, i) => `<div class="conj-row p${i}"><span class="conj-p">${PERSON_ROWS[i][0]}</span><span>${esc(st)}<b class="end">${esc(form.slice(st.length))}</b></span><button class="speak sm" data-say="${esc(form)}">🔊</button></div>`).join("")}`;
  };
  drawConj(cur);
  app.querySelector(".verb-pick").onchange = (e) => { screenVerbs.verb = e.target.value; drawConj(e.target.value); };
  app.onclick = (e) => { const bt = e.target.closest("[data-say]"); if (bt && app.querySelector(".conj")) speak(bt.dataset.say); };
}

// =====================================================================
//  БЛИЦ: 60 секунд, сколько успеешь ответить
// =====================================================================
const BLITZ_BY_LESSON = { 2: ["num"], 3: ["clock", "verbs"] };
function blitzQuestion(kind) {
  if (kind === "num") {
    const n = Math.random() < 0.7 ? Math.floor(Math.random() * 101) : Math.floor(Math.random() * 1001);
    const near = [...new Set([n + 1, n - 1, n + 10, n - 10, n + 2, n + 11, n + 100].filter((x) => x >= 0 && x <= 1000 && x !== n))];
    const wrong = shuffle(near).slice(0, 3);
    if (Math.random() < 0.5) return { html: `<div class="blitz-q">${n}</div>`, options: shuffle([n, ...wrong]).map((x) => numToSk(x)), answer: numToSk(n), say: numToSk(n) };
    return { html: `<div class="blitz-q sm">${esc(numToSk(n))}</div>`, options: shuffle([n, ...wrong]).map(String), answer: String(n), say: numToSk(n) };
  }
  if (kind === "clock") {
    const { h, m } = randomTime();
    return { html: `<div class="clock-wrap">${clockSvg(h, m, 170)}</div>`, options: clockOptions(h, m).map((o) => timePhrase(o.h, o.m)), answer: timePhrase(h, m), say: timePhrase(h, m) };
  }
  const q = DRILLS.find((d) => d.id === (Math.random() < 0.5 ? "who" : "ending")).gen();
  return { html: `<div class="blitz-q sm">${esc(q.prompt)}</div><small class="muted">${esc(tr(q.hint))}</small>`, options: q.options, answer: q.answer, say: null };
}

function screenBlitz(kind) {
  if (!["num", "clock", "verbs"].includes(kind)) return go("#/");
  const key = "blitz-" + kind;
  const best = store.p.drills[key]?.best || 0;
  app.innerHTML = `
    <div class="session blitz-screen">
      <div class="s-top"><a class="icon-btn" href="#/">✕</a><b>⚡ ${esc(t("blitz_" + kind))}</b></div>
      <div class="s-body center">
        <div class="blitz-ic">⚡</div>
        <p>${esc(t("blitzRules"))}</p>
        <p class="muted">${esc(t("blitzBest"))}: <b>${best}</b></p>
        <button class="btn primary wide b-start">${esc(t("blitzStart"))}</button>
      </div>
    </div>`;
  app.querySelector(".b-start").onclick = () => runBlitz(kind, key, best);
}

function runBlitz(kind, key, best) {
  const LIMIT = 60;
  let score = 0, wrong = 0, left = LIMIT, busy = false, timer = null;
  app.innerHTML = `
    <div class="session blitz-screen">
      <div class="s-top"><a class="icon-btn b-quit" href="#/">✕</a><div class="bar"><div class="bar-fill b-time" style="width:100%"></div></div><b class="b-score">0</b></div>
      <div class="s-body"><div class="b-q"></div><div class="opts b-opts"></div></div>
    </div>`;
  const qEl = app.querySelector(".b-q"), oEl = app.querySelector(".b-opts");
  const timeEl = app.querySelector(".b-time"), scoreEl = app.querySelector(".b-score");
  const next = () => {
    const q = blitzQuestion(kind);
    qEl.innerHTML = q.html;
    oEl.innerHTML = q.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span>${esc(o)}</button>`).join("");
    oEl.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
      if (busy || left <= 0) return;
      busy = true;
      const ok = q.options[+b.dataset.i] === q.answer;
      b.classList.add(ok ? "right" : "wrong");
      if (!ok) oEl.querySelectorAll(".opt").forEach((x) => { if (q.options[+x.dataset.i] === q.answer) x.classList.add("right"); });
      if (ok) score++; else { wrong++; vibrate(); }
      scoreEl.textContent = score;
      if (store.settings.sound) sfx(ok ? "ok" : "bad");
      setTimeout(() => { busy = false; if (left > 0) next(); }, ok ? 250 : 700);
    }));
  };
  const onKey = (e) => { if (/^[1-4]$/.test(e.key)) oEl.querySelectorAll(".opt")[+e.key - 1]?.click(); };
  document.addEventListener("keydown", onKey);
  const stop = () => { clearInterval(timer); document.removeEventListener("keydown", onKey); window.removeEventListener("hashchange", stop); };
  window.addEventListener("hashchange", stop);
  timer = setInterval(() => {
    left -= 0.1;
    timeEl.style.width = `${Math.max(0, (left / LIMIT) * 100)}%`;
    if (left <= 0) { stop(); finishBlitz(kind, key, best, score, wrong); }
  }, 100);
  next();
}

function finishBlitz(kind, key, best, score, wrong) {
  const xpBefore = store.xp;
  const r = store.p.drills[key] || { best: 0, plays: 0, t: 0 };
  r.plays++; r.t = Date.now(); r.best = Math.max(r.best || 0, score);
  store.p.drills[key] = r;
  store.addXp(score);
  store.save();
  const record = score > best;
  app.innerHTML = `
    <div class="result">
      <div class="res-ic">${record ? "🏆" : "⚡"}</div>
      <h1>${esc(record ? t("blitzRecord") : t("sessionDone"))}</h1>
      <div class="res-stats">
        <div class="res-box acc"><small>${esc(t("blitzScore"))}</small><b>${score}</b></div>
        <div class="res-box xp"><small>${esc(t("xpEarned"))}</small><b>+${score}</b></div>
        <div class="res-box st"><small>${esc(t("blitzBest"))}</small><b>${r.best}</b></div>
      </div>
      <a class="btn primary wide" href="#/blitz/${kind}">🔁 ${esc(t("blitzAgain"))}</a>
      <a class="btn wide" href="#/">${esc(t("continue"))}</a>
    </div>`;
  celebrate({ pct: record && score > 0 ? 100 : 40 }, xpBefore);
}

// =====================================================================
//  НАВИГАЦИЯ
// =====================================================================
function render() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
  const [a, b, c] = parts;
  window.scrollTo(0, 0);
  app.onclick = null; // обработчики экранов не должны переживать смену экрана
  if (!store.settings.welcomed && !localGet("welcomed") && a !== "login") return screenWelcome();
  if (a === "s") return startSession(b, c);
  if (a === "cards") return screenCards(b);
  if (a === "rand") return screenRandom(b);
  if (a === "verbs") return screenVerbs();
  if (a === "blitz") return screenBlitz(b);
  if (a === "review") return screenReview();
  if (a === "dict") return screenDict();
  if (a === "grammar") return screenGrammar(b);
  if (a === "profile") return screenProfile();
  if (a === "login") return screenLogin();
  if (a === "help") return screenHelp();
  return screenLearn();
}

// перерисовать верхнюю панель при смене статуса облака (без сброса экрана занятия)
// Полностью перерисовываем экран только при входе/выходе из аккаунта,
// а при смене статуса сохранения меняем лишь значок облака и блок аккаунта.
let lastUid = undefined;
function refreshChrome() {
  const onMain = !!app.querySelector(".topbar");
  const uid = cloud.user?.uid || null;
  const userChanged = uid !== lastUid;
  lastUid = uid;
  if (!onMain) return;
  if (userChanged) return render();
  const tmp = document.createElement("div");
  tmp.innerHTML = frame("x", "");
  app.querySelector(".topbar").replaceWith(tmp.querySelector(".topbar"));
  const acc = app.querySelector(".account");
  if (acc) {
    acc.innerHTML = accountBlock();
    acc.querySelector(".do-logout")?.addEventListener("click", async () => { await logout(); go("#/"); });
  }
}

// тема оформления: auto / light / dark
function applyTheme() {
  const th = store.settings.theme || "auto";
  if (th === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = th;
  localSet("theme", th);
}

async function boot() {
  const th0 = localGet("theme", "auto");
  if (th0 !== "auto") document.documentElement.dataset.theme = th0;
  setLang(localGet("lang", navigator.language?.startsWith("ru") || navigator.language?.startsWith("uk") ? "ru" : "en"));
  app.innerHTML = `<div class="loading"><img src="icons/icon.svg" alt=""></div>`;
  // просим браузер не удалять наши данные при нехватке места
  navigator.storage?.persist?.().catch(() => {});
  await initCloud();
  setLang(store.settings.lang || getLang());
  applyTheme();
  store.subscribe(() => { localSet("lang", store.settings.lang); });
  cloud.on(() => { setLang(store.settings.lang || getLang()); applyTheme(); refreshChrome(); });
  // без словацкого голоса прячем кнопки 🔊
  const voiceClass = () => document.body.classList.toggle("no-voice", !hasVoice());
  voiceClass();
  onVoice(() => { voiceClass(); if (location.hash === "" || location.hash === "#/") refreshChrome(); });
  window.addEventListener("hashchange", render);
  window.addEventListener("offline", () => toast(t("offline")));
  render();
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
}

boot();
export { WORD_BY_ID };
