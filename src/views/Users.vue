<template>
  <div class="space-y-6">
    <!-- 页面标题和操作栏 -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">用户管理</h1>
        <p class="text-gray-600 mt-1">管理系统用户和权限</p>
      </div>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
        添加用户
      </button>
    </div>

    <!-- 搜索和筛选 -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input 
            type="text" 
            placeholder="搜索用户..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>全部状态</option>
          <option>启用</option>
          <option>禁用</option>
        </select>
        <select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>全部角色</option>
          <option>管理员</option>
          <option>编辑</option>
          <option>用户</option>
        </select>
      </div>
    </div>

    <!-- 用户表格 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold">{{ user.initials }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getRoleClass(user.role)"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ user.status === 'active' ? '启用' : '禁用' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.createdAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-900">编辑</button>
                  <button class="text-gray-600 hover:text-gray-900">查看</button>
                  <button 
                    class="text-red-600 hover:text-red-900"
                    :class="{ 'text-gray-400 cursor-not-allowed': user.id === 1 }"
                    :disabled="user.id === 1"
                  >
                    {{ user.id === 1 ? '不可删除' : '删除' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-700">
                显示 <span class="font-medium">1</span> 到 <span class="font-medium">10</span> 条，共 <span class="font-medium">{{ users.length }}</span> 条结果
              </p>
            </div>
            <div class="flex space-x-2">
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                上一页
              </button>
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface User {
  id: number
  name: string
  initials: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

const users = ref<User[]>([
  {
    id: 1,
    name: '管理员',
    initials: 'A',
    email: 'admin@example.com',
    role: '管理员',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    name: '张三',
    initials: 'Z',
    email: 'zhangsan@example.com',
    role: '编辑',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: 3,
    name: '李四',
    initials: 'L',
    email: 'lisi@example.com',
    role: '用户',
    status: 'active',
    createdAt: '2024-02-01'
  },
  {
    id: 4,
    name: '王五',
    initials: 'W',
    email: 'wangwu@example.com',
    role: '用户',
    status: 'inactive',
    createdAt: '2024-02-15'
  }
])

const getRoleClass = (role: string) => {
  const classes = {
    '管理员': 'bg-purple-100 text-purple-800',
    '编辑': 'bg-blue-100 text-blue-800',
    '用户': 'bg-gray-100 text-gray-800'
  }
  return classes[role as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
/* 自定义样式 */
</style>