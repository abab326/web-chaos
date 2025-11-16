<template>
  <div>
    <div
      v-if="isMobile"
      class="sidebar-overlay"
      :class="{ 'opacity-0': !isExpanded }"
      @click="toggleExpand"
    ></div>
    <el-aside
      class="h-full bg-bg border-r border-solid border-border sidebar-aside"
      :class="{
        fixed: isMobile,
        shadow: isMobile,
        'z-1000': isMobile,
      }"
      :width="isExpanded ? '220px' : isMobile ? '0' : '64px'"
    >
      <div class="h-16 px-5 flex items-center justify-between border-b border-solid border-border">
        <div class="flex items-center gap-4">
          <el-icon :size="24" class="text-primary!"><ElementPlus /></el-icon>
          <span v-if="isExpanded" class="text-primary text-xl">Web Chaos</span>
        </div>
        <el-icon v-if="isExpanded && isMobile" class="toggle-icon" :size="20" @click="toggleExpand">
          <Close />
        </el-icon>
      </div>

      <el-menu
        class="sidebar-menu"
        :collapse="!isExpanded"
        :default-active="activeMenu"
        @select="handleSelect"
      >
        <template v-for="item in menuItems" :key="item.index">
          <el-menu-item
            v-if="!item.children || item.children.length === 0"
            :index="item.index"
            class="menu-item"
          >
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <template #title>
              <span class="menu-item-text">{{ item.title }}</span>
            </template>
          </el-menu-item>

          <el-sub-menu v-else :index="item.index" class="submenu-item">
            <template #title>
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span class="menu-item-text submenu-title">{{ item.title }}</span>
              <el-icon class="submenu-arrow">
                <ArrowDown />
              </el-icon>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.index"
              :index="child.index"
              class="menu-item"
            >
              <el-icon>
                <component :is="child.icon" />
              </el-icon>
              <template #title>
                <span class="menu-item-text">{{ child.title }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, Close } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
defineProps<{
  isExpanded: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

// 获取路由实例
const route = useRoute()
const router = useRouter()

// 获取窗口尺寸信息
const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)

// 获取菜单路由
const menuRoutes = computed(() => {
  return (
    router.options.routes.find((r) => r.path === '/')?.children?.filter((r) => r.meta?.title) || []
  )
})

// 处理菜单项点击
const handleSelect = (index: string) => {
  // 根据菜单项索引导航到相应路由
  const routePath = `/${index}`
  if (router.hasRoute(index)) {
    router.push({ name: index })
  } else if (router.getRoutes().some((route) => route.path === routePath)) {
    router.push(routePath)
  } else {
    console.warn(`Route for ${index} not found`)
  }

  // 在移动端点击菜单项后关闭侧边栏
  if (isMobile.value) {
    window.dispatchEvent(new CustomEvent('close-sidebar'))
  }
}

// 切换展开状态
const toggleExpand = () => {
  emit('toggle-sidebar')
}

// 获取活动菜单项
const activeMenu = computed(() => {
  // 根据当前路由确定活动菜单项
  const routeName = route.name as string
  if (routeName) {
    return routeName
  }

  // 如果没有匹配的路由名称，则根据路径匹配
  const path = route.path
  if (path) {
    // 移除开头的斜杠并获取第一段作为菜单项索引
    const pathParts = path.split('/').filter((part) => part)
    return pathParts.length > 0 ? pathParts[0] : 'dashboard'
  }

  return 'dashboard'
})

// 格式化菜单项数据
const menuItems = computed(() => {
  return menuRoutes.value.map((route) => {
    const meta = route.meta || {}
    return {
      index: (route.name as string) || route.path.replace('/', ''),
      title: meta.title || route.path,
      icon: meta.icon || 'Fold',
      children:
        route.children
          ?.filter((child) => child.meta?.title)
          .map((child) => {
            const childMeta = child.meta || {}
            return {
              index:
                (child.name as string) ||
                `${(route.name as string) || route.path.replace('/', '')}-${child.path}`,
              title: childMeta.title || child.path,
              icon: childMeta.icon || 'document',
            }
          }) || [],
    }
  })
})
</script>

<style scoped>
/* 侧边栏基础样式 */
.sidebar-aside {
  transition: all 0.3s ease-in-out;
}

/* 移动端侧边栏动画效果 */
.sidebar-aside.fixed {
  transform: translateX(0);
}

.sidebar-aside.fixed.hidden {
  transform: translateX(-100%);
}

/* 遮罩层样式 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.sidebar-overlay.opacity-0 {
  opacity: 0;
  pointer-events: none;
}

:deep(.sidebar-menu) {
  border: none;
}
</style>
