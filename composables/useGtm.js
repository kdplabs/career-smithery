export const useGtm = () => {
  const config = useRuntimeConfig()
  const gtmId = config.public.gtmId

  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  }

  const trackPageView = (pagePath) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', gtmId, {
        page_path: pagePath
      })
    }
  }

  const setUserId = (userId) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', gtmId, {
        user_id: userId
      })
    }
  }

  const setUserProperties = (properties) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', gtmId, {
        custom_map: properties
      })
    }
  }

  return {
    trackEvent,
    trackPageView,
    setUserId,
    setUserProperties,
    gtmId
  }
}
