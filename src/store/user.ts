import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { userApi } from '@/api/user'
import type { UserInfo } from '@/types/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref<UserInfo | null>(null)
    // 登录状态的token
    const userToken = ref<string>('')
    // 计算属性，根据token是否存在判断是否登录
    const isLoggedIn = computed(() => !!userToken.value)
    // 获取token
    const getToken = () => {
      return userToken.value
    }
    // 清空token
    const clearToken = () => {
      userToken.value = ''
      localStorage.removeItem('token')
    }
    // 用户登录
    const login = async (data: { username: string; password: string }) => {
      const [error, res] = await userApi.loginByUserName(data)
      if (error) {
        return false
      }
      userToken.value = res.token
      userInfo.value = res.user
      // 登录成功后，将token保存到localStorage
      localStorage.setItem('token', userToken.value)
      return true
    }
    // 退出登录
    const logout = async () => {
      const [error] = await userApi.logout()
      if (error) {
        return false
      }
      clearToken()
      return true
    }

    return {
      userToken,
      userInfo,
      isLoggedIn,
      getToken,
      logout,
      login,
    }
  },
  {
    persist: {
      pick: ['userInfo', 'userToken'],
    },
  }
)
