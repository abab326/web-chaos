<template>
  <div
    class="flex justify-center items-center px-4 py-12 min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 sm:px-6 lg:px-8"
  >
    <div class="space-y-8 w-full max-w-md">
      <!-- 登录表单头部 -->
      <div class="text-center">
        <div
          class="mx-auto flex justify-center items-center w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg"
        >
          <el-icon :size="32" class="text-white"><Lock /></el-icon>
        </div>
        <h1 class="mt-6 text-3xl font-bold text-gray-900 tracking-tight">欢迎登录</h1>
        <p class="mt-2 text-sm text-gray-600">请输入您的账户信息以继续</p>
      </div>

      <!-- 登录表单 -->
      <div
        class="bg-white rounded-xl shadow-lg p-8 sm:p-10 transition-all duration-300 hover:shadow-xl"
      >
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          class="space-y-6"
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
              @input="handleEmailInput"
            />
            <div v-if="emailError" class="mt-1 text-sm text-red-500">{{ emailError }}</div>
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
              @input="handlePasswordInput"
            />
            <div class="mt-2">
              <div class="flex justify-between items-center">
                <div class="text-xs text-gray-500">
                  密码强度:
                  <span :class="passwordStrengthClass">{{ passwordStrengthText }}</span>
                </div>
                <el-link type="primary" href="#" class="text-xs">忘记密码？</el-link>
              </div>
              <div class="mt-1 w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  class="h-full transition-all duration-300 rounded-full"
                  :class="passwordStrengthBarClass"
                  :style="{ width: passwordStrengthWidth }"
                ></div>
              </div>
            </div>
          </el-form-item>

          <div class="flex justify-between items-center">
            <el-checkbox v-model="form.rememberMe" label="记住我" />
          </div>

          <!-- 验证码 -->
          <el-form-item v-if="showCaptcha" prop="captcha">
            <div class="flex space-x-2">
              <el-input
                v-model="form.captcha"
                size="large"
                placeholder="验证码"
                :prefix-icon="Key"
                class="flex-1"
              />
              <div
                class="flex items-center justify-center w-32 h-12 bg-gray-100 rounded-md cursor-pointer"
                @click="refreshCaptcha"
              >
                <span class="text-sm font-mono text-gray-700">{{ captchaText }}</span>
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              native-type="submit"
              class="w-full rounded-lg font-medium transition-all duration-300 hover:shadow-md"
              :disabled="isFormInvalid"
            >
              {{ loading ? '登录中...' : '登录' }}
            </el-button>
          </el-form-item>

          <!-- 错误消息 -->
          <el-alert
            v-if="error"
            :title="error"
            type="error"
            show-icon
            :closable="false"
            class="rounded-lg"
          />

          <!-- 注册链接 -->
          <div class="text-center text-sm text-gray-600">
            还没有账户？
            <el-link type="primary" href="#" class="font-medium">立即注册</el-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { login } from '@/api/user'
import { Lock, Message, Key } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

const form = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: false,
})

const loading = ref(false)
const error = ref('')
const formRef = ref<FormInstance>()
const emailError = ref('')
const failedAttempts = ref(0)
const showCaptcha = ref(false)
const captchaText = ref('')

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
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

// 密码强度计算
const passwordStrength = computed(() => {
  const password = form.password
  if (!password) return 0

  let strength = 0
  // 长度检查
  if (password.length >= 6) strength += 1
  if (password.length >= 10) strength += 1
  // 复杂度检查
  if (/[a-z]/.test(password)) strength += 1
  if (/[A-Z]/.test(password)) strength += 1
  if (/\d/.test(password)) strength += 1
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1

  return Math.min(strength, 5)
})

// 密码强度文本
const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return '无'
  if (strength <= 2) return '弱'
  if (strength <= 4) return '中'
  return '强'
})

// 密码强度类名
const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return 'text-gray-500'
  if (strength <= 2) return 'text-red-500'
  if (strength <= 4) return 'text-yellow-500'
  return 'text-green-500'
})

