<template>
  <div class="flex flex-col h-full w-full overflow-hidden">
    <!-- 搜索区 -->
    <div v-if="slots.search" class="shrink-0">
      <slot name="search"></slot>
    </div>

    <!-- 功能区 -->
    <div v-if="slots.action" class="shrink-0 mt-2">
      <slot name="action"></slot>
    </div>

    <!-- 表格区 -->
    <div ref="tableAreaRef" class="flex-1 overflow-hidden mt-2">
      <slot :table-height="tableHeight"></slot>

      <!-- 分页区 -->
      <div v-if="slots.pagination" ref="paginationAreaRef" class="pt-2">
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, useTemplateRef } from 'vue'
import { useElementSize } from '@vueuse/core'

import type { BaseSearchTableSlots } from './type'

defineOptions({ name: 'BaseSearchTable' })

// 表格容器元素引用
const tableAreaRef = useTemplateRef<HTMLDivElement>('tableAreaRef')
// 分页容器元素引用
const paginationAreaRef = useTemplateRef<HTMLDivElement>('paginationAreaRef')

// 表格容器元素尺寸
const { height: tableAreaHeight } = useElementSize(tableAreaRef)
// 分页容器元素尺寸
const { height: paginationAreaHeight } = useElementSize(
  paginationAreaRef,
  { width: 0, height: 0 },
  { box: 'border-box' }
)

/**
 * 计算表格可用高度
 * 表格高度 = 表格容器高度 - 分页容器高度
 */
const tableHeight = computed(() => tableAreaHeight.value - paginationAreaHeight.value)

// 定义插槽类型
const slots = defineSlots<BaseSearchTableSlots>()
</script>
