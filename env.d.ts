/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 解决 ESLint 对 Vue 文件中 any 类型的警告问题
interface ImportMetaEnv {
  readonly [key: string]: string | boolean | undefined
}
