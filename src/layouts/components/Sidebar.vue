<template>
  <el-aside
    :width="sidebarOpen ? '240px' : '64px'"
    class="shadow-lg transition-all duration-300"
    :class="{ 'mobile-closed': !sidebarOpen && isMobile }"
  >
    <div class="h-16 flex justify-between items-center border-b border-gray-200">
      <div v-if="sidebarOpen" class="flex items-center space-x-2">
        <el-avatar :size="32" src="" class="bg-blue-500">
          <span class="font-semibold text-white">W</span>
        </el-avatar>
        <div>
          <p class="text-lg">后台管理系统</p>
        </div>
      </div>
      <div v-else class="flex justify-center">
        <el-avatar :size="32" src="" class="bg-blue-500">
          <span class="font-semibold text-white">W</span>
        </el-avatar>
      </div>
      <!-- 移动端关闭按钮 -->
      <el-icon
        v-if="isMobile && sidebarOpen"
        class="cursor-pointer md:hidden"
        :size="20"
        @click="handleMobileClose"
      >
        <Close />
      </el-icon>
    </div>

    <el-menu :default-active="currentRouteName" :collapse="!sidebarOpen" router class="border-none">
      <el-menu-item
        v-for="routeItem in menuRoutes"
        :key="routeItem.name"
        :index="routeItem.name as string"
        :route="{ name: routeItem.name }"
        @click="handleMenuItemClick"
      >
        <el-icon>
          <component :is="getIcon(routeItem.meta?.icon as string)"></component>
        </el-icon>
        <template #title>
          <span>{{ routeItem.meta?.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Monitor,
  UserFilled,
  Setting,
  TrendCharts,
  Document,
  Grid,
  Close,
} from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'

defineProps<{
  sidebarOpen: boolean
}>()

const route = useRoute()
const router = useRouter()

// 获取窗口尺寸信息
const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)

// 获取当前路由名称
const currentRouteName = computed(() => {
  return route.name as string
})

// 获取菜单路由
const menuRoutes = computed(() => {
  return (
    router.options.routes.find((r) => r.path === '/')?.children?.filter((r) => r.meta?.title) || []
  )
})

// 获取图标组件
const getIcon = (icon: string) => {
  const icons: Record<string, Component> = {
    dashboard: Monitor,
    users: UserFilled,
    settings: Setting,
    charts: TrendCharts,
    documents: Document,
    grid: Grid,
  }
  return icons[icon] || Document
}

// 处理移动端关闭
const handleMobileClose = () => {
  // 通过事件通知父组件关闭侧边栏
  window.dispatchEvent(new CustomEvent('close-sidebar'))
}

// 处理菜单项点击
const handleMenuItemClick = () => {
  // 在移动端点击菜单项后关闭侧边栏
  if (isMobile.value) {
    window.dispatchEvent(new CustomEvent('close-sidebar'))
  }
}
</script>

<style scoped>
.el-aside {
  height: 100%;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: all 0.3s ease;
}

/* 移动端关闭状态 */
.mobile-closed {
  transform: translateX(-100%);
}

.el-menu {
  border-right: none;
}

.el-menu-item:hover {
  color: #409eff !important;
}

.el-menu-item.is-active {
  color: #409eff !important;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-aside {
    position: fixed !important;
    z-index: 2000;
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  /* 移动端关闭状态 */
  .mobile-closed {
    transform: translateX(-100%);
  }
}
</style>
