<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- No Data State -->
      <div v-if="!resumeData" class="text-center py-16">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="i-heroicons-document-text" class="w-8 h-8 text-gray-400" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">No Resume Found</h2>
        <p class="text-gray-600 mb-6">No resume data found for this job application.</p>
        <NuxtLink to="/jobs" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Back to Jobs
        </NuxtLink>
      </div>

      <!-- Main Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Resume Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Header -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h1 class="text-2xl font-bold text-gray-900">Your Optimized Resume</h1>
              <span class="text-sm text-gray-500">Generated {{ formatDate(resumeData.generatedAt) }}</span>
            </div>
            
            
            
            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3">
              <button
                @click="downloadResumeFromServer"
                :disabled="downloadLoadingServer || editMode"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                :title="editMode ? 'Turn off edit mode to download' : ''"
              >
                <Icon v-if="downloadLoadingServer" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
                <Icon v-else name="i-heroicons-arrow-down-tray" class="w-4 h-4" />
                <span>{{ downloadLoadingServer ? 'Generating...' : 'Download PDF' }}</span>
              </button>
              
              <NuxtLink 
                :to="`/resume-wizard?jobId=${jobData.id}`"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Icon name="i-heroicons-arrow-path" class="w-4 h-4" />
                <span>Regenerate</span>
              </NuxtLink>
              
              <button 
                v-if="!hasCoverLetter"
                @click="generateCoverLetter"
                :disabled="generatingCoverLetter"
                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Icon name="i-heroicons-envelope" class="w-4 h-4" />
                <span>{{ generatingCoverLetter ? 'Generating...' : 'Generate Cover Letter' }}</span>
              </button>
              
              <NuxtLink 
                v-else
                :to="`/cover-letter?jobId=${jobData.id}`"
                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Icon name="i-heroicons-envelope" class="w-4 h-4" />
                <span>Cover Letter</span>
              </NuxtLink>


              
              <NuxtLink to="/jobs" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Back to Jobs
              </NuxtLink>
            </div>
                     </div>

           <!-- Credit Warning -->
           <div v-if="showCreditWarning" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
             <div class="flex items-center gap-3">
               <Icon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
               <div>
                 <h3 class="text-sm font-medium text-red-800">No Credits Available</h3>
                 <p class="text-sm text-red-700 mt-1">
                   You need at least 1 credit to generate a cover letter. 
                   <NuxtLink to="/credits" class="font-medium underline hover:no-underline">
                     Purchase credits here
                   </NuxtLink>
                 </p>
               </div>
             </div>
           </div>

           <!-- Template Selection -->
           <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
             <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
               <div>
                 <h3 class="text-sm font-medium text-gray-900">Resume Template</h3>
                 <p class="text-xs text-gray-500">Choose the design that best represents you</p>
               </div>
               <div class="flex space-x-2">
                 <button
                   v-for="template in templates"
                   :key="template.id"
                   @click="selectedTemplate = template.id"
                   :class="[
                     'px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                     selectedTemplate === template.id
                       ? 'bg-blue-600 text-white'
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                   ]"
                 >
                   {{ template.name }}
                 </button>
               </div>
             </div>
           </div>

           <!-- Edit Mode Toggle -->
           <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
             <div class="flex items-center justify-between">
               <div>
                 <h3 class="text-sm font-medium text-gray-900">Edit Mode</h3>
                 <p class="text-xs text-gray-500">Click on any section to edit its content</p>
               </div>
               <button
                 @click="editMode = !editMode"
                 :class="[
                   'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                   editMode ? 'bg-blue-600' : 'bg-gray-200'
                 ]"
               >
                 <span
                   :class="[
                     'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                     editMode ? 'translate-x-5' : 'translate-x-0'
                   ]"
                 ></span>
               </button>
             </div>
           </div>

                      <!-- Resume Display -->
           <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
             <component 
               v-if="resumeData"
               :is="currentTemplate"
               :resume="resumeData" 
               :edit-mode="editMode"
               @edit-section="openEditModal"
               @reorder-accomplishments="reorderAccomplishments"
             />
           </div>

           <!-- Edit Section Modal -->
           <EditSectionModal
             :is-open="showEditModal"
             :section="editingSection"
             :edit-data="editingData"
             @close="closeEditModal"
             @save="saveEditChanges"
           />
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          
          <!-- Match Score -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Match Score</h3>
            <div class="text-center">
              <div class="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="2"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    :stroke="scoreColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    :stroke-dasharray="`${resumeData.matchScore || 0}, 100`"
                  />
                </svg>
                <span class="absolute text-xl font-bold text-gray-900">{{ resumeData.matchScore || 0 }}%</span>
              </div>
              <p class="text-sm text-gray-600">{{ getScoreDescription(resumeData.matchScore) }}</p>
            </div>
          </div>

          <!-- Match Analysis -->
          <div v-if="resumeData.matchAnalysis" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Match Analysis</h3>
            <p class="text-sm text-gray-700 leading-relaxed">{{ resumeData.matchAnalysis }}</p>
          </div>

          <!-- Interview Questions -->
          <div v-if="resumeData.interviewQuestions && resumeData.interviewQuestions.length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Practice Interview Questions</h3>
            <ul class="space-y-3">
              <li v-for="(question, index) in resumeData.interviewQuestions" :key="index" class="text-sm text-gray-700">
                <span class="font-medium text-blue-600">{{ index + 1 }}.</span>
                {{ question }}
              </li>
            </ul>
          </div>

          <!-- Study Topics -->
          <div v-if="resumeData.studyTopics && resumeData.studyTopics.length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Topics to Study</h3>
            <ul class="space-y-2">
              <li v-for="(topic, index) in resumeData.studyTopics" :key="index" class="flex items-start gap-2 text-sm text-gray-700">
                <Icon name="i-heroicons-check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{{ topic }}</span>
              </li>
            </ul>
          </div>

          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ResumeDisplay from '~/components/ResumeDisplay.vue'
