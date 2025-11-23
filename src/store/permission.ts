import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/menu'

export const usePermissionStore = defineStore('permission', () => {
  // 状态
  const permissions = ref<string[]>(['admin', 'user'])
  // 动态菜单
  const dynamicMenus = ref<MenuItem[]>([])
  // 动态路由
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const generateDynamicRoutesByMenus = (menus: MenuItem[]): RouteRecordRaw[] => {
    if (!menus || menus.length === 0) {
      return []
    }

    // 遍历菜单，生成动态路由
    return menus.map((menu) => {
      const route = {
        path: menu.path,
        name: menu.name,
        component: () => import(`@/views/${menu.component}.vue`),
        children: [] as RouteRecordRaw[],
        meta: {
          title: menu.name,
          icon: menu.icon,
        },
      }
      if (menu.children) {
        route['children'] = generateDynamicRoutesByMenus(menu.children) || []
      }
      return route as RouteRecordRaw
    })
    // 生成动态路由
  }

  // 方法
  const setPermissions = (newPermissions: string[]) => {
    permissions.value = newPermissions
  }
  // 设置动态菜单
  const setDynamicMenus = (newMenus: MenuItem[]) => {
    dynamicMenus.value = newMenus
    dynamicRoutes.value = generateDynamicRoutesByMenus(newMenus)
  }
  // 获取动态路由
  const getDynamicRoutes = () => {
    return dynamicRoutes.value
  }
  // 获取动态菜单
  const getDynamicMenus = () => {
    return dynamicMenus.value
  }

  return {
    permissions,
    dynamicMenus,
    dynamicRoutes,
    // action
    setPermissions,
    setDynamicMenus,
    getDynamicRoutes,
    getDynamicMenus,
  }
})
