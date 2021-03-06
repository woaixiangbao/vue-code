import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'
export default class VueRouter {
    constructor(options) {
        // 将用户传递的routes转化为好维护的结构（pathList, pathMap）
        this.matcher = createMatcher(options.routes)

        // 创建路由系统
        // 根据mode创建不同的路由对象
        this.mode = options.mode || 'hash'
        this.history = new HashHistory(this) // this就是vue-router
    }
    init(app) { // new Vue app 指代的是根实例
        const history = this.history
        const setupHashListener = () => {
            history.setUpListener()
        }
        history.transitionTo(
            history.getCurrentLocation(), 
            setupHashListener
        )

        history.listen((route) => { // 发布订阅方法
            app._route = route; // 试图会更新（install里调用了响应式的route---defineReactive）
        })
    }
    match(location) {
        return this.matcher.match(location)
    }
}

// 默认会调用install方法
VueRouter.install = install

