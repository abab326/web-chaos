<template>
  <div class="login-background">
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
          <el-form ref="loginFormRef" :model="form" :rules="rules" @submit.prevent="handleLogin">
            <!-- 邮箱 -->
            <el-form-item prop="userName">
              <el-input v-model="form.userName" placeholder="邮箱地址" :prefix-icon="Message" />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="密码"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>

            <!-- 验证码 -->
            <el-form-item prop="captcha">
              <div class="flex w-full space-x-2">
                <el-input v-model="form.captcha" placeholder="验证码" :prefix-icon="Key" />
                <div
                  class="flex items-center justify-center w-30 h-8 bg-white/20 rounded-md cursor-pointer border border-white/30"
                  @click="refreshCaptcha"
                >
                  <span class="text-base font-mono text-white">{{ captchaText }}</span>
                </div>
              </div>
            </el-form-item>
            <!-- 记住我 -->
            <el-form-item prop="rememberMe">
              <div class="flex w-full justify-between items-center">
                <el-checkbox v-model="form.rememberMe" label="记住我" class="text-white/90" />
                <el-link type="primary" href="#" class="text-xs text-blue-300">忘记密码？</el-link>
              </div>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
              <el-button
                type="primary"
                size="large"
                :loading="loading"
                native-type="submit"
                class="w-full"
                :disabled="isFormInvalid"
              >
                {{ loading ? '登录中...' : '登录' }}
              </el-button>
            </el-form-item>

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
import { ref, reactive, computed, onMounted, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { Lock, Message, Key } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';

import type { LoginRequest } from '@/types/user';
import { useUserStore } from '@/store/modules/user';

type LoginForm = LoginRequest & {
  rememberMe: boolean;
};
defineOptions({ name: 'Login' });

const router = useRouter();
const userStore = useUserStore();

const form = reactive<LoginForm>({
  userName: '',
  password: '',
  rememberMe: false,
  captcha: '',
});

const loading = ref(false);
const captchaText = ref('');
const loginFormRef = useTemplateRef<FormInstance>('loginFormRef');

// 表单验证规则
const rules = reactive<FormRules<LoginForm>>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});

// 表单是否无效
const isFormInvalid = computed(() => {
  return !form.userName || !form.password || !form.captcha;
});

// 生成随机验证码
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  captchaText.value = result;
};

// 刷新验证码
const refreshCaptcha = () => {
  generateCaptcha();
};

const handleLogin = async () => {
  loginFormRef.value?.validate().then(() => {
    userStore.login(form).then((result) => {
      if (result) {
        router.push({ path: '/dashboard' });
      }
    });
  });
};

// 页面加载时检查是否记住我
onMounted(() => {
  refreshCaptcha();
  const rememberMe = localStorage.getItem('rememberMe');
  const userName = localStorage.getItem('userName');

  if (rememberMe === 'true' && userName) {
    form.userName = userName;
    form.rememberMe = true;
  }
});
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
