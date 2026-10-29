// Офлайн-режим: сначала сеть, если её нет — кэш.
// При изменениях сайта поменяй версию, чтобы старый кэш удалился.
const CACHE = "slovencina-v5";
const FILES = [
  "./", "index.html", "css/style.css", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png",
  "js/app.js", "js/data.js", "js/grammar.js", "js/store.js", "js/cloud.js", "js/session.js",
  "js/i18n.js", "js/speech.js", "js/firebase-config.js", "js/extra.js", "js/clock.js", "js/audio-index.js", "js/audio-key.js", "icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Firebase и прочие чужие запросы не трогаем (кроме шрифтов)
  if (e.request.method !== "GET") return;
  if (url.origin !== location.origin && !url.host.includes("fonts.g")) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("index.html")))
  );
});

// Напоминание «Проверь свои знания» раз в ~2 дня (Chrome на Android, установленный сайт)
self.addEventListener("periodicsync", (e) => {
  if (e.tag !== "check-knowledge") return;
  e.waitUntil(self.registration.showNotification("Skontroluj si slovíčka! 🧠", {
    body: "Проверь свои знания — пара минут, чтобы слова не забылись.",
    icon: "icons/icon-192.png",
    badge: "icons/icon-192.png",
    tag: "check-knowledge",
    data: { url: "./#/s/review/old" },
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL(e.notification.data?.url || "./", self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
    for (const c of list) if ("focus" in c) { c.navigate(url); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
