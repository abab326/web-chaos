<template>
  <el-aside
    :width="sidebarOpen ? '240px' : '64px'"
    class="bg-white shadow-lg transition-all duration-300"
  >
    <div class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <div v-if="sidebarOpen" class="flex items-center space-x-2">
          <el-avatar :size="32" src="" class="bg-blue-500">
            <span class="font-semibold text-white">W</span>
          </el-avatar>
          <div>
            <h1 class="text-lg font-bold text-gray-800">Web Chaos Admin</h1>
            <p class="text-xs text-gray-500">后台管理系统</p>
          </div>
        </div>
        <div v-else class="flex justify-center">
          <el-avatar :size="32" src="" class="bg-blue-500">
            <span class="font-semibold text-white">W</span>
          </el-avatar>
        </div>
      </div>
    </div>

    <el-menu
      :default-active="currentRouteName"
      :collapse="!sidebarOpen"
      router
      class="border-none"
      background-color="#ffffff"
      text-color="#606266"
      active-text-color="#409eff"
    >
      <el-menu-item
        v-for="route in menuRoutes"
        :key="route.name"
        :index="route.name as string"
        :route="{ name: route.name }"
      >
        <el-icon>
          <component :is="getIcon(route.meta?.icon as string)"></component>
        </el-icon>
        <template #title>
          <span>{{ route.meta?.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Monitor, UserFilled, Setting, TrendCharts, Document, Grid } from '@element-plus/icons-vue'

// Props
const props = defineProps<{
  sidebarOpen: boolean
}>()

const route = useRoute()
const router = useRouter()

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
  const icons: Record<string, any> = {
    dashboard: Monitor,
    users: UserFilled,
    settings: Setting,
    charts: TrendCharts,
    documents: Document,
    grid: Grid,
  }
  return icons[icon] || Document
}
</script>

<style scoped>
.el-aside {
  background-color: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.el-menu {
  border-right: none;
}

.el-menu-item:hover {
  background-color: #f0f9ff !important;
  color: #409eff !important;
}

.el-menu-item.is-active {
  background-color: #ecf5ff !important;
  color: #409eff !important;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-aside {
    position: fixed !important;
    z-index: 2000;
  }
}
</style>
