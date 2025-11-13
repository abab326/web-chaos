<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">系统设置</h1>
      <p class="mt-1 text-gray-600">管理系统配置和参数</p>
    </div>

    <!-- 设置选项卡 -->
    <div class="bg-white rounded-lg shadow">
      <div class="border-b border-gray-200">
        <nav class="flex px-6 -mb-px space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-1 py-4 text-sm font-medium border-b-2"
            :class="
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            "
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <div class="p-6">
        <!-- 基本设置 -->
        <div v-if="activeTab === 'general'">
          <h3 class="mb-4 text-lg font-semibold text-gray-900">基本设置</h3>
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-700">系统名称</label>
                <input
                  type="text"
                  v-model="settings.general.siteName"
                  class="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-700">系统版本</label>
                <input
                  type="text"
                  v-model="settings.general.version"
                  class="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readonly
                />
              </div>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">系统描述</label>
              <textarea
                v-model="settings.general.description"
                rows="3"
                class="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="settings.general.maintenanceMode"
                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label class="block ml-2 text-sm text-gray-900">维护模式</label>
            </div>
          </div>
        </div>

        <!-- 安全设置 -->
        <div v-if="activeTab === 'security'">
          <h3 class="mb-4 text-lg font-semibold text-gray-900">安全设置</h3>
          <div class="space-y-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700">密码策略</label>
              <select
                v-model="settings.security.passwordPolicy"
                class="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">低强度</option>
                <option value="medium">中强度</option>
                <option value="high">高强度</option>
              </select>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="settings.security.twoFactorAuth"
                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label class="block ml-2 text-sm text-gray-900">启用双因素认证</label>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="settings.security.loginAttempts"
                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label class="block ml-2 text-sm text-gray-900">限制登录尝试次数</label>
            </div>

            <div v-if="settings.security.loginAttempts">
              <label class="block mb-2 text-sm font-medium text-gray-700">最大登录尝试次数</label>
              <input
                type="number"
                v-model="settings.security.maxLoginAttempts"
                min="1"
                max="10"
                class="px-3 py-2 w-32 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- 通知设置 -->
        <div v-if="activeTab === 'notifications'">
          <h3 class="mb-4 text-lg font-semibold text-gray-900">通知设置</h3>
          <div class="space-y-6">
            <div class="flex justify-between items-center">
              <div>
                <label class="block text-sm font-medium text-gray-900">邮件通知</label>
                <p class="text-sm text-gray-500">接收系统邮件通知</p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notifications.email"
                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>

            <div class="flex justify-between items-center">
              <div>
                <label class="block text-sm font-medium text-gray-900">系统消息</label>
                <p class="text-sm text-gray-500">接收系统内部消息</p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notifications.system"
                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>

            <div class="flex justify-between items-center">
              <div>
                <label class="block text-sm font-medium text-gray-900">安全警报</label>
                <p class="text-sm text-gray-500">接收安全相关警报</p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notifications.security"
                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end mt-6 space-x-3">
          <button
            @click="resetSettings"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
          >
            重置
          </button>
          <button
            @click="saveSettings"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Tab {
  id: string
  name: string
}

interface Settings {
  general: {
    siteName: string
    version: string
    description: string
    maintenanceMode: boolean
  }
  security: {
    passwordPolicy: string
    twoFactorAuth: boolean
    loginAttempts: boolean
    maxLoginAttempts: number
  }
  notifications: {
    email: boolean
    system: boolean
    security: boolean
  }
}

const tabs = ref<Tab[]>([
  { id: 'general', name: '基本设置' },
  { id: 'security', name: '安全设置' },
  { id: 'notifications', name: '通知设置' },
])

const activeTab = ref('general')

const settings = reactive<Settings>({
  general: {
    siteName: 'Web Chaos Admin',
    version: '1.0.0',
    description: '基于 Vue 3.5 + Vite 7 + TypeScript 的现代化后台管理系统',
    maintenanceMode: false,
  },
  security: {
    passwordPolicy: 'medium',
    twoFactorAuth: false,
    loginAttempts: true,
    maxLoginAttempts: 5,
  },
  notifications: {
    email: true,
    system: true,
    security: true,
  },
})

const saveSettings = () => {
  // 这里应该调用 API 保存设置
  console.log('保存设置:', settings)
  alert('设置已保存')
}

const resetSettings = () => {
  // 重置为默认设置
  Object.assign(settings, {
    general: {
      siteName: 'Web Chaos Admin',
      version: '1.0.0',
      description: '基于 Vue 3.5 + Vite 7 + TypeScript 的现代化后台管理系统',
      maintenanceMode: false,
    },
    security: {
      passwordPolicy: 'medium',
      twoFactorAuth: false,
      loginAttempts: true,
      maxLoginAttempts: 5,
    },
    notifications: {
      email: true,
      system: true,
      security: true,
    },
  })
  alert('设置已重置')
}
</script>

<style scoped>
/* 自定义样式 */
</style>
