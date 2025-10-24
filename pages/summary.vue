// NOTE: Ensure the 'user_plans' table exists in Supabase as per the schema provided in the project documentation.
<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Floating CTA Button -->
    <transition name="fade">
      <button
        v-if="showFloatingCTA"
        @click="navigateToReportWizard"
        class="fixed bottom-8 right-8 z-50 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
        style="box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);"
      >
        <Icon name="i-mdi-sparkles" class="mr-2" /> Generate Personalized Report
      </button>
    </transition>
    
    <div v-if="!assessmentSummary" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-lg text-gray-600">Loading your assessment results...</p>
      </div>
    </div>
    
    <div v-else class="space-y-6">
      <!-- Page Header with Assessment Button -->
      <div class="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-slate-800">Summary</h1>
          </div>
          <div class="flex gap-3">
            <NuxtLink 
              to="/assessment" 
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center gap-2"
            >
              <Icon name="i-heroicons-clipboard-document-list" class="w-5 h-5" />
              Take Assessment
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- First Row: 30:70 Split -->
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <!-- Profile Card (30%) -->
        <div class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-3 border border-slate-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-slate-800 ">Profile Information</h2>
            <NuxtLink to="/assessment-guide#profile-info" class="ml-2 text-blue-500 hover:text-blue-700" title="Learn more about this section">
              <Icon name="i-heroicons-information-circle" class="w-6 h-6" />
            </NuxtLink>
          </div>
          <div class="flex flex-col items-center gap-6 mb-6">
            <!-- Profile Image Upload Area -->
            <div class="relative group">
              <div 
                @click="triggerImageUpload"
                @click.stop
                class="w-28 h-28 rounded-full border-4 border-blue-400 shadow cursor-pointer relative overflow-hidden bg-blue-100 hover:bg-blue-200 transition-colors flex items-center justify-center"
                title="Click to upload profile image"
              >
                <!-- Show uploaded image if available -->
                <img 
                  v-if="profileImageUrl" 
                  :src="profileImageUrl" 
                  alt="Profile Picture" 
                  class="w-full h-full object-cover"
                />
                <!-- Show initial if no image -->
                <div 
                  v-else 
                  class="text-blue-600 text-3xl font-bold"
                >
                  {{ getInitial() }}
                </div>
                
                <!-- Upload overlay on hover -->
                <div class="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <Icon name="heroicons:camera" class="w-8 h-8 text-white" />
                </div>
              </div>
              
              <!-- Upload indicator -->
              <div v-if="uploadingImage" class="absolute inset-0 bg-blue-500 bg-opacity-75 rounded-full flex items-center justify-center">
                <Icon name="heroicons:arrow-path" class="w-6 h-6 text-white animate-spin" />
              </div>
            </div>
            
            <!-- Hidden file input -->
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            />
            
            <div class="space-y-4 w-full">
              <div>
                <p class="text-sm text-slate-500 ">Full Name</p>
                <p class="text-lg font-semibold text-slate-800 ">{{ assessmentSummary.profile.fullName }}</p>
              </div>
              <div>
                <p class="text-sm text-slate-500 ">Email</p>
                <p class="text-lg font-semibold text-slate-800 ">{{ assessmentSummary.profile.email }}</p>
              </div>
              <div>
                <p class="text-sm text-slate-500 ">Current Role</p>
                <p class="text-lg font-semibold text-slate-800 ">{{ assessmentSummary.profile.currentRole }}</p>
              </div>
              <div>
                <p class="text-sm text-slate-500 ">Years of Experience</p>
                <p class="text-lg font-semibold text-slate-800 ">{{ assessmentSummary.profile.yearsOfExperience }}</p>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm text-slate-500 ">Career Objective</p>
            <p class="text-lg font-semibold text-slate-800 ">{{ assessmentSummary.profile.careerObjective }}</p>
          </div>
          
          <!-- Image Upload Error Message -->
          <div v-if="imageUploadError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600 ">{{ imageUploadError }}</p>
          </div>
        </div>

        <!-- Career Stage and Role History Stack (70%) -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Career Stage Card -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <div class="flex items-center justify-between mb-6">
                             <h2 class="text-2xl font-bold text-slate-800 ">Career Stage</h2>
              <NuxtLink to="/assessment-guide#career-stage" class="ml-2 text-blue-500 hover:text-blue-700" title="Learn more about this section">
                <Icon name="i-heroicons-information-circle" class="w-6 h-6" />
              </NuxtLink>
            </div>
            <!-- Career Stage D3 Chevron Progression -->
            <client-only>
              <div ref="chevronContainer" class="w-full h-40"></div>
            </client-only>
            <!-- Identified Stage Card -->
            <div class="text-center mt-4">
              <div class="inline-block p-4 rounded-lg bg-blue-100 border border-blue-300 shadow-md min-w-[280px]">
                <p class="text-sm text-blue-700  mb-1 uppercase tracking-wider">Your Identified Stage</p>
                <p class="text-xl font-bold text-blue-800 ">{{ assessmentSummary.careerStageResult || assessmentSummary.careerStage }}</p>
              </div>
            </div>
          </div>

          <!-- Role History & Future Paths -->
          <div class="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <div class="flex items-center justify-between mb-6">
                             <h2 class="text-2xl font-bold text-slate-800 ">Role History & Future Paths</h2>
              <NuxtLink to="/assessment-guide#role-history" class="ml-2 text-blue-500 hover:text-blue-700" title="Learn more about this section">
                <Icon name="i-heroicons-information-circle" class="w-6 h-6" />
              </NuxtLink>
            </div>
            <div class="flex">
              <!-- Left Side: Previous Roles (30%) -->
              <div class="flex-shrink-0 w-4/12 pr-6 border-r border-slate-200 relative">
                <h3 class="text-xl font-semibold text-slate-700 mb-4 ">Your Journey So Far</h3>
                
                <!-- Vertical Line for progression -->
                <div class="absolute left-0 top-16 bottom-4 w-0.5 bg-slate-300 ml-1.5"></div>

                <div class="space-y-4 relative">
                  <!-- Current Role -->
                  <div class="flex items-start">
                    <div class="absolute left-0 mt-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow z-10 ml-0.5"></div>
                    <div class="ml-6 w-full">
                      <p class="text-sm text-slate-500 ">Current Role</p>
                      <div class="mt-1 p-3 rounded-lg bg-blue-100 border border-blue-300 shadow-sm">
                        <p class="text-md font-semibold text-blue-800 ">{{ assessmentSummary.profile.currentRole }}</p>
                        <p class="text-xs text-blue-600 ">Present</p>
                      </div>
                    </div>
                  </div>

                  <!-- Previous Roles -->
                  <div v-if="assessmentSummary.profile.previousRoles.length > 0">
                    <p class="text-sm text-slate-500  mt-5 ml-6">Previous Roles</p>
                    <div v-for="(role, index) in assessmentSummary.profile.previousRoles" :key="index" class="mt-3 flex items-start">
                      <div class="absolute left-0 mt-1.5 w-3 h-3 bg-slate-400 rounded-full border-2 border-white shadow z-10 ml-0.5"></div>
                      <div class="ml-6 w-full p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <p class="text-md font-semibold text-slate-800 ">{{ role.title }}</p>
                        <p class="text-xs text-slate-500 ">{{ role.year }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Side: Potential Career Paths (70%) -->
              <div class="flex-grow pl-8">
                <h3 class="text-xl font-semibold text-slate-700 mb-6 ">Potential Career Paths</h3>
                <div class="space-y-6">
                  <div v-if="assessmentSummary.profile.potentialPaths.length === 0" class="text-slate-500  pl-8">
                    No potential career paths defined yet.
                  </div>
                  <!-- Path Item -->
                  <div v-for="(path, index) in assessmentSummary.profile.potentialPaths" :key="index" class="flex items-start">
                    <!-- Connector Line (simplified branch) -->
                    <div class="w-8 pt-2">
                      <div class="w-full h-0.5 bg-slate-300"></div>
                    </div>
                    <!-- Path Content -->
                    <div class="flex-1 p-4 rounded-xl shadow-lg bg-white border border-slate-200 hover:shadow-md transition-shadow">
                      <p class="text-md font-semibold text-blue-700 mb-3 ">Potential Path {{ index + 1 }}</p>
                      <div class="flex space-x-3 items-stretch">
                        <!-- Future Role Card -->
                        <div class="flex-1 p-3 rounded-lg border border-slate-200 bg-slate-50 min-w-[150px]">
                          <p class="text-xs text-slate-500  uppercase tracking-wider">Future Role</p>
                          <p class="text-md font-medium text-slate-800 ">{{ path.futureRole }}</p>
                        </div>
                        <!-- Arrow Connector -->
                        <div class="flex items-center justify-center px-1">
                          <Icon name="i-ic-round-arrow-right-alt" class="text-slate-400 text-2xl" />
                        </div>
                        <!-- Long Term Role Card -->
                        <div class="flex-1 p-3 rounded-lg border border-slate-200 bg-slate-50 min-w-[150px]">
                          <p class="text-xs text-slate-500  uppercase tracking-wider">Long Term Role</p>
                          <p class="text-md font-medium text-slate-800 ">{{ path.longTermRole }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Remaining sections in grid layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Nine Box Chart -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-800 ">Nine Box Position</h2>
          <NuxtLink to="/assessment-guide#nine-box" class="ml-2 text-blue-500 hover:text-blue-700" title="Learn more about this section">
            <Icon name="i-heroicons-information-circle" class="w-6 h-6" />
          </NuxtLink>
        </div>
        <div class="w-full overflow-x-auto">
          <div class="grid grid-cols-3 grid-rows-3 gap-3 max-w-2xl mx-auto">
            <template v-for="(row, rowIdx) in nineBoxRows" :key="rowIdx">
              <template v-for="(cell, colIdx) in row" :key="colIdx">
                <div :class="[
                  'flex flex-col items-center justify-center rounded-xl p-5 min-h-[90px] min-w-[120px] border-2 transition ',
                  isNineBoxSelected(rowIdx, colIdx) 
                    ? 'bg-blue-200 text-blue-800 ring-4 ring-inset ring-blue-400 border-blue-600 scale-100 z-10'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                ]">
                  <span class="text-2xl mb-2" v-if="cell.icon"><i :class="cell.icon"></i></span>
                  <span class="font-bold text-base">{{ cell.label }}</span>
                </div>
              </template>
            </template>
          </div>
        </div>
        <div class="text-center mt-6 space-x-4 space-y-4">
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Performance: {{ assessmentSummary?.threeByThreePosition?.performance || 'Not Set' }}
          </span>
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Potential: {{ assessmentSummary?.threeByThreePosition?.potential || 'Not Set' }}
          </span>
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Engagement: {{ assessmentSummary?.threeByThreePosition?.engagement || 'Not Set' }}
          </span>
        </div>
        
        <!-- Nine Box Explanation and Recommendations -->
        <div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 class="text-xl font-bold text-blue-800 mb-3 ">Your Nine Box Position: {{ getNineBoxPositionName() }}</h3>
          <p class="text-blue-800 mb-4 ">{{ getNineBoxDescription() }}</p>
          
          <ul class="mt-2 list-disc pl-5 space-y-2 text-blue-800 ">
            <li v-for="(recommendation, index) in getNineBoxRecommendations()" :key="index">
              {{ recommendation }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Three by Three by Three Chart -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-800 ">Performance, Potential & Engagement</h2>
          <NuxtLink to="/assessment-guide#three-metrics" class="ml-2 text-blue-500 hover:text-blue-700" title="Learn more about this section">
            <Icon name="i-heroicons-information-circle" class="w-6 h-6" />
          </NuxtLink>
        </div>
        
        <!-- Chart type toggle buttons -->
        <div class="flex justify-center mb-6">
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button 
              @click="chartType = 'radar'" 
              :class="[
                'px-4 py-2 text-sm font-medium focus:z-10 focus:ring-2 focus:outline-none',
                chartType === 'radar' 
                  ? 'bg-blue-600 text-white rounded-l-lg' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 rounded-l-lg border border-slate-300'
              ]"
            >
              <Icon name="i-ic-baseline-radar" class="mr-1 text-lg" />
              Radar Chart
            </button>
            <button 
              @click="chartType = 'bar'" 
              :class="[
                'px-4 py-2 text-sm font-medium focus:z-10 focus:ring-2 focus:outline-none',
                chartType === 'bar' 
                  ? 'bg-blue-600 text-white rounded-r-lg' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 rounded-r-lg border border-slate-300 border-l-0'
              ]"
            >
              <Icon name="i-ic-baseline-bar-chart" class="mr-1 text-lg" />
              Bar Chart
            </button>
          </div>
        </div>
        
        <client-only>
          <ThreeMetricsRadarChart
            v-if="chartType === 'radar'"
            :performance="assessmentSummary?.threeByThreePosition?.performance || 'Low'"
            :potential="assessmentSummary?.threeByThreePosition?.potential || 'Low'"
            :engagement="assessmentSummary?.threeByThreePosition?.engagement || 'Low'"
          />
          <ThreeMetricsBarChart
            v-else
            :performance="assessmentSummary?.threeByThreePosition?.performance || 'Low'"
            :potential="assessmentSummary?.threeByThreePosition?.potential || 'Low'"
            :engagement="assessmentSummary?.threeByThreePosition?.engagement || 'Low'"
          />
        </client-only>
        <div class="text-center mt-6 space-x-4 space-y-4">
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Performance: {{ assessmentSummary?.threeByThreePosition?.performance || 'Not Set' }}
          </span>
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Potential: {{ assessmentSummary?.threeByThreePosition?.potential || 'Not Set' }}
          </span>
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Engagement: {{ assessmentSummary?.threeByThreePosition?.engagement || 'Not Set' }}
          </span>
        </div>
        
        <!-- Three Metrics Explanation and Recommendations -->
        <div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 class="text-xl font-bold text-blue-800 mb-3 ">Your Three Metrics Analysis</h3>
          <p class="text-blue-800 mb-4 ">{{ getThreeMetricsDescription() }}</p>
          
          <div class="grid grid-cols-1 gap-1 mt-4">
            <div class="p-4 bg-white rounded-lg shadow-sm border border-blue-100">
              <h4 class="text-lg font-semibold text-blue-700 mb-2 ">Performance: {{ assessmentSummary?.threeByThreePosition?.performance || 'Not Set' }}</h4>
              <p class="text-blue-800 text-sm ">{{ getMetricDescription('performance') }}</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-sm border border-blue-100">
              <h4 class="text-lg font-semibold text-blue-700 mb-2 ">Potential: {{ assessmentSummary?.threeByThreePosition?.potential || 'Not Set' }}</h4>
              <p class="text-blue-800 text-sm ">{{ getMetricDescription('potential') }}</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-sm border border-blue-100">
              <h4 class="text-lg font-semibold text-blue-700 mb-2 ">Engagement: {{ assessmentSummary?.threeByThreePosition?.engagement || 'Not Set' }}</h4>
              <p class="text-blue-800 text-sm ">{{ getMetricDescription('engagement') }}</p>
            </div>
          </div>
          
          <ul class="mt-4 list-disc pl-5 space-y-2 text-blue-800 ">
            <li v-for="(recommendation, index) in getThreeMetricsRecommendations()" :key="index">
              {{ recommendation }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Leadership Pipeline Summary -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-800 ">Leadership Journey</h2>
          <NuxtLink to="/assessment-guide#leadership-journey" class="ml-2 text-blue-500 hover:text-blue-700" title="Learn more about this section">
            <Icon name="i-heroicons-information-circle" class="w-6 h-6" />
          </NuxtLink>
        </div>
        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-4">
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              (assessmentSummary.leadershipPotentialResult || assessmentSummary.leadershipPotential) === 'Enterprise Leader' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Enterprise Leader</div>
              <div class="text-sm text-slate-600">CEO-level leadership across multiple business units</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              (assessmentSummary.leadershipPotentialResult || assessmentSummary.leadershipPotential) === 'Business Leader' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Business Leader</div>
              <div class="text-sm text-slate-600">C-suite leadership of a business unit</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              (assessmentSummary.leadershipPotentialResult || assessmentSummary.leadershipPotential) === 'Functional Leader' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Functional Leader</div>
              <div class="text-sm text-slate-600">Department or function leadership</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              (assessmentSummary.leadershipPotentialResult || assessmentSummary.leadershipPotential) === 'Managing Managers' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Managing Managers</div>
              <div class="text-sm text-slate-600">Leading multiple teams through managers</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              (assessmentSummary.leadershipPotentialResult || assessmentSummary.leadershipPotential) === 'Managing Others' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Managing Others</div>
              <div class="text-sm text-slate-600">First-time manager leading a team</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              (assessmentSummary.leadershipPotentialResult || assessmentSummary.leadershipPotential) === 'Managing Self' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Managing Self</div>
              <div class="text-sm text-slate-600">Individual contributor</div>
            </div>
          </div>
          <div class="text-center mt-6">
            <span class="inline-block px-6 py-2 rounded-full bg-orange-200 text-orange-800 font-semibold text-lg">
              {{ assessmentSummary.leadershipPotentialResult || assessmentSummary.leadershipPotential }}
            </span>
          </div>
        </div>
      </div>

      <!-- Kirkpatrick Model Summary -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-800 ">Development Journey</h2>
          <NuxtLink to="/assessment-guide#development-journey" class="ml-2 text-blue-500 hover:text-blue-700" title="Learn more about this section">
            <Icon name="i-heroicons-information-circle" class="w-6 h-6" />
          </NuxtLink>
        </div>
        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-4">
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              assessmentSummary.kirkpatrickLevel === 'Level 4: Results' ? 'bg-blue-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Level 4: Results</div>
              <div class="text-sm text-slate-600">Impact on business outcomes and organizational goals</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              assessmentSummary.kirkpatrickLevel === 'Level 3: Behavior' ? 'bg-blue-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Level 3: Behavior</div>
              <div class="text-sm text-slate-600">Application of skills in the workplace</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              assessmentSummary.kirkpatrickLevel === 'Level 2: Learning' ? 'bg-blue-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Level 2: Learning</div>
              <div class="text-sm text-slate-600">Knowledge and skills acquisition</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all ',
              assessmentSummary.kirkpatrickLevel === 'Level 1: Reaction' ? 'bg-blue-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Level 1: Reaction</div>
              <div class="text-sm text-slate-600">Initial response to learning experience</div>
            </div>
          </div>
          <div class="text-center mt-6">
            <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
              {{ assessmentSummary.kirkpatrickLevel }}
            </span>
          </div>
        </div>
      </div>

      <!-- Skills Profile Chart -->
      <div class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2 mb-4 border border-slate-100">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-800 ">Skills Profile</h2>
          <NuxtLink to="/assessment-guide#skills-profile" class="ml-2 text-blue-500 hover:text-blue-700" title="Learn more about this section">
            <Icon name="i-heroicons-information-circle" class="w-6 h-6" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div :class="['rounded-xl shadow p-8 flex flex-col items-center ', assessmentSummary?.skillsProfile?.type === 'I-Shaped' ? 'border-2 border-blue-500' : 'bg-white border border-slate-100']">
            <span class="text-6xl mb-4">𝐈</span>
            <div class="font-bold mb-2 text-blue-700">I-Shaped</div>
            <div class="text-sm text-slate-600 text-center mb-2">Deep expertise in one area (specialist)</div>
          </div>
          <div :class="['rounded-xl shadow p-8 flex flex-col items-center ', assessmentSummary?.skillsProfile?.type === 'T-Shaped' ? 'border-2 border-blue-500' : 'bg-white border border-slate-100']">
            <span class="text-6xl mb-4">𝐓</span>
            <div class="font-bold mb-2 text-blue-700">T-Shaped</div>
            <div class="text-sm text-slate-600 text-center mb-2">Deep expertise in one area + broad knowledge in others</div>
          </div>
          <div :class="['rounded-xl shadow p-8 flex flex-col items-center ', assessmentSummary?.skillsProfile?.type === 'Pi-Shaped' ? 'border-2 border-blue-500' : 'bg-white border border-slate-100']">
            <span class="text-6xl mb-4">𝚷</span>
            <div class="font-bold mb-2 text-blue-700">Pi-Shaped</div>
            <div class="text-sm text-slate-600 text-center mb-2">Expertise in two domains + broad knowledge</div>
          </div>
        </div>

        <!-- Skills Description Section -->
        <div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 class="text-xl font-bold text-blue-800 mb-6 ">Your Skills Profile Analysis</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Primary Skills -->
            <div class="bg-white rounded-lg shadow-sm border border-blue-100 p-4">
              <h4 class="text-lg font-semibold text-blue-700 mb-3 ">Primary Expertise</h4>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-slate-500 ">Area</p>
                  <p class="text-blue-800  font-medium">{{ assessmentSummary?.skillsProfile?.primarySkill || 'Not specified' }}</p>
                </div>
                <div>
                  <p class="text-sm text-slate-500 ">Expertise Level</p>
                  <span :class="[
                    'inline-block px-3 py-1 rounded-full text-sm font-medium',
                    assessmentSummary?.skillsProfile?.primaryLevel === 'expert' ? 'bg-green-100 text-green-800' :
                    assessmentSummary?.skillsProfile?.primaryLevel === 'advanced' ? 'bg-blue-100 text-blue-800' :
                    assessmentSummary?.skillsProfile?.primaryLevel === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-slate-100 text-slate-800'
                  ]">
                    {{ assessmentSummary?.skillsProfile?.primaryLevel || 'Not specified' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Secondary Skills -->
            <div class="bg-white rounded-lg shadow-sm border border-blue-100 p-4">
              <h4 class="text-lg font-semibold text-blue-700 mb-3 ">Secondary Skills</h4>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-slate-500 ">Skill Breadth</p>
                  <span :class="[
                    'inline-block px-3 py-1 rounded-full text-sm font-medium',
                    assessmentSummary?.skillsProfile?.breadth === 'broad' ? 'bg-green-100 text-green-800' :
                    assessmentSummary?.skillsProfile?.breadth === 'moderate' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  ]">
                    {{ assessmentSummary?.skillsProfile?.breadth || 'Not specified' }}
                  </span>
                </div>
                <div>
                  <p class="text-sm text-slate-500 ">Areas of Knowledge</p>
                  <div v-if="assessmentSummary?.skillsProfile?.secondarySkills?.length > 0" class="flex flex-wrap gap-2 mt-2">
                    <span v-for="skill in assessmentSummary.skillsProfile.secondarySkills" 
                          :key="skill"
                          class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {{ skill }}
                    </span>
                  </div>
                  <p v-else class="text-slate-500 text-sm">No secondary skills specified</p>
                </div>
              </div>
            </div>

            <!-- Development Areas -->
            <div class="bg-white rounded-lg shadow-sm border border-blue-100 p-4">
              <h4 class="text-lg font-semibold text-blue-700 mb-3 ">Development Areas</h4>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-slate-500 ">Skills to Develop</p>
                  <div v-if="assessmentSummary?.skillsProfile?.developmentAreas?.length > 0" class="flex flex-wrap gap-2 mt-2">
                    <span v-for="skill in assessmentSummary.skillsProfile.developmentAreas" 
                          :key="skill"
                          class="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                      {{ skill }}
                    </span>
                  </div>
                  <p v-else class="text-slate-500 text-sm">No development areas specified</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Profile Recommendations -->
          <div class="mt-6 bg-white rounded-lg shadow-sm border border-blue-100 p-4">
            <h4 class="text-lg font-semibold text-blue-700 mb-3 ">Recommendations</h4>
            <ul class="list-disc pl-5 space-y-2 text-blue-800 ">
              <li v-if="assessmentSummary?.skillsProfile?.type === 'I-Shaped'">
                Consider developing complementary skills to transition towards a T-shaped profile
              </li>
              <li v-if="assessmentSummary?.skillsProfile?.type === 'T-Shaped'">
                Focus on deepening expertise in your primary area while maintaining breadth
              </li>
              <li v-if="assessmentSummary?.skillsProfile?.type === 'Pi-Shaped'">
                Leverage your dual expertise to take on cross-functional leadership roles
              </li>
              <li v-if="assessmentSummary?.skillsProfile?.primaryLevel === 'beginner'">
                Prioritize building foundational knowledge in your primary area
              </li>
              <li v-if="assessmentSummary?.skillsProfile?.primaryLevel === 'intermediate'">
                Seek opportunities to apply your skills in more complex scenarios
              </li>
              <li v-if="assessmentSummary?.skillsProfile?.primaryLevel === 'advanced'">
                Consider mentoring others to further develop your expertise
              </li>
              <li v-if="assessmentSummary?.skillsProfile?.primaryLevel === 'expert'">
                Focus on innovation and thought leadership in your domain
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Personalized Report CTA -->
      <div ref="linkedinInputSection" class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2 mt-6 mb-4 border border-slate-100">
        <!-- Show "View Your Personalized Report" if user has existing report -->
        <div v-if="hasExistingReport && user && !isGeneratingPlan">
          <h2 class="text-2xl font-bold text-slate-800 mb-4 text-center ">Your Personalized Report is Ready!</h2>
          <p class="text-slate-600 text-center mb-6 max-w-2xl mx-auto">
            You have already generated your personalized career action plan. Click below to view your report.
          </p>
          <div class="text-center flex flex-col sm:flex-row justify-center gap-4">
            <button
              @click="navigateTo('/personalized-report')"
              class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300  flex items-center justify-center"
            >
              <Icon name="i-mdi-file-document-outline" class="mr-2" /> View Your Personalized Report
            </button>
            <button
              @click="clearExistingReport()"
              class="px-8 py-4 text-lg font-semibold text-blue-700 bg-white border border-blue-300 rounded-xl shadow hover:bg-blue-50 transition-all  flex items-center justify-center"
            >
              <Icon name="i-mdi-refresh" class="mr-2" /> Generate New Report
            </button>
          </div>
        </div>

        <!-- For logged-in users without existing report, show the wizard navigation -->
        <div v-else-if="user && !hasExistingReport && !isGeneratingPlan && !personalizedPlan">
          <h3 class="text-xl font-bold text-slate-800 mb-4 ">Generate Your Personalized Report</h3>
          <p class="text-slate-600 mb-6">Leverage your assessment results and professional background to generate a personalized career action plan, including skill development strategies and targeted networking advice.</p>
          <div class="text-center">
            <button 
              @click="navigateToReportWizard()"
              class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex items-center justify-center mx-auto"
            >
              <Icon name="i-mdi-sparkles" class="mr-2" /> Generate Personalized Report
            </button>
          </div>
        </div>

        <!-- For non-logged-in users, show both CTAs -->
        <div v-else-if="!user && !isGeneratingPlan && !personalizedPlan">
          <h2 class="text-2xl font-bold text-slate-800 mb-4 text-center ">Get Your Personalized Report </h2>
          <p class="text-slate-600 text-center mb-6 max-w-2xl mx-auto">
            Leverage your assessment results and professional background to generate a personalized career action plan, including skill development strategies and targeted networking advice.<br>
            <span class="text-sm text-slate-500">You'll be asked to log in and purchase credits if needed.</span>
          </p>
          <div class="text-center flex flex-col sm:flex-row justify-center gap-4">
            <button
              @click="navigateToReportWizard()"
              class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300  flex items-center justify-center"
            >
              <Icon name="i-mdi-sparkles" class="mr-2" /> Get Personalized Report
            </button>
            <button
              @click="handleSave()"
              class="px-8 py-4 text-lg font-semibold text-blue-700 bg-white border border-blue-300 rounded-xl shadow hover:bg-blue-50 transition-all  flex items-center justify-center"
            >
              Na!! just, Let me save my plan
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else-if="isGeneratingPlan" class="text-center py-10">
          <Icon name="i-eos-icons:loading" class="text-5xl text-indigo-600 mb-4 animate-spin" />
          <p class="text-xl font-semibold text-slate-700 ">Generating your personalized report...</p>
          <p class="text-slate-500 ">This may take a few moments. Please wait.</p>
        </div>

        <!-- Display Generated Plan -->
        <div v-else-if="personalizedPlan && !isGeneratingPlan">
          <h2 class="text-2xl font-bold text-slate-800 mb-6  flex items-center">
            <Icon name="i-mdi-rocket-launch-outline" class="mr-3 text-indigo-600" /> Your Personalized Career Report
          </h2>
          <div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-4 bg-slate-50 border border-slate-200 rounded-lg shadow">
            <pre class="whitespace-pre-wrap ">{{ personalizedPlan }}</pre>
          </div>
          
          <div class="mt-8 text-center">
            <button 
              @click="personalizedPlan = null" 
              class="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition-all "
            >
              <Icon name="i-mdi-close-circle-outline" class="mr-2" /> Close Report & Generate New
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="lg:col-span-2 flex justify-between mt-6">
        <button
          @click="navigateTo('/assessment')"
          class="px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl shadow hover:bg-slate-50 transition-all "
        >
          Back to Assessment
        </button>
      </div>
      </div>
    </div>

    <!-- Register Prompt -->
    <RegisterPrompt
      v-if="showRegisterPrompt"
      :message="registerPromptMessage"
      :redirect-to="currentPageUrl"
      @close="showRegisterPrompt = false"
    />

    <!-- Pricing Modal -->
    <PricingModal
      :show="showPricingModal"
      @close="showPricingModal = false"
      @purchase-complete="handlePurchaseComplete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import * as d3 from 'd3'
import ThreeMetricsRadarChart from '~/components/charts/ThreeMetricsRadarChart.vue'
import ThreeMetricsBarChart from '~/components/charts/ThreeMetricsBarChart.vue'
import PricingModal from '~/components/PricingModal.vue'
import { useRouter, useRoute, navigateTo } from 'nuxt/app'

const assessmentSummary = ref(null)
const router = useRouter()
const route = useRoute()
const chevronContainer = ref(null)
const careerStages = ['Exploration', 'Establishment', 'Mid-Career', 'Late Career']
const chartType = ref('radar')

// Personalized Plan Variables
const showPersonalizedPlanInput = ref(false)
const linkedinOrResumeText = ref('')
const personalizedPlan = ref(null)
const isGeneratingPlan = ref(false)
const planError = ref(null)

// Registration Prompt Variables
const showRegisterPrompt = ref(false)
const registerPromptMessage = ref('')
const { user } = useAuth()
const supabase = useSupabaseClient()

// Get current page URL for redirect
const currentPageUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.origin + window.location.pathname + window.location.search
  }
  return null
})

