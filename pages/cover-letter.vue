<template>
  <div class="min-h-screen bg-gray-100">
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="cover-letter-container">
      
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600">Loading cover letter...</p>
      </div>

      <!-- No Cover Letter Data State -->
      <div v-else-if="!coverLetterData" class="max-w-4xl mx-auto">
        <div v-if="!jobId" class="card text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200">
            <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-4">No Job Selected</h2>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Please go back to your jobs and select a job to generate a cover letter.
          </p>
          
          <NuxtLink to="/jobs" class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 mx-auto w-fit">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>Back to Jobs</span>
          </NuxtLink>
        </div>
        
        <div v-else class="card mb-8">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900 flex items-center">
              <div class="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-4"></div>
              Job Description
            </h2>
          </div>
          
          <textarea
            v-model="jobDescription"
            placeholder="Paste the job description here... Include role requirements, company information, and key responsibilities."
            rows="8"
            class="w-full bg-gray-50 border border-gray-300 rounded-2xl px-6 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          ></textarea>
          
          <div class="mt-6 flex justify-center">
            <button
              @click="generateCoverLetter"
              :disabled="!jobDescription.trim() || generatingCoverLetter"
              class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
            >
              <svg v-if="generatingCoverLetter" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ generatingCoverLetter ? 'Generating...' : 'Generate New' }}</span>
            </button>
          </div>

          <!-- Credit Warning -->
          <div v-if="userCredits < 1" class="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <div>
                <h3 class="text-sm font-medium text-red-800">No Credits Available</h3>
                <p class="text-sm text-red-700 mt-1">
                  You need at least 1 credit to generate a cover letter. 
                  <button @click="showPricingModal = true" class="font-medium underline hover:no-underline">
                    Purchase credits here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Generated Cover Letter -->
      <div v-if="coverLetterData" class="space-y-8">
        
        <!-- Header Actions -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-2xl p-6 border border-gray-200 shadow-sm gap-4">
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <h2 class="text-2xl font-bold text-gray-900">Your Cover Letter</h2>
          </div>
          <div class="flex flex-wrap gap-3">
            <div v-if="jobId">
              <NuxtLink 
                :to="`/resume-summary?jobId=${jobId}`"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Resume
              </NuxtLink>
            </div>
            <button
              @click="toggleEditMode"
              :class="[
                'px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2',
                editMode 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span>{{ editMode ? 'Save Changes' : 'Edit Mode' }}</span>
            </button>
            <button
              @click="downloadCoverLetterFromServer"
              :disabled="downloadingPDF"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg v-if="downloadingPDF" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>{{ downloadingPDF ? 'Generating PDF...' : 'Download PDF' }}</span>
            </button>
            <button
              @click="showRegenerateModal = true"
              :disabled="generatingCoverLetter"
              class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>Regenerate</span>
            </button>
          </div>

        </div>

        <!-- Credit Warning -->
        <div v-if="userCredits < 1" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-red-800">No Credits Available</h3>
              <p class="text-sm text-red-700 mt-1">
                You need at least 1 credit to regenerate a cover letter. 
                <button @click="showPricingModal = true" class="font-medium underline hover:no-underline">
                  Purchase credits here
                </button>
              </p>
            </div>
          </div>
        </div>

        <!-- Template Selection -->
        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Choose Template</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              @click="selectedTemplate = 'classic'"
              :class="[
                'p-4 rounded-xl border-2 transition-all duration-300 text-left',
                selectedTemplate === 'classic'
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              ]"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">Classic</h4>
                  <p class="text-sm text-gray-600">Traditional, professional layout</p>
                </div>
              </div>
            </button>
            
            <button
              @click="selectedTemplate = 'modern'"
              :class="[
                'p-4 rounded-xl border-2 transition-all duration-300 text-left',
                selectedTemplate === 'modern'
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              ]"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">Modern</h4>
                  <p class="text-sm text-gray-600">Contemporary design with gradients</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Template Display -->
        <div id="cover-letter-content" class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <!-- Template Components -->
          <CoverLetterTemplateClassic 
            v-if="selectedTemplate === 'classic' && coverLetterData && resumeData"
            :cover-letter-data="coverLetterData"
            :resume-data="resumeData"
          />
          <CoverLetterTemplateModern 
            v-else-if="selectedTemplate === 'modern' && coverLetterData && resumeData"
            :cover-letter-data="coverLetterData"
            :resume-data="resumeData"
          />
          
          <!-- Edit Mode Overlay -->
          <div v-if="editMode" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Edit Cover Letter</h3>
              <p class="text-gray-600 mb-4">Click on any section below to edit it:</p>
              
              <div class="space-y-4">
                <button
                  @click="openEditModal('coverLetterText')"
                  class="w-full p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50 transition-colors"
                >
                  <h4 class="font-semibold text-gray-900">Cover Letter Text</h4>
                  <p class="text-sm text-gray-600">Edit the main cover letter content</p>
                </button>
                
                <button
                  @click="openEditModal('companyHighlights')"
                  class="w-full p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50 transition-colors"
                >
                  <h4 class="font-semibold text-gray-900">Experience Highlights</h4>
                  <p class="text-sm text-gray-600">Edit company achievements and highlights</p>
                </button>
                
                <button
                  @click="openEditModal('alignedSkills')"
                  class="w-full p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50 transition-colors"
                >
                  <h4 class="font-semibold text-gray-900">Key Skills Match</h4>
                  <p class="text-sm text-gray-600">Edit skills alignment and relevance</p>
                </button>
              </div>
              
              <div class="mt-6 flex justify-end space-x-3">
                <button
                  @click="editMode = false"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Regenerate Modal -->
    <div v-if="showRegenerateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Regenerate Cover Letter</h3>
          <p class="text-sm text-gray-600 mb-4">Provide additional instructions or feedback to improve your cover letter:</p>
          
          <textarea
            v-model="regeneratePrompt"
            rows="6"
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            placeholder="e.g., Make it more formal, emphasize leadership experience, focus on technical skills, etc."
          ></textarea>
          
          <div class="flex justify-end space-x-3">
            <button
              @click="showRegenerateModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              @click="regenerateCoverLetter"
              :disabled="generatingCoverLetter"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {{ generatingCoverLetter ? 'Regenerating...' : 'Regenerate' }}
            </button>
          </div>
        </div>
      </div>
         </div>
   </div>

   <!-- Edit Section Modal -->
   <EditSectionModal
     v-if="showEditModal && editingSectionData"
     :is-open="showEditModal"
     :section="editingSection"
     :edit-data="editingSectionData"
     @close="closeEditModal"
     @save="saveSection"
   />

   <!-- Pricing Modal -->
   <PricingModal
     :show="showPricingModal"
     @close="showPricingModal = false"
     @purchase-complete="handlePurchaseComplete"
   />
 </template>

 <script setup>
 import { ref, onMounted } from 'vue';
