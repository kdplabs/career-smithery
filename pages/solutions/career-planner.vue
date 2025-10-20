<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
    <!-- Hero Section -->
    <div class="relative overflow-hidden min-h-[60vh] flex items-center justify-center">
      <!-- Background Pattern -->
      <div class="absolute inset-0 z-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10"></div>
      <div class="absolute inset-0 z-10 opacity-20">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.3) 1px, transparent 0); background-size: 20px 20px;"></div>
      </div>
      
      <!-- Content -->
      <div class="relative z-20 max-w-6xl mx-auto px-6 py-20 text-center">
        <div class="flex items-center justify-center mb-8">
          <div class="flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-2xl">
            <svg class="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
        <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Career Planner</span>
        </h1>
        <p class="text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Strategic career development and planning tool that helps you understand your current position, identify growth opportunities, and create a roadmap for your professional success.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/assessment"
            class="inline-flex items-center px-10 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start Your Assessment
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-transparent">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Comprehensive Career Analysis</span>
          </h2>
          <p class="text-xl text-gray-600">Built on proven career development theories and modern assessment techniques</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="feature-card group">
            <div class="text-blue-600 mb-4">
              <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Career Stage Assessment</h3>
            <p class="text-gray-600">Based on Super's Career Development Theory, understand your current career stage and trajectory.</p>
          </div>
          <div class="feature-card group">
            <div class="text-purple-600 mb-4">
              <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Leadership Pipeline Analysis</h3>
            <p class="text-gray-600">Evaluate your leadership potential using Ram Charan's Leadership Pipeline model.</p>
          </div>
          <div class="feature-card group">
            <div class="text-pink-500 mb-4">
              <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Skills Assessment</h3>
            <p class="text-gray-600">Analyze your T/I/Pi-shaped skills profile and identify areas for development.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Process Section -->
    <div class="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">How It Works</span>
          </h2>
          <p class="text-xl text-gray-600">Simple steps to unlock your career potential</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="process-step">
            <div class="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-6 shadow-lg">
              <span class="text-2xl font-bold">1</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Complete Assessment</h3>
            <p class="text-gray-600">Take our comprehensive career assessment that evaluates your skills, interests, values, and career stage.</p>
          </div>
          <div class="process-step">
            <div class="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-6 shadow-lg">
              <span class="text-2xl font-bold">2</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Get Personalized Report</h3>
            <p class="text-gray-600">Receive a detailed analysis of your career profile with insights based on proven career development theories.</p>
          </div>
          <div class="process-step">
            <div class="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-500 to-blue-500 text-white mb-6 shadow-lg">
              <span class="text-2xl font-bold">3</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Create Action Plan</h3>
            <p class="text-gray-600">Develop a strategic roadmap with actionable tasks and recommendations to advance your career.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <div class="py-20 bg-transparent">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Why Choose Career Planner?</span>
          </h2>
          <p class="text-xl text-gray-600">Get personalized insights and actionable recommendations</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="benefit-card group">
            <div class="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-4 shadow-lg">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Personalized Career Roadmap</h3>
            <p class="mt-2 text-gray-600">Get a detailed career development plan tailored to your unique profile and goals.</p>
          </div>
          <div class="benefit-card group">
            <div class="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4 shadow-lg">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Actionable Insights</h3>
            <p class="mt-2 text-gray-600">Receive clear, practical recommendations to advance your career.</p>
          </div>
          <div class="benefit-card group">
            <div class="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-pink-500 to-blue-500 text-white mb-4 shadow-lg">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Data-Driven Analysis</h3>
            <p class="mt-2 text-gray-600">Our assessment is based on proven career development theories and research.</p>
          </div>
          <div class="benefit-card group">
            <div class="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-pink-500 text-white mb-4 shadow-lg">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Time-Saving Process</h3>
            <p class="mt-2 text-gray-600">Complete your assessment in minutes and get instant, comprehensive results.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          <span class="block">Ready to plan your career path?</span>
          <span class="block text-blue-200">Start your assessment today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-xl shadow-lg">
            <NuxtLink
              to="/assessment"
              class="inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-semibold rounded-xl text-blue-700 bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300"
            >
              Start Assessment
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  @apply bg-white/80 rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90 cursor-pointer;
  backdrop-filter: blur(6px);
}

.process-step {
  @apply bg-white/80 rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90 cursor-pointer text-center;
  backdrop-filter: blur(6px);
}

.benefit-card {
  @apply bg-white/80 rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90 cursor-pointer flex flex-col items-start;
  backdrop-filter: blur(6px);
}
</style>
