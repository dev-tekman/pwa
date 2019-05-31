export function scripts(){
    if (!('serviceWorker' in navigator)) {
        $('#SwNotSupportedAlert').show();
        return;
    }    
}