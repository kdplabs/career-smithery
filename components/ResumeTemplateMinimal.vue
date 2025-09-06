<template>
  <div id="resume-template-minimal" class="bg-white p-12 max-w-4xl mx-auto" style="font-family: 'Helvetica', 'Arial', sans-serif; line-height: 1.6;">
    <!-- Header -->
    <div class="border-b border-gray-200 pb-8 mb-10 relative group">
      <button
        v-if="editMode"
        @click="$emit('edit-section', 'personalInfo')"
        class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      </button>
      
      <h1 class="text-5xl font-light text-gray-900 mb-4 tracking-wide">{{ resume.personalInfo?.fullName }}</h1>
      
      <div class="flex flex-wrap gap-8 text-gray-600">
        <span>{{ resume.personalInfo?.email }}</span>
        <span>{{ resume.personalInfo?.phone }}</span>
        <span v-if="resume.personalInfo?.location">{{ resume.personalInfo.location }}</span>
        <span v-if="resume.personalInfo?.linkedin">{{ resume.personalInfo.linkedin }}</span>
        <span v-if="resume.personalInfo?.website">{{ resume.personalInfo.website }}</span>
      </div>
    </div>

    <!-- Professional Summary -->
    <div class="mb-12 relative group">
      <div class="flex items-start justify-between mb-4">
        <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest">Professional Summary</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'professionalSummary')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      <p class="text-gray-700 leading-relaxed max-w-4xl">{{ resume.professionalSummary }}</p>
    </div>

    <!-- Work Experience -->
    <div class="mb-12 relative group">
      <div class="flex items-start justify-between mb-8">
        <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest">Experience</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'workExperience')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      
      <div class="space-y-10">
        <div v-for="(job, index) in resume.workExperience" :key="index">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900">{{ job.jobTitle }}</h3>
              <p class="text-gray-600">{{ job.company }}<span v-if="job.location">, {{ job.location }}</span></p>
            </div>
            <span class="text-sm text-gray-500 font-light">
              {{ job.startDate }} — {{ job.endDate || 'Present' }}
            </span>
          </div>
          
          <ul class="space-y-3 text-gray-700">
            <li 
              v-for="(achievement, achievementIndex) in job.achievements" 
              :key="achievementIndex" 
              class="flex items-start relative group"
              :class="{ 'cursor-move bg-gray-50 rounded px-2 py-1': editMode }"
              :draggable="editMode"
              @dragstart="onDragStart($event, index, achievementIndex)"
              @dragover.prevent
              @drop="onDrop($event, index, achievementIndex)"
              @dragenter.prevent
            >
              <div class="flex items-start w-full">
                <svg 
                  v-if="editMode" 
                  class="w-3 h-3 text-gray-400 mr-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                </svg>
                <span class="text-gray-400 mr-3 mt-2 flex-shrink-0">—</span>
                <span>{{ achievement }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Two Column Layout for Education and Skills -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Education -->
      <div class="relative group">
        <div class="flex items-start justify-between mb-6">
          <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest">Education</h2>
          <button
            v-if="editMode"
            @click="$emit('edit-section', 'education')"
            class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <div v-for="(edu, index) in resume.education" :key="index">
            <h3 class="text-base font-medium text-gray-900">
              {{ edu.degree }}<span v-if="edu.field">, {{ edu.field }}</span>
            </h3>
            <p class="text-gray-600">{{ edu.institution }}</p>
            <p class="text-sm text-gray-500">{{ edu.graduationYear }}</p>
            <div v-if="edu.gpa || edu.honors" class="text-sm text-gray-600 mt-1">
              <span v-if="edu.gpa">GPA: {{ edu.gpa }}</span>
              <span v-if="edu.gpa && edu.honors"> • </span>
              <span v-if="edu.honors">{{ edu.honors }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="relative group">
        <div class="flex items-start justify-between mb-6">
          <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest">Skills</h2>
          <button
            v-if="editMode"
            @click="$emit('edit-section', 'skills')"
            class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div v-if="resume.skills?.technical && resume.skills.technical.length">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Technical</h3>
            <p class="text-gray-700">{{ resume.skills.technical.join(', ') }}</p>
          </div>
          
          <div v-if="resume.skills?.tools && resume.skills.tools.length">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Tools & Platforms</h3>
            <p class="text-gray-700">{{ resume.skills.tools.join(', ') }}</p>
          </div>
          
          <div v-if="resume.skills?.soft && resume.skills.soft.length">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Core Competencies</h3>
            <p class="text-gray-700">{{ resume.skills.soft.join(', ') }}</p>
          </div>
          
          <div v-if="resume.skills?.languages && resume.skills.languages.length">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Languages</h3>
            <p class="text-gray-700">{{ resume.skills.languages.join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Certifications -->
    <div v-if="resume.certifications && resume.certifications.length" class="mt-12 relative group">
      <div class="flex items-start justify-between mb-6">
        <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest">Certifications</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'certifications')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      
      <div class="space-y-4">
        <div v-for="(cert, index) in resume.certifications" :key="index" class="flex justify-between items-start">
          <div>
            <h3 class="text-base font-medium text-gray-900">{{ cert.name }}</h3>
            <p class="text-gray-600">{{ cert.issuer }}</p>
          </div>
          <div class="text-right text-sm text-gray-500">
            <div v-if="cert.date">{{ cert.date }}</div>
            <div v-if="cert.expirationDate" class="text-xs">Expires: {{ cert.expirationDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Projects -->
    <div v-if="resume.projects && resume.projects.length" class="mt-12 relative group">
      <div class="flex items-start justify-between mb-6">
        <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest">Projects</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'projects')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      
      <div class="space-y-6">
        <div v-for="(project, index) in resume.projects" :key="index">
          <h3 class="text-base font-medium text-gray-900 mb-2">{{ project.name }}</h3>
          <p class="text-gray-700 mb-2">{{ project.description }}</p>
          <div v-if="project.technologies && project.technologies.length" class="text-sm text-gray-600 mb-1">
            <span class="font-medium">Technologies:</span> {{ project.technologies.join(', ') }}
          </div>
          <div v-if="project.link" class="text-sm text-gray-600">
            <span class="font-medium">Link:</span> {{ project.link }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  resume: {
    type: Object,
    required: true
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit-section', 'reorder-accomplishments'])

// Drag and drop state
const dragData = ref(null)

const onDragStart = (event, jobIndex, achievementIndex) => {
  dragData.value = { jobIndex, achievementIndex }
  event.dataTransfer.effectAllowed = 'move'
}

const onDrop = (event, jobIndex, achievementIndex) => {
  event.preventDefault()
  
  if (!dragData.value || dragData.value.jobIndex !== jobIndex) {
    return
  }
  
  const oldIndex = dragData.value.achievementIndex
  const newIndex = achievementIndex
  
  if (oldIndex !== newIndex) {
    emit('reorder-accomplishments', jobIndex, oldIndex, newIndex)
  }
  
  dragData.value = null
}
</script>

<style scoped>
/* PDF-optimized styles */
@media print {
  #resume-template-minimal {
    margin: 0;
    padding: 0.5in;
    box-shadow: none;
    page-break-inside: avoid;
  }
  
  .border-b {
    border-bottom: 1px solid #333 !important;
  }
}

/* Ensure consistent spacing */
.space-y-10 > * + * {
  margin-top: 2.5rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}
</style>
