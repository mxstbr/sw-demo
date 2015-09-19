if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js')
    .then(function() {
      console.log('ServiceWorker registration successful!');
    }).catch(function(err) {
      console.log('ServiceWorker registration failed:', err);
    });
}