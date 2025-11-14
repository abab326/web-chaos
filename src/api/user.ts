import request, { type ResponseData } from './request'
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
  return request<ResponseData<LoginResponse>>({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request<ResponseData<UserInfo>>({
    url: '/auth/userInfo',
    method: 'GET'
  })
}

/**
 * 退出登录
 */
export const logout = () => {
  return request<ResponseData<null>>({
    url: '/auth/logout',
    method: 'POST'
  })
}

/**
 * 获取用户列表
 * @param params 查询参数
 */
export const getUserList = (params?: {
  page?: number
  pageSize?: number
  keyword?: string
}) => {
  return request<ResponseData<{
    list: UserInfo[]
    total: number
  }>>({
    url: '/users',
    method: 'GET',
    params
  })
}