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

// activate event to catch and prefetch changes in files
self.addEventListener('activate', event => {
  console.log("activate event ", event);
  event.waitUntil(
    caches.keys()
      .then( keysList => {
        console.log("keys List ", keysList);
        return Promise.all(
          keysList.map(key => {
            if( key !== STATIC_CACHE ) return caches.delete(key);
          })
        );
      })
  );
})