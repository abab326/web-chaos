<template>
  <div class="space-y-4">
    <h1>主题样式示例</h1>
    <div class="card">
      <BaseTitle title="文本示例" />
      <p class="text-main">这是一个主要文字</p>
      <p class="text-secondary">这是一个次要文字</p>
      <p class="text-desc">这是一个描述文字</p>
    </div>
    <div class="card">
      <BaseTitle title="颜色示例" />
      <div class="flex gap-x-2">
        <div class="w-20 h-20 bg-primary"></div>
        <div class="w-20 h-20 bg-success"></div>
        <div class="w-20 h-20 bg-warning"></div>
        <div class="w-20 h-20 bg-danger"></div>
        <div class="w-20 h-20 bg-info"></div>
      </div>
    </div>
    <div class="card">
      <BaseTitle title="阴影示例" />
      <div class="flex gap-x-2">
        <div class="w-20 h-20 shadow-md"></div>
        <div class="w-20 h-20 shadow-lg"></div>
        <div class="w-20 h-20 shadow-xl"></div>
      </div>
    </div>
    <div class="card">
      <BaseTitle title="图标示例" />
      <div class="flex gap-x-2">
        <div class="icon-[mdi-light--home] text-5xl"></div>
      </div>
    </div>
    <div class="card">
      <BaseTitle title="圆角示例" />
      <div class="flex gap-x-2">
        <div class="w-20 h-20 bg-primary rounded-xs"></div>
        <div class="w-20 h-20 bg-primary rounded-sm"></div>
        <div class="w-20 h-20 bg-primary rounded-md"></div>
        <div class="w-20 h-20 bg-success rounded-lg"></div>
        <div class="w-20 h-20 bg-warning rounded-base"></div>
        <div class="w-20 h-20 bg-warning rounded-xl"></div>
        <div class="w-20 h-20 bg-danger rounded-2xl"></div>
        <div class="w-20 h-20 bg-primary rounded-round"></div>
        <div class="w-20 h-20 bg-info rounded-full"></div>
      </div>
    </div>
    <div class="card">
      <BaseTitle title="按钮示例" />
      <div class="flex gap-x-2">
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="default">链接按钮</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseTitle from '@/components/base-title';
defineOptions({ name: 'Dashboard' });
</script>

<style scoped>
.card {
}
</style>
