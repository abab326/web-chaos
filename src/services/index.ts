import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'

import { eventBus } from '@/plugins/eventBus'
import { useUserStore } from '@/store/user'
import { saveFileBlob } from '@/utils/file'
import type {
  ApiServiceInstance,
  ApiRequestConfig,
  BaseResponse,
  ErrorHandlerOptions,
} from './types'

// 创建axios实例
const createApiService = (): ApiServiceInstance => {
  // 创建axios实例
  const axiosInstance = axios.create({
    baseURL: (import.meta.env.VITE_API_BASE_URL as string) || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config) => {
      const userStore = useUserStore()
      const token = userStore.getToken()
      // 如果有token则添加到请求头
      if (!token) {
        eventBus.emit('user:logout', null)
        return Promise.reject(new Error('No token provided'))
      }
      config.headers.Authorization = `Bearer ${token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<BaseResponse>) => {
      const res = response.data

      // 根据业务需求自定义响应处理逻辑
      if (res.code && res.code !== 200) {
        return handleError(new Error(res.message || '未知错误'), {
          code: res.code,
          message: res.message,
        }) as any
      }

      return response
    },
    (error: AxiosError) => {
      return handleError(error)
    }
  )
  // 统一错误处理函数
  const handleError = (error: any, options: ErrorHandlerOptions = {}) => {
    const { showError, customHandler } = options
    let errorMessage = '网络请求失败，请稍后重试'
    let errorCode = 500

    if (error.response) {
      // 服务器返回了错误响应
      const { data, status } = error.response
      errorCode = data.code || status
      errorMessage = data.message || `请求失败 (${status})`

      // 处理token过期等特殊情况
      if (errorCode === 401) {
        const userStore = useUserStore()
        userStore.logout()
        // 可以在这里添加重定向到登录页的逻辑
        errorMessage = '登录已过期，请重新登录'
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      errorMessage = '服务器无响应，请检查网络连接'
    } else {
      // 请求配置出错
      errorMessage = error.message || '请求配置错误'
    }

    // 如果需要显示错误提示
    if (showError) {
      console.error('API请求错误:', { code: errorCode, message: errorMessage })
      // 这里可以替换为UI库的提示组件，如ElMessage.error(errorMessage)
    }

    // 如果有自定义错误处理函数
    if (customHandler) {
      customHandler(error)
    }

    return Promise.reject(new Error(errorMessage))
  }

  // 封装便捷的请求方法
  const createRequestMethod = (method: string) => {
    return async <T = any>(
      url: string,
      data?: any,
      config?: ApiRequestConfig
    ): Promise<[any | null, T | null]> => {
      const requestConfig: ApiRequestConfig = {
        url,
        method,
        ...config,
      }

      if (method === 'get' || method === 'delete') {
        requestConfig.params = data
      } else {
        requestConfig.data = data
      }

      return new Promise((resolve) => {
        axiosInstance(requestConfig)
          .then((response: AxiosResponse<BaseResponse<T>>) => {
            resolve([null, response.data.data as T])
          })
          .catch((error) => {
            resolve([error, null])
          })
      })
    }
  }
  // 下载
  const download = async (url: string, params?: any, config?: ApiRequestConfig): Promise<Blob> => {
    const requestConfig: ApiRequestConfig = {
      url,
      method: 'get',
      responseType: 'blob', // 设置响应类型为blob
      ...config,
    }

    if (params) {
      requestConfig.params = params
    }

    return axiosInstance(requestConfig)
      .then((response: AxiosResponse<Blob>) => {
        saveFileBlob(response)
        return response.data
      })
      .catch((error) => {
        return handleError(error)
      })
  }
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
    }

    return axiosInstance(requestConfig)
      .then((response: AxiosResponse<BaseResponse<T>>) => response.data.data as T)
      .catch((error) => {
        return handleError(error)
      })
  }

  const apiService: ApiServiceInstance = {
    // 暴露便捷的请求方法
    get: createRequestMethod('get'),
    post: createRequestMethod('post'),
    put: createRequestMethod('put'),
    delete: createRequestMethod('delete'),
    patch: createRequestMethod('patch'),
    download: download,
    upload: upload,
  }

  return apiService
}

// 创建并导出API服务实例
export const apiService = createApiService()

// 导出类型
export type { BaseResponse, ApiRequestConfig }
