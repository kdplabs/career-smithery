<template>
  <div class="min-h-screen bg-blue-50 flex items-center justify-center py-8">
    <div class="w-full max-w-3xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-0 sm:p-0">
        <div class="p-8">
          <!-- Progress Bar -->
          <div class="mb-8">
            <div class="flex justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Step {{ currentStep }} of {{ totalSteps }}</span>
              <span class="text-sm font-medium text-gray-700">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Step Content -->
          <div>
            <!-- Step 1: Profile & Career Trajectory -->
            <div v-if="currentStep === 1">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Profile & Career Trajectory</h2>
              <p class="text-lg text-gray-600 mb-8">Let's gather some information about you, your past roles, and future aspirations.</p>
              
              <div class="space-y-12">
                <!-- Basic Information -->
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Basic Information</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        v-model="assessmentData.profile.fullName"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        v-model="assessmentData.profile.email"
                        type="email"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
                      <input
                        v-model="assessmentData.profile.currentRole"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                      <select
                        v-model="assessmentData.profile.yearsOfExperience"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select years</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="11-15">11-15 years</option>
                        <option value="15+">15+ years</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Career Objective</label>
                      <textarea
                        v-model="assessmentData.profile.careerObjective"
                        rows="3"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Previous Roles -->
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Previous Roles (up to 4)</h3>
                  <div class="space-y-6">
                    <div v-for="(role, index) in assessmentData.profile.previousRoles" :key="index" class="relative bg-white p-6 rounded-md shadow-sm border border-gray-200">
                      <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-medium text-gray-800">Previous Role {{ index + 1 }}</span>
                        <button @click="removePreviousRole(index)" class="flex items-center text-red-500 hover:text-red-700 text-sm font-medium">
                          <span class="mr-1">&#10006;</span> Remove
                        </button>
                      </div>
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Role Title</label>
                          <input
                            v-model="role.title"
                            type="text"
                            placeholder="E.g., Software Engineer"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Year (e.g., 2020 or 2019-2021)</label>
                          <input
                            v-model="role.year"
                            type="text"
                            placeholder="e.g., 2020"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="assessmentData.profile.previousRoles.length < 4"
                    @click="addPreviousRole"
                    class="mt-4 inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span class="mr-2">➕</span> Add Previous Role
                  </button>
                </div>

                <!-- Potential Career Paths -->
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Potential Career Paths (up to 3)</h3>
                  <div class="space-y-6">
                    <div v-for="(path, index) in assessmentData.profile.potentialPaths" :key="index" class="relative bg-white p-6 rounded-md shadow-sm border border-gray-200">
                      <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-medium text-gray-800">Potential Path {{ index + 1 }}</span>
                        <button @click="removePotentialPath(index)" class="flex items-center text-red-500 hover:text-red-700 text-sm font-medium">
                          <span class="mr-1">&#10006;</span> Remove
                        </button>
                      </div>
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Future Role (Next 1-3 years)</label>
                          <input
                            v-model="path.futureRole"
                            type="text"
                            placeholder="E.g., Senior Developer"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Long Term Role (3-5+ years)</label>
                          <input
                            v-model="path.longTermRole"
                            type="text"
                            placeholder="E.g., Tech Lead / Architect"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="assessmentData.profile.potentialPaths.length < 3"
                    @click="addPotentialPath"
                    class="mt-4 inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span class="mr-2">➕</span> Add Potential Path
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 2: Career Stage Assessment -->
            <div v-if="currentStep === 2">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Career Stage Assessment</h2>
              <p class="text-lg text-gray-600 mb-8">Based on Super's Career Development Theory, let's determine your current career stage.</p>
              
              <div class="space-y-12">
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Career Stage Questions</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What is your current age range?</label>
                      <select
                        v-model="assessmentData.careerStage.ageRange"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select age range</option>
                        <option value="15-25">15-25 years (Exploration)</option>
                        <option value="25-45">25-45 years (Establishment)</option>
                        <option value="45-55">45-55 years (Mid-Career)</option>
                        <option value="55+">55+ years (Late Career)</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you describe your current career focus?</label>
                      <select
                        v-model="assessmentData.careerStage.careerFocus"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select focus</option>
                        <option value="exploring">Exploring different career options</option>
                        <option value="establishing">Establishing myself in my chosen field</option>
                        <option value="advancing">Advancing and specializing in my career</option>
                        <option value="mentoring">Mentoring others and sharing knowledge</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What is your primary career goal right now?</label>
                      <select
                        v-model="assessmentData.careerStage.primaryGoal"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select goal</option>
                        <option value="learning">Learning and skill development</option>
                        <option value="stability">Career stability and growth</option>
                        <option value="leadership">Leadership and expertise</option>
                        <option value="legacy">Building legacy and mentoring</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you describe your current work experience level?</label>
                      <select
                        v-model="assessmentData.careerStage.experienceLevel"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select experience level</option>
                        <option value="entry">Entry level / Learning the basics</option>
                        <option value="intermediate">Intermediate / Building expertise</option>
                        <option value="advanced">Advanced / Deep specialization</option>
                        <option value="expert">Expert / Industry leader</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What is your current approach to career development?</label>
                      <select
                        v-model="assessmentData.careerStage.developmentApproach"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select approach</option>
                        <option value="exploring">Exploring and trying different paths</option>
                        <option value="building">Building and establishing my career</option>
                        <option value="advancing">Advancing and taking on more responsibility</option>
                        <option value="mentoring">Mentoring and developing others</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Learning & Development Assessment -->
            <div v-if="currentStep === 3">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Learning & Development Assessment</h2>
              <p class="text-lg text-gray-600 mb-8">Based on Kirkpatrick's Model, let's evaluate your current development stage.</p>
              
              <div class="space-y-12">
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Learning & Development Questions</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How do you feel about your current learning and development opportunities?</label>
                      <select
                        v-model="assessmentData.learningDevelopment.learningOpportunities"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select your reaction</option>
                        <option value="very_positive">Very positive and engaged</option>
                        <option value="positive">Generally positive</option>
                        <option value="neutral">Neutral</option>
                        <option value="negative">Not satisfied</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your current skill acquisition and knowledge development?</label>
                      <select
                        v-model="assessmentData.learningDevelopment.skillAcquisition"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select your learning level</option>
                        <option value="excellent">Excellent - Actively learning and growing</option>
                        <option value="good">Good - Steady progress</option>
                        <option value="moderate">Moderate - Some learning happening</option>
                        <option value="minimal">Minimal - Limited learning opportunities</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How well are you applying your learned skills in your work?</label>
                      <select
                        v-model="assessmentData.learningDevelopment.skillApplication"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select application level</option>
                        <option value="excellent">Excellent - Consistently applying new skills</option>
                        <option value="good">Good - Regularly applying skills</option>
                        <option value="moderate">Moderate - Sometimes applying skills</option>
                        <option value="minimal">Minimal - Rarely applying new skills</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate the impact of your learning on work outcomes?</label>
                      <select
                        v-model="assessmentData.learningDevelopment.learningImpact"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select impact level</option>
                        <option value="significant">Significant - Clear positive impact</option>
                        <option value="moderate">Moderate - Some positive impact</option>
                        <option value="minimal">Minimal - Limited impact</option>
                        <option value="none">No noticeable impact</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What is your approach to future development?</label>
                      <select
                        v-model="assessmentData.learningDevelopment.futureDevelopment"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select your approach</option>
                        <option value="proactive">Proactive - Actively seeking development</option>
                        <option value="planned">Planned - Following a development plan</option>
                        <option value="reactive">Reactive - Responding to needs as they arise</option>
                        <option value="passive">Passive - Waiting for opportunities</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Leadership Potential Assessment -->
            <div v-if="currentStep === 4">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Leadership Potential Assessment</h2>
              <p class="text-lg text-gray-600 mb-8">Based on Ram Charan's Leadership Pipeline model, let's evaluate your leadership potential.</p>
              
              <div class="space-y-12">
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Leadership Assessment Questions</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What best describes your current role?</label>
                      <select
                        v-model="assessmentData.leadershipPotential.currentRole"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select your role</option>
                        <option value="individual">Individual Contributor</option>
                        <option value="manager">First-time Manager</option>
                        <option value="manager_of_managers">Manager of Managers</option>
                        <option value="functional">Functional Leader</option>
                        <option value="business">Business Leader</option>
                        <option value="enterprise">Enterprise Leader</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you describe your leadership experience?</label>
                      <select
                        v-model="assessmentData.leadershipPotential.leadershipExperience"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select experience level</option>
                        <option value="none">No formal leadership experience</option>
                        <option value="team">Leading small teams</option>
                        <option value="department">Leading departments</option>
                        <option value="function">Leading functions</option>
                        <option value="business">Leading business units</option>
                        <option value="enterprise">Leading entire organization</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your leadership skills?</label>
                      <select
                        v-model="assessmentData.leadershipPotential.leadershipSkills"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select skill level</option>
                        <option value="developing">Developing - Learning leadership basics</option>
                        <option value="competent">Competent - Good at team leadership</option>
                        <option value="advanced">Advanced - Strong at managing managers</option>
                        <option value="expert">Expert - Skilled at functional leadership</option>
                        <option value="master">Master - Excellent at business leadership</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What are your leadership aspirations?</label>
                      <select
                        v-model="assessmentData.leadershipPotential.leadershipAspirations"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select your aspirations</option>
                        <option value="team_lead">Team Leadership</option>
                        <option value="department_head">Department Head</option>
                        <option value="functional_lead">Functional Leadership</option>
                        <option value="business_head">Business Unit Leadership</option>
                        <option value="enterprise_lead">Enterprise Leadership</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How ready do you feel for the next leadership level?</label>
                      <select
                        v-model="assessmentData.leadershipPotential.readinessLevel"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select readiness level</option>
                        <option value="not_ready">Not Ready - Need more development</option>
                        <option value="developing">Developing - Working on required skills</option>
                        <option value="almost_ready">Almost Ready - Few areas to improve</option>
                        <option value="ready">Ready - Prepared for next level</option>
                        <option value="over_ready">Over Ready - Ready for higher level</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 5: 9-Box Grid Assessment -->
            <div v-if="currentStep === 5">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">9-Box Grid Assessment</h2>
              <p class="text-lg text-gray-600 mb-8">Let's evaluate your performance and potential using the 9-box grid model.</p>
              
              <div class="space-y-12">
                <!-- Performance Assessment -->
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Performance Assessment</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your current job performance?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.performance"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select performance level</option>
                        <option value="High">High - Consistently exceeds expectations</option>
                        <option value="Moderate">Moderate - Meets expectations</option>
                        <option value="Low">Low - Below expectations</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your ability to deliver results?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.delivery"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select delivery level</option>
                        <option value="High">High - Consistently delivers excellent results</option>
                        <option value="Moderate">Moderate - Delivers expected results</option>
                        <option value="Low">Low - Struggles to deliver results</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate the quality of your work?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.quality"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select quality level</option>
                        <option value="High">High - Exceptional quality</option>
                        <option value="Moderate">Moderate - Good quality</option>
                        <option value="Low">Low - Needs improvement</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Potential Assessment -->
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Potential Assessment</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your growth potential?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.growthPotential"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select potential level</option>
                        <option value="High">High - Ready for significant growth</option>
                        <option value="Moderate">Moderate - Steady growth potential</option>
                        <option value="Low">Low - Limited growth potential</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your ability to learn and adapt?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.learningAbility"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select learning ability</option>
                        <option value="High">High - Quick learner, adapts well</option>
                        <option value="Moderate">Moderate - Steady learner</option>
                        <option value="Low">Low - Slow to learn and adapt</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Engagement Assessment -->
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Engagement Assessment</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How satisfied are you with your current role and responsibilities?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.satisfaction"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select satisfaction level</option>
                        <option value="High">High - Very satisfied</option>
                        <option value="Moderate">Moderate - Satisfied</option>
                        <option value="Low">Low - Not satisfied</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How motivated do you feel to contribute to your team and organizational goals?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.motivation"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select motivation level</option>
                        <option value="High">High - Very motivated</option>
                        <option value="Moderate">Moderate - Motivated</option>
                        <option value="Low">Low - Not very motivated</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 6: Skills Assessment -->
            <div v-if="currentStep === 6">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Skills Assessment</h2>
              <p class="text-lg text-gray-600 mb-8">Let's evaluate your skills profile using the T/I/Pi-shaped model.</p>
              
              <div class="space-y-12">
                <!-- Primary Skills -->
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Primary Skills</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What is your primary area of expertise?</label>
                      <select
                        v-model="assessmentData.skills.primaryExpertise"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select primary skill</option>
                        <option value="technical">Technical (e.g., Software Development)</option>
                        <option value="business">Business (e.g., Management)</option>
                        <option value="design">Design (e.g., UX/UI)</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <!-- Custom Primary Skill Input -->
                    <div v-if="assessmentData.skills.primaryExpertise === 'other'">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Please specify your primary skill</label>
                      <input
                        v-model="assessmentData.skills.customPrimarySkill"
                        type="text"
                        placeholder="Enter your primary skill"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your expertise level in your primary area?</label>
                      <select
                        v-model="assessmentData.skills.expertiseLevel"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select expertise level</option>
                        <option value="expert">Expert - Deep knowledge and experience</option>
                        <option value="advanced">Advanced - Strong knowledge and experience</option>
                        <option value="intermediate">Intermediate - Good knowledge and experience</option>
                        <option value="beginner">Beginner - Basic knowledge and experience</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Secondary Skills -->
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Secondary Skills</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What secondary areas do you have knowledge in?</label>
                      <div class="mt-4 space-y-3 bg-white p-4 rounded-md shadow-sm">
                        <div v-for="skill in ['Technical', 'Business', 'Design', 'Marketing', 'Sales', 'Operations']" :key="skill" class="flex items-center">
                          <input
                            :id="skill.toLowerCase()"
                            v-model="assessmentData.skills.secondaryAreas"
                            :value="skill.toLowerCase()"
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label :for="skill.toLowerCase()" class="ml-3 block text-sm text-gray-700">
                            {{ skill }}
                          </label>
                        </div>
                        <!-- Other Secondary Skill Option -->
                        <div class="flex items-center">
                          <input
                            id="other-secondary"
                            v-model="assessmentData.skills.hasOtherSecondary"
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label for="other-secondary" class="ml-3 block text-sm text-gray-700">
                            Other
                          </label>
                        </div>
                      </div>
                    </div>

                    <!-- Custom Secondary Skills Input -->
                    <div v-if="assessmentData.skills.hasOtherSecondary" class="space-y-4">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Please specify your other secondary skills</label>
                      <div v-for="(skill, index) in assessmentData.skills.customSecondarySkills" :key="index" class="flex items-center space-x-2">
                        <input
                          v-model="assessmentData.skills.customSecondarySkills[index]"
                          type="text"
                          placeholder="Enter secondary skill"
                          class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                        />
                        <button
                          @click="removeCustomSecondarySkill(index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <button
                        @click="addCustomSecondarySkill"
                        class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add Another Skill
                      </button>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you describe your skill breadth?</label>
                      <select
                        v-model="assessmentData.skills.skillBreadth"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                      >
                        <option value="">Select breadth level</option>
                        <option value="broad">Broad - Knowledge across many areas</option>
                        <option value="moderate">Moderate - Knowledge in several areas</option>
                        <option value="narrow">Narrow - Focused on specific areas</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Future Development -->
                <div class="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                  <h3 class="text-xl font-semibold text-gray-900">Future Development</h3>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What skills would you like to develop?</label>
                      <div class="mt-4 space-y-3 bg-white p-4 rounded-md shadow-sm">
                        <div v-for="skill in ['Technical Skills', 'Business Skills', 'Design Skills', 'Leadership Skills', 'Communication Skills', 'Project Management']" :key="skill" class="flex items-center">
                          <input
                            :id="skill.toLowerCase().replace(' ', '-')"
                            v-model="assessmentData.skills.futureSkills"
                            :value="skill.toLowerCase()"
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label :for="skill.toLowerCase().replace(' ', '-')" class="ml-3 block text-sm text-gray-700">
                            {{ skill }}
                          </label>
                        </div>
                        <!-- Other Future Skill Option -->
                        <div class="flex items-center">
                          <input
                            id="other-future"
                            v-model="assessmentData.skills.hasOtherFuture"
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label for="other-future" class="ml-3 block text-sm text-gray-700">
                            Other
                          </label>
                        </div>
                      </div>
                    </div>

                    <!-- Custom Future Skills Input -->
                    <div v-if="assessmentData.skills.hasOtherFuture" class="space-y-4">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Please specify other skills you'd like to develop</label>
                      <div v-for="(skill, index) in assessmentData.skills.customFutureSkills" :key="index" class="flex items-center space-x-2">
                        <input
                          v-model="assessmentData.skills.customFutureSkills[index]"
                          type="text"
                          placeholder="Enter skill to develop"
                          class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                        />
                        <button
                          @click="removeCustomFutureSkill(index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <button
                        @click="addCustomFutureSkill"
                        class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add Another Skill
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="mt-12 flex justify-between">
              <div class="flex space-x-4">
                <button
                  v-if="currentStep > 1"
                  @click="handlePreviousStep"
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Previous
                </button>
                <button
                  @click="clearLocalData"
                  class="inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-base font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Clear Data
                </button>
              </div>
              
              <button
                v-if="currentStep < totalSteps"
                @click="handleNextStep"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
              
              <button
                v-else
                @click="submitAssessment"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Complete Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading Indicator -->
  <div v-if="isSaving" class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
    Saving changes...
  </div>
