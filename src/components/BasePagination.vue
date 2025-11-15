<template>
  <div class="pagination-wrapper">
    <el-pagination
      v-model:current-page="modelValue.page"
      v-model:page-size="modelValue.pageSize"
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
import type { PaginationParams } from '@/types'
const defaultPageSizes = [10, 20, 30, 50, 100]
defineProps<{
  total: number
  pageSizes?: number[]
  disabled?: boolean
}>()

const emits = defineEmits(['pagination-change'])

const modelValue = defineModel<PaginationParams>({
  required: true,
  default: () => ({ page: 1, pageSize: 20 }),
})

const handleCurrentChange = (page: number) => {
  emits('pagination-change', { ...modelValue.value, page })
}

const handleSizeChange = (pageSize: number) => {
  emits('pagination-change', { ...modelValue.value, pageSize })
}
</script>

<style scoped>
.pagination-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  min-width: fit-content;
  overflow-x: auto;
}
</style>
