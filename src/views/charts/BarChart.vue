<template>
  <div class="bar-chart-container">
    <h1>柱状图示例</h1>

    <!-- 基础柱状图 -->
    <div class="chart-card">
      <h2>基础柱状图</h2>
      <div class="chart-wrapper">
        <BaseChart
          :option="basicBarOption"
          :width="chartWidth"
          :height="chartHeight"
          @chart-ready="handleChartReady"
          @click="handleChartClick"
        />
      </div>
    </div>

    <!-- 堆叠柱状图 -->
    <div class="chart-card">
      <h2>堆叠柱状图</h2>
      <div class="chart-wrapper">
        <BaseChart
          :option="stackedBarOption"
          :width="chartWidth"
          :height="chartHeight"
          @chart-ready="handleChartReady"
          @click="handleChartClick"
        />
      </div>
    </div>

    <!-- 水平柱状图 -->
    <div class="chart-card">
      <h2>水平柱状图</h2>
      <div class="chart-wrapper">
        <BaseChart
          :option="horizontalBarOption"
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

// 基础柱状图配置
const basicBarOption: EChartsOption = {
  title: {
    text: '基础柱状图',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '销售额',
      data: [10, 52, 200, 334, 390, 330, 220],
      type: 'bar',
      barWidth: '60%',
    },
  ],
};

// 堆叠柱状图配置
const stackedBarOption: EChartsOption = {
  title: {
    text: '堆叠柱状图',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    top: '10%',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '直接访问',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series',
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: '邮件营销',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: '广告',
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '搜索引擎',
      type: 'bar',
      stack: '广告',
      label: {
        show: true,
        position: 'top',
      },
      emphasis: {
        focus: 'series',
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

// 水平柱状图配置
const horizontalBarOption: EChartsOption = {
  title: {
    text: '水平柱状图',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  series: [
    {
      name: '销售额',
      data: [10, 52, 200, 334, 390, 330, 220],
      type: 'bar',
      itemStyle: {
        color: '#91cc75',
      },
    },
  ],
};

// 图表就绪事件处理
const handleChartReady = (chart: any) => {
  console.log('柱状图已就绪:', chart);
};

// 图表点击事件处理
const handleChartClick = (params: any) => {
  console.log('柱状图点击事件:', params);
};
</script>

<style scoped>
.bar-chart-container {
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
