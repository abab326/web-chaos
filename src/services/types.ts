export interface BaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
}
export type BaseResponseData<T = any> = BaseResponse<T>['data'];

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
