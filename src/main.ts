import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import router from './router';
import { setupStore } from './store';
import { registerDirectives } from './directives';
import './styles/global.css';
import './styles/element.scss';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import App from './App.vue';
const app = createApp(App);

// 注册插件
setupStore(app);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
// 注册自定义指令
registerDirectives(app);

// 挂载应用
app.mount('#app');
