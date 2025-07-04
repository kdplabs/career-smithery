<template>
  <div class="bg-white border border-slate-200 rounded-xl shadow p-6 flex flex-col h-full">
    <h3 class="text-xl font-bold text-indigo-700 mb-2 font-sans">{{ title }}</h3>
    <div class="prose mb-4 flex-1" v-html="description"></div>
    <div class="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
      <div v-if="callToActionItems.length">
        <ul class="list-disc pl-5 mb-4">
          <li v-for="(item, idx) in callToActionItems" :key="idx">{{ item }}</li>
        </ul>
        <button @click="$emit('create-task', { area: title, tasks: callToActionItems })" class="mt-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all font-sans w-full">Create Tasks</button>
      </div>
      <div v-else class="text-slate-500">No outcome-based tasks found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
const props = defineProps({
  title: String,
  description: String,
  callToAction: String
})
const emit = defineEmits(['create-task'])
const callToActionItems = computed(() => {
  if (!props.callToAction) return []
  const div = document.createElement('div')
  div.innerHTML = props.callToAction
  const lis = div.querySelectorAll('li')
  if (lis.length) {
    return Array.from(lis).map(li => li.innerText.trim()).filter(Boolean)
  }
  // If no <li>, fallback to <p> or all text
  const ps = div.querySelectorAll('p')
  if (ps.length) {
    return Array.from(ps).map(p => p.innerText.trim()).filter(Boolean)
  }
  // Fallback: all text
  return [div.innerText.trim()]
})

onMounted(() => {
  console.log('[FocusAreaCard] Mounted:', {
    title: props.title,
    description: props.description,
    callToAction: props.callToAction
  })
  console.log('[FocusAreaCard] callToActionItems (on mount):', callToActionItems.value)
})

watch(callToActionItems, (newVal) => {
  console.log('[FocusAreaCard] callToActionItems changed:', newVal)
})
</script> 