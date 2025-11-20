import type { RouteRecordRaw } from 'vue-router'

const homeRoute: RouteRecordRaw = {
  path: '/',
  component: () => import('@/layouts/MainLayout.vue'),
  redirect: '/dashboard',
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { title: '仪表板', isAuth: true, icon: 'DataAnalysis' },
    },
    {
      path: 'users',
      name: 'Users',
      component: () => import('@/views/Users.vue'),
      meta: { title: '用户管理', icon: 'Camera' },
    },
    {
      path: 'settings',
      name: 'Settings',
      component: () => import('@/views/Settings.vue'),
      meta: { title: '系统设置', icon: 'Monitor' },
    },
    {
      path: 'table-example',
      name: 'TableExample',
      component: () => import('@/views/TableExample.vue'),
      meta: { title: '表格示例', icon: 'Tickets' },
    },
  ],
}

export default homeRoute
