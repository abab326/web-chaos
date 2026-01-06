import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';
import console from 'node:console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__dirname ==', __dirname);
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: true,
    },
  },

  build: {
    target: 'esnext',
    minify: 'esbuild',
    // 设置拆包大小
    chunkSizeWarningLimit: 2000,

    rolldownOptions: {
      // 手动配置代码分割
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',

        manualChunks(id, meta) {
          console.log('manualChunks ==', id, meta);
          // vue 、vue-router 、axios 等库单独打包
          if (id.includes('node_modules')) {
            if (['vue', 'vue-router', 'axios'].some((item) => id.includes(item))) {
              return 'vendor';
            }
            if (id.includes('element-plus')) {
              return 'element-plus';
            }
            if (id.includes('axios')) {
              return 'axios';
            }
            if (id.includes('lodash-es')) {
              return 'lodash-es';
            }
            if (['dayjs', '@vueuse/core'].some((item) => id.includes(item))) {
              return 'utils';
            }
          }
        },
      },
    },
  },
});
