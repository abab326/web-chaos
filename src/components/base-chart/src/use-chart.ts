import { shallowRef, useTemplateRef } from 'vue';
import type { EChartsOption, EChartsType, SetOptionOpts } from 'echarts';
import echarts from './charts';
export const useChart = (refStr: string) => {
  const chartRef = useTemplateRef<HTMLDivElement>(refStr);
  const chartInstance = shallowRef<EChartsType | null>(null);

  const getInstance = () => chartRef.value;

  const initChart = () => {
    console.log('initChart===1', chartRef.value);
    if (!chartRef.value) return;
    if (chartInstance.value) return;
    const instance = echarts.init(chartRef.value);
    console.log('initChart====2', instance);
    chartInstance.value = instance as unknown as EChartsType;
  };
  // 图表配置选项
  const setOption = (option: EChartsOption, opts?: SetOptionOpts) => {
    console.log('setOption', chartInstance.value);
    if (!chartInstance.value) return;

    chartInstance.value!.setOption(option, opts);
  };
  // 更新图表大小
  const resize = () => {
    if (!chartInstance.value) return;
    chartInstance.value.resize();
  };
  return {
    getInstance,
    initChart,
    setOption,
    resize,
  };
};
