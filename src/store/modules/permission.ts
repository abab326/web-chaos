import { computed, ref, type Component } from 'vue';
import type { Router, RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import type { MenuItem } from '@/types/menu';

import MainLayout from '@/layouts/MainLayout.vue';

// 使用 import.meta.glob 动态导入所有视图组件
const modules = import.meta.glob('../../views/**/*.vue');

// 修正后的模拟菜单数据
const mockMenus: MenuItem[] = [
  {
    id: 1,
    path: '/main',
    name: 'main',
    component: 'layout', // 布局组件
    icon: 'Home',
    children: [
      {
        id: 2,
        path: '/dashboard',
        name: 'Dashboard',
        component: 'Dashboard', // 注意路径格式
        icon: 'home',
        children: [],
      },
    ],
  },
];

export const usePermissionStore = defineStore('permission', () => {
  // 状态
  const permissions = ref<string[]>(['admin', 'user']);
  // 动态菜单
  const dynamicMenus = ref<MenuItem[]>([]);
  // 动态菜单是否加载完成
  const dynamicMenusLoaded = computed(() => dynamicMenus.value.length > 0);

  // 存储已添加的路由名称，便于管理和移除
  const addedRouteNames = ref<string[]>([]);

  /**
   * 动态导入组件 - 修正版
   * @param componentPath 组件路径
   * @returns 组件导入函数
   */
  const dynamicImport = (componentPath: string): Component | (() => Promise<any>) => {
    // 处理布局组件
    if (componentPath === 'layout') {
      return MainLayout;
    }

    // 查找匹配的模块
    for (const key in modules) {
      // 将 key 转换为相对路径进行比较
      const normalizedKey = key.replace('../../views/', '');
      const normalizedPath = componentPath + '.vue';

      if (normalizedKey === normalizedPath) {
        return modules[key] as Component;
      }
    }

    // 如果没有找到，尝试模糊匹配
    const possiblePath = `../../views/${componentPath}.vue`;
    if (modules[possiblePath]) {
      return modules[possiblePath];
    }
    return () => import('@/views/NotFound.vue');
  };

  /**
   * 递归添加路由及其子路由
   */
  const addRouteRecursively = (router: Router, menu: MenuItem, parentName = ''): string | null => {
    if (!menu.name || !menu.component) {
      return null;
    }

    const routeName = menu.name.replace(/\s+/g, '');
    console.log('路由名称---1:', routeName);
    // 创建路由对象
    const route: RouteRecordRaw = {
      path: menu.path,
      name: routeName,
      component: dynamicImport(menu.component),
      redirect: menu.children ? menu.children[0]?.path : '',
      meta: {
        title: menu.name,
        isAuth: true,
        icon: menu.icon,
        isKeepAlive: true,
      },
      children: [],
    };

    try {
      // 添加路由到路由器
      if (parentName) {
        const isExist = router.hasRoute(parentName);
        console.log('父路由是否存在:', isExist, `${routeName} -> 父路由: ${parentName}`);

        if (isExist) {
          router.addRoute(parentName, route);
        }
      } else {
        router.addRoute(route);
      }

      // 记录已添加的路由
      addedRouteNames.value.push(routeName);

      // 递归处理子菜单
      if (menu.children && menu.children.length > 0) {
        menu.children.forEach((child) => {
          addRouteRecursively(router, child, routeName);
        });
      }

      return routeName;
    } catch (error) {
      console.error(`添加路由失败: ${routeName}`, error);
      return null;
    }
  };

  /**
   * 将菜单转换为路由 - 修正版
   */
  const generateDynamicRoutesByMenus = (menus: MenuItem[], router: Router) => {
    if (!menus || menus.length === 0) {
      return;
    }

    // 先清空之前添加的路由
    removeAllDynamicRoutes(router);

    // 遍历菜单，生成动态路由
    menus.forEach((menu) => {
      addRouteRecursively(router, menu);
    });
    setTimeout(() => {
      // 验证路由是否添加成功
      console.log('当前所有路由:', router.getRoutes());
    }, 1000 * 5);
  };

  /**
   * 移除所有动态添加的路由
   */
  const removeAllDynamicRoutes = (router: Router) => {
    addedRouteNames.value.forEach((name) => {
      if (router.hasRoute(name)) {
        router.removeRoute(name);
      }
    });
    addedRouteNames.value = [];
  };

  /**
   * 动态菜单转换为路由，并添加到路由实例中
   */
  const addDynamicRoutesToRouter = (router: Router) => {
    if (!dynamicMenusLoaded.value) {
      return;
    }

    generateDynamicRoutesByMenus(dynamicMenus.value, router);
  };

  /**
   * 加载菜单列表
   */
  const loadMenus = async () => {
    // 这里应该调用API获取菜单数据，暂时使用模拟数据
    dynamicMenus.value = mockMenus;

    return dynamicMenus.value;
  };

  /**
   * 获取动态菜单
   */
  const getDynamicMenus = () => {
    return dynamicMenus.value;
  };

  /**
   * 清空菜单和路由
   */
  const clearMenus = (router: Router) => {
    removeAllDynamicRoutes(router);
    dynamicMenus.value = [];
  };

  /**
   * 检查路由是否存在
   */
  const hasRoute = (router: Router, name: string) => {
    return router.hasRoute(name);
  };

  return {
    permissions,
    dynamicMenus,
    dynamicMenusLoaded,
    // action
    loadMenus,
    getDynamicMenus,
    addDynamicRoutesToRouter,
    clearMenus: () => clearMenus,
    hasRoute: (router: Router, name: string) => hasRoute(router, name),
  };
});
