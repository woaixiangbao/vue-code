export default function createRouteMap(routes, oldPathList, oldPathMap) {
    // 将用户传入的数据 进行格式化
    let pathList = oldPathList || []
    let pathMap = oldPathMap || Object.create(null);

    routes.forEach(route => {
        addRouteRecord(route, pathList, pathMap);
    })

    console.log(pathList, pathMap)
    return {
        pathList,
        pathMap
    }
    // 添加路由记录
    function addRouteRecord(route, pathList, pathMap, parent) {
        let path = parent ? `${parent.path}/${route.path}` :route.path;
        let record = { // 一条记录对象
            path,
            component: route.component,
            parent
        }
        if (!pathMap[path]) {
            pathList.push(path)
            pathMap[path] = record
        }

        if (route.children) {
            route.children.forEach(child => {
                addRouteRecord(child, pathList, pathMap, record) // 每次循环子路由时，将父路由信息交给函数
            })
        }
    }
}