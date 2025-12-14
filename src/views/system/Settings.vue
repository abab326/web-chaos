<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">系统设置</h1>
      <p class="mt-1 text-gray-600">管理系统配置和参数</p>
    </div>

    <!-- 设置选项卡 -->
    <el-card>
      <el-tabs v-model="activeTab" class="mt-4">
        <el-tab-pane v-for="tab in tabs" :key="tab.id" :label="tab.name" :name="tab.id">
          <div class="p-2">
            <!-- 基本设置 -->
            <div v-if="activeTab === 'general'">
              <h3 class="mb-4 text-lg font-semibold text-gray-900">基本设置</h3>
              <el-form :model="settings.general" label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="系统名称">
                      <el-input v-model="settings.general.siteName" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="系统版本">
                      <el-input v-model="settings.general.version" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="系统描述">
                  <el-input v-model="settings.general.description" type="textarea" :rows="3" />
                </el-form-item>

                <el-form-item label="维护模式">
                  <el-switch v-model="settings.general.maintenanceMode" />
                </el-form-item>
              </el-form>
            </div>

            <!-- 安全设置 -->
            <div v-if="activeTab === 'security'">
              <h3 class="mb-4 text-lg font-semibold text-gray-900">安全设置</h3>
              <el-form :model="settings.security" label-width="120px">
                <el-form-item label="密码策略">
                  <el-select v-model="settings.security.passwordPolicy">
                    <el-option label="低强度" value="low" />
                    <el-option label="中强度" value="medium" />
                    <el-option label="高强度" value="high" />
                  </el-select>
                </el-form-item>

                <el-form-item label="启用双因素认证">
                  <el-switch v-model="settings.security.twoFactorAuth" />
                </el-form-item>

                <el-form-item label="限制登录尝试次数">
                  <el-switch v-model="settings.security.loginAttempts" />
                </el-form-item>

                <el-form-item v-if="settings.security.loginAttempts" label="最大登录尝试次数">
                  <el-input-number
                    v-model="settings.security.maxLoginAttempts"
                    :min="1"
                    :max="10"
                  />
                </el-form-item>
              </el-form>
            </div>

            <!-- 通知设置 -->
            <div v-if="activeTab === 'notifications'">
              <h3 class="mb-4 text-lg font-semibold text-gray-900">通知设置</h3>
              <el-form :model="settings.notifications" label-width="120px">
                <el-form-item label="邮件通知">
                  <el-switch v-model="settings.notifications.email" />
                  <div class="text-sm text-gray-500 ml-2">接收系统邮件通知</div>
                </el-form-item>

                <el-form-item label="系统消息">
                  <el-switch v-model="settings.notifications.system" />
                  <div class="text-sm text-gray-500 ml-2">接收系统内部消息</div>
                </el-form-item>

                <el-form-item label="安全警报">
                  <el-switch v-model="settings.notifications.security" />
                  <div class="text-sm text-gray-500 ml-2">接收安全相关警报</div>
                </el-form-item>
              </el-form>
            </div>

            <!-- 操作按钮 -->
            <div class="flex justify-end mt-6 space-x-3">
              <el-button @click="resetSettings">重置</el-button>
              <el-button type="primary" @click="saveSettings">保存设置</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

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

defineOptions({ name: 'Settings' })

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
  ElMessage.success('设置已保存')
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
  ElMessage.info('设置已重置')
}
</script>

<style scoped></style>
