// version of service worker for a static files
const STATIC_CACHE = 'static-cache-v2.1.1';
const DATA_CACHE_NAME = 'data-cache-v2.1.0';
// static file to be cached 
const STATIC_CACHED_FILES = [
  'offline.html',
  './',
  'public/js/app.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
]

// install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        //console.log("serviceworker pre-cache static files", cache);
        return cache.addAll(STATIC_CACHED_FILES);
      })
  );
}); 

// activate event to catch and prefetch changes in files
self.addEventListener('activate', event => {
  //console.log("activate event ", event);
  event.waitUntil(
    caches.keys()
      .then( keysList => {
        //console.log("keys List ", keysList);
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
  //in case asking to get data from api https://api.pray.zone/v2/times/today.json?city=setif
  if( event.request.url.includes('api.pray.zone') ) {
    //console.log("ServiceWorker fetch data from ", event.request.url)
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request).then(response => {
          // if we retrieve data from network with success
          if( response.status === 200 ) cache.put(event.request.url, response.clone());
          return response;
        }).catch(err => {
          console.log("error", err)
          // in case the user are offline or cant reach end point
          //console.log("ServiceWorker can't fetching data from ", event.request.url);
          return cache.match(event.request);
        })
      })
    );
    return;
  }
  // other cases of fetching ..
  event.respondWith(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.match(event.request).then(response => response || fetch(event.request));
    })
  )
});