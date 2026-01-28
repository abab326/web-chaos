// plugins/eventBus.ts
import mitt from 'mitt';
import type { Emitter } from 'mitt';

// 定义基础接口
interface Events extends Record<string | symbol, unknown> {
  'user:logout': string | null;
  'user:login': null;
  // 重新登录事件
  're-login': boolean;
}

// 创建工具类型：只允许已知事件
type StrictEventKey<T> = T extends keyof Events ? T : never;

class EventBus {
  private emitter: Emitter<Events>;

  constructor() {
    this.emitter = mitt<Events>();
  }

  // 监听事件
  on<T>(type: StrictEventKey<T>, handler: (event: Events[StrictEventKey<T>]) => void) {
    this.emitter.on(type, handler);
  }

  // 一次性监听
  once<T>(type: StrictEventKey<T>, handler: (event: Events[StrictEventKey<T>]) => void) {
    const onceHandler = (event: Events[StrictEventKey<T>]) => {
      handler(event);
      this.off(type, onceHandler);
    };
    this.on(type, onceHandler);
  }

  // 移除监听
  off<T>(type: StrictEventKey<T>, handler: (event: Events[StrictEventKey<T>]) => void) {
    this.emitter.off(type, handler);
  }

  // 触发事件
  emit<T>(type: StrictEventKey<T>, event: Events[StrictEventKey<T>]) {
    this.emitter.emit(type, event);
  }

  // 清空所有监听
  clear() {
    this.emitter.all.clear();
  }

  // 获取所有监听器
  getListeners<T extends string | symbol>(type: StrictEventKey<T>) {
    return this.emitter.all.get(type) || [];
  }
}

export const eventBus = new EventBus();

// Vue 插件形式

(eventBus as any).install = (app: any) => {
  app.config.globalProperties.$eventBus = eventBus;
  app.provide('eventBus', eventBus);
};

export default eventBus;
