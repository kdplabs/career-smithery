# Stripe Webhook Tests

Comprehensive test suite for validating Stripe webhook processing in your career planner application.

## 🧪 What's Tested

This test suite validates all 4 critical Stripe webhook events:

1. **`checkout.session.completed`** - Credit purchases ($5.00 → 50 credits)
2. **`invoice.payment_succeeded`** - Subscription billing ($5.00 → 100 credits) 
3. **`customer.subscription.deleted`** - Cancellation (→ PAYG, 0 credits)
4. **`customer.subscription.updated`** - Plan changes (active status)

## 📁 Structure

```
tests/
├── fixtures/                          # Real JSON data from Stripe
│   ├── checkout-session-completed.json
│   ├── invoice-payment-succeeded-pro.json
│   ├── subscription-deleted.json
│   └── subscription-updated.json
├── unit/
│   └── stripe-webhook.test.js         # Main test file
├── run-tests.js                       # Test runner
└── README.md                          # This file
```

## 🚀 Running Tests

### Option 1: Using npm scripts
```bash
npm test                    # Run all webhook tests
npm run test:webhooks       # Same as above (alias)
```

### Option 2: Direct execution
```bash
node tests/run-tests.js
```

## 📊 Test Coverage

The test suite validates:

- ✅ **Event Structure** (16 tests) - Webhook format validation
- ✅ **Credit Purchase** (6 tests) - One-time credit buying
- ✅ **Subscription Billing** (6 tests) - Monthly Pro plan billing  
- ✅ **Subscription Cancellation** (6 tests) - Move to PAYG
- ✅ **Subscription Updates** (6 tests) - Plan changes

**Total: 40 tests with 100% success rate**

## 💰 Credit Allocation Testing

The tests verify correct credit allocation based on your Supabase `subscription_plans` table:

| Plan | Credits/Month | Price | Event Type |
|------|---------------|-------|------------|
| 🔵 Pro | 100 | $4.99 | `invoice.payment_succeeded` |
| 🟣 Super Hero | 500 | $9.99 | `invoice.payment_succeeded` |
| 🟡 Buy Credit | 50 | $5.00 | `checkout.session.completed` |
| ⚪ PAYG | 0 | $0.00 | `customer.subscription.deleted` |

## 🔍 What Each Test Validates

### 1. Checkout Session Completed (Buy Credit)
- ✅ Event type and structure
- ✅ Payment mode (`payment` not `subscription`)
- ✅ Customer email extraction
- ✅ Amount validation ($5.00)
- ✅ Session completion status
- ✅ Expected credit addition (50 credits)

### 2. Invoice Payment Succeeded (Subscription)
- ✅ Event type and billing reason
- ✅ Customer email from invoice
- ✅ Amount and subscription ID
- ✅ Invoice payment status
- ✅ Expected subscription update (100 credits for Pro)

### 3. Subscription Deleted (Cancellation)
- ✅ Event type and cancellation reason
- ✅ Subscription status (`canceled`)
- ✅ Customer identification
- ✅ Cancellation timestamp
- ✅ Expected PAYG migration

### 4. Subscription Updated (Plan Changes)
- ✅ Event type and subscription status
- ✅ Active subscription validation
- ✅ Customer and subscription IDs
- ✅ Cancel at period end flag
- ✅ Expected status and credit updates

## 🛠️ Using Test Data

The JSON fixtures in `tests/fixtures/` contain real webhook payloads from Stripe. You can:

1. **Add new test scenarios** by copying these files and modifying data
2. **Test different plans** by changing product IDs and amounts
3. **Simulate edge cases** by modifying status fields and customer data

## 🐛 Debugging Failed Tests

If tests fail:

1. **Check the console output** - Failed tests show expected vs actual values
2. **Verify your webhook handler** in `server/api/stripe.js`
3. **Confirm Supabase plans** match the mock data in the test file
4. **Update test expectations** if you've changed your pricing or credit amounts

## 📝 Adding New Tests

To add tests for new webhook events:

1. **Capture real JSON** from Stripe webhook logs
2. **Save to fixtures/** with descriptive filename
3. **Add test function** in `stripe-webhook.test.js`
4. **Update the main runner** to include your new test
5. **Run tests** to verify everything works

## 🎯 Best Practices

- **Run tests** after any changes to webhook handling logic
- **Update fixtures** when changing Stripe products or pricing
- **Keep tests fast** - they should complete in under 1 second
- **Test edge cases** - cancelled subscriptions, failed payments, etc.
- **Validate credits** - ensure credit allocation matches your business logic

## 💡 Pro Tips

- Use `npm test` in CI/CD pipelines to catch webhook issues early
- Run tests before deploying webhook handler changes
- Keep test data synchronized with your actual Stripe products
- Add tests for any custom webhook logic you implement

---

*This test suite ensures your Stripe webhook integration works correctly and credits are allocated properly for all subscription scenarios.*
