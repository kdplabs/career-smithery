<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
    <div class="max-w-7xl mx-auto p-6">
      <div v-if="isLoading" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div class="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-lg font-semibold  border border-white/20">Generating tasks...</div>
      </div>
      <!-- Enhanced Message Notification -->
      <transition name="slide-fade">
        <div v-if="message" class="fixed top-4 right-4 z-50 max-w-sm">
          <div class="bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4 flex items-center justify-between">
            <div class="flex items-center">
              <Icon :name="messageIcon" :class="messageIconClass" class="w-5 h-5 mr-3" />
              <span :class="messageTextClass" class=" text-sm">{{ message }}</span>
            </div>
            <button @click="dismissMessage" class="ml-3 text-slate-400 hover:text-slate-600 transition-colors">
              <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </transition>
      
      <div v-if="!report && isLoadingReport" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 class="text-3xl font-bold text-slate-800 mb-4 ">Loading Your Report...</h2>
          <p class="text-lg text-slate-600 mb-6 ">Fetching your personalized career report...</p>
        </div>
      </div>
      
      <div v-else-if="!report && !isLoadingReport" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-slate-800 mb-4 ">No Personalized Report Found</h2>
          <p class="text-lg text-slate-600 mb-6 ">Please generate a report from your summary page first.</p>
          <button @click="navigateTo('/summary')" class="px-6 py-3 text-base font-semibold text-slate-700 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl hover:bg-white/90 hover:shadow-2xl hover:-translate-y-1 transition-all ">
            Back to Summary
          </button>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Overall Score Card -->
        <div class="modern-card lg:col-span-2 mb-4">
          <div class="flex flex-col items-center mb-6">
            <h2 class="text-4xl font-extrabold mb-6  tracking-tight">
              <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Overall Score</span>
            </h2>
            <GaugeChart :score="report.overall_score" />
            <div class="text-xl font-semibold text-slate-700 mt-4 ">{{ report.overall_score }}/100</div>
          </div>
        </div>

        <!-- Summary Card -->
        <div class="modern-card lg:col-span-2 mb-4">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-4xl font-extrabold  tracking-tight">
              <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Summary</span>
            </h2>
          </div>
          <div class="prose max-w-none text-slate-700 " v-html="report.summary"></div>
        </div>

        <!-- SWOT Analysis Cards -->
        <div class="modern-card mb-4">
          <h3 class="text-2xl font-bold text-green-700 mb-4  flex items-center tracking-tight">
            <Icon name="i-heroicons-arrow-trending-up" class="w-7 h-7 mr-3" />
            Strengths
          </h3>
          <div class="prose text-slate-700 " v-html="report.swot_analysis?.strengths"></div>
        </div>

        <div class="modern-card mb-4">
          <h3 class="text-2xl font-bold text-red-700 mb-4  flex items-center tracking-tight">
            <Icon name="i-heroicons-exclamation-triangle" class="w-7 h-7 mr-3" />
            Weaknesses
          </h3>
          <div class="prose text-slate-700 " v-html="report.swot_analysis?.weaknesses"></div>
        </div>

        <div class="modern-card mb-4">
          <h3 class="text-2xl font-bold text-blue-700 mb-4  flex items-center tracking-tight">
            <Icon name="i-heroicons-light-bulb" class="w-7 h-7 mr-3" />
            Opportunities
          </h3>
          <div class="prose text-slate-700 " v-html="report.swot_analysis?.opportunities"></div>
        </div>

        <div class="modern-card mb-4">
          <h3 class="text-2xl font-bold text-yellow-700 mb-4  flex items-center tracking-tight">
            <Icon name="i-heroicons-shield-exclamation" class="w-7 h-7 mr-3" />
            Threats
          </h3>
          <div class="prose text-slate-700 " v-html="report.swot_analysis?.threats"></div>
        </div>

        <!-- Focus Areas Section -->
        <div class="lg:col-span-2 mt-8">
          <div class="modern-card mb-4">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-4xl font-extrabold  tracking-tight">
                <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Focus Areas</span>
              </h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FocusAreaCard
                v-for="key in focusAreaList"
                :key="key"
                :title="focusAreaTitles[key]"
                :description="report.focus_areas?.[key]?.description"
                :callToAction="report.focus_areas?.[key]?.call_to_action"
                @create-task="handleCreateTask"
              />
            </div>
          </div>
        </div>

        <!-- Kanban Board Section -->
        <div class="lg:col-span-2 mt-8">
          <div class="modern-card mb-4">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-4xl font-extrabold  tracking-tight">
                <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Your Tasks</span>
              </h2>
              <button @click="navigateTo('/tasks')" class="px-6 py-3 text-sm font-semibold text-blue-700 bg-blue-50/80 backdrop-blur-md border border-blue-200/50 rounded-2xl hover:bg-blue-100/80 hover:shadow-lg hover:-translate-y-1 transition-all  flex items-center shadow-md">
                <Icon name="i-heroicons-squares-2x2" class="w-5 h-5 mr-2" />
                Full Tasks View
              </button>
            </div>
            <KanbanBoard
              :tasks="userTasks"
              :kanbanLoading="kanbanLoading"
              :kanbanError="kanbanError"
              :rowField="rowField"
              :colField="colField"
              :focusAreaTitles="focusAreaTitles"
              @add-task="onKanbanAddTask"
              @edit-task="openEditTaskModal"
              @delete-task="deleteTask"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="lg:col-span-2 flex justify-between mt-6">
          <button @click="navigateTo('/summary')" class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all ">
            Back to Summary
          </button>
        </div>
      </div>

      <!-- Task Modal -->
      <div v-if="showTaskModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
        <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-white/20">
          <h3 class="text-2xl font-bold text-slate-800 mb-6 ">{{ taskModalMode === 'edit' ? 'Edit Task' : 'Add Task' }}</h3>
          <form @submit.prevent="saveTask">
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-2 ">Title</label>
              <input v-model="taskForm.title" class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white/80 backdrop-blur-sm" required maxlength="100" />
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-2 ">Description</label>
              <textarea v-model="taskForm.description" class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white/80 backdrop-blur-sm" rows="3" maxlength="300"></textarea>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-2 ">Due Date</label>
              <input v-model="taskForm.due_date" type="date" class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white/80 backdrop-blur-sm" />
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-2 ">Status</label>
              <select v-model="taskForm.status" class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white/80 backdrop-blur-sm">
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div v-if="taskModalError" class="text-red-600 text-sm mb-4  bg-red-50/80 rounded-lg p-3">{{ taskModalError }}</div>
            <div class="flex gap-4 mt-8">
              <button type="submit" :disabled="taskModalLoading" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-60  transition-all shadow-lg hover:shadow-xl">
                {{ taskModalMode === 'edit' ? 'Save Changes' : 'Add Task' }}
              </button>
              <button type="button" @click="showTaskModal = false" class="px-6 py-3 bg-white/80 backdrop-blur-md text-slate-700 rounded-xl hover:bg-white/90  transition-all border border-slate-200 shadow-md hover:shadow-lg">
                Cancel
              </button>
              <button v-if="taskModalMode === 'edit'" type="button" @click="deleteTask(taskForm)" :disabled="taskModalLoading" class="ml-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700  transition-all shadow-lg hover:shadow-xl">
                Delete
              </button>
            </div>
          </form>
          <div v-if="taskModalLoading" class="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>

      <!-- Create Tasks Modal -->
      <div v-if="showCreateTasksModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
        <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-white/20">
          <h3 class="text-2xl font-bold text-slate-800 mb-6 ">Create Tasks</h3>
          <form @submit.prevent="submitCreateTasks">
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-2 ">Focus Area</label>
              <input v-model="createTasksForm.area" class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50/80 backdrop-blur-sm " readonly />
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-2 ">Starting Quarter</label>
              <input v-model="createTasksForm.quarter" type="text" class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white/80 backdrop-blur-sm" required maxlength="10" placeholder="e.g., 2024-Q4" />
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-2 ">Custom Instructions (Optional)</label>
              <textarea v-model="createTasksForm.customPrompt" class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  bg-white/80 backdrop-blur-sm" rows="4" maxlength="500" placeholder="Add any specific focus or requirements for the generated tasks..."></textarea>
              <p class="text-xs text-slate-500 mt-2">This will be added as 'User Input' to help customize the task generation to your specific needs.</p>
            </div>
            <div v-if="createTasksModalError" class="text-red-600 text-sm mb-4  bg-red-50/80 rounded-lg p-3">{{ createTasksModalError }}</div>
            <div class="flex gap-4 mt-8">
              <button type="submit" :disabled="createTasksModalLoading" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-60  transition-all shadow-lg hover:shadow-xl">
                Create Tasks
              </button>
              <button type="button" @click="showCreateTasksModal = false" class="px-6 py-3 bg-white/80 backdrop-blur-md text-slate-700 rounded-xl hover:bg-white/90  transition-all border border-slate-200 shadow-md hover:shadow-lg">
                Cancel
              </button>
            </div>
          </form>
          <div v-if="createTasksModalLoading" class="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { navigateTo } from 'nuxt/app'
