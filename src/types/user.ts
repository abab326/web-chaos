// 用户实体类
export interface UserBean {
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

export type UserInfo = Pick<UserBean, 'id' | 'username' | 'role' | 'avatar'>;
