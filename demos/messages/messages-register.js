const register = function(){
    if (!('serviceWorker' in navigator)) {
        $('#SwNotSupportedAlert').show();
        return;
    } 

    const loggerObj = $('#swStatus');
    const logger = {
        log: function(text, obj){
            loggerObj.append($('<li>').html(text).addClass('list-group-item'));
        },
        error: function(text, err){
            console.warn(err);
            loggerObj.append($('<li>').html(text).addClass('list-group-item').addClass('list-group-item-danger'));
        }
    };

    window.addEventListener('load', function(){
        const hash = '123212s123l4766'; //Date.now();

        navigator.serviceWorker.register(`messages-sw.js?${hash}`) //, { scope: '/'}
        .then(function(reg){
            logger.log(`ServiceWorker registration successful with scope: ${reg.scope}`);

            reg.installing; // the installing worker, or undefined
            reg.waiting; // the waiting worker, or undefined
            reg.active; // the active worker, or undefined
            
            reg.addEventListener('updatefound', () => {
                // A wild service worker has appeared in reg.installing!
                const newWorker = reg.installing;
            
                logger.log(`NEW ServiceWorker found! State: ${newWorker.state}`);
                
                newWorker.state;
                // "installing" - the install event has fired, but not yet complete
                // "installed"  - install complete
                // "activating" - the activate event has fired, but not yet complete
                // "activated"  - fully active
                // "redundant"  - discarded. Either failed install, or it's been
                //                replaced by a newer version
            
                newWorker.addEventListener('statechange', () => {
                // newWorker.state has changed
                    logger.log(`NEW ServiceWorker Changed State! new State: ${newWorker.state}`);
                });
            });

        })
        .catch(function(err){
            console.error(`ServiceWorker registration failed. ${err.name} => ${err.message}`, );
        });
    });
}

export {
    register
}