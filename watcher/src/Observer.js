import Dep from './Dep'
// 数据劫持方法
export default function Observer (obj) {
    if (!obj || typeof obj !== 'object') return
    const dep = new Dep()
    
    Object.keys(obj).forEach(key => {

        // 备份
        let value = obj[key]
        // 对value进行递归
        Observer(value)

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 下面一行执行时，watcher实例就被放到dep.subs数组中了
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                value = newValue
                // 对新赋值的值，也需要劫持
                Observer(value)
                dep.notify()
            }
        })
    })
}