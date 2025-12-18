import type { RouteRecordRaw } from 'vue-router';

const homeRoute: RouteRecordRaw = {
  path: '/',
  name: 'home',
  component: () => import('@/layouts/MainLayout.vue'),
  redirect: '/dashboard',
  children: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/system/Dashboard.vue'),
      meta: { title: '控制台', isAuth: true },
    },
  ],
};

export default homeRoute;
