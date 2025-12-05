<template>
  <div class="min-h-screen bg-blue-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Understanding Your Assessment Results</h1>
      
      <!-- Performance & Potential Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Performance &amp; Potential Calculation</h2>
        
        <div class="space-y-6">
          <!-- Performance Calculation -->
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Performance Score</h3>
            <p class="text-gray-700 mb-4">Your performance score is calculated using three key metrics:</p>
            
            <div class="space-y-3">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <p class="font-medium">Current Job Performance (Weight: 1.0)</p>
                  <p class="text-sm text-gray-600">How would you rate your current job performance?</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <p class="font-medium">Ability to Deliver Results (Weight: 1.2)</p>
                  <p class="text-sm text-gray-600">How would you rate your ability to deliver results?</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <p class="font-medium">Quality of Work (Weight: 1.2)</p>
                  <p class="text-sm text-gray-600">How would you rate the quality of your work?</p>
                </div>
              </div>
            </div>

            <div class="mt-4 p-4 bg-white rounded-lg border border-blue-200">
              <h4 class="font-semibold text-gray-900 mb-2">Calculation Method:</h4>
              <p class="text-gray-700 mb-2">Each rating is converted to a numerical value:</p>
              <ul class="list-disc list-inside text-gray-700 mb-4">
                <li>Low = 1</li>
                <li>Moderate = 2</li>
                <li>High = 3</li>
              </ul>
              <p class="text-gray-700">Final Score = (Performance + (Delivery × 1.2) + (Quality × 1.2)) ÷ 3.4</p>
              <p class="text-gray-700 mt-2">Rating Thresholds:</p>
              <ul class="list-disc list-inside text-gray-700">
                <li>High: Score &gt;= 2.5</li>
                <li>Moderate: Score &gt;= 1.5</li>
                <li>Low: Score &lt; 1.5</li>
              </ul>
            </div>
          </div>

          <!-- Potential Calculation -->
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Potential Score</h3>
            <p class="text-gray-700 mb-4">Your potential score is calculated using two key metrics:</p>
            
            <div class="space-y-3">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 font-bold">1</span>
                </div>
                <div>
                  <p class="font-medium">Growth Potential</p>
                  <p class="text-sm text-gray-600">How would you rate your growth potential?</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <p class="font-medium">Learning Ability</p>
                  <p class="text-sm text-gray-600">How would you rate your ability to learn and adapt?</p>
                </div>
              </div>
            </div>

            <div class="mt-4 p-4 bg-white rounded-lg border border-green-200">
              <h4 class="font-semibold text-gray-900 mb-2">Calculation Method:</h4>
              <p class="text-gray-700 mb-2">Each rating is converted to a numerical value:</p>
              <ul class="list-disc list-inside text-gray-700 mb-4">
                <li>Low = 1</li>
                <li>Moderate = 2</li>
                <li>High = 3</li>
              </ul>
              <p class="text-gray-700">Final Score = (Growth Potential + Learning Ability) ÷ 2</p>
              <p class="text-gray-700 mt-2">Rating Thresholds:</p>
              <ul class="list-disc list-inside text-gray-700">
                <li>High: Score &gt;= 2.5</li>
                <li>Moderate: Score &gt;= 1.5</li>
                <li>Low: Score &lt; 1.5</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Engagement Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Engagement Score Calculation</h2>
        
        <div class="bg-purple-50 p-4 rounded-lg">
          <p class="text-gray-700 mb-4">Your engagement score is calculated using two key metrics:</p>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span class="text-purple-600 font-bold">1</span>
              </div>
              <div>
                <p class="font-medium">Satisfaction</p>
                <p class="text-sm text-gray-600">How satisfied are you with your current role and responsibilities?</p>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span class="text-purple-600 font-bold">2</span>
              </div>
              <div>
                <p class="font-medium">Motivation</p>
                <p class="text-sm text-gray-600">How motivated do you feel to contribute to your team and organizational goals?</p>
              </div>
            </div>
          </div>

          <div class="mt-4 p-4 bg-white rounded-lg border border-purple-200">
            <h4 class="font-semibold text-gray-900 mb-2">Calculation Method:</h4>
            <p class="text-gray-700 mb-2">Each rating is converted to a numerical value:</p>
            <ul class="list-disc list-inside text-gray-700 mb-4">
              <li>Low = 1</li>
              <li>Moderate = 2</li>
              <li>High = 3</li>
            </ul>
            <p class="text-gray-700">Final Score = (Satisfaction + Motivation) ÷ 2</p>
            <p class="text-gray-700 mt-2">Rating Thresholds:</p>
            <ul class="list-disc list-inside text-gray-700">
              <li>High: Score &gt;= 2.5</li>
              <li>Moderate: Score &gt;= 1.5</li>
              <li>Low: Score &lt; 1.5</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Career Stage Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Career Stage Determination</h2>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <p class="text-gray-700 mb-4">Your career stage is primarily determined by your age range, with additional factors considered for refinement:</p>
          
          <div class="space-y-4">
            <div class="p-4 bg-white rounded-lg border border-yellow-200">
              <h4 class="font-semibold text-gray-900 mb-2">Base Stage (Age Range):</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>15-25 years - Exploration</li>
                <li>25-45 years - Establishment</li>
                <li>45-55 years - Mid-Career</li>
                <li>55+ years - Late Career</li>
              </ul>
            </div>

            <div class="p-4 bg-white rounded-lg border border-yellow-200">
              <h4 class="font-semibold text-gray-900 mb-2">Stage Refinement Factors:</h4>
              <p class="text-gray-700 mb-2">Your stage may be refined based on these factors, but only within age-appropriate bounds:</p>
              <ul class="list-disc list-inside text-gray-700">
                <li>Experience Level (Expert, Experienced, Intermediate, Entry)</li>
                <li>Career Focus (Mentoring, Specialization, Exploration)</li>
                <li>Primary Career Goal (Legacy, Advancement, Learning)</li>
                <li>Development Approach (Mentoring, Specialization, Exploration)</li>
              </ul>
            </div>

            <div class="p-4 bg-white rounded-lg border border-yellow-200">
              <h4 class="font-semibold text-gray-900 mb-2">Stage Progression Rules:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>25-45 years: Can advance to early Mid-Career if expert level with mentoring focus</li>
                <li>45-55 years: Can advance to early Late Career if expert level with mentoring focus and legacy goals</li>
                <li>55+ years: Remains in Late Career stage</li>
                <li>Other ages: Can advance to early Establishment if intermediate level with specialization focus</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Leadership Potential Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Leadership Potential Assessment</h2>
        
        <div class="bg-orange-50 p-4 rounded-lg">
          <p class="text-gray-700 mb-4">Your leadership potential is determined through a comprehensive scoring system that considers multiple factors:</p>
          
          <div class="space-y-4">
            <div class="p-4 bg-white rounded-lg border border-orange-200">
              <h4 class="font-semibold text-gray-900 mb-2">Scoring Components:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>Current Role (40% weight)</li>
                <li>Leadership Experience (20% weight)</li>
                <li>Leadership Skills (20% weight)</li>
                <li>Leadership Aspirations (10% weight)</li>
                <li>Readiness Level (10% weight)</li>
              </ul>
            </div>

            <div class="p-4 bg-white rounded-lg border border-orange-200">
              <h4 class="font-semibold text-gray-900 mb-2">Scoring Scale:</h4>
              <p class="text-gray-700 mb-2">Each component is scored on a scale of 1-6:</p>
              <ul class="list-disc list-inside text-gray-700">
                <li>6: Highest level of capability/readiness</li>
                <li>5: Strong capability/readiness</li>
                <li>4: Good capability/readiness</li>
                <li>3: Moderate capability/readiness</li>
                <li>2: Basic capability/readiness</li>
                <li>1: Limited capability/readiness</li>
              </ul>
            </div>

            <div class="p-4 bg-white rounded-lg border border-orange-200">
              <h4 class="font-semibold text-gray-900 mb-2">Leadership Level Thresholds:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>Enterprise Leader: Score &gt;= 5.0</li>
                <li>Business Leader: Score &gt;= 4.0</li>
                <li>Functional Leader: Score &gt;= 3.0</li>
                <li>Managing Managers: Score &gt;= 2.5</li>
                <li>Managing Others: Score &gt;= 2.0</li>
                <li>Managing Self: Score &lt; 2.0</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Kirkpatrick Model Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Learning &amp; Development Assessment</h2>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="text-gray-700 mb-4">Your development level is determined through a comprehensive scoring system based on Kirkpatrick's Model:</p>
          
          <div class="space-y-4">
            <div class="p-4 bg-white rounded-lg border border-blue-200">
              <h4 class="font-semibold text-gray-900 mb-2">Scoring Components:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>Learning Opportunities (Level 1: Reaction) - 20% weight</li>
                <li>Skill Acquisition (Level 2: Learning) - 20% weight</li>
                <li>Skill Application (Level 3: Behavior) - 30% weight</li>
                <li>Learning Impact (Level 4: Results) - 20% weight</li>
                <li>Future Development Approach - 10% weight</li>
              </ul>
            </div>

            <div class="p-4 bg-white rounded-lg border border-blue-200">
              <h4 class="font-semibold text-gray-900 mb-2">Scoring Scale:</h4>
              <p class="text-gray-700 mb-2">Each component is scored on a scale of 1-4:</p>
              <ul class="list-disc list-inside text-gray-700">
                <li>4: Excellent/Strong</li>
                <li>3: Good</li>
                <li>2: Moderate</li>
                <li>1: Minimal/None</li>
              </ul>
            </div>

            <div class="p-4 bg-white rounded-lg border border-blue-200">
              <h4 class="font-semibold text-gray-900 mb-2">Development Level Thresholds:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>Level 4: Results - Score &gt;= 3.5</li>
                <li>Level 3: Behavior - Score &gt;= 3.0</li>
                <li>Level 2: Learning - Score &gt;= 2.5</li>
                <li>Level 1: Reaction - Score &lt; 2.5</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Profile Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Skills Profile Assessment</h2>
        
        <div class="bg-green-50 p-4 rounded-lg">
          <p class="text-gray-700 mb-4">Your skills profile is determined based on your expertise and skill breadth:</p>
          
          <div class="space-y-4">
            <div class="p-4 bg-white rounded-lg border border-green-200">
              <h4 class="font-semibold text-gray-900 mb-2">Profile Types:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>I-Shaped: Deep expertise in one area</li>
                <li>T-Shaped: Deep expertise in one area + broad knowledge in others</li>
                <li>Pi-Shaped: Expertise in two domains + broad knowledge</li>
              </ul>
            </div>

            <div class="p-4 bg-white rounded-lg border border-green-200">
              <h4 class="font-semibold text-gray-900 mb-2">Determination Factors:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>Primary Expertise Level</li>
                <li>Number of Secondary Skills</li>
                <li>Skill Breadth</li>
                <li>Future Development Areas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

