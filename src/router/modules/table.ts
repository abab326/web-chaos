import type { RouteRecordRaw } from 'vue-router';

const tableRoutes: RouteRecordRaw[] = [
  {
    path: '/table',
    name: 'Table',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/table/example',
    meta: {
      title: '表格',
      isAuth: false,
    },
    children: [
      {
        path: 'example',
        name: 'TableExample',
        component: () => import('@/views/table/TableExample.vue'),
        meta: {
          title: '基础表格',
          isAuth: false,
        },
      },
      {
        path: 'multi-header',
        name: 'MultiHeaderTableExample',
        component: () => import('@/views/table/MultiHeaderTableExample.vue'),
        meta: {
          title: '多表头表格',
          isAuth: false,
        },
      },
    ],
  },
];

export default tableRoutes;
