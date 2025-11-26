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
      meta: { title: '仪表板', isAuth: true, icon: 'DataAnalysis', isKeepAlive: true },
    },
    {
      path: 'users',
      name: 'Users',
      component: () => import('@/views/Users.vue'),
      meta: { title: '用户管理', isAuth: true, icon: 'Camera', isKeepAlive: true },
    },
    {
      path: 'settings',
      name: 'Settings',
      component: () => import('@/views/Settings.vue'),
      meta: { title: '系统设置', isAuth: true, icon: 'Monitor', isKeepAlive: false },
    },
    {
      path: 'table-example',
      name: 'TableExample',
      component: () => import('@/views/TableExample.vue'),
      meta: { title: '表格示例', isAuth: true, icon: 'Tickets' },
    },
    {
      path: 'router-child',
      name: 'RouterChild',
      component: () => import('@/views/router-child/index.vue'),
      meta: { title: '路由子页面', isAuth: true, icon: 'Monitor', isKeepAlive: true },
      children: [
        {
          path: 'child',
          name: 'RouterChildChild',
          component: () => import('@/views/router-child/child.vue'),
          meta: { title: '路由子页面子页面', isAuth: true, icon: 'Monitor' },
        },
      ],
    },
  ],
}

export default homeRoute
