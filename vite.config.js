import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // Định nghĩa global để tránh lỗi ReferenceError
  },
});
