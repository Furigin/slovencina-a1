// =====================================================================
//  ЭКРАНЫ ПРИЛОЖЕНИЯ И НАВИГАЦИЯ (#/путь в адресе)
// =====================================================================
import { LESSONS, WORDS, UNIT_BY_ID, WORD_BY_ID } from "./data.js";
import { DRILLS, CHEATSHEETS } from "./grammar.js";
import { store, ACHIEVEMENTS, levelInfo, dayKey, exportProgress, importProgress, GOALS, localGet, localSet } from "./store.js";
import { cloud, initCloud, login, register, logout, resetPassword, authErrorKey, validNick, fetchLeaderboard, takeGuestMergedFlag } from "./cloud.js";
import { t, tr, setLang, getLang } from "./i18n.js";
import { speak, hasVoice, onVoice } from "./speech.js";
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
      <div class="sheet-words">${u.list.slice(0, 40).map((w) => `<span class="wchip st-${store.status(w.id)}">${esc(w.sk)}</span>`).join("")}</div>
      <a class="btn primary wide" href="#/s/unit/${u.id}">${esc(store.p.units[u.id]?.plays ? t("continue") : t("start"))}</a>
      <a class="btn wide" href="#/cards/${u.id}">🃏 ${esc(t("cards"))}</a>
      <button class="btn ghost wide sheet-close">${esc(t("close"))}</button>
    </div>`;
  document.body.appendChild(sheet);
  const close = () => sheet.remove();
  sheet.onclick = (e) => { if (e.target === sheet || e.target.classList.contains("sheet-close") || e.target.closest("a")) close(); };
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
  const lf = screenDict.lesson || 0;
  app.innerHTML = frame("dict", `
    <h1>📚 ${esc(t("navDict"))}</h1>
    <div class="dict-tools">
      <input class="search" type="search" placeholder="${esc(t("search"))}" value="${esc(q)}">
      <select class="lesson-filter">
        <option value="0">${esc(t("allLessons"))}</option>
        ${LESSONS.map((l) => `<option value="${l.id}" ${lf === l.id ? "selected" : ""}>${esc(t("lesson"))} ${l.id}</option>`).join("")}
      </select>
    </div>
    <div class="dict-list"></div>`);
  const list = app.querySelector(".dict-list");
  const draw = () => {
    const qq = screenDict.q.toLowerCase().trim();
    const plain = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const items = WORDS.filter((w) => (!screenDict.lesson || w.lesson === screenDict.lesson) &&
      (!qq || plain(w.sk).includes(plain(qq)) || trW(w).toLowerCase().includes(qq)));
    let lastUnit = null;
    list.innerHTML = items.slice(0, 400).map((w) => {
      const u = UNIT_BY_ID[w.unit];
      const head = w.unit !== lastUnit ? `<div class="dict-unit">${u.icon} ${esc(tr(u))} <small>· ${esc(t("lesson"))} ${u.lesson}</small></div>` : "";
      lastUnit = w.unit;
      return `${head}<div class="dict-row">
        <button class="speak sm" data-say="${esc(w.sk)}">🔊</button>
        <div class="dict-sk">${esc(w.sk)}${w.fem ? ` <span class="muted">/ ${esc(w.fem)}</span>` : ""}${w.g ? ` <span class="g">${w.g === "pl" ? "pl." : w.g}</span>` : ""}</div>
        <div class="dict-tr">${esc(trW(w))}</div>
        <span class="dot st-${store.status(w.id)}" title="${esc(t("status" + { new: "New", learning: "Learning", known: "Known" }[store.status(w.id)]))}"></span>
      </div>`;
    }).join("") || `<p class="muted center">—</p>`;
  };
  screenDict.q = q; screenDict.lesson = lf;
  draw();
  app.querySelector(".search").oninput = (e) => { screenDict.q = e.target.value; draw(); };
  app.querySelector(".lesson-filter").onchange = (e) => { screenDict.lesson = +e.target.value; draw(); };
  list.onclick = (e) => { const b = e.target.closest("[data-say]"); if (b) speak(b.dataset.say); };
}

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
      ${!hasVoice() ? `<p class="muted small">🔇 ${esc(t("noVoice"))}</p>` : ""}
    </div>

    <h2>${esc(t("backup"))}</h2>
    <div class="card">
      <button class="btn wide do-export">⬇️ ${esc(t("exportBtn"))}</button>
      <label class="btn wide">⬆️ ${esc(t("importBtn"))}<input type="file" accept=".json,application/json" class="do-import" hidden></label>
    </div>
    <p class="muted small center">${esc(t("installApp"))}</p>
  `);

  app.querySelector(".set-lang").onchange = (e) => { store.setSetting("lang", e.target.value); setLang(e.target.value); render(); };
  app.querySelector(".set-goal").onchange = (e) => { store.setSetting("goal", +e.target.value); render(); };
  app.querySelector(".set-sound").onchange = (e) => store.setSetting("sound", e.target.checked);
  app.querySelector(".set-auto").onchange = (e) => store.setSetting("autoplay", e.target.checked);
  app.querySelector(".do-export").onclick = exportProgress;
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
    </div>`;
  app.querySelectorAll(".lang-seg button").forEach((b) => (b.onclick = () => { s.lang = b.dataset.l; setLang(b.dataset.l); store.save(); screenWelcome(); }));
  app.querySelectorAll(".goal-btn").forEach((b) => (b.onclick = () => { s.goal = +b.dataset.g; store.save(); screenWelcome(); }));
  const done = () => { s.welcomed = true; store.save(); localSet("welcomed", true); };
  app.querySelector(".w-reg")?.addEventListener("click", () => { done(); screenLogin.mode = "register"; });
  app.querySelector(".w-guest").onclick = () => { done(); render(); };
}

// =====================================================================
//  КАРТОЧКИ
// =====================================================================
function screenCards(unitId) {
  const u = UNIT_BY_ID[unitId];
  if (!u) return go("#/");
  const deck = [...u.list];
  let i = 0, flipped = false, ok = 0, total = 0;
  const draw = () => {
    if (i >= deck.length) {
      const res = store.finishSession("cards", u.id, { correct: ok, total, mistakes: total - ok });
      app.innerHTML = resultHtml({ ...res, correct: ok, total }, `${u.icon} ${tr(u)}`);
      app.querySelector(".res-next").onclick = () => go("#/");
      return;
    }
    const w = deck[i];
    app.innerHTML = `
      <div class="session">
        <div class="s-top"><a class="icon-btn" href="#/">✕</a><div class="bar"><div class="bar-fill" style="width:${(i / deck.length) * 100}%"></div></div><span class="muted">${i + 1}/${deck.length}</span></div>
        <div class="s-body">
          <div class="flash ${flipped ? "flipped" : ""}">
            <div class="flash-inner">
              <div class="flash-face front"><div class="intro-sk">${esc(w.sk)}</div>${w.fem ? `<div class="intro-fem">♀ ${esc(w.fem)}</div>` : ""}<small class="muted">${esc(t("flip"))}</small></div>
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
    app.querySelector(".flash").onclick = () => { flipped = !flipped; draw(); };
    app.querySelector(".c-say").onclick = () => speak(w.sk);
    if (!flipped && store.settings.autoplay) speak(w.sk);
    const answer = (good) => {
      if (!store.word(w.id)) store.introduce(w.id);
      store.grade(w.id, good);
      total++; if (good) ok++; else deck.push(w); // незнакомую карточку покажем ещё раз в конце
      if (deck.length > u.list.length * 2) deck.length = u.list.length * 2;
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
      : store.dueWords();
    if (!words.length) return go("#/review");
    s = buildReviewSession(words);
  }
  if (!s || !s.items.length) return go("#/");
  const back = kind === "review" ? "#/review" : "#/";
  runSession(app, s, (res) => {
    if (!res) return go(back);
    app.innerHTML = resultHtml(res, s.title);
    app.querySelector(".res-next").onclick = () => go(back);
    app.querySelector(".res-next").focus();
  });
}

