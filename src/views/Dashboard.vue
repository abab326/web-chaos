<template>
  <div class="dashboard-container">
    <header class="header-card">
      <div class="mb-4 flex items-center justify-between">
        <p class="text-2xl font-bold">Web Chaos</p>
        <el-link underline="never" type="primary" link>
          查看详情
          <i class="icon-[mdi--arrow-right]"></i>
        </el-link>
      </div>
      <div class="relative grid grid-cols-3 gap-4 rounded-lg bg-white p-4 shadow-xs">
        <!-- 卡片 1 -->
        <div class="bg-primary/2 flex-1 rounded-lg p-4">
          <h3 class="mb-2 text-lg font-bold">云原生应用</h3>
          <p class="mb-4 text-sm text-gray-600">现代化的云原生应用架构，提供高性能、高可用的服务</p>
          <div class="flex items-center justify-between">
            <span
              class="from-primary/20 via-primary/10 to-primary/5 -skew-x-12 bg-linear-to-b from-10% via-40% to-90% bg-clip-text px-2 text-5xl font-bold text-transparent"
            >
              01
            </span>
            <el-button type="primary" class="mt-2">立即体验</el-button>
          </div>
        </div>

        <!-- 卡片 2 -->
        <div class="flex-1 rounded-lg bg-blue-50/70 p-4">
          <h3 class="mb-2 text-lg font-bold">AI 智能分析</h3>
          <p class="mb-4 text-sm text-gray-600">基于人工智能的数据分析，提供精准的业务洞察</p>
          <div class="flex items-center justify-between">
            <span
              class="-skew-x-12 bg-linear-to-b from-blue-300 from-10% via-blue-100 via-40% to-blue-50 to-90% bg-clip-text px-2 text-5xl font-bold text-transparent"
            >
              02
            </span>
            <el-button type="info" size="small" class="mt-2">立即体验</el-button>
          </div>
        </div>

        <!-- 卡片 3 -->
        <div class="flex-1 rounded-lg bg-blue-50/70 p-4">
          <h3 class="mb-2 text-lg font-bold">全栈开发</h3>
          <p class="mb-4 text-sm text-gray-600">前端与后端一体化开发，提高开发效率和代码质量</p>
          <div class="flex items-center justify-between">
            <span
              class="-skew-x-12 bg-linear-to-b from-blue-300 from-10% via-blue-100 via-40% to-blue-50 to-90% bg-clip-text px-2 text-5xl font-bold text-transparent"
            >
              03
            </span>
            <el-button type="info" size="small" class="mt-2">立即体验</el-button>
          </div>
        </div>
      </div>
    </header>
    <h1>主题样式示例</h1>
    <div class="card">
      <BaseTitle title="文本示例" />
      <p class="text-primary text-xl">这是一个基础文字</p>
      <p class="text-main">这是一个主要文字</p>
      <p class="text-secondary">这是一个次要文字</p>
      <p class="text-desc">这是一个描述文字</p>
    </div>
    <div class="card">
      <BaseTitle title="颜色示例" />
      <div class="flex gap-x-2">
        <div class="bg-primary h-20 w-20"></div>
        <div class="bg-success h-20 w-20"></div>
        <div class="bg-warning h-20 w-20"></div>
        <div class="bg-danger h-20 w-20"></div>
        <div class="bg-info h-20 w-20"></div>
      </div>
    </div>
    <div class="card">
      <BaseTitle title="阴影示例" />
      <div class="flex gap-x-2">
        <div class="h-20 w-20 shadow-md"></div>
        <div class="h-20 w-20 shadow-lg"></div>
        <div class="h-20 w-20 shadow-xl"></div>
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
        <div class="bg-primary flex h-30 w-30 items-center justify-center rounded-xs">
          圆角 0.25rem
        </div>
        <div class="bg-primary flex h-30 w-30 items-center justify-center rounded-sm">
          圆角 0.5rem
        </div>

        <div class="bg-primary flex h-30 w-30 items-center justify-center rounded-md">
          圆角 0.375rem
        </div>
        <div class="bg-success flex h-30 w-30 items-center justify-center rounded-lg">
          圆角 0.5rem
        </div>
        <div class="bg-warning rounded-base flex h-30 w-30 items-center justify-center">
          圆角 element-plus base 圆角半径
        </div>
        <div class="bg-warning flex h-30 w-30 items-center justify-center rounded-xl">
          圆角 0.75rem
        </div>
        <div class="bg-danger flex h-30 w-30 items-center justify-center rounded-2xl">
          圆角 1rem
        </div>
        <div class="bg-primary rounded-round flex h-30 w-30 items-center justify-center">
          圆角 element-plus round圆角半径
        </div>
        <div class="bg-info flex h-30 w-30 items-center justify-center rounded-full">圆角 100%</div>
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

<style scoped></style>
