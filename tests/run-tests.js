// === STRIPE WEBHOOK TEST RUNNER ===
// Run this script to test all webhook scenarios with real Stripe JSON data

import { runAllWebhookTests } from './unit/stripe-webhook.test.js'

async function main() {
  console.log('🚀 Starting Stripe Webhook Test Suite')
  console.log('Testing with real JSON fixtures from Stripe webhooks')
  console.log('Events: checkout.session.completed, invoice.payment_succeeded,')
  console.log('        customer.subscription.deleted, customer.subscription.updated')
  console.log('=' .repeat(80))
  
  const startTime = Date.now()
  const result = await runAllWebhookTests()
  const endTime = Date.now()
  const duration = ((endTime - startTime) / 1000).toFixed(2)
  
  console.log(`\n⏱️ Test Duration: ${duration}s`)
  
  if (result.success) {
    console.log(`\n🏆 OVERALL RESULT: ALL TESTS PASSED! (${result.successRate.toFixed(1)}%)`)
    console.log('✅ Your webhook handler is ready to process all Stripe events.')
    console.log('✅ Credit allocation logic is working correctly.')
    console.log('✅ All event types are properly validated.')
    
    // Exit with success code
    process.exit(0)
  } else {
    console.log(`\n❌ OVERALL RESULT: TESTS FAILED`)
    if (result.error) {
      console.log(`💥 Error: ${result.error}`)
    } else {
      console.log(`📊 Success Rate: ${result.successRate.toFixed(1)}%`)
      console.log('🔍 Review the failed tests above and fix the webhook handler.')
    }
    
    // Exit with error code
    process.exit(1)
  }
}

// Handle errors gracefully
main().catch(error => {
  console.error('\n💥 Test runner crashed:', error.message)
  console.error('Stack trace:', error.stack)
  process.exit(1)
})
