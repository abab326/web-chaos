<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #title>
      <BaseTitle :title="title" />
    </template>
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel"> 取 消 </el-button>
        <el-button type="primary" @click="handleOk"> 确 定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import BaseTitle from '@/components/base-title';

export interface BaseDialogProps {
  title?: string;
  width?: string | number;
}
const visible = defineModel('visible', { default: false, type: Boolean });

withDefaults(defineProps<BaseDialogProps>(), {
  title: '提示',
  width: '600px',
});

const handleCancel = () => {
  visible.value = false;
};

const handleOk = () => {
  visible.value = false;
};
</script>

<style lang="scss" scoped></style>
