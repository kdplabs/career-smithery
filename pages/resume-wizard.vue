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
         <!-- Loading job data indicator -->
         <div v-if="loadingJobData" class="text-center py-8">
           <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
           <p class="text-gray-600">Loading previous resume data...</p>
         </div>
         
         <!-- Step component -->
         <component 
           v-else
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

// SSR enabled for SEO - authentication checks happen client-side in onMounted

useHead({
  title: 'Resume Builder Wizard - Career Smithery',
  meta: [
    {
      name: 'description',
      content: 'Create professional, ATS-optimized resumes tailored to your target job using our AI-powered resume builder. Generate custom resumes that match job descriptions and highlight your relevant experience.'
    },
    {
      property: 'og:title',
      content: 'Resume Builder Wizard - Career Smithery'
    },
    {
      property: 'og:description',
      content: 'Create professional, ATS-optimized resumes tailored to your target job using our AI-powered resume builder.'
    },
    {
      property: 'og:url',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/resume-wizard`
    },
    {
      property: 'og:image',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/logo.png`
    },
    {
      name: 'twitter:title',
      content: 'Resume Builder Wizard - Career Smithery'
    },
    {
      name: 'twitter:image',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/logo.png`
    },
    {
      name: 'twitter:description',
      content: 'Create professional, ATS-optimized resumes tailored to your target job using our AI-powered resume builder.'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/resume-wizard`
    }
  ]
})

const route = useRoute()
const router = useRouter()
const { user } = useAuth()

// Job data state
const jobData = ref({})
const loadingJobData = ref(false)

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

// Load job data from database when jobId is provided
const loadJobData = async () => {
  const jobId = route.query.jobId
  if (!jobId || !user.value) return
  
  loadingJobData.value = true
  try {
    const supabase = useSupabaseClient()
    const { data: job, error } = await supabase
      .from('user_jobs')
      .select('*')
      .eq('id', jobId)
      .eq('user_id', user.value.id)
      .single()

    if (error || !job) {
      console.error('Error fetching job data:', error)
      return
    }

    jobData.value = job
    
    // Pre-populate form data with existing job data
    if (job.job_description) {
      formData.value.jobDescription = job.job_description
    }
    
    // If there's existing resume data, extract the current resume and metrics
    if (job.resume_data) {
      let resumeData = job.resume_data
      
      // Parse if it's a string
      if (typeof resumeData === 'string') {
        try {
          resumeData = JSON.parse(resumeData)
        } catch (e) {
          console.error('Error parsing resume_data:', e)
          return
        }
      }
      
      // Extract current resume text from the structured data
      if (resumeData.personalInfo && resumeData.workExperience && resumeData.education) {
        // Reconstruct the resume text from the structured data
        let currentResumeText = ''
        
        // Personal info
        if (resumeData.personalInfo.name) {
          currentResumeText += `Name: ${resumeData.personalInfo.name}\n`
        }
        if (resumeData.personalInfo.email) {
          currentResumeText += `Email: ${resumeData.personalInfo.email}\n`
        }
        if (resumeData.personalInfo.phone) {
          currentResumeText += `Phone: ${resumeData.personalInfo.phone}\n`
        }
        if (resumeData.personalInfo.location) {
          currentResumeText += `Location: ${resumeData.personalInfo.location}\n`
        }
        if (resumeData.personalInfo.linkedin) {
          currentResumeText += `LinkedIn: ${resumeData.personalInfo.linkedin}\n`
        }
        currentResumeText += '\n'
        
        // Professional summary
        if (resumeData.professionalSummary) {
          currentResumeText += `PROFESSIONAL SUMMARY\n${resumeData.professionalSummary}\n\n`
        }
        
        // Work experience
        if (resumeData.workExperience && resumeData.workExperience.length > 0) {
          currentResumeText += 'WORK EXPERIENCE\n'
          resumeData.workExperience.forEach(job => {
            currentResumeText += `${job.title} at ${job.company}\n`
            if (job.duration) currentResumeText += `${job.duration}\n`
            if (job.location) currentResumeText += `${job.location}\n`
            if (job.description) currentResumeText += `${job.description}\n`
            if (job.achievements && job.achievements.length > 0) {
              currentResumeText += 'Key Achievements:\n'
              job.achievements.forEach(achievement => {
                currentResumeText += `• ${achievement}\n`
              })
            }
            currentResumeText += '\n'
          })
        }
        
        // Education
        if (resumeData.education && resumeData.education.length > 0) {
          currentResumeText += 'EDUCATION\n'
          resumeData.education.forEach(edu => {
            currentResumeText += `${edu.degree} in ${edu.field}\n`
            if (edu.institution) currentResumeText += `${edu.institution}\n`
            if (edu.graduationYear) currentResumeText += `Graduated: ${edu.graduationYear}\n`
            if (edu.gpa) currentResumeText += `GPA: ${edu.gpa}\n`
            currentResumeText += '\n'
          })
        }
        
        // Skills
        if (resumeData.skills && resumeData.skills.length > 0) {
          currentResumeText += 'SKILLS\n'
          currentResumeText += resumeData.skills.join(', ') + '\n\n'
        }
        
        // Certifications
        if (resumeData.certifications && resumeData.certifications.length > 0) {
          currentResumeText += 'CERTIFICATIONS\n'
          resumeData.certifications.forEach(cert => {
            currentResumeText += `• ${cert.name}`
            if (cert.issuer) currentResumeText += ` - ${cert.issuer}`
            if (cert.date) currentResumeText += ` (${cert.date})`
            currentResumeText += '\n'
          })
          currentResumeText += '\n'
        }
        
        // Projects
        if (resumeData.projects && resumeData.projects.length > 0) {
          currentResumeText += 'PROJECTS\n'
          resumeData.projects.forEach(project => {
            currentResumeText += `${project.name}\n`
            if (project.description) currentResumeText += `${project.description}\n`
            if (project.technologies) currentResumeText += `Technologies: ${project.technologies.join(', ')}\n`
            currentResumeText += '\n'
          })
        }
        
        formData.value.currentResume = currentResumeText.trim()
      }
    }
    
  } catch (err) {
    console.error('Error loading job data:', err)
  } finally {
    loadingJobData.value = false
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

// Load data on mount
onMounted(async () => {
  // Load job data if jobId is provided (for regeneration)
  if (route.query.jobId) {
    await loadJobData()
  }
  
  // Load default resume data (fallback for new resumes)
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
watch(user, async (newUser) => {
  // console.log('Resume wizard - User watch triggered:', { newUser, hasEmail: newUser?.email })
  if (newUser) {
    // console.log('Resume wizard: User authenticated, fetching credits')
    fetchUserCredits()
    
    // Load job data if jobId is provided and we haven't loaded it yet
    if (route.query.jobId && !jobData.value.id) {
      await loadJobData()
    }
  } else {
    // console.log('Resume wizard: No user found, will check again in 500ms')
    // Wait a bit longer before redirecting to allow auth state to settle
    setTimeout(async () => {
      if (!user.value) {
        // console.log('Resume wizard: Still no user after delay, redirecting to jobs')
        router.push('/jobs')
      } else {
        // console.log('Resume wizard: User found after delay, fetching credits')
        fetchUserCredits()
        
        // Load job data if jobId is provided and we haven't loaded it yet
        if (route.query.jobId && !jobData.value.id) {
          await loadJobData()
        }
      }
    }, 500)
  }
}, { immediate: true })

// Cleanup on unmount
onBeforeUnmount(() => {
  stopProgressAnimation()
})
</script>
