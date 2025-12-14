<template>
  <el-table-column :label="column.label" :prop="column.prop ? String(column.prop) : undefined">
    <template #default="{ row }">
      <template v-if="column.children && column.children.length > 0">
        <base-table-column
          v-for="item in column.children"
          :key="item.prop ? String(item.prop) : item.label"
          :column="item"
        >
          <template #cell="{ row: childRow, column: childColumn, value }">
            <slot name="cell" :row="childRow" :column="childColumn" :value="value" />
          </template>
        </base-table-column>
      </template>
      <slot v-else name="cell" :row="row" :column="column" :value="row[column.prop]" />
    </template>
  </el-table-column>
</template>

<script setup generic="T extends Record<string, any>" lang="ts">
import type { TableColumn } from './type'

interface BaseTableColumnProps<T> {
  column: TableColumn<T>
}

interface BaseTableColumnSlots<T> {
  // 自定义 cell slot，保持向后兼容
  cell: (props: { row: T; column: TableColumn<T>; value: any }) => any
}

defineProps<BaseTableColumnProps<T>>()

defineSlots<BaseTableColumnSlots<T>>()
</script>

<style scoped></style>
