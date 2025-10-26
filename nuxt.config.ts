// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/icon', '@nuxtjs/supabase', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    public: {
      geminiApiKey: process.env.GEMINI_API_KEY || '',
      gtmId: process.env.GTM_ID || ''
    }
  },
  googleFonts: {
    families: {
      Quicksand: [300, 400, 500, 600, 700],
      Roboto: true, // You can specify weights and styles here, e.g., Roboto: [400, 700]
      // Add other font families if needed
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true,
    base64: false
  },
  supabase: {
    redirect: false
  },
  build: {
    transpile: ['@sparticuz/chromium', 'handlebars'],
  },
  nitro: {
    preset: 'netlify',
    serveStatic: true,
    rollupConfig: {
      external: ['puppeteer-core', '@sparticuz/chromium']
    },
    externals: {
      inline: ['handlebars']
    },
    // Include template files in the deployment
    publicAssets: [
      {
        baseURL: '/_templates',
        dir: 'server/templates',
        maxAge: 0
      }
    ],
    // Copy template files to the function bundle
    serverAssets: [
      {
        baseName: 'templates',
        dir: './server/templates'
      }
    ]
  },
  // If you want to use Heroicons, you might need a Vite plugin.
  // For example, vite-plugin-heroicons-sg
  // You would then configure it in the vite section:
  // vite: {
  //   plugins: [
  //     require('vite-plugin-heroicons-sg')() // Or however the plugin is initialized
  //   ]
  // }
  // For now, I will assume you will handle icon integration, or we can address it later.
})