<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div v-if="isLoading" class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p v-if="isLoading" class="text-lg text-gray-600">Completing authentication...</p>
      <div v-if="error" class="text-red-600 mb-4">
        <p class="text-lg font-semibold">Authentication Error</p>
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue'

// Prevent SSR for this page since it requires localStorage
definePageMeta({
  ssr: false
})

const router = useRouter()
const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const isLoading = ref(true)
const error = ref(null)

// Function to process and store consent data
async function processConsentData(userId) {
  try {
    // Check if we're on the client side
    if (typeof window === 'undefined') return
    
    const pendingConsent = localStorage.getItem('pendingConsent')
    if (!pendingConsent) {
      // console.log('No pending consent data found')
      return
    }

    const consentData = JSON.parse(pendingConsent)
    // console.log('Processing consent data:', consentData)

    // Update user metadata with consent information
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        consent: {
          privacy: consentData.privacy,
          contact: consentData.contact,
          terms: consentData.terms,
          timestamp: consentData.timestamp,
          version: '1.0'
        }
      }
    })

    if (updateError) {
      console.error('Error updating user metadata with consent:', updateError)
      throw new Error('Failed to store consent data: ' + updateError.message)
    }

    // console.log('Consent data stored successfully in user metadata')
    
    // Clear pending consent from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pendingConsent')
    }
  } catch (err) {
    console.error('Error processing consent data:', err)
    // Don't throw error here as it shouldn't block the login process
  }
}

// Function to ensure pay-as-you-go subscription and credits
async function ensurePayAsYouGoSubscription(userId) {
  try {
    // console.log('Starting ensurePayAsYouGoSubscription for user:', userId)
    
    // Get the payg plan id
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('id')
      .eq('name', 'payg')
      .limit(1)
      .single()
    
    // console.log('Payg plan query result:', { plan, planError })
    
    if (planError || !plan) {
      throw new Error('Pay-as-you-go plan not found')
    }

    // Check if user already has a payg subscription
    const { data: sub, error: subError } = await supabase
      .from('user_subscriptions')
      .select('id')
      .eq('user_id', userId)
      .eq('plan_id', plan.id)
      .maybeSingle()
    
    // console.log('Existing subscription check:', { sub, subError })
    
    if (subError) {
      throw subError
    }

    if (!sub) {
      // console.log('No existing subscription found, creating new one...')
      
      // Insert payg subscription
      const { data: newSub, error: insertError } = await supabase.from('user_subscriptions').insert([
        {
          user_id: userId,
          plan_id: plan.id,
          is_active: true,
          auto_renew: false,
          start_date: new Date().toISOString()
        }
      ]).select()
      
      // console.log('Subscription creation result:', { newSub, insertError })
      
      if (insertError) {
        throw new Error('Failed to create pay-as-you-go subscription: ' + insertError.message)
      }

      // console.log('Creating initial credit record...')
      
      // Create initial credit record for new user
      const { data: newCredit, error: creditError } = await supabase.from('user_credits').insert([
        {
          user_id: userId,
          change: 0, // Start with 0 credits
          reason: 'initial_setup',
          balance_after: 0,
          created_at: new Date().toISOString()
        }
      ]).select()
      
      // console.log('Credit record creation result:', { newCredit, creditError })
      
      if (creditError) {
        throw new Error('Failed to create initial credit record: ' + creditError.message)
      }
    } else {
      // console.log('Existing subscription found, skipping creation')
    }
  } catch (err) {
    console.error('Error in ensurePayAsYouGoSubscription:', err)
    throw err
  }
}

// Check for error in URL query params
onMounted(() => {
  const errorMessage = route.query.error
  if (errorMessage) {
    error.value = decodeURIComponent(errorMessage)
    isLoading.value = false
  }
})

