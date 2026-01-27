<template>
  <div>
    <BaseTable
      :table-columns="tableColumns"
      :table-data="data"
      :operation-option="operationOption"
      border
      row-key="id"
      tree-props="{ children: 'children' }"
    >
      <template #default>
        <el-table-column type="selection" align="center" header-align="center" width="55" />
      </template>
      <template #operation="{ row }">
        <el-button type="primary" link size="small">编辑</el-button>
        <el-button type="primary" link size="small" @click="addChildMenu(row)"
          >新增子菜单</el-button
        >
        <el-button type="danger" link size="small">删除</el-button>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import BaseTable, { type TableColumn } from '@/components/base-table';
import { ref } from 'vue';
import type { Menu } from '@/types/menu';

const tableColumns = ref<TableColumn<Menu>[]>([
  {
    prop: 'expand',
    label: '',
    width: '55',
    align: 'center',
    headerAlign: 'center',
  },
  {
    prop: 'id',
    label: 'ID',
    width: '80',
  },
  {
    prop: 'name',
    label: '名称',
    width: '120',
  },
  {
    prop: 'path',
    label: '路径',
    minWidth: '200',
    children: [
      {
        prop: 'isShow',
        label: '是否显示',
        width: '120',
      },
    ],
  },
  {
    prop: 'icon',
    label: '图标',
    minWidth: '120',
  },
  {
    prop: 'type',
    label: '类型',
    minWidth: '120',
  },
  {
    prop: 'isShow',
    label: '是否显示',
    minWidth: '120',
  },
]);

const operationOption = ref({
  prop: 'operation' as const,
  label: '操作',
  width: '200',
  fixed: 'right',
});

const data = ref<Menu[]>([
  {
    id: 1,
    name: '菜单管理',
    path: '/system/menu',
    icon: 'el-icon-menu',
    component: 'system/menu',
    type: 'dir',
    isShow: true,
    children: [
      {
        id: 3,
        name: '菜单列表',
        path: '/system/menu/list',
        icon: 'el-icon-menu',
        component: 'system/menu/list',
        type: 'menu',
        isShow: true,
      },
    ],
  },
  {
    id: 2,
    name: '角色管理',
    path: '/system/role',
    icon: 'el-icon-role',
    component: 'system/role',
    type: 'menu',
    isShow: true,
  },
]);

const addChildMenu = (row: Menu) => {
  if (!row.children) {
    row.children = [];
  }
  row.children.push({} as Menu);
};
</script>

<style scoped></style>
