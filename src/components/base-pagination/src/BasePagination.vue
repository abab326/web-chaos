<template>
  <div class="w-full flex justify-end min-w-fit overflow-x-auto">
    <el-pagination
      v-model:current-page="modelValue.page"
      v-model:page-size="modelValue.page"
      :page-sizes="pageSizes || defaultPageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="disabled"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { PaginationParams, BasePaginationProps, BasePaginationEmits } from './type';

// 默认页面大小选项
defineOptions({ name: 'BasePagination' });
// 定义组件属性
defineProps<BasePaginationProps>();

const defaultPageSizes = [10, 20, 30, 50, 100];
// 定义事件发射器
const emits = defineEmits<BasePaginationEmits>();

// 定义双向绑定模型
const modelValue = defineModel<PaginationParams>({
  required: true,
  default: () => ({ page: 1, pageSize: 20 }),
});

/**
 * 处理当前页码变化
 * @param page 新的页码
 */
const handleCurrentChange = (page: number) => {
  const newParams = { ...modelValue.value, page };
  modelValue.value = newParams;
  emits('pagination-change', newParams);
};

/**
 * 处理页面大小变化
 * @param pageSize 新的页面大小
 */
const handleSizeChange = (pageSize: number) => {
  const newParams = { ...modelValue.value, pageSize };
  modelValue.value = newParams;
  emits('pagination-change', newParams);
};
</script>
