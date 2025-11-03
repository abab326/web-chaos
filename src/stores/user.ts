import { defineStore } from 'pinia'

interface UserState {
  name: string
  email: string
  isLoggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: '',
    email: '',
    isLoggedIn: false
  }),

  getters: {
    userInfo: (state) => {
      return state.isLoggedIn ? `${state.name} (${state.email})` : '未登录'
    }
  },

  actions: {
    login(name: string, email: string) {
      this.name = name
      this.email = email
      this.isLoggedIn = true
    },

    logout() {
      this.name = ''
      this.email = ''
      this.isLoggedIn = false
    }
  }
})
