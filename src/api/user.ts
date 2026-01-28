import { httpClient } from './core/index';
import type { UserInfo, LoginRequest } from '@/types/user';

// 登录请求接口

/**
 * 用户登录
 * @param data 登录信息
 */
const loginByUserName = (data: LoginRequest) => {
  return httpClient.post<{ token: string }>('/auth/login', data);
};

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  return httpClient.get<UserInfo>('/auth/info');
};

/**
 * 退出登录
 */
const logout = () => {
  return httpClient.post<string>('/auth/logout');
};

/**
 * 获取用户列表
 * @param params 查询参数
 */
const getUserList = (params?: { page?: number; pageSize?: number; keyword?: string }) => {
  return httpClient.get<{
    list: UserInfo[];
    total: number;
  }>('/users', { params });
};

export const userApi = {
  loginByUserName,
  getUserInfo,
  logout,
  getUserList,
};
