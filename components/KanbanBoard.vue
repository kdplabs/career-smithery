<template>
  <div>
    <!-- Dynamic Row/Column Selectors -->
    <div class="flex flex-wrap gap-4 justify-center mb-6">
      <div>
        <label class="block text-sm font-semibold mb-1">Rows:</label>
        <select v-model="rowFieldLocal" class="border rounded px-3 py-2">
          <option value="category">Category</option>
          <option value="quarter">Quarter</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-semibold mb-1">Columns:</label>
        <select v-model="colFieldLocal" class="border rounded px-3 py-2">
          <option value="quarter">Quarter</option>
          <option value="category">Category</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
    <div v-if="kanbanLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
    <div v-else-if="kanbanError" class="text-red-600 text-center py-4">{{ kanbanError }}</div>
    <div v-else-if="tasks.length === 0" class="text-slate-500 text-center py-4">No tasks found. Create some tasks to get started!</div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full border border-slate-200">
        <thead>
          <tr>
            <th class="bg-slate-100 px-4 py-2 border-b border-r border-slate-200 text-left">{{ rowFieldLabel }}</th>
            <th v-for="col in colValues" :key="col" class="bg-slate-100 px-4 py-2 border-b border-r border-slate-200 text-center">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rowValues" :key="row">
            <td class="font-semibold px-4 py-2 border-b border-r border-slate-200 w-48">{{ getRowLabel(row) }}</td>
            <td v-for="col in colValues" :key="col" class="align-top px-2 py-2 border-b border-r border-slate-200 min-w-[220px]">
              <button @click="$emit('add-task', { row, col, rowField: rowFieldLocal, colField: colFieldLocal })" class="mb-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">+ Add Task</button>
              <div v-for="task in tasks.filter(t => t[rowFieldLocal] === row && t[colFieldLocal] === col)" :key="task.id" class="bg-white rounded-lg shadow p-3 mb-2 border border-slate-100 relative group">
                <div class="absolute top-2 right-2 flex gap-2 z-10">
                  <button @click="$emit('edit-task', task)" title="Edit" class="text-blue-500 hover:text-blue-700 p-1 m-0"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm0 0v3a2 2 0 002 2h3" /></svg></button>
                  <button @click="$emit('delete-task', task)" title="Delete" class="text-red-500 hover:text-red-700 p-1 m-0"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div class="font-bold text-indigo-700 mt-6">{{ task.title }}</div>
                <div class="text-slate-600 text-sm mb-1">Due: <span class="font-mono">{{ task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A' }}</span></div>
                <div class="text-slate-500 text-xs mb-2">{{ task.description }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
console.log(props.tasks); 
const emit = defineEmits(['add-task', 'edit-task', 'delete-task'])
const rowFieldLocal = ref(props.rowField)
const colFieldLocal = ref(props.colField)

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
  
  // Custom sorting for status field
  if (rowFieldLocal.value === 'status') {
    const statusOrder = ['todo', 'in_progress', 'done', 'archived']
    return values.sort((a, b) => {
      const indexA = statusOrder.indexOf(a)
      const indexB = statusOrder.indexOf(b)
      return indexA - indexB
    })
  }
  
  // Default alphabetical sorting for other fields
  return values.sort()
})
const colValues = computed(() => {
  const values = Array.from(new Set(props.tasks.map(t => t[colFieldLocal.value])))
  
  // Custom sorting for status field
  if (colFieldLocal.value === 'status') {
    const statusOrder = ['todo', 'in_progress', 'done', 'archived']
    return values.sort((a, b) => {
      const indexA = statusOrder.indexOf(a)
      const indexB = statusOrder.indexOf(b)
      return indexA - indexB
    })
  }
  
  // Default alphabetical sorting for other fields
  return values.sort()
})
function getRowLabel(row) {
  if (rowFieldLocal.value === 'category') return props.focusAreaTitles[row] || row
  return row
}
</script> 