<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">仪表板</h1>
      <p class="mt-1 text-gray-600">欢迎回来，这里是您的系统概览</p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="p-6 bg-white rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 text-blue-600 bg-blue-100 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">总用户数</p>
            <p class="text-2xl font-bold text-gray-900">1,234</p>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 text-green-600 bg-green-100 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">今日访问</p>
            <p class="text-2xl font-bold text-gray-900">567</p>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 text-yellow-600 bg-yellow-100 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">总收入</p>
            <p class="text-2xl font-bold text-gray-900">¥12,345</p>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 text-red-600 bg-red-100 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">系统负载</p>
            <p class="text-2xl font-bold text-gray-900">23%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">访问趋势</h3>
        <div class="flex justify-center items-center h-64 bg-gray-100 rounded">
          <p class="text-gray-500">图表区域 - 可集成 ECharts 或 Chart.js</p>
        </div>
      </div>

      <div class="p-6 bg-white rounded-lg shadow">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">用户分布</h3>
        <div class="flex justify-center items-center h-64 bg-gray-100 rounded">
          <p class="text-gray-500">图表区域 - 可集成 ECharts 或 Chart.js</p>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b">
        <h3 class="text-lg font-semibold text-gray-900">最近活动</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-center space-x-4"
          >
            <div class="shrink-0">
              <div class="flex justify-center items-center w-8 h-8 bg-blue-100 rounded-full">
                <span class="text-sm font-medium text-blue-600">{{ activity.initials }}</span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900">{{ activity.message }}</p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Activity {
  id: number
  initials: string
  message: string
  time: string
}

const recentActivities = ref<Activity[]>([
  {
    id: 1,
    initials: 'JD',
    message: '张三 创建了新用户',
    time: '2分钟前',
  },
  {
    id: 2,
    initials: 'LW',
    message: '李四 更新了系统设置',
    time: '5分钟前',
  },
  {
    id: 3,
    initials: 'WW',
    message: '王五 导出了用户数据',
    time: '10分钟前',
  },
  {
    id: 4,
    initials: 'ZL',
    message: '赵六 登录了系统',
    time: '15分钟前',
  },
])
</script>

<style scoped>
/* 自定义样式 */
</style>
