import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // Flask 后端地址
        changeOrigin: true,
        // 如果后端路由包含 /api 前缀，则不需要 rewrite
        // 你的 Flask 路由是 /api/... 所以这里保留 /api
      }
    },
    allowedHosts: ['frp-bus.com']
  }
})

