export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gtmId = config.public.gtmId

  // Only load GTM if we have a valid GTM ID
  if (!gtmId || gtmId === 'GTM-XXXXXXX') {
    console.warn('GTM ID not configured. Please set GTM_ID environment variable.')
    return
  }

  // Load GTM script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(script)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', gtmId)

  // Add GTM noscript fallback
  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)

  // Track page views on route changes
  const router = useRouter()
  router.afterEach((to) => {
    gtag('config', gtmId, {
      page_path: to.fullPath
    })
  })

  // Make gtag available globally
  window.gtag = gtag
})
