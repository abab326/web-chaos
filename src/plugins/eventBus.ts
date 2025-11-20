// plugins/eventBus.ts
import mitt from 'mitt'
import type { Emitter } from 'mitt'
// 事件类型定义
export interface Events extends Record<string | symbol, any> {
  // 通用事件
  'global:loading': boolean
  'user:logout': { redirect: string }
}

class EventBus {
  private emitter: Emitter<Events>

  constructor() {
    this.emitter = mitt<Events>()
  }

  // 监听事件
  on<T extends keyof Events>(type: T, handler: (event: Events[T]) => void) {
    this.emitter.on(type, handler)
  }

  // 一次性监听
  once<T extends keyof Events>(type: T, handler: (event: Events[T]) => void) {
    const onceHandler = (event: Events[T]) => {
      handler(event)
      this.off(type, onceHandler)
    }
    this.on(type, onceHandler)
  }

  // 移除监听
  off<T extends keyof Events>(type: T, handler: (event: Events[T]) => void) {
    this.emitter.off(type, handler)
  }

  // 触发事件
  emit<T extends keyof Events>(type: T, event: Events[T]) {
    this.emitter.emit(type, event)
  }

  // 清空所有监听
  clear() {
    this.emitter.all.clear()
  }

  // 获取所有监听器
  getListeners<T extends keyof Events>(type: T) {
    return this.emitter.all.get(type) || []
  }
}

export const eventBus = new EventBus()

// Vue 插件形式
export default {
  install(app: any) {
    app.config.globalProperties.$eventBus = eventBus
    app.provide('eventBus', eventBus)
  },
}
