import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import permission from '@/router/modules/permission'
import user from '@/router/modules/user'

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
                    title: "首页"
                }
            },
            user,
            permission
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 配置路由守卫
router.beforeEach((to, from, next) => {
    nprogress.start()
    const token = localStorage.getItem('token');
  
    // 检查 token 是否存在
    if (token) {
        // Token 存在，继续导航
        next();
    } else {
        // Token 不存在或失效
        if (to.name !== 'login') {
            // 如果当前不是在登录页，重定向到登录页
            next({ name: 'login' });
        } else {
        // 如果已经在登录页，正常导航
            next();
        }
    }
})
router.afterEach(() => {
    nprogress.done()
})

export default router