import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Đặt cổng bạn muốn sử dụng
  },
  base: 'todo-vite-react-ts-', // Tên dự án
})
