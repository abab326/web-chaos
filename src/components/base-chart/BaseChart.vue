<template>
  <div ref="chartContainerRef" class="chart-container">
    <div ref="chartRef" :style="{ width: chartWidth, height: chartHeight }"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { useResizeObserver, useDebounceFn } from '@vueuse/core';
import { useChart } from './use-chart';
import type { EChartsOption, SetOptionOpts } from 'echarts';

interface EchartsChartProps {
  /** 图表配置选项 */
  option: EChartsOption;
  /** 图表主题 */
  theme?: string | Record<string, any>;
  /** 设置图表选项的配置 */
  setOptionOpts?: SetOptionOpts;
}

const props = withDefaults(defineProps<EchartsChartProps>(), {
  theme: 'default',
  setOptionOpts: () => ({}),
});

const chartWidth = ref('100%');
const chartHeight = ref('100%');
const chartContainerRef = useTemplateRef('chartContainerRef');
const { initChart, setOption, resize } = useChart('chartRef');

watch(
  () => props.option,
  (newOption) => {
    setOption(newOption, props.setOptionOpts);
  },
  { immediate: true }
);

onMounted(() => {
  initChart();
  setOption(props.option, props.setOptionOpts);
});

const debounceResize = useDebounceFn(resize, 150);

// 监听图表容器大小变化
useResizeObserver(chartContainerRef, ([entry]) => {
  if (!entry) return;
  chartWidth.value = `${entry.contentRect.width}px`;
  chartHeight.value = `${entry.contentRect.height}px`;
  debounceResize();
});
</script>
<style scoped lang="scss">
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