// 密码强度条类名
const passwordStrengthBarClass = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return 'bg-gray-300'
  if (strength <= 2) return 'bg-red-500'
  if (strength <= 4) return 'bg-yellow-500'
  return 'bg-green-500'
})

// 密码强度宽度
const passwordStrengthWidth = computed(() => {
  return `${passwordStrength.value * 20}%`
})

// 表单是否无效
const isFormInvalid = computed(() => {
  return !form.email || !form.password || (showCaptcha.value && !form.captcha)
})

// 处理邮箱输入
const handleEmailInput = () => {
  // 简单的邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (form.email && !emailRegex.test(form.email)) {
    emailError.value = '请输入有效的邮箱地址'
  } else {
    emailError.value = ''
  }
}

// 处理密码输入
const handlePasswordInput = () => {
  // 密码强度实时反馈已经在computed中处理
}

// 生成随机验证码
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaText.value = result
}

// 刷新验证码
const refreshCaptcha = () => {
  generateCaptcha()
}

// 检查是否需要显示验证码
const checkCaptchaRequirement = () => {
  showCaptcha.value = failedAttempts.value >= 2
  if (showCaptcha.value) {
    generateCaptcha()
  }
}

const handleLogin = async () => {
  if (!formRef.value) return

  try {
    // 如果需要验证码，验证验证码
    if (showCaptcha.value && form.captcha !== captchaText.value) {
      error.value = '验证码错误'
      failedAttempts.value++
      checkCaptchaRequirement()
      return
    }

    loading.value = true
    error.value = ''

    // 实际登录逻辑
    const response = await login({
      username: form.email,
      password: form.password,
    })

    // 登录成功
    userStore.setToken(response.token)
    userStore.setUserInfo(response.user)

    // 如果选择了记住我，保存到localStorage
    if (form.rememberMe) {
      localStorage.setItem('rememberMe', 'true')
      localStorage.setItem('email', form.email)
    } else {
      localStorage.removeItem('rememberMe')
      localStorage.removeItem('email')
    }

    // 跳转到仪表板
    router.push('/')
  } catch (err: any) {
    // 登录失败
    error.value = err.message || '登录失败，请稍后重试'
    failedAttempts.value++
    checkCaptchaRequirement()
  } finally {
    loading.value = false
  }
}

// 页面加载时检查是否记住我
onMounted(() => {
  const rememberMe = localStorage.getItem('rememberMe')
  const email = localStorage.getItem('email')

  if (rememberMe === 'true' && email) {
    form.email = email
    form.rememberMe = true
  }
})
</script>

<style scoped>
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: fadeInUp 0.5s ease-out;
}

.card-header {
  background: linear-gradient(to right, var(--primary-color), #8a2be2);
  padding: 2rem;
  text-align: center;
  color: white;
}

.card-body {
  padding: 2rem;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.avatar {
  background: white;
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 1.25rem;
}

.input-icon {
  font-size: 1.1rem;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-text {
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.captcha-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.captcha-input {
  flex: 1;
}

.captcha-display {
  width: 100px;
  height: 40px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;
}

.refresh-captcha {
  margin-left: 0.5rem;
  cursor: pointer;
  color: var(--primary-color);
}

.error-message {
  color: #f56565;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.login-button {
  width: 100%;
  margin-top: 1rem;
  background: linear-gradient(to right, var(--primary-color), #8a2be2);
  border: none;
  color: white;
  font-weight: 500;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.signup-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.signup-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.signup-link a:hover {
  text-decoration: underline;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    max-width: 100%;
    margin: 0 1rem;
  }

  .card-header {
    padding: 1.5rem;
  }

  .card-body {
    padding: 1.5rem;
  }
}

@media (max-width: 360px) {
  .captcha-container {
    flex-direction: column;
    align-items: stretch;
  }

  .captcha-display {
    width: 100%;
  }
}
</style>
