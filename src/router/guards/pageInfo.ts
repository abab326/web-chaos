import type { NavigationGuardWithThis } from 'vue-router'

// 页面信息守卫
export const pageInfoGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
  console.log('pageInfoGuard', to)
  const { meta } = to
  if (meta.title) {
    document.title = meta.title
  }
  next()
}