</template>

<script setup>
import { useSupabaseClient } from '#imports'
import { useAuth } from '#imports'
import { useRouter } from 'vue-router'

const { currentStep, totalSteps, assessmentData, nextStep, previousStep } = useAssessment()
const supabase = useSupabaseClient()
const { user } = useAuth()
const router = useRouter()
const isSaving = ref(false)

const addPreviousRole = () => {
  assessmentData.value.profile.previousRoles.push({
    title: '',
    year: ''
  })
}

const removePreviousRole = (index) => {
  assessmentData.value.profile.previousRoles.splice(index, 1)
}

const addPotentialPath = () => {
  assessmentData.value.profile.potentialPaths.push({
    futureRole: '',
    longTermRole: ''
  })
}

const removePotentialPath = (index) => {
  assessmentData.value.profile.potentialPaths.splice(index, 1)
}

// Custom Skills Functions
const addCustomSecondarySkill = () => {
  if (!assessmentData.value.skills.customSecondarySkills) {
    assessmentData.value.skills.customSecondarySkills = []
  }
  assessmentData.value.skills.customSecondarySkills.push('')
}

const removeCustomSecondarySkill = (index) => {
  assessmentData.value.skills.customSecondarySkills.splice(index, 1)
  if (assessmentData.value.skills.customSecondarySkills.length === 0) {
    assessmentData.value.skills.hasOtherSecondary = false
  }
}