import { useDatabase } from '~/composables/useDatabase';
import { useCredits } from '~/composables/useCredits';
import EditSectionModal from '~/components/EditSectionModal.vue';
import CoverLetterTemplateClassic from '~/components/CoverLetterTemplateClassic.vue';
import CoverLetterTemplateModern from '~/components/CoverLetterTemplateModern.vue';
import PricingModal from '~/components/PricingModal.vue';

// SSR enabled for SEO - authentication checks happen client-side in onMounted

useHead({
  title: 'Cover Letter Generator - Career Smithery',
  meta: [
    {
      name: 'description',
      content: 'Generate personalized, professional cover letters tailored to specific job applications. Our AI-powered cover letter generator creates compelling letters that highlight your relevant experience and align with job requirements.'
    },
    {
      property: 'og:title',
      content: 'Cover Letter Generator - Career Smithery'
    },
    {
      property: 'og:description',
      content: 'Generate personalized, professional cover letters tailored to specific job applications using our AI-powered cover letter generator.'
    },
    {
      property: 'og:url',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/cover-letter`
    },
    {
      property: 'og:image',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/logo.png`
    },
    {
      name: 'twitter:title',
      content: 'Cover Letter Generator - Career Smithery'
    },
    {
      name: 'twitter:image',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/logo.png`
    },
    {
      name: 'twitter:description',
      content: 'Generate personalized, professional cover letters tailored to specific job applications using our AI-powered cover letter generator.'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/cover-letter`
    }
  ]
})

