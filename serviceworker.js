var CACHE_NAME = 'demo-cache-v2';
var urlsToCache = [
  'index.html',
  'bundle.js',
  'style.css',
  'debugging.gif'
];

self.addEventListener('install', function(event) {
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('installed, add all files to cache');
        return cache.addAll(urlsToCache);
      });
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log('fetch');
        if (response) {
          console.log('returning cached files');
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            console.log('get files from server');
            if(!response || response.status !== 200 || response.type !== 'basic') {
              console.log('server error');
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                console.log('put new files in cache');
                cache.put(event.request, responseToCache);
              });
            console.log('return server files');
            return response;
          }
        );
      })
    );
});