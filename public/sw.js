/* up2date Service Worker — Offline cache + PWA support */
const CACHE_NAME  = 'up2date-v3';
const STATIC_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/favicon.png',
  '/favicon.svg',
  '/manifest.json'
];

// Install: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_URLS))
  );
  self.skipWaiting();
});

// Activate: clean old caches and reload all open clients
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.matchAll({ type: 'window' })).then(clients => {
      clients.forEach(client => client.navigate(client.url));
    })
  );
  self.clients.claim();
});

// Fetch: network-first for news.json, cache-first for static
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // news.json: always try network first (fresh data)
  if (url.pathname.includes('news.json')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful GET responses
        if (event.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
