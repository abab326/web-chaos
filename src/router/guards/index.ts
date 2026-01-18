import type { Router } from 'vue-router';
import { authGuard } from './auth';

// 注册路由守卫
export const registerRouterGuards = (router: Router) => {
  router.beforeEach(authGuard);
};
