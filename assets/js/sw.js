const CACHE_NAME = 'hello-sw-v1';
const urls_to_cache = [
    '../images/tekman_logo.png',
    '../css/styles.css'
];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            console.log('opened cache');
            return cache.addAll(urls_to_cache);
        })
    );
});