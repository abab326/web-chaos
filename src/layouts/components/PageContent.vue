<template>
  <el-main class="p-6 bg-gray-50" :class="{ 'custom-padding': !useDefaultPadding }">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Props
const props = withDefaults(
  defineProps<{
    useDefaultPadding?: boolean
  }>(),
  {
    useDefaultPadding: true,
  }
)
</script>

<style scoped>
.el-main {
  padding: 20px;
  background-color: #f5f7fa;
  overflow: auto;
  min-height: 0;
  flex: 1;
}

.custom-padding {
  padding: var(--page-padding, 20px);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .el-main {
    padding: 16px;
  }
}
</style>
