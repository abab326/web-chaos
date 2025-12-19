import { ref, type Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import type { MenuItem } from '@/types/menu';

// 模拟菜单数据
const mockMenus: MenuItem[] = [
  {
    id: 1,
    name: '控制台',
    path: '/dashboard',
    component: 'system/Dashboard',
    icon: 'DataAnalysis',
  },
  {
    id: 2,
    name: '系统管理',
    path: '/system',
    component: 'layout',
    icon: 'Setting',
    children: [
      {
        id: 3,
        name: '用户管理',
        path: '/system/users',
        component: 'system/Users',
        icon: 'Camera',
      },
      {
        id: 4,
        name: '系统设置',
        path: '/system/settings',
        component: 'system/Settings',
        icon: 'Monitor',
      },
    ],
  },
  {
    id: 5,
    name: '表格',
    path: '/table',
    component: 'layout',
    icon: 'Tickets',
    children: [
      {
        id: 6,
        name: '基础表格',
        path: '/table/example',
        component: 'table/TableExample',
        icon: 'Document',
      },
      {
        id: 7,
        name: '多表头表格',
        path: '/table/multi-header',
        component: 'table/MultiHeaderTableExample',
        icon: 'Document',
      },
    ],
  },
  {
    id: 8,
    name: '表单',
    path: '/form',
    component: 'layout',
    icon: 'Document',
    children: [
      {
        id: 9,
        name: '基础表单',
        path: '/form/example',
        component: 'form/FormExample',
        icon: 'Document',
      },
      {
        id: 10,
        name: '动态表单',
        path: '/form/dynamic-example',
        component: 'form/DynamicFormExample',
        icon: 'Document',
      },
      {
        id: 11,
        name: '表单测试',
        path: '/form/test',
        component: 'form/FormTest',
        icon: 'Document',
      },
    ],
  },
  {
    id: 12,
    name: '媒体中心',
    path: '/media',
    component: 'layout',
    icon: 'VideoCamera',
    children: [
      {
        id: 13,
        name: '视频播放',
        path: '/media/video',
        component: 'media/index',
        icon: 'VideoPlay',
      },
    ],
  },
  {
    id: 14,
    name: '图标方案',
    path: '/icons',
    component: 'layout',
    icon: 'ElementPlus',
    children: [
      {
        id: 15,
        name: 'Element Plus 图标',
        path: '/icons/element-plus',
        component: 'icons/ElementPlusIcons',
        icon: 'ElementPlus',
      },
      {
        id: 16,
        name: 'Lucide 图标',
        path: '/icons/lucide',
        component: 'icons/LucideIcons',
        icon: 'Lucide',
      },
      {
        id: 17,
        name: 'Iconify Tailwind',
        path: '/icons/iconify-tailwind',
        component: 'icons/IconifyTailwind',
        icon: 'Tailwind',
      },
      {
        id: 18,
        name: 'Iconify Vue',
        path: '/icons/iconify-vue',
        component: 'icons/IconifyVue',
        icon: 'Iconify',
      },
    ],
  },
];

export const usePermissionStore = defineStore('permission', () => {
  // 状态
  const permissions = ref<string[]>(['admin', 'user']);
  // 动态菜单
  const dynamicMenus = ref<MenuItem[]>([]);
  // 动态路由
  const dynamicRoutes = ref<RouteRecordRaw[]>([]);

  // 使用 import.meta.glob 动态导入所有视图组件
  const modules = import.meta.glob('../views/**/*.vue');
  console.log('modules', modules);
  /**
   * 动态导入组件
   * @param componentPath 组件路径
   * @returns 组件导入函数
   */
  const dynamicImport = (componentPath: string): Component | null => {
    // 处理布局组件
    if (componentPath === 'layout') {
      return null;
    }

    // 构造组件的完整路径
    const fullPath = `../views/${componentPath}.vue`;

    // 检查组件是否存在
    if (modules[fullPath]) {
      return modules[fullPath];
    }

    // 如果找不到对应的组件，返回一个空的 Promise
    return () => Promise.reject(new Error(`无法找到组件: ${fullPath}`));
  };

  /**
   * 将菜单转换为路由
   */
  const generateDynamicRoutesByMenus = (menus: MenuItem[]): RouteRecordRaw[] => {
    if (!menus || menus.length === 0) {
      return [];
    }

    // 遍历菜单，生成动态路由
    return menus.map((menu) => {
      const route: RouteRecordRaw = {
        path: menu.path,
        name: menu.name.replace(/\s+/g, ''),
        component: dynamicImport(menu.component),
        meta: {
          title: menu.name,
          isAuth: true,
          icon: menu.icon,
          isKeepAlive: true,
        },
        children: [],
      };

      if (menu.children && menu.children.length > 0) {
        route.children = menu.children.map((child) => ({
          path: child.path,
          name: child.name.replace(/\s+/g, ''),
          component: dynamicImport(child.component),
          meta: {
            title: child.name,
            isAuth: true,
            icon: child.icon,
            isKeepAlive: true,
          },
          children: [],
        }));
      }

      return route;
    });
  };

  /**
   * 加载菜单列表
   */
  const loadMenus = async () => {
    // 这里应该调用API获取菜单数据，暂时使用模拟数据
    dynamicMenus.value = mockMenus;

    // 将菜单转换为路由
    dynamicRoutes.value = generateDynamicRoutesByMenus(mockMenus);

    return dynamicMenus.value;
  };

  /**
   * 设置权限列表
   */
  const setPermissions = (newPermissions: string[]) => {
    permissions.value = newPermissions;
  };

  /**
   * 设置动态菜单
   */
  const setDynamicMenus = (newMenus: MenuItem[]) => {
    dynamicMenus.value = newMenus;
    dynamicRoutes.value = generateDynamicRoutesByMenus(newMenus);
  };

  /**
   * 获取动态路由
   */
  const getDynamicRoutes = () => {
    return dynamicRoutes.value;
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
  const clearMenus = () => {
    dynamicMenus.value = [];
    dynamicRoutes.value = [];
  };

  return {
    permissions,
    dynamicMenus,
    dynamicRoutes,
    // action
    loadMenus,
    setPermissions,
    setDynamicMenus,
    getDynamicRoutes,
    getDynamicMenus,
    clearMenus,
  };
});
