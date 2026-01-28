import { type AxiosResponse, type InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getAccessToken } from '@/utils/authUtils';

import type { ApiResponse, ApiError } from './types';
import { eventBus } from '@/plugins/eventBus';

// 请求拦截器
export const defaultRequestInterceptor = <T>(config: InternalAxiosRequestConfig<T>) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 响应拦截器
export const defaultResponseInterceptor = <T = any>(response: AxiosResponse<T>) => {
  const { status, data, statusText } = response;
  // 处理非 200 状态码
  if (status !== 200) {
    const error: ApiError = {
      code: status || 500,
      message: statusText || `请求失败: ${status}`,
      type: 'http',
    };
    return Promise.reject(error);
  }
  // 处理 Blob 响应
  if (data instanceof Blob) {
    return response;
  }
  const apiData = data as ApiResponse<any>;
  // 确保响应格式一致
  if (apiData.code && apiData.code !== 200) {
    const error: ApiError = {
      code: apiData?.code || status || 500,
      message: apiData?.message || statusText || `请求失败: ${status}`,
      type: 'business',
    };
    return Promise.reject(error);
  }
  return response;
};

// 错误拦截器
export const defaultErrorInterceptor = (error: AxiosError<ApiResponse>) => {
  const { response, request, message } = error;
  const apiError: ApiError = {
    code: 500,
    message: message || `请求失败: ${status}`,
    type: 'http',
  };
  if (response) {
    // 服务器返回错误状态码
    const { status, data } = response;

    switch (status) {
      case 401: {
        // 未授权，清除 token 并跳转到登录页
        eventBus.emit('re-login', true);
        apiError.code = 401;
        apiError.message = '未授权，清除 token 并跳转到登录页';
        break;
      }
      case 403:
        apiError.code = 403;
        apiError.message = '拒绝访问';
        break;
      case 404:
        apiError.code = 404;
        apiError.message = '请求资源不存在';
        break;
      case 500:
        apiError.code = 500;
        apiError.message = '服务器内部错误';
        break;
      default:
        apiError.message = data?.message || `请求失败: ${status}`;
        break;
    }
  } else if (request) {
    // 请求已发出，但没有收到响应
    apiError.code = 504;
    apiError.message = '网络错误，无法连接到服务器';
  } else {
    // 请求配置出错
    apiError.code = 400;
    apiError.message = '请求配置错误:' + message;
  }

  return Promise.reject(apiError);
};
