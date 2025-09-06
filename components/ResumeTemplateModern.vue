<template>
  <div id="resume-template-modern" class="bg-white max-w-4xl mx-auto shadow-lg overflow-hidden" style="font-family: 'Inter', 'Segoe UI', sans-serif; line-height: 1.5;">
    <!-- Header with Color Background -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 relative group">
      <button
        v-if="editMode"
        @click="$emit('edit-section', 'personalInfo')"
        class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg text-xs backdrop-blur-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      </button>
      
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-4 md:mb-0">
          <h1 class="text-4xl font-bold mb-2">{{ resume.personalInfo?.fullName }}</h1>
          <div class="flex flex-wrap gap-4 text-blue-100">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span>{{ resume.personalInfo?.email }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span>{{ resume.personalInfo?.phone }}</span>
            </div>
            <div v-if="resume.personalInfo?.location" class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span>{{ resume.personalInfo?.location }}</span>
            </div>
          </div>
          <div v-if="resume.personalInfo?.linkedin || resume.personalInfo?.website" class="flex flex-wrap gap-4 text-blue-100 mt-2">
            <div v-if="resume.personalInfo?.linkedin" class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"/>
              </svg>
              <span class="truncate">{{ resume.personalInfo?.linkedin }}</span>
            </div>
            <div v-if="resume.personalInfo?.website" class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span class="truncate">{{ resume.personalInfo?.website }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <!-- Professional Summary -->
      <div class="mb-8 relative group">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
            PROFESSIONAL SUMMARY
          </h2>
          <button
            v-if="editMode"
            @click="$emit('edit-section', 'professionalSummary')"
            class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </div>
        <p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
          {{ resume.professionalSummary }}
        </p>
      </div>

      <!-- Work Experience -->
      <div class="mb-8 relative group">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
            WORK EXPERIENCE
          </h2>
          <button
            v-if="editMode"
            @click="$emit('edit-section', 'workExperience')"
            class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
          <div v-for="(job, index) in resume.workExperience" :key="index" class="relative pl-8 pb-6">
            <!-- Timeline dot -->
            <div class="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
            <!-- Timeline line -->
            <div class="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200"></div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-1">{{ job.jobTitle }}</h3>
                  <p class="text-lg text-blue-600 font-medium">{{ job.company }}</p>
                  <p v-if="job.location" class="text-gray-600">{{ job.location }}</p>
                </div>
                <div class="text-right">
                  <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {{ job.startDate }} - {{ job.endDate || 'Present' }}
                  </span>
                </div>
              </div>
              
              <ul class="space-y-2">
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
                      class="w-4 h-4 text-gray-400 mr-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                    </svg>
                    <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span class="text-gray-700">{{ achievement }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="mb-8 relative group">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
            EDUCATION
          </h2>
          <button
            v-if="editMode"
            @click="$emit('edit-section', 'education')"
            class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(edu, index) in resume.education" :key="index" class="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600">
            <h3 class="text-lg font-bold text-gray-900 mb-2">
              {{ edu.degree }}<span v-if="edu.field">, {{ edu.field }}</span>
            </h3>
            <p class="text-blue-600 font-medium mb-1">{{ edu.institution }}</p>
            <p class="text-gray-600 text-sm mb-2">{{ edu.graduationYear }}</p>
            <div v-if="edu.gpa || edu.honors" class="text-sm text-gray-700">
              <span v-if="edu.gpa" class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">GPA: {{ edu.gpa }}</span>
              <span v-if="edu.honors" class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">{{ edu.honors }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="mb-8 relative group">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
            SKILLS
          </h2>
          <button
            v-if="editMode"
            @click="$emit('edit-section', 'skills')"
            class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="resume.skills?.technical && resume.skills.technical.length" class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              Technical Skills
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in resume.skills.technical" :key="skill" 
                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {{ skill }}
              </span>
            </div>
          </div>
          
          <div v-if="resume.skills?.tools && resume.skills.tools.length" class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              Tools & Platforms
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tool in resume.skills.tools" :key="tool" 
                    class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {{ tool }}
              </span>
            </div>
          </div>
          
          <div v-if="resume.skills?.soft && resume.skills.soft.length" class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              Core Competencies
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in resume.skills.soft" :key="skill" 
                    class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {{ skill }}
              </span>
            </div>
          </div>
          
          <div v-if="resume.skills?.languages && resume.skills.languages.length" class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3V3a1 1 0 112 0v1h3V3a1 1 0 112 0v1h1a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zM4 6h12v8H4V6z" clip-rule="evenodd"/>
              </svg>
              Languages
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="language in resume.skills.languages" :key="language" 
                    class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {{ language }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div v-if="resume.certifications && resume.certifications.length" class="mb-8 relative group">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
            CERTIFICATIONS
          </h2>
          <button
            v-if="editMode"
            @click="$emit('edit-section', 'certifications')"
            class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(cert, index) in resume.certifications" :key="index" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 mb-1">{{ cert.name }}</h3>
                <p class="text-blue-600 font-medium">{{ cert.issuer }}</p>
              </div>
              <div class="text-right">
                <div v-if="cert.date" class="text-sm text-gray-600">{{ cert.date }}</div>
                <div v-if="cert.expirationDate" class="text-xs text-gray-500">Expires: {{ cert.expirationDate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="resume.projects && resume.projects.length" class="mb-8 relative group">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <div class="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
            PROJECTS
          </h2>
          <button
            v-if="editMode"
            @click="$emit('edit-section', 'projects')"
            class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(project, index) in resume.projects" :key="index" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ project.name }}</h3>
            <p class="text-gray-700 mb-4">{{ project.description }}</p>
            <div v-if="project.technologies && project.technologies.length" class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.technologies" :key="tech" 
                      class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {{ tech }}
                </span>
              </div>
            </div>
            <div v-if="project.link" class="text-sm">
              <a :href="project.link" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                View Project →
              </a>
            </div>
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
  #resume-template-modern {
    margin: 0;
    padding: 0;
    box-shadow: none;
    page-break-inside: avoid;
  }
  
  .bg-gradient-to-r {
    background: #2563eb !important;
  }
  
  .border-l-4 {
    border-left: 4px solid #2563eb !important;
  }
}
</style>
