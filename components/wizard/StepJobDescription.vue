<template>
  <div class="animate-slide-up">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Job Description</h2>
      <p class="text-gray-600">
        Paste the job description for the position you're applying to. This helps our AI tailor your resume to match the specific requirements.
      </p>
    </div>

    <div class="space-y-6">
      <div>
        <label for="jobDescription" class="block text-sm font-medium text-gray-700 mb-2">
          Job Description *
        </label>
        <textarea
          id="jobDescription"
          v-model="localData.jobDescription"
          placeholder="Paste the full job description here..."
          rows="12"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
        <p class="mt-2 text-sm text-gray-500">
          Include responsibilities, requirements, qualifications, and any other details from the job posting.
        </p>
      </div>

      <!-- Example toggle -->
      <div class="border-t pt-6">
        <button
          @click="showExample = !showExample"
          class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <Icon name="i-heroicons-information-circle" class="w-4 h-4" />
          <span>{{ showExample ? 'Hide' : 'Show' }} Example Job Description</span>
        </button>

        <div v-if="showExample" class="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-2">Example: Software Engineer Position</h4>
          <p class="text-sm text-gray-700 leading-relaxed">
            <strong>Job Title:</strong> Senior Software Engineer<br><br>
            <strong>About the Role:</strong> We are seeking a talented Senior Software Engineer to join our growing team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies.<br><br>
            <strong>Key Responsibilities:</strong><br>
            • Develop and maintain web applications using React, Node.js, and TypeScript<br>
            • Collaborate with cross-functional teams to define and implement new features<br>
            • Write clean, maintainable, and well-documented code<br>
            • Participate in code reviews and contribute to best practices<br>
            • Optimize applications for maximum speed and scalability<br><br>
            <strong>Requirements:</strong><br>
            • 5+ years of experience in software development<br>
            • Strong proficiency in JavaScript, React, and Node.js<br>
            • Experience with cloud platforms (AWS, Azure, or GCP)<br>
            • Familiarity with Agile development methodologies<br>
            • Bachelor's degree in Computer Science or related field
          </p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between items-center mt-8 pt-6 border-t">
      <div></div>
      <button
        @click="handleNext"
        :disabled="!localData.jobDescription.trim()"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next: Current Resume
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

const emit = defineEmits(['update', 'next'])

const localData = ref({
  jobDescription: props.data.jobDescription || props.jobData.job_description || ''
})

const showExample = ref(false)

const handleNext = () => {
  if (localData.value.jobDescription.trim()) {
    emit('update', localData.value)
    emit('next')
  }
}

// Update parent when data changes
watch(localData, (newData) => {
  emit('update', newData)
}, { deep: true })

// Sync with prop changes
watch(() => props.data.jobDescription, (newValue) => {
  if (newValue !== localData.value.jobDescription) {
    localData.value.jobDescription = newValue
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
