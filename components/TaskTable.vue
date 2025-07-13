<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="flex items-center gap-3">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="text-slate-600">Loading tasks...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-600 text-center py-8 bg-red-50 border border-red-200 rounded-lg">
      <Icon name="i-heroicons-exclamation-circle" class="w-6 h-6 mx-auto mb-2" />
      {{ error }}
    </div>

    <!-- Empty State -->
    <div v-else-if="tasks.length === 0" class="text-slate-500 text-center py-12 bg-slate-50 border border-slate-200 rounded-lg">
      <Icon name="i-heroicons-clipboard-document-list" class="w-12 h-12 mx-auto mb-4 text-slate-400" />
      <h3 class="text-lg font-semibold mb-2">No tasks found</h3>
      <p class="mb-4">Create some tasks to get started!</p>
      <button @click="$emit('add-task')" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <Icon name="i-heroicons-plus" class="w-4 h-4 mr-2 inline" />
        Add Task
      </button>
    </div>

    <!-- Table View -->
    <div v-else class="overflow-x-auto">
      <!-- Table Controls -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <!-- Search -->
          <div class="relative">
            <Icon name="i-heroicons-magnifying-glass" class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search tasks..."
              class="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Filter by Status -->
          <select v-model="statusFilter" class="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
            <option value="archived">Archived</option>
          </select>

          <!-- Filter by Category -->
          <select v-model="categoryFilter" class="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Categories</option>
            <option value="leadership">Leadership</option>
            <option value="domain_knowledge">Domain Knowledge</option>
            <option value="technical_skills">Technical Skills</option>
            <option value="networking_marketing">Networking / Marketing</option>
          </select>
        </div>

        <!-- Add Task Button -->
        <button @click="$emit('add-task')" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Icon name="i-heroicons-plus" class="w-4 h-4" />
          Add Task
        </button>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table class="min-w-full divide-y divide-slate-200">
          <!-- Table Header -->
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100" @click="sortBy('title')">
                <div class="flex items-center gap-2">
                  Task
                  <Icon 
                    name="i-heroicons-chevron-up-down" 
                    class="w-4 h-4"
                    :class="sortField === 'title' ? 'text-blue-600' : 'text-slate-400'"
                  />
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100" @click="sortBy('status')">
                <div class="flex items-center gap-2">
                  Status
                  <Icon 
                    name="i-heroicons-chevron-up-down" 
                    class="w-4 h-4"
                    :class="sortField === 'status' ? 'text-blue-600' : 'text-slate-400'"
                  />
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100" @click="sortBy('category')">
                <div class="flex items-center gap-2">
                  Category
                  <Icon 
                    name="i-heroicons-chevron-up-down" 
                    class="w-4 h-4"
                    :class="sortField === 'category' ? 'text-blue-600' : 'text-slate-400'"
                  />
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100" @click="sortBy('quarter')">
                <div class="flex items-center gap-2">
                  Quarter
                  <Icon 
                    name="i-heroicons-chevron-up-down" 
                    class="w-4 h-4"
                    :class="sortField === 'quarter' ? 'text-blue-600' : 'text-slate-400'"
                  />
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100" @click="sortBy('due_date')">
                <div class="flex items-center gap-2">
                  Due Date
                  <Icon 
                    name="i-heroicons-chevron-up-down" 
                    class="w-4 h-4"
                    :class="sortField === 'due_date' ? 'text-blue-600' : 'text-slate-400'"
                  />
                </div>
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="task in filteredAndSortedTasks" :key="task.id" class="hover:bg-slate-50 transition-colors cursor-pointer" @click="handleRowClick($event, task)">
              <!-- Task Title & Description -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-1 h-12 rounded-full" :class="getTaskBorderColor(task)"></div>
                  <div>
                    <div class="text-sm font-medium text-slate-900">{{ task.title }}</div>
                    <div v-if="task.description" class="text-sm text-slate-500 mt-1">{{ task.description }}</div>
                    <div class="text-xs text-slate-400 mt-1">#{{ task.id }}</div>
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusBadgeClass(task.status)">
                  <div class="w-2 h-2 rounded-full mr-1.5" :class="getStatusDotClass(task.status)"></div>
                  {{ getStatusLabel(task.status) }}
                </span>
              </td>

              <!-- Category -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getCategoryBadgeClass(task.category)">
                  {{ getCategoryLabel(task.category) }}
                </span>
              </td>

              <!-- Quarter -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {{ task.quarter }}
              </td>

              <!-- Due Date -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                <div v-if="task.due_date" class="flex items-center gap-1">
                  <Icon name="i-heroicons-calendar-days" class="w-4 h-4 text-slate-400" />
                  {{ formatDate(task.due_date) }}
                </div>
                <span v-else class="text-slate-400">No due date</span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <button @click="$emit('edit-task', task)" class="text-blue-600 hover:text-blue-800 transition-colors" title="Edit task">
                    <Icon name="i-heroicons-pencil" class="w-4 h-4" />
                  </button>
                  <button @click="$emit('delete-task', task)" class="text-red-600 hover:text-red-800 transition-colors" title="Delete task">
                    <Icon name="i-heroicons-trash" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table Footer -->
      <div class="mt-4 flex items-center justify-between text-sm text-slate-500">
        <div>
          Showing {{ filteredAndSortedTasks.length }} of {{ tasks.length }} tasks
        </div>
        <div class="flex items-center gap-4">
          <span>{{ getTasksSummary() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tasks: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  focusAreaTitles: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['add-task', 'edit-task', 'delete-task', 'update-task'])

// Search and filter state
const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const sortField = ref('due_date')
const sortDirection = ref('asc')

// Computed properties
const filteredAndSortedTasks = computed(() => {
  let filtered = props.tasks

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(task => task.status === statusFilter.value)
  }

  // Apply category filter
  if (categoryFilter.value) {
    filtered = filtered.filter(task => task.category === categoryFilter.value)
  }

  // Apply sorting
  return filtered.sort((a, b) => {
    let valueA = a[sortField.value]
    let valueB = b[sortField.value]

    // Handle null/undefined values
    if (valueA === null || valueA === undefined) valueA = ''
    if (valueB === null || valueB === undefined) valueB = ''

    // Handle dates
    if (sortField.value === 'due_date') {
      valueA = valueA ? new Date(valueA) : new Date('9999-12-31')
      valueB = valueB ? new Date(valueB) : new Date('9999-12-31')
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
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
    archived: 'Archived'
  }
  return statusLabels[status] || status
}

function getStatusBadgeClass(status) {
  const statusClasses = {
    todo: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    done: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-slate-100 text-slate-800'
}

function getStatusDotClass(status) {
  const statusColors = {
    todo: 'bg-blue-500',
    in_progress: 'bg-yellow-500',
    done: 'bg-green-500',
    archived: 'bg-gray-500'
  }
  return statusColors[status] || 'bg-slate-500'
}

function getCategoryBadgeClass(category) {
  const categoryClasses = {
    leadership: 'bg-purple-100 text-purple-800',
    domain_knowledge: 'bg-blue-100 text-blue-800',
    technical_skills: 'bg-green-100 text-green-800',
    networking_marketing: 'bg-orange-100 text-orange-800'
  }
  return categoryClasses[category] || 'bg-slate-100 text-slate-800'
}

function getCategoryLabel(category) {
  return props.focusAreaTitles[category] || category
}

function getTaskBorderColor(task) {
  const borderClasses = {
    leadership: 'bg-purple-500',
    domain_knowledge: 'bg-blue-500',
    technical_skills: 'bg-green-500',
    networking_marketing: 'bg-orange-500'
  }
  return borderClasses[task.category] || 'bg-slate-500'
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short', 
    day: 'numeric' 
  })
}

function getTasksSummary() {
  const total = props.tasks.length
  const completed = props.tasks.filter(t => t.status === 'done').length
  const inProgress = props.tasks.filter(t => t.status === 'in_progress').length
  const todo = props.tasks.filter(t => t.status === 'todo').length
  
  return `${completed} completed • ${inProgress} in progress • ${todo} todo`
}

function handleRowClick(event, task) {
  // Don't open edit modal if clicked on a button
  if (event.target.tagName === 'BUTTON' || event.target.tagName === 'svg' || event.target.tagName === 'path') {
    return
  }
  
  // Don't open edit modal if clicked on a button parent element
  if (event.target.closest('button')) {
    return
  }
  
  // Emit edit event to parent
  emit('edit-task', task)
}
</script> 