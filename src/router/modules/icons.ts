import type { RouteRecordRaw } from 'vue-router';
const iconsRoutes: RouteRecordRaw = {
  path: '/icons',
  name: 'Icons',
  meta: {
    title: '图标方案',
    isAuth: true,
  },
  children: [
    {
      path: 'element-plus',
      name: 'ElementPlusIcons',
      component: () => import('@/views/icons/ElementPlusIcons.vue'),
      meta: {
        title: 'Element Plus 图标',
        isAuth: true,
      },
    },
    {
      path: 'lucide',
      name: 'LucideIcons',
      component: () => import('@/views/icons/LucideIcons.vue'),
      meta: {
        title: 'Lucide 图标',
        isAuth: true,
      },
    },
    {
      path: 'iconify-tailwind',
      name: 'IconifyTailwind',
      component: () => import('@/views/icons/IconifyTailwind.vue'),
      meta: {
        title: 'Iconify Tailwind',
        isAuth: true,
      },
    },
    {
      path: 'iconify-vue',
      name: 'IconifyVue',
      component: () => import('@/views/icons/IconifyVue.vue'),
      meta: {
        title: 'Iconify Vue',
        isAuth: true,
      },
    },
  ],
};

export default iconsRoutes;