import GaugeChart from '~/components/GaugeChart.vue'
import FocusAreaCard from '~/components/FocusAreaCard.vue'
import { useAuth } from '~/composables/useAuth'
import { useSupabaseClient } from '#imports'
import KanbanBoard from '~/components/KanbanBoard.vue'

const report = ref(null)
const isLoadingReport = ref(true)
const focusAreaList = ['leadership', 'domain_knowledge', 'technical_skills', 'networking_marketing']
const focusAreaTitles = {
  leadership: 'Leadership',
  domain_knowledge: 'Domain Knowledge',
  technical_skills: 'Technical Skills',
  networking_marketing: 'Networking / Marketing'
}

const { user } = useAuth()
const supabase = useSupabaseClient()
const isLoading = ref(false)
const message = ref('')
const messageType = ref('info') // 'success', 'error', 'info'
const messageTimeout = ref(null)
const userTasks = ref([])
const kanbanLoading = ref(false)
const kanbanError = ref('')
const quarters = ref([])
const showTaskModal = ref(false)
const showCreateTasksModal = ref(false)
const taskModalMode = ref('create') // 'create' or 'edit'
const taskModalLoading = ref(false)
const taskModalError = ref('')
const createTasksModalLoading = ref(false)
const createTasksModalError = ref('')
const createTasksForm = ref({
  area: '',
  tasks: [],
  quarter: '2024-Q4',
  customPrompt: ''
})
const taskForm = ref({
  id: null,
  title: '',
  description: '',
  due_date: '',
  status: 'todo',
  category: '',
  quarter: ''
})
const rowField = ref('category')
const colField = ref('quarter')

