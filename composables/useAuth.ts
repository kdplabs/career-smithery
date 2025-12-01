import { useSupabaseUser } from '#imports'

// Add type declarations for Google's OAuth client
declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()

  const signInWithGoogle = async (redirectTo?: string) => {
    try {
      // console.log('signInWithGoogle called with redirectTo:', redirectTo)
      
      // Normalize redirectTo to be a path (not a full URL) to avoid issues with Supabase
      let normalizedRedirectTo = redirectTo
      if (redirectTo && typeof window !== 'undefined') {
        try {
          // If it's a full URL, extract just the pathname + search
          if (redirectTo.startsWith('http://') || redirectTo.startsWith('https://')) {
            const url = new URL(redirectTo)
            normalizedRedirectTo = url.pathname + url.search
          } else if (redirectTo.startsWith(window.location.origin)) {
            // Handle case where origin is included but not protocol
            normalizedRedirectTo = redirectTo.replace(window.location.origin, '')
          }
          // Ensure it starts with / if it's a path
          if (normalizedRedirectTo && !normalizedRedirectTo.startsWith('/')) {
            normalizedRedirectTo = '/' + normalizedRedirectTo
          }
        } catch (e) {
          // If URL parsing fails, assume it's already a path
          if (!normalizedRedirectTo.startsWith('/')) {
            normalizedRedirectTo = '/' + normalizedRedirectTo
          }
        }
        
        // Store the normalized redirect URL in localStorage before OAuth
        if (normalizedRedirectTo) {
          localStorage.setItem('authRedirectUrl', normalizedRedirectTo)
          // console.log('Stored authRedirectUrl in localStorage:', normalizedRedirectTo)
        }
      }
      
      // Always redirect to auth callback first, which will handle the final redirect
      const redirectUrl = `${window.location.origin}/auth/callback`
      // console.log('Using redirectUrl for OAuth:', redirectUrl)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            prompt: 'select_account'
          }
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      // Clear personalized report and other sensitive data from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('personalizedReport')
      }
      // Optionally clear other related items if needed
      // localStorage.removeItem('assessmentData')
      // localStorage.removeItem('assessmentSummary')
      // localStorage.removeItem('linkedinOrResumeText')
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const hasConsent = () => {
    if (!user.value) return false
    
    const consent = user.value.user_metadata?.consent
    if (!consent) return false
    
    // Check if required consents are present and true (privacy and terms are required, contact is optional)
    return consent.privacy === true && consent.terms === true
  }

  const getConsentData = () => {
    if (!user.value) return null
    
    return user.value.user_metadata?.consent || null
  }

  return {
    user,
    signInWithGoogle,
    signOut,
    hasConsent,
    getConsentData
  }
} 