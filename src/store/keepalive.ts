import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useKeepAliveStore = defineStore(
  'keepAlive',
  () => {
    // 缓存的组件列表
    const cachedList = ref<string[]>([]);
    // 添加缓存组件
    const addCached = (name: string) => {
      if (!cachedList.value.includes(name)) {
        cachedList.value.push(name);
      }
    };
    // 移除缓存组件
    const removeCached = (name: string) => {
      cachedList.value = cachedList.value.filter((item) => item !== name);
    };
    // 清空缓存组件
    const clearCached = () => {
      cachedList.value = [];
    };
    return {
      cachedList,
      addCached,
      removeCached,
      clearCached,
    };
  },
  {
    persist: {
      pick: ['cachedList'],
    },
  }
);
