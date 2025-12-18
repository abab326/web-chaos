import type { App } from 'vue';
import { watermark } from './watermark';
import { permission, createPermissionDirective, type PermissionChecker } from './permission';

/**
 * 注册所有自定义指令
 */
export function registerDirectives(app: App) {
  app.directive('watermark', watermark);
  app.directive('permission', permission);
}

/**
 * 权限检查函数类型
 */
export type { PermissionChecker };

/**
 * 导出指令
 */
export { watermark, permission, createPermissionDirective };
