import { defineStore } from 'pinia'

interface AppState {
  theme: 'light' | 'dark'
  sidebarCollapsed: boolean
  loading: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
    sidebarCollapsed: false,
    loading: false
  }),

  getters: {
    isDark: (state) => state.theme === 'dark'
  },

  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },

    setLoading(loading: boolean) {
      this.loading = loading
    }
  }
})