const rowFieldLabel = computed(() => {
  if (rowField.value === 'category') return 'Category'
  if (rowField.value === 'quarter') return 'Quarter'
  if (rowField.value === 'status') return 'Status'
  return rowField.value
})

const colFieldLabel = computed(() => {
  if (colField.value === 'category') return 'Category'
  if (colField.value === 'quarter') return 'Quarter'
  if (colField.value === 'status') return 'Status'
  return colField.value
})

const rowValues = computed(() => {
  // Get unique values for the selected row field
  return Array.from(new Set(userTasks.value.map(t => t[rowField.value]))).sort()
})
const colValues = computed(() => {
  // Get unique values for the selected column field
  return Array.from(new Set(userTasks.value.map(t => t[colField.value]))).sort()
})

// Message styling computed properties
const messageIcon = computed(() => {
  switch (messageType.value) {
    case 'success': return 'i-heroicons-check-circle'
    case 'error': return 'i-heroicons-exclamation-circle'
    default: return 'i-heroicons-information-circle'
  }
})

const messageIconClass = computed(() => {
  switch (messageType.value) {
    case 'success': return 'text-green-600'
    case 'error': return 'text-red-600'
    default: return 'text-blue-600'
  }
})

const messageTextClass = computed(() => {
  switch (messageType.value) {
    case 'success': return 'text-green-800'
    case 'error': return 'text-red-800'
    default: return 'text-blue-800'
  }
})

function getRowLabel(row) {
  if (rowField.value === 'category') return focusAreaTitles[row] || row
  return row
}

