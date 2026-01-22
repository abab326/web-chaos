<template>
  <div class="base-title flex items-center gap-2">
    <div
      class="base-title__text flex items-center gap-1 text-(--title-font-size)"
      :style="{ '--title-font-size': computedFontSize }"
    >
      <span
        v-if="showTitleLabel"
        class="w-1 inline-block h-(--title-font-size) bg-(--el-color-primary) rounded-[1px]"
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
