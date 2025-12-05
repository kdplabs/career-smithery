<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center py-8">
    <div class="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
      <div class="bg-white/80 rounded-2xl shadow-2xl p-0 sm:p-0 backdrop-blur-xl border border-gray-100">
        <div class="p-3 sm:p-6 md:p-10">
          <!-- Progress Bar -->
          <div class="mb-4 sm:mb-6 md:mb-10">
            <div class="flex justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Step {{ currentStep }} of {{ totalSteps }}</span>
              <span class="text-sm font-semibold text-gray-700">{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Step Content -->
          <div>
            <!-- Step 1: Profile & Career Trajectory -->
            <div v-if="currentStep === 1">
              <!-- Contextual Header for First-Time Users -->
              <div class="mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-blue-200 shadow-lg">
                <!-- Row 1: Icon and Title -->
                <div class="flex flex-row items-center gap-3 sm:gap-4 mb-3">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg sm:text-xl font-bold text-gray-900">Let's Build Your Career Plan</h3>
                  </div>
                </div>

                <!-- Row 2: Description -->
                <div class="mb-4">
                  <p class="text-sm sm:text-base text-gray-700 leading-relaxed">
                    This comprehensive assessment will help you understand your career stage, identify your strengths, and create a personalized development plan. 
                    By answering a series of questions across 6 key areas, you'll receive insights based on established career development frameworks.
                  </p>
                </div>
                    
                <!-- Row 3: Rolling Cards Carousel -->
                <div class="relative overflow-hidden rounded-xl bg-white/60 p-3 sm:p-4 h-48 w-full">
                      <div 
                        class="flex flex-nowrap transition-transform duration-500 ease-in-out h-full"
                        :style="{ transform: `translateX(-${currentCardIndex * 100}%)` }"
                      >
                        <!-- 9-Box Grid Card -->
                        <div class="w-full flex-shrink-0 box-border px-1 sm:px-2">
                          <div class="text-center w-full overflow-hidden">
                            <h4 class="text-sm sm:text-base font-semibold text-gray-800 mb-2">9-Box Performance Grid</h4>
                            <div class="grid grid-cols-3 gap-1 sm:gap-1.5 max-w-[180px] sm:max-w-[200px] mx-auto">
                              <div v-for="i in 9" :key="i" 
                                :class="[
                                  'h-8 sm:h-10 rounded-lg border-2 flex items-center justify-center text-xs',
                                  i === 5 ? 'bg-blue-200 border-blue-500 ring-1 ring-blue-400' : 'bg-gray-100 border-gray-300'
                                ]">
                                <span v-if="i === 5" class="font-bold text-blue-800 text-[9px] sm:text-[10px]">You</span>
                              </div>
                            </div>
                            <p class="text-[10px] sm:text-xs text-gray-600 mt-2 px-1 sm:px-2">See where you stand on performance and potential</p>
                          </div>
                        </div>

                        <!-- Career Stage Card -->
                        <div class="w-full flex-shrink-0 box-border px-1 sm:px-2">
                          <div class="text-center w-full overflow-hidden">
                            <h4 class="text-sm sm:text-base font-semibold text-gray-800 mb-2">Career Stage Analysis</h4>
                            <div class="flex justify-center items-center gap-1 sm:gap-1.5 mb-2 flex-wrap px-1 sm:px-2">
                              <div class="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs whitespace-nowrap">Exploration</div>
                              <div class="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs whitespace-nowrap">Establishment</div>
                              <div class="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-blue-200 border-2 border-blue-500 rounded-lg text-[10px] sm:text-xs font-bold whitespace-nowrap">Mid-Career</div>
                              <div class="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs whitespace-nowrap">Late Career</div>
                            </div>
                            <p class="text-[10px] sm:text-xs text-gray-600 px-1 sm:px-2">Identify your current career development stage</p>
                          </div>
                        </div>

                        <!-- Leadership Pipeline Card -->
                        <div class="w-full flex-shrink-0 box-border px-1 sm:px-2">
                          <div class="text-center w-full overflow-hidden">
                            <h4 class="text-sm sm:text-base font-semibold text-gray-800 mb-2">Leadership Journey</h4>
                            <div class="space-y-1 sm:space-y-1.5 max-w-[220px] sm:max-w-[240px] mx-auto">
                              <div class="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs">Managing Self</div>
                              <div class="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs">Managing Others</div>
                              <div class="px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-200 border-2 border-orange-500 rounded-lg text-[10px] sm:text-xs font-bold">Functional Leader</div>
                              <div class="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs">Business Leader</div>
                            </div>
                            <p class="text-[10px] sm:text-xs text-gray-600 mt-2 px-1 sm:px-2">Understand your leadership potential</p>
                          </div>
                        </div>

                        <!-- Skills Profile Card -->
                        <div class="w-full flex-shrink-0 box-border px-1 sm:px-2">
                          <div class="text-center w-full overflow-hidden">
                            <h4 class="text-sm sm:text-base font-semibold text-gray-800 mb-2">Skills Profile</h4>
                            <div class="flex justify-center items-center gap-1.5 sm:gap-2 mb-2 flex-wrap px-1 sm:px-2">
                              <div class="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 rounded-lg border-2 border-gray-300 flex-shrink-0">
                                <div class="text-xl sm:text-2xl font-bold mb-0.5">I</div>
                                <div class="text-[9px] sm:text-[10px] text-gray-600">I-Shaped</div>
                              </div>
                              <div class="px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-200 rounded-lg border-2 border-blue-500 flex-shrink-0">
                                <div class="text-xl sm:text-2xl font-bold mb-0.5">T</div>
                                <div class="text-[9px] sm:text-[10px] text-blue-800 font-semibold">T-Shaped</div>
                              </div>
                              <div class="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 rounded-lg border-2 border-gray-300 flex-shrink-0">
                                <div class="text-xl sm:text-2xl font-bold mb-0.5">Π</div>
                                <div class="text-[9px] sm:text-[10px] text-gray-600">Pi-Shaped</div>
                              </div>
                            </div>
                            <p class="text-[10px] sm:text-xs text-gray-600 px-1 sm:px-2">Discover your skills profile type</p>
                          </div>
                        </div>

                        <!-- Development Journey Card -->
                        <div class="w-full flex-shrink-0 box-border px-1 sm:px-2">
                          <div class="text-center w-full overflow-hidden">
                            <h4 class="text-sm sm:text-base font-semibold text-gray-800 mb-2">Development Journey</h4>
                            <div class="space-y-1 sm:space-y-1.5 max-w-[220px] sm:max-w-[240px] mx-auto">
                              <div class="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs">Level 1: Reaction</div>
                              <div class="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs">Level 2: Learning</div>
                              <div class="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-200 border-2 border-blue-500 rounded-lg text-[10px] sm:text-xs font-bold">Level 3: Behavior</div>
                              <div class="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs">Level 4: Results</div>
                            </div>
                            <p class="text-[10px] sm:text-xs text-gray-600 mt-2 px-1 sm:px-2">Assess your learning and development stage</p>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Carousel Indicators -->
                      <div class="flex justify-center space-x-2 mt-3 sm:mt-4">
                        <button
                          v-for="index in 5"
                          :key="index"
                          @click="currentCardIndex = index - 1"
                          :class="[
                            'w-2 h-2 rounded-full transition-all',
                            currentCardIndex === index - 1 ? 'bg-blue-600 w-6' : 'bg-gray-300'
                          ]"
                        ></button>
                      </div>
                    </div>
              </div>

              <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight">
                <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Profile & Career Trajectory</span>
              </h2>
              <p class="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-10">Let's gather some information about you, your past roles, and future aspirations.</p>
              
              <div class="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
                <!-- Basic Information -->
                <div class="space-y-4 sm:space-y-6 bg-white/80 p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Basic Information</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        v-model="assessmentData.profile.fullName"
                        type="text"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        v-model="assessmentData.profile.email"
                        type="email"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
                      <input
                        v-model="assessmentData.profile.currentRole"
                        type="text"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                      <select
                        v-model="assessmentData.profile.yearsOfExperience"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Previous Roles -->
                <div class="space-y-4 sm:space-y-6 bg-white/80 p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Previous Roles (up to 4)</h3>
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div v-for="(role, index) in assessmentData.profile.previousRoles" :key="index" class="relative bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-md border border-gray-200">
                      <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-medium text-gray-800">Previous Role {{ index + 1 }}</span>
                        <button @click="removePreviousRole(index)" class="flex items-center text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
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
                            class="block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Year (e.g., 2020 or 2019-2021)</label>
                          <input
                            v-model="role.year"
                            type="text"
                            placeholder="e.g., 2020"
                            class="block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="assessmentData.profile.previousRoles.length < 4"
                    @click="addPreviousRole"
                    class="mt-4 inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  >
                    <span class="mr-2">➕</span> Add Previous Role
                  </button>
                </div>

                <!-- Potential Career Paths -->
                <div class="space-y-4 sm:space-y-6 bg-white/80 p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Potential Career Paths (up to 3)</h3>
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div v-for="(path, index) in assessmentData.profile.potentialPaths" :key="index" class="relative bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-md border border-gray-200">
                      <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-medium text-gray-800">Potential Path {{ index + 1 }}</span>
                        <button @click="removePotentialPath(index)" class="flex items-center text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
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
                            class="block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1">Long Term Role (3-5+ years)</label>
                          <input
                            v-model="path.longTermRole"
                            type="text"
                            placeholder="E.g., Tech Lead / Architect"
                            class="block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="assessmentData.profile.potentialPaths.length < 3"
                    @click="addPotentialPath"
                    class="mt-4 inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  >
                    <span class="mr-2">➕</span> Add Potential Path
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 2: Career Stage Assessment -->
            <div v-if="currentStep === 2">
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight">
                <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Career Stage Assessment</span>
              </h2>
              <p class="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">Based on Super's Career Development Theory, let's determine your current career stage.</p>
              
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Questions Section -->
                <div class="lg:col-span-8 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
                  <div class="space-y-4 sm:space-y-6 bg-white/80 p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Career Stage Questions</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What is your current age range?</label>
                      <select
                        v-model="assessmentData.careerStage.ageRange"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                
                <!-- Preview Section (Desktop Only) -->
                <div class="hidden lg:block lg:col-span-4">
                  <div class="sticky top-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-blue-200 shadow-lg">
                    <div class="flex flex-row items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </div>
                      <h3 class="text-sm font-bold text-gray-900">Summary Preview</h3>
                    </div>
                    <div class="bg-white/80 rounded-xl p-3 border border-blue-100">
                      <div class="flex flex-col items-center gap-2 mb-3">
                        <div class="px-2 py-1 bg-gray-100 rounded-lg text-xs w-full text-center">Exploration</div>
                        <div class="px-2 py-1 bg-gray-100 rounded-lg text-xs w-full text-center">Establishment</div>
                        <div class="px-2 py-1 bg-blue-200 border-2 border-blue-500 rounded-lg text-xs font-bold w-full text-center">Mid-Career</div>
                        <div class="px-2 py-1 bg-gray-100 rounded-lg text-xs w-full text-center">Late Career</div>
                      </div>
                      <p class="text-xs text-gray-600 text-center">Your career stage will be displayed with a visual progression chart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Learning & Development Assessment -->
            <div v-if="currentStep === 3">
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight">
                <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Learning & Development Assessment</span>
              </h2>
              <p class="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">Based on Kirkpatrick's Model, let's evaluate your current development stage.</p>
              
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Questions Section -->
                <div class="lg:col-span-8 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
                <div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Learning & Development Questions</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How do you feel about your current learning and development opportunities?</label>
                      <select
                        v-model="assessmentData.learningDevelopment.learningOpportunities"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                
                <!-- Preview Section (Desktop Only) -->
                <div class="hidden lg:block lg:col-span-4">
                  <div class="sticky top-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-blue-200 shadow-lg">
                    <div class="flex flex-row items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                      </div>
                      <h3 class="text-sm font-bold text-gray-900">Summary Preview</h3>
                    </div>
                    <div class="bg-white/80 rounded-xl p-3 border border-blue-100">
                      <div class="space-y-1.5">
                        <div class="px-2 py-1.5 bg-gray-100 rounded-lg text-xs text-center">Level 1: Reaction</div>
                        <div class="px-2 py-1.5 bg-gray-100 rounded-lg text-xs text-center">Level 2: Learning</div>
                        <div class="px-2 py-1.5 bg-blue-200 border-2 border-blue-500 rounded-lg text-xs font-bold text-center">Level 3: Behavior</div>
                        <div class="px-2 py-1.5 bg-gray-100 rounded-lg text-xs text-center">Level 4: Results</div>
                      </div>
                      <p class="text-xs text-gray-600 text-center mt-3">Your development journey level will be highlighted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Leadership Potential Assessment -->
            <div v-if="currentStep === 4">
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight">
                <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Leadership Potential Assessment</span>
              </h2>
              <p class="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">Based on Ram Charan's Leadership Pipeline model, let's evaluate your leadership potential.</p>
              
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Questions Section -->
                <div class="lg:col-span-8 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
                <div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Leadership Assessment Questions</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What best describes your current role?</label>
                      <select
                        v-model="assessmentData.leadershipPotential.currentRole"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                
                <!-- Preview Section (Desktop Only) -->
                <div class="hidden lg:block lg:col-span-4">
                  <div class="sticky top-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-blue-200 shadow-lg">
                    <div class="flex flex-row items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <h3 class="text-sm font-bold text-gray-900">Summary Preview</h3>
                    </div>
                    <div class="bg-white/80 rounded-xl p-3 border border-blue-100">
                      <div class="space-y-1.5">
                        <div class="px-2 py-1.5 bg-gray-100 rounded-lg text-xs text-center">Managing Self</div>
                        <div class="px-2 py-1.5 bg-gray-100 rounded-lg text-xs text-center">Managing Others</div>
                        <div class="px-2 py-1.5 bg-orange-200 border-2 border-orange-500 rounded-lg text-xs font-bold text-center">Functional Leader</div>
                        <div class="px-2 py-1.5 bg-gray-100 rounded-lg text-xs text-center">Business Leader</div>
                      </div>
                      <p class="text-xs text-gray-600 text-center mt-3">Your leadership journey will show your position in the pipeline</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 5: 9-Box Grid Assessment -->
            <div v-if="currentStep === 5">
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight">
                <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">9-Box Grid Assessment</span>
              </h2>
              <p class="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">Let's evaluate your performance and potential using the 9-box grid model.</p>
              
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Questions Section -->
                <div class="lg:col-span-8 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
                <!-- Performance Assessment -->
                <div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Performance Assessment</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your current job performance?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.performance"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                <div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Potential Assessment</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your growth potential?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.growthPotential"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                <div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Engagement Assessment</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How satisfied are you with your current role and responsibilities?</label>
                      <select
                        v-model="assessmentData.nineBoxGrid.satisfaction"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                
                <!-- Preview Section (Desktop Only) -->
                <div class="hidden lg:block lg:col-span-4">
                  <div class="sticky top-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-blue-200 shadow-lg">
                    <div class="flex flex-row items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                      </div>
                      <h3 class="text-sm font-bold text-gray-900">Summary Preview</h3>
                    </div>
                    <div class="bg-white/80 rounded-xl p-3 border border-blue-100">
                      <div class="grid grid-cols-3 gap-1.5 max-w-[180px] mx-auto mb-3">
                        <div v-for="i in 9" :key="i" 
                          :class="[
                            'h-8 rounded-lg border-2 flex items-center justify-center text-[8px]',
                            i === 5 ? 'bg-blue-200 border-blue-500 ring-1 ring-blue-400' : 'bg-gray-100 border-gray-300'
                          ]">
                          <span v-if="i === 5" class="font-bold text-blue-800 text-[7px]">You</span>
                        </div>
                      </div>
                      <p class="text-xs text-gray-600 text-center">Your position on the 9-box grid will be displayed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 6: Skills Assessment -->
            <div v-if="currentStep === 6">
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight">
                <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Skills Assessment</span>
              </h2>
              <p class="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">Let's evaluate your skills profile using the T/I/Pi-shaped model.</p>
              
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Questions Section -->
                <div class="lg:col-span-8 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
                <!-- Primary Skills -->
                <div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Primary Skills</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What is your primary area of expertise?</label>
                      <select
                        v-model="assessmentData.skills.primaryExpertise"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your expertise level in your primary area?</label>
                      <select
                        v-model="assessmentData.skills.expertiseLevel"
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                <div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Secondary Skills</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What secondary areas do you have knowledge in?</label>
                      <div class="mt-4 space-y-3 bg-white p-4 rounded-md shadow-sm">
                        <div v-for="skill in ['Technical', 'Business', 'Design', 'Marketing', 'Sales', 'Operations']" :key="skill" class="flex items-center">
                          <input
                            :id="skill.toLowerCase()"
                            v-model="assessmentData.skills.secondaryAreas"
                            :value="skill.toLowerCase()"
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-blue-400 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
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
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-blue-400 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
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
                          class="flex-1 rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"
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
                        class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2 px-3 sm:py-2.5 sm:px-4 bg-white/70 transition-all"
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
                <div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Future Development</h3>
                  
                  <div class="space-y-3 sm:space-y-4 md:space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">What skills would you like to develop?</label>
                      <div class="mt-4 space-y-3 bg-white p-4 rounded-md shadow-sm">
                        <div v-for="skill in ['Technical Skills', 'Business Skills', 'Design Skills', 'Leadership Skills', 'Communication Skills', 'Project Management']" :key="skill" class="flex items-center">
                          <input
                            :id="skill.toLowerCase().replace(' ', '-')"
                            v-model="assessmentData.skills.futureSkills"
                            :value="skill.toLowerCase()"
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-blue-400 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
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
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-blue-400 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
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
                          class="flex-1 rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"
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
                
                <!-- Preview Section (Desktop Only) -->
                <div class="hidden lg:block lg:col-span-4">
                  <div class="sticky top-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-blue-200 shadow-lg">
                    <div class="flex flex-row items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                      </div>
                      <h3 class="text-sm font-bold text-gray-900">Summary Preview</h3>
                    </div>
                    <div class="bg-white/80 rounded-xl p-3 border border-blue-100">
                      <div class="flex flex-col items-center gap-2 mb-3">
                        <div class="px-3 py-2 bg-gray-100 rounded-lg border-2 border-gray-300 w-full text-center">
                          <div class="text-lg font-bold mb-0.5">I</div>
                          <div class="text-[9px] text-gray-600">I-Shaped</div>
                        </div>
                        <div class="px-3 py-2 bg-blue-200 rounded-lg border-2 border-blue-500 w-full text-center">
                          <div class="text-lg font-bold mb-0.5">T</div>
                          <div class="text-[9px] text-blue-800 font-semibold">T-Shaped</div>
                        </div>
                        <div class="px-3 py-2 bg-gray-100 rounded-lg border-2 border-gray-300 w-full text-center">
                          <div class="text-lg font-bold mb-0.5">Π</div>
                          <div class="text-[9px] text-gray-600">Pi-Shaped</div>
                        </div>
                      </div>
                      <p class="text-xs text-gray-600 text-center">Your skills profile type will be displayed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="mt-8 sm:mt-14 flex flex-row sm:flex-row justify-between gap-2 sm:gap-0">
              <div class="flex flex-row gap-2 sm:space-x-4">
                <button
                  v-if="currentStep > 1"
                  @click="handlePreviousStep"
                  class="inline-flex items-center justify-center p-3 sm:px-7 sm:py-3 border border-gray-300 shadow-md rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:scale-105 transition-all duration-300"
                  aria-label="Previous"
                >
                  <!-- Left Arrow Icon (Mobile) -->
                  <svg class="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <!-- Text (Desktop) -->
                  <span class="hidden sm:inline text-base font-semibold">Previous</span>
                </button>
                <button
                  @click="clearLocalData"
                  class="inline-flex items-center justify-center p-3 sm:px-7 sm:py-3 border border-red-300 shadow-md rounded-xl text-red-700 bg-white hover:bg-red-50 hover:scale-105 transition-all duration-300"
                  aria-label="Clear Data"
                >
                  <!-- Delete Icon (Mobile) -->
                  <svg class="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <!-- Text (Desktop) -->
                  <span class="hidden sm:inline text-base font-semibold">Clear Data</span>
                </button>
              </div>
              
              <button
                v-if="currentStep < totalSteps"
                @click="handleNextStep"
                class="inline-flex items-center justify-center p-3 sm:px-7 sm:py-3 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 shadow-lg hover:scale-105 transition-all duration-300"
                aria-label="Next"
              >
                <!-- Right Arrow Icon (Mobile) -->
                <svg class="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <!-- Text (Desktop) -->
                <span class="hidden sm:inline text-base font-semibold">Next</span>
              </button>
              
              <button
                v-else
                @click="submitAssessment"
                class="inline-flex items-center justify-center p-3 sm:px-7 sm:py-3 border border-transparent rounded-xl text-white bg-gradient-to-r from-green-600 via-green-500 to-blue-500 hover:from-green-700 hover:to-blue-600 shadow-lg hover:scale-105 transition-all duration-300"
                aria-label="Complete Assessment"
              >
                <!-- Checkmark Icon (Mobile) -->
                <svg class="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <!-- Text (Desktop) -->
                <span class="hidden sm:inline text-base font-semibold">Complete Assessment</span>
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
import { useAuth } from '#imports'
import { useRouter } from 'vue-router'

