<template>
  <el-container class="h-screen">
    <!-- 侧边栏 -->
    <Sidebar :is-expanded="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <!-- 主体内容 -->
    <el-container class="flex-col!">
      <!-- 顶部导航栏 -->
      <TopBar class="topbar-container" @toggle-sidebar="toggleSidebar" />

      <!-- 导航标签栏 -->
      <NavBar class="navbar-container" @nav-click="handleNavClick" @add-nav="handleAddNav" />

      <!-- 页面内容 -->
      <PageContent class="page-content" />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 导入布局组件
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'
import NavBar from './components/NavBar.vue'
import PageContent from './components/PageContent.vue'

const router = useRouter()

// 侧边栏展开状态
const isSidebarOpen = ref(true)

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
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
</script>

<style scoped></style>
