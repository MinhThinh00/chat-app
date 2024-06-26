import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://chat-app-iota-blue.vercel.app',
        changeOrigin: true,
        ws: true
      }
    }
  }
})
