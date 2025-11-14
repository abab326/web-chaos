<template>
  <div class="pagination-wrapper">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="disabled"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationParams } from '@/types'

// 定义props
const props = defineProps<{
  modelValue?: PaginationParams
  total: number
  pageSizes?: number[]
  disabled?: boolean
}>()

// 定义emits
const emit = defineEmits<{
  'update:modelValue': [value: PaginationParams]
  'page-change': [value: PaginationParams]
}>()

// 默认分页参数
const defaultPagination: PaginationParams = {
  page: 1,
  pageSize: 10
}

// 计算当前页
const currentPage = computed({
  get: () => props.modelValue?.page || defaultPagination.page,
  set: (val: number) => {
    const newPagination = {
      ...(props.modelValue || defaultPagination),
      page: val
    }
    emit('update:modelValue', newPagination)
    emit('page-change', newPagination)
  }
})

// 计算每页大小
const pageSize = computed({
  get: () => props.modelValue?.pageSize || defaultPagination.pageSize,
  set: (val: number) => {
    const newPagination = {
      ...(props.modelValue || defaultPagination),
      pageSize: val,
      page: 1 // 重置到第一页
    }
    emit('update:modelValue', newPagination)
    emit('page-change', newPagination)
  }
})

// 处理每页大小变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
}

// 处理当前页变化
const handleCurrentChange = (current: number) => {
  currentPage.value = current
}
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>