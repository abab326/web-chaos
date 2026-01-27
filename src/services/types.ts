export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}
export interface RequestConfig {
  /**
   * 是否启用缓存
   */
  cache?: boolean;
  /**
   * 缓存时间（毫秒）
   */
  cacheTTL?: number;
  /**
   * 默认缓存时间（毫秒）
   */
  defaultTTL?: number;
  /**
   * 是否强制刷新缓存
   */
  forceRefresh?: boolean;
}
export interface ApiError {
  code: number | string; // 业务码 / HTTP码 / 自定义码
  message: string; // 给用户看的提示
  type: 'business' | 'http' | 'network' | 'timeout';
  raw?: any; // 原始错误对象，调试用
}
