import type { NavigationGuardWithThis } from 'vue-router'
import { useUserStore } from '@/store/user'

// 1. 认证守卫
export const authGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
  console.log('authGuard', to, from)
  const userStore = useUserStore()
  if (to.meta.isAuth && !userStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }
  next()
}
