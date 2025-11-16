import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'
import { useUserStore } from '@/store/user'
import type {
  ApiServiceInstance,
  ApiRequestConfig,
  BaseResponse,
  ErrorHandlerOptions,
} from './types'

// 创建axios实例
const createApiService = (): ApiServiceInstance => {
  // 创建axios实例
  const apiService = axios.create({
    baseURL: (import.meta.env.VITE_API_BASE_URL as string) || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  }) as ApiServiceInstance

  // 请求拦截器
  apiService.interceptors.request.use(
    (config) => {
      const userStore = useUserStore()
      // 如果有token则添加到请求头
      if (userStore.token) {
        config.headers.Authorization = `Bearer ${userStore.token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
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

  // 响应拦截器
  apiService.interceptors.response.use(
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

  // 封装便捷的请求方法
  const createRequestMethod = (method: string) => {
    return async <T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> => {
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

      return apiService(requestConfig).then(
        (response: AxiosResponse<BaseResponse<T>>) => response.data.data as T
      )
    }
  }

  // 暴露便捷的请求方法
  apiService.get = createRequestMethod('get')
  apiService.post = createRequestMethod('post')
  apiService.put = createRequestMethod('put')
  apiService.delete = createRequestMethod('delete')
  apiService.patch = createRequestMethod('patch')

  // 下载文件方法
  apiService.download = async (
    url: string,
    params?: any,
    config?: ApiRequestConfig
  ): Promise<Blob> => {
    const requestConfig: ApiRequestConfig = {
      url,
      method: 'get',
      responseType: 'blob', // 设置响应类型为blob
      ...config,
    }

    if (params) {
      requestConfig.params = params
    }

    return apiService(requestConfig)
      .then((response: any) => {
        // 从响应头获取文件名
        const contentDisposition = response.headers?.['content-disposition']
        let filename = 'download'
        if (contentDisposition) {
          const matches = /filename=([^;]+)/gi.exec(contentDisposition)
          if (matches && matches.length > 1) {
            filename = decodeURIComponent(matches[1]!.replace(/"/g, ''))
          }
        }

        // 创建Blob对象
        const blob = new Blob([response.data])

        // 创建下载链接并触发下载
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename
        document.body.appendChild(link)
        link.click()

        // 清理
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)

        return blob
      })
      .catch((error) => {
        return handleError(error)
      })
  }

  // 上传文件方法
  apiService.upload = async <T = any>(
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

    return apiService(requestConfig)
      .then((response: AxiosResponse<BaseResponse<T>>) => response.data.data as T)
      .catch((error) => {
        return handleError(error)
      })
  }

  return apiService
}

// 创建并导出API服务实例
export const apiService = createApiService()

// 导出类型
export type { BaseResponse, ApiRequestConfig }
