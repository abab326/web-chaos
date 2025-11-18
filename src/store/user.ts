import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { UserInfo } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref<UserInfo | null>(null)
  const token = ref<string>('')
  const isLoggedIn = ref<boolean>(false)

  // 方法
  function setUserInfo(info: UserInfo) {
    userInfo.value = info
    isLoggedIn.value = true
  }

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }
  function getToken() {
    return token.value
  }

  function logout() {
    userInfo.value = null
    token.value = ''
    isLoggedIn.value = false
    localStorage.removeItem('token')
  }

  function loadTokenFromStorage() {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
    }
  }

  // 初始化时加载token
  loadTokenFromStorage()

  return {
    userInfo,
    isLoggedIn,
    setUserInfo,
    getToken,
    setToken,
    logout,
    loadTokenFromStorage,
  }
})
