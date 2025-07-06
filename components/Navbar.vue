<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center gap-2 text-xl font-bold text-gray-900">
            <img src="/logo.png" alt="Company Logo" class="h-9 w-9 object-contain rounded" />
            <span>Career Smithery</span>
          </NuxtLink>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink
              to="/"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/assessment"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Assessment
            </NuxtLink>
            <NuxtLink
              v-if="user"
              to="/tasks"
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Tasks
            </NuxtLink>
          </div>
        </div>
        <!-- Mobile menu button -->
        <div class="flex sm:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Open main menu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
            <svg v-if="!mobileMenuOpen" class="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <svg v-else class="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <!-- Right side: Auth/User -->
        <div class="hidden sm:flex sm:items-center">
          <template v-if="user">
            <div class="relative">
              <button @click="handleDropdownClick" aria-label="User menu" class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full" type="button">
                <img v-if="user.user_metadata?.avatar_url" :src="user.user_metadata.avatar_url" alt="Profile" class="h-9 w-9 rounded-full object-cover border border-slate-200" />
                <svg v-else class="h-9 w-9 rounded-full bg-slate-200 text-slate-500 p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span class="sr-only">Open user menu</span>
              </button>
              <div v-if="showDropdown" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50" @click.stop>
                <div class="py-1">
                  <NuxtLink 
                    to="/credits" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                  >
                    <span>Credits</span>
                    <span class="font-semibold text-blue-600">{{ userCredits }}</span>
                  </NuxtLink>
                  <button @click="signOut" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <button @click="signInWithGoogle" class="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition" aria-label="Login or Register">
              Login / Register
            </button>
          </template>
        </div>
      </div>
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="sm:hidden mt-2">
        <div class="space-y-1 pb-3">
          <NuxtLink
            to="/"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            @click="mobileMenuOpen = false"
          >Home</NuxtLink>
          <NuxtLink
            to="/assessment"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            @click="mobileMenuOpen = false"
          >Assessment</NuxtLink>
          <template v-if="user">
            <NuxtLink
              to="/tasks"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              @click="mobileMenuOpen = false"
            >Tasks</NuxtLink>
            <NuxtLink 
              to="/credits" 
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-between"
              @click="mobileMenuOpen = false"
            >
              <span>Credits</span>
              <span class="font-semibold text-blue-600">{{ userCredits }}</span>
            </NuxtLink>
            <button @click="signOut" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Logout</button>
          </template>
          <template v-else>
            <button @click="signInWithGoogle" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50">Login / Register</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useCredits } from '~/composables/useCredits'

const { user, signInWithGoogle, signOut } = useAuth()
const { userCredits } = useCredits()
const showDropdown = ref(false)
const mobileMenuOpen = ref(false)

function handleDropdownClick(e) {
  e.stopPropagation()
  showDropdown.value = !showDropdown.value
}

function handleDocumentClick() {
  showDropdown.value = false
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style scoped>
/* Component-specific styles can be added here if needed */
</style> 