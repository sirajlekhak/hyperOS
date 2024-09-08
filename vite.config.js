// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from '@vite-pwa/vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'HyperOs Roms',
        short_name: 'HyperOS',
        description: 'HyperOS is a ported ROM offering enhanced performance and unique features.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon-192x192.ico',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicon-512x512.ico',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
