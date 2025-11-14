<template>
  <div ref="tableContainer" class="base-search-table">
    <!-- 搜索区 -->
    <div v-if="showSearch" class="search-area">
      <slot name="search"></slot>
    </div>

    <!-- 功能区 -->
    <div class="action-area">
      <slot name="action"></slot>
    </div>

    <!-- 表格区 -->
    <div ref="tableAreaRef" class="table-area">
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        :border="border"
        :stripe="stripe"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :row-key="rowKey"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :max-height="tableContainerHeight"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDblClick"
        @current-change="handleCurrentChange"
        @header-click="handleHeaderClick"
        @sort-change="handleSortChange"
        @filter-change="handleFilterChange"
        @expand-change="handleExpandChange"
      >
        <!-- 多选框列 -->
        <el-table-column
          v-if="showSelection"
          type="selection"
          :reserve-selection="reserveSelection"
          :width="selectionWidth"
        ></el-table-column>

        <!-- 展开行 -->
        <el-table-column v-if="expandable" type="expand">
          <template #default="scope">
            <slot name="expand" :row="scope.row"></slot>
          </template>
        </el-table-column>

        <!-- 自定义列 -->
        <slot></slot>
      </el-table>
    </div>

    <!-- 分页区 -->
    <div class="pagination-area">
      <base-pagination
        :model-value="pagination"
        :total="total"
        :page-sizes="pageSizes"
        :disabled="disabled"
        @update:model-value="handlePaginationChange"
        @page-change="handlePaginationChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, watch, useTemplateRef } from 'vue'
import { ElTable } from 'element-plus'
import type { TableInstance, TableColumnCtx } from 'element-plus'

import { useElementSize } from '@vueuse/core'
import type { PaginationParams } from '@/types'
import BasePagination from './BasePagination.vue'

// 定义props
const props = withDefaults(
  defineProps<{
    // 表格数据
    data: T[]
    // 总条数
    total: number
    // 分页参数
    pagination: PaginationParams
    // 是否显示搜索区
    showSearch?: boolean
    // 是否显示功能区
    showAction?: boolean
    // 是否显示多选框
    showSelection?: boolean
    // 是否显示边框
    border?: boolean
    // 是否显示斑马纹
    stripe?: boolean
    // 是否显示表头
    showHeader?: boolean
    // 是否高亮当前行
    highlightCurrentRow?: boolean
    // 行key
    rowKey?: string | ((row: T) => string)
    // 是否默认展开所有行
    defaultExpandAll?: boolean
    // 展开的行key
    expandRowKeys?: string[]
    // 是否可展开
    expandable?: boolean
    // 加载状态
    loading?: boolean
    // 禁用分页
    disabled?: boolean
    // 每页大小选项
    pageSizes?: number[]
    // 多选框列宽
    selectionWidth?: number
    // 是否保留选中状态
    reserveSelection?: boolean
    // 最大高度
    maxHeight?: number
    // 自定义表格高度计算
    customHeightCalculator?: () => number
    // 搜索区高度（用于计算表格高度，仅在需要兼容旧代码时使用）
    searchAreaHeight?: number
    // 功能区高度（用于计算表格高度，仅在需要兼容旧代码时使用）
    actionAreaHeight?: number
    // 分页区高度（用于计算表格高度，仅在需要兼容旧代码时使用）
    paginationAreaHeight?: number
  }>(),
  {
    showSearch: true,
    showAction: true,
    showSelection: false,
    border: false,
    stripe: false,
    showHeader: true,
    highlightCurrentRow: false,
    rowKey: 'id',
    defaultExpandAll: false,
    expandable: false,
    loading: false,
    disabled: false,
    pageSizes: () => [10, 20, 50, 100],
    selectionWidth: 50,
    reserveSelection: false,
    searchAreaHeight: 60,
    actionAreaHeight: 40,
    paginationAreaHeight: 40,
  }
)

// 定义emits
const emit = defineEmits<{
  // 分页变化
  'update:pagination': [value: PaginationParams]
  // 分页变化
  'pagination-change': [value: PaginationParams]
  // 选择变化
  'selection-change': [selection: T[]]
  // 行点击
  'row-click': [row: T, column: TableColumnCtx<T>, event: MouseEvent]
  // 行双击
  'row-dblclick': [row: T, column: TableColumnCtx<T>, event: MouseEvent]
  // 当前行变化
  'current-change': [currentRow: T, oldCurrentRow: T]
  // 表头点击
  'header-click': [column: TableColumnCtx<T>, event: MouseEvent]
  // 排序变化
  'sort-change': [column: TableColumnCtx<T>, prop: string, order: string]
  // 筛选变化
  'filter-change': [filters: Record<string, (string | number)[]>]
  // 展开变化
  'expand-change': [row: T, expanded: boolean]
  // 选择
  select: [selection: T[], row: T]
  // 全选
  'select-all': [selection: T[]]
}>()
// 表格容器元素引用
const tableAreaRef = useTemplateRef<HTMLDivElement>('tableAreaRef')
// 表格引用
const tableRef = useTemplateRef<TableInstance>('tableRef')

// 表格容器元素尺寸
const { height: tableContainerHeight } = useElementSize(tableAreaRef)

// 表格数据
const tableData = ref<T[]>([])

// 监听数据变化
watch(
  () => props.data,
  (newVal) => {
    tableData.value = newVal
  },
  { deep: true }
)

// 处理分页变化
const handlePaginationChange = (pagination: PaginationParams) => {
  emit('update:pagination', pagination)
  emit('pagination-change', pagination)
}

// 处理选择变化
const handleSelectionChange = (selection: T[]) => {
  emit('selection-change', selection)
}

// 处理行点击
const handleRowClick = (row: T, column: TableColumnCtx<T>, event: MouseEvent) => {
  emit('row-click', row, column, event)
}

// 处理行双击
const handleRowDblClick = (row: T, column: TableColumnCtx<T>, event: MouseEvent) => {
  emit('row-dblclick', row, column, event)
}

// 处理当前行变化
const handleCurrentChange = (currentRow: T, oldCurrentRow: T) => {
  emit('current-change', currentRow, oldCurrentRow)
}

// 处理表头点击
const handleHeaderClick = (column: TableColumnCtx<T>, event: MouseEvent) => {
  emit('header-click', column, event)
}

// 处理排序变化
const handleSortChange = (column: TableColumnCtx<T>) => {
  emit('sort-change', column, column.property!, column.order!)
}

// 处理筛选变化
const handleFilterChange = (filters: Record<string, (string | number)[]>) => {
  emit('filter-change', filters)
}

// 处理展开变化
const handleExpandChange = (row: T, expanded: boolean) => {
  emit('expand-change', row, expanded)
}

// 处理选择
const handleSelect = (selection: T[], row: T) => {
  emit('select', selection, row)
}

// 处理全选
const handleSelectAll = (selection: T[]) => {
  emit('select-all', selection)
}

// 暴露方法
defineExpose({
  tableRef,
})
</script>

<style scoped>
.base-search-table {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.search-area {
  padding: 15px;
}

.action-area {
  padding: 10px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #e4e7ed;
}

.table-area {
  flex: 1;
  overflow: hidden;
}

.pagination-area {
  padding-top: 10px;
  border-top: 1px solid #e4e7ed;
}
</style>