function resultHtml(res, title) {
  const goal = store.settings.goal;
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
      ${goalHit ? `<p class="good">🎯 ${esc(t("goalDone"))}</p>` : ""}
      ${(res.newAch || []).map((id) => { const a = ACHIEVEMENTS.find((x) => x[0] === id); return a ? `<div class="ach got new"><span>${a[1]}</span><b>${esc(getLang() === "en" ? a[3] : a[2])}</b></div>` : ""; }).join("")}
      <button class="btn primary wide res-next">${esc(t("continue"))}</button>
    </div>`;
}

// =====================================================================
//  НАВИГАЦИЯ
// =====================================================================
function render() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
  const [a, b, c] = parts;
  window.scrollTo(0, 0);
  if (!store.settings.welcomed && !localGet("welcomed") && a !== "login") return screenWelcome();
  if (a === "s") return startSession(b, c);
  if (a === "cards") return screenCards(b);
  if (a === "review") return screenReview();
  if (a === "dict") return screenDict();
  if (a === "grammar") return screenGrammar(b);
  if (a === "profile") return screenProfile();
  if (a === "login") return screenLogin();
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

async function boot() {
  setLang(localGet("lang", navigator.language?.startsWith("ru") || navigator.language?.startsWith("uk") ? "ru" : "en"));
  app.innerHTML = `<div class="loading"><img src="icons/icon.svg" alt=""></div>`;
  // просим браузер не удалять наши данные при нехватке места
  navigator.storage?.persist?.().catch(() => {});
  await initCloud();
  setLang(store.settings.lang || getLang());
  store.subscribe(() => { localSet("lang", store.settings.lang); });
  cloud.on(() => { setLang(store.settings.lang || getLang()); refreshChrome(); });
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
