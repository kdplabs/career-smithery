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
      gtmId: process.env.GTM_ID || '',
      siteUrl: process.env.SITE_URL || 'https://careersmithery.com'
    }
  },
  app: {
    head: {
      title: 'Career Smithery - AI-Powered Career Development & Resume Builder',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Empower your career with AI-powered career assessments, personalized development plans, and professional resume building tools. Get data-driven insights based on proven career development theories.' 
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Career Smithery' },
        { name: 'keywords', content: 'career development, career assessment, resume builder, AI resume, career planning, professional development, job search, career coaching' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Career Smithery' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:image', content: `${process.env.SITE_URL || 'https://careersmithery.com'}/logo.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Career Smithery - AI-Powered Career Development & Resume Builder' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@careersmithery' },
        { name: 'twitter:creator', content: '@careersmithery' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: process.env.SITE_URL || 'https://careersmithery.com' },
        // DNS prefetch for external domains
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
        // Preconnect for critical resources
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Career Smithery',
            url: process.env.SITE_URL || 'https://careersmithery.com',
            logo: `${process.env.SITE_URL || 'https://careersmithery.com'}/logo.png`,
            description: 'AI-powered career development and resume building platform that helps professionals forge their career path with precision.',
            sameAs: [
              'https://twitter.com/careersmithery',
              'https://www.linkedin.com/company/career-smithery'
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              email: 'support@careersmithery.com'
            }
          })
        }
      ]
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