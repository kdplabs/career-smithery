<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">Resume Builder Wizard</h2>
          <button @click="$emit('close')" class="text-white hover:text-gray-200">
            <Icon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>
        
        <!-- Progress Bar -->
        <div class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-blue-100">Step {{ currentStep }} of 4</span>
            <span class="text-sm text-blue-100">{{ Math.round((currentStep / 4) * 100) }}% Complete</span>
          </div>
          
          <div class="w-full bg-blue-200 rounded-full h-2">
            <div 
              class="bg-white h-2 rounded-full transition-all duration-300"
              :style="{ width: `${(currentStep / 4) * 100}%` }"
            ></div>
          </div>
          
          <!-- Step indicators -->
          <div class="flex justify-between mt-3">
            <div 
              v-for="(step, index) in steps" 
              :key="index"
              class="flex flex-col items-center"
            >
              <div 
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-200"
                :class="[
                  index + 1 <= currentStep 
                    ? 'bg-white text-blue-600' 
                    : 'bg-blue-300 text-blue-800'
                ]"
              >
                {{ index + 1 }}
              </div>
              <span class="text-xs text-blue-100 mt-1 text-center max-w-16">{{ step.title }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
        <component 
          :is="currentStepComponent" 
          :data="formData"
          :job-data="jobData"
          @update="updateFormData"
          @next="nextStep"
          @prev="prevStep"
          @submit="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import StepJobDescription from './StepJobDescription.vue'
import StepCurrentResume from './StepCurrentResume.vue'
import StepTemplateSelection from './StepTemplateSelection.vue'
import StepInstructions from './StepInstructions.vue'

const props = defineProps({
  jobData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'resume-created'])

const currentStep = ref(1)

const steps = [
  { title: 'Job Description', component: 'StepJobDescription' },
  { title: 'Current Resume', component: 'StepCurrentResume' },
  { title: 'Template', component: 'StepTemplateSelection' },
  { title: 'Instructions', component: 'StepInstructions' }
]

const formData = ref({
  jobDescription: '',
  currentResume: '',
  selectedTemplate: 'classic',
  additionalInstructions: ''
})

const currentStepComponent = computed(() => {
  const stepMap = {
    1: StepJobDescription,
    2: StepCurrentResume,
    3: StepTemplateSelection,
    4: StepInstructions
  }
  return stepMap[currentStep.value]
})

const updateFormData = (data) => {
  formData.value = { ...formData.value, ...data }
}

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitForm = async () => {
  try {
    // Here you would call your resume generation API
    // For now, we'll emit the data to the parent
    emit('resume-created', {
      ...formData.value,
      jobId: props.jobData.id
    })
    emit('close')
  } catch (error) {
    console.error('Error creating resume:', error)
  }
}

// Pre-populate job description if available
onMounted(() => {
  if (props.jobData.job_description) {
    formData.value.jobDescription = props.jobData.job_description
  }
})
</script>
