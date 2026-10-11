// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/ptrkeva_portfolio/', // Idagdag ang linyang ito
// })

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute site URL for SEO/link-preview tags. Set VITE_SITE_URL once you have a custom domain;
// on Vercel it falls back to the project's production URL automatically.
function siteUrl(mode) {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.VITE_SITE_URL) return env.VITE_SITE_URL.replace(/\/$/, '')
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  return ''
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl(mode)),
    },
  ],
  // base: "/ptrkeva_portfolio/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
}))
