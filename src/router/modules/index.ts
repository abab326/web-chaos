import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob(['./*.ts', '!./index.ts'], { eager: true })
const moduleRoutes: RouteRecordRaw[] = []
for (const path in modules) {
  const module = modules[path]
  console.log('modules === ', path, module)
  const defaultValue = (module as any).default
  if (Array.isArray(defaultValue)) {
    moduleRoutes.push(...defaultValue)
  } else if (defaultValue && defaultValue.path) {
    moduleRoutes.push(defaultValue)
  }
}

export { moduleRoutes }
