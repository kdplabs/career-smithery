<template>
  <div v-if="show" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 overflow-hidden" style="max-height:85vh; overflow:auto;">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 class="text-2xl font-bold text-white text-center">Choose Your Plan</h2>
        <p class="text-blue-100 text-center mt-1">Get your personalized career report</p>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Free Plan -->
          <div class="border rounded-xl p-6 bg-gray-50">
            <div class="text-center">
              <h3 class="text-xl font-bold text-gray-900">Free</h3>
              <div class="mt-4">
                <span class="text-4xl font-bold text-gray-900">$0</span>
                <span class="text-gray-600">/month</span>
              </div>
              <p class="mt-2 text-sm text-gray-600">0 tokens</p>
            </div>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">Assessment & Summary only</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-close-circle" class="text-red-400 mr-2" />
                <span class="text-gray-700">No personalized tasks or reviews</span>
              </li>
            </ul>
            <button
              :disabled="currentPlan === 'free'"
              class="mt-6 w-full py-3 px-4 rounded-lg bg-gray-300 text-gray-500 font-semibold cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          <!-- Basic Plan -->
          <div class="border-2 border-blue-500 rounded-xl p-6 hover:shadow-lg transition-shadow relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">POPULAR</span>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-bold text-gray-900">Basic</h3>
              <div class="mt-4">
                <span class="text-4xl font-bold text-gray-900">$5</span>
                <span class="text-gray-600">/month</span>
              </div>
              <p class="mt-2 text-sm text-gray-600">25,000 tokens/month</p>
            </div>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">Personalized tasks & management</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">3 review requests/month</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">All Free features</span>
              </li>
            </ul>
            <button
              v-if="currentPlan === 'free'"
              @click="handleBasic"
              class="mt-6 w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Upgrade to Basic
            </button>
            <button
              v-else-if="currentPlan === 'basic'"
              @click="handleBuyCredits"
              class="mt-6 w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
            >
              Buy More Credits
            </button>
            <button
              v-else-if="currentPlan === 'super_hero'"
              disabled
              class="mt-6 w-full py-3 px-4 rounded-lg bg-gray-300 text-gray-500 font-semibold cursor-not-allowed"
            >
              Included in Super Hero
            </button>
            <button
              v-if="currentPlan === 'basic'"
              @click="handleSuperHero"
              class="mt-2 w-full py-3 px-4 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition-colors"
            >
              Upgrade to Super Hero
            </button>
          </div>

          <!-- Super Hero Plan -->
          <div class="border-2 border-yellow-500 rounded-xl p-6 hover:shadow-lg transition-shadow relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span class="bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-semibold">SUPER HERO</span>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-bold text-gray-900">Super Hero</h3>
              <div class="mt-4">
                <span class="text-4xl font-bold text-gray-900">$10</span>
                <span class="text-gray-600">/month</span>
              </div>
              <p class="mt-2 text-sm text-gray-600">100,000 tokens/month</p>
            </div>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">Personalized tasks & management</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">100 review requests/month</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-check-circle" class="text-green-500 mr-2" />
                <span class="text-gray-700">All Basic features</span>
              </li>
              <li class="flex items-center">
                <Icon name="i-mdi-star" class="text-yellow-500 mr-2" />
                <span class="text-gray-700 font-bold">Top-tier support & priority access</span>
              </li>
            </ul>
            <button
              v-if="currentPlan === 'free'"
              @click="handleSuperHero"
              class="mt-6 w-full py-3 px-4 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition-colors"
            >
              Go Super Hero!
            </button>
            <button
              v-else-if="currentPlan === 'basic'"
              @click="handleSuperHero"
              class="mt-6 w-full py-3 px-4 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition-colors"
            >
              Upgrade to Super Hero
            </button>
            <button
              v-else-if="currentPlan === 'super_hero'"
              @click="handleBuyCredits"
              class="mt-6 w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
            >
              Buy More Credits
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
                  <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Free</th>
                  <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Basic</th>
                  <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Super Hero</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Monthly price</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$0</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$5</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$10</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tokens/month</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">0</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">25,000</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">100,000</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Review requests/month</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">0</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">100</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Personalized tasks & management</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">✔️</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">✔️</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Assessment & summary</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">✔️</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">✔️</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">✔️</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Top-tier support</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">✔️</td>
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
import { ref, onMounted } from 'vue'
const supabase = useSupabaseClient()
const { user } = useAuth()

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'purchase-complete'])

const currentPlan = ref('free') // 'free', 'basic', 'super_hero'
const loadingPlan = ref(false)

onMounted(async () => {
  if (!user.value) {
    currentPlan.value = 'free'
    return
  }
  loadingPlan.value = true
  try {
    // Get active subscription for user
    const { data: sub, error: subError } = await supabase
      .from('user_subscriptions')
      .select('plan_id')
      .eq('user_id', user.value.id)
      .eq('is_active', true)
      .order('start_date', { ascending: false })
      .limit(1)
      .single()
    if (subError || !sub) {
      currentPlan.value = 'free'
      return
    }
    // Get plan name
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('name')
      .eq('id', sub.plan_id)
      .single()
    if (planError || !plan) {
      currentPlan.value = 'free'
      return
    }
    if (plan.name === 'basic') currentPlan.value = 'basic'
    else if (plan.name === 'super_hero') currentPlan.value = 'super_hero'
    else currentPlan.value = 'free'
  } finally {
    loadingPlan.value = false
  }
})

// Handle Basic plan purchase
async function handleBasic() {
  try {
    // Get the basic plan
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('id')
      .eq('name', 'basic')
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

    // Add initial tokens/credits
    const { error: creditError } = await supabase.from('user_credits').insert([
      {
        user_id: user.value.id,
        change: 25000,
        reason: 'basic_subscription',
        balance_after: 25000,
        created_at: new Date().toISOString()
      }
    ])

    if (creditError) throw creditError

    emit('purchase-complete', { type: 'basic', credits: 25000 })
    emit('close')
  } catch (err) {
    console.error('Error creating basic subscription:', err)
    alert('Error creating subscription. Please try again.')
  }
}

// Handle Super Hero plan purchase
async function handleSuperHero() {
  try {
    // Get the super hero plan
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('id')
      .eq('name', 'super_hero')
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

    // Add initial tokens/credits
    const { error: creditError } = await supabase.from('user_credits').insert([
      {
        user_id: user.value.id,
        change: 100000,
        reason: 'super_hero_subscription',
        balance_after: 100000,
        created_at: new Date().toISOString()
      }
    ])

    if (creditError) throw creditError

    emit('purchase-complete', { type: 'super_hero', credits: 100000 })
    emit('close')
  } catch (err) {
    console.error('Error creating super hero subscription:', err)
    alert('Error creating subscription. Please try again.')
  }
}

// Handle Buy More Credits
async function handleBuyCredits() {
  try {
    // Add 10,000 credits for $2 (example)
    const { error } = await supabase.from('user_credits').insert([
      {
        user_id: user.value.id,
        change: 10000,
        reason: 'buy_credits',
        balance_after: null, // will be set by backend trigger if needed
        created_at: new Date().toISOString()
      }
    ])
    if (error) throw error
    emit('purchase-complete', { type: 'buy_credits', credits: 10000 })
    emit('close')
  } catch (err) {
    alert('Error buying credits. Please try again.')
  }
}
</script> 