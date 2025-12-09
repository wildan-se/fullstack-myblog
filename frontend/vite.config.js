import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // Fix untuk mencegah reload berlebihan
    watch: {
      // Ignore .env files dari watch untuk mencegah reload loop
      ignored: ['**/.env', '**/.env.local'],
    },
    hmr: {
      // Konfigurasi HMR agar lebih stabil
      overlay: true,
    },
  },
  // Production build configuration
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for production
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'vendor': ['vue', 'vue-router', 'vuex'],
          'axios': ['axios'],
          'toast': ['vue-toastification']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase chunk size warning limit
  }
})
