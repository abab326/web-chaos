// 用户实体类
export interface User {
  id: string | number;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
  status: number;
  role?: string;
  roleName: string;
  roleCode: string;
  createTime: string;
  lastLoginTime: string;
}

export type UserInfo = Pick<User, 'id' | 'username' | 'role' | 'avatar'>;
export interface LoginRequest {
  userName: string;
  password: string;
  captcha: string;
}

// 登录响应接口
export interface LoginResponse {
  token: string;
  user: UserInfo;
}
