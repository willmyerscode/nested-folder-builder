import { fileURLToPath, URL } from 'node:url'

import demo from './src/demo.js'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    // If you have CSS code splitting enabled, you might need to disable it
    // to ensure CSS files retain the same name.
    cssCodeSplit: false,
  },
  server: {
    proxy: {
      // Use the '/api' prefix to forward requests to another domain
      '/proxy': {
        target: demo,
        changeOrigin: true, // needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/proxy/, '')
      },
      '/will-myers': {
        target: 'https://www.will-myers.com', // The target server you want to proxy to
        changeOrigin: true, // This sets the `Host` header of the request to the target URL
        rewrite: (path) => path.replace(/^\/will-myers/, '') // Remove the '/api' prefix
      }
    }
  },
})
