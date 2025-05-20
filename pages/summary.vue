// NOTE: Ensure the 'user_plans' table exists in Supabase as per the schema provided in the project documentation.
<template>
  <div class="max-w-7xl mx-auto p-6">
    <div v-if="!assessmentSummary" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-lg text-gray-600">Loading your assessment results...</p>
      </div>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Profile Card -->
      <div class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2 mb-4 border border-slate-100">
        <h2 class="text-3xl font-bold text-slate-800 mb-6 font-sans">Profile Information</h2>
        <div class="flex items-center gap-8 mb-6">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile Picture" class="w-28 h-28 rounded-full object-cover border-4 border-blue-400 shadow" />
          <div class="grid grid-cols-2 gap-6 flex-1">
            <div>
              <p class="text-sm text-slate-500 font-sans">Full Name</p>
              <p class="text-lg font-semibold text-slate-800 font-sans">{{ assessmentSummary.profile.fullName }}</p>
            </div>
            <div>
              <p class="text-sm text-slate-500 font-sans">Email</p>
              <p class="text-lg font-semibold text-slate-800 font-sans">{{ assessmentSummary.profile.email }}</p>
            </div>
            <div>
              <p class="text-sm text-slate-500 font-sans">Current Role</p>
              <p class="text-lg font-semibold text-slate-800 font-sans">{{ assessmentSummary.profile.currentRole }}</p>
            </div>
            <div>
              <p class="text-sm text-slate-500 font-sans">Years of Experience</p>
              <p class="text-lg font-semibold text-slate-800 font-sans">{{ assessmentSummary.profile.yearsOfExperience }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-slate-500 font-sans">Career Objective</p>
          <p class="text-lg font-semibold text-slate-800 font-sans">{{ assessmentSummary.profile.careerObjective }}</p>
        </div>
      </div>

      <!-- Career Stage Card -->
      <div class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2 mb-4 border border-slate-100">
        <h2 class="text-3xl font-bold text-slate-800 mb-6 font-sans">Career Stage</h2>
        <!-- Career Stage D3 Chevron Progression -->
        <client-only>
          <div ref="chevronContainer" class="w-full h-40"></div>
        </client-only>
        <!-- Identified Stage Card -->
        <div class="text-center mt-4">
          <div class="inline-block p-4 rounded-lg bg-blue-100 border border-blue-300 shadow-md min-w-[280px]">
            <p class="text-sm text-blue-700 font-sans mb-1 uppercase tracking-wider">Your Identified Stage</p>
            <p class="text-xl font-bold text-blue-800 font-sans">{{ assessmentSummary.careerStage }}</p>
          </div>
        </div>
      </div>

      <!-- Role History & Future Paths -->
      <div class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2 mb-4 border border-slate-100">
        <h2 class="text-3xl font-bold text-slate-800 mb-6 font-sans">Role History & Future Paths</h2>
        <div class="flex">
          <!-- Left Side: Previous Roles (30%) -->
          <div class="flex-shrink-0 w-4/12 pr-6 border-r border-slate-200 relative">
            <h3 class="text-xl font-semibold text-slate-700 mb-4 font-sans">Your Journey So Far</h3>
            
            <!-- Vertical Line for progression -->
            <div class="absolute left-0 top-16 bottom-4 w-0.5 bg-slate-300 ml-1.5"></div>

            <div class="space-y-4 relative">
              <!-- Current Role -->
              <div class="flex items-start">
                <div class="absolute left-0 mt-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow z-10 ml-0.5"></div>
                <div class="ml-6 w-full">
                  <p class="text-sm text-slate-500 font-sans">Current Role</p>
                  <div class="mt-1 p-3 rounded-lg bg-blue-100 border border-blue-300 shadow-sm">
                    <p class="text-md font-semibold text-blue-800 font-sans">{{ assessmentSummary.profile.currentRole }}</p>
                    <p class="text-xs text-blue-600 font-sans">Present</p>
                  </div>
                </div>
              </div>

              <!-- Previous Roles -->
              <div v-if="assessmentSummary.previousRoles.length > 0">
                <p class="text-sm text-slate-500 font-sans mt-5 ml-6">Previous Roles</p>
                <div v-for="(role, index) in assessmentSummary.previousRoles" :key="index" class="mt-3 flex items-start">
                  <div class="absolute left-0 mt-1.5 w-3 h-3 bg-slate-400 rounded-full border-2 border-white shadow z-10 ml-0.5"></div>
                  <div class="ml-6 w-full p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <p class="text-md font-semibold text-slate-800 font-sans">{{ role.title }}</p>
                    <p class="text-xs text-slate-500 font-sans">{{ role.year }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side: Potential Career Paths (70%) -->
          <div class="flex-grow pl-8">
            <h3 class="text-xl font-semibold text-slate-700 mb-6 font-sans">Potential Career Paths</h3>
            <div class="space-y-6">
              <div v-if="assessmentSummary.potentialCareerPaths.length === 0" class="text-slate-500 font-sans pl-8">
                No potential career paths defined yet.
              </div>
              <!-- Path Item -->
              <div v-for="(path, index) in assessmentSummary.potentialCareerPaths" :key="index" class="flex items-start">
                <!-- Connector Line (simplified branch) -->
                <div class="w-8 pt-2">
                  <div class="w-full h-0.5 bg-slate-300"></div>
                </div>
                <!-- Path Content -->
                <div class="flex-1 p-4 rounded-xl shadow-lg bg-white border border-slate-200 hover:shadow-md transition-shadow">
                  <p class="text-md font-semibold text-blue-700 mb-3 font-sans">Suggested Path {{ index + 1 }}</p>
                  <div class="flex space-x-3 items-stretch">
                    <!-- Future Role Card -->
                    <div class="flex-1 p-3 rounded-lg border border-slate-200 bg-slate-50 min-w-[150px]">
                      <p class="text-xs text-slate-500 font-sans uppercase tracking-wider">Future Role</p>
                      <p class="text-md font-medium text-slate-800 font-sans">{{ path.futureRole }}</p>
                    </div>
                    <!-- Arrow Connector -->
                    <div class="flex items-center justify-center px-1">
                      <Icon name="i-ic-round-arrow-right-alt" class="text-slate-400 text-2xl" />
                    </div>
                    <!-- Long Term Role Card -->
                    <div class="flex-1 p-3 rounded-lg border border-slate-200 bg-slate-50 min-w-[150px]">
                      <p class="text-xs text-slate-500 font-sans uppercase tracking-wider">Long Term Role</p>
                      <p class="text-md font-medium text-slate-800 font-sans">{{ path.longTermRole }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nine Box Chart -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100">
        <h2 class="text-3xl font-bold text-slate-800 mb-6 font-sans">Nine Box Position</h2>
        <div class="w-full overflow-x-auto">
          <div class="grid grid-cols-3 grid-rows-3 gap-3 max-w-2xl mx-auto">
            <template v-for="(row, rowIdx) in nineBoxRows" :key="rowIdx">
              <template v-for="(cell, colIdx) in row" :key="colIdx">
                <div :class="[
                  'flex flex-col items-center justify-center rounded-xl p-5 min-h-[90px] min-w-[120px] border-2 transition font-sans',
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
            Performance: {{ assessmentSummary.nineBoxPosition.performance }}
          </span>
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Potential: {{ assessmentSummary.nineBoxPosition.potential }}
          </span>
        </div>
        
        <!-- Nine Box Explanation and Recommendations -->
        <div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 class="text-xl font-bold text-blue-800 mb-3 font-sans">Your Nine Box Position: {{ getNineBoxPositionName() }}</h3>
          <p class="text-blue-800 mb-4 font-sans">{{ getNineBoxDescription() }}</p>
          
         <ul class="mt-2 list-disc pl-5 space-y-2 text-blue-800 font-sans">
            <li v-for="(recommendation, index) in getNineBoxRecommendations()" :key="index">
              {{ recommendation }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Three by Three by Three Chart -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100">
        <h2 class="text-3xl font-bold text-slate-800 mb-6 font-sans">Performance, Potential & Engagement</h2>
        
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
            :performance="assessmentSummary.threeByThreePosition.performance"
            :potential="assessmentSummary.threeByThreePosition.potential"
            :engagement="assessmentSummary.threeByThreePosition.engagement"
          />
          <ThreeMetricsBarChart
            v-else
            :performance="assessmentSummary.threeByThreePosition.performance"
            :potential="assessmentSummary.threeByThreePosition.potential"
            :engagement="assessmentSummary.threeByThreePosition.engagement"
          />
        </client-only>
        <div class="text-center mt-6 space-x-4 space-y-4">
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Performance: {{ assessmentSummary.threeByThreePosition.performance }}
          </span>
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Potential: {{ assessmentSummary.threeByThreePosition.potential }}
          </span>
          <span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">
            Engagement: {{ assessmentSummary.threeByThreePosition.engagement }}
          </span>
        </div>
        
        <!-- Three Metrics Explanation and Recommendations -->
        <div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 class="text-xl font-bold text-blue-800 mb-3 font-sans">Your Three Metrics Analysis</h3>
          <p class="text-blue-800 mb-4 font-sans">{{ getThreeMetricsDescription() }}</p>
          
          <div class="grid grid-cols-1 gap-1 mt-4">
            <div class="p-4 bg-white rounded-lg shadow-sm border border-blue-100">
              <h4 class="text-lg font-semibold text-blue-700 mb-2 font-sans">Performance: {{ assessmentSummary.threeByThreePosition.performance }}</h4>
              <p class="text-blue-800 text-sm font-sans">{{ getMetricDescription('performance') }}</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-sm border border-blue-100">
              <h4 class="text-lg font-semibold text-blue-700 mb-2 font-sans">Potential: {{ assessmentSummary.threeByThreePosition.potential }}</h4>
              <p class="text-blue-800 text-sm font-sans">{{ getMetricDescription('potential') }}</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow-sm border border-blue-100">
              <h4 class="text-lg font-semibold text-blue-700 mb-2 font-sans">Engagement: {{ assessmentSummary.threeByThreePosition.engagement }}</h4>
              <p class="text-blue-800 text-sm font-sans">{{ getMetricDescription('engagement') }}</p>
            </div>
          </div>
          
          <ul class="mt-4 list-disc pl-5 space-y-2 text-blue-800 font-sans">
            <li v-for="(recommendation, index) in getThreeMetricsRecommendations()" :key="index">
              {{ recommendation }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Leadership Pipeline Summary -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100">
        <h2 class="text-3xl font-bold text-slate-800 mb-6 font-sans">Leadership Journey</h2>
        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-4">
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
              assessmentSummary.leadershipPotential === 'Enterprise Leader' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Enterprise Leader</div>
              <div class="text-sm text-slate-600">CEO-level leadership across multiple business units</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
              assessmentSummary.leadershipPotential === 'Business Leader' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Business Leader</div>
              <div class="text-sm text-slate-600">C-suite leadership of a business unit</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
              assessmentSummary.leadershipPotential === 'Functional Leader' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Functional Leader</div>
              <div class="text-sm text-slate-600">Department or function leadership</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
              assessmentSummary.leadershipPotential === 'Managing Managers' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Managing Managers</div>
              <div class="text-sm text-slate-600">Leading multiple teams through managers</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
              assessmentSummary.leadershipPotential === 'Managing Others' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Managing Others</div>
              <div class="text-sm text-slate-600">First-time manager leading a team</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
              assessmentSummary.leadershipPotential === 'Managing Self' ? 'bg-orange-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Managing Self</div>
              <div class="text-sm text-slate-600">Individual contributor</div>
            </div>
          </div>
          <div class="text-center mt-6">
            <span class="inline-block px-6 py-2 rounded-full bg-orange-200 text-orange-800 font-semibold text-lg">
              {{ assessmentSummary.leadershipPotential }}
            </span>
          </div>
        </div>
      </div>

      <!-- Kirkpatrick Model Summary -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100">
        <h2 class="text-3xl font-bold text-slate-800 mb-6 font-sans">Development Journey</h2>
        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-4">
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
              assessmentSummary.kirkpatrickLevel === 'Level 4: Results' ? 'bg-blue-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Level 4: Results</div>
              <div class="text-sm text-slate-600">Impact on business outcomes and organizational goals</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
              assessmentSummary.kirkpatrickLevel === 'Level 3: Behavior' ? 'bg-blue-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Level 3: Behavior</div>
              <div class="text-sm text-slate-600">Application of skills in the workplace</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
              assessmentSummary.kirkpatrickLevel === 'Level 2: Learning' ? 'bg-blue-200 scale-105' : ''
            ]">
              <div class="font-semibold text-slate-800">Level 2: Learning</div>
              <div class="text-sm text-slate-600">Knowledge and skills acquisition</div>
            </div>
            <div :class="[
              'p-6 rounded-xl border-2 transition-all font-sans',
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
        <h2 class="text-3xl font-bold text-sky-700 mb-6 font-sans">Skills Profile</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div :class="['rounded-xl shadow p-8 flex flex-col items-center font-sans', assessmentSummary.skillsProfile.type === 'I-Shaped' ? 'border-2 border-blue-500' : 'bg-white border border-slate-100']">
            <span class="text-6xl mb-4">𝐈</span>
            <div class="font-bold mb-2 text-blue-700">I-Shaped</div>
            <div class="text-sm text-slate-600 text-center mb-2">Deep expertise in one area (specialist)</div>
          </div>
          <div :class="['rounded-xl shadow p-8 flex flex-col items-center font-sans', assessmentSummary.skillsProfile.type === 'T-Shaped' ? 'border-2 border-blue-500' : 'bg-white border border-slate-100']">
            <span class="text-6xl mb-4">𝐓</span>
            <div class="font-bold mb-2 text-blue-700">T-Shaped</div>
            <div class="text-sm text-slate-600 text-center mb-2">Deep expertise in one area + broad knowledge in others</div>
          </div>
          <div :class="['rounded-xl shadow p-8 flex flex-col items-center font-sans', assessmentSummary.skillsProfile.type === 'Pi-Shaped' ? 'border-2 border-blue-500' : 'bg-white border border-slate-100']">
            <span class="text-6xl mb-4">𝚷</span>
            <div class="font-bold mb-2 text-blue-700">Pi-Shaped</div>
            <div class="text-sm text-slate-600 text-center mb-2">Expertise in two domains + broad knowledge</div>
          </div>
        </div>
      </div>

      <!-- Personalized Report CTA -->
      <div class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2 mt-6 mb-4 border border-slate-100">
        <!-- For logged-in users, show the LinkedIn input form -->
        <div v-if="user && !isGeneratingPlan && !personalizedPlan">
          <h3 class="text-2xl font-bold text-slate-800 mb-4 font-sans">Generate Your Personalized Report</h3>
          <p class="text-slate-600 mb-1">Please paste your LinkedIn profile summary or resume text below.</p>
          <p class="text-xs text-slate-500 mb-4">This information, along with your assessment results, will be used to generate your personalized plan.</p>
          <textarea
            v-model="linkedinOrResumeText" 
            class="w-full h-60 p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-sans text-sm"
            placeholder="Paste your LinkedIn profile summary or resume text here..."
          ></textarea>
          <div v-if="planError" class="mt-3 text-red-600 text-sm font-medium">
            {{ planError }}
          </div>
          <div class="mt-6 flex justify-end">
            <button 
              @click="submitForPersonalizedPlan()"
              :disabled="!linkedinOrResumeText.trim()"
              class="px-6 py-2 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-slate-400 transition-all font-sans flex items-center"
            >
              <Icon name="i-mdi-brain" class="mr-2" /> Generate Report (10 credits)
            </button>
          </div>
        </div>

        <!-- For non-logged-in users, show both CTAs -->
        <div v-else-if="!user && !isGeneratingPlan && !personalizedPlan">
          <h2 class="text-3xl font-bold text-slate-800 mb-4 text-center font-sans">Get Your Personalized Report </h2>
          <p class="text-slate-600 text-center mb-6 max-w-2xl mx-auto">
            Leverage your assessment results and professional background to generate a personalized career action plan, including skill development strategies and targeted networking advice.<br>
            <span class="text-sm text-slate-500">You'll be asked to log in and purchase credits if needed.</span>
          </p>
          <div class="text-center flex flex-col sm:flex-row justify-center gap-4">
            <button
              @click="submitForPersonalizedPlan()"
              class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-sans flex items-center justify-center"
            >
              <Icon name="i-mdi-sparkles" class="mr-2" /> Get Personalized Report <span class="text-sm ml-2">(10 credit points, $3)</span>
            </button>
            <button
              @click="handleSave()"
              class="px-8 py-4 text-lg font-semibold text-blue-700 bg-white border border-blue-300 rounded-xl shadow hover:bg-blue-50 transition-all font-sans flex items-center justify-center"
            >
              Na!! just, Let me save my plan
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else-if="isGeneratingPlan" class="text-center py-10">
          <Icon name="i-eos-icons:loading" class="text-5xl text-indigo-600 mb-4 animate-spin" />
          <p class="text-xl font-semibold text-slate-700 font-sans">Generating your personalized report...</p>
          <p class="text-slate-500 font-sans">This may take a few moments. Please wait.</p>
        </div>

        <!-- Display Generated Plan -->
        <div v-else-if="personalizedPlan && !isGeneratingPlan">
          <h2 class="text-3xl font-bold text-slate-800 mb-6 font-sans flex items-center">
            <Icon name="i-mdi-rocket-launch-outline" class="mr-3 text-indigo-600" /> Your Personalized Career Report
          </h2>
          <div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-4 bg-slate-50 border border-slate-200 rounded-lg shadow">
            <pre class="whitespace-pre-wrap font-sans">{{ personalizedPlan }}</pre>
          </div>
          
          <div class="mt-8 text-center">
            <button 
              @click="personalizedPlan = null" 
              class="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition-all font-sans"
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
          class="px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl shadow hover:bg-slate-50 transition-all font-sans"
        >
          Back to Assessment
        </button>
      </div>
    </div>

    <!-- Register Prompt -->
    <RegisterPrompt
      v-if="showRegisterPrompt"
      :message="registerPromptMessage"
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
import { ref, computed, onMounted, watch } from 'vue'
import * as d3 from 'd3'
import ThreeMetricsRadarChart from '~/components/charts/ThreeMetricsRadarChart.vue'
import ThreeMetricsBarChart from '~/components/charts/ThreeMetricsBarChart.vue'
import { useSupabaseClient } from '#imports'
import PricingModal from '~/components/PricingModal.vue'

const assessmentSummary = ref(null)
const router = useRouter()
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

const pendingSavePlan = ref(false)

// Add these refs
const showPricingModal = ref(false)
const userCredits = ref(0)

// Add this ref for tracking pending input form display
const pendingShowInputForm = ref(false)

onMounted(async () => {
  const savedData = localStorage.getItem('assessmentSummary')
  if (savedData) {
    assessmentSummary.value = JSON.parse(savedData)
    // Draw chevrons after data is loaded
    await nextTick()
    drawChevrons()
    
    // Load LinkedIn text from localStorage if it exists
    const savedLinkedInText = localStorage.getItem('linkedinOrResumeText')
    if (savedLinkedInText) {
      linkedinOrResumeText.value = savedLinkedInText
    }
    
    // If user is logged in, save the assessment data
    if (user.value) {
      await saveAssessmentData(linkedinOrResumeText.value)
    }
  } else {
    // If no data is found, redirect back to assessment
    router.push('/assessment')
  }
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
  
  const performance = assessmentSummary.value.nineBoxPosition.performance
  const potential = assessmentSummary.value.nineBoxPosition.potential
  
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
  console.log('ensurePayAsYouGoSubscription', userId); 
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
    const isCurrent = assessmentSummary.value && stage === assessmentSummary.value.careerStage
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
  () => assessmentSummary.value?.careerStage,
  () => {
    if (assessmentSummary.value) drawChevrons()
  }
)

// Helper methods for Nine Box explanations and recommendations
const getNineBoxPositionName = () => {
  if (!assessmentSummary.value) return ''
  
  const performance = assessmentSummary.value.nineBoxPosition.performance
  const potential = assessmentSummary.value.nineBoxPosition.potential
  
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
  
  const performance = assessmentSummary.value.nineBoxPosition.performance
  const potential = assessmentSummary.value.nineBoxPosition.potential
  
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
  
  const performance = assessmentSummary.value.nineBoxPosition.performance
  const potential = assessmentSummary.value.nineBoxPosition.potential
  
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
  
  const performance = assessmentSummary.value.threeByThreePosition.performance
  const potential = assessmentSummary.value.threeByThreePosition.potential
  const engagement = assessmentSummary.value.threeByThreePosition.engagement
  
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
  
  const level = assessmentSummary.value.threeByThreePosition[metric]
  
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
  
  return descriptions[metric]?.[level] || ''
}

const getThreeMetricsRecommendations = () => {
  if (!assessmentSummary.value) return []
  
  const performance = assessmentSummary.value.threeByThreePosition.performance
  const potential = assessmentSummary.value.threeByThreePosition.potential
  const engagement = assessmentSummary.value.threeByThreePosition.engagement
  
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
    const { data: credits, error } = await supabase
      .from('user_credits')
      .select('balance_after')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) throw error
    userCredits.value = credits?.balance_after || 0
    return userCredits.value
  } catch (err) {
    console.error('Error checking credits:', err)
    userCredits.value = 0
    return 0
  }
}

// Modify the saveAssessmentData function to include LinkedIn/CV data
async function saveAssessmentData(linkedinText = null) {
  if (!user.value || !assessmentSummary.value) return

  try {
    // Check if plan already exists
    const { data: existingPlan } = await supabase
      .from('user_plans')
      .select('id, assessment_data')
      .eq('user_id', user.value.id)
      .single()

    if (!existingPlan) {
      // Save the assessment data if no plan exists
      const { error } = await supabase.from('user_plans').insert([
        {
          user_id: user.value.id,
          assessment_data: {
            ...assessmentSummary.value,
            linkedinText: linkedinText
          },
          created_at: new Date().toISOString()
        }
      ])
      if (error) throw error
      console.log('Assessment data saved successfully')
    } else if (linkedinText) {
      // Update existing plan with LinkedIn text
      const { error } = await supabase
        .from('user_plans')
        .update({
          assessment_data: {
            ...existingPlan.assessment_data,
            linkedinText: linkedinText
          }
        })
        .eq('id', existingPlan.id)
      if (error) throw error
      console.log('LinkedIn text saved successfully')
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
    localStorage.setItem('linkedinOrResumeText', linkedinOrResumeText.value)
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

    // Check credits before proceeding
    const availableCredits = await checkUserCredits()
    if (availableCredits < 10) {
      isGeneratingPlan.value = false
      showPricingModal.value = true
      return
    }

    // Deduct credits
    const { error: creditError } = await supabase.from('user_credits').insert([
      {
        user_id: user.value.id,
        change: -10,
        reason: 'report_generation',
        balance_after: availableCredits - 10,
        created_at: new Date().toISOString()
      }
    ])

    if (creditError) throw creditError

    // Update local credit count
    userCredits.value = availableCredits - 10

    // Get assessment data to include in prompt
    const performanceLevel = assessmentSummary.value.threeByThreePosition.performance
    const potentialLevel = assessmentSummary.value.threeByThreePosition.potential
    const engagementLevel = assessmentSummary.value.threeByThreePosition.engagement
    const nineBoxPosition = getNineBoxPositionName()
    const careerStage = assessmentSummary.value.careerStage

    // Generate the report using GPT
    const response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        linkedinText: linkedinOrResumeText.value,
        assessmentData: {
          performance: performanceLevel,
          potential: potentialLevel,
          engagement: engagementLevel,
          nineBoxPosition,
          careerStage,
          profile: assessmentSummary.value.profile
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to generate report')
    }

    const result = await response.json()
    personalizedPlan.value = result.report

  } catch (error) {
    console.error('Error generating plan:', error)
    planError.value = 'There was an error generating your plan. Please try again later.'
    // Refund credits if report generation fails
    if (userCredits.value < availableCredits) {
      await supabase.from('user_credits').insert([
        {
          user_id: user.value.id,
          change: 10,
          reason: 'refund_failed_generation',
          balance_after: availableCredits,
          created_at: new Date().toISOString()
        }
      ])
      userCredits.value = availableCredits
    }
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
</script> 