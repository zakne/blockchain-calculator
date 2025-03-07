import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", {target: '19'}],
        ],
      },
    }),
  ],
})