import ResumeTemplateClassic from '~/components/ResumeTemplateClassic.vue'
import ResumeTemplateModern from '~/components/ResumeTemplateModern.vue'
import ResumeTemplateMinimal from '~/components/ResumeTemplateMinimal.vue'
import EditSectionModal from '~/components/EditSectionModal.vue'
import { useDatabase } from '~/composables/useDatabase';
import { useCredits } from '~/composables/useCredits';

// Prevent SSR for this page since it requires authentication
definePageMeta({
  ssr: false
})

const route = useRoute()
const router = useRouter()
const { user } = useAuth()
const supabase = useSupabaseClient()
const { saveResumeToDatabase, getResumeFromDatabase } = useDatabase();
const { userCredits, fetchUserCredits } = useCredits();

// State
const resumeData = ref(null)
const jobData = ref({})
const downloadLoadingServer = ref(false)
const generatingCoverLetter = ref(false)
const selectedTemplate = ref('classic')
const editMode = ref(false)
const showEditModal = ref(false)
const editingSection = ref('')
const editingData = ref(null)
const showCreditWarning = ref(false)

// Template options
const templates = [
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern' },
  { id: 'minimal', name: 'Minimal' }
]

// Computed properties
const scoreColor = computed(() => {
  const score = resumeData.value?.matchScore || 0
  if (score >= 80) return '#10b981' // Green
  if (score >= 60) return '#f59e0b' // Yellow
  return '#ef4444' // Red
})

const currentTemplate = computed(() => {
  const templateMap = {
    classic: ResumeTemplateClassic,
    modern: ResumeTemplateModern,
    minimal: ResumeTemplateMinimal
  }
  return templateMap[selectedTemplate.value] || ResumeTemplateClassic
})

const hasCoverLetter = computed(() => {
  if (!jobData.value?.id) return false
  return !!jobData.value.cover_letter_data
})

// Functions
function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getScoreDescription(score) {
  if (score >= 80) return 'Excellent match!'
  if (score >= 60) return 'Good match'
  if (score >= 40) return 'Fair match'
  return 'Needs improvement'
}

async function downloadResumeFromServer() {
  downloadLoadingServer.value = true
  try {
    const response = await fetch('/api/generate-resume-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeData: resumeData.value,
        template: selectedTemplate.value,
      }),
    });

    // Check if response is JSON (error) or blob (PDF)
    const contentType = response.headers.get('content-type')
    
    if (contentType && contentType.includes('application/json')) {
      // This is an error response
      const errorData = await response.json()
      console.error('Server returned error:', errorData)
      throw new Error(errorData.message || 'Failed to generate PDF on the server.')
    }
    
    if (!response.ok) {
      throw new Error('Failed to generate PDF on the server.')
    }

    const blob = await response.blob();
    const contentDisposition = response.headers.get('content-disposition');
    let filename = 'resume.pdf';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch.length > 1) {
        filename = filenameMatch[1];
      }
    }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error downloading server-side generated resume:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      resumeData: resumeData.value,
      template: selectedTemplate.value
    });
    alert(`Failed to download resume: ${error.message || 'Unknown error'}`);
  } finally {
    downloadLoadingServer.value = false
  }
}

