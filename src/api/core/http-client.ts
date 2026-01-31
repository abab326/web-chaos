import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  defaultRequestInterceptor,
  defaultResponseInterceptor,
  defaultErrorInterceptor,
} from './interceptor';
import type { ApiError, ApiResponse } from './types';
import { createCacheAdapter } from './cach-adapter';

/**
 * HTTP 客户端类
 * 封装 axios 实例，提供统一的请求/响应处理
 */
export class HttpClient {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    // 创建 axios 实例
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      adapter: createCacheAdapter({ cache: {} }),
      ...config,
    });

    // 配置拦截器
    this.setupInterceptors();
  }

  /**
   * 配置拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(defaultRequestInterceptor, defaultErrorInterceptor);

    // 响应拦截器
    this.instance.interceptors.response.use(defaultResponseInterceptor, defaultErrorInterceptor);
  }

  /**
   * 发送请求
   */
  request<T = any>(config: AxiosRequestConfig): Promise<[ApiError | null, T | null]> {
    return new Promise((resolve) => {
      this.instance
        .request<ApiResponse<T>>(config)
        .then((response) => resolve([null, response.data.data]))
        .catch((error: ApiError) => resolve([error, null]));
    });
  }

  /**
   * GET 请求
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<[ApiError | null, T | null]> {
    return this.request({ url, method: 'get', ...config });
  }

  /**
   * POST 请求
   */
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<[ApiError | null, T | null]> {
    return this.request({ url, method: 'post', ...config, data });
  }

  /**
   * PUT 请求
   */
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<[ApiError | null, T | null]> {
    return this.request({ url, method: 'put', ...config, data });
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<[ApiError | null, T | null]> {
    return this.request({ url, method: 'delete', ...config });
  }

  /**
   * PATCH 请求
   */
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<[ApiError | null, T | null]> {
    return this.request({ url, method: 'patch', ...config, data });
  }

  /**
   *  上传文件
   * @param url 上传地址
   * @param data 上传数据
   * @param config axios 配置
   * @returns Promise<BaseResponse>
   */
  upload<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<[ApiError | null, T | null]> {
    return this.request({ url, method: 'post', ...config, data });
  }
  /**
   *  下载文件
   * @param url 下载地址
   * @param config axios 配置
   * @returns Promise<Blob>
   */
  download(url: string, config?: AxiosRequestConfig): Promise<[ApiError | null, Blob | null]> {
    return new Promise((resolve) => {
      this.instance
        .request({ url, method: 'get', ...config, responseType: 'blob' })
        .then((response) => resolve([null, response.data]))
        .catch((error: ApiError) => resolve([error, null]));
    });
  }
}

// 创建默认实例
export const httpClient = new HttpClient();
