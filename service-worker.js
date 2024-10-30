const appCacheName = 'app-cache'

const assets = [
    "/",
    "/tictactoe.html",
    "/styles.css",
    "/gameplay.js",
    "/playerscript.js",
    "/comboscript.js",
    "/manifest.json",
    "/icons/",
]

self.addEventListener('install', (e) => {
    //console.log("Serviceworker installed", e)
    e.waitUntil(
        caches.open(appCacheName).then(cache =>{
            console.log("caching assets")
            cache.addAll(assets)
        })
    )
})

self.addEventListener('activate', (e) => {
    console.log("Serviceworker activated", e)
})

self.addEventListener("fetch", (e) => {
    //console.log("Fetch event", e)
    e.respondWith(
        caches.match(e.request).then(cacheResponse => {
            console.log("Loaded from ? ")
            return cacheResponse || fetch(e.request)
        })
    )
})