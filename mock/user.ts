import { type MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

import type { LoginRequest } from '@/types/user';

export default [
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }: { body: LoginRequest }) => {
      console.log('mock login', body);
      const { userName, password, captcha } = body;
      if (userName && password && captcha) {
        const token = Mock.Random.string(24);
        return {
          code: 200,
          data: Mock.mock({ token }),
        };
      }
      return {
        code: 400,
        data: null,
        message: '用户名或密码错误',
      };
    },
  },
  {
    url: '/api/auth/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: Mock.mock({
          id: '@integer(1000,9999)',
          name: '@cname',
          age: '@integer(18,40)',
          avatar: '@image("100x100")',
        }),
      };
    },
  },
  {
    url: '/api/auth/logout',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '退出成功',
      };
    },
  },
] as MockMethod[];
