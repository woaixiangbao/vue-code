import {def} from './utils'
// push pop shift unshift splice sort reverse  Array.prototype
// 得到Array.prototype
const arrayPrototype = Array.prototype;
// 以Array.prototype为原型创建ArrayMethods对象
export const arrayMethods = Object.create(arrayPrototype)
// 要被改写的7个数组方法
const methodsNeedChange = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
methodsNeedChange.forEach(methodName => {
    // 备份原来的方法
    const original = arrayPrototype[methodName];

    def(arrayMethods, methodName, function() {
        console.log('数组函数相应了')
        const args = [...arguments]
        // 恢复原来方法的功能，这里的this是执行上下文的this，所以这里不能是箭头函数
        const result = original.apply(this, args)
        // 把这个数组身上的__ob__取出来，__ob__已经被添加了，因为数组肯定不是最高层，比如obj.g属性是数组，obj不是数组，
        // 第一次遍历obj对象时，已经给g属性添加了__ob__属性
        const ob = this.__ob__
        // 有三种方法push/unshift/splice能够插入新项，现在要把插入的新项也要变为observe的
        let inserted = []
        switch(methodName) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                // splice格式是(下标、数量、插入的项)
                inserted = args.slice(2)
                break;
        }
        // 判断有没有要插入的新项
        if (inserted) {
            ob.observeArray(inserted)
        }
        ob.dep.notify();
        
        // pop 等函数需要有返回值
        return result
    }, false)

})