const { currentStep, totalSteps, assessmentData, nextStep, previousStep } = useAssessment()
const supabase = useSupabaseClient()
const { user } = useAuth()
const router = useRouter()
const isSaving = ref(false)

// Carousel state for rolling cards
const currentCardIndex = ref(0)
let carouselInterval = null

// Auto-rotate carousel
onMounted(() => {
  if (currentStep.value === 1) {
    carouselInterval = setInterval(() => {
      currentCardIndex.value = (currentCardIndex.value + 1) % 5
    }, 3000) // Change card every 3 seconds
  }
})

// Clean up interval when component unmounts or step changes
onUnmounted(() => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
})

watch(() => currentStep.value, (newStep) => {
  if (newStep === 1) {
    // Restart carousel when on step 1
    if (carouselInterval) {
      clearInterval(carouselInterval)
    }
    carouselInterval = setInterval(() => {
      currentCardIndex.value = (currentCardIndex.value + 1) % 5
    }, 3000)
  } else {
    // Stop carousel when not on step 1
    if (carouselInterval) {
      clearInterval(carouselInterval)
      carouselInterval = null
    }
  }
})

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
        .maybeSingle()

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

// Override the previousStep function without saving
const handlePreviousStep = () => {
  previousStep()
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
        .maybeSingle()

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



// Helper function to validate and fix corrupted data
const validateAndFixData = (data) => {
  let dataFixed = false
  
  // Check if careerStage is corrupted (should be object, not string)
  if (typeof data.careerStage === 'string') {
    console.log('Detected corrupted careerStage data, fixing...')
    // Reset careerStage to proper object structure
    data.careerStage = {
      ageRange: '',
      careerFocus: '',
      primaryGoal: '',
      experienceLevel: '',
      developmentApproach: ''
    }
    dataFixed = true
  }
  
  // Check if leadershipPotential is corrupted (should be object, not string)
  if (typeof data.leadershipPotential === 'string') {
    console.log('Detected corrupted leadershipPotential data, fixing...')
    // Reset leadershipPotential to proper object structure
    data.leadershipPotential = {
      currentRole: '',
      leadershipExperience: '',
      leadershipSkills: '',
      leadershipAspirations: '',
      readinessLevel: ''
    }
    dataFixed = true
  }
  
  // If any data was fixed, clear potentially corrupted localStorage
  if (dataFixed) {
    localStorage.removeItem('assessmentSummary')
    localStorage.setItem('assessmentData', JSON.stringify(data))
  }
  
  return data
}

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