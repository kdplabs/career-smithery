<template>
  <div class="my-8 relative">
    <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div>
    
    <div 
      v-for="(event, index) in events" 
      :key="index"
      class="relative pl-12 pb-8 last:pb-0"
    >
      <div class="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
        <span v-if="event.icon">{{ event.icon }}</span>
        <span v-else class="text-xs">{{ index + 1 }}</span>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
        <div v-if="event.date" class="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-2">
          {{ event.date }}
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          {{ event.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          {{ event.description }}
        </p>
        <div v-if="event.tags && event.tags.length" class="flex flex-wrap gap-2 mt-3">
          <span 
            v-for="tag in event.tags" 
            :key="tag"
            class="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  events: {
    type: Array,
    required: true,
    validator: (value) => value.every(e => e.title && e.description)
  }
})
</script>

