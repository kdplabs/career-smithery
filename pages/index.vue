<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-b from-blue-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          Forge Your Career Path with Precision
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Career Smithery helps you craft your professional journey using advanced career development theories and personalized insights.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/assessment"
            class="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Start Free Assessment
          </NuxtLink>
          <NuxtLink
            to="/summary"
            class="inline-flex items-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Sample Report
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Comprehensive Career Analysis</h2>
          <p class="text-xl text-gray-600">Built on proven career development theories and modern assessment techniques</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div class="text-blue-600 mb-4">
              <svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Career Stage Assessment</h3>
            <p class="text-gray-600">Based on Super's Career Development Theory, understand your current career stage and trajectory.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div class="text-blue-600 mb-4">
              <svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Leadership Pipeline Analysis</h3>
            <p class="text-gray-600">Evaluate your leadership potential using Ram Charan's Leadership Pipeline model.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div class="text-blue-600 mb-4">
              <svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Skills Assessment</h3>
            <p class="text-gray-600">Analyze your T/I/Pi-shaped skills profile and identify areas for development.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Career Smithery?</h2>
          <p class="text-xl text-gray-600">Get personalized insights and actionable recommendations</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900">Personalized Career Roadmap</h3>
              <p class="mt-2 text-gray-600">Get a detailed career development plan tailored to your unique profile and goals.</p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900">Actionable Insights</h3>
              <p class="mt-2 text-gray-600">Receive clear, practical recommendations to advance your career.</p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900">Data-Driven Analysis</h3>
              <p class="mt-2 text-gray-600">Our assessment is based on proven career development theories and research.</p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900">Time-Saving Process</h3>
              <p class="mt-2 text-gray-600">Complete your assessment in minutes and get instant, comprehensive results.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-blue-600">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span class="block">Ready to forge your career path?</span>
          <span class="block text-blue-200">Start your assessment today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <NuxtLink
              to="/assessment"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
            >
              Get Started
            </NuxtLink>
          </div>
          <div class="ml-3 inline-flex rounded-md shadow">
            <NuxtLink
              to="/summary"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400"
            >
              View Sample
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


