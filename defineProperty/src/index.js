
import defineReactive from './defineReactive'
import Watcher from './Watcher'
import observe from './observe'
var obj = {
    a: {
        m: {
            n: 5
        }
    },
    b: 10,
    c: [33, 44, 55]
}

observe(obj)
new Watcher(obj, 'a.m.n', (val) => {
    console.log('&&&', val)
})

obj.a.m.n = 99

