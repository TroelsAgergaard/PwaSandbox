// version 1
let cacheName = 'static-cache-v9';
let fileToCache = [ '/', '/index.html', '/fallback.html', '/img/thumb-1.png', '/img/banner.png', '/styles.css' ];

self.addEventListener('install', function(event) {
	console.log('service worker installed!');
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching app shell');
			cache.addAll(fileToCache);
		})
	);
});

// self.addEventListener('activate', function(event) {
// 	console.log('activate', event);
// 	event.waitUntil(
// 		caches.keys().then(function(keys) {
// 			console.log(keys);
// 			return Promise.all(keys.filter((key) => key !== cacheName).map((key) => caches.delete(key)));
// 		})
// 	);
// });

self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches.keys().then((cacheNames) => {
			cacheNames.map((e) => {
				if (e !== cacheName) caches.delete(e);
			});
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log('fetch', event);
	event.respondWith(
		caches.open(cacheName).then(function(cache) {
			return cache
				.match(event.request)
				.then(function(response) {
					return (
						response ||
						fetch(event.request).then(function(response) {
							cache.put(event.request, response.clone());
							return response;
						})
					);
				})
				.catch(function() {
					return caches.match('/fallback.html');
				});
		})
	);
});
