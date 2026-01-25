import type { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { useUserStore } from '@/store/modules/user';
import type { BaseResponse } from './types';

// 请求拦截器
export const defaultRequestInterceptor = <T>(config: InternalAxiosRequestConfig<T>) => {
  const userStore = useUserStore();
  const token = userStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 响应拦截器
export const defaultResponseInterceptor = <T = any>(response: AxiosResponse<BaseResponse<T>>) => {
  const { status, data } = response;

  // 处理 Blob 响应
  if (data instanceof Blob) {
    return response;
  }

  // 确保响应格式一致
  if (status === 200) {
    return response;
  }

  return response;
};

// 错误拦截器
export const defaultErrorInterceptor = (error: AxiosError<BaseResponse>) => {
  const { response, message } = error;

  if (response) {
    // 服务器返回错误状态码
    const { status, data } = response;

    switch (status) {
      case 401: {
        // 未授权，清除 token 并跳转到登录页
        console.error('未授权，请重新登录');
        const userStore = useUserStore();
        userStore.logout();
        // 这里可以添加跳转到登录页的逻辑
        break;
      }
      case 403:
        console.error('拒绝访问');
        break;
      case 404:
        console.error('请求资源不存在');
        break;
      case 500:
        console.error('服务器内部错误');
        break;
      default:
        console.error(data?.message || `请求失败: ${status}`);
    }
  } else if (error.request) {
    // 请求已发出，但没有收到响应
    console.error('网络错误，无法连接到服务器');
  } else {
    // 请求配置出错
    console.error('请求配置错误:', message);
  }

  return Promise.reject(error);
};
