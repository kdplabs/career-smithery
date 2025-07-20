<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Credits & Transactions</h1>
        <p class="mt-2 text-sm text-gray-600">View your credit balance and transaction history</p>
      </div>

      <!-- Success Message -->
      <div v-if="showSuccessMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
        <div class="flex items-center">
          <Icon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 mr-2" />
          <span class="text-green-800 text-sm">Credits purchased successfully! Your balance has been updated.</span>
        </div>
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


    </div>

    <!-- Pricing Modal -->
    <PricingModal
      :show="showPricingModal"
      @close="showPricingModal = false"
      @purchase-complete="handlePurchaseComplete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'
import PricingModal from '~/components/PricingModal.vue'

const supabase = useSupabaseClient()
const { user } = useAuth()
const userCredits = ref(0)
const showPricingModal = ref(false)
const showSuccessMessage = ref(false)

async function fetchUserCredits() {
  if (!user.value) return
  
  try {
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('available_credit')
      .eq('user_id', user.value.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
    userCredits.value = subscription?.available_credit || 0
  } catch (err) {
    console.error('Error fetching credits:', err)
    userCredits.value = 0
  }
}



onMounted(async () => {
  if (user.value) {
    await fetchUserCredits()
  }
  
  // Handle success/cancel from Stripe checkout
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('success') === 'true') {
    // Refresh credits after successful purchase
    await fetchUserCredits()
    showSuccessMessage.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
  }
})

// Handle purchase completion from PricingModal
const handlePurchaseComplete = async (purchase) => {
  if (purchase.type === 'payg') {
    userCredits.value += purchase.credits
  } else if (purchase.type === 'subscription') {
    userCredits.value += purchase.credits
  }
  showPricingModal.value = false
}
</script> 