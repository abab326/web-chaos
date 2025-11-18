<template>
  <div class="login-background">
    <!-- 背景粒子动画 -->
    <div ref="particlesContainer" class="particles-container"></div>

    <!-- 渐变遮罩层 -->
    <div class="overlay"></div>

    <!-- 登录表单容器 -->
    <div class="flex justify-center items-center px-4 py-12 min-h-screen sm:px-6 lg:px-8">
      <div class="relative space-y-8 w-full max-w-md z-10">
        <!-- 登录表单头部 -->
        <div class="text-center">
          <div
            class="mx-auto flex justify-center items-center w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg"
          >
            <el-icon :size="32" class="text-white"><Lock /></el-icon>
          </div>
          <h1 class="mt-6 text-3xl font-bold text-white tracking-tight">欢迎登录</h1>
          <p class="mt-2 text-sm text-blue-100">请输入您的账户信息以继续</p>
        </div>

        <!-- 登录表单 -->
        <div
          class="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl border border-white/20"
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
            </el-form-item>

            <div class="flex justify-between items-center">
              <el-checkbox v-model="form.rememberMe" label="记住我" class="text-white/90" />
              <el-link type="primary" href="#" class="text-xs text-blue-300">忘记密码？</el-link>
            </div>

            <!-- 验证码 -->
            <el-form-item v-if="showCaptcha" prop="captcha">
              <div class="flex space-x-2">
                <el-input
                  v-model="form.captcha"
                  size="large"
                  placeholder="验证码"
                  :prefix-icon="Key"
                />
                <div
                  class="flex items-center justify-center w-32 h-12 bg-white/20 rounded-md cursor-pointer border border-white/30"
                  @click="refreshCaptcha"
                >
                  <span class="text-sm font-mono text-white">{{ captchaText }}</span>
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
              class="rounded-lg bg-red-500/20 border border-red-300/30 text-white"
            />

            <!-- 注册链接 -->
            <div class="text-center text-sm text-white/80">
              还没有账户？
              <el-link type="primary" href="#" class="font-medium text-blue-300">立即注册</el-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

import { Lock, Message, Key } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

// 粒子动画相关引用
const particlesContainer = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null
let particles: Particle[] = []

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

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

// 初始化粒子动画
const initParticles = () => {
  if (!particlesContainer.value) return

  const container = particlesContainer.value
  const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 5000)

  // 清空现有粒子
  particles = []

  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * container.clientWidth,
      y: Math.random() * container.clientHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.2})`,
    })
  }

  // 开始动画循环
  animateParticles()
}

// 粒子动画循环
const animateParticles = () => {
  if (!particlesContainer.value) return

  const container = particlesContainer.value
  const ctx = container.getContext('2d')
  if (!ctx) return

  // 清空画布
  ctx.clearRect(0, 0, container.width, container.height)

  // 更新和绘制粒子
  particles.forEach((particle) => {
    // 更新位置
    particle.x += particle.speedX
    particle.y += particle.speedY

    // 边界检查
    if (particle.x < 0 || particle.x > container.width) particle.speedX *= -1
    if (particle.y < 0 || particle.y > container.height) particle.speedY *= -1

    // 绘制粒子
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle = particle.color
    ctx.globalAlpha = particle.opacity
    ctx.fill()
  })

  // 绘制连接线
  drawParticleConnections(ctx)

  // 继续动画循环
  animationFrameId = requestAnimationFrame(animateParticles)
}

// 绘制粒子间连接线
const drawParticleConnections = (ctx: CanvasRenderingContext2D) => {
  const maxDistance = 100

  for (let i = 0; i < particles.length; i++) {
    const particleI = particles[i]!
    for (let j = i + 1; j < particles.length; j++) {
      const particleJ = particles[j]!
      const dx = particleI.x - particleJ.x
      const dy = particleI.y - particleJ.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance
        ctx.beginPath()
        ctx.moveTo(particleI.x, particleI.y)
        ctx.lineTo(particleJ.x, particleJ.y)
        ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.3})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
}

// 调整画布大小
const resizeCanvas = () => {
  if (!particlesContainer.value) return

  const container = particlesContainer.value
  container.width = window.innerWidth
  container.height = window.innerHeight
  initParticles()
}

// 页面加载时初始化
onMounted(() => {
  // 创建canvas元素
  if (particlesContainer.value) {
    const canvas = document.createElement('canvas')
    canvas.className = 'particles-canvas'
    particlesContainer.value.appendChild(canvas)
    particlesContainer.value = canvas

    // 初始化画布大小
    resizeCanvas()

    // 监听窗口大小变化
    window.addEventListener('resize', resizeCanvas)
  }
})

// 组件卸载前清理资源
onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', resizeCanvas)
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
    const result = await userStore.login({ username: form.email, password: form.password })
    if (!result) {
      return
    }
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
  } catch (err: unknown) {
    // 登录失败
    if (err instanceof Error) {
      error.value = err.message || '登录失败，请稍后重试'
    } else {
      error.value = '登录失败，请稍后重试'
    }
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
/* 登录背景容器 */
.login-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0f172a, #1e293b, #0f172a);
  overflow: hidden;
}

/* 粒子容器 */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 渐变遮罩层 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 10% 20%, rgba(29, 78, 216, 0.15) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(30, 64, 175, 0.15) 0%, transparent 20%);
}

/* 卡片样式调整 */
.bg-white\/10 {
  background: rgba(255, 255, 255, 0.1) !important;
}

/* 标题和描述文字颜色调整 */
.text-white {
  color: #f8fafc;
}

.text-white\/70 {
  color: rgba(255, 255, 255, 0.7);
}

.text-white\/80 {
  color: rgba(255, 255, 255, 0.8);
}

.text-white\/90 {
  color: rgba(255, 255, 255, 0.9);
}

.text-blue-100 {
  color: #dbeafe;
}

.text-blue-300 {
  color: #93c5fd;
}

/* 阴影效果增强 */
.shadow-xl {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* 毛玻璃效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* 动画效果 */
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

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
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
