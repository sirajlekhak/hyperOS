import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/hyperOS/', // Update this to your repository name
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
            type: 'image/ico'
          },
          {
            src: 'favicon-512x512.ico',
            sizes: '512x512',
            type: 'image/ico'
          }
        ]
      }
    })
  ]
});
