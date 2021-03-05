import Dep from "./Dep";

let uid = 0;

export default class Watcher {
    constructor(target, expreession, callback) {
        console.log('我是watcher实例的构造器')
        this.id = uid++
        this.target = target;
        this.getter = parsePath(expreession)
        this.callback = callback;
        this.value = this.get()
    }
    update() {
        this.run()
    }
    run() {
        this.getAndInvoke(this.callback)
    }
    getAndInvoke(cb) {
        const value = this.get()
        if (value !== this.value || typeof value === 'object') {
            const oldValue = this.value
            this.value = value
            cb.call(this.target, value, oldValue)
        }
    }
    get() {
        // 进入依赖收集阶段，让全局的Dep.target设置为Watcher本身
        Dep.target = this
        const obj = this.target
        let value;
        try{
            value = this.getter(obj)

        }finally{
            Dep.target = null;
        }
        return value
    }
}

function parsePath(str) {
    const segments = str.split('.')
    return (obj => {
        for(let i = 0; i < segments.length; i++) {
            if (!obj) return;
            obj = obj[segments[i]]
        }
        return obj
    })
}