const pendingSavePlan = ref(false)

// Add these refs
const showPricingModal = ref(false)
const userCredits = ref(0)

// Add this ref for tracking pending input form display
const pendingShowInputForm = ref(false)

// Add ref to track if we need to focus on LinkedIn input section
const shouldFocusOnInput = ref(false)

// Floating CTA variables
const linkedinInputSection = ref(null)
const showFloatingCTA = ref(false)

// Profile image upload variables
const profileImageUrl = ref('')
const uploadingImage = ref(false)
const fileInput = ref(null)
const imageUploadError = ref('')
const { uploadProfileImage } = useProfileImage()

// Check if user has existing personalized report
const hasExistingReport = ref(false)

// Function to check for existing personalized report
const checkForExistingReport = async () => {
  // Always check database first if user is logged in
  if (user.value) {
    try {
      const { data: userPlan, error } = await supabase
        .from('user_plans')
        .select('personalized_report')
        .eq('user_id', user.value.id)
        .maybeSingle()

      if (!error && userPlan?.personalized_report) {
        // Database has a report - this is the source of truth
        hasExistingReport.value = true
        // Overwrite localStorage with database data
        localStorage.setItem('personalizedReport', JSON.stringify(userPlan.personalized_report))
        return
      } else {
        // No report in database - clear localStorage to stay in sync
        localStorage.removeItem('personalizedReport')
        hasExistingReport.value = false
        return
      }
    } catch (err) {
      console.error('Error checking for existing report:', err)
      // On database error, fall back to localStorage but still prioritize database
      hasExistingReport.value = false
      localStorage.removeItem('personalizedReport')
      return
    }
  }

  // Only check localStorage if user is not logged in
  const localReport = localStorage.getItem('personalizedReport')
  if (localReport) {
    hasExistingReport.value = true
  } else {
    hasExistingReport.value = false
  }
}

