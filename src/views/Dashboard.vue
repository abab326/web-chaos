<template>
  <div>
    <h1>欢迎来到仪表盘</h1>
    <BaseTitle title="欢迎来到仪表盘" />
    <el-button size="small" type="primary" @click="visible = true"> 打开弹窗 </el-button>
  </div>
  <BaseDialog v-model:visible="visible" width="400px">
    <p>确认操作吗？</p>
  </BaseDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseTitle from '@/components/base-title';
import BaseDialog from '@/components/base-dialog';

defineOptions({ name: 'Dashboard' });

const visible = ref(false);
</script>

<style lang="scss" scoped></style>
