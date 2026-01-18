import type { NavigationGuardWithThis } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import router from '@/router';

// 1. 认证守卫
export const authGuard: NavigationGuardWithThis<undefined> = async (to, from, next) => {
  const userStore = useUserStore();

  console.log('authGuard', to, from);
  // 如果是登录页，且当前页面是登录页,不进行跳转
  if (
    to.name === 'Login' &&
    (from.name === 'Login' || router.currentRoute.value.name === 'Login')
  ) {
    return;
  }
  // 如果是登录页，直接放行
  if (to.name === 'Login') {
    next();
    return;
  }
  // 如果没有登录，跳转到登录页
  if (!userStore.isLoggedIn) {
    next({ name: 'Login' });
    return;
  }
  // 如果已经登录，检查是否已经加载了动态路由

  // 已加载动态路由，直接放行
  next();
};
