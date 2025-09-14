<template>
  <nav class="bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-xl rounded-b-2xl relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center gap-2 text-2xl font-extrabold text-gray-900">
            <img src="/logo.png" alt="Company Logo" class="h-9 w-9 object-contain rounded" />
            <span>Career Smithery</span>
          </NuxtLink>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink
              to="/"
              class="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200"
              active-class="nav-gradient-active"
            >
              Home
            </NuxtLink>
            
            <!-- Solutions Dropdown -->
            <div class="relative" @mouseenter="showSolutionsDropdown = true" @mouseleave="showSolutionsDropdown = false">
              <button class="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200">
                Solutions
                <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="showSolutionsDropdown" class="absolute top-full left-0 mt-1 w-56 rounded-xl shadow-2xl bg-white/95 ring-1 ring-blue-200 ring-opacity-60 z-[60] backdrop-blur-md border border-blue-100">
                <div class="py-2">
                  <NuxtLink
                    to="/solutions/career-planner"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
                    @click="showSolutionsDropdown = false"
                  >
                    <div class="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white mr-3">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <div class="font-semibold">Career Planner</div>
                      <div class="text-xs text-gray-500">Strategic career development</div>
                    </div>
                  </NuxtLink>
                  <NuxtLink
                    to="/solutions/resume-builder"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
                    @click="showSolutionsDropdown = false"
                  >
                    <div class="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white mr-3">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <div class="font-semibold">Resume Builder</div>
                      <div class="text-xs text-gray-500">AI-powered resume creation</div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <NuxtLink
              to="/assessment"
              class="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200"
              active-class="nav-gradient-active"
            >
              Assessment
            </NuxtLink>
            <NuxtLink
              to="/summary"
              class="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200"
              active-class="nav-gradient-active"
            >
              Summary
            </NuxtLink>
            <NuxtLink
              v-if="user"
              to="/personalized-report"
              class="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200"
              active-class="nav-gradient-active"
            >
              Report
            </NuxtLink>
            <NuxtLink
              v-if="user"
              to="/tasks"
              class="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200"
              active-class="nav-gradient-active"
            >
              Tasks
            </NuxtLink>
            <NuxtLink
              v-if="user"
              to="/jobs"
              class="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200"
              active-class="nav-gradient-active"
            >
              Jobs
            </NuxtLink>
          </div>
        </div>
        <!-- Mobile menu button -->
        <div class="flex sm:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Open main menu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all">
            <svg v-if="!mobileMenuOpen" class="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <svg v-else class="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <!-- Right side: Auth/User -->
        <div class="hidden sm:flex sm:items-center">
          <template v-if="user">
            <div class="relative">
              <button @click="handleDropdownClick" aria-label="User menu" class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-all" type="button">
                <img v-if="user.user_metadata?.avatar_url" :src="user.user_metadata.avatar_url" alt="Profile" class="h-9 w-9 rounded-full object-cover border-2 border-blue-200 shadow" />
                <svg v-else class="h-9 w-9 rounded-full bg-slate-200 text-slate-500 p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span class="sr-only">Open user menu</span>
              </button>
              <div v-if="showDropdown" class="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-white/90 ring-1 ring-blue-200 ring-opacity-60 z-[60] backdrop-blur-md border border-blue-100" @click.stop>
                <div class="py-1">
                  <NuxtLink 
                    to="/credits" 
                    class="flex items-center justify-between rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    <span>Credits</span>
                    <span class="font-semibold text-blue-600">{{ userCredits }}</span>
                  </NuxtLink>
                  <div class="px-4 py-2 text-xs text-slate-500 border-t border-slate-100">
                    <div class="flex items-center gap-2">
                      <Icon name="i-heroicons-shield-check" class="w-3 h-3" />
                      <span>Consent: {{ hasConsent() ? 'Given' : 'Pending' }}</span>
                    </div>
                  </div>
                  <button @click="signOut" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">Logout</button>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <button @click="showLoginPrompt" class="ml-4 px-5 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-pink-600 shadow-lg transition-all" aria-label="Login or Register">
              Login / Register
            </button>
          </template>
        </div>
      </div>
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="sm:hidden mt-2">
        <div class="space-y-1 pb-3 bg-white/90 rounded-xl shadow-xl border border-blue-100 backdrop-blur-md">
          <NuxtLink
            to="/"
            class="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all"
            active-class="!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700"
            @click="mobileMenuOpen = false"
          >Home</NuxtLink>
          
          <!-- Solutions Section in Mobile -->
          <div class="px-3 py-2">
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Solutions</div>
            <div class="space-y-1 ml-4">
              <NuxtLink
                to="/solutions/career-planner"
                class="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 transition-all"
                @click="mobileMenuOpen = false"
              >
                <div class="flex items-center justify-center h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-purple-500 text-white mr-3">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                Career Planner
              </NuxtLink>
              <NuxtLink
                to="/solutions/resume-builder"
                class="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 transition-all"
                @click="mobileMenuOpen = false"
              >
                <div class="flex items-center justify-center h-6 w-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 text-white mr-3">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                Resume Builder
              </NuxtLink>
            </div>
          </div>
          
          <NuxtLink
            to="/assessment"
            class="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all"
            active-class="!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700"
            @click="mobileMenuOpen = false"
          >Assessment</NuxtLink>
          <NuxtLink
            to="/summary"
            class="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all"
            active-class="!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700"
            @click="mobileMenuOpen = false"
          >Summary</NuxtLink>
          <template v-if="user">
            <NuxtLink
              to="/personalized-report"
              class="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all"
              active-class="!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700"
              @click="mobileMenuOpen = false"
            >Report</NuxtLink>
            <NuxtLink
              to="/tasks"
              class="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all"
              active-class="!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700"
              @click="mobileMenuOpen = false"
            >Tasks</NuxtLink>
            <NuxtLink
              to="/jobs"
              class="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all"
              active-class="!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700"
              @click="mobileMenuOpen = false"
            >Jobs</NuxtLink>
            <NuxtLink 
              to="/credits" 
              class="flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all"
              @click="mobileMenuOpen = false"
            >
              <span>Credits</span>
              <span class="font-semibold text-blue-600">{{ userCredits }}</span>
            </NuxtLink>
            <button @click="signOut" class="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all">Logout</button>
          </template>
          <template v-else>
            <button @click="showLoginPrompt" class="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-blue-700 hover:bg-blue-50 transition-all">Login / Register</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Register Prompt Modal -->
  <RegisterPrompt
    v-if="showRegisterPrompt"
    :message="registerPromptMessage"
    @close="showRegisterPrompt = false"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useCredits } from '~/composables/useCredits'
import RegisterPrompt from '~/components/RegisterPrompt.vue'

const { user, signInWithGoogle, signOut, hasConsent } = useAuth()
const { userCredits } = useCredits()
const showDropdown = ref(false)
const showSolutionsDropdown = ref(false)
const mobileMenuOpen = ref(false)
const showRegisterPrompt = ref(false)
const registerPromptMessage = ref('Please log in to access all features.')

function handleDropdownClick(e) {
  e.stopPropagation()
  showDropdown.value = !showDropdown.value
}

function handleDocumentClick() {
  showDropdown.value = false
}

function showLoginPrompt() {
  // Store the current page as the intended destination
  const currentPath = window.location.pathname + window.location.search
  localStorage.setItem('intendedDestination', currentPath)
  
  // Show consent popup for new users
  showRegisterPrompt.value = true
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style scoped>
.nav-gradient-active {
  color: #1e293b !important; /* text-slate-900 (dark) */
  border-bottom: 3px solid;
  border-image: linear-gradient(to right, #3b82f6, #a78bfa, #f472b6) 1;
  border-radius: 0;
  background: none !important;
  box-shadow: none !important;
}
</style> 