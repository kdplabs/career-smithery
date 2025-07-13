<template>
  <div>

    <!-- Loading State -->
    <div v-if="kanbanLoading" class="flex justify-center items-center py-12">
      <div class="flex items-center gap-3">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="text-slate-600">Loading tasks...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="kanbanError" class="text-red-600 text-center py-8 bg-red-50 border border-red-200 rounded-lg">
      <Icon name="i-heroicons-exclamation-circle" class="w-6 h-6 mx-auto mb-2" />
      {{ kanbanError }}
    </div>

    <!-- Empty State -->
    <div v-else-if="tasks.length === 0" class="text-slate-500 text-center py-12 bg-slate-50 border border-slate-200 rounded-lg">
      <Icon name="i-heroicons-clipboard-document-list" class="w-12 h-12 mx-auto mb-4 text-slate-400" />
      <h3 class="text-lg font-semibold mb-2">No tasks found</h3>
      <p>Create some tasks to get started with your Kanban board!</p>
    </div>

        <!-- Matrix/Table Board -->
    <div v-else class="overflow-x-auto overflow-y-visible">
      <div class="bg-white rounded-xl shadow-sm p-4" :style="{ minWidth: (192 + colValues.length * 280) + 'px' }">
        <!-- Header -->
        <div class="flex gap-2 mb-4">
          <div class="w-48 px-4 py-3 font-semibold text-slate-800 flex items-center flex-shrink-0 rounded-lg" :class="getRowHeaderClass('header')">
            {{ rowFieldLabel }}
          </div>
          <div v-for="col in colValues" :key="col" class="w-[280px] px-4 py-3 text-center font-semibold text-slate-800 flex-shrink-0 rounded-lg" :class="getColumnHeaderClass(col)">
            <div class="flex items-center justify-center gap-2">
              <div class="w-3 h-3 rounded-full" :class="getColumnDotClass(col)"></div>
              {{ getColumnLabel(col) }}
              <span class="text-xs bg-white bg-opacity-70 text-slate-600 px-2 py-1 rounded-full">
                {{ getColumnTaskCount(col) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Rows -->
        <div class="space-y-3">
          <div v-for="row in rowValues" :key="row" class="flex gap-2">
            <!-- Row Label -->
            <div class="w-48 px-4 py-3 font-semibold text-slate-800 flex items-center flex-shrink-0 rounded-lg" :class="getRowHeaderClass(row)">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" :class="getRowDotClass(row)"></div>
                {{ getRowLabel(row) }}
              </div>
            </div>

            <!-- Cells -->
            <div 
              v-for="col in colValues" 
              :key="col" 
              class="w-[280px] p-3 align-top flex-shrink-0 min-h-[200px] rounded-lg transition-all duration-200" 
              :class="[
                getCellBackgroundClass(row, col),
                dropZone?.row === row && dropZone?.col === col ? 'bg-blue-100 ring-2 ring-blue-300' : ''
              ]"
              @dragover="handleDragOver($event, row, col)"
              @drop="handleDrop($event, row, col)"
              @dragenter="handleDragEnter($event, row, col)"
              @dragleave="handleDragLeave($event, row, col)"
            >
              <!-- Add Task Button -->
              <button @click="$emit('add-task', { row, col, rowField: rowFieldLocal, colField: colFieldLocal })" 
                      class="w-full mb-3 py-2 px-3 text-sm text-slate-600 bg-white/80 border border-slate-300 border-dashed rounded-lg hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
                <Icon name="i-heroicons-plus" class="w-4 h-4" />
                Add Task
              </button>

                             <!-- Tasks -->
               <div class="space-y-2">
                 <div v-for="task in tasks.filter(t => t[rowFieldLocal] === row && t[colFieldLocal] === col)" :key="task.id" class="group">
                   <div 
                     class="bg-white rounded-lg shadow-sm border border-slate-200 p-3 hover:shadow-md transition-all duration-200 relative cursor-move"
                     :class="[
                       getTaskBorderClass(task),
                       draggedTask?.id === task.id ? 'opacity-50 transform rotate-2 scale-105' : ''
                     ]"
                     draggable="true"
                     @dragstart="handleDragStart($event, task)"
                     @dragend="handleDragEnd"
                     @click="handleTaskClick($event, task)"
                   >
                     <!-- Task Header -->
                     <div class="flex items-start justify-between mb-2">
                       <div class="flex items-center gap-2">
                         <span class="text-xs text-slate-500 font-medium">#{{ task.id }}</span>
                         <div class="w-2 h-2 rounded-full" :class="getTaskStatusColor(task.status)"></div>
                       </div>
                       <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button @click="$emit('edit-task', task)" class="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit task">
                           <Icon name="i-heroicons-pencil" class="w-4 h-4" />
                         </button>
                         <button @click="$emit('delete-task', task)" class="p-1 text-slate-400 hover:text-red-600 transition-colors" title="Delete task">
                           <Icon name="i-heroicons-trash" class="w-4 h-4" />
                         </button>
                       </div>
                     </div>

                     <!-- Task Title -->
                     <h4 class="font-medium text-slate-800 mb-2 line-clamp-2">{{ task.title }}</h4>

                     <!-- Task Description -->
                     <p v-if="task.description" class="text-sm text-slate-600 mb-3 line-clamp-2">{{ task.description }}</p>

                     <!-- Task Footer -->
                     <div class="flex items-center justify-between">
                       <span class="text-xs px-2 py-1 rounded-full" :class="getCategoryBadgeClass(task.category)">
                         {{ getCategoryLabel(task.category) }}
                       </span>
                       <div v-if="task.due_date" class="flex items-center gap-1 text-xs text-slate-500">
                         <Icon name="i-heroicons-calendar-days" class="w-3 h-3" />
                         {{ formatDate(task.due_date) }}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  tasks: { type: Array, required: true },
  kanbanLoading: { type: Boolean, default: false },
  kanbanError: { type: String, default: '' },
  rowField: { type: String, default: 'category' },
  colField: { type: String, default: 'quarter' },
  focusAreaTitles: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['add-task', 'edit-task', 'delete-task', 'update-task'])
