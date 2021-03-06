// 收集依赖/触发更新的类

export default class Dep{
    constructor() {
        // 所有watcher实例，都会放到这个数组中
        this.subs = []
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    // 通知watcher实例进行更新
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}