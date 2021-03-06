import Vue from 'vue'
import Router from '@/vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        
        {
            path: '/about',
            name: 'about',
            component: About,
            children: [
                {path: 'a', component: {
                    render() {
                        return <h1>about a</h1>
                    }
                }},
                {path: 'b', component: {
                    render() {
                        return <h1>about b</h1>
                    }
                }}
            ]
        }
    ]
})