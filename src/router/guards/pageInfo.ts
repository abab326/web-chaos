import type { NavigationHookAfter } from 'vue-router'

// 页面信息守卫
export const pageInfoGuard: NavigationHookAfter = (to) => {
  console.log('pageInfoGuard', to)
  const { meta } = to
  if (meta.title) {
    document.title = meta.title
  }
}
