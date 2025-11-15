import type { App } from 'vue'
import BasePagination from './BasePagination.vue'

export { BasePagination }

export const install = (app: App) => {
  app.component('BasePagination', BasePagination)
}
