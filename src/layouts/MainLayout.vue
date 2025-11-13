<template>
  <el-container class="h-screen">
    <!-- 侧边栏 -->
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
            <component :is="getIcon(route.meta?.icon as string)" />
          </el-icon>
          <template #title>
            <span>{{ route.meta?.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主内容区域 -->
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="bg-white border-b border-gray-200 shadow-sm">
        <div class="flex justify-between items-center px-6 h-full">
          <div class="flex items-center space-x-4">
            <el-button
              @click="toggleSidebar"
              :icon="Fold"
              text
              circle
              class="text-gray-500 hover:text-gray-700"
            />
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ currentRouteTitle }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="flex items-center space-x-4">
            <el-badge :value="3" :max="99" class="mr-2">
              <el-button :icon="Bell" text circle class="text-gray-500 hover:text-gray-700" />
            </el-badge>

            <el-dropdown @command="handleUserCommand" trigger="click">
              <span class="flex items-center space-x-2 cursor-pointer el-dropdown-link">
                <el-avatar :size="32" src="" class="bg-blue-500">
                  <span class="font-semibold text-white">A</span>
                </el-avatar>
                <span class="text-sm font-medium text-gray-700">管理员</span>
                <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">
                    <el-icon><User /></el-icon>
                    个人设置
                  </el-dropdown-item>
                  <el-dropdown-item command="password">
                    <el-icon><Lock /></el-icon>
                    修改密码
                  </el-dropdown-item>
                  <el-dropdown-item divided command="logout">
                    <el-icon><SwitchButton /></el-icon>
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>

      <!-- 页面内容 -->
      <el-main class="p-6 bg-gray-50">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Fold,
  Bell,
  ArrowDown,
  User,
  Lock,
  SwitchButton,
  Monitor,
  UserFilled,
  Setting,
  TrendCharts,
  Document,
  Grid,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()

const sidebarOpen = ref(true)

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

// 获取当前路由标题
const currentRouteTitle = computed(() => {
  return (route.meta?.title as string) || '仪表板'
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

// 切换侧边栏
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// 处理用户菜单命令
const handleUserCommand = async (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('打开个人设置')
      break
    case 'password':
      ElMessage.info('打开修改密码')
      break
    case 'logout':
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        ElMessage.success('退出登录成功')
        // 这里可以添加退出登录的逻辑
        // router.push('/login')
      } catch {
        // 用户取消操作
      }
      break
  }
}
</script>

<style scoped>
.el-container {
  height: 100vh;
}

.el-aside {
  background-color: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.el-header {
  padding: 0;
  height: 64px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
  overflow: auto;
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  height: 48px;
  line-height: 48px;
  margin: 4px 8px;
  border-radius: 4px;
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

.el-dropdown-link {
  outline: none;
}

.el-dropdown-link:hover {
  background-color: #f5f7fa;
  border-radius: 4px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-aside {
    position: fixed !important;
    z-index: 2000;
  }

  .el-header {
    padding-left: 16px;
    padding-right: 16px;
  }

  .el-main {
    padding: 16px;
  }
}

/* 滚动条样式 */
.el-main::-webkit-scrollbar {
  width: 6px;
}

.el-main::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.el-main::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.el-main::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
