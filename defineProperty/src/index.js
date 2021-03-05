
import defineReactive from './defineReactive'
// import Observer from './Observer'
import observe from './observe'
var obj = {
    a: {
        m: {
            n: 5
        }
    },
    b: 10
}

observe(obj)
obj.b++

obj.a.m.n = 6

