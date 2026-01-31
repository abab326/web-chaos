<template>
  <div>
    <div
      v-show="isMobile"
      class="sidebar-overlay"
      :class="{ 'opacity-0': !isExpanded }"
      @click="toggleExpand"
    ></div>
    <el-aside
      class="bg-bg border-border sidebar-aside h-full border-r border-solid"
      :class="{
        fixed: isMobile,
        shadow: isMobile,
        'z-1000': isMobile,
      }"
      :width="isExpanded ? '15rem' : isMobile ? '0' : '4rem'"
    >
      <div class="border-border flex h-16 items-center justify-between border-b border-solid px-5">
        <div class="flex items-center gap-4">
          <el-icon :size="24" class="text-primary!"><ElementPlus /></el-icon>
          <span v-if="isExpanded" class="text-primary text-xl">Web Chaos</span>
        </div>
        <el-icon
          v-if="isExpanded && isMobile"
          class="text-primary!"
          :size="20"
          @click="toggleExpand"
        >
          <Close />
        </el-icon>
      </div>

      <el-menu
        class="sidebar-menu"
        :collapse="!isExpanded"
        :default-active="activeMenu"
        @select="handleSelect"
      >
        <template v-for="item in menuRoutes" :key="item.path">
          <el-menu-item
            v-if="!item.children || item.children.length === 0"
            :index="item.path"
            class="menu-item"
          >
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <template #title>
              <span class="menu-item-text">{{ item.name }}</span>
            </template>
          </el-menu-item>

          <el-sub-menu v-else :index="item.path" class="submenu-item">
            <template #title>
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span class="menu-item-text submenu-title">{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="child.path"
              class="menu-item"
            >
              <el-icon>
                <component :is="child.icon" />
              </el-icon>
              <template #title>
                <span class="menu-item-text">{{ child.name }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Close, ElementPlus } from '@element-plus/icons-vue';
import { useWindowSize } from '@vueuse/core';
import { usePermissionStore } from '@/store/modules/permission';
defineProps<{
  isExpanded: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void;
}>();

// 获取路由实例
const route = useRoute();
const router = useRouter();

// 获取权限存储实例
const permissionStore = usePermissionStore();

// 获取窗口尺寸信息
const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

// 获取菜单路由
const menuRoutes = computed(() => {
  return permissionStore.dynamicMenus;
});

// 处理菜单项点击
const handleSelect = (index: string) => {
  // 根据菜单项索引导航到相应路由
  console.log('handleSelect', index);
  router.push({ path: index });

  // 在移动端点击菜单项后关闭侧边栏
  if (isMobile.value) {
    window.dispatchEvent(new CustomEvent('close-sidebar'));
  }
};

// 切换展开状态
const toggleExpand = () => {
  emit('toggle-sidebar');
};

// 获取活动菜单项
const activeMenu = computed(() => {
  // 如果没有匹配的路由名称，则根据路径匹配
  const path = route.path;

  return path || '/dashboard';
});
</script>

<style scoped>
/* 侧边栏基础样式 */
.sidebar-aside {
  transition: all 0.3s ease-in-out;
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
