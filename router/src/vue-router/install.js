import RouterView from './components/view'
export let _Vue;
export default function install (Vue) {
    _Vue = Vue;
    Vue.mixin({
        beforeCreate() {
            console.log(this.$options.name)
            if (this.$options.router) { // 根实例
                this._routerRoot = this
                this._router = this.$options.router

                this._router.init(this)

                // 此处是将_route加入相应式
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            }else {
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }
        }
    })
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._route
        }
    })

    Vue.component('RouterView', RouterView)
}