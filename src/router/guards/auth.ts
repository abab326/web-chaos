import type { NavigationGuardWithThis } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/permission';
import router from '@/router';

// 1. 认证守卫
export const authGuard: NavigationGuardWithThis<undefined> = async (to, from) => {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  // 如果是登录页，且当前页面是登录页,不进行跳转
  if (
    to.name === 'Login' &&
    (from.name === 'Login' || router.currentRoute.value.name === 'Login')
  ) {
    return false;
  }
  // 如果是登录页，直接放行
  if (to.name === 'Login') {
    return true;
  }
  // 未加载用户信息
  if (!userStore.isLogged) {
    const result = await userStore.getUserInfoByNetwork();
    if (!result) {
      return { name: 'Login', replace: true };
    }
  }
  // 是否已经加载了动态路由
  if (permissionStore.dynamicMenus.length === 0) {
    await permissionStore.loadMenus();

    if (!permissionStore.dynamicMenusLoaded) {
      return { name: 'Login', replace: true };
    }
    permissionStore.addDynamicRoutesToRouter(router);
    return { path: to.path, query: to.query };
  }
  // 已加载动态路由，直接放行
  return true;
};
