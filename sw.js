// version of service worker for a static files
const STATIC_CACHE = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';
// static file to be cached 
const STATIC_CACHED_FILES = [
  'offline.html',
  'publlic/js/app.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
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
            if( key !== STATIC_CACHE && key !== DATA_CACHE_NAME ) 
              return caches.delete(key);
          })
        );
      })
  );
});

// handle a fetch request
self.addEventListener('fetch', event => {
  let { request } = event
  console.log("fetch a ", request.url);
  if( request.mode !== 'navigate') return;
  event.respondWith(
    fetch(request.url)
      .catch(() => {
        return caches.open(STATIC_CACHE)
        .then(cache => {
          console.log("match", cache)
            return cache.match('offline.html')
          });
      }) 
  );
});