const CACHE_NAME = 'assethub-v1';
const ASSETS_TO_CACHE = [
    '/favicon.ico',
    '/images/pwa-icon-192.png',
    '/images/pwa-icon-512.png',
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    // Only cache static files (assets, images, scripts)
    const url = new URL(e.request.url);
    const isStaticAsset = url.pathname.startsWith('/build/') || 
                          url.pathname.startsWith('/images/') || 
                          url.pathname.endsWith('.js') || 
                          url.pathname.endsWith('.css') || 
                          url.pathname.endsWith('.png') || 
                          url.pathname.endsWith('.ico');

    if (isStaticAsset) {
        e.respondWith(
            caches.match(e.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(e.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    } else {
        // Network-first strategy for dynamic pages / API / Inertia calls
        e.respondWith(
            fetch(e.request).catch(() => {
                return caches.match(e.request);
            })
        );
    }
});
