// Minimal service worker — satisfies PWA installability requirement
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
