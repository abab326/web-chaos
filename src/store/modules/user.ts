import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { clearAccessToken, setAccessToken } from '@/utils/authUtils';

import { userApi } from '@/api/user';
import type { LoginRequest, UserInfo } from '@/types/user';

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref<UserInfo | null>(null);

    // 是否加载用户信息
    const isLogged = computed(() => !!userInfo.value && userInfo.value.id !== '');

    // 用户登录
    const login = async (data: LoginRequest) => {
      const [error, res] = await userApi.loginByUserName(data);
      console.log('loginByUserName', error, res);
      if (error) {
        return false;
      }
      setAccessToken(res?.token || '');
      const success = await getUserInfoByNetwork();
      return success;
    };
    // 获取用户信息
    const getUserInfoByNetwork = async () => {
      console.log('getUserInfo', userInfo.value);
      if (userInfo.value) {
        return true;
      }
      const [apiError, result] = await userApi.getUserInfo();
      console.log('getUserInfo', apiError, result);
      if (apiError) {
        return false;
      }
      userInfo.value = result;
      return true;
    };
    // 退出登录
    const logout = async () => {
      const [error] = await userApi.logout();
      if (error) {
        return false;
      }

      userInfo.value = null;
      clearAccessToken();
      return true;
    };

    return {
      userInfo,
      isLogged,

      logout,
      login,
      getUserInfoByNetwork,
    };
  },
  {
    persist: {
      pick: ['userInfo'],
    },
  },
);
