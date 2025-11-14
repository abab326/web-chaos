import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
  // 状态
  const permissions = ref<string[]>(['admin', 'user'])

  // 方法
  function setPermissions(newPermissions: string[]) {
    permissions.value = newPermissions
  }

  return {
    permissions,
    setPermissions,
  }
})
