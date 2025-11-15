import type { App } from 'vue'
import BaseSearchTable from './BaseSearchTable.vue'

import type { BaseSearchTableComponentType } from './type'

export { BaseSearchTable }

export const install = (app: App) => {
  app.component('BaseSearchTable', BaseSearchTable as BaseSearchTableComponentType)
}
