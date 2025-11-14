<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">仪表板</h1>
      <p class="mt-1 text-gray-600">欢迎回来，这里是您的系统概览</p>
    </div>

    <!-- 统计卡片 -->
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="mb-4">
          <div class="flex items-center">
            <el-avatar :size="48" class="text-blue-600 bg-blue-100">
              <el-icon><User /></el-icon>
            </el-avatar>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">总用户数</p>
              <p class="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="mb-4">
          <div class="flex items-center">
            <el-avatar :size="48" class="text-green-600 bg-green-100">
              <el-icon><TrendCharts /></el-icon>
            </el-avatar>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">今日访问</p>
              <p class="text-2xl font-bold text-gray-900">567</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="mb-4">
          <div class="flex items-center">
            <el-avatar :size="48" class="text-yellow-600 bg-yellow-100">
              <el-icon><Money /></el-icon>
            </el-avatar>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">总收入</p>
              <p class="text-2xl font-bold text-gray-900">¥12,345</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="mb-4">
          <div class="flex items-center">
            <el-avatar :size="48" class="text-red-600 bg-red-100">
              <el-icon><Cpu /></el-icon>
            </el-avatar>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">系统负载</p>
              <p class="text-2xl font-bold text-gray-900">23%</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20">
      <el-col :xs="24" :lg="12">
        <el-card shadow="hover" class="mb-4">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold">访问趋势</span>
              <el-button type="primary" text>查看详情</el-button>
            </div>
          </template>
          <div class="flex justify-center items-center h-64 bg-gray-100 rounded">
            <p class="text-gray-500">图表区域 - 可集成 ECharts 或 Chart.js</p>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="12">
        <el-card shadow="hover" class="mb-4">
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold">用户分布</span>
              <el-button type="primary" text>查看详情</el-button>
            </div>
          </template>
          <div class="flex justify-center items-center h-64 bg-gray-100 rounded">
            <p class="text-gray-500">图表区域 - 可集成 ECharts 或 Chart.js</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近活动 -->
    <el-card class="recent-activities" v-watermark="['张三李四王五', '赵六', '张三李四王五']">
      <template #header>
        <div class="card-header">
          <span>最近活动</span>
          <el-button type="primary" link>查看全部</el-button>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="activity in recentActivities"
          :key="activity.id"
          :timestamp="activity.time"
          :type="activity.type"
          placement="top"
        >
          <el-card shadow="hover">
            <div class="activity-item">
              <el-avatar :size="32" :icon="activity.icon" />
              <div class="activity-content">
                <p class="activity-message">{{ activity.message }}</p>
                <p class="activity-detail">{{ activity.detail }}</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import {
  User,
  TrendCharts,
  Money,
  Cpu,
  UserFilled,
  Setting,
  Download,
  Monitor,
} from '@element-plus/icons-vue'

interface Activity {
  id: number
  initials: string
  message: string
  time: string
  detail: string
  avatar?: string
  icon: any
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

const recentActivities = ref<Activity[]>([
  {
    id: 1,
    initials: 'JD',
    message: '张三 创建了新用户',
    time: '2分钟前',
    detail: '用户ID: U1001',
    icon: markRaw(UserFilled),
    type: 'success',
  },
  {
    id: 2,
    initials: 'LW',
    message: '李四 更新了系统设置',
    time: '5分钟前',
    detail: '修改了安全配置',
    icon: markRaw(Setting),
    type: 'warning',
  },
  {
    id: 3,
    initials: 'WW',
    message: '王五 导出了用户数据',
    time: '10分钟前',
    detail: '导出文件: users_2024.csv',
    icon: markRaw(Download),
    type: 'info',
  },
  {
    id: 4,
    initials: 'ZL',
    message: '赵六 登录了系统',
    time: '15分钟前',
    detail: 'IP: 192.168.1.100',
    icon: markRaw(Monitor),
    type: 'primary',
  },
])
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.stats-grid {
  margin-bottom: 24px;
}

.stats-grid .el-col {
  margin-bottom: 16px;
}

.stat-card {
  height: 100%;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.trend-up {
  color: #f56c6c;
}

.trend-down {
  color: #67c23a;
}

.stat-icon {
  font-size: 48px;
  color: #409eff;
  opacity: 0.8;
}

.chart-section {
  margin-bottom: 24px;
}

.chart-card {
  height: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.chart-placeholder {
  height: 300px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 14px;
}

.recent-activities {
  margin-bottom: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.activity-content {
  flex: 1;
}

.activity-message {
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  color: #303133;
}

.activity-detail {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #909399;
}

:deep(.el-timeline-item__node) {
  background-color: #409eff;
}

:deep(.el-timeline-item__timestamp) {
  color: #909399;
  font-size: 12px;
}
</style>
