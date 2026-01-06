import axios from 'axios';
import { AxiosError, type AxiosResponse } from 'axios';

import { useUserStore } from '@/store/user';
import { saveFileBlob } from '@/utils/file';
import type {
  ApiServiceInstance,
  ApiRequestConfig,
  BaseResponse,
  ErrorHandlerOptions,
} from './types';

// 创建axios实例
const createApiService = (): ApiServiceInstance => {
  // 创建axios实例
  const axiosInstance = axios.create({
    baseURL: (import.meta.env.VITE_API_BASE_URL as string) || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config) => {
      const userStore = useUserStore();
      const token = userStore.getToken();

      // 检查请求是否需要认证（默认需要）
      const isAuthRequired = config.headers?.['X-No-Auth'] !== true;

      if (isAuthRequired) {
        // 如果需要认证且有token则添加到请求头
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // 不需要立即登出，让响应拦截器处理401错误
          return config;
        }
      } else {
        // 如果不需要认证，移除Authorization头
        delete config.headers.Authorization;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<BaseResponse>) => {
      const res = response.data;

      // 根据业务需求自定义响应处理逻辑
      if (res.code && res.code !== 200) {
        return handleError(new AxiosError(res.message || '未知错误', res.code + ''), {
          code: res.code,
          message: res.message,
          showError: true,
        }) as any;
      }

      return response;
    },
    (error: AxiosError) => {
      return handleError(error, { showError: true });
    }
  );
  // 统一错误处理函数
  const handleError = (error: any, options: ErrorHandlerOptions = {}) => {
    const { showError = true, customHandler } = options;
    let errorMessage = '网络请求失败，请稍后重试';
    let errorCode = 500;

    if (error.response) {
      // 服务器返回了错误响应
      const { data, status, statusText } = error.response;
      errorCode = data.code || status;
      const userStore = useUserStore();
      // 根据不同状态码提供更友好的错误信息
      switch (status) {
        case 400:
          errorMessage = data.message || '请求参数错误';
          break;
        case 401:
          errorMessage = '登录已过期，请重新登录';

          userStore.logout();
          break;
        case 403:
          errorMessage = data.message || '没有权限访问该资源';
          break;
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 405:
          errorMessage = '请求方法不允许';
          break;
        case 429:
          errorMessage = '请求过于频繁，请稍后重试';
          break;
        case 500:
          errorMessage = data.message || '服务器内部错误';
          break;
        case 502:
          errorMessage = '网关错误';
          break;
        case 503:
          errorMessage = '服务器维护中，请稍后重试';
          break;
        case 504:
          errorMessage = '服务器超时，请稍后重试';
          break;
        default:
          errorMessage = data.message || statusText || `请求失败 (${status})`;
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      errorMessage = '服务器无响应，请检查网络连接';
    } else {
      // 请求配置出错
      errorMessage = error.message || '请求配置错误';
    }

    // 如果需要显示错误提示
    if (showError) {
      console.error('API请求错误:', {
        code: errorCode,
        message: errorMessage,
        url: error.config?.url,
        method: error.config?.method,
      });
      // 这里可以替换为UI库的提示组件，如ElMessage.error(errorMessage)
    }

    // 如果有自定义错误处理函数
    if (customHandler) {
      customHandler(error);
    }

    return Promise.reject(new Error(errorMessage));
  };

  // 封装便捷的请求方法
  const createRequestMethod = (method: string) => {
    return async <T = any>(
      url: string,
      data?: any,
      config?: ApiRequestConfig
    ): Promise<[any, T]> => {
      const requestConfig: ApiRequestConfig = {
        url,
        method,
        ...config,
      };

      if (method === 'get' || method === 'delete') {
        requestConfig.params = data;
      } else {
        requestConfig.data = data;
      }

      return new Promise((resolve) => {
        axiosInstance(requestConfig)
          .then((response: AxiosResponse<BaseResponse<T>>) => {
            resolve([null, response.data.data as T]);
          })
          .catch((error) => {
            resolve([error, null as T]);
          });
      });
    };
  };
  // 下载
  const download = async (url: string, params?: any, config?: ApiRequestConfig): Promise<Blob> => {
    const requestConfig: ApiRequestConfig = {
      url,
      method: 'get',
      responseType: 'blob', // 设置响应类型为blob
      ...config,
    };

    if (params) {
      requestConfig.params = params;
    }

    return axiosInstance(requestConfig)
      .then((response: AxiosResponse<Blob>) => {
        saveFileBlob(response);
        return response.data;
      })
      .catch((error) => {
        return handleError(error);
      });
  };
  // 上传
  const upload = async <T = any>(
    url: string,
    data: FormData,
    config?: ApiRequestConfig
  ): Promise<T> => {
    const requestConfig: ApiRequestConfig = {
      url,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data', // 设置上传文件的Content-Type
      },
      data,
      ...config,
    };

    return axiosInstance(requestConfig)
      .then((response: AxiosResponse<BaseResponse<T>>) => response.data.data as T)
      .catch((error) => {
        return handleError(error);
      });
  };

  const apiService: ApiServiceInstance = {
    // 暴露便捷的请求方法
    get: createRequestMethod('get'),
    post: createRequestMethod('post'),
    put: createRequestMethod('put'),
    delete: createRequestMethod('delete'),
    patch: createRequestMethod('patch'),
    download: download,
    upload: upload,
  };

  return apiService;
};

// 创建并导出API服务实例
export const apiService = createApiService();

// 导出类型
export type { BaseResponse, ApiRequestConfig };
