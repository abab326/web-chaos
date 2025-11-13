<template>
  <div class="flex h-screen bg-gray-50">
    <!-- 侧边栏 -->
    <aside
      class="w-64 bg-white shadow-lg transition-all duration-300"
      :class="{ '-ml-64': !sidebarOpen }"
    >
      <div class="p-4 border-b">
        <h1 class="text-xl font-bold text-gray-800">Web Chaos Admin</h1>
        <p class="text-sm text-gray-600">后台管理系统</p>
      </div>

      <nav class="mt-4">
        <ul>
          <li v-for="route in menuRoutes" :key="route.name">
            <router-link
              :to="{ name: route.name }"
              class="flex items-center px-4 py-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
              :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': isActive(route) }"
            >
              <span class="mr-3">{{ getIcon(route.meta?.icon as string) }}</span>
              <span>{{ route.meta?.title }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- 主内容区域 -->
    <div class="flex flex-col flex-1 min-w-0">
      <!-- 顶部导航栏 -->
      <header class="bg-white border-b shadow-sm">
        <div class="flex justify-between items-center px-6 py-4">
          <div class="flex items-center">
            <button
              @click="toggleSidebar"
              class="p-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 class="ml-4 text-lg font-semibold text-gray-800">{{ currentRouteTitle }}</h2>
          </div>

          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-500 hover:text-gray-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <div class="relative">
              <button
                @click="toggleUserMenu"
                class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100"
              >
                <div class="flex justify-center items-center w-8 h-8 bg-blue-500 rounded-full">
                  <span class="font-semibold text-white">A</span>
                </div>
                <span class="text-sm font-medium text-gray-700">管理员</span>
                <svg
                  class="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- 用户菜单下拉 -->
              <div
                v-if="userMenuOpen"
                class="absolute right-0 z-50 py-1 mt-2 w-48 bg-white rounded-md shadow-lg"
              >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >个人设置</a
                >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >修改密码</a
                >
                <div class="border-t"></div>
                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >退出登录</a
                >
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="overflow-auto flex-1 p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const sidebarOpen = ref(true)
const userMenuOpen = ref(false)

// 获取菜单路由
const menuRoutes = computed(() => {
  return (
    router.options.routes.find((r) => r.path === '/')?.children?.filter((r) => r.meta?.title) || []
  )
})

// 获取当前路由标题
const currentRouteTitle = computed(() => {
  return (route.meta?.title as string) || '仪表板'
})

// 检查路由是否激活
const isActive = (routeItem: { name?: string | symbol }) => {
  return route.name === routeItem.name
}

// 获取图标
const getIcon = (icon: string) => {
  const icons: Record<string, string> = {
    dashboard: '📊',
    users: '👥',
    settings: '⚙️',
  }
  return icons[icon] || '📄'
}

// 切换侧边栏
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// 切换用户菜单
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

// 点击外部关闭用户菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    userMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
