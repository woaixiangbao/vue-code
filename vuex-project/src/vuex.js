let _Vue;
class Store {
    constructor(options = {}) {
        this.state = options.state
    }
}

function install(Vue) {
    _Vue = Vue; // vue的构造函数
    console.log(3333)

    Vue.mixin({
        beforeCreate() {
            console.log(this.$options.name, 999)
            // 根实例---new Vue的时候
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
                console.log(777, this)
            } else {
                
                this.$store = this.$parent && this.$parent.store
            }
        }
    })
}
export default{
    install,
    Store
}