const addCustomFutureSkill = () => {
  if (!assessmentData.value.skills.customFutureSkills) {
    assessmentData.value.skills.customFutureSkills = []
  }
  assessmentData.value.skills.customFutureSkills.push('')
}

const removeCustomFutureSkill = (index) => {
  assessmentData.value.skills.customFutureSkills.splice(index, 1)
  if (assessmentData.value.skills.customFutureSkills.length === 0) {
    assessmentData.value.skills.hasOtherFuture = false
  }
}

// Initialize custom skills arrays when needed
watch(() => assessmentData.value.skills.hasOtherSecondary, (newValue) => {
  if (newValue && !assessmentData.value.skills.customSecondarySkills) {
    assessmentData.value.skills.customSecondarySkills = ['']
  }
  if (!newValue) {
    assessmentData.value.skills.customSecondarySkills = []
  }
})

watch(() => assessmentData.value.skills.hasOtherFuture, (newValue) => {
  if (newValue && !assessmentData.value.skills.customFutureSkills) {
    assessmentData.value.skills.customFutureSkills = ['']
  }
  if (!newValue) {
    assessmentData.value.skills.customFutureSkills = []
  }
})

// Override the nextStep function to include saving
const handleNextStep = async () => {
  try {
    isSaving.value = true
    
    // If user is logged in, save to database first
    if (user.value) {
      // Check if plan exists and update/create accordingly
      const { data: existingPlan, error: fetchError } = await supabase
        .from('user_plans')
        .select('id')
        .eq('user_id', user.value.id)
        .single()

      const dataToSave = {
        ...assessmentData.value,
        _metadata: {
          isRawData: true,
          lastUpdated: new Date().toISOString(),
          lastStep: currentStep.value
        }
      }

      if (existingPlan) {
        // Update existing plan
        const { error: updateError } = await supabase
          .from('user_plans')
          .update({ assessment_data: dataToSave })
          .eq('id', existingPlan.id)
          .eq('user_id', user.value.id)

        if (updateError) throw updateError
      } else {
        // Create new plan
        const { error: insertError } = await supabase
          .from('user_plans')
          .insert([{
            user_id: user.value.id,
            assessment_data: dataToSave,
            created_at: new Date().toISOString()
          }])

        if (insertError) throw insertError
      }

      // Update localStorage to keep it in sync
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData.value))
    } else {
      // If not logged in, only save to localStorage
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData.value))
    }
    
    nextStep()
  } catch (error) {
    console.error('Error saving assessment data:', error)
  } finally {
    isSaving.value = false
  }
}

