<template>
  <div class="flex justify-center items-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
    <div class="space-y-8 w-full max-w-md">
      <!-- 登录表单头部 -->
      <div>
        <div class="flex justify-center items-center mx-auto w-12 h-12 bg-blue-600 rounded-full">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">登录系统</h2>
        <p class="mt-2 text-sm text-center text-gray-600">
          或
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> 注册新账户 </a>
        </p>
      </div>

      <!-- 登录表单 -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email" class="sr-only">邮箱地址</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block relative px-3 py-2 w-full placeholder-gray-500 text-gray-900 rounded-t-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="邮箱地址"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block relative px-3 py-2 w-full placeholder-gray-500 text-gray-900 rounded-b-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="密码"
            />
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label for="remember-me" class="block ml-2 text-sm text-gray-900"> 记住我 </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> 忘记密码？ </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="flex relative justify-center px-4 py-2 w-full text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="flex absolute inset-y-0 left-0 items-center pl-3">
              <svg
                class="w-5 h-5 text-blue-500 group-hover:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>

        <!-- 错误消息 -->
        <div v-if="error" class="p-4 bg-red-50 rounded-md">
          <div class="flex">
            <div class="shrink-0">
              <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">登录失败</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

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

const handleLogin = async () => {
  if (!form.email || !form.password) {
    error.value = '请输入邮箱和密码'
    return
  }

  loading.value = true
  error.value = ''

  try {
    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 这里应该是实际的登录逻辑
    if (form.email === 'admin@example.com' && form.password === 'password') {
      // 登录成功，跳转到仪表板
      router.push('/')
    } else {
      error.value = '邮箱或密码错误'
    }
  } catch {
    error.value = '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 自定义样式 */
</style>
