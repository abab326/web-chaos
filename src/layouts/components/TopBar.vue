<template>
  <el-header class="bg-bg border-border-light flex h-16! items-center border-b p-0!">
    <div class="flex h-full w-full items-center justify-between px-2">
      <el-icon class="m-2 cursor-pointer" :size="16" @click="handleToggleSidebar">
        <Fold />
      </el-icon>
      <div class="flex-1"></div>

      <div class="flex items-center gap-2">
        <!-- 通知图标 -->
        <el-badge :value="3" :max="99" class="mr-2 flex! cursor-pointer">
          <el-icon :size="24"><Bell /></el-icon>
        </el-badge>
        <!-- dark 模式切换 -->
        <el-icon class="cursor-pointer" :size="24" @click="handleToggleDarkMode">
          <Tools />
        </el-icon>
        <!-- 用户头像 -->
        <el-dropdown trigger="click" @command="handleUserCommand">
          <span
            class="text-t-primary hover:bg-primary-light-5 flex cursor-pointer items-center space-x-2 rounded px-3 py-2 transition-colors duration-200 outline-none"
          >
            <el-avatar :size="32">
              <span class="text-t-primary font-semibold">A</span>
            </el-avatar>
            <span class="text-t-primary text-sm font-medium">管理员</span>
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
