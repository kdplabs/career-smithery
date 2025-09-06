<template>
  <div class="animate-slide-up">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Metrics & Achievements</h2>
      <p class="text-gray-600">
        Add specific metrics and quantifiable achievements that showcase your impact. These help make your resume more compelling and results-oriented.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Default Data Notice -->
      <div v-if="hasDefaultMetrics" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-center gap-2">
          <Icon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600" />
          <span class="text-sm font-medium text-blue-800">Default metrics loaded</span>
        </div>
        <p class="text-sm text-blue-700 mt-1">
          Your saved default metrics have been pre-filled. You can modify them as needed for this specific job.
        </p>
      </div>

      <div>
        <label for="metrics" class="block text-sm font-medium text-gray-700 mb-2">
          Metrics & Achievements
        </label>
        <textarea
          id="metrics"
          v-model="localData.metrics"
          placeholder="List specific metrics, numbers, percentages, and quantifiable achievements..."
          rows="8"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <p class="mt-2 text-sm text-gray-500">
          Optional but recommended: Include any measurable results from your work.
        </p>
      </div>

      <!-- Examples -->
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 class="font-medium text-green-900 mb-3 flex items-center">
          <Icon name="i-heroicons-check-circle" class="w-5 h-5 mr-2" />
          Examples of Good Metrics:
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
          <div>
            <h5 class="font-medium mb-1">Performance Improvements:</h5>
            <ul class="space-y-1">
              <li>• Increased website speed by 45%</li>
              <li>• Reduced server response time from 2s to 300ms</li>
              <li>• Improved code coverage from 60% to 95%</li>
            </ul>
          </div>
          <div>
            <h5 class="font-medium mb-1">Business Impact:</h5>
            <ul class="space-y-1">
              <li>• Generated $2M in additional revenue</li>
              <li>• Reduced operational costs by 25%</li>
              <li>• Increased user engagement by 40%</li>
            </ul>
          </div>
          <div>
            <h5 class="font-medium mb-1">Scale & Volume:</h5>
            <ul class="space-y-1">
              <li>• Managed database with 10M+ records</li>
              <li>• Served 100K+ daily active users</li>
              <li>• Processed 1M+ transactions per day</li>
            </ul>
          </div>
          <div>
            <h5 class="font-medium mb-1">Team & Leadership:</h5>
            <ul class="space-y-1">
              <li>• Led team of 8 developers</li>
              <li>• Mentored 5+ junior developers</li>
              <li>• Delivered 15+ projects on time</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 class="font-medium text-amber-900 mb-2 flex items-center">
          <Icon name="i-heroicons-exclamation-triangle" class="w-5 h-5 mr-2" />
          Pro Tips:
        </h4>
        <ul class="text-sm text-amber-800 space-y-1">
          <li>• Use specific numbers rather than vague terms like "many" or "significant"</li>
          <li>• Include timeframes (e.g., "within 6 months", "over 2 years")</li>
          <li>• Focus on results and impact, not just responsibilities</li>
          <li>• Use percentages, dollar amounts, user counts, or time savings</li>
        </ul>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between items-center mt-8 pt-6 border-t">
      <button
        @click="$emit('prev')"
        class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
Previous: Current Resume
      </button>
      <button
        @click="handleNext"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Next: Additional Instructions
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'next', 'prev'])

const localData = ref({
  metrics: props.data.metrics || ''
})

// Check if default metrics are loaded
const hasDefaultMetrics = computed(() => {
  return localData.value.metrics && localData.value.metrics.length > 0
})

const handleNext = () => {
  emit('update', localData.value)
  emit('next')
}

// Update parent when data changes
watch(localData, (newData) => {
  emit('update', newData)
}, { deep: true })

// Sync with prop changes
watch(() => props.data.metrics, (newValue) => {
  if (newValue !== localData.value.metrics) {
    localData.value.metrics = newValue
  }
})
</script>
