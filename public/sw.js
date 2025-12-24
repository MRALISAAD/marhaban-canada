// No-op service worker that unregisters itself on activation.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        await self.registration.unregister();
      } catch (err) {
        // ignore
      }
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});

self.addEventListener('fetch', () => {
  // Do nothing: pass through to network.
});
