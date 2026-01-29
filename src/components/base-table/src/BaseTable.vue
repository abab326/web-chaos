<template>
  <el-table class="base-table" :data="tableData" style="width: 100%" :row-key="'name'">
    <slot name="default"></slot>
    <base-table-column
      v-for="item in tableColumns"
      :key="item.prop ? String(item.prop) : item.label"
      :column="item"
    >
      <template #cell="scope">
        <slot name="cell" v-bind="scope"> </slot>
      </template>
    </base-table-column>
    <el-table-column v-if="$slots.operation" v-bind="operationOption">
      <template #default="scope">
        <slot name="operation" v-bind="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
import BaseTableColumn from './BaseTableColumn.vue';
import type { TableColumn } from './type';

type OperationProp = Omit<TableColumn<T>, 'prop' | 'children'> & {
  prop: 'operation' & string;
};
// 定义组件属性
interface Props {
  tableData: T[];
  tableColumns: TableColumn<T>[];
  operationOption?: OperationProp;
}

// 定义插槽类型
interface BaseTableSlots {
  // 默认的 cell slot，保持向后兼容
  default: () => any;
  // 自定义 cell slot，保持向后兼容
  cell: (props: { row: T; column: TableColumn<T>; value: any }) => any;
  // 自��作插槽
  operation: (props: { row: T; column: TableColumn<T> }) => any;
}

defineProps<Props>();

// 定义插槽，提供类型提示
defineSlots<BaseTableSlots>();
</script>

<style lang="scss" scoped>
.base-table {
  --el-table-header-bg-color: var(--el-bg-color-page);
}
</style>
