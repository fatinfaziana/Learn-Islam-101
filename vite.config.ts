import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// `base` is relative so the build works on GitHub Pages project sites, Netlify, Vercel or any static host.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Dua & Prayer Companion',
        short_name: 'Prayer Guide',
        description: 'A free guide to wudu, prayer, short surahs, duas and zikir in English and Malay.',
        theme_color: '#12382a',
        background_color: '#12382a',
        display: 'standalone',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,woff,woff2}'] },
    }),
  ],
})
