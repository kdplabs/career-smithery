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
    // When deploying to Netlify, we need to ensure that the @sparticuz/chromium
    // package is not bundled by Nitro, but is instead included as a standalone
    // dependency in the function's node_modules directory.
    externals: {
      external: ['@sparticuz/chromium']
    },
    // Optimize for Netlify builds - reduce memory usage
    minify: true,
    compressPublicAssets: true
  },
  // Nuxt Content optimizations for better build performance
  content: {
    // Enable content caching to speed up builds
    experimental: {
      cacheContents: true,
      stripQueryParameters: false
    },
    // Use safe globs (no leading / and no trailing /) to avoid regex errors
    ignore: [
      '**/.git/**',
      '**/node_modules/**',
      '.DS_Store'
    ],
    // Optimize markdown processing
    markdown: {
      // Disable syntax highlighting if not needed (saves build time)
      // highlight: false,
      // Keep anchor links for better UX
      anchorLinks: {
        depth: 4,
        exclude: [1]
      }
    }
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