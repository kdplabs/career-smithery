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

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
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
      localStorage.removeItem('personalizedReport')
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