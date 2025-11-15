<template>
  <el-header class="">
    <div class="h-full w-full flex justify-between items-center px-2">
      <el-icon class="cursor-pointer m-2" :size="16" @click="handleToggleSidebar">
        <Fold />
      </el-icon>
      <div class="flex-1">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentRouteTitle }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="flex items-center space-x-4">
        <el-badge :value="3" :max="99" class="mr-2">
          <el-button :icon="Bell" text circle class="text-gray-500 hover:text-gray-700" />
        </el-badge>

        <el-dropdown trigger="click" @command="handleUserCommand">
          <span class="flex items-center space-x-2 cursor-pointer el-dropdown-link">
            <el-avatar :size="32" src="" class="bg-blue-500">
              <span class="font-semibold text-white">A</span>
            </el-avatar>
            <span class="text-sm font-medium text-gray-700">管理员</span>
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">
                <el-icon><User /></el-icon>
                个人设置
              </el-dropdown-item>
              <el-dropdown-item command="password">
                <el-icon><Lock /></el-icon>
                修改密码
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Fold, Bell, ArrowDown, User, Lock, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()

// Emits
const emit = defineEmits<{
  'toggle-sidebar': []
}>()

// 获取当前路由标题
const currentRouteTitle = computed(() => {
  return (route.meta?.title as string) || '仪表板'
})

// 处理切换侧边栏
const handleToggleSidebar = () => {
  emit('toggle-sidebar')
}

// 处理用户菜单命令
const handleUserCommand = async (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('打开个人设置')
      break
    case 'password':
      ElMessage.info('打开修改密码')
      break
    case 'logout':
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        ElMessage.success('退出登录成功')
        // 这里可以添加退出登录的逻辑
        router.push('/login')
      } catch {
        // 用户取消操作
      }
      break
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
  height: 64px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.el-dropdown-link {
  outline: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.el-dropdown-link:hover {
  background-color: #f5f7fa;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-header {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
