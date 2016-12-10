if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js')
    .then(function() {
      console.log('ServiceWorker registration successful!');
    }).catch(function(err) {
      console.log('ServiceWorker registration failed:', err);
    });

  navigator.serviceWorker.addEventListener('controllerchange', function(event) {
    navigator.serviceWorker.controller.addEventListener('statechange', function() {
      if (this.state === 'activated') {
        var message = document.querySelector('.offline-message');
        message.classList.remove('hidden');
        setTimeout(function () {
          message.classList.add('hidden');
        }, 5000);
      }
    });
  });
}
