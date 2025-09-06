<template>
     <div class="cover-letter-classic bg-white min-h-screen">
     <!-- Header Section -->
     <div class="bg-gray-100 text-gray-900 p-8 border-b border-gray-200">
       <div class="max-w-4xl mx-auto">
         <div class="flex items-center justify-between">
           <div>
             <h1 class="text-3xl font-bold mb-2">{{ resumeData.personalInfo.fullName }}</h1>
             <p class="text-gray-600 text-lg">{{ resumeData.personalInfo.title || 'Professional' }}</p>
             <div class="flex items-center space-x-4 mt-3 text-gray-600">
               <div v-if="resumeData.personalInfo.email" class="flex items-center">
                 <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                 </svg>
                 {{ resumeData.personalInfo.email }}
               </div>
               <div v-if="resumeData.personalInfo.phone" class="flex items-center">
                 <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                 </svg>
                 {{ resumeData.personalInfo.phone }}
               </div>
               <div v-if="resumeData.personalInfo.location" class="flex items-center">
                 <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                 </svg>
                 {{ resumeData.personalInfo.location }}
               </div>
             </div>
           </div>
           <div class="text-right">
             <div class="text-2xl font-bold">{{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
           </div>
         </div>
       </div>
     </div>

           <!-- Main Content -->
      <div class="max-w-4xl mx-auto p-8">
        <!-- Row 1: Cover Letter + Experience/Match Score -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <!-- Cover Letter -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div class="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                Cover Letter
              </h2>
              <div class="prose prose-lg max-w-none">
                <div class="whitespace-pre-line text-gray-800 leading-relaxed">{{ coverLetterData.coverLetterText }}</div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Match Score -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4 text-center">Role Alignment</h3>
              <div class="flex justify-center mb-4">
                <div class="relative inline-flex items-center justify-center w-20 h-20">
                  <svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      stroke-width="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      stroke-width="2"
                      stroke-linecap="round"
                      :stroke-dasharray="`${coverLetterData.alignmentScore || 0}, 100`"
                    />
                  </svg>
                  <span class="absolute text-lg font-bold text-gray-900">{{ coverLetterData.alignmentScore || 0 }}%</span>
                </div>
              </div>
              <p class="text-sm text-gray-600 text-center">{{ getAlignmentDescription(coverLetterData.alignmentScore) }}</p>
            </div>

            <!-- Experience Highlights -->
            <div v-if="coverLetterData.companyHighlights && coverLetterData.companyHighlights.length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <div class="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-3"></div>
                Experience Highlights
              </h3>
              
              <div class="space-y-4">
                <div
                  v-for="(company, index) in coverLetterData.companyHighlights"
                  :key="index"
                  class="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <!-- Company Name -->
                  <h4 class="font-bold text-lg text-gray-900 mb-3 text-center">{{ company.companyName }}</h4>
                  
                  <!-- Achievement -->
                  <p class="text-sm text-gray-700">{{ company.keyAchievements[0] }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: Key Skills (Full Width) -->
        <div v-if="coverLetterData.alignedSkills && coverLetterData.alignedSkills.length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div class="w-2 h-6 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-full mr-3"></div>
            Key Skills Match
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(skill, index) in coverLetterData.alignedSkills"
              :key="index"
              class="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center min-h-[80px]"
            >
              <span class="font-semibold text-gray-900 text-center">{{ skill.skillName }}</span>
            </div>
          </div>
        </div>
      </div>

     
   </div>
 </template>

<script setup>
defineProps({
  coverLetterData: {
    type: Object,
    required: true
  },
  resumeData: {
    type: Object,
    required: true
  }
});

const getAlignmentDescription = (score) => {
  if (score >= 90) return 'Excellent alignment! Your cover letter is highly relevant to the job requirements.';
  if (score >= 70) return 'Good alignment. Your cover letter covers the key aspects of the job description.';
  if (score >= 50) return 'Moderate alignment. Your cover letter touches on some but not all job requirements.';
  return 'Poor alignment. Your cover letter needs significant improvement to match the job description.';
};
</script>

<style scoped>
.cover-letter-classic {
  font-family: 'Georgia', 'Times New Roman', serif;
}

.prose {
  line-height: 1.6;
}

.prose p {
  margin-bottom: 1rem;
}

.prose p:last-child {
  margin-bottom: 0;
}
</style>
