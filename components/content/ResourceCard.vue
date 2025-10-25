<template>
  <div class="my-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
    <div v-if="image" class="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img :src="image" :alt="title" class="w-full h-full object-cover" />
    </div>
    
    <div class="p-6">
      <div v-if="category" class="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full mb-3">
        {{ category }}
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ title }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {{ description }}
      </p>
      
      <div v-if="tags && tags.length" class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in tags" 
          :key="tag"
          class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
        >
          {{ tag }}
        </span>
      </div>
      
      <div class="flex items-center justify-between">
        <div v-if="author || date" class="text-sm text-gray-500 dark:text-gray-400">
          <span v-if="author">{{ author }}</span>
          <span v-if="author && date"> • </span>
          <span v-if="date">{{ date }}</span>
        </div>
        
        <NuxtLink 
          v-if="link"
          :to="link"
          :target="external ? '_blank' : undefined"
          class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
        >
          {{ linkText }}
          <Icon :name="external ? 'i-heroicons-arrow-top-right-on-square' : 'i-heroicons-arrow-right'" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    default: () => []
  },
  author: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  linkText: {
    type: String,
    default: 'Read More'
  },
  external: {
    type: Boolean,
    default: false
  }
})
</script>