// Override the previousStep function to include saving
const handlePreviousStep = async () => {
  try {
    isSaving.value = true
    
    // If user is logged in, save to database first
    if (user.value) {
      // Check if plan exists and update/create accordingly
      const { data: existingPlan, error: fetchError } = await supabase
        .from('user_plans')
        .select('id')
        .eq('user_id', user.value.id)
        .single()

      const dataToSave = {
        ...assessmentData.value,
        _metadata: {
          isRawData: true,
          lastUpdated: new Date().toISOString(),
          lastStep: currentStep.value
        }
      }

      if (existingPlan) {
        // Update existing plan
        const { error: updateError } = await supabase
          .from('user_plans')
          .update({ assessment_data: dataToSave })
          .eq('id', existingPlan.id)
          .eq('user_id', user.value.id)

        if (updateError) throw updateError
      } else {
        // Create new plan
        const { error: insertError } = await supabase
          .from('user_plans')
          .insert([{
            user_id: user.value.id,
            assessment_data: dataToSave,
            created_at: new Date().toISOString()
          }])

        if (insertError) throw insertError
      }

      // Update localStorage to keep it in sync
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData.value))
    } else {
      // If not logged in, only save to localStorage
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData.value))
    }
    
    previousStep()
  } catch (error) {
    console.error('Error saving assessment data:', error)
  } finally {
    isSaving.value = false
  }
}

