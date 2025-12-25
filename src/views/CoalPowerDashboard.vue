<template>
  <div class="coal-power-dashboard">
    <!-- 顶部导航栏 -->
    <div class="top-nav bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-800">中国煤电生产运营智能管控平台</h1>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex space-x-2">
            <el-button type="text" size="small">首页</el-button>
            <el-button type="text" size="small">图形化业务管理</el-button>
            <el-button type="text" size="small">生产应用</el-button>
            <el-button type="text" size="small">生产管理</el-button>
            <el-button type="text" size="small">运营应用</el-button>
            <el-button type="text" size="small">运营管理</el-button>
            <el-button type="text" size="small">深度应用</el-button>
            <el-button type="text" size="small">更多</el-button>
          </div>
          <div class="flex items-center space-x-3">
            <el-avatar size="small">王</el-avatar>
            <span class="text-sm text-gray-600">王总</span>
            <el-button type="text" size="small">退出</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 欢迎卡片 -->
    <div
      class="welcome-card bg-linear-to-r from-red-500/5 to-blue-600 text-white rounded-lg p-4 mb-4 mt-4"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold">Hi 早上好，欢迎登录本系统</h2>
            <p class="text-sm opacity-90">2024-07-08 星期三</p>
          </div>
          <div class="flex items-center space-x-3">
            <div class="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm">
              待办事项 <span class="ml-1 text-red-300">●</span> 已办
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 pb-8">
      <!-- 生产数据统计 -->
      <el-row :gutter="12" class="mb-6">
        <!-- 原煤产量 -->
        <el-col :xs="24" :sm="12" :md="6" :lg="6">
          <el-card class="rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">原煤产量</p>
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-gray-800">22</span>
                  <span class="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded"
                    >日计划
                  </span>
                </div>
              </div>
              <el-avatar :size="40" class="bg-blue-100 text-blue-600">
                <el-icon><TrendCharts /></el-icon>
              </el-avatar>
            </div>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500">累计完成</span>
                <span class="font-medium text-gray-800">453</span>
              </div>
              <div class="flex items-center justify-between text-xs mt-1">
                <span class="text-gray-500">累计产量</span>
                <span class="font-medium text-gray-800">1,235</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 商品煤产量 -->
        <el-col :xs="24" :sm="12" :md="6" :lg="6">
          <el-card class="rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">商品煤产量</p>
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-gray-800">22</span>
                  <span class="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded"
                    >日计划</span
                  >
                </div>
              </div>
              <el-avatar :size="40" class="bg-green-100 text-green-600">
                <el-icon><TrendCharts /></el-icon>
              </el-avatar>
            </div>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500">累计完成</span>
                <span class="font-medium text-gray-800">453</span>
              </div>
              <div class="flex items-center justify-between text-xs mt-1">
                <span class="text-gray-500">累计产量</span>
                <span class="font-medium text-gray-800">1,235</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 发电量 -->
        <el-col :xs="24" :sm="12" :md="6" :lg="6">
          <el-card class="rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">发电量</p>
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-gray-800">22</span>
                  <span class="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded"
                    >日计划</span
                  >
                </div>
              </div>
              <el-avatar :size="40" class="bg-yellow-100 text-yellow-600">
                <el-icon><TrendCharts /></el-icon>
              </el-avatar>
            </div>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500">累计完成</span>
                <span class="font-medium text-gray-800">453</span>
              </div>
              <div class="flex items-center justify-between text-xs mt-1">
                <span class="text-gray-500">累计产量</span>
                <span class="font-medium text-gray-800">1,235</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 供热量 -->
        <el-col :xs="24" :sm="12" :md="6" :lg="6">
          <el-card class="rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">供热量</p>
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-gray-800">22</span>
                  <span class="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded"
                    >日计划</span
                  >
                </div>
              </div>
              <el-avatar :size="40" class="bg-red-100 text-red-600">
                <el-icon><TrendCharts /></el-icon>
              </el-avatar>
            </div>
            <div class="mt-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500">累计完成</span>
                <span class="font-medium text-gray-800">453</span>
              </div>
              <div class="flex items-center justify-between text-xs mt-1">
                <span class="text-gray-500">累计产量</span>
                <span class="font-medium text-gray-800">1,235</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 图表区域 -->
      <el-row :gutter="12" class="mb-6">
        <!-- 原煤产量趋势 -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="rounded-lg shadow-sm">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-800">原煤产量趋势</h3>
                <div class="flex items-center space-x-2">
                  <el-button type="text" size="small">日</el-button>
                  <el-button type="text" size="small" class="text-blue-600 border-b border-blue-600"
                    >月</el-button
                  >
                  <el-button type="text" size="small">年</el-button>
                </div>
              </div>
            </template>
            <div class="chart-wrapper h-64">
              <!-- 这里将放置图表组件 -->
              <div class="flex items-center justify-center h-full bg-gray-50 rounded">
                <el-empty description="图表组件占位符" />
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 商品煤产量趋势 -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="rounded-lg shadow-sm">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-800">商品煤产量趋势</h3>
                <div class="flex items-center space-x-2">
                  <el-button type="text" size="small">日</el-button>
                  <el-button type="text" size="small" class="text-blue-600 border-b border-blue-600"
                    >月</el-button
                  >
                  <el-button type="text" size="small">年</el-button>
                </div>
              </div>
            </template>
            <div class="chart-wrapper h-64">
              <!-- 这里将放置图表组件 -->
              <div class="flex items-center justify-center h-full bg-gray-50 rounded">
                <el-empty description="图表组件占位符" />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 数据分析和计划完成情况 -->
      <el-row :gutter="12" class="mb-6">
        <!-- 热值加权分析 -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="rounded-lg shadow-sm">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-800">热值加权分析</h3>
                <div class="flex items-center space-x-2">
                  <el-button type="text" size="small">年度</el-button>
                  <el-button type="text" size="small" class="text-blue-600 border-b border-blue-600"
                    >月度</el-button
                  >
                </div>
              </div>
            </template>
            <div class="chart-wrapper h-64">
              <!-- 这里将放置图表组件 -->
              <div class="flex items-center justify-center h-full bg-gray-50 rounded">
                <el-empty description="图表组件占位符" />
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 计划完成情况 -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="rounded-lg shadow-sm">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-800">计划完成情况</h3>
                <div class="flex items-center space-x-2">
                  <el-button type="text" size="small">月度</el-button>
                </div>
              </div>
            </template>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-gray-500">原煤产量(万吨)</span>
                  <span class="text-xs text-gray-700">72.27</span>
                </div>
                <el-progress :percentage="89" :stroke-width="8" :show-text="false" />
                <div class="flex items-center justify-between mt-1">
                  <span class="text-xs text-gray-500">计划:80</span>
                  <span class="text-xs text-green-600">完成率:89%</span>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-gray-500">发电量(亿千瓦时)</span>
                  <span class="text-xs text-gray-700">54.51</span>
                </div>
                <el-progress :percentage="85" :stroke-width="8" :show-text="false" />
                <div class="flex items-center justify-between mt-1">
                  <span class="text-xs text-gray-500">计划:64</span>
                  <span class="text-xs text-green-600">完成率:85%</span>
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-gray-500">供热量(万吉焦)</span>
                  <span class="text-xs text-gray-700">42.51</span>
                </div>
                <el-progress :percentage="95" :stroke-width="8" :show-text="false" />
                <div class="flex items-center justify-between mt-1">
                  <span class="text-xs text-gray-500">计划:45</span>
                  <span class="text-xs text-green-600">完成率:95%</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 价格和库存信息 -->
      <el-row :gutter="12">
        <!-- 煤炭价格 -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="rounded-2xl shadow-sm">
            <template #header>
              <h3 class="text-sm font-medium text-gray-800">煤炭价格</h3>
            </template>
            <div class="chart-wrapper h-64">
              <!-- 这里将放置图表组件 -->
              <div class="flex items-center justify-center h-full bg-gray-50 rounded">
                <el-empty description="图表组件占位符" />
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- 商品煤库存 -->
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-card class="rounded-lg shadow-sm">
            <template #header>
              <h3 class="text-sm font-medium text-gray-800">商品煤库存</h3>
            </template>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500 mb-1">港口库存</p>
                  <span class="text-2xl font-bold text-gray-800">213.28</span>
                </div>
                <el-avatar :size="40" class="bg-blue-100 text-blue-600">
                  <el-icon><DataAnalysis /></el-icon>
                </el-avatar>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500 mb-1">电厂库存</p>
                  <span class="text-2xl font-bold text-gray-800">371.76</span>
                </div>
                <el-avatar :size="40" class="bg-green-100 text-green-600">
                  <el-icon><DataAnalysis /></el-icon>
                </el-avatar>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500 mb-1">社会库存</p>
                  <span class="text-2xl font-bold text-gray-800">2091.31</span>
                </div>
                <el-avatar :size="40" class="bg-yellow-100 text-yellow-600">
                  <el-icon><DataAnalysis /></el-icon>
                </el-avatar>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500 mb-1">港口库存可用天数</p>
                  <span class="text-2xl font-bold text-gray-800">10.01%</span>
                </div>
                <el-avatar :size="40" class="bg-red-100 text-red-600">
                  <el-icon><DataAnalysis /></el-icon>
                </el-avatar>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 右侧通知栏 -->
      <el-row :gutter="12">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-medium text-gray-800">待办事项</h3>
            <el-button type="text" size="small">全部</el-button>
          </div>
          <el-card class="rounded-lg shadow-sm">
            <div class="space-y-3">
              <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded">
                <div
                  class="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center mt-1"
                >
                  <el-icon :size="16"><Bell /></el-icon>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-800">创新型企业创建验收整改报告</p>
                  <p class="text-xs text-gray-500 mt-1">
                    创新型企业创建验收整改报告已提交，请及时处理
                  </p>
                </div>
                <span class="text-xs text-gray-400">2024-07-05</span>
              </div>
              <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded">
                <div
                  class="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center mt-1"
                >
                  <el-icon :size="16"><Bell /></el-icon>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-800">创新型企业创建验收整改报告</p>
                  <p class="text-xs text-gray-500 mt-1">
                    创新型企业创建验收整改报告已提交，请及时处理
                  </p>
                </div>
                <span class="text-xs text-gray-400">2024-07-05</span>
              </div>
              <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded">
                <div
                  class="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center mt-1"
                >
                  <el-icon :size="16"><Bell /></el-icon>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-800">创新型企业创建验收整改报告</p>
                  <p class="text-xs text-gray-500 mt-1">
                    创新型企业创建验收整改报告已提交，请及时处理
                  </p>
                </div>
                <span class="text-xs text-gray-400">2024-07-05</span>
              </div>
              <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded">
                <div
                  class="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center mt-1"
                >
                  <el-icon :size="16"><Bell /></el-icon>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-800">创新型企业创建验收整改报告</p>
                  <p class="text-xs text-gray-500 mt-1">
                    创新型企业创建验收整改报告已提交，请及时处理
                  </p>
                </div>
                <span class="text-xs text-gray-400">2024-07-05</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { TrendCharts, DataAnalysis, Bell } from '@element-plus/icons-vue';

// 页面初始化时的操作
onMounted(() => {
  console.log('中国煤电生产运营智能管控平台页面加载完成');
});
</script>

<style scoped>
.coal-power-dashboard {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.chart-wrapper {
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