function isElementInViewport(el) {
  if (!el) return false
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  )
}

function checkFloatingCTAVisibility() {
  if (!linkedinInputSection.value) return
  // Show button if the LinkedIn input section is NOT in viewport AND user doesn't have existing report
  showFloatingCTA.value = !isElementInViewport(linkedinInputSection.value) && !hasExistingReport.value
}

function scrollToLinkedInInput() {
  console.log('Attempting to scroll to LinkedIn input section...')
  if (linkedinInputSection.value) {
    console.log('LinkedIn input section found, scrolling...')
    linkedinInputSection.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    console.log('LinkedIn input section not found, retrying in 500ms...')
    // Retry if element not found
    setTimeout(() => {
      if (linkedinInputSection.value) {
        console.log('LinkedIn input section found on retry, scrolling...')
        linkedinInputSection.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        console.log('LinkedIn input section still not found after retry')
      }
    }, 500)
  }
}

async function navigateToReportWizard() {
  // Save LinkedIn text to localStorage if it exists
  if (linkedinOrResumeText.value) {
    localStorage.setItem('linkedinOrResumeText', linkedinOrResumeText.value)
  }
  
  // If user is not logged in, use Google OAuth with redirect to report wizard
  if (!user.value) {
    try {
      const { signInWithGoogle } = useAuth()
      
      // Use the proper Google OAuth flow with redirect to report wizard
      await signInWithGoogle('/report-wizard')
    } catch (error) {
      console.error('Error signing in with Google:', error)
      // Show error to user
      planError.value = 'Failed to sign in. Please try again.'
    }
  } else {
    // Navigate to the report wizard page
    navigateTo('/report-wizard')
  }
}

