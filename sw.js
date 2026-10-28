// Офлайн-режим: сначала сеть, если её нет — кэш.
// При изменениях сайта поменяй версию, чтобы старый кэш удалился.
const CACHE = "slovencina-v3";
const FILES = [
  "./", "index.html", "css/style.css", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png",
  "js/app.js", "js/data.js", "js/grammar.js", "js/store.js", "js/cloud.js", "js/session.js",
  "js/i18n.js", "js/speech.js", "js/firebase-config.js", "icons/icon-512.png",
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
