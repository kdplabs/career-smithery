<template>
  <div class="my-8 space-y-6">
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="flex gap-4"
    >
      <div class="flex-shrink-0">
        <div class="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg">
          {{ index + 1 }}
        </div>
        <div v-if="index < steps.length - 1" class="w-0.5 h-full bg-primary-200 dark:bg-primary-800 mx-auto mt-2"></div>
      </div>
      <div class="flex-1 pb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {{ step.title }}
        </h3>
        <div class="text-gray-700 dark:text-gray-300 prose prose-sm max-w-none">
          {{ step.description }}
        </div>
        <div v-if="step.tip" class="mt-3 text-sm text-primary-600 dark:text-primary-400 italic">
          💡 {{ step.tip }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true,
    validator: (value) => value.every(step => step.title && step.description)
  }
})
</script>