onMounted(async () => {
  // Set up scroll listeners for floating CTA
  window.addEventListener('scroll', checkFloatingCTAVisibility)
  window.addEventListener('resize', checkFloatingCTAVisibility)
  nextTick(() => {
    checkFloatingCTAVisibility()
  })
  
  let assessmentData = null;
  
  // Standalone function to process assessment data (doesn't depend on global state)
  const processAssessmentDataStandalone = (data) => {
    console.log('Processing assessment data:', data);
    
    // Process Career Stage
    let careerStage = 'Exploration'
    
    // First determine base stage from age
    if (data.careerStage.ageRange === '25-45') {
      careerStage = 'Establishment'
    } else if (data.careerStage.ageRange === '45-55') {
      careerStage = 'Mid-Career'
    } else if (data.careerStage.ageRange === '55+') {
      careerStage = 'Late Career'
    }

    // Then refine the stage based on other factors, but only within age-appropriate bounds
    if (careerStage === 'Establishment') {
      // For 25-45 age range, can only be Establishment or early Mid-Career
      if (data.careerStage.experienceLevel === 'expert' && 
          (data.careerStage.careerFocus === 'mentoring' || data.careerStage.primaryGoal === 'legacy')) {
        careerStage = 'Mid-Career' // Early transition to Mid-Career
      }
    } else if (careerStage === 'Mid-Career') {
      // For 45-55 age range, can be Mid-Career or early Late Career
      if (data.careerStage.experienceLevel === 'expert' && 
          data.careerStage.careerFocus === 'mentoring' && 
          data.careerStage.primaryGoal === 'legacy') {
        careerStage = 'Late Career' // Early transition to Late Career
      }
    } else if (careerStage === 'Late Career') {
      // For 55+ age range, can only be Late Career
      // No refinement needed as this is the final stage
    } else {
      // For other ages, can be Exploration or early Establishment
      if (data.careerStage.experienceLevel === 'intermediate' && 
          data.careerStage.careerFocus === 'specialization') {
        careerStage = 'Establishment' // Early transition to Establishment
      }
    }

    // Process Kirkpatrick Level
    const calculateKirkpatrickScore = (data) => {
      let score = 0
      
      // Learning Opportunities (Level 1: Reaction) - 20% weight
      const reactionScores = {
        'very_positive': 4,
        'positive': 3,
        'neutral': 2,
        'negative': 1
      }
      score += (reactionScores[data.learningDevelopment.learningOpportunities] || 1) * 0.2
      
      // Skill Acquisition (Level 2: Learning) - 20% weight
      const learningScores = {
        'excellent': 4,
        'good': 3,
        'moderate': 2,
        'minimal': 1
      }
      score += (learningScores[data.learningDevelopment.skillAcquisition] || 1) * 0.2
      
      // Skill Application (Level 3: Behavior) - 30% weight
      const behaviorScores = {
        'excellent': 4,
        'good': 3,
        'moderate': 2,
        'minimal': 1
      }
      score += (behaviorScores[data.learningDevelopment.skillApplication] || 1) * 0.3
      
      // Learning Impact (Level 4: Results) - 20% weight
      const impactScores = {
        'significant': 4,
        'moderate': 3,
        'minimal': 2,
        'none': 1
      }
      score += (impactScores[data.learningDevelopment.learningImpact] || 1) * 0.2
      
      // Future Development Approach - 10% weight
      const futureScores = {
        'proactive': 4,
        'planned': 3,
        'reactive': 2,
        'passive': 1
      }
      score += (futureScores[data.learningDevelopment.futureDevelopment] || 1) * 0.1
      
      return score
    }
    
    // Calculate the Kirkpatrick score
    const kirkpatrickScore = calculateKirkpatrickScore(data)
    
    // Determine Kirkpatrick level based on score
    let kirkpatrickLevel = 'Level 1: Reaction'
    if (kirkpatrickScore >= 3.5) {
      kirkpatrickLevel = 'Level 4: Results'
    } else if (kirkpatrickScore >= 3.0) {
      kirkpatrickLevel = 'Level 3: Behavior'
    } else if (kirkpatrickScore >= 2.5) {
      kirkpatrickLevel = 'Level 2: Learning'
    } else {
      kirkpatrickLevel = 'Level 1: Reaction'
    }

    // Process Leadership Potential
    let leadershipPotential = 'Managing Self'
    
    // Create a scoring system for leadership potential
    const calculateLeadershipScore = (data) => {
      let score = 0
      
      // Current Role (40% weight)
      const roleScores = {
        'enterprise': 6,
        'business': 5,
        'functional': 4,
        'manager_of_managers': 3,
        'manager': 2,
        'individual': 1
      }
      score += (roleScores[data.leadershipPotential.currentRole] || 1) * 0.4
      
      // Leadership Experience (30% weight)
      const experienceScores = {
        'enterprise': 6,
        'business': 5,
        'function': 4,
        'department': 3,
        'team': 2,
        'none': 1
      }
      score += (experienceScores[data.leadershipPotential.leadershipExperience] || 1) * 0.3
      
      // Leadership Skills (20% weight)
      const skillScores = {
        'master': 5,
        'expert': 4,
        'advanced': 3,
        'competent': 2,
        'developing': 1
      }
      score += (skillScores[data.leadershipPotential.leadershipSkills] || 1) * 0.2
      
      // Readiness Level (10% weight)
      const readinessScores = {
        'over_ready': 5,
        'ready': 4,
        'almost_ready': 3,
        'developing': 2,
        'not_ready': 1
      }
      score += (readinessScores[data.leadershipPotential.readinessLevel] || 1) * 0.1
      
      return score
    }
    
    const leadershipScore = calculateLeadershipScore(data)
    
    // Determine leadership potential based on score
    if (leadershipScore >= 4.5) {
      leadershipPotential = 'Enterprise Leader'
    } else if (leadershipScore >= 3.5) {
      leadershipPotential = 'Business Leader'
    } else if (leadershipScore >= 2.5) {
      leadershipPotential = 'Functional Leader'
    } else if (leadershipScore >= 1.5) {
      leadershipPotential = 'Managing Managers'
    } else if (leadershipScore >= 1.0) {
      leadershipPotential = 'Managing Others'
    } else {
      leadershipPotential = 'Managing Self'
    }

    // Process 3x3x3 Position
    const calculateEngagement = (satisfaction, motivation) => {
      // Convert string values to numbers for calculation
      const satisfactionMap = { 'Low': 1, 'Moderate': 2, 'High': 3 }
      const motivationMap = { 'Low': 1, 'Moderate': 2, 'High': 3 }
      
      const satisfactionScore = satisfactionMap[satisfaction] || 1
      const motivationScore = motivationMap[motivation] || 1
      
      // Calculate average score
      const averageScore = (satisfactionScore + motivationScore) / 2
      
      // Convert back to string value
      if (averageScore >= 2.5) return 'High'
      if (averageScore >= 1.5) return 'Moderate'
      return 'Low'
    }

    const calculatePerformance = (performance, delivery, quality) => {
      // Convert string values to numbers for calculation
      const scoreMap = { 'Low': 1, 'Moderate': 2, 'High': 3 }
      
      const performanceScore = scoreMap[performance] || 1
      const deliveryScore = scoreMap[delivery] || 1
      const qualityScore = scoreMap[quality] || 1
      
      // Calculate weighted average (giving more weight to quality and delivery)
      const averageScore = (performanceScore + (deliveryScore * 1.2) + (qualityScore * 1.2)) / 3.4
      
      // Convert back to string value
      if (averageScore >= 2.5) return 'High'
      if (averageScore >= 1.5) return 'Moderate'
      return 'Low'
    }

    const calculatePotential = (growthPotential, learningAbility) => {
      // Convert string values to numbers for calculation
      const scoreMap = { 'Low': 1, 'Moderate': 2, 'High': 3 }
      
      const growthScore = scoreMap[growthPotential] || 1
      const learningScore = scoreMap[learningAbility] || 1
      
      // Calculate average score
      const averageScore = (growthScore + learningScore) / 2
      
      // Convert back to string value
      if (averageScore >= 2.5) return 'High'
      if (averageScore >= 1.5) return 'Moderate'
      return 'Low'
    }

    const threeByThreePosition = {
      performance: calculatePerformance(
        data.nineBoxGrid.performance || 'Low',
        data.nineBoxGrid.delivery || 'Low',
        data.nineBoxGrid.quality || 'Low'
      ),
      potential: calculatePotential(
        data.nineBoxGrid.growthPotential || 'Low',
        data.nineBoxGrid.learningAbility || 'Low'
      ),
      engagement: calculateEngagement(
        data.nineBoxGrid.satisfaction || 'Low',
        data.nineBoxGrid.motivation || 'Low'
      )
    }

    // Process Skills Profile
    let skillsProfile = {
      type: 'I-Shaped',
      primarySkill: data.skills.primaryExpertise === 'other' ? data.skills.customPrimarySkill : data.skills.primaryExpertise,
      primaryLevel: data.skills.expertiseLevel,
      secondarySkills: [...(data.skills.secondaryAreas || []), ...(data.skills.customSecondarySkills || [])],
      breadth: data.skills.skillBreadth,
      developmentAreas: [...(data.skills.futureSkills || []), ...(data.skills.customFutureSkills || [])]
    }

    // Determine T/Pi shaped based on secondary skills
    if ((data.skills.secondaryAreas || []).length >= 2) {
      skillsProfile.type = 'Pi-Shaped'
    } else if ((data.skills.secondaryAreas || []).length === 1) {
      skillsProfile.type = 'T-Shaped'
    }

    // Return the processed data with all necessary fields
    const processedData = {
      profile: {
        ...data.profile,
        previousRoles: data.profile.previousRoles || [],
        potentialPaths: data.profile.potentialPaths || [],
        profileImageUrl: data.profile.profileImageUrl || ''
      },
      careerStage: data.careerStage, // Preserve original careerStage object
      careerStageResult: careerStage, // Store the calculated career stage string
      kirkpatrickLevel,
      leadershipPotential: data.leadershipPotential, // Preserve original leadershipPotential object
      leadershipPotentialResult: leadershipPotential, // Store the calculated leadership potential string
      nineBoxGrid: {
        performance: data.nineBoxGrid.performance || 'Low',
        delivery: data.nineBoxGrid.delivery || 'Low',
        quality: data.nineBoxGrid.quality || 'Low',
        growthPotential: data.nineBoxGrid.growthPotential || 'Low',
        learningAbility: data.nineBoxGrid.learningAbility || 'Low',
        satisfaction: data.nineBoxGrid.satisfaction || 'Low',
        motivation: data.nineBoxGrid.motivation || 'Low'
      },
      threeByThreePosition,
      skillsProfile,
      skills: {
        ...data.skills,
        secondaryAreas: data.skills.secondaryAreas || [],
        customSecondarySkills: data.skills.customSecondarySkills || [],
        futureSkills: data.skills.futureSkills || [],
        customFutureSkills: data.skills.customFutureSkills || []
      },
      learningDevelopment: data.learningDevelopment
    }

    console.log('Processed Data:', processedData)
    return processedData
  }
  
  // Always try to get fresh data from database if user is logged in
  if (user.value) {
    try {
      const { data: dbPlan, error } = await supabase
        .from('user_plans')
        .select('assessment_data, personalized_report')
        .eq('user_id', user.value.id)
        .maybeSingle()

      if (!error && dbPlan?.assessment_data) {
        console.log('Found data in database:', dbPlan.assessment_data)
        // Clear any existing local storage data since we're using database data
        localStorage.removeItem('assessmentData')
        localStorage.removeItem('assessmentSummary')
        
        // Sync personalized report from database to localStorage if it exists
        if (dbPlan.personalized_report) {
          localStorage.setItem('personalizedReport', JSON.stringify(dbPlan.personalized_report))
        } else {
          localStorage.removeItem('personalizedReport')
        }
        
        // If this is raw data from the assessment page, process it
        if (dbPlan.assessment_data._metadata?.isRawData) {
          const rawData = { ...dbPlan.assessment_data }
          delete rawData._metadata  // Remove metadata before processing
          assessmentData = processAssessmentDataStandalone(rawData)
        } else {
          // If it's already processed data, use it as is
          assessmentData = dbPlan.assessment_data
        }
      }
    } catch (err) {
      console.error('Error fetching data from database:', err)
      // If there's an error, try to fall back to localStorage
      const savedData = localStorage.getItem('assessmentSummary')
      if (savedData) {
        try {
          assessmentData = JSON.parse(savedData)
        } catch (parseErr) {
          console.error('Error parsing localStorage data:', parseErr)
        }
      }
    }
  }

  // If no database data, try localStorage
  if (!assessmentData) {
    // console.log('No database data found or user not logged in, trying localStorage')
    const localData = localStorage.getItem('assessmentSummary')
    if (localData) {
      try {
        assessmentData = JSON.parse(localData)
        console.log('Found data in localStorage')
      } catch (err) {
        console.error('Error parsing localStorage data:', err)
      }
    }
  }

  if (assessmentData) {
    try {
      // Initialize with default values
      const defaultData = {
        profile: {
          fullName: '',
          email: '',
          currentRole: '',
          yearsOfExperience: '',
          careerObjective: '',
          previousRoles: [],
          potentialPaths: [],
          profileImageUrl: ''
        },
        careerStage: {
          ageRange: '',
          careerFocus: '',
          primaryGoal: '',
          experienceLevel: '',
          developmentApproach: ''
        },
        careerStageResult: 'Exploration',
        leadershipPotential: {
          currentRole: '',
          leadershipExperience: '',
          leadershipSkills: '',
          leadershipAspirations: '',
          readinessLevel: ''
        },
        leadershipPotentialResult: 'Managing Self',
        learningDevelopment: {
          learningOpportunities: '',
          skillAcquisition: '',
          skillApplication: '',
          learningImpact: '',
          futureDevelopment: ''
        },
        nineBoxGrid: {
          performance: 'Low',
          delivery: 'Low',
          quality: 'Low',
          growthPotential: 'Low',
          learningAbility: 'Low',
          satisfaction: 'Low',
          motivation: 'Low'
        },
        skills: {
          primaryExpertise: '',
          customPrimarySkill: '',
          expertiseLevel: '',
          secondaryAreas: [],
          hasOtherSecondary: false,
          customSecondarySkills: [],
          skillBreadth: '',
          futureSkills: [],
          hasOtherFuture: false,
          customFutureSkills: []
        }
      }

      // Merge with defaults
      assessmentSummary.value = {
        ...defaultData,
        ...assessmentData,
        profile: {
          ...defaultData.profile,
          ...assessmentData.profile
        },
        careerStage: {
          ...defaultData.careerStage,
          ...assessmentData.careerStage
        },
        leadershipPotential: {
          ...defaultData.leadershipPotential,
          ...assessmentData.leadershipPotential
        },
        learningDevelopment: {
          ...defaultData.learningDevelopment,
          ...assessmentData.learningDevelopment
        },
        nineBoxGrid: {
          ...defaultData.nineBoxGrid,
          ...assessmentData.nineBoxGrid
        },
        skills: {
          ...defaultData.skills,
          ...assessmentData.skills
        }
      }

      console.log('Final assessment summary:', assessmentSummary.value)

      // Initialize profile image URL if it exists
      if (assessmentSummary.value?.profile?.profileImageUrl) {
        profileImageUrl.value = assessmentSummary.value.profile.profileImageUrl
      }

      // Check for existing personalized report
      await checkForExistingReport()

      // Draw chevrons after data is loaded
      await nextTick()
      drawChevrons()
      
      // Load LinkedIn text from localStorage if it exists
      const savedLinkedInText = localStorage.getItem('linkedinOrResumeText')
      if (savedLinkedInText) {
        linkedinOrResumeText.value = savedLinkedInText
      }
      
      // Check for LinkedIn text in URL query params (from auth callback)
      if (route.query.linkedinText) {
        linkedinOrResumeText.value = decodeURIComponent(route.query.linkedinText)
        // Clear the query param to avoid confusion
        router.replace({ path: '/summary', query: {} })
      }
      
      // Check if we should focus on the input section (from auth callback)
      // Don't clear the query param here - wait until user is logged in
      if (route.query.focusInput === 'true') {
        // console.log('FocusInput flag detected, will scroll after user login')
        shouldFocusOnInput.value = true
      }
    } catch (error) {
      console.error('Error processing assessment data:', error)
      router.push('/assessment')
    }
  } else {
    console.log('No assessment data found')
    router.push('/assessment')
  }
})

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener('scroll', checkFloatingCTAVisibility)
  window.removeEventListener('resize', checkFloatingCTAVisibility)
})