const route = useRoute();
const router = useRouter();
const { user } = useAuth();
const { userCredits, fetchUserCredits } = useCredits();
const supabase = useSupabaseClient();

// Get jobId from route query
const jobId = route.query.jobId;

// Initialize database composable
const { getResumeFromDatabase, getCoverLetterFromDatabase, saveCoverLetterToDatabase } = useDatabase();

const jobDescription = ref('');
const coverLetterData = ref(null);
const resumeData = ref(null);
const generatingCoverLetter = ref(false);
const downloadingPDF = ref(false);
const loading = ref(true);
const selectedTemplate = ref('classic'); // Default to classic template
 const editMode = ref(false);
 const editedCoverLetterText = ref('');
 const showRegenerateModal = ref(false);
 const regeneratePrompt = ref('');
 const showEditModal = ref(false);
 const editingSection = ref('');
 const editingSectionData = ref(null);
 const showPricingModal = ref(false);

// Load job description if jobId is provided
const loadJobDescription = async () => {
  if (!jobId || !user.value) return;
  
  try {
    const { data: job, error } = await supabase
      .from('user_jobs')
      .select('job_description')
      .eq('id', jobId)
      .eq('user_id', user.value.id)
      .single();
    
    if (!error && job?.job_description) {
      jobDescription.value = job.job_description;
    }
  } catch (error) {
    console.error('Error loading job description:', error);
  }
};

const generateCoverLetter = async (additionalPrompt = '') => {
  generatingCoverLetter.value = true;
  try {
    // Check if user has enough credits
    if (userCredits.value < 1) {
      showPricingModal.value = true;
      return;
    }

    // Get resume data from database
    const resumeData = await getResumeFromDatabase(jobId);
    if (!resumeData) {
      alert('Please generate a resume first.');
      return;
    }

    const response = await fetch('/api/generate-cover-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeData,
        jobDescription: jobDescription.value,
        additionalPrompt: additionalPrompt,
        user_id: user.value.id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 402) {
        showPricingModal.value = true;
        return;
      } else if (response.status === 403) {
        alert('No active subscription found. Please check your account.');
        return;
      }
      throw new Error(errorData.error || 'Failed to generate cover letter');
    }

    const result = await response.json();
    coverLetterData.value = result;
    
    // Save to database instead of localStorage
    await saveCoverLetterToDatabase(jobId, result);

    // Refresh user credits after successful generation
    await fetchUserCredits();

    // Show success message with credit info
    if (result.creditsUsed && result.remainingCredits !== undefined) {
      showNotification(`Cover letter generated! Used ${result.creditsUsed} credit. ${result.remainingCredits} credits remaining.`);
    }

  } catch (error) {
    console.error(error);
    alert('An error occurred while generating the cover letter.');
  } finally {
    generatingCoverLetter.value = false;
  }
};

const regenerateCoverLetter = async () => {
  await generateCoverLetter(regeneratePrompt.value);
  showRegenerateModal.value = false;
  regeneratePrompt.value = '';
};

 const toggleEditMode = () => {
   editMode.value = !editMode.value
   if (!editMode.value) {
     // Save any inline edits to database
     saveCoverLetterToDatabase(jobId, coverLetterData.value)
       .then(() => showNotification('Changes saved!'))
       .catch(error => {
         console.error('Error saving changes:', error)
         showNotification('Error saving changes')
       })
   }
 };

