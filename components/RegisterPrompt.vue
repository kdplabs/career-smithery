<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold text-slate-800 mb-2">Create an Account or Login</h3>
        <p class="text-slate-600">{{ message }}</p>
      </div>
      
      <!-- Consent Checkboxes -->
      <div class="space-y-4 mb-6">
        <div class="flex items-start gap-3">
          <input
            id="privacy-consent"
            v-model="consent.privacy"
            type="checkbox"
            required
            class="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
          <label for="privacy-consent" class="text-sm text-slate-700">
            I have read and agree to the 
            <NuxtLink to="/privacy-policy" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
              Privacy Policy
            </NuxtLink>
            *
          </label>
        </div>
        
        <div class="flex items-start gap-3">
          <input
            id="contact-consent"
            v-model="consent.contact"
            type="checkbox"
            class="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
          <label for="contact-consent" class="text-sm text-slate-700">
            I consent to receive communications from Career Planner regarding my account, services, and career development opportunities. I understand I can unsubscribe at any time.
          </label>
        </div>
        
        <div class="flex items-start gap-3">
          <input
            id="terms-consent"
            v-model="consent.terms"
            type="checkbox"
            required
            class="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
          <label for="terms-consent" class="text-sm text-slate-700">
            I agree to the 
            <NuxtLink to="/terms-of-service" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
              Terms of Service
            </NuxtLink>
            *
          </label>
        </div>
      </div>
      
      <!-- Error Message -->
      <div v-if="consentError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-800">{{ consentError }}</p>
      </div>
      
      <div class="space-y-4">
        <button
          @click="handleGoogleSignIn"
          :disabled="!allConsentGiven"
          class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <img src="
          https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5" />
          <span class="font-medium text-slate-700">Continue with Google</span>
        </button>
        
        <button
          @click="$emit('close')"
          class="w-full px-4 py-3 text-slate-600 hover:text-slate-800 transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { signInWithGoogle } = useAuth()

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  redirectTo: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['close'])

// Consent state - all checked by default
const consent = ref({
  privacy: true,
  contact: true,
  terms: true
})

const consentError = ref('')

// Check if required consent is given (privacy and terms are required, contact is optional)
const allConsentGiven = computed(() => {
  return consent.value.privacy && consent.value.terms
})

const handleGoogleSignIn = async () => {
  // Validate consent
  if (!allConsentGiven.value) {
    consentError.value = 'Please accept the Privacy Policy and Terms of Service to continue.'
    return
  }
  
  consentError.value = ''
  
  try {
    // console.log('RegisterPrompt - redirectTo prop:', props.redirectTo)
    
    // Store consent data in localStorage temporarily
    if (typeof window !== 'undefined') {
      localStorage.setItem('pendingConsent', JSON.stringify({
        privacy: consent.value.privacy,
        contact: consent.value.contact,
        terms: consent.value.terms,
        timestamp: new Date().toISOString()
      }))
    }
    
    // Pass the redirect URL to the sign-in function
    await signInWithGoogle(props.redirectTo)
  } catch (error) {
    console.error('Error signing in with Google:', error)
    consentError.value = 'Failed to sign in. Please try again.'
    // Clear pending consent on error
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pendingConsent')
    }
  }
}
</script> 