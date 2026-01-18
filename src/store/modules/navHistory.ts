import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';

export interface NavItem {
  key: string;
  label: string;
  path: string;
}

export const useNavHistoryStore = defineStore('navHistory', () => {
  // 存储用户访问过的页面历史
  const visitedPages = ref<NavItem[]>([]);

  // 添加访问页面到历史记录
  function addVisitedPage(route: RouteLocationNormalized) {
    // 检查页面是否已经有标题和名称
    if (route.meta?.title && route.name) {
      const newItem: NavItem = {
        key: route.name as string,
        label: route.meta.title as string,
        path: route.path,
      };

      // 检查是否已经存在于历史记录中
      const exists = visitedPages.value.some((item) => item.key === newItem.key);

      // 如果不存在，则添加到历史记录中
      if (!exists) {
        visitedPages.value.push(newItem);
      }
    }
  }

  // 移除访问页面从历史记录
  function removeVisitedPage(key: string) {
    const index = visitedPages.value.findIndex((item) => item.key === key);
    if (index !== -1) {
      visitedPages.value.splice(index, 1);
    }
  }

  // 清空所有访问历史
  function clearVisitedPages() {
    visitedPages.value = [];
  }

  return {
    visitedPages,
    addVisitedPage,
    removeVisitedPage,
    clearVisitedPages,
  };
});
