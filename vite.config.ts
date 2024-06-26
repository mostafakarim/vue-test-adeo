import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(
          new URL('./src', import.meta.url),
        ),
      }, 
      {
        find: '@public',
        replacement: fileURLToPath(
          new URL('./public', import.meta.url),
        ),
      }, 
    ],
  },
  server: {
    host: true,
  },
})
