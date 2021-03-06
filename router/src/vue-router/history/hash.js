import History from './base'

function getHash() {
    return window.location.hash.slice(1)
}
function ensureSlash() {
    if (window.location.hash){
        return
    }
    window.location.hash = '/'
}
export default class HashHistory extends History {
    constructor(router){
        super(router)
        // 默认情况下，必须有hash值，否则无法匹配首页了
        ensureSlash()
    }
    getCurrentLocation() {
        return getHash()
    }

    setUpListener() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(getHash())
        })
    }
}