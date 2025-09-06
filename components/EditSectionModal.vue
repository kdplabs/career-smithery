<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Edit {{ sectionTitle }}</h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <!-- Personal Info Editor -->
        <div v-if="section === 'personalInfo' && localEditData" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input v-model="localEditData.fullName" type="text" class="input-field" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input v-model="localEditData.email" type="email" class="input-field" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input v-model="localEditData.phone" type="tel" class="input-field" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input v-model="localEditData.location" type="text" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input v-model="localEditData.linkedin" type="url" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input v-model="localEditData.website" type="url" class="input-field">
            </div>
          </div>
        </div>

        <!-- Professional Summary Editor -->
        <div v-else-if="section === 'professionalSummary' && localEditData !== null" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
            <textarea 
              v-model="localEditData"
              rows="6"
              class="textarea-field"
              placeholder="Write a compelling professional summary..."
            ></textarea>
            <p class="text-sm text-gray-500 mt-1">
              Keep it concise (2-3 sentences) and highlight your key strengths and career objectives.
            </p>
          </div>
        </div>

        <!-- Work Experience Editor -->
        <div v-else-if="section === 'workExperience' && localEditData" class="space-y-6">
          <div v-for="(job, index) in localEditData" :key="index" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-medium text-gray-900">Position {{ index + 1 }}</h4>
              <button
                v-if="localEditData.length > 1"
                @click="removeJob(index)"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input v-model="job.jobTitle" type="text" class="input-field" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                <input v-model="job.company" type="text" class="input-field" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input v-model="job.location" type="text" class="input-field">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input v-model="job.startDate" type="text" class="input-field" placeholder="e.g., January 2020" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input v-model="job.endDate" type="text" class="input-field" placeholder="e.g., Present or December 2023">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
              <div class="space-y-2">
                <div v-for="(achievement, achievementIndex) in job.achievements" :key="achievementIndex" class="flex gap-2">
                  <input v-model="job.achievements[achievementIndex]" type="text" class="input-field flex-1" placeholder="Describe an achievement...">
                  <button
                    @click="removeAchievement(index, achievementIndex)"
                    class="text-red-600 hover:text-red-800 px-2 py-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
                <button
                  @click="addAchievement(index)"
                  class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add Achievement
                </button>
              </div>
            </div>
          </div>
          
          <button
            @click="addJob"
            class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add Position
          </button>
        </div>

        <!-- Education Editor -->
        <div v-else-if="section === 'education' && localEditData" class="space-y-6">
          <div v-for="(edu, index) in localEditData" :key="index" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-medium text-gray-900">Education {{ index + 1 }}</h4>
              <button
                v-if="localEditData.length > 1"
                @click="removeEducation(index)"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                <input v-model="edu.degree" type="text" class="input-field" placeholder="e.g., Bachelor of Science" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                <input v-model="edu.field" type="text" class="input-field" placeholder="e.g., Computer Science">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                <input v-model="edu.institution" type="text" class="input-field" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                <input v-model="edu.graduationYear" type="text" class="input-field" placeholder="e.g., 2020">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                <input v-model="edu.gpa" type="text" class="input-field" placeholder="e.g., 3.8">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Honors</label>
                <input v-model="edu.honors" type="text" class="input-field" placeholder="e.g., Magna Cum Laude">
              </div>
            </div>
          </div>
          
          <button
            @click="addEducation"
            class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add Education
          </button>
        </div>

        <!-- Skills Editor -->
        <div v-else-if="section === 'skills' && localEditData" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
              <div class="space-y-2">
                <div v-for="(skill, index) in localEditData.technical" :key="index" class="flex gap-2">
                  <input v-model="localEditData.technical[index]" type="text" class="input-field flex-1" placeholder="e.g., JavaScript">
                  <button
                    @click="removeSkill('technical', index)"
                    class="text-red-600 hover:text-red-800 px-2 py-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
                <button
                  @click="addSkill('technical')"
                  class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add Technical Skill
                </button>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tools & Platforms</label>
              <div class="space-y-2">
                <div v-for="(tool, index) in localEditData.tools" :key="index" class="flex gap-2">
                  <input v-model="localEditData.tools[index]" type="text" class="input-field flex-1" placeholder="e.g., Git">
                  <button
                    @click="removeSkill('tools', index)"
                    class="text-red-600 hover:text-red-800 px-2 py-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
                <button
                  @click="addSkill('tools')"
                  class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add Tool
                </button>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Core Competencies</label>
              <div class="space-y-2">
                <div v-for="(skill, index) in localEditData.soft" :key="index" class="flex gap-2">
                  <input v-model="localEditData.soft[index]" type="text" class="input-field flex-1" placeholder="e.g., Leadership">
                  <button
                    @click="removeSkill('soft', index)"
                    class="text-red-600 hover:text-red-800 px-2 py-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
                <button
                  @click="addSkill('soft')"
                  class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add Competency
                </button>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Languages</label>
              <div class="space-y-2">
                <div v-for="(language, index) in localEditData.languages" :key="index" class="flex gap-2">
                  <input v-model="localEditData.languages[index]" type="text" class="input-field flex-1" placeholder="e.g., Spanish">
                  <button
                    @click="removeSkill('languages', index)"
                    class="text-red-600 hover:text-red-800 px-2 py-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
                <button
                  @click="addSkill('languages')"
                  class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add Language
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications Editor -->
        <div v-else-if="section === 'certifications' && localEditData" class="space-y-6">
          <div v-for="(cert, index) in localEditData" :key="index" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-medium text-gray-900">Certification {{ index + 1 }}</h4>
              <button
                @click="removeCertification(index)"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Certification Name *</label>
                <input v-model="cert.name" type="text" class="input-field" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Issuing Organization *</label>
                <input v-model="cert.issuer" type="text" class="input-field" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date Earned</label>
                <input v-model="cert.date" type="text" class="input-field" placeholder="e.g., January 2023">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                <input v-model="cert.expirationDate" type="text" class="input-field" placeholder="e.g., January 2026">
              </div>
            </div>
          </div>
          
          <button
            @click="addCertification"
            class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add Certification
          </button>
        </div>

        <!-- Projects Editor -->
        <div v-else-if="section === 'projects' && localEditData" class="space-y-6">
          <div v-for="(project, index) in localEditData" :key="index" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-medium text-gray-900">Project {{ index + 1 }}</h4>
              <button
                @click="removeProject(index)"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                <input v-model="project.name" type="text" class="input-field" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea v-model="project.description" rows="3" class="textarea-field" required></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                <input v-model="project.technologiesInput" type="text" class="input-field" placeholder="e.g., React, Node.js, MongoDB (comma-separated)">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                <input v-model="project.link" type="url" class="input-field" placeholder="https://...">
              </div>
            </div>
          </div>
          
          <button
            @click="addProject"
            class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add Project
          </button>
        </div>

        <!-- Cover Letter Text Editor -->
        <div v-else-if="section === 'coverLetterText' && localEditData !== null" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cover Letter Content</label>
            <textarea 
              v-model="localEditData"
              rows="12"
              class="textarea-field"
              placeholder="Write your personalized cover letter content..."
            ></textarea>
            <p class="text-sm text-gray-500 mt-1">
              Keep it professional and tailored to the specific job. Aim for 2-3 paragraphs that connect your experience to the role requirements.
            </p>
          </div>
        </div>

        <!-- Company Highlights Editor -->
        <div v-else-if="section === 'companyHighlights' && localEditData" class="space-y-6">
          <div v-for="(company, index) in localEditData" :key="index" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-medium text-gray-900">Company {{ index + 1 }}</h4>
              <button
                v-if="localEditData.length > 1"
                @click="removeCompany(index)"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input v-model="company.companyName" type="text" class="input-field" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Key Achievements</label>
                <div class="space-y-2">
                  <div v-for="(achievement, achIndex) in company.keyAchievements" :key="achIndex" class="flex items-center space-x-2">
                    <textarea
                      v-model="company.keyAchievements[achIndex]"
                      rows="2"
                      class="textarea-field flex-1"
                      placeholder="Describe a key achievement at this company..."
                    ></textarea>
                    <button
                      v-if="company.keyAchievements.length > 1"
                      @click="removeCompanyAchievement(index, achIndex)"
                      class="text-red-600 hover:text-red-800 p-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                  <button
                    @click="addCompanyAchievement(index)"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Achievement
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            @click="addCompany"
            class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            + Add Company
          </button>
        </div>

        <!-- Aligned Skills Editor -->
        <div v-else-if="section === 'alignedSkills' && localEditData" class="space-y-6">
          <div v-for="(skill, index) in localEditData" :key="index" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-medium text-gray-900">Skill {{ index + 1 }}</h4>
                             <button
                 v-if="localEditData.length > 1"
                 @click="removeAlignedSkill(index)"
                 class="text-red-600 hover:text-red-800 text-sm"
               >
                Remove
              </button>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Skill Name *</label>
                <input v-model="skill.skillName" type="text" class="input-field" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Relevance Description</label>
                <textarea
                  v-model="skill.relevance"
                  rows="3"
                  class="textarea-field"
                  placeholder="Describe how this skill is relevant to the job..."
                ></textarea>
              </div>
            </div>
          </div>

                     <button
             @click="addAlignedSkill"
             class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
           >
            + Add Skill
          </button>
        </div>
      </div>

      <div class="p-6 border-t border-gray-200 flex justify-end gap-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="saveChanges"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  section: {
    type: String,
    default: ''
  },
  editData: {
    type: [Object, Array, String],
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

// Create a local reactive copy of the editData prop
const localEditData = ref(null)

// Watch for changes in the editData prop and update localEditData
watch(() => props.editData, (newData) => {
  if (newData !== null) {
    // Create a deep copy of the data
    localEditData.value = JSON.parse(JSON.stringify(newData))
  } else {
    localEditData.value = null
  }
}, { immediate: true })

const sectionTitle = computed(() => {
  const titles = {
    personalInfo: 'Personal Information',
    professionalSummary: 'Professional Summary',
    workExperience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    certifications: 'Certifications',
    projects: 'Projects',
    coverLetterText: 'Cover Letter Content',
    companyHighlights: 'Experience Highlights',
    alignedSkills: 'Key Skills Match'
  }
  return titles[props.section] || props.section
})

const closeModal = () => {
  emit('close')
}

const saveChanges = () => {
  // Process projects technologies input
  if (props.section === 'projects' && localEditData.value) {
    localEditData.value.forEach(project => {
      if (project.technologiesInput) {
        project.technologies = project.technologiesInput.split(',').map(tech => tech.trim()).filter(tech => tech)
        delete project.technologiesInput
      }
    })
  }
  
  emit('save', localEditData.value)
}

// Work Experience methods
const addJob = () => {
  if (localEditData.value) {
    localEditData.value.push({
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      achievements: ['']
    })
  }
}

const removeJob = (index) => {
  if (localEditData.value && localEditData.value.length > 1) {
    localEditData.value.splice(index, 1)
  }
}

const addAchievement = (jobIndex) => {
  if (localEditData.value && localEditData.value[jobIndex]) {
    localEditData.value[jobIndex].achievements.push('')
  }
}

const removeAchievement = (jobIndex, achievementIndex) => {
  if (localEditData.value && localEditData.value[jobIndex] && localEditData.value[jobIndex].achievements.length > 1) {
    localEditData.value[jobIndex].achievements.splice(achievementIndex, 1)
  }
}

// Education methods
const addEducation = () => {
  if (localEditData.value) {
    localEditData.value.push({
      degree: '',
      field: '',
      institution: '',
      graduationYear: '',
      gpa: '',
      honors: ''
    })
  }
}

const removeEducation = (index) => {
  if (localEditData.value && localEditData.value.length > 1) {
    localEditData.value.splice(index, 1)
  }
}

// Skills methods
const addSkill = (category) => {
  if (localEditData.value && localEditData.value[category]) {
    localEditData.value[category].push('')
  }
}

const removeSkill = (category, index) => {
  if (localEditData.value && localEditData.value[category]) {
    localEditData.value[category].splice(index, 1)
  }
}

// Certifications methods
const addCertification = () => {
  if (localEditData.value) {
    localEditData.value.push({
      name: '',
      issuer: '',
      date: '',
      expirationDate: ''
    })
  }
}

const removeCertification = (index) => {
  if (localEditData.value) {
    localEditData.value.splice(index, 1)
  }
}

// Projects methods
const addProject = () => {
  if (localEditData.value) {
    localEditData.value.push({
      name: '',
      description: '',
      technologies: [],
      technologiesInput: '',
      link: ''
    })
  }
}

const removeProject = (index) => {
  if (localEditData.value) {
    localEditData.value.splice(index, 1)
  }
}

// Cover Letter methods
const addCompany = () => {
  if (localEditData.value) {
    localEditData.value.push({
      companyName: '',
      keyAchievements: ['']
    })
  }
}

const removeCompany = (index) => {
  if (localEditData.value && localEditData.value.length > 1) {
    localEditData.value.splice(index, 1)
  }
}

const addCompanyAchievement = (companyIndex) => {
  if (localEditData.value && localEditData.value[companyIndex]) {
    localEditData.value[companyIndex].keyAchievements.push('')
  }
}

const removeCompanyAchievement = (companyIndex, achievementIndex) => {
  if (localEditData.value && localEditData.value[companyIndex] && localEditData.value[companyIndex].keyAchievements.length > 1) {
    localEditData.value[companyIndex].keyAchievements.splice(achievementIndex, 1)
  }
}

// Aligned Skills methods
const addAlignedSkill = () => {
  if (localEditData.value) {
    localEditData.value.push({
      skillName: '',
      relevance: ''
    })
  }
}

const removeAlignedSkill = (index) => {
  if (localEditData.value && localEditData.value.length > 1) {
    localEditData.value.splice(index, 1)
  }
}
</script>

<style scoped>
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.textarea-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y;
}
</style>
