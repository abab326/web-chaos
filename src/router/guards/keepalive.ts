import type { NavigationGuardWithThis } from 'vue-router';
import { useKeepAliveStore } from '@/store/modules/keepalive';
// 缓存守卫
export const keepAliveGuard: NavigationGuardWithThis<undefined> = (to, _from, next) => {
  const keepAliveStore = useKeepAliveStore();
  if (to.meta.isKeepAlive) {
    keepAliveStore.addCached(to.name as string);
  } else {
    keepAliveStore.removeCached(to.name as string);
  }
  next();
};