async function generateCoverLetter() {
  if (!resumeData.value || !jobData.value.job_description) {
    alert('Please ensure you have a resume and job description available.')
    return
  }

  // Check if user has enough credits
  if (userCredits.value < 1) {
    showCreditWarning.value = true
    return
  }

  // Hide credit warning if it was previously shown
  showCreditWarning.value = false
  generatingCoverLetter.value = true
  try {
    const response = await fetch('/api/generate-cover-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeData: resumeData.value,
        jobDescription: jobData.value.job_description,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to generate cover letter`);
    }

    const coverLetterData = await response.json()
    
    // Save the generated cover letter to database
    const { saveCoverLetterToDatabase } = useDatabase()
    await saveCoverLetterToDatabase(jobData.value.id, coverLetterData)
    
    // Navigate to cover letter page with jobId
    router.push(`/cover-letter?jobId=${jobData.value.id}`)
    
  } catch (error) {
    console.error('Error generating cover letter:', error)
    alert('Failed to generate cover letter. Please try again.')
  } finally {
    generatingCoverLetter.value = false
  }
}

function openEditModal(section) {
  editingSection.value = section
  editingData.value = getSectionData(section)
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  editingSection.value = ''
  editingData.value = null
}

function getSectionData(section) {
  if (!resumeData.value) return null
  
  switch (section) {
    case 'personalInfo':
      return { ...resumeData.value.personalInfo }
    case 'professionalSummary':
      return resumeData.value.professionalSummary
    case 'workExperience':
      return JSON.parse(JSON.stringify(resumeData.value.workExperience))
    case 'education':
      return JSON.parse(JSON.stringify(resumeData.value.education))
    case 'skills':
      return JSON.parse(JSON.stringify(resumeData.value.skills))
    case 'certifications':
      return JSON.parse(JSON.stringify(resumeData.value.certifications || []))
    case 'projects':
      return JSON.parse(JSON.stringify(resumeData.value.projects || []))
    default:
      return null
  }
}

function saveEditChanges(updatedData) {
  if (!resumeData.value) return
  
  switch (editingSection.value) {
    case 'personalInfo':
      resumeData.value.personalInfo = updatedData
      break
    case 'professionalSummary':
      resumeData.value.professionalSummary = updatedData
      break
    case 'workExperience':
      resumeData.value.workExperience = updatedData
      break
    case 'education':
      resumeData.value.education = updatedData
      break
    case 'skills':
      resumeData.value.skills = updatedData
      break
    case 'certifications':
      resumeData.value.certifications = updatedData
      break
    case 'projects':
      resumeData.value.projects = updatedData
      break
  }
  
  closeEditModal()
}

function reorderAccomplishments(jobIndex, oldIndex, newIndex) {
  if (!resumeData.value || !resumeData.value.workExperience) return
  
  const job = resumeData.value.workExperience[jobIndex]
  if (!job || !job.achievements) return
  
  const achievements = job.achievements
  const [movedAchievement] = achievements.splice(oldIndex, 1)
  achievements.splice(newIndex, 0, movedAchievement)
}

// Load data on mount
onMounted(async () => {
  if (!user.value) {
    router.push('/jobs')
    return
  }

  // Fetch user credits
  await fetchUserCredits()

  const jobId = route.query.jobId
  if (!jobId) {
    router.push('/jobs')
    return
  }

  try {
    // Fetch job data
    const { data: job, error: jobError } = await supabase
      .from('user_jobs')
      .select('*')
      .eq('id', jobId)
      .eq('user_id', user.value.id)
      .single()

    if (jobError || !job) {
      console.error('Error fetching job:', jobError)
      router.push('/jobs')
      return
    }

    jobData.value = job

    // Extract resume data
    if (job.resume_data) {
      // Check if resume_data is a string that needs to be parsed
      if (typeof job.resume_data === 'string') {
        try {
          resumeData.value = JSON.parse(job.resume_data)
        } catch (e) {
          console.error('Error parsing resume_data:', e)
          resumeData.value = job.resume_data
        }
      } else {
        resumeData.value = job.resume_data
      }
      // No need to save to localStorage since it's already in the database
    } else {
      // No resume data found
      resumeData.value = null
    }

    // Check for success message from resume wizard
    if (route.query.success === 'true' && route.query.message) {
      // Show success message (you could implement a toast notification here)
      console.log('Success:', route.query.message)
      // Clear the query params
      router.replace({ path: '/resume-summary', query: { jobId } })
    }

  } catch (error) {
    console.error('Error loading resume summary:', error)
    router.push('/jobs')
  }
})
</script>
