const CACHE_NAME = 'hello-sw-v1';
const urls_to_cache = [
    'index-offline.html',
    'assets/images/tekman_logo.png',
    'assets/css/styles.css',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
];

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
    if (!event.waitUntil){
        logError('Error! event.waitUntil() not supported :(');
    }
    self.postMessage('message','Estoy vivo!!')
    // jump to activate stage without waiting for currentlty controlled clients to close
    //self.skipWaiting()

    event.waitUntil(
        // hold the service worker in the installing phase until tasks complete. 
        // If the promise passed to waitUntil() rejects, the install is considered a failure, and the installing service worker is discarded. 
        // This is primarily used to ensure that a service worker is not considered installed until all of the core caches it depends on are successfully populated.

        new Promise(resolve => {
            resolve()//setInterval(() => { resolve() }, 1000)
        })    
        .then( ev => {
            log('1) SW Installed', ev);
        })
        .catch(err => {
            logError('Error! Installing..', err);
        })
    )
});

self.addEventListener('fetch', function(event) {
    console.log('request', event.request.url)
});