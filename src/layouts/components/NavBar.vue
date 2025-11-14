<template>
  <nav class="bg-white border-b border-gray-200 py-2 px-6">
    <div class="flex items-center space-x-1 overflow-x-auto hide-scrollbar">
      <el-button
        v-for="item in navItems"
        :key="item.key"
        :type="activeNav === item.key ? 'primary' : 'default'"
        :text="true"
        :link="true"
        size="small"
        class="whitespace-nowrap"
        @click="handleNavClick(item.key)"
      >
        {{ item.label }}
      </el-button>
      <!-- 动态添加按钮 -->
      <el-button
        v-if="showAddNavButton"
        :icon="Plus"
        size="small"
        type="default"
        text
        class="whitespace-nowrap"
        @click="handleAddNav"
      >
        新建
      </el-button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()

// Props
withDefaults(
  defineProps<{
    showAddNavButton?: boolean
  }>(),
  {
    showAddNavButton: true,
  }
)

// Emits
const emit = defineEmits<{
  'nav-click': [key: string]
  'add-nav': []
}>()

// 导航项配置
const navItems = ref([
  {
    key: 'home',
    label: '概览',
  },
  {
    key: 'settings',
    label: '配置',
  },
  {
    key: 'reports',
    label: '报表',
  },
])

// 当前激活的导航项
const activeNav = ref('home')

// 监听路由变化更新激活状态
const handleRouteChange = () => {
  // 根据当前路由更新激活的导航项
  const currentPath = route.path
  // 这里可以根据实际路由映射到对应的导航项
  if (currentPath.includes('/settings')) {
    activeNav.value = 'settings'
  } else if (currentPath.includes('/reports')) {
    activeNav.value = 'reports'
  } else {
    activeNav.value = 'home'
  }
}

// 处理导航点击
const handleNavClick = (key: string) => {
  activeNav.value = key
  emit('nav-click', key)
  ElMessage.info(`切换到${navItems.value.find((item) => item.key === key)?.label}`)
}

// 处理添加导航
const handleAddNav = () => {
  emit('add-nav')
  ElMessage.info('添加新导航')
}

// 生命周期钩子
onMounted(() => {
  handleRouteChange()
})
</script>

<style scoped>
nav {
  border-bottom: 1px solid #e4e7ed;
  background-color: #ffffff;
}

.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
