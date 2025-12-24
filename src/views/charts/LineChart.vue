<template>
  <div class="line-chart-container">
    <h1>折线图示例</h1>

    <!-- 基础折线图 -->
    <div class="chart-card">
      <h2>基础折线图</h2>
      <div class="chart-wrapper">
        <BaseChart
          :option="basicLineOption"
          :width="chartWidth"
          :height="chartHeight"
          @chart-ready="handleChartReady"
          @click="handleChartClick"
        />
      </div>
    </div>

    <!-- 多数据折线图 -->
    <div class="chart-card">
      <h2>多数据折线图</h2>
      <div class="chart-wrapper">
        <BaseChart
          :option="multiLineOption"
          :width="chartWidth"
          :height="chartHeight"
          @chart-ready="handleChartReady"
          @click="handleChartClick"
        />
      </div>
    </div>

    <!-- 平滑折线图 -->
    <div class="chart-card">
      <h2>平滑折线图</h2>
      <div class="chart-wrapper">
        <BaseChart
          :option="smoothLineOption"
          :width="chartWidth"
          :height="chartHeight"
          @chart-ready="handleChartReady"
          @click="handleChartClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseChart from '@/components/base-chart';
import type { EChartsOption } from 'echarts';

// 图表尺寸
const chartWidth = ref('100%');
const chartHeight = ref(400);

// 基础折线图配置
const basicLineOption: EChartsOption = {
  title: {
    text: '基础折线图',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '销售额',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
};

// 多数据折线图配置
const multiLineOption: EChartsOption = {
  title: {
    text: '多数据折线图',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
    top: '10%',
  },
  grid: {
    left: 10,
    right: 10,
    bottom: 10,

    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: '搜索引擎',
      type: 'line',
      stack: '总量',
      label: {
        show: true,
        position: 'top',
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

// 平滑折线图配置
const smoothLineOption: EChartsOption = {
  title: {
    text: '平滑折线图',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '趋势',
      data: [120, 132, 101, 134, 90, 230, 210],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#5470c6',
        width: 3,
      },
      itemStyle: {
        color: '#91cc75',
      },
    },
  ],
};

// 图表就绪事件处理
const handleChartReady = (chart: any) => {
  console.log('折线图已就绪:', chart);
};

// 图表点击事件处理
const handleChartClick = (params: any) => {
  console.log('折线图点击事件:', params);
};
</script>

<style scoped>
.line-chart-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.chart-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
}

.chart-card h2 {
  margin-top: 0;
  color: #444;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.chart-wrapper {
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
