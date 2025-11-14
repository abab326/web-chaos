import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from './store'
import { setupElementPlus } from './plugins/element'
import './style.css'

const app = createApp(App)

// 注册插件
setupStore(app)
setupElementPlus(app)
app.use(router)

// 挂载应用
app.mount('#app')
