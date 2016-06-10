var CACHE_NAME = 'ndc-demo-v4';
var urlsToCache = [
  'index.html',
  'bundle.js',
  'style.css',
  'debugging.gif'
];

self.addEventListener('install', function(event) {
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[SW] Installed, adding all files to the cache');
        return cache.addAll(urlsToCache);
      });
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log('fetch');
        if (response) {
          console.log('[SW] Returning files from cache');
          return response;
        }

        console.log('[SW] Get files from server');
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              console.log('[SW] Server Error')
              return response;
            }

            console.log('[SW] Cache new files from server');
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            console.log('[SW] Return new files to client');
            return response;
          });
      })
  );
});
