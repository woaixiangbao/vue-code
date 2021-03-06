// 扁平化用户传入的数据，创建路由映射表

import createRouteMap from './create-route-map'
import { createRoute } from './history/base'
export default function createMatcher(routes) {
    let {pathList, pathMap} = createRouteMap(routes) // 初始化配置

    // 动态添加路由
    function addRoutes(routes) {
        createRouteMap(routes, pathList, pathMap)
    }
    // 用来匹配的方法
    function match(location) {
        // 找到当前路由记录
        let record = pathMap[location];
        let local = {
            path: location
        }
        // 如果找到了记录，应该根据记录产出一个匹配数组
        if (record) {
            return createRoute(record, local)
        }

        return createRoute(null, local)
    }
    return {
        match,
        addRoutes
    }
}