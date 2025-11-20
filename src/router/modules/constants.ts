import type { RouteRecordRaw } from 'vue-router'

// 常量路由
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', isAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面不存在', isAuth: false },
  },
]

export default constantRoutes
