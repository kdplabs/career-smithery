<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <!-- Header -->
       <div class="mb-8">
         <div class="flex items-center justify-between mb-4">
           <div>
             <h1 class="text-3xl font-bold text-gray-900">Resume Builder Wizard</h1>
             <p class="text-gray-600 mt-2">Create a professional resume tailored to your target job</p>
           </div>
           <div class="flex items-center gap-4">
             <!-- Credit Status -->
             <div v-if="!loadingCredits" class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg">
               <Icon name="i-heroicons-credit-card" class="w-4 h-4 text-gray-600" />
               <span class="text-sm font-medium text-gray-700">
                 Credits: {{ userCredits }}
               </span>
               <span v-if="userCredits < 1" class="text-xs text-red-600 font-medium">
                 (Need credits)
               </span>
             </div>
             <NuxtLink 
               to="/jobs" 
               class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
             >
               <Icon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
               Back to Jobs
             </NuxtLink>
           </div>
         </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${(currentStep / 4) * 100}%` }"
          ></div>
        </div>
        
        <!-- Step indicators -->
        <div class="flex justify-between">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="flex flex-col items-center"
          >
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200"
              :class="[
                index + 1 <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-600'
              ]"
            >
              {{ index + 1 }}
            </div>
            <span class="text-xs text-gray-600 mt-1 text-center max-w-20">{{ step.title }}</span>
          </div>
        </div>
      </div>

             <!-- Credit Warning -->
       <div v-if="!loadingCredits && userCredits < 1" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
         <div class="flex items-center gap-3">
           <Icon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
           <div>
             <h3 class="text-sm font-medium text-red-800">No Credits Available</h3>
             <p class="text-sm text-red-700 mt-1">
               You need at least 1 credit to generate a resume. 
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
           <h2 class="text-2xl font-bold text-gray-900 mb-4">Generating Your Resume</h2>
           <p class="text-gray-600 mb-6">{{ loadingMessage }}</p>
           <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
             <div 
               class="bg-blue-600 h-2 rounded-full transition-all duration-500"
               :style="{ width: `${progress}%` }"
             ></div>
           </div>
           <p class="text-sm text-gray-500">Please wait while we create your perfect resume...</p>
         </div>
       </div>

       <!-- Step Content -->
       <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
         <component 
           :is="currentStepComponent" 
           :data="formData"
           :job-data="jobData"
           :user-credits="userCredits"
           @update="updateFormData"
           @next="nextStep"
           @prev="prevStep"
           @submit="submitForm"
         />
       </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import StepJobDescription from '~/components/wizard/StepJobDescription.vue'
import StepCurrentResume from '~/components/wizard/StepCurrentResume.vue'
import StepMetrics from '~/components/wizard/StepMetrics.vue'
import StepInstructions from '~/components/wizard/StepInstructions.vue'

// Prevent SSR for this page since it requires authentication
definePageMeta({
  ssr: false
})

const route = useRoute()
const router = useRouter()
const { user } = useAuth()

// Get job data from route query if available
const jobData = computed(() => {
  const jobId = route.query.jobId
  if (jobId) {
    // You could fetch job data here if needed
    return { id: jobId }
  }
  return {}
})

const currentStep = ref(1)
const userCredits = ref(null)
const loadingCredits = ref(true)
const isGenerating = ref(false)
const progress = ref(0)
const loadingMessage = ref('Analyzing job requirements...')

const loadingMessages = [
  'Analyzing job requirements...',
  'Processing your background...',
  'Matching skills and experience...',
  'Generating optimized content...',
  'Calculating match score...',
  'Preparing interview questions...',
  'Finalizing your resume...'
]

let progressInterval = null

const startProgressAnimation = () => {
  let currentStep = 0
  progress.value = 10
  
  progressInterval = setInterval(() => {
    if (currentStep < loadingMessages.length - 1) {
      currentStep++
      loadingMessage.value = loadingMessages[currentStep]
      progress.value = Math.min(10 + (currentStep * 12), 90)
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

const steps = [
  { title: 'Job Description', component: 'StepJobDescription' },
  { title: 'Current Resume', component: 'StepCurrentResume' },
  { title: 'Metrics', component: 'StepMetrics' },
  { title: 'Instructions', component: 'StepInstructions' }
]

const formData = ref({
  jobDescription: '',
  currentResume: '',
  metrics: '',
  additionalInstructions: ''
})

// Load default resume data from localStorage
const loadDefaultResumeData = () => {
  try {
    const saved = localStorage.getItem('defaultResumeData')
    if (saved) {
      const defaultData = JSON.parse(saved)
      if (defaultData.currentResume) {
        formData.value.currentResume = defaultData.currentResume
      }
      if (defaultData.metrics) {
        formData.value.metrics = defaultData.metrics
      }
    }
  } catch (err) {
    console.error('Error loading default resume data:', err)
  }
}

const currentStepComponent = computed(() => {
  const stepMap = {
    1: StepJobDescription,
    2: StepCurrentResume,
    3: StepMetrics,
    4: StepInstructions
  }
  return stepMap[currentStep.value]
})

const updateFormData = (data) => {
  formData.value = { ...formData.value, ...data }
}

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitForm = async () => {
  isGenerating.value = true
  progress.value = 0
  loadingMessage.value = loadingMessages[0]
  startProgressAnimation()

  try {
    // Call the resume generation API
    const apiResponse = await $fetch('/api/generate-resume', {
      method: 'POST',
      body: {
        user_id: user.value.id,
        jobDescription: formData.value.jobDescription,
        currentResume: formData.value.currentResume,
        metrics: formData.value.metrics,
        additionalInstructions: formData.value.additionalInstructions
      }
    })
    
    // Save resume data to database
    const supabase = useSupabaseClient()
    let jobId = null
    
    if (jobData.value.id) {
      // Update existing job with resume data
      const { data, error: updateError } = await supabase
        .from('user_jobs')
        .update({
          job_title: apiResponse.resume.jobTitle || 'Resume Generated',
          company_name: apiResponse.resume.companyName || 'Career Smithery',
          job_description: formData.value.jobDescription,
          status: 'resume_created',
          resume_data: apiResponse.resume,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobData.value.id)
        .eq('user_id', user.value.id)
        .select()
        .single()
      
      if (updateError) throw updateError
      jobId = jobData.value.id
    } else {
      // Create new job entry with the generated resume data
      const newJob = {
        job_title: apiResponse.resume.jobTitle || 'Resume Generated',
        company_name: apiResponse.resume.companyName || 'Career Smithery',
        job_description: formData.value.jobDescription,
        status: 'resume_created',
        resume_data: apiResponse.resume,
        priority: 'medium'
      }
      
      const { data, error: insertError } = await supabase
        .from('user_jobs')
        .insert({
          user_id: user.value.id,
          ...newJob
        })
        .select()
        .single()
      
      if (insertError) throw insertError
      jobId = data.id
    }
    
    stopProgressAnimation()
    
    // Wait for final progress animation
    setTimeout(async () => {
      // Redirect to resume summary page
      await router.push({
        path: '/resume-summary',
        query: { 
          jobId: jobId,
          success: 'true',
          message: 'Resume generated successfully! Credits used: ' + apiResponse.creditsUsed
        }
      })
    }, 500)
    
  } catch (error) {
    console.error('Error creating resume:', error)
    stopProgressAnimation()
    
    // Handle specific error cases
    if (error.status === 402) {
      // Not enough credits
      alert('You don\'t have enough credits to generate a resume. Please purchase more credits or upgrade your subscription.')
      // Optionally redirect to credits page
      await router.push('/credits')
    } else if (error.status === 403) {
      // No active subscription
      alert('No active subscription found. Please subscribe to use the resume generation feature.')
      // Optionally redirect to pricing page
      await router.push('/')
    } else {
      // Generic error
      alert('Failed to generate resume. Please try again later.')
    }
  } finally {
    isGenerating.value = false
  }
}

// Pre-populate job description if available
onMounted(() => {
  if (jobData.value.job_description) {
    formData.value.jobDescription = jobData.value.job_description
  }
  
  // Load default resume data
  loadDefaultResumeData()
})

// Function to fetch user credits
async function fetchUserCredits() {
  if (!user.value) return
  
  try {
    const supabase = useSupabaseClient()
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

// Watch for user authentication changes
watch(user, (newUser) => {
  // console.log('Resume wizard - User watch triggered:', { newUser, hasEmail: newUser?.email })
  if (newUser) {
    // console.log('Resume wizard: User authenticated, fetching credits')
    fetchUserCredits()
  } else {
    // console.log('Resume wizard: No user found, will check again in 500ms')
    // Wait a bit longer before redirecting to allow auth state to settle
    setTimeout(() => {
      if (!user.value) {
        // console.log('Resume wizard: Still no user after delay, redirecting to jobs')
        router.push('/jobs')
      } else {
        // console.log('Resume wizard: User found after delay, fetching credits')
        fetchUserCredits()
      }
    }, 500)
  }
}, { immediate: true })

// Cleanup on unmount
onBeforeUnmount(() => {
  stopProgressAnimation()
})
</script>
