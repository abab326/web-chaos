<template>
  <el-card class="h-full flex flex-col">
    <!-- 页面标题和操作栏 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">用户管理</h1>
        <p class="text-gray-600 mt-1">管理系统用户和权限</p>
      </div>
      <el-button type="primary"> 添加用户 </el-button>
    </div>

    <!-- 搜索和筛选 -->
    <el-card class="mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <el-input placeholder="搜索用户..." clearable />
        </div>
        <el-select placeholder="全部状态" style="width: 150px">
          <el-option label="全部状态" value="" />
          <el-option label="启用" value="active" />
          <el-option label="禁用" value="inactive" />
        </el-select>
        <el-select placeholder="全部角色" style="width: 150px">
          <el-option label="全部角色" value="" />
          <el-option label="管理员" value="管理员" />
          <el-option label="编辑" value="编辑" />
          <el-option label="用户" value="用户" />
        </el-select>
      </div>
    </el-card>

    <!-- 用户表格 -->
    <el-card class="flex-1 mb-6">
      <el-table :data="users" class="w-full" stripe>
        <el-table-column prop="name" label="用户" width="180">
          <template #default="scope">
            <div class="flex items-center">
              <el-avatar :size="32">{{ scope.row.initials }}</el-avatar>
              <span class="ml-3">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="role" label="角色" width="120">
          <template #default="scope">
            <el-tag :type="getRoleType(scope.row.role)">
              {{ scope.row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
              {{ scope.row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="注册时间" width="120" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <div class="flex space-x-2">
              <el-button type="primary" size="small" text>编辑</el-button>
              <el-button size="small" text>查看</el-button>
              <el-button
                type="danger"
                size="small"
                text
                :disabled="scope.row.id === 1"
                @click="handleDelete(scope.row)"
              >
                {{ scope.row.id === 1 ? '不可删除' : '删除' }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-between items-center">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :total="users.length"
          :page-sizes="[10, 20, 30, 50]"
        />
      </div>
    </el-card>

    <!-- 图标示例 -->
    <div class="flex items-center justify-center">
      <span class="icon-[mdi-light--home]"></span>
      <span :class="`icon-[${iconName}]`"></span>
      <Icon icon="mdi-light:home" class="w-6 h-6 text-gray-500"></Icon>
      <Icon :icon="iconName" class="w-6 h-6 text-gray-500"></Icon>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { ElMessage, ElMessageBox, ElTag } from 'element-plus';

interface User {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

defineOptions({ name: 'Users' });

const iconName = ref('tdesign:arrow-up-down-circle-filled');

const users = ref<User[]>([
  {
    id: 1,
    name: '管理员',
    initials: 'A',
    email: 'admin@example.com',
    role: '管理员',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: '张三',
    initials: 'Z',
    email: 'zhangsan@example.com',
    role: '编辑',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 3,
    name: '李四',
    initials: 'L',
    email: 'lisi@example.com',
    role: '用户',
    status: 'active',
    createdAt: '2024-02-01',
  },
  {
    id: 4,
    name: '王五',
    initials: 'W',
    email: 'wangwu@example.com',
    role: '用户',
    status: 'inactive',
    createdAt: '2024-02-15',
  },
]);

const getRoleType = (role: string): 'success' | 'info' | 'warning' | 'danger' => {
  const types: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
    管理员: 'danger',
    编辑: 'warning',
    用户: 'info',
  };
  return types[role] || 'info';
};

const handleDelete = (user: User) => {
  if (user.id === 1) {
    ElMessage.warning('不能删除管理员账户');
    return;
  }

  ElMessageBox.confirm(`确定要删除用户 "${user.name}" 吗？`, '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 这里应该调用API删除用户
      users.value = users.value.filter((item) => item.id !== user.id);
      ElMessage.success('删除成功');
    })
    .catch(() => {
      // 用户取消删除
    });
};
</script>

<style scoped>
/* 自定义样式 */
</style>