// Message handling functions
function showMessage(text, type = 'info', duration = 5000) {
  // Clear any existing timeout
  if (messageTimeout.value) {
    clearTimeout(messageTimeout.value)
  }
  
  message.value = text
  messageType.value = type
  
  // Auto-dismiss after duration
  messageTimeout.value = setTimeout(() => {
    dismissMessage()
  }, duration)
}

function dismissMessage() {
  message.value = ''
  if (messageTimeout.value) {
    clearTimeout(messageTimeout.value)
    messageTimeout.value = null
  }
}

function onKanbanAddTask({ row, col, rowField, colField }) {
  // Set up the form for the selected row/col
  const form = {
    id: null,
    title: '',
    description: '',
    due_date: '',
    status: 'todo',
    category: rowField === 'category' ? row : (colField === 'category' ? col : ''),
    quarter: rowField === 'quarter' ? row : (colField === 'quarter' ? col : ''),
  }
  taskModalMode.value = 'create'
  taskForm.value = form
  taskModalError.value = ''
  showTaskModal.value = true
}

async function fetchUserTasks() {
  if (!user.value) return
  kanbanLoading.value = true
  kanbanError.value = ''
  try {
    const { data, error } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('user_id', user.value.id)
      .order('due_date', { ascending: true })
    if (error) throw error
    userTasks.value = data || []
    // Get all unique quarters, sorted
    const allQuarters = Array.from(new Set(userTasks.value.map(t => t.quarter))).sort()
    quarters.value = allQuarters
  } catch (err) {
    kanbanError.value = err.message || 'Failed to load tasks.'
  } finally {
    kanbanLoading.value = false
  }
}

function handleCreateTask({ area, tasks }) {
  if (!user.value) {
    showMessage('You must be logged in to create tasks.', 'error')
    return
  }
  if (!tasks || !tasks.length) {
    showMessage('No tasks found for this area.', 'info')
    return
  }
  
  // Set up the create tasks form and show modal
  createTasksForm.value = {
    area,
    tasks,
    quarter: '2024-Q4',
    customPrompt: ''
  }
  createTasksModalError.value = ''
  showCreateTasksModal.value = true
}

async function submitCreateTasks() {
  if (!createTasksForm.value.quarter.trim()) {
    createTasksModalError.value = 'Quarter is required.'
    return
  }
  
  createTasksModalLoading.value = true
  createTasksModalError.value = ''
  
  try {
    // Prepare the request body with custom prompt if provided
    const requestBody = {
      user_id: user.value.id,
      category: Object.keys(focusAreaTitles).find(key => focusAreaTitles[key] === createTasksForm.value.area) || createTasksForm.value.area,
      quarter: createTasksForm.value.quarter,
      tasks: createTasksForm.value.tasks
    }
    
    // Add custom prompt if provided
    if (createTasksForm.value.customPrompt.trim()) {
      requestBody.customPrompt = createTasksForm.value.customPrompt.trim()
    }
    
    const res = await fetch('/api/generate-tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
    
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(errText)
    }
    
    const data = await res.json()
    showMessage(`Successfully created ${data.tasks.length} tasks for ${createTasksForm.value.area}.`, 'success')
    showCreateTasksModal.value = false
    await fetchUserTasks()
  } catch (err) {
    createTasksModalError.value = 'Error creating tasks: ' + (err.message || err)
    showMessage('Error creating tasks: ' + (err.message || err), 'error')
  } finally {
    createTasksModalLoading.value = false
  }
}

function openCreateTaskModal(category, quarter) {
  taskModalMode.value = 'create'
  taskForm.value = {
    id: null,
    title: '',
    description: '',
    due_date: '',
    status: 'todo',
    category,
    quarter
  }
  taskModalError.value = ''
  showTaskModal.value = true
}

function openEditTaskModal(task) {
  taskModalMode.value = 'edit'
  taskForm.value = { ...task }
  taskModalError.value = ''
  showTaskModal.value = true
}

