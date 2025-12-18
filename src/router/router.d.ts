declare module 'vue-router' {
  interface RouteMeta {
    title: string; // 页面标题
    isAuth: boolean; // 是否需要登录
    icon?: string; // 菜单图标
    isKeepAlive?: boolean; // 是否需要缓存
  }
}
export {};
