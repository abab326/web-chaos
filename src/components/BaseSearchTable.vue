<template>
  <div class="base-search-table flex flex-col h-full w-full overflow-hidden">
    <!-- 搜索区 -->
    <div class="search-area shrink-0">
      <slot name="search"></slot>
    </div>

    <!-- 功能区 -->
    <div class="action-area shrink-0">
      <slot name="action"></slot>
    </div>

    <!-- 表格区 -->
    <div ref="tableAreaRef" class="table-area flex-1 overflow-hidden">
      <slot name="table" :table-height="tableHeight"></slot>

      <!-- 分页区 -->
      <div ref="paginationAreaRef" class="pagination-area shrink-0">
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, useTemplateRef, type VNode } from 'vue'

import { useElementSize } from '@vueuse/core'

// 表格容器元素引用
const tableAreaRef = useTemplateRef<HTMLDivElement>('tableAreaRef')
// 分页容器元素引用
const paginationAreaRef = useTemplateRef<HTMLDivElement>('paginationAreaRef')

// 表格容器元素尺寸
const { height: tableAreaHeight } = useElementSize(tableAreaRef)
// 分页容器元素尺寸
const { height: paginationAreaHeight } = useElementSize(paginationAreaRef)
// 表格高度 = 表格容器高度 - 分页容器高度
const tableHeight = computed(() => tableAreaHeight.value - paginationAreaHeight.value)

// slot 插槽
defineSlots<{
  search: () => VNode[]
  action: () => VNode[]
  table: (props: { tableHeight: number }) => VNode[]
  pagination: () => VNode[]
}>()
</script>

<style scoped></style>
