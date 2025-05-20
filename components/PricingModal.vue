<template>
  <div v-if="show" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 class="text-2xl font-bold text-white text-center">Choose Your Plan</h2>
        <p class="text-blue-100 text-center mt-1">Get your personalized career report</p>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Pay As You Go -->
          <div class="border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div class="text-center">
              <h3 class="text-xl font-bold text-gray-900">Pay As You Go</h3>
              <div class="mt-4">
                <span class="text-4xl font-bold text-gray-900">$3</span>
                <span class="text-gray-600">/report</span>
              </div>
              <p class="mt-2 text-sm text-gray-600">10 credit points per report</p>
            </div>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">One-time purchase</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">No commitment</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">Instant access</span>
              </li>
            </ul>
            <button
              @click="handlePayAsYouGo"
              class="mt-6 w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Buy Credits
            </button>
          </div>

          <!-- Subscription -->
          <div class="border-2 border-blue-500 rounded-xl p-6 hover:shadow-lg transition-shadow relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">BEST VALUE</span>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-bold text-gray-900">Monthly Subscription</h3>
              <div class="mt-4">
                <span class="text-4xl font-bold text-gray-900">$7</span>
                <span class="text-gray-600">/month</span>
              </div>
              <p class="mt-2 text-sm text-gray-600">500 credit points monthly</p>
            </div>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">50 reports per month</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">Save 70% vs pay-as-you-go</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">Cancel anytime</span>
              </li>
            </ul>
            <button
              @click="handleSubscription"
              class="mt-6 w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Subscribe & Save
            </button>
          </div>
        </div>

        <!-- Comparison Table -->
        <div class="mt-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Plan Comparison</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pay As You Go</th>
                  <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Price per report</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$3</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$0.14</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Monthly cost</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$3 per report</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$7 flat rate</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Reports per month</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">As needed</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">50 included</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Savings</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">Save up to 70%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 flex justify-end">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const supabase = useSupabaseClient()
const { user } = useAuth()

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'purchase-complete'])

// Handle Pay As You Go purchase
async function handlePayAsYouGo() {
  try {
    // Add 10 credits to user's account
    const { error } = await supabase.from('user_credits').insert([
      {
        user_id: user.value.id,
        change: 10,
        reason: 'purchase',
        balance_after: 10, // Assuming this is their first purchase
        created_at: new Date().toISOString()
      }
    ])

    if (error) throw error

    emit('purchase-complete', { type: 'payg', credits: 10 })
    emit('close')
  } catch (err) {
    console.error('Error purchasing credits:', err)
    alert('Error purchasing credits. Please try again.')
  }
}

// Handle subscription purchase
async function handleSubscription() {
  try {
    // Get the monthly subscription plan
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('id')
      .eq('name', 'monthly')
      .single()

    if (planError) throw planError

    // Create subscription
    const { error: subError } = await supabase.from('user_subscriptions').insert([
      {
        user_id: user.value.id,
        plan_id: plan.id,
        is_active: true,
        auto_renew: true,
        start_date: new Date().toISOString()
      }
    ])

    if (subError) throw subError

    // Add initial credits
    const { error: creditError } = await supabase.from('user_credits').insert([
      {
        user_id: user.value.id,
        change: 500,
        reason: 'subscription',
        balance_after: 500,
        created_at: new Date().toISOString()
      }
    ])

    if (creditError) throw creditError

    emit('purchase-complete', { type: 'subscription', credits: 500 })
    emit('close')
  } catch (err) {
    console.error('Error creating subscription:', err)
    alert('Error creating subscription. Please try again.')
  }
}
</script> 