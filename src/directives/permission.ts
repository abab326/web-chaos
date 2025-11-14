import type { Directive, DirectiveBinding } from 'vue'

type PermissionMode = 'any' | 'all'
export type PermissionChecker = (requiredPermissions: string[], mode: PermissionMode) => boolean

/**
 * 权限指令工厂函数
 * @param checker 权限检查函数
 * @returns 权限指令
 */
export function createPermissionDirective(
  checker?: PermissionChecker
): Directive<HTMLElement, string | string[]> {
  // 默认权限检查函数 (警告并允许访问)
  const permissionChecker =
    checker ||
    ((required, mode) => {
      console.warn('v-permission: 未提供权限检查函数，默认允许访问。')
      return true
    })

  const updatePermission = (el: HTMLElement, binding: DirectiveBinding<string | string[]>) => {
    const mode = (binding.arg as PermissionMode) || 'any'
    const requiredPermissions = Array.isArray(binding.value) ? binding.value : [binding.value]
    const hasPermission = permissionChecker(requiredPermissions, mode)

    if (!hasPermission) {
      // 默认模式：隐藏元素
      el.style.display = 'none'
      el.style.pointerEvents = 'none'
    } else {
      el.style.display = ''
      el.style.pointerEvents = ''
    }
  }

  return {
    mounted(el, binding) {
      updatePermission(el, binding)
    },

    updated(el, binding) {
      updatePermission(el, binding)
    },

    unmounted(el) {
      // 清理类名
      el.classList.remove('permission-disabled')
    },
  }
}

/**
 * 默认权限指令 (需配合 app.provide 或全局配置使用)
 * @directive v-permission
 * @param value 权限字符串或数组
 * @param arg 'any' (默认) | 'all' - 检查模式
 * @param modifiers.disable 禁用模式 (替代隐藏)
 */
export const permission = createPermissionDirective()
