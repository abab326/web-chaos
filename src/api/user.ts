import { apiService } from '../services/index'
import type { UserInfo } from '@/store/user'

// 登录请求接口
export interface LoginRequest {
  username: string
  password: string
}

// 登录响应接口
export interface LoginResponse {
  token: string
  user: UserInfo
}

/**
 * 用户登录
 * @param data 登录信息
 */
export const login = (data: LoginRequest) => {
  const result: LoginResponse = {
    token: '123456',
    user: {
      username: data.username,
      role: 'USER',
      avatar: 'https://example.com/avatar.jpg',
      id: '123456',
    },
  }
  return Promise.resolve(result)
  // return apiService.post<LoginResponse>('/auth/login', data)
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return apiService.get<UserInfo>('/auth/userInfo')
}

/**
 * 退出登录
 */
export const logout = () => {
  return apiService.post<null>('/auth/logout')
}

/**
 * 获取用户列表
 * @param params 查询参数
 */
export const getUserList = (params?: { page?: number; pageSize?: number; keyword?: string }) => {
  return apiService.get<{
    list: UserInfo[]
    total: number
  }>('/users', { params })
}