// Nine Box Grid Data
const nineBoxRows = [
  [
    { label: 'High Potential\nLow Performance', icon: 'i-ic-round-star-border' },
    { label: 'High Potential\nModerate Performance', icon: 'i-ic-round-star-half' },
    { label: 'High Potential\nHigh Performance', icon: 'i-ic-round-star' }
  ],
  [
    { label: 'Moderate Potential\nLow Performance', icon: 'i-ic-round-star-border' },
    { label: 'Moderate Potential\nModerate Performance', icon: 'i-ic-round-star-half' },
    { label: 'Moderate Potential\nHigh Performance', icon: 'i-ic-round-star' }
  ],
  [
    { label: 'Low Potential\nLow Performance', icon: 'i-ic-round-star-border' },
    { label: 'Low Potential\nModerate Performance', icon: 'i-ic-round-star-half' },
    { label: 'Low Potential\nHigh Performance', icon: 'i-ic-round-star' }
  ]
]

const isNineBoxSelected = (row, col) => {
  if (!assessmentSummary.value) return false
  
  const performance = assessmentSummary.value.threeByThreePosition.performance
  const potential = assessmentSummary.value.threeByThreePosition.potential
  
  // Based on the grid layout in the UI:
  // Performance increases from left to right (Low, Moderate, High)
  // Potential decreases from top to bottom (High, Moderate, Low)
  const performanceMap = { 'Low': 0, 'Moderate': 1, 'High': 2 }
  const potentialMap = { 'High': 0, 'Moderate': 1, 'Low': 2 }
  
  return row === potentialMap[potential] && col === performanceMap[performance]
}

