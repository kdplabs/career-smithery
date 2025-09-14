<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
        <p class="text-gray-600">Track your job applications and manage your career opportunities</p>
      </div>

             <!-- Loading State -->
       <div v-if="loading" class="flex justify-center items-center py-12">
         <div class="flex items-center gap-3">
           <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
           <span class="text-slate-600">Loading jobs...</span>
         </div>
       </div>

               <!-- Not Authenticated State -->
        <div v-else-if="!user" class="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Icon name="i-heroicons-lock-closed" class="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 class="text-lg font-semibold mb-2">Authentication Required</h3>
          <p class="text-gray-600 mb-6">Please log in to view and manage your job applications</p>
          <button @click="handleLoginClick" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Login / Register
          </button>
        </div>

             <!-- Success Message -->
       <div v-if="successMessage" class="text-green-600 text-center py-4 bg-green-50 border border-green-200 rounded-lg mb-6">
         <Icon name="i-heroicons-check-circle" class="w-6 h-6 mx-auto mb-2" />
         {{ successMessage }}
       </div>

       <!-- Error State -->
       <div v-else-if="error" class="text-red-600 text-center py-8 bg-red-50 border border-red-200 rounded-lg">
         <Icon name="i-heroicons-exclamation-circle" class="w-6 h-6 mx-auto mb-2" />
         {{ error }}
       </div>

      <!-- Empty State -->
      <div v-else-if="jobs.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
        <Icon name="i-heroicons-briefcase" class="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 class="text-lg font-semibold mb-2">No jobs found</h3>
        <p class="text-gray-600 mb-6">Start tracking your job applications to stay organized</p>
                 <div class="flex gap-2">
                   <NuxtLink to="/resume-wizard" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                     <Icon name="i-heroicons-plus" class="w-4 h-4 mr-2 inline" />
                     New Job
                   </NuxtLink>
                   <button @click="showDefaultResumeModal = true" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                     <Icon name="i-heroicons-document-text" class="w-4 h-4 mr-2 inline" />
                     Default Resume
                   </button>
                 </div>
      </div>

      <!-- Jobs List -->
      <div v-else>
        <!-- Controls -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <!-- Search -->
            <div class="relative">
              <Icon name="i-heroicons-magnifying-glass" class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search jobs..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Filter by Status -->
            <select v-model="statusFilter" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Status</option>
              <option value="saved">Saved</option>
              <option value="resume_created">Resume Created</option>
              <option value="cover_letter_created">Cover Letter Created</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>

            <!-- Filter by Priority -->
            <select v-model="priorityFilter" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <!-- Add Job Button -->
                   <div class="flex gap-2">
                     <NuxtLink to="/resume-wizard" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                       <Icon name="i-heroicons-plus" class="w-4 h-4" />
                       New Job
                     </NuxtLink>
                     <button @click="showDefaultResumeModal = true" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                       <Icon name="i-heroicons-document-text" class="w-4 h-4" />
                       Default Resume
                     </button>
                   </div>
        </div>

        <!-- Jobs Table -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <!-- Table Header -->
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sortBy('job_title')">
                  <div class="flex items-center gap-2">
                    Job Title
                    <Icon 
                      name="i-heroicons-chevron-up-down" 
                      class="w-4 h-4"
                      :class="sortField === 'job_title' ? 'text-blue-600' : 'text-gray-400'"
                    />
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sortBy('company_name')">
                  <div class="flex items-center gap-2">
                    Company
                    <Icon 
                      name="i-heroicons-chevron-up-down" 
                      class="w-4 h-4"
                      :class="sortField === 'company_name' ? 'text-blue-600' : 'text-gray-400'"
                    />
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sortBy('status')">
                  <div class="flex items-center gap-2">
                    Status
                    <Icon 
                      name="i-heroicons-chevron-up-down" 
                      class="w-4 h-4"
                      :class="sortField === 'status' ? 'text-blue-600' : 'text-gray-400'"
                    />
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sortBy('priority')">
                  <div class="flex items-center gap-2">
                    Priority
                    <Icon 
                      name="i-heroicons-chevron-up-down" 
                      class="w-4 h-4"
                      :class="sortField === 'priority' ? 'text-blue-600' : 'text-gray-400'"
                    />
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sortBy('created_at')">
                  <div class="flex items-center gap-2">
                    Date Added
                    <Icon 
                      name="i-heroicons-chevron-up-down" 
                      class="w-4 h-4"
                      :class="sortField === 'created_at' ? 'text-blue-600' : 'text-gray-400'"
                    />
                  </div>
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="job in filteredAndSortedJobs" 
                :key="job.id" 
                class="hover:bg-gray-50 transition-colors cursor-pointer"
                @click="viewJob(job)"
              >
                <!-- Job Title & Location -->
                <td class="px-6 py-4">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ job.job_title }}</div>
                    <div v-if="job.location" class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Icon name="i-heroicons-map-pin" class="w-4 h-4" />
                      {{ job.location }}
                    </div>
                  </div>
                </td>

                <!-- Company -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ job.company_name }}</div>
                  <div v-if="job.salary_range" class="text-sm text-gray-500">{{ job.salary_range }}</div>
                </td>

                <!-- Status -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusBadgeClass(job.status)">
                    <div class="w-2 h-2 rounded-full mr-1.5" :class="getStatusDotClass(job.status)"></div>
                    {{ getStatusLabel(job.status) }}
                  </span>
                </td>

                <!-- Priority -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getPriorityBadgeClass(job.priority)">
                    {{ getPriorityLabel(job.priority) }}
                  </span>
                </td>

                <!-- Date Added -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(job.created_at) }}
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" @click.stop>
                  <div class="flex items-center justify-end gap-2">
                    <button v-if="job.resume_data" @click="viewResume(job)" class="text-green-600 hover:text-green-800 transition-colors" title="View resume">
                      <Icon name="i-heroicons-document-text" class="w-4 h-4" />
                    </button>
                    <button v-if="job.cover_letter_data" @click="viewCoverLetter(job)" class="text-purple-600 hover:text-purple-800 transition-colors" title="View cover letter">
                      <Icon name="i-heroicons-envelope" class="w-4 h-4" />
                    </button>
                    <button @click="viewJob(job)" class="text-blue-600 hover:text-blue-800 transition-colors" title="View job">
                      <Icon name="i-heroicons-eye" class="w-4 h-4" />
                    </button>
                    <button @click="editJob(job)" class="text-gray-600 hover:text-gray-800 transition-colors" title="Edit job">
                      <Icon name="i-heroicons-pencil" class="w-4 h-4" />
                    </button>
                    <button @click="deleteJob(job)" class="text-red-600 hover:text-red-800 transition-colors" title="Delete job">
                      <Icon name="i-heroicons-trash" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Footer -->
        <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            Showing {{ filteredAndSortedJobs.length }} of {{ jobs.length }} jobs
          </div>
          <div class="flex items-center gap-4">
            <span>{{ getJobsSummary() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Job Modal -->
    <div v-if="showAddJobModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Add New Job</h3>
        <form @submit.prevent="addJob">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
              <input v-model="newJob.job_title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company *</label>
              <input v-model="newJob.company_name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input v-model="newJob.location" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Job URL</label>
              <input v-model="newJob.job_url" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
              <input v-model="newJob.salary_range" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select v-model="newJob.priority" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
              <textarea v-model="newJob.job_description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button type="button" @click="showAddJobModal = false" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Login Modal -->
    <RegisterPrompt
      v-if="showLoginModal"
      message="Please log in to view and manage your job applications."
      @close="showLoginModal = false"
    />

    <!-- Default Resume Modal -->
    <div v-if="showDefaultResumeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold">Set Default Resume</h3>
          <button @click="showDefaultResumeModal = false" class="text-gray-400 hover:text-gray-600">
            <Icon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>
        
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Current Resume Text</label>
            <textarea
              v-model="defaultResumeData.currentResume"
              placeholder="Paste your current resume text here..."
              rows="8"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            <p class="mt-1 text-sm text-gray-500">This will be pre-filled in the resume wizard for new jobs.</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Metrics & Achievements</label>
            <textarea
              v-model="defaultResumeData.metrics"
              placeholder="Add your key metrics, achievements, and quantifiable results..."
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            <p class="mt-1 text-sm text-gray-500">Include specific numbers, percentages, and measurable achievements.</p>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button @click="showDefaultResumeModal = false" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            Cancel
          </button>
          <button @click="saveDefaultResume" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Save Default Resume
          </button>
        </div>
      </div>
    </div>



    <!-- Resume Display Modal -->
    <div v-if="showResumeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-white">Generated Resume</h2>
            <div class="flex items-center gap-3">
              <button 
                @click="downloadResumeFromModal"
                :disabled="downloadLoading"
                class="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Icon name="i-heroicons-arrow-down-tray" class="w-4 h-4" />
                <span>{{ downloadLoading ? 'Generating...' : 'Download PDF' }}</span>
              </button>
              <button @click="showResumeModal = false" class="text-white hover:text-gray-200">
                <Icon name="i-heroicons-x-mark" class="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="overflow-y-auto max-h-[calc(90vh-80px)]">
          <ResumeDisplay :resume="selectedResume" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import RegisterPrompt from '~/components/RegisterPrompt.vue'
import ResumeDisplay from '~/components/ResumeDisplay.vue'

// Prevent SSR for this page since it requires authentication
definePageMeta({
  ssr: false
})

const supabase = useSupabaseClient()
const { user } = useAuth()
const route = useRoute()
const router = useRouter()

// State
const jobs = ref([])
const loading = ref(true)
const error = ref('')
const successMessage = ref('')
const showAddJobModal = ref(false)
const showLoginModal = ref(false)
const showResumeModal = ref(false)
const showDefaultResumeModal = ref(false)
const selectedResume = ref({})
const loadingTimeout = ref(null)
const downloadLoading = ref(false)

// Search and filter state
const searchQuery = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')
const sortField = ref('created_at')
const sortDirection = ref('desc')

// New job form
const newJob = ref({
  job_title: '',
  company_name: '',
  location: '',
  job_url: '',
  salary_range: '',
  priority: 'medium',
  job_description: ''
})

// Default resume data
const defaultResumeData = ref({
  currentResume: '',
  metrics: ''
})

// Computed properties
const filteredAndSortedJobs = computed(() => {
  let filtered = jobs.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(job => 
      job.job_title.toLowerCase().includes(query) ||
      job.company_name.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(job => job.status === statusFilter.value)
  }

  // Apply priority filter
  if (priorityFilter.value) {
    filtered = filtered.filter(job => job.priority === priorityFilter.value)
  }

  // Apply sorting
  return filtered.sort((a, b) => {
    let valueA = a[sortField.value]
    let valueB = b[sortField.value]

    // Handle null/undefined values
    if (valueA === null || valueA === undefined) valueA = ''
    if (valueB === null || valueB === undefined) valueB = ''

    // Handle dates
    if (sortField.value === 'created_at') {
      valueA = new Date(valueA)
      valueB = new Date(valueB)
    }

    // Sort comparison
    if (valueA < valueB) return sortDirection.value === 'asc' ? -1 : 1
    if (valueA > valueB) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
})

// Functions
function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

function getStatusLabel(status) {
  const statusLabels = {
    saved: 'Saved',
    resume_created: 'Resume Created',
    cover_letter_created: 'Cover Letter Created',
    applied: 'Applied',
    interviewing: 'Interviewing',
    offered: 'Offered',
    rejected: 'Rejected',
    withdrawn: 'Withdrawn'
  }
  return statusLabels[status] || status
}

function getStatusBadgeClass(status) {
  const statusClasses = {
    saved: 'bg-gray-100 text-gray-800',
    resume_created: 'bg-blue-100 text-blue-800',
    cover_letter_created: 'bg-purple-100 text-purple-800',
    applied: 'bg-yellow-100 text-yellow-800',
    interviewing: 'bg-orange-100 text-orange-800',
    offered: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    withdrawn: 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

function getStatusDotClass(status) {
  const statusColors = {
    saved: 'bg-gray-500',
    resume_created: 'bg-blue-500',
    cover_letter_created: 'bg-purple-500',
    applied: 'bg-yellow-500',
    interviewing: 'bg-orange-500',
    offered: 'bg-green-500',
    rejected: 'bg-red-500',
    withdrawn: 'bg-gray-500'
  }
  return statusColors[status] || 'bg-gray-500'
}

function getPriorityLabel(priority) {
  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High'
  }
  return priorityLabels[priority] || priority
}

function getPriorityBadgeClass(priority) {
  const priorityClasses = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-red-100 text-red-800'
  }
  return priorityClasses[priority] || 'bg-gray-100 text-gray-800'
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short', 
    day: 'numeric' 
  })
}

function getJobsSummary() {
  const total = jobs.value.length
  const applied = jobs.value.filter(j => j.status === 'applied').length
  const interviewing = jobs.value.filter(j => j.status === 'interviewing').length
  const offered = jobs.value.filter(j => j.status === 'offered').length
  
  return `${applied} applied • ${interviewing} interviewing • ${offered} offered`
}

async function fetchJobs() {
  if (!user.value) {
    loading.value = false
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const { data, error: fetchError } = await supabase
      .from('user_jobs')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
    
    if (fetchError) {
      console.error('Supabase error:', fetchError)
      throw fetchError
    }
    
    jobs.value = data || []
  } catch (err) {
    console.error('Error fetching jobs:', err)
    error.value = 'Failed to load jobs: ' + err.message
  } finally {
    loading.value = false
    if (loadingTimeout.value) {
      clearTimeout(loadingTimeout.value)
      loadingTimeout.value = null
    }
  }
}

async function addJob() {
  if (!user.value) return
  
  try {
    const { data, error: insertError } = await supabase
      .from('user_jobs')
      .insert({
        user_id: user.value.id,
        ...newJob.value
      })
      .select()
      .single()
    
    if (insertError) throw insertError
    
    jobs.value.unshift(data)
    showAddJobModal.value = false
    
    // Reset form
    newJob.value = {
      job_title: '',
      company_name: '',
      location: '',
      job_url: '',
      salary_range: '',
      priority: 'medium',
      job_description: ''
    }
  } catch (err) {
    console.error('Error adding job:', err)
    error.value = 'Failed to add job'
  }
}

function viewJob(job) {
  // Navigate to resume summary page
  router.push(`/resume-summary?jobId=${job.id}`)
}

function viewResume(job) {
  if (job.resume_data) {
    selectedResume.value = job.resume_data
    showResumeModal.value = true
  }
}

function viewCoverLetter(job) {
  router.push(`/cover-letter?jobId=${job.id}`)
}

async function downloadResumeFromModal() {
  downloadLoading.value = true
  try {
    // Use structured PDF generation for ATS compatibility
    const { generateStructuredPDF } = await import('~/utils/pdfGenerator.js')
    await generateStructuredPDF(selectedResume.value, 'classic')
  } catch (error) {
    console.error('Error downloading resume:', error)
    alert('Failed to download resume. Please try again.')
  } finally {
    downloadLoading.value = false
  }
}

function editJob(job) {
  // TODO: Open edit modal or navigate to edit page
  console.log('Edit job:', job)
}

async function deleteJob(job) {
  if (!confirm('Are you sure you want to delete this job?')) return
  
  try {
    const { error: deleteError } = await supabase
      .from('user_jobs')
      .delete()
      .eq('id', job.id)
    
    if (deleteError) throw deleteError
    
    jobs.value = jobs.value.filter(j => j.id !== job.id)
  } catch (err) {
    console.error('Error deleting job:', err)
    error.value = 'Failed to delete job'
  }
}



async function addJobFromResume(jobData) {
  if (!user.value) return
  
  try {
    const { data, error: insertError } = await supabase
      .from('user_jobs')
      .insert({
        user_id: user.value.id,
        ...jobData
      })
      .select()
      .single()
    
    if (insertError) throw insertError
    
    jobs.value.unshift(data)
  } catch (err) {
    console.error('Error adding job from resume:', err)
    error.value = 'Failed to add job from resume'
  }
}

function saveDefaultResume() {
  try {
    localStorage.setItem('defaultResumeData', JSON.stringify(defaultResumeData.value))
    showDefaultResumeModal.value = false
    // Show success message
    successMessage.value = 'Default resume saved successfully!'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    console.error('Error saving default resume:', err)
    error.value = 'Failed to save default resume'
  }
}

function loadDefaultResumeData() {
  try {
    const saved = localStorage.getItem('defaultResumeData')
    if (saved) {
      defaultResumeData.value = JSON.parse(saved)
    }
  } catch (err) {
    console.error('Error loading default resume data:', err)
  }
}

function handleLoginClick() {
  // Store the current page as the intended destination
  const currentPath = window.location.pathname + window.location.search
  localStorage.setItem('intendedDestination', currentPath)
  
  // Show login modal
  showLoginModal.value = true
}

// Load jobs on mount
onMounted(() => {
  // Load default resume data
  loadDefaultResumeData()
  
  // Set a timeout to prevent infinite loading
  loadingTimeout.value = setTimeout(() => {
    loading.value = false
    error.value = 'Loading timeout - please refresh the page'
  }, 10000) // 10 second timeout
  
  // Add a small delay to ensure auth is ready
  setTimeout(() => {
    if (user.value) {
      fetchJobs()
    } else {
      loading.value = false
    }
  }, 100)
  
  // Check for success message from resume wizard
  if (route.query.success === 'true' && route.query.message) {
    successMessage.value = route.query.message
    // Clear the query params
    router.replace({ path: '/jobs', query: {} })
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }
})

// Watch for user changes
watch(user, (newUser) => {
  if (newUser && jobs.value.length === 0 && !loading.value) {
    fetchJobs()
  } else if (!newUser) {
    loading.value = false
  }
}, { immediate: true })

// Cleanup on unmount
onBeforeUnmount(() => {
  if (loadingTimeout.value) {
    clearTimeout(loadingTimeout.value)
  }
})
</script>