const rowFieldLocal = ref(props.rowField)
const colFieldLocal = ref(props.colField)

// Drag and drop state
const draggedTask = ref(null)
const dropZone = ref(null)
const isDragging = ref(false)

watch(() => props.rowField, v => { rowFieldLocal.value = v })
watch(() => props.colField, v => { colFieldLocal.value = v })

const rowFieldLabel = computed(() => {
  if (rowFieldLocal.value === 'category') return 'Category'
  if (rowFieldLocal.value === 'quarter') return 'Quarter'
  if (rowFieldLocal.value === 'status') return 'Status'
  return rowFieldLocal.value
})

const colFieldLabel = computed(() => {
  if (colFieldLocal.value === 'category') return 'Category'
  if (colFieldLocal.value === 'quarter') return 'Quarter'
  if (colFieldLocal.value === 'status') return 'Status'
  return colFieldLocal.value
})

const rowValues = computed(() => {
  const values = Array.from(new Set(props.tasks.map(t => t[rowFieldLocal.value])))
  
  if (rowFieldLocal.value === 'status') {
    const statusOrder = ['todo', 'in_progress', 'done', 'archived']
    return values.sort((a, b) => {
      const indexA = statusOrder.indexOf(a)
      const indexB = statusOrder.indexOf(b)
      return indexA - indexB
    })
  }
  
  return values.sort()
})

const colValues = computed(() => {
  const values = Array.from(new Set(props.tasks.map(t => t[colFieldLocal.value])))
  
  if (colFieldLocal.value === 'status') {
    const statusOrder = ['todo', 'in_progress', 'done', 'archived']
    return values.sort((a, b) => {
      const indexA = statusOrder.indexOf(a)
      const indexB = statusOrder.indexOf(b)
      return indexA - indexB
    })
  }
  
  return values.sort()
})

function getRowLabel(row) {
  if (rowFieldLocal.value === 'category') return props.focusAreaTitles[row] || row
  if (rowFieldLocal.value === 'status') return getStatusLabel(row)
  return row
}

