import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import permission from '@/router/modules/permission'
import user from '@/router/modules/user'
import { getAccessToken } from '@/utils/storage'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/home/index.vue'),
                meta: {
                    title: "首页",
                    requiresAuth: false
                }
            },
            user,
            permission
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: "登录",
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/index.vue'),
        meta: {
            title: "登录",
            requiresAuth: false
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 配置路由守卫
router.beforeEach((to, from, next) => {
    nprogress.start()
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = getAccessToken()
        if (token) {
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})
router.afterEach(() => {
    nprogress.done()
})

export default router