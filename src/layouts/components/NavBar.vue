<template>
  <nav class="navbar-container shadow-sm py-2 px-3">
    <CustomTab ref="customTabRef" @scroll="handleTabScroll">
      <div
        v-for="item in navItems"
        :key="item.key"
        :ref="(el) => setNavItemRef(el, item.key)"
        class="nav-item relative flex items-center rounded-lg transition-all duration-300 px-2 py-1 cursor-pointer whitespace-nowrap bg-fill-lighter text-t-regular border border-border-light hover:bg-fill-light hover:text-primary"
        :class="{
          'active-nav bg-primary-light-9 text-primary font-medium border-primary-light-7':
            activeNav === item.key,
        }"
        @click="handleNavClick(item.key)"
      >
        <span class="nav-item-label mr-2 text-sm">{{ item.label }}</span>
        <span class="close-icon" @click="removeNav(item.key)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="close-icon-svg w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
    </CustomTab>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, type ComponentPublicInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavHistoryStore } from '@/store/navHistory'
import CustomTab from '@/components/custom-tab/CustomTab.vue'

const route = useRoute()
const router = useRouter()
const navHistoryStore = useNavHistoryStore()

// DOM引用
const customTabRef = ref<InstanceType<typeof CustomTab> | null>(null)
const navItemRefs = ref<Record<string, HTMLElement | null>>({})

// Emits
const emit = defineEmits<{
  'nav-click': [key: string]
  'add-nav': []
}>()

// 使用访问历史中的页面作为导航项
const navItems = computed(() => {
  return navHistoryStore.visitedPages
})

// 当前激活的导航项
const activeNav = computed(() => {
  // 根据当前路由名称确定激活项
  return (route.name as string) || ''
})

// 设置导航项引用
const setNavItemRef = (el: Element | ComponentPublicInstance | null, key: string) => {
  if (el) {
    navItemRefs.value[key] = el as HTMLElement
  }
}

// 处理导航点击
const handleNavClick = (key: string) => {
  emit('nav-click', key)

  // 检查是否已经存在该路由
  const isRouteExists = navItems.value.some((item) => item.key === key)

  if (isRouteExists) {
    // 如果路由已存在，则滚动到该位置
    scrollToNavItem(key)
  }

  // 根据导航键路由到相应页面
  const targetRoute = navItems.value.find((item) => item.key === key)
  if (targetRoute) {
    router.push({ name: key })

    // 显示提示信息
    console.log(`切换到${targetRoute.label}`)
  }
}

// 滚动到指定的导航项
const scrollToNavItem = (key: string) => {
  nextTick(() => {
    const targetItem = navItemRefs.value[key]
    if (customTabRef.value && targetItem) {
      // 获取目标元素相对于容器的位置
      const container = customTabRef.value.$el.querySelector('.tab-content-container')
      if (container) {
        const containerRect = container.getBoundingClientRect()
        const itemRect = targetItem.getBoundingClientRect()

        // 计算需要滚动的位置
        const scrollOffset =
          itemRect.left - containerRect.left - containerRect.width / 2 + itemRect.width / 2

        // 使用CustomTab的滚动方法
        if (scrollOffset > 0) {
          customTabRef.value.scrollRight()
        } else {
          customTabRef.value.scrollLeft()
        }
      }
    }
  })
}

// 处理Tab滚动事件
const handleTabScroll = (position: number) => {
  // 可以在这里处理滚动事件
  console.log('Tab scrolled to position:', position)
}

// 移除导航项
const removeNav = (key: string) => {
  // 阻止事件冒泡，避免触发导航点击
  navHistoryStore.removeVisitedPage(key)

  // 如果关闭的是当前激活的页面，则导航到第一个页面或默认页面
  if (activeNav.value === key) {
    if (navItems.value.length > 0) {
      const firstItem = navItems.value[0]
      router.push({ name: firstItem!.key })
    } else {
      router.push({ name: 'Dashboard' })
    }
  }

  console.log('页面已关闭')
}

// 监听路由变化，自动添加访问的页面到历史记录
onMounted(() => {
  // 当组件挂载时，如果当前路由有标题，则添加到访问历史中
  navHistoryStore.addVisitedPage(route)

  // 监听路由变化
  router.afterEach((to) => {
    navHistoryStore.addVisitedPage(to)
    // 路由变化后滚动到激活的导航项
    if (to.name) {
      setTimeout(() => {
        scrollToNavItem(to.name as string)
      }, 100)
    }
  })
})
</script>

<style scoped>
/* 激活的导航项样式 */
.active-nav {
  background-color: var(--color-primary-light-9);
  color: var(--color-primary);
}
.close-icon {
  display: none;
  color: var(--color-t-secondary);
}
.active-nav > .close-icon,
.nav-item:hover > .close-icon {
  display: flex;
  color: var(--color-primary);
}
</style>
