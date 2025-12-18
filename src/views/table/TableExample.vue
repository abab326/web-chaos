<template>
  <div class="h-full">
    <base-search-table>
      <!-- 搜索区 -->
      <template #search>
        <div>搜索区</div>
      </template>
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
      <template #default="{ tableHeight }">
        <base-table :table-data="tableData" :table-columns="tableColumns" :height="tableHeight">
          <template #cell="{ row, column }">
            <template v-if="column.prop === 'createTime'">
              <span>{{ formatDate(row.createTime) }}</span>
            </template>

            <template v-if="column.prop === 'status'">
              <el-tag :type="row.status === 1 ? 'success' : 'danger'">
                {{ row.status === 1 ? '启用' : '禁用' }}
              </el-tag>
            </template>

            <template v-if="column.prop === 'roleName'">
              {{ 'slot' + row.roleName }}
            </template>

            <template v-if="column.prop === 'roleCode'">
              {{ 'slot' + row.roleCode }}
            </template>
          </template>
        </base-table>
      </template>
      <!-- 分页区 -->
      <template #pagination>
        <base-pagination
          :model-value="pagination"
          :total="total"
          @pagination-change="handlePaginationChange"
        />
      </template>
    </base-search-table>
  </div>
</template>

<script setup lang="ts">
import BasePagination from '@/components/base-pagination';
import BaseSearchTable from '@/components/base-search-table';
import BaseTable, { type TableColumn } from '@/components/base-table';

import { useSearchTable } from '@/hooks/useSearchTable';
import type { PaginationParams, PaginatedResponse } from '@/types';
import type { UserBean } from '@/types/user';

defineOptions({ name: 'TableExample' });
interface ExampleSearchParams {
  username?: string;
  status?: number;
  createTime?: Date[];
}
// 初始搜索参数
const initialSearchParams: ExampleSearchParams = {
  username: '',
  status: 0,
  createTime: [],
};
const tableColumns: TableColumn<UserBean>[] = [
  { prop: 'username', label: '用户名' },
  { prop: 'email', label: '邮箱' },
  { prop: 'phone', label: '手机号' },
  { prop: 'status', label: '状态' },
  {
    prop: 'role',
    label: '角色',
    children: [
      { prop: 'roleName', label: '角色名称' },
      { prop: 'roleCode', label: '角色编码' },
    ],
  },
  { prop: 'createTime', label: '创建时间' },
];
// 模拟数据
const mockData = () => {
  const data: UserBean[] = [];

  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i,
      username: `user${i}`,
      email: `user${i}@example.com`,
      phone: `1380013800${i}`,
      status: i % 2 === 0 ? 1 : 0,
      role: i % 3 === 0 ? '管理员' : i % 3 === 1 ? '编辑' : '普通用户',
      roleName: i % 3 === 0 ? '管理员' : i % 3 === 1 ? '编辑' : '普通用户',
      roleCode: i % 3 === 0 ? 'ADMIN' : i % 3 === 1 ? 'EDITOR' : 'USER',
      createTime: `2023-0${(i % 9) + 1}-0${(i % 9) + 1} 10:00:00`,
      lastLoginTime: `2023-0${(i % 9) + 1}-1${(i % 9) + 1} 15:00:00`,
    });
  }

  return data;
};

// 模拟API请求
const fetchData = async (
  params: ExampleSearchParams & PaginationParams
): Promise<PaginatedResponse<UserBean>> => {
  console.log('fetchData', params);
  // 模拟API请求延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 模拟数据筛选
  const filteredData = mockData().filter((item) => {
    if (params.username && !item.username.includes(params.username)) {
      return false;
    }
    if (params.status && item.status !== Number(params.status)) {
      return false;
    }
    if (params.createTime && params.createTime.length === 2) {
      const createTime = new Date(item.createTime);
      if (createTime < params.createTime[0]! || createTime > params.createTime[1]!) {
        return false;
      }
    }
    return true;
  });

  // 模拟数据分页
  const startIndex = (params.page - 1) * params.page;
  const endIndex = startIndex + params.page;

  return {
    list: filteredData.slice(startIndex, endIndex),
    total: filteredData.length,
  };
};

// 使用搜索表格hook
const { tableData, selectedItems, pagination, total, handlePaginationChange } = useSearchTable<
  UserBean,
  ExampleSearchParams
>({
  fetchData,
  initialSearchParams,
});

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
</script>

<style scoped></style>