useHead({
  title: 'Assessment Guide - Understanding Your Career Assessment Results | Career Smithery',
  meta: [
    {
      name: 'description',
      content: 'Learn how your career assessment results are calculated. Understand performance & potential scoring, engagement metrics, career stage determination, leadership potential assessment, learning & development levels, and skills profile analysis.'
    },
    {
      property: 'og:title',
      content: 'Assessment Guide - Understanding Your Career Assessment Results | Career Smithery'
    },
    {
      property: 'og:description',
      content: 'Learn how your career assessment results are calculated. Understand performance & potential scoring, engagement metrics, career stage determination, and leadership potential assessment.'
    },
    {
      property: 'og:url',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/assessment-guide`
    },
    {
      property: 'og:image',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/logo.png`
    },
    {
      name: 'twitter:title',
      content: 'Assessment Guide - Understanding Your Career Assessment Results | Career Smithery'
    },
    {
      name: 'twitter:image',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/logo.png`
    },
    {
      name: 'twitter:description',
      content: 'Learn how your career assessment results are calculated. Understand performance & potential scoring, engagement metrics, career stage determination, and leadership potential assessment.'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/assessment-guide`
    }
  ]
})

const route = useRoute()

function scrollToHash() {
  const hash = route.hash
  if (hash) {
    const el = document.getElementById(hash.replace('#', ''))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      el.focus({ preventScroll: true })
      // Add highlight ring
      el.classList.add('ring-4', 'ring-blue-400')
      setTimeout(() => el.classList.remove('ring-4', 'ring-blue-400'), 1200)
    }
  }
}

onMounted(() => {
  nextTick(() => {
    scrollToHash()
  })
})

watch(
  () => route.hash,
  () => {
    nextTick(() => {
      scrollToHash()
    })
  }
)
</script> 