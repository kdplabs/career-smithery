<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-4">Terms of Service</h1>
        <p class="text-slate-600">Last updated: {{ new Date().toLocaleDateString() }}</p>
      </div>

      <!-- Introduction -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">1. Acceptance of Terms</h2>
        <p class="text-slate-700 mb-4">
          By accessing and using Career Planner ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
        <p class="text-slate-700">
          These Terms of Service ("Terms") govern your use of our career assessment and planning services provided by Career Planner ("we," "us," or "our").
        </p>
      </div>

      <!-- Service Description -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">2. Service Description</h2>
        <p class="text-slate-700 mb-4">Career Planner provides:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Career assessment tools and questionnaires</li>
          <li>Personalized career development reports</li>
          <li>Task management and planning features</li>
          <li>Professional development recommendations</li>
          <li>Career coaching and guidance resources</li>
        </ul>
        <p class="text-slate-700">
          We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.
        </p>
      </div>

      <!-- User Accounts -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">3. User Accounts</h2>
        <p class="text-slate-700 mb-4">To access certain features of the Service, you must create an account. You agree to:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and update your account information</li>
          <li>Keep your account credentials secure and confidential</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized use</li>
        </ul>
        <p class="text-slate-700">
          You must be at least 16 years old to create an account. If you are under 18, you must have parental consent.
        </p>
      </div>

      <!-- Acceptable Use -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">4. Acceptable Use</h2>
        <p class="text-slate-700 mb-4">You agree not to use the Service to:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property rights</li>
          <li>Transmit harmful, offensive, or inappropriate content</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with the Service's operation or other users</li>
          <li>Use automated tools to access the Service</li>
          <li>Share account credentials with others</li>
        </ul>
      </div>

      <!-- Payment Terms -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">5. Payment Terms</h2>
        <p class="text-slate-700 mb-4">Some features of the Service require payment:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>All fees are non-refundable unless otherwise stated</li>
          <li>Prices may change with 30 days' notice</li>
          <li>Payment is processed securely through Stripe</li>
          <li>You authorize us to charge your payment method</li>
          <li>Failed payments may result in service suspension</li>
        </ul>
        <p class="text-slate-700">
          Credits purchased are valid for 12 months from purchase date.
        </p>
      </div>

      <!-- Intellectual Property -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">6. Intellectual Property</h2>
        <p class="text-slate-700 mb-4">The Service and its content are protected by intellectual property laws:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>We retain all rights to the Service and its content</li>
          <li>You retain rights to your personal data and content</li>
          <li>You grant us license to use your content for service provision</li>
          <li>You may not copy, modify, or distribute our content</li>
        </ul>
      </div>

      <!-- Privacy and Data -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">7. Privacy and Data</h2>
        <p class="text-slate-700 mb-4">Your privacy is important to us:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>We collect and process data as described in our Privacy Policy</li>
          <li>You control your personal information and can request deletion</li>
          <li>We implement appropriate security measures</li>
          <li>Data may be stored in multiple jurisdictions</li>
        </ul>
        <p class="text-slate-700">
          By using the Service, you consent to our data practices as described in our Privacy Policy.
        </p>
      </div>

      <!-- Disclaimers -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">8. Disclaimers</h2>
        <p class="text-slate-700 mb-4">The Service is provided "as is" without warranties:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>We do not guarantee the accuracy of assessments or recommendations</li>
          <li>Career outcomes depend on many factors beyond our control</li>
          <li>We are not responsible for employment decisions or career changes</li>
          <li>The Service is not a substitute for professional career counseling</li>
          <li>We do not guarantee uninterrupted or error-free service</li>
        </ul>
      </div>

      <!-- Limitation of Liability -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">9. Limitation of Liability</h2>
        <p class="text-slate-700 mb-4">To the maximum extent permitted by law:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>We shall not be liable for indirect, incidental, or consequential damages</li>
          <li>Our total liability shall not exceed the amount you paid for the Service</li>
          <li>We are not liable for data loss or service interruptions</li>
          <li>Some jurisdictions do not allow liability limitations</li>
        </ul>
      </div>

      <!-- Indemnification -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">10. Indemnification</h2>
        <p class="text-slate-700 mb-4">
          You agree to indemnify and hold harmless Career Planner from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
        </p>
      </div>

      <!-- Termination -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">11. Termination</h2>
        <p class="text-slate-700 mb-4">Either party may terminate this agreement:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>You may cancel your account at any time</li>
          <li>We may terminate for Terms violations or non-payment</li>
          <li>Upon termination, your access to the Service will cease</li>
          <li>We may retain data as required by law or for legitimate business purposes</li>
        </ul>
      </div>

      <!-- Governing Law -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">12. Governing Law</h2>
        <p class="text-slate-700 mb-4">
          These Terms are governed by the laws of [Your Jurisdiction]. Any disputes shall be resolved in the courts of [Your Jurisdiction], unless you are a consumer in the European Union, in which case you may bring proceedings in your local courts.
        </p>
      </div>

      <!-- Changes to Terms -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">13. Changes to Terms</h2>
        <p class="text-slate-700 mb-4">We may update these Terms from time to time:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Material changes will be notified via email or in-app notice</li>
          <li>Continued use after changes constitutes acceptance</li>
          <li>You may terminate if you disagree with changes</li>
        </ul>
      </div>

      <!-- Contact Information -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">14. Contact Information</h2>
        <p class="text-slate-700 mb-4">For questions about these Terms, contact us:</p>
        <div class="bg-slate-50 p-4 rounded-lg">
          <p class="text-slate-700"><strong>Email:</strong> info@careersmithery.com</p>
          <p class="text-slate-700"><strong>Support:</strong> <NuxtLink to="/support" class="text-blue-600 hover:text-blue-800">Contact Support</NuxtLink></p>
        </div>
      </div>

      <!-- Back Button -->
      <div class="text-center mt-8">
        <button
          @click="navigateTo('/')"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { navigateTo } from 'nuxt/app'

// Set page title
useHead({
  title: 'Terms of Service - Career Planner',
  meta: [
    { name: 'description', content: 'Terms of Service for Career Planner - Learn about the terms and conditions for using our career assessment and planning services.' }
  ]
})
</script> 