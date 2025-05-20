<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold text-slate-800 mb-2">Create an Account or login</h3>
        <p class="text-slate-600">{{ message }}</p>
      </div>
      
      <div class="space-y-4">
        <button
          @click="handleGoogleSignIn"
          class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5" />
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
const { signInWithGoogle } = useAuth()

const props = defineProps({
  message: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle()
  } catch (error) {
    console.error('Error signing in with Google:', error)
  }
}
</script> 