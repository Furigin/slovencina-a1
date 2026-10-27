// =====================================================================
//  ОБЛАКО: аккаунты (ник + пароль) и сохранение прогресса в Firebase.
//  Если firebase-config.js не заполнен — модуль просто выключен.
// =====================================================================
import { FIREBASE_CONFIG } from "./firebase-config.js";
import { store, merge, readLocalProgress, clearLocalProgress } from "./store.js";

const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
const NICK_DOMAIN = "@slovencina-a1.app"; // ник превращается в «почту» nick@slovencina-a1.app

let fb = null;          // загруженные модули Firebase
let saveTimer = null;
let applyingRemote = false;

export const cloud = {
  enabled: !!(FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey),
  ready: false,
  user: null,           // { uid, nick }
  status: "idle",       // idle | saving | saved | error
  listeners: new Set(),
  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  emit() { for (const fn of this.listeners) fn(this); },
};

function setStatus(s) { cloud.status = s; cloud.emit(); }

export function nickToEmail(nick) {
  nick = nick.trim();
  return nick.includes("@") ? nick.toLowerCase() : nick.toLowerCase() + NICK_DOMAIN;
}
export function validNick(nick) {
  nick = nick.trim();
  return nick.includes("@") ? /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(nick) : /^[a-zA-Z0-9._-]{3,20}$/.test(nick);
}
function displayNick(user) {
  const e = user.email || "";
  return e.endsWith(NICK_DOMAIN) ? e.slice(0, -NICK_DOMAIN.length) : e.split("@")[0];
}

// ---------- запуск ----------
export async function initCloud() {
  if (!cloud.enabled) { store.load("guest"); cloud.ready = true; cloud.emit(); return; }
  try {
    const [app, auth, fs] = await Promise.all([
      import(SDK + "firebase-app.js"),
      import(SDK + "firebase-auth.js"),
      import(SDK + "firebase-firestore.js"),
    ]);
    const a = app.initializeApp(FIREBASE_CONFIG);
    fb = { ...auth, ...fs, auth: auth.getAuth(a), db: fs.getFirestore(a) };
  } catch (e) {
    // нет интернета при первой загрузке — работаем локально
    console.warn("Firebase не загрузился", e);
    cloud.enabled = false;
    store.load("guest");
    cloud.ready = true; cloud.emit();
    return;
  }

  // при каждом сохранении прогресса — отправить в облако (с задержкой)
  store.subscribe((p, toCloud) => {
    if (toCloud && cloud.user && !applyingRemote) scheduleSave();
  });
  window.addEventListener("pagehide", () => flush());
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(); });
  window.addEventListener("online", () => { if (cloud.user) scheduleSave(100); });

  let first = true;
  fb.onAuthStateChanged(fb.auth, async (user) => {
    if (user) {
      cloud.user = { uid: user.uid, nick: displayNick(user) };
      // сразу показываем то, что есть локально по этому аккаунту
      store.load(user.uid);
      await pullAndMerge(true);
    } else {
      cloud.user = null;
      store.load("guest");
    }
    if (first) { first = false; cloud.ready = true; }
    cloud.emit();
  });
}

// ---------- вход / регистрация ----------
export async function register(nick, pass) {
  const cred = await fb.createUserWithEmailAndPassword(fb.auth, nickToEmail(nick), pass);
  return cred.user;
}
export async function login(nick, pass) {
  const cred = await fb.signInWithEmailAndPassword(fb.auth, nickToEmail(nick), pass);
  return cred.user;
}
export async function logout() {
  await flush();
  await fb.signOut(fb.auth);
}
export async function resetPassword(email) {
  await fb.sendPasswordResetEmail(fb.auth, email.trim());
}
export function authErrorKey(e) {
  const c = e?.code || "";
  if (c.includes("email-already-in-use")) return "errUserExists";
  if (c.includes("weak-password")) return "errWeakPass";
  if (c.includes("network")) return "errNetwork";
  if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found") || c.includes("invalid-email") || c.includes("invalid-login")) return "errWrongPass";
  return "errGeneric";
}

// ---------- синхронизация ----------
// Забрать облачную копию, объединить с локальной (и с гостевой при первом входе)
let guestMergedFlag = false;
async function pullAndMerge(mergeGuest) {
  const uid = cloud.user.uid;
  try {
    const snap = await fb.getDoc(fb.doc(fb.db, "progress", uid));
    const remote = snap.exists() ? parse(snap.data().json) : null;
    let merged = merge(store.p, remote);
    // прогресс, набранный без аккаунта, переносим в аккаунт (один раз)
    const guest = mergeGuest ? readLocalProgress("guest") : null;
    if (guest && Object.keys(guest.days).length) {
      merged = merge(merged, guest);
      clearLocalProgress("guest");
      guestMergedFlag = true;
    }
    if (!merged.nick) merged.nick = cloud.user.nick;
    applyingRemote = true;
    store.replace(merged, false);
    applyingRemote = false;
    await saveNow();
  } catch (e) {
    applyingRemote = false;
    console.warn("Не удалось загрузить прогресс из облака", e);
    setStatus("error");
  }
}
export function takeGuestMergedFlag() { const f = guestMergedFlag; guestMergedFlag = false; return f; }

function scheduleSave(ms = 2500) {
  clearTimeout(saveTimer);
  setStatus("saving");
  saveTimer = setTimeout(saveNow, ms);
}
export async function flush() {
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; await saveNow(); }
}

// Сохранение через транзакцию: читаем облако → объединяем → пишем.
// Так два устройства не затирают прогресс друг друга.
async function saveNow() {
  saveTimer = null;
  if (!cloud.user || !fb) return;
  const uid = cloud.user.uid;
  const ref = fb.doc(fb.db, "progress", uid);
  try {
    setStatus("saving");
    const merged = await fb.runTransaction(fb.db, async (tx) => {
      const snap = await tx.get(ref);
      const remote = snap.exists() ? parse(snap.data().json) : null;
      const m = merge(store.p, remote);
      tx.set(ref, { json: JSON.stringify(m), updated: Date.now(), nick: cloud.user.nick });
      return m;
    });
    // если в облаке было что-то новее — подтянуть к себе
    if (JSON.stringify(merged.days) !== JSON.stringify(store.p.days) || Object.keys(merged.words).length !== Object.keys(store.p.words).length) {
      applyingRemote = true;
      store.replace(merged, false);
      applyingRemote = false;
    }
    await fb.setDoc(fb.doc(fb.db, "leaderboard", uid), {
      nick: cloud.user.nick.slice(0, 20),
      xp: store.xp,
      weekXp: store.weekXp,
      week: store.weekId,
      streak: store.streak,
      updatedAt: Date.now(),
    });
    setStatus("saved");
  } catch (e) {
    console.warn("Не удалось сохранить в облако", e);
    setStatus("error");
  }
}

export async function fetchLeaderboard() {
  if (!fb || !cloud.user) return [];
  const q = fb.query(fb.collection(fb.db, "leaderboard"), fb.orderBy("xp", "desc"), fb.limit(100));
  const snap = await fb.getDocs(q);
  const week = store.weekId;
  return snap.docs.map((d) => {
    const x = d.data();
    return { uid: d.id, nick: x.nick, xp: x.xp || 0, weekXp: x.week === week ? x.weekXp || 0 : 0, streak: x.streak || 0 };
  });
}

function parse(json) {
  try { return JSON.parse(json); } catch (e) { return null; }
}
