<template>
  <blockquote class="my-6 border-l-4 border-primary-500 bg-gray-50 dark:bg-gray-800 p-6 rounded-r-lg">
    <div class="flex gap-4">
      <div class="text-4xl text-primary-500 leading-none">"</div>
      <div class="flex-1">
        <div class="text-lg text-gray-700 dark:text-gray-300 italic mb-3">
          <slot />
        </div>
        <div v-if="author || source" class="flex items-center gap-3">
          <div v-if="avatar" class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img :src="avatar" :alt="author" class="w-full h-full object-cover" />
          </div>
          <div class="text-sm">
            <div v-if="author" class="font-semibold text-gray-900 dark:text-gray-100">
              {{ author }}
            </div>
            <div v-if="source" class="text-gray-600 dark:text-gray-400">
              {{ source }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </blockquote>
</template>

<script setup>
defineProps({
  author: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  }
})
</script>

