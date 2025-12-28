import type { NavigationGuardWithThis } from 'vue-router';
import { useUserStore } from '@/store/user';
import { usePermissionStore } from '@/store/permission';
import router from '@/router';

// 1. 认证守卫
export const authGuard: NavigationGuardWithThis<undefined> = async (to, from, next) => {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
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
  if (permissionStore.dynamicRoutes.length === 0) {
    try {
      // 加载菜单和动态路由
      await permissionStore.loadMenus();

      // 获取动态路由
      const dynamicRoutes = permissionStore.getDynamicRoutes();

      // 动态添加路由
      dynamicRoutes.forEach((route) => {
        router.addRoute('home', route);
      });

      next({ path: to.fullPath });
      return;
    } catch (error) {
      console.error('加载动态路由失败:', error);
      await userStore.logout();
      next({ name: 'Login', query: { redirect: to.fullPath } });
      return;
    }
  }

  // 已加载动态路由，直接放行
  next();
};
