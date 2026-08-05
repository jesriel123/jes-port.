import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/jes-port./' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    // during development, forward /api calls to the local Express proxy server
    proxy: {
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}))
