const CACHE_NAME = 'hello-sw-v1';
const urls_to_cache = [
    '../../index_offline.html',
    //'../images/tekman_logo.png',
    '../css/styles.css',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
];

self.addEventListener('activate', function(event){
    console.log('SW Active: ', event);
});

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log('opened cache');
                return cache.addAll(urls_to_cache);
            })
            .catch(err => {
                console.error(err);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if (response){
                    return response;
                }
                return fetch(event.request);
            })
            .catch(err => {
                console.error(err);
            })
    );
});