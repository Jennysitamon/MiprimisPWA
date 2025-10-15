//estructura basica delserviciworker

//1. Nombre del caché y archivos a cachear
const CACHE_NAME = "mi-cache-1";
const urlsToCache = [
  "index.html",
  "offline.html",
  "login.html",
  "icons/icon-72x72.png",
  "icons/icon-96x96.png",
  "icons/icon-192x192.png",
  "icons/icon-256x256.png",
  "icons/icon-512x512.png"
];

//2. Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Archivos cacheados correctamente");
      return cache.addAll(urlsToCache);
    })
  );
});

//3. Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

//4. FETCH -
self.addEventListener("fetch", event => {

  if (event.request.url.includes("login.html")) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match("offline.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => caches.match("offline.html"));
      })
  );
});
