<template>
  <div class="about">
    <h1 class="text-3xl font-bold text-green-600 mb-4">关于页面</h1>
    <p class="text-gray-600 mb-4">这是关于页面的内容</p>
    <div class="space-x-4">
      <router-link
        to="/"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面逻辑
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