watch(
  () => user.value,
  async (newUser) => {
    // console.log('Auth callback - User watch triggered:', { newUser, hasEmail: newUser?.email })
    if (newUser && newUser.email) {
      try {
        // console.log('Starting setup process for user:', newUser.id)
        
        // Process consent data first
        await processConsentData(newUser.id)
        
        // Ensure subscription and credits are set up
        await ensurePayAsYouGoSubscription(newUser.id)
        
        // First check if user already has a plan with existing data
        const { data: existingPlan, error: fetchError } = await supabase
          .from('user_plans')
          .select('id, assessment_data')
          .eq('user_id', newUser.id)
          .maybeSingle()
        
        // console.log('Existing plan check:', existingPlan); 
        
        if (fetchError) {
          throw new Error('Error checking existing plan: ' + fetchError.message)
        }

        // Check if we have local assessment data
        const savedData = typeof window !== 'undefined' ? localStorage.getItem('assessmentData') : null
        
        if (existingPlan) {
          // User has existing plan - check if it has assessment data
          const hasExistingData = existingPlan.assessment_data && 
            Object.keys(existingPlan.assessment_data).length > 0 &&
            !existingPlan.assessment_data._metadata?.isEmpty

          if (hasExistingData) {
            // Database has data - prioritize database over local data
            // console.log('Found existing assessment data in database, using database data')
            // Clear local data since database is the source of truth
            if (typeof window !== 'undefined') {
              localStorage.removeItem('assessmentData')
              localStorage.removeItem('assessmentSummary')
            }
          } else if (savedData) {
            // Database plan exists but no assessment data - update with local data
            // console.log('Found local assessment data, updating existing plan')
            const assessmentData = JSON.parse(savedData)
            
            const { error: updateError } = await supabase
              .from('user_plans')
              .update({ 
                assessment_data: {
                  ...assessmentData,
                  _metadata: {
                    isRawData: true,
                    lastUpdated: new Date().toISOString()
                  }
                }
              })
              .eq('id', existingPlan.id)
              .eq('user_id', newUser.id)

            if (updateError) {
              throw new Error('Failed to update assessment data: ' + updateError.message)
            }
            // console.log('Assessment data updated successfully')
          }
        } else if (savedData) {
          // No existing plan - create new plan with local data
          // console.log('No existing plan found, creating new plan with local data')
          const assessmentData = JSON.parse(savedData)
          
          const { error: insertError } = await supabase
            .from('user_plans')
            .insert([
              {
                user_id: newUser.id,
                assessment_data: {
                  ...assessmentData,
                  _metadata: {
                    isRawData: true,
                    lastUpdated: new Date().toISOString()
                  }
                },
                created_at: new Date().toISOString()
              }
            ])

          if (insertError) {
            throw new Error('Failed to save assessment data: ' + insertError.message)
          }
          // console.log('Assessment data saved successfully')
        }

        // Check for redirect URL from localStorage (stored before OAuth)
        const storedRedirectUrl = typeof window !== 'undefined' ? localStorage.getItem('authRedirectUrl') : null
        // console.log('Auth callback - storedRedirectUrl:', storedRedirectUrl)
        
        // Check if we have LinkedIn/resume text
        const linkedinText = typeof window !== 'undefined' ? localStorage.getItem('linkedinOrResumeText') : null
        // console.log('Auth callback - linkedinText:', linkedinText)
        
        if (storedRedirectUrl) {
          // If we have a stored redirect URL, use it and clear it (highest priority)
          // console.log('Redirecting to stored URL:', storedRedirectUrl)
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authRedirectUrl')
          }
          // Add a small delay to ensure user state is fully established
          setTimeout(() => {
            router.push(storedRedirectUrl)
          }, 200)
        } else if (linkedinText) {
          // If we have LinkedIn text but no stored redirect, redirect to summary with the text and focus on input section
          // console.log('Redirecting to summary with LinkedIn text')
          router.push({
            path: '/summary',
            query: { 
              linkedinText: encodeURIComponent(linkedinText),
              focusInput: 'true' // Add flag to focus on input section
            }
          })
        } else {
          // If no LinkedIn text and no stored redirect, just redirect to summary
          // console.log('Redirecting to summary (default)')
          router.push('/summary')
        }
      } catch (err) {
        console.error('Error during setup:', err)
        error.value = err.message || 'An error occurred during setup'
        isLoading.value = false
      }
    } else {
      // console.log('No user or email found, skipping setup')
    }
  },
  { immediate: true }
)
</script> 