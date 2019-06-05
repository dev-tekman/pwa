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

    // jump to activate stage without waiting for currentlty controlled clients to close
    // self.skipWaiting()

    event.waitUntil(
        // hold the service worker in the installing phase until tasks complete. 
        // If the promise passed to waitUntil() rejects, the install is considered a failure, and the installing service worker is discarded.     

        new Promise(resolve => {
            // wait 3 secs to dramatize the initialization
            setInterval(() => { resolve() }, 3000)
        })    
        .then(() => {
            log('1) SW Installed');
        })
        .catch(err => {
            logError('Error! Installing..', err);
        })
    )
});

self.addEventListener('fetch', function(event) {
    console.log('Requested resource: ', event.request.url)
});