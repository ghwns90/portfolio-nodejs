import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { VitePWA } from 'vite-plugin-pwa' // PWA 플러그인

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PWA 설정!!!
    // 우선 npm install vite-plugin-pwa -D 플러그인 다운로드
    /*VitePWA({
      registerType: 'autoUpdate', // 업데이트시 자동으로 새버전 적용
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      // 앱 정보
      manifest: {
        name: 'Hojun Portfolio',
        short_name: 'HojunPort',
        description: 'Hojun의 포트폴리오 사이트입니다.',
        theme_color: '#0a0a0a', // 설정한 배경색
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'portrait',
        // 아이콘 설정
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // 안드로이드 둥근 아이콘 대응
          }
        ]
      }
    }) */
  ],
})
