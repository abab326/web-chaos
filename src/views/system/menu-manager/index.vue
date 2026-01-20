<template>
  <div>
    <BaseTable
      :table-columns="tableColumns"
      :table-data="data"
      border
      row-key="id"
      ree-props="{ children: 'children' }"
    >
      <template #default>
        <el-table-column type="selection" align="center" header-align="center" width="55" />
      </template>
      <template #operation>
        <el-button type="primary" link size="small">编辑</el-button>
        <el-button type="primary" link size="small">新增子菜单</el-button>
        <el-button type="danger" link size="small">删除</el-button>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import BaseTable, { type TableColumn } from '@/components/base-table';
import { ref } from 'vue';

interface Menu {
  id: number;
  expand?: boolean;
  name: string;
  path: string;
  icon: string;
  children?: Menu[];
}

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
  },
  {
    prop: 'icon',
    label: '图标',
    minWidth: '120',
  },
]);

const data = ref<Menu[]>([
  {
    id: 1,
    name: '菜单管理',
    path: '/system/menu',
    icon: 'el-icon-menu',
    children: [
      {
        id: 3,
        name: '菜单列表',
        path: '/system/menu/list',
        icon: 'el-icon-menu',
      },
    ],
  },
  {
    id: 2,
    name: '角色管理',
    path: '/system/role',
    icon: 'el-icon-role',
  },
]);
</script>

<style scoped></style>
