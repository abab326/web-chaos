import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { useUserStore } from '@/store/user'

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // 如果有token则添加到请求头
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    
    // 根据业务需求自定义响应处理逻辑
    if (res.code !== 200) {
      console.error('请求失败:', res.message || '未知错误')
      
      // 处理token过期等特殊情况
      if (res.code === 401) {
        const userStore = useUserStore()
        userStore.logout()
        // 可以在这里添加重定向到登录页的逻辑
      }
      
      return Promise.reject(new Error(res.message || '未知错误'))
    }
    
    return res
  },
  (error) => {
    console.error('响应错误:', error)
    return Promise.reject(error)
  }
)

// 导出请求方法
export default service

// 类型定义
export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}