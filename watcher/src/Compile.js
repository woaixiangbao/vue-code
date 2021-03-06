
import Watcher from './Watcher'
// 模板编译函数
export default function Compile(el, vm) {
    vm.$el = document.querySelector(el)
    
    // 创建文档碎片，提高DOM操作的性能你
    const fragment = document.createDocumentFragment()
    while((childNode = vm.$el.firstChild)) {
        fragment.appendChild(childNode)
    }
    
    // 进行模板编译
    replace(fragment)

    vm.$el.appendChild(fragment)

    function replace(node){
        const regMustache = /\{\{\s*(\S)+\s*\}\}/

        // 处理文本节点
        if (node.nodeType === 3) {
            const text = node.textContent

            const execResult = regMustache.exec(text)
            if (execResult) {
                const result = execResult[1]
                const value = result.split('.').reduce((newObj, key) => newObj[key], vm)
                node.textContent = text.replace(regMustache, value)

                // 创建watcher类实例
                new Watcher(vm, result, newValue => {
                    // 此处是watcher实例核心回调函数，也就是实例自身更新自己的callback
                    node.textContent = text.replace(regMustache, newValue)
                })
            }
            return // 终止递归
        }

        // 处理input节点，此处是双向绑定核心部分
        if (node.nodeType === 1 && node.tagName.toUpperCase() === 'INPUT'){
            const attrs = Array.from(node.attributes)

            const findResult = attrs.find(x => x.name === 'v-model')
            if (findResult) {
                const expStr = findResult.value
                const value = expStr.split('.').reduce((newObj, key) => newObj[key], vm)

                node.value = value

                // 对于input中输入的新值，也需要创建watcher实例
                new Watcher(vm, expStr, newValue => {
                    node.value = newValue
                })

                // 监听input输入事件
                node.addEventListener('input', e => {
                    const keyArr = expStr.split('.')

                    const obj = keyArr.slice(0, keyArr.length -1 ).reduce((newObj, key) => newObj[key], vm)
                    const lastKey = keyArr[keyArr.length -1]
                    obj[lastKey] = e.target.value
                })
            }
        }

        // 对节点进行递归处理
        node.childNodes.forEach(child => replace(child))
    }
}