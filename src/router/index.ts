import { createRouter, createWebHistory } from 'vue-router'
// 静态路由
import { moduleRoutes } from './modules'
import { registerRouterGuards } from './guards'

const router = createRouter({
  history: createWebHistory(),
  routes: [...moduleRoutes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
// 注册路由守卫
registerRouterGuards(router)

export default router
