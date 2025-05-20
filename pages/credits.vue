<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Credits & Transactions</h1>
        <p class="mt-2 text-sm text-gray-600">View your credit balance and transaction history</p>
      </div>

      <!-- Current Balance Card -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-medium text-gray-900">Current Balance</h2>
            <p class="mt-1 text-3xl font-bold text-blue-600">{{ userCredits }} credits</p>
          </div>
          <button
            @click="showPricingModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Buy Credits
          </button>
        </div>
      </div>

      <!-- Transaction History -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Transaction History</h2>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-if="isLoading" class="p-6 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-2 text-sm text-gray-600">Loading transactions...</p>
          </div>
          <div v-else-if="transactions.length === 0" class="p-6 text-center">
            <p class="text-gray-500">No transactions found</p>
          </div>
          <div v-else v-for="transaction in transactions" :key="transaction.id" class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ formatTransactionReason(transaction.reason) }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(transaction.created_at) }}</p>
              </div>
              <div class="text-right">
                <p :class="[
                  'text-sm font-medium',
                  transaction.change > 0 ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ transaction.change > 0 ? '+' : '' }}{{ transaction.change }} credits
                </p>
                <p class="text-sm text-gray-500">Balance: {{ transaction.balance_after }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Modal -->
    <div v-if="showPricingModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-lg w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Buy Credits</h3>
          <button @click="showPricingModal = false" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="plan in plans" :key="plan.id" class="border rounded-lg p-4 hover:border-blue-500 cursor-pointer" @click="selectPlan(plan)">
            <div class="flex justify-between items-center">
              <div>
                <h4 class="text-lg font-medium text-gray-900">{{ plan.display_name }}</h4>
                <p class="text-sm text-gray-500">{{ plan.credits_per_month }} credits/month</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-medium text-gray-900">${{ (plan.price_cents / 100).toFixed(2) }}</p>
                <p class="text-sm text-gray-500">{{ plan.billing_period }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useAuth } from '#imports'

const supabase = useSupabaseClient()
const { user } = useAuth()
const userCredits = ref(0)
const transactions = ref([])
const isLoading = ref(true)
const showPricingModal = ref(false)
const plans = ref([])

async function fetchUserCredits() {
  if (!user.value) return
  
  try {
    const { data: credits, error } = await supabase
      .from('user_credits')
      .select('balance_after')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) throw error
    userCredits.value = credits?.balance_after || 0
  } catch (err) {
    console.error('Error fetching credits:', err)
  }
}

async function fetchTransactions() {
  if (!user.value) return
  
  try {
    isLoading.value = true
    const { data, error } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    transactions.value = data
  } catch (err) {
    console.error('Error fetching transactions:', err)
  } finally {
    isLoading.value = false
  }
}

async function fetchPlans() {
  try {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('price_cents')

    if (error) throw error
    plans.value = data
  } catch (err) {
    console.error('Error fetching plans:', err)
  }
}

function formatTransactionReason(reason) {
  const reasons = {
    'purchase': 'Credit Purchase',
    'subscription': 'Monthly Subscription',
    'spend': 'Credit Usage',
    'admin_adjustment': 'Admin Adjustment'
  }
  return reasons[reason] || reason
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function selectPlan(plan) {
  // Implement plan selection and payment flow
  console.log('Selected plan:', plan)
  showPricingModal.value = false
}

onMounted(async () => {
  if (user.value) {
    await Promise.all([
      fetchUserCredits(),
      fetchTransactions(),
      fetchPlans()
    ])
  }
})
</script> 