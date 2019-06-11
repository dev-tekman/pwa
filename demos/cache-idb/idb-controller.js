class IdbController {
    constructor() {
        this.usersStore = new idbKeyval.Store('pwa-store', 'pwa-store-users');        
        //this.contentStore = new idbKeyval.Store('pwa-store', 'pwa-store-contents');        
        this.users = []
        this.contents = []
        this.keys = {
            users: 'users',
            contents: 'contents'
        }
    }

    addUser(id){
        return new Promise( resolve => {
            idbKeyval.get(this.keys.users, this.usersStore).then(users => {
                this.users = users || []
    
                if (this.users.indexOf(id) === -1){
                    this.users.push(id)            
                    idbKeyval.set(this.keys.users, this.users, this.usersStore).then(s => {
                        resolve()
                    })
                }
            })            
        })
    }

    getUsers(){
        return idbKeyval.get(this.keys.users, this.usersStore)
    }

    getContents(){
        return idbKeyval.get(this.keys.contents, this.usersStore)
    }

    addContent(userId, content){
        return new Promise( resolve => {
            idbKeyval.get(this.keys.contents, this.usersStore).then(contents => {
                this.contents = contents || []
    
                const i = this.contents.findIndex(x => x.id === userId)
                const userContent = { id: userId, content: content }
                if (i === -1){
                    this.contents.push(userContent)
                } else {
                    this.contents[i] = userContent
                }

                idbKeyval.set(this.keys.contents, this.contents, this.usersStore).then(s => {
                    resolve()
                })

            })            
        })
    }

}