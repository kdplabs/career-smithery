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
const router = useRouter()
const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const isLoading = ref(true)
const error = ref(null)

// Function to ensure pay-as-you-go subscription and credits
async function ensurePayAsYouGoSubscription(userId) {
  try {
    console.log('Starting ensurePayAsYouGoSubscription for user:', userId)
    
    // Get the payg plan id
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('id')
      .eq('name', 'payg')
      .limit(1)
      .single()
    
    console.log('Payg plan query result:', { plan, planError })
    
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
    
    console.log('Existing subscription check:', { sub, subError })
    
    if (subError) {
      throw subError
    }

    if (!sub) {
      console.log('No existing subscription found, creating new one...')
      
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
      
      console.log('Subscription creation result:', { newSub, insertError })
      
      if (insertError) {
        throw new Error('Failed to create pay-as-you-go subscription: ' + insertError.message)
      }

      console.log('Creating initial credit record...')
      
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
      
      console.log('Credit record creation result:', { newCredit, creditError })
      
      if (creditError) {
        throw new Error('Failed to create initial credit record: ' + creditError.message)
      }
    } else {
      console.log('Existing subscription found, skipping creation')
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
    console.log('User watch triggered:', { newUser })
    if (newUser && newUser.email) {
      try {
        console.log('Starting setup process for user:', newUser.id)
        // Ensure subscription and credits are set up
        await ensurePayAsYouGoSubscription(newUser.id)
        
        // Check if we have assessment data to save
        const savedData = localStorage.getItem('assessmentData')
        if (savedData) {
          console.log('Found assessment data to save')
          const assessmentData = JSON.parse(savedData)
          
          // First check if user already has a plan
          const { data: existingPlan, error: fetchError } = await supabase
            .from('user_plans')
            .select('id')
            .eq('user_id', newUser.id)
            .single()

          if (fetchError && fetchError.code !== 'PGRST116') {
            throw new Error('Error checking existing plan: ' + fetchError.message)
          }

          if (existingPlan) {
            // Update existing plan
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
          } else {
            // Create new plan
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
          }
          
          console.log('Assessment data saved successfully')

          // Check if we have LinkedIn/resume text
          const linkedinText = localStorage.getItem('linkedinOrResumeText')
          if (linkedinText) {
            // If we have LinkedIn text, redirect to summary with the text
            router.push({
              path: '/summary',
              query: { linkedinText: encodeURIComponent(linkedinText) }
            })
          } else {
            // If no LinkedIn text, just redirect to summary
            router.push('/summary')
          }
        } else {
          console.log('No assessment data found to save')
          router.push('/summary')
        }
      } catch (err) {
        console.error('Error during setup:', err)
        error.value = err.message || 'An error occurred during setup'
        isLoading.value = false
      }
    } else {
      console.log('No user or email found, skipping setup')
    }
  },
  { immediate: true }
)
</script> 