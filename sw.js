// version of service worker for a static files
const STATIC_CACHE = 'static-cache-v1';
// static file to be cached 
const STATIC_CACHED_FILES = [
  'offline.html'
]

// install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log("serviceworker pre-cache static files", cache);
        return cache.addAll(STATIC_CACHED_FILES);
      })
  );
}); 