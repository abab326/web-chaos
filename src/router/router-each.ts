import type {
  NavigationGuardNext,
  NavigationGuardWithThis,
  NavigationHookAfter,
  Router,
} from 'vue-router'
import { useUserStore } from '@/store/user'
// 白名单，不需要登录即可访问的路由
const WHITE_LIST = ['/login', '/404', '/401']

const navToLogin = (next: NavigationGuardNext) => {
  next({ path: '/login' })
}

// 路由前置守卫
const beforeEach: NavigationGuardWithThis<undefined> = (to, from, next) => {
  // 白名单直接放行
  if (WHITE_LIST.includes(to.path)) {
    next()
    return
  }
  const userStore = useUserStore()
  console.log('userStore.isLoggedIn', userStore.isLoggedIn)
  // 用户未登录，重定向到登录页
  if (!userStore.isLoggedIn) {
    navToLogin(next)
    return
  }

  next()
}
// 路由后置守卫
const afterEach: NavigationHookAfter = (to, from) => {
  // TODO 路由后置守卫
  console.log('afterEach', to, from)
}

// 注册路由守卫
export const registerRouterEach = (router: Router) => {
  router.beforeEach(beforeEach)
  router.afterEach(afterEach)
}
