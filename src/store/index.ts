import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建pinia实例
const pinia = createPinia()

// 使用pinia插件
pinia.use(piniaPluginPersistedstate)

// 导出pinia插件
export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export default pinia
