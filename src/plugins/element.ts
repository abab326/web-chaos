import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

/**
 * Element Plus 插件配置
 */
export function setupElementPlus(app: App<Element>) {
  // 注册 Element Plus
  app.use(ElementPlus, {
    locale: zhCn,
    // 设置尺寸
    size: 'default' as const
  })

  // 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}