<template>
  <div class="animate-slide-up">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Additional Instructions</h2>
      <p class="text-gray-600">
        Provide any specific instructions or preferences for your resume. This helps our AI create a more personalized resume.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Additional Instructions -->
      <div>
        <label for="additionalInstructions" class="block text-sm font-medium text-gray-700 mb-2">
          Additional Instructions (Optional)
        </label>
        <textarea
          id="additionalInstructions"
          v-model="localData.additionalInstructions"
          placeholder="Any specific instructions, preferences, or additional information you'd like to include in your resume..."
          rows="8"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <p class="mt-2 text-sm text-gray-500">
          Examples: "Emphasize leadership experience", "Focus on technical skills", "Include specific achievements", etc.
        </p>
      </div>

      <!-- Quick Suggestions -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Suggestions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <button
              v-for="suggestion in leadershipSuggestions"
              :key="suggestion"
              @click="addSuggestion(suggestion)"
              class="block w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
            >
              {{ suggestion }}
            </button>
          </div>
          <div class="space-y-2">
            <button
              v-for="suggestion in technicalSuggestions"
              :key="suggestion"
              @click="addSuggestion(suggestion)"
              class="block w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>

      <!-- Resume Summary -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Resume Summary</h3>
        <div class="bg-gray-50 rounded-lg p-4 space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Job Description:</span>
            <span class="text-sm font-medium">{{ jobDescriptionPreview }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Template:</span>
            <span class="text-sm font-medium">{{ getTemplateName(data.selectedTemplate) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Current Resume Length:</span>
            <span class="text-sm font-medium">{{ currentResumeLength }} characters</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between items-center mt-8 pt-6 border-t">
      <button
        @click="$emit('prev')"
        class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
Previous: Metrics & Achievements
      </button>
             <button
         @click="handleSubmit"
         :disabled="userCredits < 1"
         class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
       >
         <Icon name="i-heroicons-sparkles" class="w-4 h-4" />
         Generate Resume
         <span v-if="userCredits < 1" class="text-xs">(Need credits)</span>
       </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  jobData: {
    type: Object,
    default: () => ({})
  },
  userCredits: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update', 'prev', 'submit'])

const localData = ref({
  additionalInstructions: props.data.additionalInstructions || ''
})

const leadershipSuggestions = [
  'Emphasize leadership and management experience',
  'Focus on team collaboration and communication',
  'Highlight project management skills',
  'Include mentoring and training experience'
]

const technicalSuggestions = [
  'Prioritize technical skills and certifications',
  'Emphasize problem-solving abilities',
  'Focus on quantifiable achievements',
  'Include specific technologies and tools'
]

const addSuggestion = (suggestion) => {
  if (localData.value.additionalInstructions) {
    localData.value.additionalInstructions += '\n' + suggestion
  } else {
    localData.value.additionalInstructions = suggestion
  }
}

const getTemplateName = (template) => {
  const names = {
    classic: 'Classic',
    modern: 'Modern',
    minimal: 'Minimal'
  }
  return names[template] || 'Classic'
}

const jobDescriptionPreview = computed(() => {
  const desc = props.data.jobDescription || props.jobData.job_description || ''
  return desc.length > 50 ? desc.substring(0, 50) + '...' : desc || 'Not provided'
})

const currentResumeLength = computed(() => {
  return (props.data.currentResume || '').length
})

const handleSubmit = () => {
  emit('update', localData.value)
  emit('submit')
}

// Update parent when data changes
watch(localData, (newData) => {
  emit('update', newData)
}, { deep: true })

// Sync with prop changes
watch(() => props.data.additionalInstructions, (newValue) => {
  if (newValue !== localData.value.additionalInstructions) {
    localData.value.additionalInstructions = newValue
  }
})
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