const handleSave = async () => {
  if (!user.value) {
    registerPromptMessage.value = 'Please log in to save your assessment results.'
    showRegisterPrompt.value = true
    return
  }
  await saveAssessmentData()
}

// Save the plan for the user
async function savePlanForUser() {
  try {
    const { error } = await supabase.from('user_plans').insert([
      {
        user_id: user.value.id,
        assessment_data: assessmentSummary.value,
        created_at: new Date().toISOString()
      }
    ])
    if (error) throw error
    alert('Results saved successfully!')
  } catch (err) {
    alert('Error saving results: ' + err.message)
  }
}

// Ensure the user has a pay as you go subscription
async function ensurePayAsYouGoSubscription(userId) {
  // Get the payg plan id
  // console.log('ensurePayAsYouGoSubscription', userId); 
  const { data: plan, error: planError } = await supabase
    .from('subscription_plans')
    .select('id')
    .eq('name', 'payg')
    .limit(1)
    .single()
  if (planError || !plan){
    console.log('No payg plan found', planError);
    return
  } 

  // Check if user already has a payg subscription
  const { data: sub, error: subError } = await supabase
    .from('user_subscriptions')
    .select('id')
    .eq('user_id', userId)
    .eq('plan_id', plan.id)
    .maybeSingle()
  if (subError) return

  if (!sub) {
    // Insert payg subscription
    const { error: insertError } = await supabase.from('user_subscriptions').insert([
      {
        user_id: userId,
        plan_id: plan.id,
        is_active: true,
        auto_renew: false,
        start_date: new Date().toISOString()
      }
    ])
    if (insertError) {
      console.error('Error creating payg subscription:', insertError)
      return
    }

    // Create initial credit record for new user
    const { error: creditError } = await supabase.from('user_credits').insert([
      {
        user_id: userId,
        change: 0, // Start with 0 credits
        reason: 'initial_setup',
        balance_after: 0,
        created_at: new Date().toISOString()
      }
    ])
    if (creditError) {
      console.error('Error creating initial credit record:', creditError)
    }
  }
}

// Watch for login and pending save
watch(
  () => user.value,
  async (newUser) => {
    if (newUser && assessmentSummary.value) {
      // Save assessment data when user logs in
      await saveAssessmentData()
      // Check for existing personalized report when user logs in
      await checkForExistingReport()
      
      // Check if we need to scroll to LinkedIn input section after login
      if (shouldFocusOnInput.value) {
        // console.log('User logged in with focusInput flag, clearing query param and scrolling')
        shouldFocusOnInput.value = false // Clear the flag
        // Clear the query param
        router.replace({ path: '/summary', query: {} })
        // Wait for the page to update and then scroll
        await nextTick()
        setTimeout(() => {
          scrollToLinkedInInput()
        }, 1000) // Increased delay to ensure everything is loaded
      }
    }
  }
)

