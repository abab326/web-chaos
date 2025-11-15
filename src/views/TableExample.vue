<template>
  <div class="table-example-container">
    <base-search-table>
      <!-- 搜索区 -->
      <template #search> </template>
      <!-- 功能区 -->
      <template #action>
        <el-button type="primary" icon="Plus">新增</el-button>
        <el-button type="success" icon="Edit" :disabled="selectedItems.length === 0">
          编辑
        </el-button>
        <el-button type="danger" icon="Delete" :disabled="selectedItems.length === 0">
          删除
        </el-button>
        <el-button type="warning" icon="Download">导出</el-button>
      </template>
      <!-- 表格区 -->
      <template #table="{ tableHeight }">
        <el-table :data="tableData" border stripe :max-height="tableHeight">
          <el-table-column type="index" width="50" />
          <!-- 表格列 -->
          <el-table-column prop="id" label="ID" width="80" sortable />
          <el-table-column prop="username" label="用户名" width="150" />
          <el-table-column prop="email" label="邮箱" width="200" />
          <el-table-column prop="phone" label="手机号" width="150" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
                {{ scope.row.status === 1 ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="role" label="角色" width="120">
            <template #default="scope">
              <el-tag type="info">{{ scope.row.role }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" sortable />
          <el-table-column prop="lastLoginTime" label="最后登录" width="180" />
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="scope">
              <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                删除
              </el-button>
              <el-button size="small" type="warning" @click="handleDetail(scope.row)">
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页区 -->
      <template #pagination>
        <base-pagination
          :model-value="pagination"
          class="pt-2"
          :total="total"
          @pagination-change="handlePaginationChange"
        />
      </template>
    </base-search-table>
  </div>
</template>

<script setup lang="ts">
import BasePagination from '@/components/BasePagination.vue'
import BaseSearchTable from '@/components/BaseSearchTable.vue'
import { useSearchTable, type SearchParams } from '@/hooks/useSearchTable'
import type { PaginationParams, PaginatedResponse } from '@/types'

// 定义用户类型
interface User {
  id: number
  username: string
  email: string
  phone: string
  status: number
  role: string
  createTime: string
  lastLoginTime: string
}

// 初始搜索参数
const initialSearchParams: SearchParams = {
  username: '',
  status: '',
  createTime: [],
}
// 模拟数据
const mockData = () => {
  const data: User[] = []

  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i,
      username: `user${i}`,
      email: `user${i}@example.com`,
      phone: `1380013800${i}`,
      status: i % 2 === 0 ? 1 : 0,
      role: i % 3 === 0 ? '管理员' : i % 3 === 1 ? '编辑' : '普通用户',
      createTime: `2023-0${(i % 9) + 1}-0${(i % 9) + 1} 10:00:00`,
      lastLoginTime: `2023-0${(i % 9) + 1}-1${(i % 9) + 1} 15:00:00`,
    })
  }

  return data
}

// 模拟API请求
const fetchData = async (
  params: SearchParams & PaginationParams
): Promise<PaginatedResponse<User>> => {
  console.log('fetchData', params)
  // 模拟API请求延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  // 模拟数据筛选
  const filteredData = mockData().filter((item) => {
    if (params.username && !item.username.includes(params.username)) {
      return false
    }
    if (params.status && item.status !== Number(params.status)) {
      return false
    }
    if (params.createTime && params.createTime.length === 2) {
      const createTime = new Date(item.createTime)
      if (createTime < params.createTime[0]! || createTime > params.createTime[1]!) {
        return false
      }
    }
    return true
  })

  // 模拟数据分页
  const startIndex = (params.page - 1) * params.pageSize
  const endIndex = startIndex + params.pageSize

  return {
    list: filteredData.slice(startIndex, endIndex),
    total: filteredData.length,
    page: params.page,
    pageSize: params.pageSize,
  }
}

// 使用搜索表格hook
const { tableData, selectedItems, pagination, total, handlePaginationChange } =
  useSearchTable<User>({
    fetchData,
    initialSearchParams,
  })

// 编辑
const handleEdit = (row: User) => {
  console.log('编辑:', row)
}

// 删除
const handleDelete = (row: User) => {
  console.log('删除:', row)
}

// 详情
const handleDetail = (row: User) => {
  console.log('详情:', row)
}
</script>

<style scoped>
.table-example-container {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
