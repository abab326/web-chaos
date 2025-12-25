import { createRouter, createWebHistory } from 'vue-router';

import { eventBus } from '@/plugins/eventBus';
// 静态路由
import constantRoutes from './modules/constants';
import { registerRouterGuards } from './guards';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...constantRoutes,
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/coal-power',
          name: 'coalPower',
          component: () => import('@/views/CoalPowerDashboard.vue'),
          meta: { title: '煤电生产运营平台', isAuth: true },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
// 注册路由守卫
registerRouterGuards(router);

eventBus.on('user:logout', (redirect) => {
  const currentPath = router.currentRoute.value.fullPath;
  if (!currentPath.startsWith('/login')) {
    router.replace({ name: 'login', query: { redirect: redirect || currentPath } });
  }
});

export default router;
