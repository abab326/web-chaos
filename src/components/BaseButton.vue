<template>
  <el-button
    :type="type"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :plain="plain"
    :round="round"
    :circle="circle"
    @click="handleClick"
    v-bind="$attrs"
  >
    <template #default>
      <slot></slot>
    </template>
  </el-button>
</template>

<script setup lang="ts">
import type { ButtonProps } from 'element-plus'

// 定义props
interface Props extends ButtonProps {
  // 自定义属性可以在这里添加
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'default',
  loading: false,
  disabled: false,
  plain: false,
  round: false,
  circle: false
})

// 定义emits
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
/* 可以在这里添加组件特定样式 */
:deep(.el-button) {
  transition: all 0.3s ease;
}
</style>