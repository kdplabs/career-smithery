<template>
  <div class="min-h-screen bg-blue-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Understanding Your Assessment Results</h1>
      
      <!-- Performance & Potential Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Performance & Potential Calculation</h2>
        
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
                <li>High: Score ≥ 2.5</li>
                <li>Moderate: Score ≥ 1.5</li>
                <li>Low: Score < 1.5</li>
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
                <li>High: Score ≥ 2.5</li>
                <li>Moderate: Score ≥ 1.5</li>
                <li>Low: Score < 1.5</li>
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
              <li>High: Score ≥ 2.5</li>
              <li>Moderate: Score ≥ 1.5</li>
              <li>Low: Score < 1.5</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Career Stage Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Career Stage Determination</h2>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <p class="text-gray-700 mb-4">Your career stage is determined based on your age range and career focus:</p>
          
          <div class="space-y-4">
            <div class="p-4 bg-white rounded-lg border border-yellow-200">
              <h4 class="font-semibold text-gray-900 mb-2">Age Range Mapping:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>15-25 years → Exploration</li>
                <li>25-45 years → Establishment</li>
                <li>45-55 years → Mid-Career</li>
                <li>55+ years → Late Career</li>
              </ul>
            </div>

            <div class="p-4 bg-white rounded-lg border border-yellow-200">
              <h4 class="font-semibold text-gray-900 mb-2">Career Focus Considerations:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>Exploring different career options</li>
                <li>Establishing yourself in your chosen field</li>
                <li>Advancing and specializing in your career</li>
                <li>Mentoring others and sharing knowledge</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Leadership Potential Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Leadership Potential Assessment</h2>
        
        <div class="bg-orange-50 p-4 rounded-lg">
          <p class="text-gray-700 mb-4">Your leadership potential is determined based on your current role:</p>
          
          <div class="space-y-4">
            <div class="p-4 bg-white rounded-lg border border-orange-200">
              <h4 class="font-semibold text-gray-900 mb-2">Role Mapping:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>Individual Contributor → Managing Self</li>
                <li>First-time Manager → Managing Others</li>
                <li>Manager of Managers → Managing Managers</li>
                <li>Functional Leader → Functional Leader</li>
                <li>Business Leader → Business Leader</li>
                <li>Enterprise Leader → Enterprise Leader</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Profile Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Skills Profile Determination</h2>
        
        <div class="bg-teal-50 p-4 rounded-lg">
          <p class="text-gray-700 mb-4">Your skills profile is determined based on your primary and secondary skills:</p>
          
          <div class="space-y-4">
            <div class="p-4 bg-white rounded-lg border border-teal-200">
              <h4 class="font-semibold text-gray-900 mb-2">Profile Types:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>I-Shaped: Deep expertise in one area (specialist)</li>
                <li>T-Shaped: Deep expertise in one area + broad knowledge in others</li>
                <li>Pi-Shaped: Expertise in two domains + broad knowledge</li>
              </ul>
            </div>

            <div class="p-4 bg-white rounded-lg border border-teal-200">
              <h4 class="font-semibold text-gray-900 mb-2">Determination Method:</h4>
              <ul class="list-disc list-inside text-gray-700">
                <li>I-Shaped: No secondary skills</li>
                <li>T-Shaped: 1-2 secondary skills</li>
                <li>Pi-Shaped: More than 2 secondary skills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional setup needed for this page
</script> 