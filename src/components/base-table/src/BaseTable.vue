<template>
  <el-table :data="tableData" style="width: 100%">
    <slot name="default"></slot>
    <base-table-column
      v-for="item in tableColumns"
      :key="item.prop ? String(item.prop) : item.label"
      :column="item"
    >
      <template #cell="scope">
        <slot name="cell" v-bind="scope">
          {{ scope.value }}
        </slot>
      </template>
    </base-table-column>
  </el-table>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import BaseTableColumn from './BaseTableColumn.vue';
import type { TableColumn } from './type';

// 定义组件属性
interface Props {
  tableData: T[];
  tableColumns: TableColumn<T>[];
}

// 定义插槽类型
interface BaseTableSlots<T> {
  // 默认的 cell slot，保持向后兼容
  default: () => any;
  // 自定义 cell slot，保持向后兼容
  cell: (props: { row: T; column: TableColumn<T>; value: any }) => any;
}

defineProps<Props>();

// 定义插槽，提供类型提示
defineSlots<BaseTableSlots<T>>();
</script>

<style lang="scss" scoped></style>
