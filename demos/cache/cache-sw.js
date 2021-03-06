const CACHE_NAME = 'dev-tekman-v1'

const uris = [
    '/pwa/demos/cache/',
    '/pwa/demos/cache/index.html',
    '/pwa/demos/cache/index-offline.html',
    '/pwa/demos/cache/cache-register.js',
    '/pwa/assets/images/error-hero.jpg'
]


function log(text, obj){
    console.log(text, obj)
}

function logError(text, err){
    console.error(text, err)
}


self.addEventListener('activate', async function(event){
    log('2) SW Active', event);    
});

self.addEventListener('install', function(event){

    // jump to activate stage without waiting for currentlty controlled clients to close
    self.skipWaiting()

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache){
                for (let uri of uris){
                    fetch(uri)
                        .then(response => {
                            cache.put(uri, response)
                        })
                        .catch(err => {
                            logError(`Error retrieving file: ${uris[i]}`, err)
                        })
                }

                // cache.addAll(uris)
                //     .catch(err => {
                //         debugger
                //         logError('Error retrieving/adding file to cache', err)
                //     });
            })
            .catch(function(err){
                logError(`Cache: Error opening Cache "${CACHE_NAME}"`, err)
            })
    )
});

self.addEventListener('fetch', function(event) {
    console.log('Requested resource: ', event.request.url)

    if (event.request.url.endsWith(uris[0]) || event.request.url.endsWith(uris[1])){
        // For the homepage, network first then cache
        // 1. Checks if can fetch homepage
        // 2. returns index-offline.html if fetch fails (is offline)
        event.respondWith(
            fetch(event.request).catch(err => {
                return caches.match(uris[2])
            })
        );    
    } else {
        // defaults to Cache first
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    return response || fetch(event.request);
                })
        );    
    }

});