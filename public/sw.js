console.log('started ServiceWorker');
// this.addEventListener('install', event => console.log('installed', event));
// this.addEventListener('activate', event => console.log('activated', event));
// this.addEventListener('fetch', event => console.log('fetching', event));
// this.addEventListener('push', event => console.log('pushed', event));
// this.addEventListener('sync', event => console.log('do sync', event));
// this.addEventListener('message', event => console.log('message received', event));

const currentCacheName = 'll-app-v1.41';

this.addEventListener('install', event => {
	event.waitUntil(
	    caches.open(currentCacheName).then(cache => {
	    	return cache.addAll([
	        	'/production/styles/style.css',
	        	'/production/js/main.js',
	        	'/production/images/header.jpg',
	        	//lets cache the fonts
	        	'/production/fonts/Raleway-Regular.eot',
	        	'/production/fonts/Raleway-Regular.woff',
	        	'/production/fonts/Raleway-Regular.ttf',
	        	'/production/fonts/Raleway-Regular.svg',
	        	'/production/fonts/Raleway-Bold.eot',
	        	'/production/fonts/Raleway-Bold.woff',
	        	'/production/fonts/Raleway-Bold.ttf',
	        	'/production/fonts/Raleway-Bold.svg'
  
	    	]);
	    })
	);
});

this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('ll-app-')))
          .filter(cacheName => (cacheName !== currentCacheName))
          .map(cacheName => caches.delete(cacheName))
      );
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
