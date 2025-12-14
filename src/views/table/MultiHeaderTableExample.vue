<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">多表头表格示例</h1>
    <base-table :table-data="tableData" :table-columns="tableColumns" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/components/base-table'
import type { TableColumn } from '@/components/base-table'

// 定义表格数据类型
interface TableRow {
  id: number
  name: string
  age: number
  address: string
  province: string
  city: string
  zip: string
  email: string
  phone: string
}

// 表格列配置，包含嵌套表头
const tableColumns: TableColumn<TableRow>[] = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  {
    label: '地址信息',
    children: [
      { prop: 'province', label: '省份' },
      { prop: 'city', label: '城市' },
      { prop: 'zip', label: '邮编' },
    ],
  },
  { prop: 'email', label: '邮箱' },
  { prop: 'phone', label: '电话' },
]

// 表格数据
const tableData = ref<TableRow[]>([
  {
    id: 1,
    name: '张三',
    age: 25,
    address: '北京市朝阳区',
    province: '北京',
    city: '北京',
    zip: '100000',
    email: 'zhangsan@example.com',
    phone: '13800138001',
  },
  {
    id: 2,
    name: '李四',
    age: 30,
    address: '上海市浦东新区',
    province: '上海',
    city: '上海',
    zip: '200000',
    email: 'lisi@example.com',
    phone: '13800138002',
  },
])
</script>
