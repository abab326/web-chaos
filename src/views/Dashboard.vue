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
        <div class="w-30 h-30 flex items-center justify-center bg-primary rounded-xs">
          圆角 0.25rem
        </div>
        <div class="w-30 h-30 flex items-center justify-center bg-primary rounded-sm">
          圆角 0.5rem
        </div>

        <div class="w-30 h-30 flex items-center justify-center bg-primary rounded-md">
          圆角 0.375rem
        </div>
        <div class="w-30 h-30 flex items-center justify-center bg-success rounded-lg">
          圆角 0.5rem
        </div>
        <div class="w-30 h-30 flex items-center justify-center bg-warning rounded-base">
          圆角 element-plus base 圆角半径
        </div>
        <div class="w-30 h-30 flex items-center justify-center bg-warning rounded-xl">
          圆角 0.75rem
        </div>
        <div class="w-30 h-30 flex items-center justify-center bg-danger rounded-2xl">
          圆角 1rem
        </div>
        <div class="w-30 h-30 flex items-center justify-center bg-primary rounded-round">
          圆角 element-plus round圆角半径
        </div>
        <div class="w-30 h-30 flex items-center justify-center bg-info rounded-full">圆角 100%</div>
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
