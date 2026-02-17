// This is the bare minimum service worker
self.addEventListener("install", (event) => {
  console.log("WPI Service Worker installed");
});

self.addEventListener("fetch", (event) => {
  // Logic for offline support goes here later
});
