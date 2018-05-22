var CACHE_NAME = 'cache-v1';

var cachedUrls = [
	'/', 
	'/js/main.js', 
	'/js/dbhelper.js', 
	'/js/restaurant_info.js', 
	'/css/styles.css', 
	'/data/restaurants.json', 
	'/index.html', 
	'/restaurant.html', 
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME) 
			.then(function(cache) {
				return cache.addAll(cachedUrls);
			}
		)
	);
});

self.addEventListener('install', event => {
	self.skipWaiting();

	event.waitUntil(CACHE_NAME)
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(function(cacheName) {
			return Promise.all(
				cacheName.filter(function(name) {
					return name !== CACHE_NAME; 
				}).map(function(name) {
					return caches.delete(name);
				})
			)
		})
	)
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				// Cache hit - return response
				if (response) {
					return response;
				}
				return fetch(event.request);
			}
		)
	);
});