import type { Directive, DirectiveBinding } from 'vue';

import { usePermissionStore } from '@/store/modules/permission';

type PermissionMode = 'any' | 'all';
export type PermissionChecker = (requiredPermissions: string[], mode: PermissionMode) => boolean;

export type PermissionDirective = Directive<HTMLElement, string | string[]>;

/**
 * 默认权限检查函数
 * @param requiredPermissions 所需权限数组
 * @param mode 检查模式 ('any' 或 'all')
 * @returns 是否有权限
 */
const defaultPermissionChecker: PermissionChecker = (requiredPermissions, mode) => {
  const permissionStore = usePermissionStore();
  const userPermissions = permissionStore.permissions;
  console.warn('v-permission: 未提供权限检查函数，默认使用全局权限检查函数。');
  if (mode === 'any') {
    return requiredPermissions.some((permission: string) => userPermissions.includes(permission));
  } else if (mode === 'all') {
    return requiredPermissions.every((permission: string) => userPermissions.includes(permission));
  }
  return false;
};
/**
 * 权限指令工厂函数
 * @param checker 权限检查函数
 * @returns 权限指令
 */
export function createPermissionDirective(checker?: PermissionChecker): PermissionDirective {
  // 默认权限检查函数 (警告并允许访问)
  const permissionChecker = checker || defaultPermissionChecker;

  const updatePermission = (el: HTMLElement, binding: DirectiveBinding<string | string[]>) => {
    console.log('updatePermission', binding);
    const mode = (binding.arg as PermissionMode) || 'any';
    const requiredPermissions = Array.isArray(binding.value) ? binding.value : [binding.value];
    const hasPermission = permissionChecker(requiredPermissions, mode);

    if (!hasPermission) {
      // 默认模式：隐藏元素
      el.style.display = 'none';
      el.style.pointerEvents = 'none';
    } else {
      el.style.display = '';
      el.style.pointerEvents = '';
    }
  };

  return {
    mounted(el, binding) {
      updatePermission(el, binding);
    },

    updated(el, binding) {
      updatePermission(el, binding);
    },

    unmounted(el) {
      // 清理类名
      el.classList.remove('permission-disabled');
    },
  };
}

/**
 * 默认权限指令 (需配合 app.provide 或全局配置使用)
 * @directive v-permission
 * @param value 权限字符串或数组
 * @param arg 'any' (默认) | 'all' - 检查模式
 * @param modifiers.disable 禁用模式 (替代隐藏)
 */
export const permission = createPermissionDirective();
