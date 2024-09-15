import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
