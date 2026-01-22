<template>
  <el-header class="h-16! flex items-center border-b border-border-light p-0!">
    <div class="h-full w-full flex justify-between items-center px-2">
      <el-icon class="cursor-pointer m-2" :size="16" @click="handleToggleSidebar">
        <Fold />
      </el-icon>
      <div class="flex-1"></div>

      <div class="flex items-center gap-2">
        <!-- 通知图标 -->
        <el-badge :value="3" :max="99" class="flex! mr-2 cursor-pointer">
          <el-icon :size="24"><Bell /> </el-icon>
        </el-badge>
        <!-- dark 模式切换 -->
        <el-icon class="cursor-pointer" :size="24" @click="handleToggleDarkMode">
          <Tools />
        </el-icon>
        <!-- 用户头像 -->
        <el-dropdown trigger="click" @command="handleUserCommand">
          <span
            class="outline-none py-2 px-3 rounded transition-colors duration-200 flex items-center space-x-2 cursor-pointer text-t-primary hover:bg-primary-light-5"
          >
            <el-avatar :size="32">
              <span class="font-semibold text-t-primary">A</span>
            </el-avatar>
            <span class="text-sm font-medium text-t-primary">管理员</span>
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
import { useRouter } from 'vue-router';
import { Fold, Bell, ArrowDown, User, Lock, SwitchButton, Tools } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import { useDark, useToggle } from '@vueuse/core';
import { useUserStore } from '@/store/modules/user';

const router = useRouter();
const isDark = useDark();
const toggleDarkMode = useToggle(isDark);

// Emits
const emit = defineEmits<{
  'toggle-sidebar': [];
}>();

// 处理切换侧边栏
const handleToggleSidebar = () => {
  emit('toggle-sidebar');
};

// 处理切换暗黑模式
const handleToggleDarkMode = () => {
  toggleDarkMode();
};
// 退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    ElMessage.success('退出登录成功');
    const userStore = useUserStore();
    await userStore.logout();
    router.push('/login');
  } catch {
    // 用户取消操作
  }
};

// 处理用户菜单命令
const handleUserCommand = async (command: string) => {
  const commandMap: Record<string, () => any> = {
    profile: () => ElMessage.info('打开个人设置'),
    password: () => ElMessage.info('打开修改密码'),
    logout: handleLogout,
  };
  const handler = commandMap[command];
  if (handler) {
    handler();
  }
};
</script>

<style scoped></style>
