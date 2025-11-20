import type { NavigationGuardWithThis } from 'vue-router'
import { useUserStore } from '@/store/user'

// 2. 权限守卫
export const permissionGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
  console.log('permissionGuard', to, from)
  const userStore = useUserStore()
  const menuList = userStore.getMenuList()
  const { path, meta } = to
  // 检查路由是否在菜单列表中，且是否有权限
  const isInMenu = menuList.some((item) => item.path === path)
  if (meta?.permission && !isInMenu) {
    next({ name: '404' })
  } else {
    next()
  }
}
