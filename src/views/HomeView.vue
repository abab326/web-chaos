<template>
  <div class="home">
    <h1 class="text-3xl font-bold text-blue-600 mb-4">首页</h1>
    <p class="text-gray-600 mb-4">欢迎来到 Vue 3 + TypeScript 项目</p>
    <div class="space-x-4">
      <router-link
        to="/about"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        关于页面
      </router-link>
    </div>

    <!-- 技术栈演示区域 -->
    <div class="mt-8 space-y-8">
      <ElementDemo />
      <SCSSDemo />
    </div>
  </div>
</template>

<script setup lang="ts">
import ElementDemo from '@/components/ElementDemo.vue'
import SCSSDemo from '@/components/SCSSDemo.vue'
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
