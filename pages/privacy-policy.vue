<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-4">Privacy Policy</h1>
        <p class="text-slate-600">Last updated: {{ new Date().toLocaleDateString() }}</p>
      </div>

      <!-- Introduction -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">1. Introduction</h2>
        <p class="text-slate-700 mb-4">
          Welcome to Career Planner ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our career assessment and planning services.
        </p>
        <p class="text-slate-700">
          By using our services, you consent to the data practices described in this policy. If you do not agree with our policies and practices, please do not use our services.
        </p>
      </div>

      <!-- Information We Collect -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">2. Information We Collect</h2>
        
        <h3 class="text-xl font-semibold text-slate-700 mb-3">2.1 Personal Information</h3>
        <p class="text-slate-700 mb-4">We may collect the following personal information:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Name and contact information (email address, phone number)</li>
          <li>Professional information (current role, years of experience, career objectives)</li>
          <li>Assessment responses and career development data</li>
          <li>Profile images and professional documents</li>
          <li>Payment information (processed securely through Stripe)</li>
          <li>Communication preferences and marketing consent</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-slate-700 mb-3">2.2 AI Processing and GPT Engines</h3>
        <p class="text-slate-700 mb-4">To provide personalized career assessments and recommendations, we may process your information using artificial intelligence (AI) technologies, including GPT (Generative Pre-trained Transformer) engines:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li><strong>Assessment Analysis:</strong> Your assessment responses may be processed by AI engines to generate personalized career insights and recommendations</li>
          <li><strong>Report Generation:</strong> AI technologies help create detailed career reports and development plans based on your input</li>
          <li><strong>Data Processing:</strong> Your professional information and career objectives may be analyzed by AI systems to provide tailored advice</li>
          <li><strong>Third-Party AI Services:</strong> We may use third-party AI services (such as OpenAI's GPT models) to enhance our career planning capabilities</li>
        </ul>
        <p class="text-slate-700 mb-4">
          <strong>Important:</strong> When your data is processed by AI engines, it may be transmitted to and processed by third-party AI service providers. These providers have their own privacy policies and data handling practices. We ensure that any data shared with AI service providers is done in accordance with this privacy policy and applicable data protection laws.
        </p>

        <h3 class="text-xl font-semibold text-slate-700 mb-3">2.3 Automatically Collected Information</h3>
        <p class="text-slate-700 mb-4">We automatically collect certain information when you use our services:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Usage data (pages visited, time spent, features used)</li>
          <li>Cookies and similar tracking technologies</li>
          <li>Log files and analytics data</li>
        </ul>
      </div>

      <!-- How We Use Your Information -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">3. How We Use Your Information</h2>
        <p class="text-slate-700 mb-4">We use your information for the following purposes:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Provide and maintain our career assessment and planning services</li>
          <li>Generate personalized career reports and recommendations using AI technologies</li>
          <li>Process and analyze assessment data through AI engines for career insights</li>
          <li>Process payments and manage subscriptions</li>
          <li>Communicate with you about your account and services</li>
          <li>Send marketing communications (with your consent)</li>
          <li>Improve our services and develop new features</li>
          <li>Ensure security and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>
      </div>

      <!-- Information Sharing -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">4. Information Sharing and Disclosure</h2>
        <p class="text-slate-700 mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li><strong>AI Service Providers:</strong> With AI technology providers (such as OpenAI) to process your assessment data and generate personalized career insights and recommendations</li>
          <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our services (e.g., payment processors, hosting providers)</li>
          <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          <li><strong>Safety and Security:</strong> To protect our rights, property, or safety, or that of our users</li>
          <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
        </ul>
      </div>

      <!-- Data Security -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">5. Data Security</h2>
        <p class="text-slate-700 mb-4">We implement appropriate technical and organizational measures to protect your personal information:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and updates</li>
          <li>Access controls and authentication measures</li>
          <li>Secure hosting infrastructure</li>
          <li>Employee training on data protection</li>
        </ul>
        <p class="text-slate-700">
          However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
        </p>
      </div>

      <!-- Data Retention -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">6. Data Retention</h2>
        <p class="text-slate-700 mb-4">We retain your personal information for as long as necessary to:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Provide our services to you</li>
          <li>Comply with legal obligations</li>
          <li>Resolve disputes and enforce agreements</li>
          <li>Improve our services</li>
        </ul>
        <p class="text-slate-700">
          When we no longer need your information, we will securely delete or anonymize it in accordance with applicable laws.
        </p>
      </div>

      <!-- Your Rights -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">7. Your Rights</h2>
        <p class="text-slate-700 mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li><strong>Access:</strong> Request a copy of your personal information</li>
          <li><strong>Correction:</strong> Request correction of inaccurate information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information</li>
          <li><strong>Portability:</strong> Request transfer of your data to another service</li>
          <li><strong>Restriction:</strong> Request restriction of processing</li>
          <li><strong>Objection:</strong> Object to processing of your information</li>
          <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
        </ul>
        <p class="text-slate-700">
          To exercise these rights, please contact us using the information provided below.
        </p>
      </div>

      <!-- Cookies and Tracking -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">8. Cookies and Tracking Technologies</h2>
        <p class="text-slate-700 mb-4">We use cookies and similar technologies to:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Remember your preferences and settings</li>
          <li>Analyze website usage and performance</li>
          <li>Provide personalized content and recommendations</li>
          <li>Ensure security and prevent fraud</li>
        </ul>
        <p class="text-slate-700">
          You can control cookie settings through your browser preferences. However, disabling certain cookies may affect the functionality of our services.
        </p>
      </div>

      <!-- Third-Party Services -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">9. Third-Party Services</h2>
        <p class="text-slate-700 mb-4">Our services may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.</p>
      </div>

      <!-- Children's Privacy -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">10. Children's Privacy</h2>
        <p class="text-slate-700 mb-4">Our services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us immediately.</p>
      </div>

      <!-- International Transfers -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">11. International Data Transfers</h2>
        <p class="text-slate-700 mb-4">Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.</p>
      </div>

      <!-- Changes to Privacy Policy -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">12. Changes to This Privacy Policy</h2>
        <p class="text-slate-700 mb-4">We may update this Privacy Policy from time to time. We will notify you of any material changes by:</p>
        <ul class="list-disc pl-6 text-slate-700 mb-4 space-y-2">
          <li>Posting the updated policy on our website</li>
          <li>Sending you an email notification</li>
          <li>Displaying a notice on our services</li>
        </ul>
        <p class="text-slate-700">
          Your continued use of our services after any changes constitutes acceptance of the updated policy.
        </p>
      </div>

      <!-- Contact Information -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">13. Contact Us</h2>
        <p class="text-slate-700 mb-4">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
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
  title: 'Privacy Policy - Career Planner',
  meta: [
    { name: 'description', content: 'Privacy Policy for Career Planner - Learn how we protect your personal information and data.' }
  ]
})
</script> 