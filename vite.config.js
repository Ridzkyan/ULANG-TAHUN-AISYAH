import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    // Split vendor chunks so each library is cached separately by Vercel CDN
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Framer Motion is the heaviest (~130KB gzip) — isolate it
          if (id.includes('framer-motion')) return 'framer-motion';
          // Lucide icons — isolate so icon bundle is cached separately
          if (id.includes('lucide-react')) return 'lucide-react';
          // Canvas confetti — only needed for 2 components
          if (id.includes('canvas-confetti')) return 'canvas-confetti';
          // All other node_modules go to 'vendor'
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
    // Raise warning limit a bit since we're managing chunks manually
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting for faster CSS load
    cssCodeSplit: true,
  },
})