// Update the submitAssessment function
const submitAssessment = async () => {
  try {
    isSaving.value = true
    
    // If user is logged in, save to database first
    if (user.value) {
      // Check if plan exists and update/create accordingly
      const { data: existingPlan, error: fetchError } = await supabase
        .from('user_plans')
        .select('id')
        .eq('user_id', user.value.id)
        .single()

      const dataToSave = {
        ...assessmentData.value,
        _metadata: {
          isRawData: true,
          lastUpdated: new Date().toISOString(),
          lastStep: currentStep.value,
          isCompleted: true
        }
      }

      if (existingPlan) {
        // Update existing plan
        const { error: updateError } = await supabase
          .from('user_plans')
          .update({ assessment_data: dataToSave })
          .eq('id', existingPlan.id)
          .eq('user_id', user.value.id)

        if (updateError) throw updateError
      } else {
        // Create new plan
        const { error: insertError } = await supabase
          .from('user_plans')
          .insert([{
            user_id: user.value.id,
            assessment_data: dataToSave,
            created_at: new Date().toISOString()
          }])

        if (insertError) throw insertError
      }

      // Update localStorage to keep it in sync
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData.value))
    } else {
      // If not logged in, only save to localStorage
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData.value))
    }
    
    // Get the processed data from useAssessment
    const { submitAssessment: submitToSummary } = useAssessment()
    // This will process the data and save it to localStorage
    submitToSummary()
    
    // Navigate to summary page
    router.push('/summary')
  } catch (error) {
    console.error('Error submitting assessment:', error)
  } finally {
    isSaving.value = false
  }
}

