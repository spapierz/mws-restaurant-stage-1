var cache_version = 'restaurant-v1';

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
		caches.open(cache_version) 
			.then(function(cache) {
				return cache.addAll(cachedUrls);
			}
		)
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cached_name => {
			return Promise.all(
				cached_name.filter(new_name => {
					return new_name !== cache_version; 
				}).map(new_name => {
					return caches.delete(new_name);
				})
			)
		})
	)
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				return response || fetch(event.request);
			}
		)
	);
});