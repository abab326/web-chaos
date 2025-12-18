<template>
  <div class="video-demo-page p-6">
    <el-card class="mb-6">
      <template #header>
        <div class="flex items-center">
          <el-icon class="mr-2"><VideoCamera /></el-icon>
          <span class="font-semibold">视频播放器演示</span>
        </div>
      </template>

      <div class="grid grid-cols-2 gap-6">
        <VideoPlayer
          ref="player1Ref"
          src="http://vjs.zencdn.net/v/oceans.mp4"
          poster="https://cdn.jsdelivr.net/gh/changedenCZD/blog-images/demo-poster.jpg"
          :autoplay="false"
          :controls="true"
        />

        <!-- 自定义播放器 -->
        <VideoPlayer
          ref="player2Ref"
          :src="testVideos[0]!"
          poster="https://cdn.jsdelivr.net/gh/changedenCZD/blog-images/demo-poster.jpg"
          :autoplay="false"
          :loop="true"
          :muted="false"
          :controls="true"
          :volume="0.7"
          :playback-rate="1"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { VideoCamera } from '@element-plus/icons-vue'
import VideoPlayer from '@/components/video-player'
// 建议优先使用这些
const testVideos = [
  // 1. 标准MP4（推荐）
  'http://www.w3school.com.cn/i/movie.webm',

  // 2. 短视频（加载快）
  'http://www.w3school.com.cn/i/movie.mp4',

  // 3. HLS直播测试
  'http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans.m3u8',

  // 4. FLV直播测试
  'http://liteavapp.qcloud.com/live/liteavdemoplayerstreamid.flv',

  // 5. 备用地址
  'https://v-cdn.zjol.com.cn/123.mp4',
]
// 定义组件名称
defineOptions({
  name: 'VideoDemo',
})
</script>

<style scoped>
.log-item:last-child {
  border-bottom: none;
}
</style>
