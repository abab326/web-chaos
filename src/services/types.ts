import type { AxiosRequestConfig } from 'axios'
// 基础响应接口
export interface BaseResponse<T = any> {
  code: number
  message: string
  data: T
}

// 统一网络请求返回
export type BaseResult<T = any> = [any, T]

// API请求配置扩展
export interface ApiRequestConfig<T = any> extends AxiosRequestConfig<T> {
  // 是否需要处理loading状态
  loading?: boolean
  // 是否需要处理错误提示
  showError?: boolean
  // 自定义错误处理函数
  errorHandler?: (error: any) => void
}

// API服务实例类型
export interface ApiServiceInstance {
  get<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<BaseResult<T>>
  post<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<BaseResult<T>>
  put<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<BaseResult<T>>
  delete<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<BaseResult<T>>
  patch<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<BaseResult<T>>
  // 下载文件方法
  download(url: string, params?: any, config?: ApiRequestConfig): Promise<Blob>
  // 上传文件方法
  upload(url: string, data: FormData, config?: ApiRequestConfig): Promise<any>
}

// 错误处理选项
export interface ErrorHandlerOptions {
  // 错误消息
  message?: string
  // 错误码
  code?: number
  // 是否显示错误提示
  showError?: boolean
  // 自定义错误处理函数
  customHandler?: (error: any) => void
}
