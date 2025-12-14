import type { RouteRecordRaw } from 'vue-router'

const formRoutes: RouteRecordRaw[] = [
  {
    path: '/form',
    name: 'Form',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/form/example',
    meta: { title: '表单', isAuth: true, icon: 'Document' },
    children: [
      {
        path: 'example',
        name: 'FormExample',
        component: () => import('@/views/FormExample.vue'),
        meta: { title: '基础表单', isAuth: true },
      },
      {
        path: 'dynamic-example',
        name: 'DynamicFormExample',
        component: () => import('@/views/DynamicFormExample.vue'),
        meta: { title: '动态表单', isAuth: true },
      },
      {
        path: 'test',
        name: 'FormTest',
        component: () => import('@/views/FormTest.vue'),
        meta: { title: '表单测试', isAuth: true },
      },
    ],
  },
]

export default formRoutes
