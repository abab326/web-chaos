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

  // 方法
  function setPermissions(newPermissions: string[]) {
    permissions.value = newPermissions
  }
  // 设置动态菜单
  function setDynamicMenus(newMenus: MenuItem[]) {
    dynamicMenus.value = newMenus
  }
  // 设置动态路由
  function setDynamicRoutes(newRoutes: RouteRecordRaw[]) {
    dynamicRoutes.value = newRoutes
  }
  return {
    permissions,
    dynamicMenus,
    dynamicRoutes,
    // action
    setPermissions,
    setDynamicMenus,
    setDynamicRoutes,
  }
})
