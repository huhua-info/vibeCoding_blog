import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 注意：如果你要部署到 https://<USERNAME>.github.io/<REPO>/
  // 請將 base 設定為 '/<REPO>/'
  base: '/vibeCoding_blog/', 
})