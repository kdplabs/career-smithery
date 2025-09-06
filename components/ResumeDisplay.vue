<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="border-b border-gray-200 pb-4 mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ resume.personalInfo?.fullName || 'Resume' }}</h2>
      <div class="text-gray-600 space-y-1">
        <div v-if="resume.personalInfo?.email">{{ resume.personalInfo.email }}</div>
        <div v-if="resume.personalInfo?.phone">{{ resume.personalInfo.phone }}</div>
        <div v-if="resume.personalInfo?.location">{{ resume.personalInfo.location }}</div>
        <div v-if="resume.personalInfo?.linkedin" class="text-blue-600">
          <a :href="resume.personalInfo.linkedin" target="_blank" class="hover:underline">
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>

    <!-- Professional Summary -->
    <div v-if="resume.professionalSummary" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h3>
      <p class="text-gray-700 leading-relaxed">{{ resume.professionalSummary }}</p>
    </div>

    <!-- Work Experience -->
    <div v-if="resume.workExperience && resume.workExperience.length > 0" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Work Experience</h3>
      <div class="space-y-4">
        <div v-for="(job, index) in resume.workExperience" :key="index" class="border-l-4 border-blue-500 pl-4">
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-semibold text-gray-900">{{ job.jobTitle }}</h4>
            <span class="text-sm text-gray-500">{{ job.startDate }} - {{ job.endDate || 'Present' }}</span>
          </div>
          <div class="text-gray-700 mb-2">{{ job.company }}{{ job.location ? `, ${job.location}` : '' }}</div>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li v-for="(achievement, achievementIndex) in job.achievements" :key="achievementIndex">
              {{ achievement }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div v-if="resume.education && resume.education.length > 0" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Education</h3>
      <div class="space-y-3">
        <div v-for="(edu, index) in resume.education" :key="index" class="border-l-4 border-green-500 pl-4">
          <div class="flex justify-between items-start mb-1">
            <h4 class="font-semibold text-gray-900">{{ edu.degree }}{{ edu.field ? ` in ${edu.field}` : '' }}</h4>
            <span class="text-sm text-gray-500">{{ edu.graduationYear }}</span>
          </div>
          <div class="text-gray-700">{{ edu.institution }}</div>
          <div v-if="edu.gpa || edu.honors" class="text-sm text-gray-600">
            {{ edu.gpa ? `GPA: ${edu.gpa}` : '' }}{{ edu.gpa && edu.honors ? ' | ' : '' }}{{ edu.honors || '' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div v-if="resume.skills" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-if="resume.skills.technical && resume.skills.technical.length > 0">
          <h4 class="font-medium text-gray-800 mb-2">Technical Skills</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in resume.skills.technical" :key="skill" 
                  class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {{ skill }}
            </span>
          </div>
        </div>
        <div v-if="resume.skills.soft && resume.skills.soft.length > 0">
          <h4 class="font-medium text-gray-800 mb-2">Soft Skills</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in resume.skills.soft" :key="skill" 
                  class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {{ skill }}
            </span>
          </div>
        </div>
        <div v-if="resume.skills.tools && resume.skills.tools.length > 0">
          <h4 class="font-medium text-gray-800 mb-2">Tools & Technologies</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="tool in resume.skills.tools" :key="tool" 
                  class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {{ tool }}
            </span>
          </div>
        </div>
        <div v-if="resume.skills.languages && resume.skills.languages.length > 0">
          <h4 class="font-medium text-gray-800 mb-2">Languages</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="language in resume.skills.languages" :key="language" 
                  class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              {{ language }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Certifications -->
    <div v-if="resume.certifications && resume.certifications.length > 0" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
      <div class="space-y-2">
        <div v-for="(cert, index) in resume.certifications" :key="index" class="flex justify-between items-center">
          <div>
            <div class="font-medium text-gray-900">{{ cert.name }}</div>
            <div class="text-sm text-gray-600">{{ cert.issuer }}</div>
          </div>
          <div class="text-sm text-gray-500">
            {{ cert.date }}{{ cert.expirationDate ? ` - ${cert.expirationDate}` : '' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Projects -->
    <div v-if="resume.projects && resume.projects.length > 0" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Projects</h3>
      <div class="space-y-4">
        <div v-for="(project, index) in resume.projects" :key="index" class="border-l-4 border-purple-500 pl-4">
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-semibold text-gray-900">{{ project.name }}</h4>
            <a v-if="project.link" :href="project.link" target="_blank" 
               class="text-blue-600 hover:underline text-sm">View Project</a>
          </div>
          <p class="text-gray-700 mb-2">{{ project.description }}</p>
          <div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-1">
            <span v-for="tech in project.technologies" :key="tech" 
                  class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Match Analysis -->
    <div v-if="resume.matchScore || resume.matchAnalysis" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Job Match Analysis</h3>
      <div v-if="resume.matchScore" class="mb-3">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-gray-700">Match Score:</span>
          <div class="flex items-center gap-2">
            <div class="w-24 bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" :style="{ width: `${resume.matchScore}%` }"></div>
            </div>
            <span class="text-sm font-semibold text-gray-900">{{ resume.matchScore }}%</span>
          </div>
        </div>
      </div>
      <div v-if="resume.matchAnalysis" class="text-gray-700">
        {{ resume.matchAnalysis }}
      </div>
    </div>

    <!-- Interview Questions -->
    <div v-if="resume.interviewQuestions && resume.interviewQuestions.length > 0" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Suggested Interview Questions</h3>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li v-for="(question, index) in resume.interviewQuestions" :key="index">
          {{ question }}
        </li>
      </ul>
    </div>

    <!-- Study Topics -->
    <div v-if="resume.studyTopics && resume.studyTopics.length > 0" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Recommended Study Topics</h3>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li v-for="(topic, index) in resume.studyTopics" :key="index">
          {{ topic }}
        </li>
      </ul>
    </div>

    <!-- Improvements -->
    <div v-if="resume.improvements && resume.improvements.length > 0" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Suggested Improvements</h3>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li v-for="(improvement, index) in resume.improvements" :key="index">
          {{ improvement }}
        </li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="border-t border-gray-200 pt-4 mt-6">
      <div class="text-sm text-gray-500">
        Generated on {{ formatDate(resume.generatedAt) }}
        <span v-if="resume.template" class="ml-2">• Template: {{ resume.template }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  resume: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
