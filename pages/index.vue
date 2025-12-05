<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
    <!-- Hero Section -->
    <div class="relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      <!-- Parallax Background Image -->
      <div class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 will-change-transform transition-transform duration-700" style="background-image: url('https://assets.lummi.ai/assets/Qmf7q7U4We798WybQL24GffAECc9nQJjvtGnsxQwSmkw6o?auto=format&w=1500');"></div>
      <!-- Glassy Overlay -->
      <div class="absolute inset-0 z-10 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-purple-900/70 backdrop-blur-xl"></div>
      <!-- Content -->
      <div class="relative z-20 max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center animate-fade-in-up">
        <h1 class="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight animate-slide-down">
          Forge Your Career Path with <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Precision</span>
        </h1>
        <p class="text-2xl text-blue-100 mb-10 max-w-2xl mx-auto drop-shadow-lg animate-fade-in">
          Career Smithery helps you craft your professional journey using advanced career development theories and personalized insights.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <NuxtLink
            to="/assessment"
            class="inline-flex items-center px-10 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 shadow-xl hover:scale-105 transition-all duration-300"
          >
            Plan Career
          </NuxtLink>
          <NuxtLink
            to="/jobs"
            class="inline-flex items-center px-10 py-4 border border-white/30 text-lg font-semibold rounded-xl text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 backdrop-blur-md shadow-xl hover:scale-105 transition-all duration-300"
          >
            Build Resume
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Solutions Section -->
    <div class="py-20 bg-transparent">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Complete Career Solutions</span>
          </h2>
          <p class="text-xl text-gray-600">Two powerful tools to manage every aspect of your professional journey</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <!-- Career Planner Solution -->
          <div class="solution-card group">
            <div class="flex items-center mb-6">
              <div class="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white mr-4 shadow-lg">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Career Planner</h3>
                <p class="text-gray-600">Strategic career development & planning</p>
              </div>
            </div>
            <p class="text-gray-600 mb-6">Comprehensive career assessment and planning tool that helps you understand your current position, identify growth opportunities, and create a strategic roadmap for your professional development.</p>
            <div class="space-y-3 mb-8">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Career stage assessment using Super's theory</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Leadership pipeline analysis</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Personalized development roadmap</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Skills gap analysis & recommendations</span>
              </div>
            </div>
            <div class="flex gap-3">
              <NuxtLink
                to="/solutions/career-planner"
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More
              </NuxtLink>
              <NuxtLink
                to="/assessment"
                class="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold text-center hover:bg-blue-50 transition-all duration-300"
              >
                Start Assessment
              </NuxtLink>
            </div>
          </div>

          <!-- Resume Builder Solution -->
          <div class="solution-card group">
            <div class="flex items-center mb-6">
              <div class="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mr-4 shadow-lg">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Resume Builder</h3>
                <p class="text-gray-600">AI-powered resume creation & optimization</p>
              </div>
            </div>
            <p class="text-gray-600 mb-6">Advanced resume building tool that creates professional, ATS-optimized resumes tailored to your career goals and target positions using AI technology.</p>
            <div class="space-y-3 mb-8">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">AI-powered content generation</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">ATS-optimized formatting</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Multiple professional templates</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Job-specific customization</span>
              </div>
            </div>
            <div class="flex gap-3">
              <NuxtLink
                to="/solutions/resume-builder"
                class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More
              </NuxtLink>
              <NuxtLink
                to="/jobs"
                class="flex-1 border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold text-center hover:bg-purple-50 transition-all duration-300"
              >
                Build Resume
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Comprehensive Career Analysis</span>
          </h2>
          <p class="text-xl text-gray-600">Built on proven career development theories and modern assessment techniques</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
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

    <!-- Benefits Section -->
    <div class="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Why Choose Career Smithery?</span>
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
          <span class="block">Ready to forge your career path?</span>
          <span class="block text-blue-200">Start your assessment today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-xl shadow-lg">
            <NuxtLink
              to="/assessment"
              class="inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-semibold rounded-xl text-blue-700 bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </NuxtLink>
          </div>
          <div class="ml-3 inline-flex rounded-xl shadow-lg">
            <NuxtLink
              to="/summary"
              class="inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-500 hover:bg-blue-400 hover:scale-105 transition-all duration-300"
            >
              View Sample
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Career Smithery - AI-Powered Career Development & Resume Builder',
  meta: [
    {
      name: 'description',
      content: 'Forge your career path with precision. Career Smithery helps you craft your professional journey using advanced career development theories, personalized insights, AI-powered resume building, and comprehensive career assessments.'
    },
    {
      property: 'og:title',
      content: 'Career Smithery - AI-Powered Career Development & Resume Builder'
    },
    {
      property: 'og:description',
      content: 'Forge your career path with precision. Career Smithery helps you craft your professional journey using advanced career development theories, personalized insights, AI-powered resume building, and comprehensive career assessments.'
    },
    {
      property: 'og:url',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/`
    },
    {
      property: 'og:image',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/logo.png`
    },
    {
      name: 'twitter:title',
      content: 'Career Smithery - AI-Powered Career Development & Resume Builder'
    },
    {
      name: 'twitter:description',
      content: 'Forge your career path with precision. Career Smithery helps you craft your professional journey using advanced career development theories, personalized insights, AI-powered resume building, and comprehensive career assessments.'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Career Smithery',
        url: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/`,
        description: 'AI-powered career development and resume building platform',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/blog?search={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})
</script>

<style scoped>
.hero-overlay {
  /* No longer used, replaced by glassy overlay */
}

@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes slide-down {
  0% { opacity: 0; transform: translateY(-40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) both;
}
.animate-fade-in {
  animation: fade-in 1.2s 0.2s cubic-bezier(0.4,0,0.2,1) both;
}
.animate-slide-down {
  animation: slide-down 1.1s cubic-bezier(0.4,0,0.2,1) both;
}

.solution-card {
  @apply bg-white/90 rounded-3xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/95 cursor-pointer;
  backdrop-filter: blur(8px);
}
.feature-card {
  @apply bg-white/80 rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90 cursor-pointer;
  backdrop-filter: blur(6px);
}
.benefit-card {
  @apply bg-white/80 rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90 cursor-pointer flex flex-col items-start;
  backdrop-filter: blur(6px);
}
</style>
