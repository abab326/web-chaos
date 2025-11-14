<template>
  <div class="flex justify-center items-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
    <div class="space-y-8 w-full max-w-md">
      <!-- 登录表单头部 -->
      <div class="text-center">
        <el-avatar :size="48" class="mx-auto bg-blue-600">
          <el-icon><Lock /></el-icon>
        </el-avatar>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">登录系统</h2>
        <p class="mt-2 text-sm text-gray-600">
          或
          <el-link type="primary" href="#" class="font-medium">注册新账户</el-link>
        </p>
      </div>

      <!-- 登录表单 -->
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="mt-8 space-y-6"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            type="email"
            size="large"
            placeholder="邮箱地址"
            :prefix-icon="Message"
            autocomplete="email"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            size="large"
            placeholder="密码"
            :prefix-icon="Lock"
            autocomplete="current-password"
            show-password
          />
        </el-form-item>

        <div class="flex justify-between items-center">
          <el-checkbox v-model="form.rememberMe" label="记住我" />
          <el-link type="primary" href="#" class="text-sm">忘记密码？</el-link>
        </div>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            native-type="submit"
            class="w-full"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>

        <!-- 错误消息 -->
        <el-alert v-if="error" :title="error" type="error" show-icon :closable="false" />
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, Message } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

const form = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: false,
})

const loading = ref(false)
const error = ref('')
const formRef = ref<FormInstance>()

// 表单验证规则
const rules = reactive<FormRules<LoginForm>>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
})

const handleLogin = async () => {
  if (!formRef.value) return

  try {
    const valid = await formRef.value.validate()
    if (!valid) return

    loading.value = true
    error.value = ''

    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 这里应该是实际的登录逻辑
    if (form.email === 'admin@example.com' && form.password === 'password') {
      // 登录成功，跳转到仪表板
      router.push('/')
    } else {
      error.value = '邮箱或密码错误'
    }
  } catch (err) {
    // 表单验证失败
    if (err instanceof Error && err.message.includes('validation')) {
      error.value = '请检查表单输入'
    } else {
      error.value = '登录失败，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 自定义样式 */
</style>
