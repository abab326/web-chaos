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
      children: [],
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
  console.log('user:logout', redirect);
  const currentPath = router.currentRoute.value.fullPath;
  if (!currentPath.startsWith('/login')) {
    router.replace({ name: 'Login', query: { redirect: redirect || currentPath } });
  }
});

export default router;
