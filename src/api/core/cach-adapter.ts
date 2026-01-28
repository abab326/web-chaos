import type {
  AxiosAdapter,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios, { getAdapter } from 'axios';
import type { RequestConfig } from './types';

interface CacheItem<T = any> {
  data: T;
  expiresAt: number;
  createdAt: number;
}

interface CacheManagerOptions {
  defaultTTL?: number;
  maxSize?: number;
  cleanupInterval?: number;
}

interface CacheAdapterOptions {
  /**
   * 默认缓存时间（毫秒）
   */
  defaultTTL?: number;
  cache: CacheManagerOptions;
  adapter?: AxiosAdapter;
  useStaleOnError?: boolean;
}

class CacheManager {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTTL: number;
  private maxSize: number;
  private cleanupInterval: number;

  constructor(options: CacheManagerOptions = {}) {
    this.cache = new Map();
    this.defaultTTL = options.defaultTTL || 300000; // 5分钟
    this.maxSize = options.maxSize || 100; // 最大缓存数
    this.cleanupInterval = options.cleanupInterval || 60000; // 清理间隔
  }

  generateKey(config: AxiosRequestConfig | InternalAxiosRequestConfig) {
    return `${config.method}:${config.url}:${JSON.stringify(config.params)}:${JSON.stringify(config.data)}`;
  }

  get(key: string) {
    const item = this.cache.get(key);

    if (!item) return null;

    // 检查是否过期
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key: string, data: any, ttl = this.defaultTTL) {
    // 清理过期缓存
    this.cleanup();

    // 如果超过最大限制，删除最旧的
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey!);
    }

    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttl,
      createdAt: Date.now(),
    });
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}
export function createCacheAdapter(options: CacheAdapterOptions) {
  const cache = new CacheManager(options.cache);
  const resolvedAdapter = getAdapter(axios.defaults.adapter);
  const defaultAdapter = options.adapter || resolvedAdapter;

  return async function (config: RequestConfig & InternalAxiosRequestConfig) {
    // 检查是否启用缓存
    const shouldCache =
      config.cache !== false && ['get', 'options'].includes(config.method?.toLowerCase() || '');

    if (!shouldCache) {
      return defaultAdapter(config);
    }

    // 生成缓存键
    const cacheKey = cache.generateKey(config);

    // 尝试从缓存获取
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse && !config.forceRefresh) {
      return Promise.resolve({
        ...cachedResponse,
        config,
        request: {},
        headers: { ...cachedResponse.headers, 'x-cache': 'HIT' },
      });
    }

    // 执行请求
    try {
      const response = await defaultAdapter(config);

      // 计算缓存时间
      const ttl =
        config.cacheTTL || getCacheTTLFromHeaders(response.headers) || options?.defaultTTL || 1000;

      // 缓存响应
      cache.set(
        cacheKey,
        {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        },
        ttl
      );

      // 添加缓存头
      response.headers['x-cache'] = 'MISS';

      return response;
    } catch (error) {
      // 从缓存中获取旧数据（如果配置了）
      if (options.useStaleOnError && cachedResponse) {
        console.log('⚠️ 请求失败，使用过期缓存');
        return Promise.resolve({
          ...cachedResponse,
          config,
          request: {},
          headers: { ...cachedResponse.headers, 'x-cache': 'STALE' },
        });
      }
      throw error;
    }
  };

  function getCacheTTLFromHeaders(headers: AxiosResponse['headers']) {
    const cacheControl = headers['cache-control'];
    if (cacheControl) {
      const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
      if (maxAgeMatch) {
        return parseInt(maxAgeMatch[1]) * 1000;
      }
    }
    return null;
  }
}
