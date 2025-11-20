import type { Router } from 'vue-router'
import { authGuard } from './auth'
import { permissionGuard } from './permission'

// 注册路由守卫
export const registerRouterGuards = (router: Router) => {
  router.beforeEach(authGuard)
  router.beforeEach(permissionGuard)
}
