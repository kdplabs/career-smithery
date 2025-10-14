import { useSupabaseClient, useSupabaseUser } from '#imports'

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
      
      // Store the redirect URL in localStorage before OAuth
      if (redirectTo && typeof window !== 'undefined') {
        localStorage.setItem('authRedirectUrl', redirectTo)
        // console.log('Stored authRedirectUrl in localStorage:', redirectTo)
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