<template>
  <div>
    <el-button type="primary" @click="navigateToLogin">刷新数据</el-button>
  </div>
</template>

<script setup lang="ts">
import { eventBus } from '@/plugins/eventBus';
const navigateToLogin = () => {
  eventBus.emit('user:login', null);
};
</script>

<style lang="scss" scoped></style>
