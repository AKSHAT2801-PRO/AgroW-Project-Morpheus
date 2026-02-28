import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      allowedHosts: [
        "tayna-feirie-xuan.ngrok-free.dev",
        "portfolio-favorites-holder-wrote.trycloudflare.com"
      ],
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'https://braided-constrained-maximilian.ngrok-free.dev',
          changeOrigin: true,
          secure: false,
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      }
    }
  }
})
