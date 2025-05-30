import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  server: {
    // Enable SPA fallback
    historyApiFallback: true,
    allowedHosts: [
      'b300-41-90-172-163.ngrok-free.app'
    ]
  },
})
