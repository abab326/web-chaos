import type { NavigationGuardWithThis } from 'vue-router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'

// 1. 认证守卫
export const authGuard: NavigationGuardWithThis<undefined> = async (to, from, next) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  // 如果是公开路由，直接放行
  if (!to.meta.isAuth) {
    next()
    return
  }

  // 如果没有登录，跳转到登录页
  if (!userStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // 如果已经登录，检查是否已经加载了动态路由
  if (permissionStore.dynamicRoutes.length === 0) {
    try {
      // 加载菜单和动态路由
      await permissionStore.loadMenus()

      // 获取动态路由
      const dynamicRoutes = permissionStore.getDynamicRoutes()

      // 动态添加路由
      dynamicRoutes.forEach((route) => {
        to.matched[0]?.children?.push(route)
      })

      // 重新导航到当前路径，确保路由已加载
      next({ ...to, replace: true })
      return
    } catch (error) {
      console.error('加载动态路由失败:', error)
      // 加载失败，退出登录
      await userStore.logout()
      next({ name: 'Login', query: { redirect: to.fullPath } })
      return
    }
  }

  // 已加载动态路由，直接放行
  next()
}