const downloadCoverLetterFromServer = async () => {
  if (!coverLetterData.value) {
    alert('No cover letter data available to download.');
    return;
  }
  
  downloadingPDF.value = true;
  try {
    const resumeData = await getResumeFromDatabase(jobId);
    if (!resumeData) {
      alert('No resume data found. Please generate a resume first.');
      return;
    }
    
    const response = await fetch('/api/generate-cover-letter-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coverLetterData: coverLetterData.value,
        resumeData: resumeData,
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
    let filename = 'cover-letter.pdf';
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
    console.error('Error downloading server-side generated cover letter:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      coverLetterData: coverLetterData.value,
      template: selectedTemplate.value
    });
    alert(`Failed to download cover letter: ${error.message || 'Unknown error'}`);
  } finally {
    downloadingPDF.value = false;
  }
};

 const resetCoverLetter = () => {
   coverLetterData.value = null;
   // Note: We don't clear from database as it's part of the job record
 };

 // Edit modal functions
 const openEditModal = (section) => {
   editingSection.value = section;
   editingSectionData.value = JSON.parse(JSON.stringify(coverLetterData.value[section]));
   showEditModal.value = true;
 };

 const closeEditModal = () => {
   showEditModal.value = false;
   editingSection.value = '';
   editingSectionData.value = null;
 };

 const saveSection = async (updatedData) => {
   // Update the cover letter data
   coverLetterData.value[editingSection.value] = updatedData;
   
   // Save to database
   const updatedResult = {
     ...coverLetterData.value,
     generatedAt: new Date().toISOString()
   };
   
   try {
     await saveCoverLetterToDatabase(jobId, updatedResult);
     
     // Close modal
     closeEditModal();
     
     // Show success feedback
     showNotification('Section updated successfully!');
   } catch (error) {
     console.error('Error saving section:', error);
     showNotification('Error saving section');
   }
 };

 const showNotification = (message) => {
   // Simple notification - you could replace this with a toast library
   const notification = document.createElement('div');
   notification.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300';
   notification.textContent = message;
   document.body.appendChild(notification);
   
   setTimeout(() => {
     notification.style.opacity = '0';
     setTimeout(() => {
       if (document.body.contains(notification)) {
         document.body.removeChild(notification);
       }
     }, 300);
   }, 2000);
 };

 // Handle purchase completion from PricingModal
 const handlePurchaseComplete = async (purchase) => {
   if (purchase.type === 'payg') {
     userCredits.value += purchase.credits;
   } else if (purchase.type === 'subscription') {
     userCredits.value += purchase.credits;
   }
   showPricingModal.value = false;
   
   // Refresh credits to get the latest balance
   await fetchUserCredits();
   
   // Show success notification
   showNotification('Credits purchased successfully! You can now generate your cover letter.');
 };

const getAlignmentDescription = (score) => {
  if (score >= 90) return 'Excellent alignment! Your cover letter is highly relevant to the job requirements.';
  if (score >= 70) return 'Good alignment. Your cover letter covers the key aspects of the job description.';
  if (score >= 50) return 'Moderate alignment. Your cover letter touches on some but not all job requirements.';
  return 'Poor alignment. Your cover letter needs significant improvement to match the job description.';
};

onMounted(async () => {
  // Load job description first
  await loadJobDescription();
  
  // Load resume data for templates
  if (jobId) {
    const savedResume = await getResumeFromDatabase(jobId);
    if (savedResume) {
      resumeData.value = savedResume;
    }
  }
  
  // Check if we have cover letter data from database for this job
  const savedCoverLetter = await getCoverLetterFromDatabase(jobId);
  
  if (savedCoverLetter) {
    coverLetterData.value = savedCoverLetter;
    editedCoverLetterText.value = savedCoverLetter.coverLetterText;
  }
  
  loading.value = false;
});
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 1.5rem; /* equivalent to rounded-3xl */
  padding: 2rem; /* equivalent to p-8 */
  border-width: 1px;
  border-color: #e5e7eb; /* equivalent to border-gray-200 */
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); /* shadow-md */
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* shadow-lg */
}

/* PDF-specific styles for A4 layout */
@media print {
  body {
    background: white !important;
  }

  #cover-letter-container {
    max-width: none !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  #cover-letter-content {
    max-width: none !important;
    width: 100% !important;
  }
  
  @page {
    size: letter;
    margin: 15mm;
  }

  .card {
    background: white !important;
    border: 1px solid #e5e7eb !important;
    box-shadow: none !important;
    padding: 12pt !important;
    page-break-inside: avoid;
  }
  
  /* Better text contrast for print */
  .text-gray-800 { color: #1f2937 !important; }
  .text-gray-700 { color: #374151 !important; }
  .text-gray-600 { color: #4b5563 !important; }

  /* Ensure text doesn't get cut off */
  .whitespace-pre-line {
    white-space: pre-line !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
  }
}
</style>
