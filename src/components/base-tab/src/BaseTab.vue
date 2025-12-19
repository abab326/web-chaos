<template>
  <div class="custom-tab-container">
    <!-- 左侧箭头按钮 -->
    <button
      v-if="showArrow"
      class="arrow-button left-arrow"
      :class="{ 'arrow-button-disabled': !canScrollLeft }"
      :disabled="!canScrollLeft"
      aria-label="向左滚动"
      @click="scrollLeft"
      @mousedown="startAutoScroll('left')"
      @mouseup="stopAutoScroll"
      @mouseleave="stopAutoScroll"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="arrow-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Tab内容容器 -->
    <div ref="tabContainerRef" class="tab-content-container" @wheel.prevent="handleWheel">
      <div
        ref="tabContentRef"
        class="tab-content gap-2"
        :class="{ 'transition-transform': isScrolling }"
        :style="{ transform: `translateX(${scrollPosition}px)` }"
      >
        <slot></slot>
      </div>
    </div>

    <!-- 右侧箭头按钮 -->
    <button
      v-if="showArrow"
      class="arrow-button right-arrow"
      :class="{ 'arrow-button-disabled': !canScrollRight }"
      :disabled="!canScrollRight"
      aria-label="向右滚动"
      @click="scrollRight"
      @mousedown="startAutoScroll('right')"
      @mouseup="stopAutoScroll"
      @mouseleave="stopAutoScroll"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="arrow-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useElementSize } from '@vueuse/core';

// 定义props
export interface Props {
  // 每个滚动步骤的像素数
  scrollStep?: number;
  // 自动滚动速度（单位：次/秒）
  autoScrollSpeed?: number;
}

const props = withDefaults(defineProps<Props>(), {
  scrollStep: 100,
  autoScrollSpeed: 5,
});

// 定义emit
const emit = defineEmits<{
  (e: 'scroll', value: number): void;
}>();

// DOM引用
const tabContainerRef = ref<HTMLElement | null>(null);
const tabContentRef = ref<HTMLElement | null>(null);

const { width: containerWidth } = useElementSize(tabContainerRef);
const { width: contentWidth } = useElementSize(tabContentRef);

// 状态变量
const scrollPosition = ref(0);

const isScrolling = ref(false);
const autoScrollTimer = ref<number | null>(null);

// 计算属性
const canScrollLeft = computed(() => scrollPosition.value < 0);
const canScrollRight = computed(() => {
  if (!containerWidth.value || !contentWidth.value) return false;
  return Math.abs(scrollPosition.value) < contentWidth.value - containerWidth.value;
});

const showArrow = computed(() => {
  return contentWidth.value > containerWidth.value;
});

// 向左滚动
const scrollLeft = () => {
  if (!canScrollLeft.value || !tabContainerRef.value) return;

  const newPosition = Math.min(0, scrollPosition.value + props.scrollStep);
  scrollToPosition(newPosition);
};

// 向右滚动
const scrollRight = () => {
  if (!canScrollRight.value || !tabContainerRef.value || !tabContentRef.value) return;

  const maxScroll = containerWidth.value - contentWidth.value;
  const newPosition = Math.max(maxScroll, scrollPosition.value - props.scrollStep);
  scrollToPosition(newPosition);
};

// 开始自动滚动
const startAutoScroll = (direction: 'left' | 'right') => {
  stopAutoScroll(); // 确保没有其他定时器在运行

  const scrollFn = () => {
    if (direction === 'left') {
      scrollLeft();
    } else {
      scrollRight();
    }

    // 继续自动滚动
    autoScrollTimer.value = window.setTimeout(scrollFn, 100 / props.autoScrollSpeed);
  };

  autoScrollTimer.value = window.setTimeout(scrollFn, 100 / props.autoScrollSpeed);
};

// 停止自动滚动
const stopAutoScroll = () => {
  if (autoScrollTimer.value) {
    clearTimeout(autoScrollTimer.value);
    autoScrollTimer.value = null;
  }
};
// scrollToItemByRect 滚动到指定元素位置
const scrollToItemByRect = (rect: DOMRect) => {
  if (!tabContainerRef.value || !tabContentRef.value) return;

  const containerRect = tabContainerRef.value.getBoundingClientRect();
  const contentRect = tabContentRef.value.getBoundingClientRect();

  // 检查元素是否已经在可视区域内
  const isFullyVisible = rect.left >= containerRect.left && rect.right <= containerRect.right;

  // 如果元素已经完全可见，则不需要滚动
  if (isFullyVisible) {
    return;
  }

  // 计算需要滚动的位置，使元素居中显示
  const containerWidth = containerRect.width;
  const itemWidth = rect.width;
  const itemCenter = rect.left + itemWidth / 2;
  const containerCenter = containerRect.left + containerWidth / 2;

  // 计算滚动偏移量
  const scrollOffset = itemCenter - containerCenter;

  // 计算新的滚动位置
  const newScrollPosition = scrollPosition.value - scrollOffset;

  // 限制滚动范围，确保不会滚动过度
  const maxScrollRight = 0; // 最大向右滚动位置（不能超过0）
  const maxScrollLeft = Math.min(0, containerWidth - contentRect.width); // 最大向左滚动位置
  const clampedScrollPosition = Math.max(
    maxScrollLeft,
    Math.min(maxScrollRight, newScrollPosition)
  );

  scrollToPosition(clampedScrollPosition);
};

// 滚动到指定位置
const scrollToPosition = (position: number) => {
  isScrolling.value = true;
  scrollPosition.value = position;
  emit('scroll', position);

  // 动画结束后清除滚动状态
  setTimeout(() => {
    isScrolling.value = false;
  }, 300);
};

// 处理鼠标滚轮事件
const handleWheel = (event: WheelEvent) => {
  if (!tabContainerRef.value || !tabContentRef.value) return;

  const delta = event.deltaY || event.deltaX;
  const maxScroll = containerWidth.value - contentWidth.value;
  const newPosition = Math.max(maxScroll, Math.min(0, scrollPosition.value - delta));

  scrollToPosition(newPosition);
};

// 初始化
onMounted(() => {});

// 清理
onUnmounted(() => {
  stopAutoScroll();
});

// 导出方法供父组件调用
defineExpose({
  scrollLeft,
  scrollRight,
  scrollToItemByRect,
});
</script>

<style scoped>
.custom-tab-container {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.arrow-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background-color: var(--color-fill-lighter);
  border: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.arrow-button:hover:not(.arrow-button-disabled) {
  background-color: var(--color-fill-light);
  border-color: var(--color-border);
}

.arrow-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: var(--color-t-regular);
}

.left-arrow {
  margin-right: 8px;
}

.right-arrow {
  margin-left: 8px;
}

.tab-content-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.tab-content {
  display: flex;
  white-space: nowrap;
  transition: transform 0.3s ease;
  min-width: fit-content;
}
</style>
