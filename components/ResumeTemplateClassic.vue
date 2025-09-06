<template>
  <div id="resume-template" class="bg-white p-8 max-w-4xl mx-auto shadow-lg" style="font-family: 'Times New Roman', serif; line-height: 1.4;">
    <!-- Header -->
    <div class="text-center mb-6 border-b-2 border-gray-300 pb-4 relative group">
      <button
        v-if="editMode"
        @click="$emit('edit-section', 'personalInfo')"
        class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      </button>
      <h1 class="text-3xl font-bold mb-2 text-gray-900">{{ resume.personalInfo?.fullName }}</h1>
      <div class="text-sm text-gray-700 space-y-1">
        <div class="flex justify-center items-center space-x-4 flex-wrap">
          <span>{{ resume.personalInfo?.email }}</span>
          <span>•</span>
          <span>{{ resume.personalInfo?.phone }}</span>
          <span v-if="resume.personalInfo?.location">•</span>
          <span v-if="resume.personalInfo?.location">{{ resume.personalInfo.location }}</span>
        </div>
        <div v-if="resume.personalInfo?.linkedin || resume.personalInfo?.website" class="flex justify-center items-center space-x-4 flex-wrap">
          <span v-if="resume.personalInfo?.linkedin">{{ resume.personalInfo.linkedin }}</span>
          <span v-if="resume.personalInfo?.linkedin && resume.personalInfo?.website">•</span>
          <span v-if="resume.personalInfo?.website">{{ resume.personalInfo.website }}</span>
        </div>
      </div>
    </div>

    <!-- Professional Summary -->
    <div class="mb-6 relative group">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1">PROFESSIONAL SUMMARY</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'professionalSummary')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      <p class="text-sm leading-relaxed text-gray-800">{{ resume.professionalSummary }}</p>
    </div>

    <!-- Work Experience -->
    <div class="mb-6 relative group">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1">WORK EXPERIENCE</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'workExperience')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      <div v-for="(job, index) in resume.workExperience" :key="index" class="mb-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-bold text-sm text-gray-900">{{ job.jobTitle }}</h3>
            <p class="text-sm text-gray-800">{{ job.company }}<span v-if="job.location">, {{ job.location }}</span></p>
          </div>
          <div class="text-sm text-gray-700 text-right">
            {{ job.startDate }} - {{ job.endDate || 'Present' }}
          </div>
        </div>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li 
            v-for="(achievement, achievementIndex) in job.achievements" 
            :key="achievementIndex" 
            class="text-sm text-gray-800 relative group"
            :class="{ 'cursor-move bg-gray-50 rounded px-2 py-1': editMode }"
            :draggable="editMode"
            @dragstart="onDragStart($event, index, achievementIndex)"
            @dragover.prevent
            @drop="onDrop($event, index, achievementIndex)"
            @dragenter.prevent
          >
            <div class="flex items-center">
              <svg 
                v-if="editMode" 
                class="w-3 h-3 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
              <span>{{ achievement }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Education -->
    <div class="mb-6 relative group">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1">EDUCATION</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'education')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      <div v-for="(edu, index) in resume.education" :key="index" class="mb-3">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-sm text-gray-900">
              {{ edu.degree }}<span v-if="edu.field">, {{ edu.field }}</span>
            </h3>
            <p class="text-sm text-gray-800">{{ edu.institution }}</p>
            <p v-if="edu.gpa || edu.honors" class="text-sm text-gray-700">
              <span v-if="edu.gpa">GPA: {{ edu.gpa }}</span>
              <span v-if="edu.gpa && edu.honors"> • </span>
              <span v-if="edu.honors">{{ edu.honors }}</span>
            </p>
          </div>
          <div v-if="edu.graduationYear" class="text-sm text-gray-700">
            {{ edu.graduationYear }}
          </div>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div class="mb-6 relative group">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1">SKILLS</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'skills')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-1 gap-2">
        <div v-if="resume.skills?.technical && resume.skills.technical.length" class="mb-2">
          <span class="font-semibold text-sm text-gray-900">Technical: </span>
          <span class="text-sm text-gray-800">{{ resume.skills.technical.join(', ') }}</span>
        </div>
        <div v-if="resume.skills?.tools && resume.skills.tools.length" class="mb-2">
          <span class="font-semibold text-sm text-gray-900">Tools & Platforms: </span>
          <span class="text-sm text-gray-800">{{ resume.skills.tools.join(', ') }}</span>
        </div>
        <div v-if="resume.skills?.soft && resume.skills.soft.length" class="mb-2">
          <span class="font-semibold text-sm text-gray-900">Core Competencies: </span>
          <span class="text-sm text-gray-800">{{ resume.skills.soft.join(', ') }}</span>
        </div>
        <div v-if="resume.skills?.languages && resume.skills.languages.length" class="mb-2">
          <span class="font-semibold text-sm text-gray-900">Languages: </span>
          <span class="text-sm text-gray-800">{{ resume.skills.languages.join(', ') }}</span>
        </div>
      </div>
    </div>

    <!-- Certifications -->
    <div v-if="resume.certifications && resume.certifications.length" class="mb-6 relative group">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1">CERTIFICATIONS</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'certifications')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      <div v-for="(cert, index) in resume.certifications" :key="index" class="mb-2">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-sm text-gray-900">{{ cert.name }}</h3>
            <p class="text-sm text-gray-800">{{ cert.issuer }}</p>
          </div>
          <div class="text-sm text-gray-700 text-right">
            <div v-if="cert.date">{{ cert.date }}</div>
            <div v-if="cert.expirationDate" class="text-xs">Expires: {{ cert.expirationDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Projects -->
    <div v-if="resume.projects && resume.projects.length" class="mb-6 relative group">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1">PROJECTS</h2>
        <button
          v-if="editMode"
          @click="$emit('edit-section', 'projects')"
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
        </button>
      </div>
      <div v-for="(project, index) in resume.projects" :key="index" class="mb-3">
        <h3 class="font-bold text-sm text-gray-900">{{ project.name }}</h3>
        <p class="text-sm text-gray-800 mb-1">{{ project.description }}</p>
        <div v-if="project.technologies && project.technologies.length" class="text-sm text-gray-700 mb-1">
          <span class="font-semibold">Technologies: </span>{{ project.technologies.join(', ') }}
        </div>
        <div v-if="project.link" class="text-sm text-gray-700">
          <span class="font-semibold">Link: </span>{{ project.link }}
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
  #resume-template {
    margin: 0;
    padding: 0.5in;
    box-shadow: none;
    page-break-inside: avoid;
  }
  
  .border-b-2 {
    border-bottom: 2px solid #333 !important;
  }
  
  .border-b {
    border-bottom: 1px solid #666 !important;
  }
}

/* Ensure consistent spacing */
.list-disc li {
  margin-bottom: 0.25rem;
}
</style>
