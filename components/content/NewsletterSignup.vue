<template>
  <div class="my-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg p-8 text-white shadow-xl">
    <div class="max-w-2xl mx-auto text-center">
      <div class="text-4xl mb-4">📬</div>
      <h3 class="text-2xl font-bold mb-3">{{ title }}</h3>
      <p class="text-primary-100 mb-6">{{ description }}</p>
      
      <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-3">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          class="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Subscribing...' : buttonText }}
        </button>
      </form>
      
      <p v-if="message" :class="['mt-4 text-sm', success ? 'text-green-200' : 'text-red-200']">
        {{ message }}
      </p>
      
      <p class="text-xs text-primary-200 mt-4">
        {{ disclaimer }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Stay Updated'
  },
  description: {
    type: String,
    default: 'Get the latest career tips and insights delivered to your inbox.'
  },
  buttonText: {
    type: String,
    default: 'Subscribe'
  },
  disclaimer: {
    type: String,
    default: 'We respect your privacy. Unsubscribe at any time.'
  }
})

const email = ref('')
const loading = ref(false)
const message = ref('')
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  message.value = ''
  
  try {
    // Add your newsletter subscription logic here
    // For now, just simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    success.value = true
    message.value = 'Thanks for subscribing! Check your email to confirm.'
    email.value = ''
  } catch (error) {
    success.value = false
    message.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

