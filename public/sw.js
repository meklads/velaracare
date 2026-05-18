// ── Velara Care Service Worker ──
// Handles push notifications, caching, and offline support

const CACHE_NAME = "velara-cache-v1";
const PRECACHE_URLS = ["/", "/login", "/manifest.json"];

// Install: cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Push notification handler
self.addEventListener("push", (event) => {
  let data = { title: "Velara Care", body: "تحديث جديد", icon: "/icons/icon-192.svg" };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {}
  
  const options = {
    body: data.body,
    icon: data.icon || "/icons/icon-192.svg",
    badge: "/icons/icon-192.svg",
    tag: data.tag || "default",
    vibrate: [200, 100, 200],
    dir: "rtl",
    lang: "ar-SA",
    data: { url: data.url || "/" },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click: open app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      const existing = windowClients.find((c) => c.url === url);
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});
