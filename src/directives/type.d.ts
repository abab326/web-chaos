import { WatermarkDirective } from './watermark'
import { PermissionDirective } from './permission'

// 为模板中的指令提供类型支持
declare module 'vue' {
  interface ComponentCustomProperties {
    // 声明 v-watermark 指令
    vWatermark: WatermarkDirective
    // 声明 v-permission 指令
    vPermission: PermissionDirective
  }
}
