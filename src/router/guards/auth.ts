import type { NavigationGuardWithThis } from 'vue-router'
import { useUserStore } from '@/store/user'

// 1. 认证守卫
export const authGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}
