import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  build: {
    rollupOptions: {
      input: {
        uk: path.resolve(import.meta.dirname, 'index.html'),
        en: path.resolve(import.meta.dirname, 'en/index.html'),
      },
    },
  },
})
