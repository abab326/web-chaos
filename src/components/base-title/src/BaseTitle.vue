<template>
  <div class="base-title flex items-center gap-2">
    <div
      class="base-title__text flex items-center gap-1 text-(--title-font-size)"
      :style="{ '--title-font-size': computedFontSize }"
    >
      <span
        v-if="showTitleLabel"
        class="inline-block h-(--title-font-size) w-1 rounded-[1px] bg-(--el-color-primary)"
      >
        &nbsp;
      </span>
      {{ title }}
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

export interface BaseTitleProps {
  title: string;
  fontSize?: string | number;
  showTitleLabel?: boolean;
}
const props = withDefaults(defineProps<BaseTitleProps>(), {
  showTitleLabel: true,
  fontSize: '16px',
});

const computedFontSize = computed(() => {
  const fontSize = props.fontSize || '16px';
  if (/^\d+(?:\.\d+)?$/.test(fontSize + '')) {
    return fontSize + 'px';
  }
  return fontSize;
});
</script>

<style lang="scss" scoped></style>
