<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Personalized Report Wizard</h1>
            <p class="text-gray-600 mt-2">Generate your personalized career action plan</p>
          </div>
          <div class="flex items-center gap-4">
            <!-- Credit Status -->
            <div v-if="!loadingCredits" class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg">
              <Icon name="i-heroicons-credit-card" class="w-4 h-4 text-gray-600" />
              <span class="text-sm font-medium text-gray-700">
                Credits: {{ userCredits }}
              </span>
              <span v-if="userCredits < 10" class="text-xs text-red-600 font-medium">
                (Need 10 credits)
              </span>
            </div>
            <NuxtLink 
              to="/summary" 
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
              Back to Summary
            </NuxtLink>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: '100%' }"
          ></div>
        </div>
        
        <!-- Step indicator -->
        <div class="flex justify-center">
          <div class="flex flex-col items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-blue-600 text-white">
              1
            </div>
            <span class="text-xs text-gray-600 mt-1 text-center">LinkedIn Profile</span>
          </div>
        </div>
      </div>

      <!-- Credit Warning -->
      <div v-if="!loadingCredits && userCredits < 10" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-center gap-3">
          <Icon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
          <div>
            <h3 class="text-sm font-medium text-red-800">Insufficient Credits</h3>
            <p class="text-sm text-red-700 mt-1">
              You need at least 10 credits to generate a personalized report. 
              <NuxtLink to="/credits" class="font-medium underline hover:no-underline">
                Purchase credits here
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>

      <!-- Processing Overlay -->
      <div v-if="isGenerating" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Generating Your Report</h2>
          <p class="text-gray-600 mb-6">{{ loadingMessage }}</p>
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-500"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <p class="text-sm text-gray-500">Please wait while we create your personalized career action plan...</p>
        </div>
      </div>

      <!-- Step Content -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        <div class="max-w-2xl mx-auto">
          <!-- Login Prompt for Non-Authenticated Users -->
          <div v-if="!user" class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="i-heroicons-lock-closed" class="w-8 h-8 text-blue-600" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p class="text-gray-600 mb-6">
              Please log in to generate your personalized career action plan. Your assessment results and LinkedIn information will be used to create a comprehensive report.
            </p>
            <button
              @click="handleLogin"
              class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all"
            >
              <Icon name="i-heroicons-arrow-right-on-rectangle" class="mr-2" />
              Login to Continue
            </button>
          </div>

          <!-- LinkedIn Input Form for Authenticated Users -->
          <div v-else>
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="i-mdi-linkedin" class="w-8 h-8 text-blue-600" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">LinkedIn Profile Information</h2>
              <p class="text-gray-600">
                Please paste your LinkedIn profile summary or resume text below. This information, along with your assessment results, will be used to generate your personalized career action plan.
              </p>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="linkedinText" class="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile Summary or Resume Text
                </label>
                <textarea
                  id="linkedinText"
                  v-model="formData.linkedinText"
                  rows="12"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Paste your LinkedIn profile summary or resume text here..."
                  required
                ></textarea>
                <p class="mt-2 text-sm text-gray-500">
                  Include your professional experience, skills, achievements, and career objectives for the best results.
                </p>
              </div>

              <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex items-center gap-2">
                  <Icon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
                  <p class="text-sm text-red-700">{{ error }}</p>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="!formData.linkedinText.trim() || isGenerating || userCredits < 10"
                  class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                >
                  <Icon name="i-mdi-brain" class="mr-2" />
                  Generate Report
                  <span class="text-sm ml-2">(10 credits, $3)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Prevent SSR for this page since it requires authentication
definePageMeta({
  ssr: false
})

const route = useRoute()
const router = useRouter()
const { user } = useAuth()
const supabase = useSupabaseClient()

const userCredits = ref(null)
const loadingCredits = ref(true)
const isGenerating = ref(false)
const progress = ref(0)
const loadingMessage = ref('Analyzing your profile...')
const error = ref('')

const formData = ref({
  linkedinText: ''
})

const loadingMessages = [
  'Analyzing your profile...',
  'Processing assessment results...',
  'Matching skills and experience...',
  'Generating personalized recommendations...',
  'Creating action plan...',
  'Finalizing your report...'
]

let progressInterval = null

const startProgressAnimation = () => {
  let currentStep = 0
  progress.value = 10
  
  progressInterval = setInterval(() => {
    if (currentStep < loadingMessages.length - 1) {
      currentStep++
      loadingMessage.value = loadingMessages[currentStep]
      progress.value = Math.min(10 + (currentStep * 15), 90)
    }
  }, 2000)
}

const stopProgressAnimation = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  progress.value = 100
}

