import type { NavigationGuardWithThis } from 'vue-router'

// 2. 权限守卫
export const permissionGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
  console.log('permissionGuard', to, from)
  next()
}
