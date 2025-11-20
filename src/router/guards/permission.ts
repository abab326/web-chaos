import type { NavigationGuardWithThis } from 'vue-router'
import { useUserStore } from '@/store/user'

// 2. 权限守卫
export const permissionGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
  const userStore = useUserStore()

  next()
}
