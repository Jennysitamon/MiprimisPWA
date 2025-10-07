//Estructura básica de un servicio worker

//1. Nombre del caché y archivos a cachear
const CACHE_NAME = "mi-cahche-1";
const urlsToCache = [
    "index.html",
    "offline.html",
    "icon-72x72.png",
    "icon-96x96.png",
    "icon-192x192.png",
    "icon-256x256.png",
    "icon-512x512.png"

];

//2.Install -> se ejecuta al instalat el SW
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache=> cache.addAll(urlsToCache))
    );
});

//3. activate -> se ejecuta al activarme (limpia caches viejas)
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys=>
            Promise.all(
                keys.filter(key=>key !== CACHE_NAME)
                .map(key => caches.delete(key))
            )
        )
    );
});