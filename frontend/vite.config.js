import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/poster': {
        target: 'http://localhost:5555', // Your localhost backend URL
        changeOrigin: true,
        // secure: false,
        // ws: true,
        // rewrite: path => path.replace(/^\/api/, '') // Optional rewrite rule
      }
    }
  }
})
