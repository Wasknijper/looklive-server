console.log('started ServiceWorker');
// this.addEventListener('install', event => console.log('installed', event));
// this.addEventListener('activate', event => console.log('activated', event));
// this.addEventListener('fetch', event => console.log('fetching', event));
// this.addEventListener('push', event => console.log('pushed', event));
// this.addEventListener('sync', event => console.log('do sync', event));
// this.addEventListener('message', event => console.log('message received', event));

this.addEventListener('install', event => {
	event.waitUntil(
	    caches.open('looklive-v1').then(cache => {
	    	return cache.addAll([
	        	'/',
	        	'/styles/style.css',
	        	'/js/main.js',
	        	'/images/header.jpg'
	    	]);
	    })
	);
});

//To do: make a page offline, resources: https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
//										 https://googlechrome.github.io/samples/service-worker/custom-offline-page/index.html

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
      	return response || fetch(event.request);
      })
  );
});
