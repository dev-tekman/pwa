const CACHE_NAME = 'dev-tekman-v1'
const uris = [
    '/demos/cache/',
    '/demos/cache/index.html',
    '/demos/cache/cache-register.js',
    '/assets/images/error-hero.jpg'
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
                for (let i in uris){
                    fetch(uris[i])
                        .then(response => {
                            cache.put(uris[i], response)
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
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});