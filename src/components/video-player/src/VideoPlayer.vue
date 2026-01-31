<template>
  <div ref="playerContainerRef" class="video-player-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';

// 定义组件名称
defineOptions({
  name: 'VideoPlayer',
});

// 定义组件属性
const props = withDefaults(
  defineProps<{
    // 视频源
    src: string;
    // 封面图
    poster?: string;
    // 是否自动播放
    autoplay?: boolean;
    // 是否循环播放
    loop?: boolean;
    // 是否静音
    muted?: boolean;
    // 预加载方式
    preload?: 'auto' | 'metadata' | 'none';
    // 是否显示控件
    controls?: boolean;
    // 音量 (0-1)
    volume?: number;
    // 容器宽度
    width?: string | number;
    // 容器高度
    height?: string | number;
    // 播放速率选项
    playbackRate?: number;
  }>(),
  {
    autoplay: false,
    poster: '',
    loop: false,
    muted: false,
    preload: 'auto',
    controls: true,
    volume: 0.8,
    width: '100%',
    height: '100%',
    playbackRate: 1,
  },
);

// 定义事件
const emit = defineEmits<{
  (e: 'ready'): void;
  (e: 'play'): void;
  (e: 'pause'): void;
  (e: 'ended'): void;
  (e: 'timeupdate', time: number): void;
  (e: 'error', error: any): void;
}>();

// 播放器容器引用
const playerContainerRef = ref<HTMLDivElement | null>(null);

// 播放器实例
const playerInstance = ref<Player | null>(null);

// 初始化播放器
const initPlayer = () => {
  if (!playerContainerRef.value) return;

  // 销毁已存在的播放器实例
  if (playerInstance.value) {
    playerInstance.value.destroy();
  }

  // 创建新的播放器实例
  playerInstance.value = new Player({
    el: playerContainerRef.value,
    url: props.src,
    poster: props.poster,
    autoplay: props.autoplay,
    loop: props.loop,
    muted: props.muted,
    preload: props.preload,
    controls: props.controls,
    volume: props.volume,
    width: props.width,
    height: props.height,
    cssFullscreen: {
      index: 3,
    },
  });

  // 绑定事件
  playerInstance.value.on('ready', () => {
    emit('ready');
  });

  playerInstance.value.on('play', () => {
    emit('play');
  });

  playerInstance.value.on('pause', () => {
    emit('pause');
  });

  playerInstance.value.on('ended', () => {
    emit('ended');
  });

  playerInstance.value.on('timeupdate', () => {
    emit('timeupdate', playerInstance.value?.currentTime || 0);
  });

  playerInstance.value.on('error', (error) => {
    emit('error', error);
  });
};

// 监听 src 属性变化，重新初始化播放器
watch(
  () => props.src,
  () => {
    initPlayer();
  },
);

// 播放方法
const play = () => {
  playerInstance.value?.play();
};

// 暂停方法
const pause = () => {
  playerInstance.value?.pause();
};

// 跳转到指定时间
const seek = (time: number) => {
  if (playerInstance.value) {
    playerInstance.value.currentTime = time;
  }
};

// 设置音量
const setVolume = (volume: number) => {
  if (playerInstance.value) {
    playerInstance.value.volume = volume;
  }
};

// 切换全屏
const toggleFullscreen = () => {
  if (playerInstance.value) {
    if (playerInstance.value.isFullscreen) {
      playerInstance.value.exitFullscreen();
    } else {
      playerInstance.value.getFullscreen();
    }
  }
};

// 设置播放速率
const setPlaybackRate = (rate: number) => {
  if (playerInstance.value) {
    playerInstance.value.playbackRate = rate;
  }
};

// 组件挂载时初始化播放器
onMounted(() => {
  initPlayer();
});

// 组件卸载时销毁播放器
onUnmounted(() => {
  if (playerInstance.value) {
    playerInstance.value.destroy();
  }
});

// 暴露方法给父组件
defineExpose({
  play,
  pause,
  seek,
  setVolume,
  toggleFullscreen,
  setPlaybackRate,
});
</script>

<style scoped>
.video-player-container {
  position: relative;
  display: block;
  box-sizing: border-box;
  background-color: #000;
  width: 100%;
  aspect-ratio: 16 / 9;
}
</style>
