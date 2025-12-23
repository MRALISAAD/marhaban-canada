const CACHE_NAME = "marhaban-cache-v2";
const PRECACHE_URLS = ["/manifest.json"];

// Assets that can be cached (images, fonts, static files)
const CACHEABLE_ASSETS = /\.(jpg|jpeg|png|gif|svg|webp|woff|woff2|ttf|eot|ico|pdf)$/i;
// Paths that should NEVER be cached (HTML pages, API routes, Next.js internals)
const NO_CACHE_PATHS = /^\/(_next|api|fr|en|ar)\//;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  
  // Only handle GET requests
  if (request.method !== "GET") {
    return;
  }
  
  const requestUrl = new URL(request.url);
  
  // Only handle same-origin requests
  if (requestUrl.origin !== self.location.origin) {
    return;
  }
  
  // NEVER cache HTML pages, API routes, or Next.js internals
  if (NO_CACHE_PATHS.test(requestUrl.pathname)) {
    // Network-only for pages and Next.js assets
    event.respondWith(fetch(request));
    return;
  }
  
  // Cache assets (images, fonts, etc.) with network-first strategy
  if (CACHEABLE_ASSETS.test(requestUrl.pathname)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        }),
    );
    return;
  }
  
  // For all other requests, use network-only (no caching)
  event.respondWith(fetch(request));
});