// Add a watch on the assessment data to save changes
watch(
  () => assessmentData.value,
  async (newData) => {
    if (user.value && !isSaving.value) {
      try {
        isSaving.value = true
        
        // Check if plan exists and update/create accordingly
        const { data: existingPlan, error: fetchError } = await supabase
          .from('user_plans')
          .select('id')
          .eq('user_id', user.value.id)
          .single()

        const dataToSave = {
          ...newData,
          _metadata: {
            isRawData: true,
            lastUpdated: new Date().toISOString(),
            lastStep: currentStep.value
          }
        }

        if (existingPlan) {
          // Update existing plan
          const { error: updateError } = await supabase
            .from('user_plans')
            .update({ assessment_data: dataToSave })
            .eq('id', existingPlan.id)
            .eq('user_id', user.value.id)

          if (updateError) throw updateError
        } else {
          // Create new plan
          const { error: insertError } = await supabase
            .from('user_plans')
            .insert([{
              user_id: user.value.id,
              assessment_data: dataToSave,
              created_at: new Date().toISOString()
            }])

          if (insertError) throw insertError
        }

        // Update localStorage to keep it in sync
        localStorage.setItem('assessmentData', JSON.stringify(newData))
      } catch (error) {
        console.error('Error auto-saving assessment data:', error)
      } finally {
        isSaving.value = false
      }
    }
  },
  { deep: true }
)

