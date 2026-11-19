// Hors ligne : on sert le réseau d'abord (pour avoir les nouvelles cartes), le cache sinon.
const C = "revisions-v1";
const FILES = ["./", "index.html", "cards.js", "manifest.json", "icon.png"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request)));
});
