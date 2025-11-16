<template>
  <el-main class="page-content p-3 flex-1 overflow-y-auto">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts"></script>

<style scoped>
/* 页面内容基础样式 */
.page-content {
  padding: 12px;
  flex: 1;
  overflow-y: auto;
}

/* 淡入淡出过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
