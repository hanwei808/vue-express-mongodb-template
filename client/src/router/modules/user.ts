import { RouteRecordRaw, RouterView } from "vue-router";

const routers: RouteRecordRaw = {
    path: '/user',
    name: 'user',
    component: RouterView,
    meta: {
        title: '用户管理'
    },
    children: [
        {
            path: 'user_info',
            name: 'user_info',
            component: () => import('@/views/user/userInfo/index.vue'),
            meta: {
                title: '个人中心',
                requiresAuth: true
            }
        },
    ]
}

export default routers