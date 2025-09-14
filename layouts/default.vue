<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <footer class="bg-slate-50 border-t border-slate-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Company Logo" class="h-8 w-8 object-contain rounded" />
              <span class="text-xl font-bold text-slate-800">Career Smithery</span>
            </div>
            <p class="text-slate-600 mb-4">
              Empowering professionals with data-driven career insights and personalized development plans.
            </p>
            <div class="flex space-x-4">
              <NuxtLink to="/support" class="text-slate-600 hover:text-blue-600 transition-colors">
                Support
              </NuxtLink>
              <NuxtLink to="/privacy-policy" class="text-slate-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </NuxtLink>
              <NuxtLink to="/terms-of-service" class="text-slate-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </NuxtLink>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h3 class="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Solutions</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/solutions/career-planner" class="text-slate-600 hover:text-blue-600 transition-colors">
                  Career Planner
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/solutions/resume-builder" class="text-slate-600 hover:text-blue-600 transition-colors">
                  Resume Builder
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <!-- Services -->
          <div>
            <h3 class="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Services</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/assessment" class="text-slate-600 hover:text-blue-600 transition-colors">
                  Career Assessment
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/summary" class="text-slate-600 hover:text-blue-600 transition-colors">
                  Assessment Summary
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/personalized-report" class="text-slate-600 hover:text-blue-600 transition-colors">
                  Personalized Reports
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/tasks" class="text-slate-600 hover:text-blue-600 transition-colors">
                  Task Management
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <!-- Contact -->
          <div>
            <h3 class="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Contact</h3>
            <ul class="space-y-2">
              <li>
                <a href="mailto:info@careersmithery.com" class="text-slate-600 hover:text-blue-600 transition-colors">
                  info@careersmithery.com
                </a>
              </li>
              <li>
                <NuxtLink to="/support" class="text-slate-600 hover:text-blue-600 transition-colors">
                  Get Help
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-slate-200">
          <p class="text-center text-slate-500 text-sm">
            © {{ new Date().getFullYear() }} Career Smithery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template> 