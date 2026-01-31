<template>
  <div
    :style="{ '--base-file-preview-size': computedSize }"
    class="base-file-preview-container flex items-center justify-center"
  >
    <!-- 预览图片 -->
    <el-image
      v-if="fileType === 'image'"
      :src="fileUrl"
      alt="预览图片"
      class="w-(--base-file-preview-size) h-(--base-file-preview-size) object-cover"
      :preview-src-list="[fileUrl]"
      :preview-teleported="true"
      :z-index="9999"
    />
    <!-- 预览文件 -->
    <el-link
      v-else-if="fileType === 'file'"
      class="file-preview-container w-full h-full flex items-center justify-center border border-dashed border-gray-300 [&:not(.is-disabled)]:hover:border-primary"
      :href="fileUrl"
      underline="never"
    >
      <span class="break-all p-2">
        <el-icon class="mr-2">
          <Document />
        </el-icon>
        {{ fileName || '文件' }}
      </span>
    </el-link>
    <!-- 预览视频 -->
    <video v-else-if="fileType === 'video'" :src="fileUrl" controls class="w-full aspect-video" />
    <!-- 预览音频 -->
    <audio v-else-if="fileType === 'audio'" :src="fileUrl" controls class="w-full aspect-video" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Document } from '@element-plus/icons-vue';

type FileType = 'image' | 'file' | 'video' | 'audio';

interface BaseFilePreviewProps {
  fileUrl: string;
  fileType: FileType;
  fileName?: string;
  size?: string | number;
}
const props = withDefaults(defineProps<BaseFilePreviewProps>(), {
  fileName: '',
  size: '115px',
});

const computedSize = computed(() => {
  if (Number(props.size)) {
    return props.size + 'px';
  }
  return props.size;
});
</script>

<style scoped>
.base-file-preview-container {
  min-width: var(--base-file-preview-size);
}
</style>