async function saveTask() {
  taskModalLoading.value = true
  taskModalError.value = ''
  try {
    if (!taskForm.value.title.trim()) throw new Error('Title is required')
    if (!taskForm.value.category || !taskForm.value.quarter) throw new Error('Category and quarter are required')
    if (taskModalMode.value === 'edit') {
      // Update
      const { error } = await supabase
        .from('user_tasks')
        .update({
          title: taskForm.value.title,
          description: taskForm.value.description,
          due_date: taskForm.value.due_date,
          status: taskForm.value.status,
          quarter: taskForm.value.quarter,
          updated_at: new Date().toISOString()
        })
        .eq('id', taskForm.value.id)
      if (error) throw error
    } else {
      // Create
      const { error } = await supabase
        .from('user_tasks')
        .insert([
          {
            user_id: user.value.id,
            category: taskForm.value.category,
            quarter: taskForm.value.quarter,
            title: taskForm.value.title,
            description: taskForm.value.description,
            status: taskForm.value.status,
            due_date: taskForm.value.due_date,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
      if (error) throw error
    }
    showTaskModal.value = false
    await fetchUserTasks()
  } catch (err) {
    taskModalError.value = err.message || 'Failed to save task.'
  } finally {
    taskModalLoading.value = false
  }
}

async function deleteTask(task) {
  if (!confirm('Delete this task?')) return
  taskModalLoading.value = true
  try {
    const { error } = await supabase
      .from('user_tasks')
      .delete()
      .eq('id', task.id)
    if (error) throw error
    showTaskModal.value = false
    await fetchUserTasks()
  } catch (err) {
    taskModalError.value = err.message || 'Failed to delete task.'
  } finally {
    taskModalLoading.value = false
  }
}

// Utility: Convert date string (YYYY-MM-DD) to quarter string (e.g., 2026-Q4)
function getQuarterFromDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d)) return ''
  const year = d.getFullYear()
  const month = d.getMonth() // 0-based
  const quarter = Math.floor(month / 3) + 1
  return `${year}-Q${quarter}`
}

// Watch for due_date changes in the task modal and update quarter
watch(
  () => taskForm.value.due_date,
  (newDate) => {
    if (newDate) {
      taskForm.value.quarter = getQuarterFromDate(newDate)
    }
  }
)

onMounted(async () => {
  isLoadingReport.value = true
  
  // First, try to fetch the personalized report from the database
  if (user.value) {
    try {
      const { data: dbPlan, error } = await supabase
        .from('user_plans')
        .select('personalized_report')
        .eq('user_id', user.value.id)
        .single()

      if (!error && dbPlan && dbPlan.personalized_report) {
        console.log('Found personalized report in database:', dbPlan.personalized_report)
        report.value = dbPlan.personalized_report
      } else if (error && error.code !== 'PGRST116') {
        // Log any error that's not "no rows found"
        console.error('Error fetching personalized report from database:', error)
        // Fall back to localStorage
        try {
          const data = localStorage.getItem('personalizedReport')
          if (data) {
            report.value = JSON.parse(data)
          }
        } catch (e) {
          console.error('Error parsing localStorage data:', e)
          report.value = null
        }
      } else {
        // No data in database, try localStorage
        try {
          const data = localStorage.getItem('personalizedReport')
          if (data) {
            report.value = JSON.parse(data)
          }
        } catch (e) {
          console.error('Error parsing localStorage data:', e)
          report.value = null
        }
      }
    } catch (err) {
      console.error('Error in database operation:', err)
      // Fall back to localStorage
      try {
        const data = localStorage.getItem('personalizedReport')
        if (data) {
          report.value = JSON.parse(data)
        }
      } catch (e) {
        console.error('Error parsing localStorage data:', e)
        report.value = null
      }
    }
  } else {
    // User not logged in, try localStorage only
    try {
      const data = localStorage.getItem('personalizedReport')
      if (data) {
        report.value = JSON.parse(data)
      }
    } catch (e) {
      console.error('Error parsing localStorage data:', e)
      report.value = null
    }
  }
  
  await fetchUserTasks()
  isLoadingReport.value = false
})
</script>

<style scoped>
.prose {
  color: #374151;
}

.prose ul {
  list-style-type: disc;
  margin-left: 1.5em;
  margin-bottom: 1em;
}

.prose li {
  margin-bottom: 0.5em;
}

/* Modern card styling matching index page */
.modern-card {
  @apply bg-white/80 rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90 cursor-pointer;
  backdrop-filter: blur(6px);
}

/* Fade transition for smooth appearance */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide-fade transition for notifications */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style> 