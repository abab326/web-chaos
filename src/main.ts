import { createApp } from 'vue'

import router from './router'
import { setupStore } from './store'
import { setupElementPlus } from './plugins/element'
import { registerDirectives } from './directives'
import './style.css'

import App from './App.vue'
const app = createApp(App)

// 注册插件
setupStore(app)
setupElementPlus(app)
app.use(router)
// 注册自定义指令
registerDirectives(app)

// 挂载应用
app.mount('#app')
