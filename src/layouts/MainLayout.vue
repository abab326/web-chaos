<template>
  <el-container class="h-screen flex-row">
    <!-- 侧边栏 -->
    <Sidebar :sidebar-open="sidebarOpen" />

    <!-- 主内容区域 -->
    <el-container class="flex flex-col! flex-1">
      <!-- 顶部功能栏 -->
      <TopBar @toggle-sidebar="toggleSidebar" />

      <!-- 顶部导航栏 -->
      <NavBar @nav-click="handleNavClick" @add-nav="handleAddNav" />

      <!-- 页面内容 -->
      <PageContent :use-default-padding="true" />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useWindowSize } from '@vueuse/core'

// 导入布局组件
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'
import NavBar from './components/NavBar.vue'
import PageContent from './components/PageContent.vue'

const router = useRouter()

// 侧边栏展开状态
const sidebarOpen = ref(true)
const { width } = useWindowSize()
const isMobile = ref(false)

// 切换侧边栏
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// 关闭侧边栏（移动端专用）
const closeSidebar = () => {
  if (isMobile.value) {
    sidebarOpen.value = false
  }
}

// 检查是否为移动设备
const checkIsMobile = () => {
  isMobile.value = width.value <= 768
  // 在移动设备上默认关闭侧边栏
  if (isMobile.value) {
    sidebarOpen.value = false
  }
}

// 处理导航栏点击
const handleNavClick = (key: string) => {
  // 根据导航键路由到相应页面
  switch (key) {
    case 'home':
      router.push('/')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'reports':
      // 如果报表页面存在，路由到报表页面
      if (router.hasRoute('reports')) {
        router.push('/reports')
      } else {
        ElMessage.warning('报表页面尚未实现')
      }
      break
    default:
      ElMessage.info(`导航到: ${key}`)
  }
}

// 处理添加导航
const handleAddNav = () => {
  ElMessage.info('添加新导航功能')
  // 这里可以实现动态添加导航项的逻辑
}

// 监听窗口大小变化
onMounted(() => {
  checkIsMobile()
  // 监听移动端关闭侧边栏事件
  window.addEventListener('close-sidebar', closeSidebar)
})

onUnmounted(() => {
  // 清理事件监听器
  window.removeEventListener('close-sidebar', closeSidebar)
})
</script>

<style scoped></style>
