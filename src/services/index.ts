import { httpClient, HttpClient } from './http-client';
import type { ApiResponse, ApiError } from './types';

// 导出 HTTP 客户端实例
export { httpClient, HttpClient };

// 导出类型
export type { ApiResponse, ApiError };

// 导出请求方法的快捷方式
export const { get, post, put, delete: del, patch, request } = httpClient;
