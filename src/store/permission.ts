import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/menu'

// 模拟菜单数据
const mockMenus: MenuItem[] = [
  {
    id: 1,
    name: '仪表板',
    path: '/dashboard',
    component: 'Dashboard',
    icon: 'DataAnalysis',
  },
  {
    id: 2,
    name: '用户管理',
    path: '/users',
    component: 'Users',
    icon: 'Camera',
  },
  {
    id: 3,
    name: '系统设置',
    path: '/settings',
    component: 'Settings',
    icon: 'Monitor',
  },
  {
    id: 4,
    name: '表格示例',
    path: '/table-example',
    component: 'TableExample',
    icon: 'Tickets',
  },
  {
    id: 5,
    name: '路由子页面',
    path: '/router-child',
    component: 'router-child/index',
    icon: 'Monitor',
    children: [
      {
        id: 6,
        name: '路由子页面子页面',
        path: 'child',
        component: 'router-child/child',
        icon: 'Monitor',
      },
    ],
  },
]

export const usePermissionStore = defineStore('permission', () => {
  // 状态
  const permissions = ref<string[]>(['admin', 'user'])
  // 动态菜单
  const dynamicMenus = ref<MenuItem[]>([])
  // 动态路由
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  /**
   * 将菜单转换为路由
   */
  const generateDynamicRoutesByMenus = (menus: MenuItem[]): RouteRecordRaw[] => {
    if (!menus || menus.length === 0) {
      return []
    }

    // 遍历菜单，生成动态路由
    return menus.map((menu) => {
      const route: RouteRecordRaw = {
        path: menu.path,
        name: menu.name.replace(/\s+/g, ''),
        component: () => import(`@/views/${menu.component}.vue`),
        meta: {
          title: menu.name,
          isAuth: true,
          icon: menu.icon,
          isKeepAlive: true,
        },
        children: [],
      }

      if (menu.children && menu.children.length > 0) {
        route.children = generateDynamicRoutesByMenus(menu.children)
      }

      return route
    })
  }

  /**
   * 加载菜单列表
   */
  const loadMenus = async () => {
    // 这里应该调用API获取菜单数据，暂时使用模拟数据
    dynamicMenus.value = mockMenus

    // 将菜单转换为路由
    dynamicRoutes.value = generateDynamicRoutesByMenus(mockMenus)

    return dynamicMenus.value
  }

  /**
   * 设置权限列表
   */
  const setPermissions = (newPermissions: string[]) => {
    permissions.value = newPermissions
  }

  /**
   * 设置动态菜单
   */
  const setDynamicMenus = (newMenus: MenuItem[]) => {
    dynamicMenus.value = newMenus
    dynamicRoutes.value = generateDynamicRoutesByMenus(newMenus)
  }

  /**
   * 获取动态路由
   */
  const getDynamicRoutes = () => {
    return dynamicRoutes.value
  }

  /**
   * 获取动态菜单
   */
  const getDynamicMenus = () => {
    return dynamicMenus.value
  }

  /**
   * 清空菜单和路由
   */
  const clearMenus = () => {
    dynamicMenus.value = []
    dynamicRoutes.value = []
  }

  return {
    permissions,
    dynamicMenus,
    dynamicRoutes,
    // action
    loadMenus,
    setPermissions,
    setDynamicMenus,
    getDynamicRoutes,
    getDynamicMenus,
    clearMenus,
  }
})
