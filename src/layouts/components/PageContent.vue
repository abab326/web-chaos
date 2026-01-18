<template>
  <el-main class="p-3! flex-1">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedList">
          <component :is="Component" :key="getKey(route)" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

// 计算缓存的组件列表
import { useKeepAliveStore } from '@/store/modules/keepalive';
const cachedList = computed(() => useKeepAliveStore().cachedList);

// 动态生成组件 key
const getKey = (route: RouteLocationNormalizedLoadedGeneric) => {
  return route.fullPath;
};
</script>

<style scoped>
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
