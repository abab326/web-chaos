import { type RouteRecordRaw } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

/**
 * 媒体路由模块
 */
export const mediaRoutes: RouteRecordRaw[] = [
  {
    path: '/media',
    name: 'media',
    component: MainLayout,
    redirect: '/media/video',
    meta: {
      title: '媒体中心',
      isAuth: true,
    },
    children: [
      {
        path: '/media/video',
        name: 'VideoDemo',
        component: () => import('@/views/media/VideoDemo.vue'),
        meta: {
          title: '视频播放',
          isAuth: true,
        },
      },
    ],
  },
];

export default mediaRoutes;
