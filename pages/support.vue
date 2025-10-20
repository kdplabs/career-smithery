<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-4">Support Center</h1>
        <p class="text-slate-600">We're here to help! Submit a support request and we'll get back to you as soon as possible.</p>
      </div>

      <!-- Support Form -->
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="submitSupportRequest" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-2">
              Email Address *
            </label>
            <input
              id="email"
              v-model="supportForm.email"
              type="email"
              required
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
          </div>

          <!-- Subject -->
          <div>
            <label for="subject" class="block text-sm font-medium text-slate-700 mb-2">
              Subject *
            </label>
            <input
              id="subject"
              v-model="supportForm.subject"
              type="text"
              required
              maxlength="255"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of your issue"
            />
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-slate-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              v-model="supportForm.category"
              required
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="technical">Technical Issue</option>
              <option value="billing">Billing & Payment</option>
              <option value="account">Account & Login</option>
              <option value="assessment">Assessment Questions</option>
              <option value="report">Report Generation</option>
              <option value="feature">Feature Request</option>
              <option value="privacy">Privacy & Data</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>

          <!-- Priority -->
          <div>
            <label for="priority" class="block text-sm font-medium text-slate-700 mb-2">
              Priority Level
            </label>
            <select
              id="priority"
              v-model="supportForm.priority"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low - General question or feedback</option>
              <option value="medium">Medium - Feature request or minor issue</option>
              <option value="high">High - Important functionality not working</option>
              <option value="urgent">Urgent - Critical issue affecting service</option>
            </select>
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-medium text-slate-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              v-model="supportForm.message"
              required
              rows="6"
              maxlength="2000"
              class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and what you were trying to accomplish..."
            ></textarea>
            <div class="text-sm text-slate-500 mt-1">
              {{ supportForm.message.length }}/2000 characters
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center">
              <Icon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-600 mr-2" />
              <span class="text-red-800 text-sm">{{ error }}</span>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all flex items-center gap-2"
            >
              <Icon v-if="isSubmitting" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
              <Icon v-else name="i-heroicons-paper-airplane" class="w-4 h-4" />
              {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success Overlay -->
      <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div class="p-8 text-center">
            <div class="flex items-center justify-center mb-6">
              <div class="bg-green-100 p-4 rounded-full">
                <Icon name="i-heroicons-check-circle" class="w-16 h-16 text-green-600" />
              </div>
            </div>
            
            <h3 class="text-3xl font-bold text-green-800 mb-4">Thank You!</h3>
            
            <div class="space-y-6">
              <p class="text-lg text-green-700 font-medium">
                Your support request has been submitted successfully.
              </p>
              
              <div class="bg-green-50 rounded-xl p-6 border border-green-200">
                <div class="flex items-center justify-center mb-3">
                  <Icon name="i-heroicons-clock" class="w-6 h-6 text-blue-600 mr-2" />
                  <span class="text-sm font-semibold text-blue-700">Response Time</span>
                </div>
                <p class="text-slate-700 mb-3">
                  We'll get back to you as soon as possible, typically within <strong>24-48 hours</strong>.
                </p>
                <p class="text-sm text-slate-600">
                  For urgent matters, please include "URGENT" in your subject line.
                </p>
              </div>
              
              <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p class="text-sm text-slate-700 mb-2">
                  <strong>Reference ID:</strong> 
                </p>
                <p class="font-mono text-lg text-blue-700 bg-white px-3 py-2 rounded border">
                  {{ submittedRequestId }}
                </p>
                <p class="text-xs text-slate-600 mt-2">
                  Please save this reference ID for future correspondence.
                </p>
              </div>
            </div>
            
            <div class="mt-8 space-y-4">
              <!-- Primary CTA - Go to Home -->
              <button
                @click="goToHome"
                class="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
              >
                <Icon name="i-heroicons-home" class="w-5 h-5 inline mr-2" />
                Back to Home
              </button>
              
              <!-- Secondary CTA - Submit Another -->
              <button
                @click="submitAnotherRequest"
                class="w-full px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-medium"
              >
                Submit Another Request
              </button>
              
              <div class="text-sm text-slate-600 pt-4 border-t border-slate-200">
                <p>Need immediate help? Check our 
                  <NuxtLink to="/assessment-guide" class="text-blue-600 hover:text-blue-800 underline">Assessment Guide</NuxtLink>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <!-- <div class="mt-12">
        <h2 class="text-2xl font-bold text-slate-800 mb-6 text-center">Frequently Asked Questions</h2>
        <div class="grid gap-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-slate-200 rounded-lg">
            <button
              @click="toggleFaq(index)"
              class="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span class="font-medium text-slate-800">{{ faq.question }}</span>
              <Icon 
                :name="expandedFaqs.includes(index) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
                class="w-5 h-5 text-slate-500" 
              />
            </button>
            <div v-if="expandedFaqs.includes(index)" class="px-4 pb-3">
              <p class="text-slate-700">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Contact Information -->
      <div class="mt-12 bg-slate-50 rounded-xl p-6">
        <h2 class="text-xl font-bold text-slate-800 mb-4 text-center">Other Ways to Contact Us</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="text-center">
            <Icon name="i-heroicons-envelope" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 class="font-semibold text-slate-800 mb-1">Email Support</h3>
            <p class="text-slate-600">info@careersmithery.com</p>
            <p class="text-sm text-slate-500">Response within 24-48 hours</p>
          </div>
          <div class="text-center">
            <Icon name="i-heroicons-document-text" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 class="font-semibold text-slate-800 mb-1">Documentation</h3>
            <NuxtLink to="/assessment-guide" class="text-blue-600 hover:text-blue-800">
              Assessment Guide
            </NuxtLink>
            <p class="text-sm text-slate-500">Learn how to use our platform</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

// Set page title
useHead({
  title: 'Support Center - Career Planner',
  meta: [
    { name: 'description', content: 'Get help and support for Career Planner. Submit support requests and find answers to frequently asked questions.' }
  ]
})

const { user } = useAuth()
const supabase = useSupabaseClient()

// Form data
const supportForm = ref({
  email: user.value?.email || '',
  subject: '',
  message: '',
  category: '',
  priority: 'medium'
})

// Form state
const isSubmitting = ref(false)
const error = ref('')
const showSuccess = ref(false)
const submittedRequestId = ref('')

// FAQ state
const expandedFaqs = ref([])

// FAQ data
const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password."
  },
  {
    question: "How long does it take to generate a personalized report?",
    answer: "Personalized reports typically take 2-5 minutes to generate. You'll receive an email notification when your report is ready."
  },
  {
    question: "Can I export my assessment results?",
    answer: "Yes, you can download your assessment results and personalized reports as PDF files from your dashboard."
  },
  {
    question: "How do I update my profile information?",
    answer: "You can update your profile information by going to your dashboard and clicking on the 'Edit Profile' section."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards and debit cards through our secure payment processor, Stripe."
  },
  {
    question: "Is my data secure and private?",
    answer: "Yes, we take data security seriously. All data is encrypted, and we never share your personal information with third parties. See our Privacy Policy for more details."
  }
]

