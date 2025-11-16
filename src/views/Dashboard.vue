<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-6 animate-fade-in-down">
      <h1 class="text-xl md:text-2xl font-bold text-gray-900">仪表板</h1>
      <p class="mt-1 text-sm text-gray-600">欢迎回来，这里是您的系统概览</p>
    </div>

    <!-- 统计卡片 -->
    <el-row :gutter="12" class="mb-6 animate-staggered-fade-in">
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        class="mb-4 md:mb-0 animate-fade-in-up"
        style="animation-delay: 0.1s"
      >
        <el-card
          shadow="hover"
          class="rounded-lg border-0 h-full transition-all duration-300 hover:shadow-lg"
        >
          <div class="flex items-center">
            <el-avatar :size="40" class="text-blue-600 bg-blue-100">
              <el-icon><User /></el-icon>
            </el-avatar>
            <div class="ml-3">
              <p class="text-xs md:text-sm font-medium text-gray-600">总用户数</p>
              <p class="text-lg md:text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        class="mb-4 md:mb-0 animate-fade-in-up"
        style="animation-delay: 0.2s"
      >
        <el-card
          shadow="hover"
          class="rounded-lg border-0 h-full transition-all duration-300 hover:shadow-lg"
        >
          <div class="flex items-center">
            <el-avatar :size="40" class="text-green-600 bg-green-100">
              <el-icon><TrendCharts /></el-icon>
            </el-avatar>
            <div class="ml-3">
              <p class="text-xs md:text-sm font-medium text-gray-600">今日访问</p>
              <p class="text-lg md:text-2xl font-bold text-gray-900">567</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        class="mb-4 md:mb-0 animate-fade-in-up"
        style="animation-delay: 0.3s"
      >
        <el-card
          shadow="hover"
          class="rounded-lg border-0 h-full transition-all duration-300 hover:shadow-lg"
        >
          <div class="flex items-center">
            <el-avatar :size="40" class="text-yellow-600 bg-yellow-100">
              <el-icon><Money /></el-icon>
            </el-avatar>
            <div class="ml-3">
              <p class="text-xs md:text-sm font-medium text-gray-600">总收入</p>
              <p class="text-lg md:text-2xl font-bold text-gray-900">¥12,345</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        class="mb-4 md:mb-0 animate-fade-in-up"
        style="animation-delay: 0.4s"
      >
        <el-card
          shadow="hover"
          class="rounded-lg border-0 h-full transition-all duration-300 hover:shadow-lg"
        >
          <div class="flex items-center">
            <el-avatar :size="40" class="text-red-600 bg-red-100">
              <el-icon><Cpu /></el-icon>
            </el-avatar>
            <div class="ml-3">
              <p class="text-xs md:text-sm font-medium text-gray-600">系统负载</p>
              <p class="text-lg md:text-2xl font-bold text-gray-900">23%</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="12" class="mb-6 animate-fade-in">
      <el-col :xs="24" :sm="12" class="mb-4 md:mb-0 animate-slide-in-left">
        <el-card shadow="hover" class="rounded-lg border-0 h-full">
          <template #header>
            <div class="flex items-center">
              <el-icon class="mr-2 text-blue-500">
                <TrendCharts />
              </el-icon>
              <span class="font-semibold text-sm">访问趋势</span>
            </div>
          </template>
          <div class="h-64 md:h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <el-empty description="图表占位符" />
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" class="mb-4 md:mb-0 animate-slide-in-right">
        <el-card shadow="hover" class="rounded-lg border-0 h-full">
          <template #header>
            <div class="flex items-center">
              <el-icon class="mr-2 text-green-500">
                <User />
              </el-icon>
              <span class="font-semibold text-sm">用户分布</span>
            </div>
          </template>
          <div class="h-64 md:h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <el-empty description="地图占位符" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近活动 -->
    <el-card
      v-permission:all="['admin', 'user']"
      class="recent-activities rounded-lg border-0 animate-fade-in-up"
    >
      <template #header>
        <div class="card-header">
          <span class="font-semibold text-sm">最近活动</span>
          <el-button type="primary" link size="small">查看全部</el-button>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in recentActivities"
          :key="activity.id"
          :timestamp="activity.time"
          :type="activity.type"
          placement="top"
          class="animate-fade-in"
          :style="{ animationDelay: index * 0.1 + 's' }"
        >
          <el-card shadow="hover" class="rounded-lg border-0">
            <div class="activity-item">
              <el-avatar :size="28" :icon="activity.icon" />
              <div class="activity-content ml-2">
                <p class="activity-message text-sm">{{ activity.message }}</p>
                <p class="activity-detail text-xs text-gray-500">{{ activity.detail }}</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, type Component } from 'vue'
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
  icon: Component
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
:deep(.el-timeline-item__node) {
  background-color: #409eff;
}

:deep(.el-timeline-item__timestamp) {
  color: #909399;
  font-size: 12px;
}

/* 动画样式 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

.animate-slide-in-left {
  animation: slide-in-left 0.5s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out forwards;
}

.animate-staggered-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>
