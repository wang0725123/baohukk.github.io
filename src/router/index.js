// history模式
import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'


const routes = [
    // 路由的默认路径
    {
        path: '/',
        redirect: "/login"
    },
    {
        path: '/login',
        component: () => import('../views/login.vue'),
    },
    {
        path: '/index',
        component: () => import('../views/index.vue'),
        children: [
            {
                path: '/',
                redirect: "/home"
            },
            {
                path: '/home',
                name: 'home页',
                component: () => import('../views/home.vue')
            },
            {
                path: '/about',
                name: 'about页',
                component: () => import('../views/about.vue')
            },
            {
                path: '/text',
                name: 'text页',
                component: () => import('../views/text.vue')
            }]

    },

]

// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        localStorage.removeItem('token')
    }
    document.title = '守护坤坤';
    next()
})
export default router;