const drawChevrons = () => {
  if (!chevronContainer.value || !assessmentSummary.value) return
  
  // Clear any existing SVG
  d3.select(chevronContainer.value).selectAll('*').remove()

  const width = chevronContainer.value.clientWidth
  const height = chevronContainer.value.clientHeight
  const chevronGap = 2
  const safetyMargin = 2
  const safeDrawingWidth = width - safetyMargin
  const totalGapWidth = (careerStages.length > 1) ? (careerStages.length - 1) * chevronGap : 0
  const chevronWidth = (safeDrawingWidth - totalGapWidth) / careerStages.length
  const chevronHeight = height * 0.45

  const svg = d3.select(chevronContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // Drop shadow filter
  const defs = svg.append('defs')
  const filter = defs.append('filter')
    .attr('id', 'chevronDropShadow')
    .attr('x', '-20%')
    .attr('y', '-20%')
    .attr('width', '140%')
    .attr('height', '140%')
  filter.append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 2)
    .attr('result', 'blur')
  filter.append('feOffset')
    .attr('in', 'blur')
    .attr('dx', 2)
    .attr('dy', 2)
    .attr('result', 'offsetBlur')
  filter.append('feFlood')
    .attr('flood-color', '#000')
    .attr('flood-opacity', 0.25)
    .attr('result', 'offsetColor')
  filter.append('feComposite')
    .attr('in', 'offsetColor')
    .attr('in2', 'offsetBlur')
    .attr('operator', 'in')
    .attr('result', 'shadow')
  const feMerge = filter.append('feMerge')
  feMerge.append('feMergeNode').attr('in', 'shadow')
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

  careerStages.forEach((stage, i) => {
    const x = i * chevronWidth + chevronGap * i
    const isCurrent = assessmentSummary.value && stage === (assessmentSummary.value.careerStageResult || assessmentSummary.value.careerStage)
    const fill = isCurrent ? '#DBEAFE' : '#F8FAFC'
    const borderColor = isCurrent ? '#3B82F6' : '#E2E8F0'
    const borderWidth = isCurrent ? 3 : 1
    const textColor = isCurrent ? '#1E40AF' : '#334155'
    const fontWeight = isCurrent ? 'bold' : 'normal'
    const fontSize = 16
    const points = [
      [x, height / 2 - chevronHeight / 2],
      [x + chevronWidth - 20, height / 2 - chevronHeight / 2],
      [x + chevronWidth, height / 2],
      [x + chevronWidth - 20, height / 2 + chevronHeight / 2],
      [x, height / 2 + chevronHeight / 2],
      [x + 20, height / 2]
    ].map(p => p.join(',')).join(' ')
    svg.append('polygon')
      .attr('points', points)
      .attr('fill', fill)
      .attr('stroke', borderColor)
      .attr('stroke-width', borderWidth)
      .attr('filter', 'url(#chevronDropShadow)')
    svg.append('text')
      .attr('x', x + chevronWidth / 2)
      .attr('y', height / 2 + 6)
      .attr('text-anchor', 'middle')
      .attr('fill', textColor)
      .attr('font-size', fontSize)
      .attr('font-weight', fontWeight)
      .text(stage)
  })
}

// Watch for window resize
onMounted(() => {
  window.addEventListener('resize', () => {
    if (assessmentSummary.value) drawChevrons()
  })
})

// Watch for career stage changes
watch(
  () => assessmentSummary.value?.careerStageResult || assessmentSummary.value?.careerStage,
  () => {
    if (assessmentSummary.value) drawChevrons()
  }
)

// Watch for LinkedIn input section to become available and scroll if needed
watch(
  () => linkedinInputSection.value,
  (newElement) => {
    if (newElement && shouldFocusOnInput.value) {
      console.log('LinkedIn input section became available with focusInput flag, scrolling')
      shouldFocusOnInput.value = false // Clear the flag
      // Clear the query param
      router.replace({ path: '/summary', query: {} })
      // Scroll to the section now that it's available
      setTimeout(() => {
        scrollToLinkedInInput()
      }, 500)
    }
  }
)

// Helper methods for Nine Box explanations and recommendations
const getNineBoxPositionName = () => {
  if (!assessmentSummary.value) return ''
  
  const performance = assessmentSummary.value.threeByThreePosition.performance
  const potential = assessmentSummary.value.threeByThreePosition.potential
  
  const positionNames = {
    'High': {
      'High': 'Star Performer',
      'Moderate': 'High Performer',
      'Low': 'Solid Performer'
    },
    'Moderate': {
      'High': 'Future Star',
      'Moderate': 'Core Player',
      'Low': 'Effective Player'
    },
    'Low': {
      'High': 'Enigma',
      'Moderate': 'Growth Employee',
      'Low': 'Underperformer'
    }
  }
  
  return positionNames[performance]?.[potential] || ''
}

const getNineBoxDescription = () => {
  if (!assessmentSummary.value) return ''
  
  const performance = assessmentSummary.value.threeByThreePosition.performance
  const potential = assessmentSummary.value.threeByThreePosition.potential
  
  const descriptions = {
    'High': {
      'High': 'You are a top talent who consistently exceeds expectations and shows high potential for leadership roles. You are likely ready for increased responsibilities and new challenges.',
      'Moderate': 'You demonstrate strong performance but have some areas to develop in terms of potential or leadership capability. You are a valuable team member who may benefit from stretch assignments.',
      'Low': 'You are a reliable high performer in your current role but may have reached a career plateau. You excel in your specialized area but may not be seeking or suited for further advancement.'
    },
    'Moderate': {
      'High': 'You show significant promise and leadership potential but need to improve consistency in performance. With proper development, you could move into a star performer role.',
      'Moderate': 'You are a solid contributor who performs as expected and has reasonable growth potential. You are likely to continue being effective with incremental growth.',
      'Low': 'You meet expectations in your current role but may have limited desire or opportunity for advancement. You may be well-suited to your current position.'
    },
    'Low': {
      'High': 'You demonstrate high potential but are currently underperforming. This misalignment may be due to poor job fit, lack of engagement, or external factors that need addressing.',
      'Moderate': 'Your performance needs improvement, though you show moderate potential for growth. With targeted development and perhaps a different role, you could increase your contribution.',
      'Low': 'You are currently struggling to meet expectations and not demonstrating potential for growth. Immediate performance improvement or role reassessment may be necessary.'
    }
  }
  
  return descriptions[performance]?.[potential] || ''
}

const getNineBoxRecommendations = () => {
  if (!assessmentSummary.value) return []
  
  const performance = assessmentSummary.value.threeByThreePosition.performance
  const potential = assessmentSummary.value.threeByThreePosition.potential
  
  const recommendations = {
    'High': {
      'High': [
        'Seek leadership opportunities and strategic roles that leverage your strengths',
        'Mentor others and share best practices across the organization',
        'Continue professional development in specialized areas and leadership skills',
        'Consider stretch assignments that broaden your expertise across functions'
      ],
      'Moderate': [
        'Take on projects that test and develop your leadership capabilities',
        'Identify barriers to advancement and create a plan to address them',
        'Seek feedback on your leadership style and adapt as needed',
        'Consider lateral moves to broaden your experience and skill set'
      ],
      'Low': [
        'Focus on maintaining excellence in your current specialty',
        'Consider becoming a subject matter expert or specialist',
        'Mentor others in your area of expertise',
        'Explore opportunities for innovation within your current role'
      ]
    },
    'Moderate': {
      'High': [
        'Identify specific performance gaps and create targeted improvement plans',
        'Seek mentorship from high performers in your field',
        'Request more frequent feedback on your work',
        'Consider if your current role aligns with your strengths and interests'
      ],
      'Moderate': [
        'Develop expertise in a specialized area to increase your value',
        'Identify one or two areas where improved performance would have the greatest impact',
        'Seek opportunities to collaborate with high performers',
        'Consider a lateral move that better aligns with your strengths'
      ],
      'Low': [
        'Focus on consistently meeting all expectations in your current role',
        'Identify aspects of your job you find most engaging and seek to expand those',
        'Develop deeper expertise in your current functional area',
        'Discuss career goals with your manager to ensure role alignment'
      ]
    },
    'Low': {
      'High': [
        'Discuss potential role changes that better match your capabilities',
        'Identify specific performance issues and create an improvement plan',
        'Seek a mentor who can help navigate performance challenges',
        'Consider whether personal or external factors are affecting your performance'
      ],
      'Moderate': [
        'Focus on improving in one specific area at a time',
        'Request more structured guidance and clear expectations',
        'Consider whether a different role might be a better fit',
        'Develop fundamental skills that apply across multiple roles'
      ],
      'Low': [
        'Create a performance improvement plan with clear, measurable goals',
        'Seek additional training or support in areas of weakness',
        'Evaluate whether your current role is the right fit',
        'Consider roles that might better align with your strengths and interests'
      ]
    }
  }
  
  return recommendations[performance]?.[potential] || []
}

// Helper methods for Three Metrics explanations and recommendations
const getThreeMetricsDescription = () => {
  if (!assessmentSummary.value) return ''
  
  const performance = assessmentSummary.value.threeByThreePosition?.performance
  const potential = assessmentSummary.value.threeByThreePosition?.potential
  const engagement = assessmentSummary.value.threeByThreePosition?.engagement
  
  if (!performance || !potential || !engagement) return 'Metrics not fully set'
  
  if (performance === 'High' && potential === 'High' && engagement === 'High') {
    return 'You\'re excelling across all three dimensions. This indicates strong value and leadership potential.'
  }
  
  const allLow = performance === 'Low' && potential === 'Low' && engagement === 'Low'
  if (allLow) {
    return 'Current challenges across all dimensions suggest a need to address role fit and career direction.'
  }
  
  // Build a more concise description
  let description = ''
  
  // Performance
  if (performance === 'Low') {
    description += 'Your performance needs improvement. '
  } else if (performance === 'High') {
    description += 'Your performance is strong. '
  } else {
    description += 'Your performance meets expectations. '
  }
  
  // Potential
  if (potential === 'Low') {
    description += 'Your potential in current path is limited. '
  } else if (potential === 'High') {
    description += 'Your growth potential is significant. '
  } else {
    description += 'You show moderate growth potential. '
  }
  
  // Engagement
  if (engagement === 'Low') {
    description += 'Your engagement could be improved.'
  } else if (engagement === 'High') {
    description += 'Your engagement is strong.'
  } else {
    description += 'Your engagement is moderate.'
  }
  
  return description
}