// Add the clearLocalData function in the script section
const clearLocalData = () => {
  if (confirm('Are you sure you want to clear all assessment data? This action cannot be undone.')) {
    // Clear localStorage items
    localStorage.removeItem('assessmentData')
    localStorage.removeItem('assessmentSummary')
    localStorage.removeItem('linkedinOrResumeText')
    
    // Reset the assessment data to initial state
    assessmentData.value = {
      profile: {
        fullName: '',
        email: '',
        currentRole: '',
        yearsOfExperience: '',
        careerObjective: '',
        previousRoles: [],
        potentialPaths: []
      },
      careerStage: {
        ageRange: '',
        careerFocus: '',
        primaryGoal: '',
        experienceLevel: '',
        developmentApproach: ''
      },
      learningDevelopment: {
        learningOpportunities: '',
        skillAcquisition: '',
        skillApplication: '',
        learningImpact: '',
        futureDevelopment: ''
      },
      leadershipPotential: {
        currentRole: '',
        leadershipExperience: '',
        leadershipSkills: '',
        leadershipAspirations: '',
        readinessLevel: ''
      },
      nineBoxGrid: {
        performance: '',
        delivery: '',
        quality: '',
        growthPotential: '',
        learningAbility: '',
        satisfaction: '',
        motivation: ''
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
    
    // Reset to first step
    currentStep.value = 1
    
    // Show success message
    alert('All assessment data has been cleared. You can start fresh now.')
  }
}
</script> 