const submitForm = async () => {
  if (!user.value) {
    error.value = 'Please log in to generate your personalized report.'
    return
  }

  if (!formData.value.linkedinText.trim()) {
    error.value = 'Please enter your LinkedIn profile or resume text.'
    return
  }

  if (userCredits.value < 10) {
    error.value = 'You need at least 10 credits to generate a personalized report.'
    return
  }

  error.value = ''
  isGenerating.value = true
  progress.value = 0
  loadingMessage.value = loadingMessages[0]
  startProgressAnimation()

  try {
    // Get assessment summary from database (primary source) or localStorage (fallback)
    let assessmentSummary = null
    
    // Try to get from database first if user is logged in
    if (user.value) {
      try {
        const { data: userPlan, error: fetchError } = await supabase
          .from('user_plans')
          .select('assessment_data')
          .eq('user_id', user.value.id)
          .single()

        if (!fetchError && userPlan?.assessment_data) {
          assessmentSummary = userPlan.assessment_data
          console.log('Found assessment data in database:', assessmentSummary)
        }
      } catch (err) {
        console.error('Error fetching assessment data from database:', err)
      }
    }

    // Fallback to localStorage if no database data
    if (!assessmentSummary) {
      const localData = localStorage.getItem('assessmentSummary')
      if (localData) {
        try {
          assessmentSummary = JSON.parse(localData)
          console.log('Using assessment data from localStorage:', assessmentSummary)
        } catch (err) {
          console.error('Error parsing localStorage data:', err)
        }
      }
    }

    if (!assessmentSummary) {
      throw new Error('No assessment data found. Please complete the assessment first.')
    }

    // Save LinkedIn text to localStorage first
    localStorage.setItem('linkedinOrResumeText', formData.value.linkedinText)

    // Save LinkedIn/CV data to database
    await saveAssessmentData(formData.value.linkedinText, null, assessmentSummary)

    // Call the report generation API
    const response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.value.id,
        assessmentSummary: assessmentSummary,
        linkedinText: formData.value.linkedinText
      })
    })

    if (response.status === 402) {
      stopProgressAnimation()
      isGenerating.value = false
      // Redirect to credits page
      await router.push('/credits')
      return
    }

    if (!response.ok) {
      throw new Error('Failed to generate report')
    }

    const result = await response.json()
    
    // Save to database first (database is source of truth)
    await saveAssessmentData(formData.value.linkedinText, result.report, assessmentSummary)
    
    stopProgressAnimation()
    
    // Wait for final progress animation
    setTimeout(async () => {
      // Redirect to the personalized report page
      await router.push('/personalized-report')
    }, 500)
    
  } catch (error) {
    console.error('Error generating report:', error)
    stopProgressAnimation()
    isGenerating.value = false
    error.value = error.message || 'There was an error generating your report. Please try again later.'
  }
}

// Function to save assessment data to database
async function saveAssessmentData(linkedinText = null, personalizedReport = null, assessmentData = null) {
  if (!user.value) return

  try {
    // Use provided assessment data or try to get it from database/localStorage
    if (!assessmentData) {
      // Try to get from database first
      try {
        const { data: userPlan, error: fetchError } = await supabase
          .from('user_plans')
          .select('assessment_data')
          .eq('user_id', user.value.id)
          .single()

        if (!fetchError && userPlan?.assessment_data) {
          assessmentData = userPlan.assessment_data
        }
      } catch (err) {
        console.error('Error fetching assessment data from database:', err)
      }

      // Fallback to localStorage
      if (!assessmentData) {
        const localData = localStorage.getItem('assessmentSummary')
        if (localData) {
          try {
            assessmentData = JSON.parse(localData)
          } catch (err) {
            console.error('Error parsing localStorage data:', err)
          }
        }
      }
    }

    if (!assessmentData) {
      throw new Error('No assessment data found')
    }

    // Check if plan already exists
    const { data: existingPlan, error: fetchError } = await supabase
      .from('user_plans')
      .select('id, assessment_data, personalized_report')
      .eq('user_id', user.value.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw fetchError
    }

    // Prepare update data
    const updateData = {
      assessment_data: {
        ...assessmentData,
        ...(linkedinText && { linkedinText })
      }
    }

    // Add personalized report if provided
    if (personalizedReport) {
      updateData.personalized_report = personalizedReport
    }

    if (existingPlan) {
      // Update existing plan
      const { error: updateError } = await supabase
        .from('user_plans')
        .update(updateData)
        .eq('id', existingPlan.id)
        .eq('user_id', user.value.id) // Extra safety check

      if (updateError) throw updateError
      console.log('Assessment data updated successfully')
    } else {
      // Create new plan
      const { error: insertError } = await supabase
        .from('user_plans')
        .insert([
          {
            user_id: user.value.id,
            ...updateData,
            created_at: new Date().toISOString()
          }
        ])

      if (insertError) throw insertError
      console.log('New assessment data created successfully')
    }

    // After successful database save, sync localStorage if personalized report was saved
    if (personalizedReport) {
      localStorage.setItem('personalizedReport', JSON.stringify(personalizedReport))
    }
  } catch (err) {
    console.error('Error saving assessment data:', err)
    throw err
  }
}

// Function to fetch user credits
async function fetchUserCredits() {
  if (!user.value) return
  
  try {
    const { data: sub, error } = await supabase
      .from('user_subscriptions')
      .select('available_credit')
      .eq('user_id', user.value.id)
      .order('start_date', { ascending: false })
      .limit(1)
      .single()
    
    if (!error && sub) {
      userCredits.value = sub.available_credit || 0
    } else {
      userCredits.value = 0
    }
  } catch (err) {
    console.error('Error fetching user credits:', err)
    userCredits.value = 0
  } finally {
    loadingCredits.value = false
  }
}

// Load LinkedIn text from localStorage if it exists
const loadLinkedInText = () => {
  try {
    const saved = localStorage.getItem('linkedinOrResumeText')
    if (saved) {
      formData.value.linkedinText = saved
    }
  } catch (err) {
    console.error('Error loading LinkedIn text:', err)
  }
}

// Handle login for non-authenticated users
const handleLogin = async () => {
  try {
    const { signInWithGoogle } = useAuth()
    
    // Use the proper Google OAuth flow with redirect to report wizard
    await signInWithGoogle('/report-wizard')
  } catch (error) {
    console.error('Error signing in with Google:', error)
    error.value = 'Failed to sign in. Please try again.'
  }
}

// Watch for user authentication changes
watch(user, (newUser) => {
  if (newUser) {
    fetchUserCredits()
    loadLinkedInText()
  }
  // Don't redirect non-authenticated users - show login prompt instead
}, { immediate: true })

// Cleanup on unmount
onBeforeUnmount(() => {
  stopProgressAnimation()
})
</script>
