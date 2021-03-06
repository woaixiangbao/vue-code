import Compile from "./Compile"
import Observer from "./Observer"

class Vue {
    constructor(options) {

        this.$data = options.data

        // 调用数据劫持方法
        Observer(this.$data)
        Object.keys(this.$data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return this.$data[key]
                },
                set(newValue) {
                    this.$data[key] = newValue
                }
            })
        })

        // 模板编译函数
        Compile(options.el, this)
    }
}
const vm = new Vue({
    el: '#app',
    data: {
        name: 'zs',
        age: 20,
        info: {
            a: 'a1',
            c: 'c1'
        }
    }
})

console.log(vm, 1111)