// Toggle FAQ expansion
const toggleFaq = (index) => {
  const position = expandedFaqs.value.indexOf(index)
  if (position > -1) {
    expandedFaqs.value.splice(position, 1)
  } else {
    expandedFaqs.value.push(index)
  }
}

// Submit support request
const submitSupportRequest = async () => {
  isSubmitting.value = true
  error.value = ''

  try {
    // Validate form
    if (!supportForm.value.email || !supportForm.value.subject || !supportForm.value.message || !supportForm.value.category) {
      throw new Error('Please fill in all required fields.')
    }

    // Prepare request data
    const requestData = {
      user_id: user.value?.id || null,
      email: supportForm.value.email,
      subject: supportForm.value.subject,
      message: supportForm.value.message,
      category: supportForm.value.category,
      priority: supportForm.value.priority,
      status: 'open'
    }

    // Insert into database
    const { data, error: dbError } = await supabase
      .from('support_requests')
      .insert([requestData])
      .select('id')
      .single()

    if (dbError) throw dbError

    // Show success message
    submittedRequestId.value = data.id
    showSuccess.value = true

  } catch (err) {
    console.error('Error submitting support request:', err)
    error.value = err.message || 'Failed to submit support request. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Reset form and show success overlay
const resetForm = () => {
  supportForm.value = {
    email: user.value?.email || '',
    subject: '',
    message: '',
    category: '',
    priority: 'medium'
  }
  error.value = ''
  showSuccess.value = false
  submittedRequestId.value = ''
}

// Reset form for submitting another request
const submitAnotherRequest = () => {
  supportForm.value = {
    email: user.value?.email || '',
    subject: '',
    message: '',
    category: '',
    priority: 'medium'
  }
  error.value = ''
  showSuccess.value = false
  submittedRequestId.value = ''
}

// Go to home page
const goToHome = () => {
  navigateTo('/')
}
</script> 