const getMetricDescription = (metric) => {
  if (!assessmentSummary.value) return ''
  
  const level = assessmentSummary.value.threeByThreePosition?.[metric]
  if (!level) return 'Not set'
  
  const descriptions = {
    'performance': {
      'High': 'Consistently exceeds expectations with high-quality results.',
      'Moderate': 'Meets expectations with opportunities to enhance impact.',
      'Low': 'Currently struggling to meet role expectations.'
    },
    'potential': {
      'High': 'Strong capability for growth and more complex responsibilities.',
      'Moderate': 'Moderate capacity for growth, possibly in specialized areas.',
      'Low': 'Limited potential in current path; consider role alignment.'
    },
    'engagement': {
      'High': 'Strong commitment and connection to work and organizational goals.',
      'Moderate': 'Moderate connection to work with some areas of dissatisfaction.',
      'Low': 'Low engagement suggests misalignment with values or interests.'
    }
  }
  
  return descriptions[metric]?.[level] || 'Not set'
}

const getThreeMetricsRecommendations = () => {
  if (!assessmentSummary.value) return []
  
  const performance = assessmentSummary.value.threeByThreePosition?.performance
  const potential = assessmentSummary.value.threeByThreePosition?.potential
  const engagement = assessmentSummary.value.threeByThreePosition?.engagement
  
  if (!performance || !potential || !engagement) return ['Please complete all metrics to get recommendations.']
  
  const recommendations = []
  
  // Add just the top recommendation for each metric
  if (performance === 'Low') {
    recommendations.push('Identify specific performance gaps and create an improvement plan.')
  } else if (performance === 'Moderate') {
    recommendations.push('Focus on key areas that would have the greatest impact.')
  } else if (performance === 'High') {
    recommendations.push('Share best practices and consider mentoring others.')
  }
  
  if (potential === 'Low') {
    recommendations.push('Explore whether your current role and career path align with your strengths.')
  } else if (potential === 'Moderate') {
    recommendations.push('Identify specific capabilities needed for your next career step.')
  } else if (potential === 'High') {
    recommendations.push('Seek cross-functional projects and strategic initiatives.')
  }
  
  if (engagement === 'Low') {
    recommendations.push('Reflect on what would make your work more meaningful and discuss with your manager.')
  } else if (engagement === 'Moderate') {
    recommendations.push('Identify which aspects of your role you find most engaging and expand them.')
  } else if (engagement === 'High') {
    recommendations.push('Maintain engagement through new challenges and learning opportunities.')
  }
  
  return recommendations
}

// Toggle input form visibility
const togglePersonalizedPlanInput = (show) => {
  if (!user.value) {
    // If user is not logged in, show register prompt instead of the input form
    registerPromptMessage.value = 'Please log in to generate your personalized report.'
    showRegisterPrompt.value = true
    // Store the intent to show the input form after login
    pendingShowInputForm.value = true
    return
  }
  
  showPersonalizedPlanInput.value = show
  if (!show) {
    // Reset states when closing
    linkedinOrResumeText.value = ''
    personalizedPlan.value = null
    planError.value = null
  }
}

// Add this function to check user credits
async function checkUserCredits() {
  try {
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('available_credit')
      .eq('user_id', user.value.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) throw error
    userCredits.value = subscription?.available_credit || 0
    return userCredits.value
  } catch (err) {
    console.error('Error checking credits:', err)
    userCredits.value = 0
    return 0
  }
}

// Modify the saveAssessmentData function to include LinkedIn/CV data and personalized reports
async function saveAssessmentData(linkedinText = null, personalizedReport = null) {
  if (!user.value || !assessmentSummary.value) return

  try {
    // Check if plan already exists
    const { data: existingPlan, error: fetchError } = await supabase
      .from('user_plans')
      .select('id, assessment_data, personalized_report')
      .eq('user_id', user.value.id)
      .maybeSingle()

    if (fetchError) {
      throw fetchError
    }

    // Prepare update data
    const updateData = {
      assessment_data: {
        ...assessmentSummary.value,
        ...(linkedinText && { linkedinText })
      }
    }

    // Add personalized report if provided
    if (personalizedReport) {
      updateData.personalized_report = personalizedReport
    }

    if (existingPlan) {
      // Update existing plan
      const { error: updateError } = await supabase
        .from('user_plans')
        .update(updateData)
        .eq('id', existingPlan.id)
        .eq('user_id', user.value.id) // Extra safety check

      if (updateError) throw updateError
      console.log('Assessment data updated successfully')
    } else {
      // Create new plan
      const { error: insertError } = await supabase
        .from('user_plans')
        .insert([
          {
            user_id: user.value.id,
            ...updateData,
            created_at: new Date().toISOString()
          }
        ])

      if (insertError) throw insertError
      console.log('New assessment data created successfully')
    }

    // After successful database save, sync localStorage if personalized report was saved
    if (personalizedReport) {
      localStorage.setItem('personalizedReport', JSON.stringify(personalizedReport))
      hasExistingReport.value = true
    }
  } catch (err) {
    console.error('Error saving assessment data:', err)
    throw err
  }
}

// Modify the submitForPersonalizedPlan function
const submitForPersonalizedPlan = async () => {
  if (!user.value) {
    // Save LinkedIn text to localStorage before showing register prompt
    if (typeof window !== 'undefined') {
      localStorage.setItem('linkedinOrResumeText', linkedinOrResumeText.value)
    }
    registerPromptMessage.value = 'Please log in to generate your personalized report.'
    showRegisterPrompt.value = true
    return
  }

  if (!linkedinOrResumeText.value.trim()) {
    planError.value = 'Please enter your LinkedIn profile or resume text.'
    return
  }

  // Save to localStorage first
  localStorage.setItem('linkedinOrResumeText', linkedinOrResumeText.value)

  planError.value = null
  isGeneratingPlan.value = true

  try {
    // Save LinkedIn/CV data first
    await saveAssessmentData(linkedinOrResumeText.value)

    // Call new API endpoint for report generation
    const response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.value.id,
        assessmentSummary: assessmentSummary.value,
        linkedinText: linkedinOrResumeText.value
      })
    })

    if (response.status === 402) {
      isGeneratingPlan.value = false
      showPricingModal.value = true
      return
    }
    if (!response.ok) {
      throw new Error('Failed to generate report')
    }

    const result = await response.json()
    
    // Save to database first (database is source of truth)
    await saveAssessmentData(linkedinOrResumeText.value, result.report)
    
    // Redirect to the new report page
    navigateTo('/personalized-report')
  } catch (error) {
    console.error('Error generating plan:', error)
    planError.value = 'There was an error generating your plan. Please try again later.'
  } finally {
    isGeneratingPlan.value = false
  }
}

// Add a watch on linkedinOrResumeText to save to localStorage
watch(linkedinOrResumeText, (newValue) => {
  if (newValue) {
    localStorage.setItem('linkedinOrResumeText', newValue)
  }
})

// Modify the handlePurchaseComplete function to clear localStorage after successful purchase
const handlePurchaseComplete = async (purchase) => {
  if (purchase.type === 'payg') {
    userCredits.value += purchase.credits
  } else if (purchase.type === 'subscription') {
    userCredits.value += purchase.credits
  }
  // Clear LinkedIn text from localStorage after successful purchase
  localStorage.removeItem('linkedinOrResumeText')
}

// Function to clear existing report and allow new generation
const clearExistingReport = async () => {
  // Clear from database first (source of truth)
  if (user.value) {
    try {
      const { error } = await supabase
        .from('user_plans')
        .update({ personalized_report: null })
        .eq('user_id', user.value.id)

      if (error) {
        console.error('Error clearing report from database:', error)
      }
    } catch (err) {
      console.error('Error clearing report from database:', err)
    }
  }

  // Clear localStorage to stay in sync
  localStorage.removeItem('personalizedReport')
  hasExistingReport.value = false
  personalizedPlan.value = null
}

// Profile image upload methods
const getInitial = () => {
  if (!assessmentSummary.value?.profile?.fullName) return '?'
  return assessmentSummary.value.profile.fullName.charAt(0).toUpperCase()
}

const triggerImageUpload = () => {
  if (uploadingImage.value) return
  fileInput.value?.click()
}

const handleImageUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  
  uploadingImage.value = true
  imageUploadError.value = ''
  
  try {
    const response = await uploadProfileImage(file)
    profileImageUrl.value = response.data.publicUrl
    
    // Update assessment summary with profile image URL
    if (assessmentSummary.value) {
      assessmentSummary.value.profile = {
        ...assessmentSummary.value.profile,
        profileImageUrl: response.data.publicUrl
      }
      
      // Save to database if user is logged in
      if (user.value) {
        await saveAssessmentData()
      }
    }
    
    // Clear the file input
    event.target.value = ''
    
  } catch (error) {
    console.error('Failed to upload profile image:', error)
    imageUploadError.value = error.message || 'Failed to upload image. Please try again.'
    
    // Clear error after 5 seconds
    setTimeout(() => {
      imageUploadError.value = ''
    }, 5000)
  } finally {
    uploadingImage.value = false
  }
}
</script> 