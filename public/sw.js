const CACHE_NAME = 'echojoy-cache-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // Force the waiting service worker to become the active service worker.
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Tell the active service worker to take control of the page immediately.
  );
});

self.addEventListener('fetch', event => {
  // Dynamic caching for Supabase
  if (event.request.url.includes('supabase.co')) {
    const isStorage = event.request.url.includes('/storage/v1/');
    
    if (isStorage) {
      // CACHE FIRST for Audio Files (they don't change)
      event.respondWith(
        caches.open('echojoy-audio').then(cache => {
          return cache.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchRes => {
              cache.put(event.request, fetchRes.clone());
              return fetchRes;
            });
          });
        })
      );
    } else {
      // NETWORK FIRST for API Data (Reminders list)
      // This ensures you see deletions and changes immediately
      event.respondWith(
        fetch(event.request).then(response => {
          const clonedRes = response.clone();
          caches.open('echojoy-api').then(cache => cache.put(event.request, clonedRes));
          return response;
        }).catch(() => {
          return caches.match(event.request);
        })
      );
    }
    return;
  }

  // Use "Network First" strategy for navigation (HTML) and assets (JS/CSS)
  // This ensures we always fetch the latest Vercel deployment bundles
  if (event.request.mode === 'navigate' || event.request.destination === 'script' || event.request.destination === 'style') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }
  
  // Use "Cache First" for other static assets like images or fonts
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // Check if there is already a window tab open and focus it
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      // Otherwise open a new window
      return clients.openWindow('/');
    })
  );
});
