// Service Worker: minimal PWA installable setup

// Listen for the install event
self.addEventListener("install", event => {
  // Skip waiting so the SW activates immediately
  self.skipWaiting();
});

// Optional: handle fetch events for basic offline fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // If offline, serve the homepage
      return caches.match("./") || fetch("./");
    })
  );
});