function getColumnLabel(col) {
  if (colFieldLocal.value === 'category') return props.focusAreaTitles[col] || col
  if (colFieldLocal.value === 'status') return getStatusLabel(col)
  return col
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

function getColumnTaskCount(col) {
  return props.tasks.filter(t => t[colFieldLocal.value] === col).length
}

// Row header styling
function getRowHeaderClass(row) {
  if (row === 'header') {
    return 'bg-slate-100'
  }
  
  if (rowFieldLocal.value === 'status') {
    const statusClasses = {
      todo: 'bg-blue-100',
      in_progress: 'bg-yellow-100',
      done: 'bg-green-100',
      archived: 'bg-gray-100'
    }
    return statusClasses[row] || 'bg-slate-100'
  }
  if (rowFieldLocal.value === 'category') {
    const categoryClasses = {
      leadership: 'bg-purple-100',
      domain_knowledge: 'bg-blue-100',
      technical_skills: 'bg-green-100',
      networking_marketing: 'bg-orange-100'
    }
    return categoryClasses[row] || 'bg-slate-100'
  }
  return 'bg-slate-100'
}

function getRowDotClass(row) {
  if (rowFieldLocal.value === 'status') {
    const statusClasses = {
      todo: 'bg-blue-500',
      in_progress: 'bg-yellow-500',
      done: 'bg-green-500',
      archived: 'bg-gray-500'
    }
    return statusClasses[row] || 'bg-slate-500'
  }
  if (rowFieldLocal.value === 'category') {
    const categoryClasses = {
      leadership: 'bg-purple-500',
      domain_knowledge: 'bg-blue-500',
      technical_skills: 'bg-green-500',
      networking_marketing: 'bg-orange-500'
    }
    return categoryClasses[row] || 'bg-slate-500'
  }
  return 'bg-slate-500'
}

// Column header styling
function getColumnHeaderClass(col) {
  if (colFieldLocal.value === 'status') {
    const statusClasses = {
      todo: 'bg-blue-100',
      in_progress: 'bg-yellow-100',
      done: 'bg-green-100',
      archived: 'bg-gray-100'
    }
    return statusClasses[col] || 'bg-slate-100'
  }
  if (colFieldLocal.value === 'category') {
    const categoryClasses = {
      leadership: 'bg-purple-100',
      domain_knowledge: 'bg-blue-100',
      technical_skills: 'bg-green-100',
      networking_marketing: 'bg-orange-100'
    }
    return categoryClasses[col] || 'bg-slate-100'
  }
  return 'bg-slate-100'
}

function getColumnDotClass(col) {
  if (colFieldLocal.value === 'status') {
    const statusClasses = {
      todo: 'bg-blue-500',
      in_progress: 'bg-yellow-500',
      done: 'bg-green-500',
      archived: 'bg-gray-500'
    }
    return statusClasses[col] || 'bg-slate-500'
  }
  if (colFieldLocal.value === 'category') {
    const categoryClasses = {
      leadership: 'bg-purple-500',
      domain_knowledge: 'bg-blue-500',
      technical_skills: 'bg-green-500',
      networking_marketing: 'bg-orange-500'
    }
    return categoryClasses[col] || 'bg-slate-500'
  }
  return 'bg-slate-500'
}

// Cell background styling (subtle combination of row and column colors)
function getCellBackgroundClass(row, col) {
  // Create distinct but subtle backgrounds for better visual separation
  const baseClasses = 'bg-slate-50 hover:bg-slate-100'
  
  // Add slight tint based on row/column combinations
  if (rowFieldLocal.value === 'status') {
    const statusBg = {
      todo: 'bg-blue-25',
      in_progress: 'bg-yellow-25', 
      done: 'bg-green-25',
      archived: 'bg-gray-25'
    }
    return `${statusBg[row] || 'bg-slate-50'} hover:bg-slate-100`
  }
  
  if (rowFieldLocal.value === 'category') {
    const categoryBg = {
      leadership: 'bg-purple-25',
      domain_knowledge: 'bg-blue-25',
      technical_skills: 'bg-green-25',
      networking_marketing: 'bg-orange-25'
    }
    return `${categoryBg[row] || 'bg-slate-50'} hover:bg-slate-100`
  }
  
  return baseClasses
}

// Task border styling (left border with color based on category or status)
function getTaskBorderClass(task) {
  const borderClasses = {
    // Category-based borders
    leadership: 'border-l-4 border-l-purple-500',
    domain_knowledge: 'border-l-4 border-l-blue-500',
    technical_skills: 'border-l-4 border-l-green-500',
    networking_marketing: 'border-l-4 border-l-orange-500',
    
    // Status-based borders (fallback)
    todo: 'border-l-4 border-l-blue-500',
    in_progress: 'border-l-4 border-l-yellow-500',
    done: 'border-l-4 border-l-green-500',
    archived: 'border-l-4 border-l-gray-500'
  }
  
  // Use category for border color if available, otherwise use status
  return borderClasses[task.category] || borderClasses[task.status] || 'border-l-4 border-l-slate-500'
}

function getTaskStatusColor(status) {
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

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

// Drag and drop handlers
function handleDragStart(event, task) {
  draggedTask.value = task
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', task.id)
  isDragging.value = true
}

function handleDragEnd() {
  draggedTask.value = null
  dropZone.value = null
  // Reset dragging state after a short delay to prevent click from firing
  setTimeout(() => {
    isDragging.value = false
  }, 100)
}

function handleDragOver(event, row, col) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

function handleDragEnter(event, row, col) {
  event.preventDefault()
  dropZone.value = { row, col }
}

function handleDragLeave(event, row, col) {
  // Only clear if we're actually leaving the drop zone
  if (!event.currentTarget.contains(event.relatedTarget)) {
    dropZone.value = null
  }
}

function handleDrop(event, row, col) {
  event.preventDefault()
  
  if (!draggedTask.value) return
  
  // Don't do anything if dropped in the same location
  if (draggedTask.value[rowFieldLocal.value] === row && draggedTask.value[colFieldLocal.value] === col) {
    handleDragEnd()
    return
  }
  
  // Create updated task object
  const updatedTask = {
    ...draggedTask.value,
    [rowFieldLocal.value]: row,
    [colFieldLocal.value]: col
  }
  
  // Emit update event to parent
  emit('update-task', updatedTask)
  
  // Clean up
  handleDragEnd()
}

function handleTaskClick(event, task) {
  // Don't open edit modal if user was dragging
  if (isDragging.value) {
    return
  }
  
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Light background colors for cell differentiation */
.bg-blue-25 {
  background-color: rgb(239 246 255 / 0.5);
}

.bg-yellow-25 {
  background-color: rgb(254 249 195 / 0.5);
}

.bg-green-25 {
  background-color: rgb(236 253 245 / 0.5);
}

.bg-gray-25 {
  background-color: rgb(249 250 251 / 0.5);
}

.bg-purple-25 {
  background-color: rgb(250 245 255 / 0.5);
}

.bg-orange-25 {
  background-color: rgb(255 247 237 / 0.5);
}
</style> 