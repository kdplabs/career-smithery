// === MULTI-QUANTITY CREDIT PURCHASE TEST RUNNER ===
// Run this script to test credit purchases with quantity > 1

import { runMultiQtyTest } from './unit/multi-qty-credit-test.js'

async function main() {
  console.log('🚀 Starting Multi-Quantity Credit Purchase Test')
  console.log('Testing scenario: Customer buys 3x Buy Credit items = 150 credits')
  console.log('=' .repeat(80))
  
  const startTime = Date.now()
  const result = await runMultiQtyTest()
  const endTime = Date.now()
  const duration = ((endTime - startTime) / 1000).toFixed(2)
  
  console.log(`\n⏱️ Test Duration: ${duration}s`)
  
  if (result.success) {
    console.log(`\n🏆 OVERALL RESULT: ALL TESTS PASSED! (${result.successRate.toFixed(1)}%)`)
    console.log('✅ Multi-quantity credit calculation is working correctly.')
    console.log(`✅ Buying ${result.scenario.quantity} credits = ${result.scenario.totalCredits} total credits.`)
    console.log('✅ Your webhook handler properly processes quantity > 1.')
    
    // Exit with success code
    process.exit(0)
  } else {
    console.log(`\n❌ OVERALL RESULT: TESTS FAILED`)
    if (result.error) {
      console.log(`💥 Error: ${result.error}`)
    } else {
      console.log(`📊 Success Rate: ${result.successRate.toFixed(1)}%`)
      console.log('🔍 Review the failed tests above and fix the multi-quantity logic.')
    }
    
    // Exit with error code
    process.exit(1)
  }
}

// Handle errors gracefully
main().catch(error => {
  console.error('\n💥 Multi-quantity test runner crashed:', error.message)
  console.error('Stack trace:', error.stack)
  process.exit(1)
})
