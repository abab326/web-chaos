<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const appStore = useAppStore()
const userStore = useUserStore()

// 示例：模拟登录
const handleLogin = () => {
  userStore.login('示例用户', 'user@example.com')
}

const handleLogout = () => {
  userStore.logout()
}
</script>

<template>
  <div
    :class="{ dark: appStore.isDark }"
    class="min-h-screen bg-gray-50 dark:bg-gray-900"
  >
    <!-- 导航栏 -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-8">
            <router-link
              to="/"
              class="text-xl font-bold text-gray-900 dark:text-white"
            >
              Web Chaos
            </router-link>
            <router-link
              to="/"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              首页
            </router-link>
            <router-link
              to="/about"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              关于
            </router-link>
          </div>

          <div class="flex items-center space-x-4">
            <button
              @click="appStore.toggleTheme"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {{ appStore.isDark ? '🌙' : '☀️' }}
            </button>

            <div
              v-if="userStore.isLoggedIn"
              class="flex items-center space-x-2"
            >
              <span class="text-sm text-gray-600 dark:text-gray-300">{{
                userStore.userInfo
              }}</span>
              <button
                @click="handleLogout"
                class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                退出
              </button>
            </div>

            <button
              v-else
              @click="handleLogin"
              class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              登录
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
