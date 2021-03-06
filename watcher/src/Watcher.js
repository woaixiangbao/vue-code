import Dep from './Dep'

export default class Watcher{
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb
        Dep.target = this
        // 此行，只为触发getter函数
        // getter中有收集依赖的代码，也就是addSub函数
        key.split('.').reduce((newObj, key) => newObj[key], vm) 
        Dep.target = null
    }

    update() {
        const value = this.key.split('.').reduce((newObj, key) => newObj[key], this.vm)
        this.cb(value)
    }
}