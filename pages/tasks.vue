<template>
  <div class="max-w-7xl mx-auto p-6">
    <div v-if="isLoading" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div class="bg-white p-6 rounded-xl shadow-xl text-lg font-semibold ">Generating tasks...</div>
    </div>
    <!-- Enhanced Message Notification -->
    <transition name="slide-fade">
      <div v-if="message" class="fixed top-4 right-4 z-50 max-w-sm">
        <div class="bg-white border border-slate-200 rounded-lg shadow-lg p-4 flex items-center justify-between">
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
    
    <!-- Header -->
    <!-- <div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-3xl font-bold text-slate-800 ">Task Management</h1>
          <p class="text-slate-600 ">Organize and track your career development tasks</p>
        </div>
        <button @click="navigateTo('/personalized-report')" class="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all  flex items-center">
          <Icon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
          Back to Report
        </button>
      </div>
    </div> -->

    <!-- Tasks Section -->
    <div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100">
      <!-- Header with Controls -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-800">Your Tasks</h2>
        <div class="flex items-center gap-4">
          <!-- View Toggle -->
          <div class="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              @click="currentView = 'kanban'"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-all',
                currentView === 'kanban' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              ]"
            >
              <Icon name="i-heroicons-view-columns" class="w-4 h-4 mr-2 inline" />
              Kanban
            </button>
            <button
              @click="currentView = 'table'"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-all',
                currentView === 'table' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              ]"
            >
              <Icon name="i-heroicons-table-cells" class="w-4 h-4 mr-2 inline" />
              Table
            </button>
          </div>
          
          <!-- Row/Column Selectors -->
          <div v-if="currentView === 'kanban'" class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-slate-700">Rows:</label>
              <select v-model="rowField" class="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="category">Category</option>
                <option value="quarter">Quarter</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-slate-700">Columns:</label>
              <select v-model="colField" class="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="quarter">Quarter</option>
                <option value="category">Category</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanban View -->
      <div v-if="currentView === 'kanban'">
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
          @update-task="updateTaskPosition"
        />
      </div>

      <!-- Table View -->
      <div v-else-if="currentView === 'table'">
        <TaskTable
          :tasks="userTasks"
          :loading="kanbanLoading"
          :error="kanbanError"
          :focusAreaTitles="focusAreaTitles"
          @add-task="openAddTaskModal"
          @edit-task="openEditTaskModal"
          @delete-task="deleteTask"
          @update-task="updateTaskPosition"
        />
      </div>
    </div>

    <!-- Task Modal -->
    <div v-if="showTaskModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative border border-slate-100 my-8 max-h-[calc(100vh-4rem)]">
        <div class="flex flex-col h-full max-h-[calc(100vh-4rem)]">
          <!-- Header - Fixed -->
          <div class="flex-shrink-0 p-6 border-b border-slate-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <h3 class="text-xl font-bold text-slate-800">{{ taskModalMode === 'edit' ? 'Edit Task' : 'Add Task' }}</h3>
                <!-- Delete button close to heading for edit mode -->
                <button 
                  v-if="taskModalMode === 'edit'" 
                  type="button" 
                  @click="deleteTask(taskForm)" 
                  :disabled="taskModalLoading" 
                  class="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2 disabled:opacity-60"
                >
                  <Icon name="i-heroicons-trash" class="w-4 h-4" />
                  Delete
                </button>
              </div>
              <button @click="showTaskModal = false" class="text-slate-400 hover:text-slate-600 transition-colors">
                <Icon name="i-heroicons-x-mark" class="w-6 h-6" />
              </button>
            </div>
          </div>
        
          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <form id="task-form" @submit.prevent="saveTask" class="space-y-6">
          <!-- Task Title (Full Width) -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              <Icon name="i-heroicons-document-text" class="w-4 h-4 inline mr-1" />
              Task Title
            </label>
            <input 
              v-model="taskForm.title" 
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg" 
              placeholder="Enter task title..."
              required 
              maxlength="100" 
            />
          </div>

          <!-- Description (Full Width) -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              <Icon name="i-heroicons-bars-3-bottom-left" class="w-4 h-4 inline mr-1" />
              Description
            </label>
            <textarea 
              v-model="taskForm.description" 
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              rows="3" 
              placeholder="Describe the task details..."
              maxlength="300"
            ></textarea>
          </div>

          <!-- Category and Quarter (Two Columns) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                <Icon name="i-heroicons-folder" class="w-4 h-4 inline mr-1" />
                Category
              </label>
              <select v-model="taskForm.category" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select Category</option>
                <option value="leadership">Leadership</option>
                <option value="domain_knowledge">Domain Knowledge</option>
                <option value="technical_skills">Technical Skills</option>
                <option value="networking_marketing">Networking / Marketing</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                <Icon name="i-heroicons-calendar" class="w-4 h-4 inline mr-1" />
                Quarter
              </label>
              <input 
                v-model="taskForm.quarter" 
                type="text" 
                class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="e.g., 2024-Q4" 
              />
            </div>
          </div>

          <!-- Due Date and Status (Two Columns) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                <Icon name="i-heroicons-calendar-days" class="w-4 h-4 inline mr-1" />
                Due Date
              </label>
              <input 
                v-model="taskForm.due_date" 
                type="date" 
                class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                <Icon name="i-heroicons-flag" class="w-4 h-4 inline mr-1" />
                Status
              </label>
              <select v-model="taskForm.status" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

              <!-- Error Message -->
              <div v-if="taskModalError" class="bg-red-50 border border-red-200 rounded-lg p-3">
                <div class="flex items-center">
                  <Icon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-600 mr-2" />
                  <span class="text-red-800 text-sm">{{ taskModalError }}</span>
                </div>
              </div>
            </form>
          </div>

          <!-- Footer - Fixed -->
          <div class="flex-shrink-0 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <div class="flex gap-3">
              <button 
                type="submit" 
                form="task-form"
                :disabled="taskModalLoading" 
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all flex items-center gap-2"
              >
                <Icon name="i-heroicons-check" class="w-4 h-4" />
                {{ taskModalMode === 'edit' ? 'Save Changes' : 'Create Task' }}
              </button>
              <button 
                type="button" 
                @click="showTaskModal = false" 
                class="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Loading Overlay -->
        <div v-if="taskModalLoading" class="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-2xl">
          <div class="flex items-center gap-3">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="text-slate-600">{{ taskModalMode === 'edit' ? 'Saving changes...' : 'Creating task...' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { navigateTo } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'
import KanbanBoard from '~/components/KanbanBoard.vue'
import TaskTable from '~/components/TaskTable.vue'

useHead({
  title: 'Task Management - Career Smithery',
  meta: [
    {
      name: 'description',
      content: 'Organize and track your career development tasks with our kanban board and table views. Manage tasks by category, quarter, and status to stay on top of your professional growth goals.'
    },
    {
      property: 'og:title',
      content: 'Task Management - Career Smithery'
    },
    {
      property: 'og:description',
      content: 'Organize and track your career development tasks with our kanban board and table views.'
    },
    {
      property: 'og:url',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/tasks`
    },
    {
      property: 'og:image',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/logo.png`
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/tasks`
    }
  ]
})

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
const taskModalMode = ref('create') // 'create' or 'edit'
const taskModalLoading = ref(false)
const taskModalError = ref('')
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
const colField = ref('status')
const currentView = ref('kanban') // 'kanban' or 'table'

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
  
  // Set status if it's being used as row or column
  if (rowField === 'status') {
    form.status = row
  } else if (colField === 'status') {
    form.status = col
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

function openEditTaskModal(task) {
  taskModalMode.value = 'edit'
  taskForm.value = { ...task }
  taskModalError.value = ''
  showTaskModal.value = true
}

function openAddTaskModal() {
  taskModalMode.value = 'create'
  taskForm.value = {
    id: null,
    title: '',
    description: '',
    due_date: '',
    status: 'todo',
    category: '',
    quarter: ''
  }
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
          category: taskForm.value.category,
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
    showMessage(taskModalMode.value === 'edit' ? 'Task updated successfully!' : 'Task created successfully!', 'success')
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
    showMessage('Task deleted successfully!', 'success')
  } catch (err) {
    taskModalError.value = err.message || 'Failed to delete task.'
  } finally {
    taskModalLoading.value = false
  }
}

async function updateTaskPosition(updatedTask) {
  try {
    const { error } = await supabase
      .from('user_tasks')
      .update({
        category: updatedTask.category,
        quarter: updatedTask.quarter,
        status: updatedTask.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', updatedTask.id)
    
    if (error) throw error
    
    // Update local state immediately for smooth UX
    const taskIndex = userTasks.value.findIndex(t => t.id === updatedTask.id)
    if (taskIndex !== -1) {
      userTasks.value[taskIndex] = updatedTask
    }
    
    showMessage('Task moved successfully!', 'success')
  } catch (err) {
    showMessage('Failed to move task: ' + err.message, 'error')
    // Refresh tasks to revert any optimistic updates
    await fetchUserTasks()
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
  await fetchUserTasks()
})
</script>

<style scoped>
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