import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": "http://localhost:8000",
      "/register": "http://localhost:8000",
      "/auth": "http://localhost:8000",
      "/api": "http://localhost:8000",
      "/recipes": "http://localhost:8000"
    },
  },
})
