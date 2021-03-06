export function createRoute(record, location) {
    let res = [];
    if(record) {
        while(record) {
            res.unshift(record);
            record = record.parent;
        }
    }
    return {
        ...location,
        matched: res
    }
}
export default class History {
    constructor(router) {
        this.router = router
        // 默认路由中应该保存一个当前路径，后续会更改这个路径
        this.current = createRoute(null, {
            path: '/'
        })
    }

    // 路由跳转， location是目的地，onComplete是当前跳转成功后的回调函数
    transitionTo(location, onComplete) {
        let route = this.router.match(location) // 用当前路径找出对应的路由记录
        console.log(route)
        // this.current = 
        if (this.current.path === location && route.matched.length === this.current.matched.length) {
            // 如果是相同路径，不需要跳转
            return
        }
        this.updateRoute(route);
        onComplete && onComplete()
    }
    updateRoute(route){
        this.current = route
        this.cb && this.cb(route)
    }

    listen(cb) {
        this.cb = cb
    }
}