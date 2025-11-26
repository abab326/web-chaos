import type { RouteRecordRaw } from 'vue-router'

const homeRoute: RouteRecordRaw = {
  path: '/',
  name: 'home',
  component: () => import('@/layouts/MainLayout.vue'),
  redirect: '/dashboard',
  children: [],
}

export default homeRoute
