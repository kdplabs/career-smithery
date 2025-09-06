<template>
  <div class="animate-slide-up">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Current Resume</h2>
      <p class="text-gray-600">
        Provide your current resume or work experience details. This helps our AI understand your background and create a tailored resume.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Default Data Notice -->
      <div v-if="hasDefaultData" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-center gap-2">
          <Icon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600" />
          <span class="text-sm font-medium text-blue-800">Default resume data loaded</span>
        </div>
        <p class="text-sm text-blue-700 mt-1">
          Your saved default resume has been pre-filled. You can modify it as needed for this specific job.
        </p>
      </div>

      <!-- Manual Input -->
      <div>
        <label for="currentResume" class="block text-sm font-medium text-gray-700 mb-2">
          Paste Your Current Resume or Work Experience
        </label>
        <textarea
          id="currentResume"
          v-model="localData.currentResume"
          placeholder="Paste your current resume content here, or describe your work experience, education, and skills..."
          rows="15"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <p class="mt-2 text-sm text-gray-500">
          Include your work experience, education, skills, and any other relevant information.
        </p>
      </div>

      <!-- Quick Template -->
      <div class="border-t pt-6">
        <button
          @click="showTemplate = !showTemplate"
          class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <Icon name="i-heroicons-information-circle" class="w-4 h-4" />
          <span>{{ showTemplate ? 'Hide' : 'Show' }} Resume Template</span>
        </button>

        <div v-if="showTemplate" class="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-2">Resume Template Example</h4>
          <div class="text-sm text-gray-700 space-y-4">
            <div>
              <strong>Work Experience:</strong><br>
              Senior Software Engineer | Tech Company | 2020-2023<br>
              • Led development of web applications using React and Node.js<br>
              • Managed team of 5 developers and delivered 3 major projects<br>
              • Improved application performance by 40% through optimization
            </div>
            <div>
              <strong>Education:</strong><br>
              Bachelor of Science in Computer Science | University Name | 2016-2020<br>
              GPA: 3.8/4.0
            </div>
            <div>
              <strong>Skills:</strong><br>
              Technical: JavaScript, React, Node.js, Python, AWS<br>
              Soft Skills: Leadership, Communication, Problem Solving
            </div>
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
        ← Previous
      </button>
      <button
        @click="handleNext"
        :disabled="!localData.currentResume.trim()"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
Next: Metrics & Achievements
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
  }
})

const emit = defineEmits(['update', 'next', 'prev'])

const localData = ref({
  currentResume: props.data.currentResume || ''
})

const showTemplate = ref(false)

// Check if default data is loaded
const hasDefaultData = computed(() => {
  return localData.value.currentResume && localData.value.currentResume.length > 0
})

const handleNext = () => {
  if (localData.value.currentResume.trim()) {
    emit('update', localData.value)
    emit('next')
  }
}

// Update parent when data changes
watch(localData, (newData) => {
  emit('update', newData)
}, { deep: true })

// Sync with prop changes
watch(() => props.data.currentResume, (newValue) => {
  if (newValue !== localData.value.currentResume) {
    localData.value.currentResume = newValue
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
