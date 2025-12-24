import { type RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/MainLayout.vue';

const charts: Array<RouteRecordRaw> = [
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/line',
    name: 'Charts',
    meta: {
      title: '图表管理',
      icon: 'icon-chart',
      isAuth: true,
    },
    children: [
      {
        path: 'line',
        name: 'LineChart',
        component: () => import('@/views/charts/LineChart.vue'),
        meta: { title: '折线图', icon: 'icon-line-chart', isAuth: true },
      },
      {
        path: 'bar',
        name: 'BarChart',
        component: () => import('@/views/charts/BarChart.vue'),
        meta: { title: '柱状图', icon: 'icon-bar-chart', isAuth: true },
      },
    ],
  },
];

export default charts;
