// === STRIPE WEBHOOK HANDLER ===
// This API endpoint processes Stripe webhooks for completed payments and subscription changes
// Users are redirected directly to Stripe's website for payments, then Stripe sends webhooks here

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// === INITIALIZE SERVICES ===
// Set up Stripe with our secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

// Set up Supabase client with service role key for database operations
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// === HELPER FUNCTIONS ===

/**
 * Validates Stripe webhook signature and returns the verified event
 */
async function validateStripeWebhook(event) {
  const stripeSignature = event.node.req.headers['stripe-signature']
  
  if (!stripeSignature) {
    throw new Error('Missing Stripe signature header')
  }

  // Get raw body as string for Stripe signature verification
  const rawBody = await readRawBody(event, 'utf8')
  
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    console.info('Stripe signature validated successfully')
    return stripeEvent
  } catch (err) {
    throw new Error(`Stripe signature validation failed: ${err.message}`)
  }
}

/**
 * Extracts customer email from various locations in Stripe webhook data
 */
async function extractCustomerEmail(stripeEvent) {
  let customerEmail = null
  
  // Try to get email from customer_details (checkout sessions)
  if (stripeEvent.data?.object?.customer_details?.email) {
    customerEmail = stripeEvent.data.object.customer_details.email
    console.info('Customer email from customer_details:', customerEmail)
  } 
  // Try to get email directly from the event object
  else if (stripeEvent.data?.object?.customer_email) {
    customerEmail = stripeEvent.data.object.customer_email
    console.info('Customer email from event object:', customerEmail)
  } 
  // If we have a customer ID, fetch the customer details from Stripe
  else if (stripeEvent.data?.object?.customer) {
    try {
      const customerObj = await stripe.customers.retrieve(stripeEvent.data.object.customer)
      customerEmail = customerObj.email
      console.info('Customer email from Stripe customer lookup:', customerEmail)
    } catch (err) {
      throw new Error(`Could not retrieve customer email from Stripe: ${err.message}`)
    }
  }
  
  if (!customerEmail) {
    throw new Error('No customer email found in event')
  }
  
  return customerEmail
}

/**
 * Finds user in database by email address
 */
async function findUserByEmail(email) {
  const { data: user, error: userError } = await supabase
    .from('user_profile')
    .select('id')
    .eq('email', email)
    .single()
  
  console.info('User lookup by email:', email, 'Result:', user, 'Error:', userError)
  
  if (userError || !user) {
    throw new Error('User not found in user_profile')
  }
  
  return user.id
}

/**
 * Fetches line items from a Stripe checkout session
 */
async function getCheckoutLineItems(sessionId) {
  try {
    const lineItemsResponse = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 })
    console.info('Line items for session', sessionId, ':', lineItemsResponse.data)
    return lineItemsResponse.data
  } catch (err) {
    throw new Error(`Failed to fetch line items from Stripe: ${err.message}`)
  }
}

/**
 * Updates user's credit balance in the database
 */
async function updateUserCredits(userId, creditsToAdd) {
  // Find the user's most recent subscription record
  const { data: sub, error: subError } = await supabase
    .from('user_subscriptions')
    .select('available_credit')
    .eq('user_id', userId)
    .order('start_date', { ascending: false })
    .limit(1)
    .single()
  
  console.info('User subscription lookup:', sub, 'Error:', subError)
  
  if (subError || !sub) {
    throw new Error('Active subscription not found for user')
  }
  
  // Calculate new credit balance
  const newCredits = (sub.available_credit || 0) + creditsToAdd
  console.info('New available_credit after update:', newCredits)
  
  // Update the database with new credit balance
  const { error: updateError } = await supabase
    .from('user_subscriptions')
    .update({ available_credit: newCredits })
    .eq('user_id', userId)
  
  console.info('Update error (should be null):', updateError)
  
  if (updateError) {
    throw new Error('Failed to update user_subscriptions')
  }
  
  return newCredits
}

/**
 * Gets subscription and product details from Stripe
 */
async function getStripeSubscriptionDetails(stripeEvent) {
  // Extract subscription ID from various possible locations
  let subscriptionId = stripeEvent.data.object.subscription
    || stripeEvent.data.object.parent?.subscription_details?.subscription;
  console.info('Initial subscriptionId from object or parent:', subscriptionId)
  
  // Fallback: search through line items if subscription ID not found above
  if (!subscriptionId && stripeEvent.data.object.lines?.data?.length) {
    for (const line of stripeEvent.data.object.lines.data) {
      if (line.parent?.subscription_item_details?.subscription) {
        subscriptionId = line.parent.subscription_item_details.subscription;
        console.info('Found subscriptionId from line item:', subscriptionId)
        break;
      }
    }
  }
  
  if (!subscriptionId) {
    throw new Error('No subscriptionId found in event payload')
  }
  
  console.info('Final subscriptionId to fetch:', subscriptionId)
  
  // Fetch subscription from Stripe
  let subscription
  try {
    subscription = await stripe.subscriptions.retrieve(subscriptionId)
    console.info('Fetched subscription from Stripe:', subscription)
  } catch (err) {
    throw new Error(`Failed to fetch subscription from Stripe: ${err.message}`)
  }
  
  // Get product from first subscription item
  const firstItem = subscription.items.data[0]
  console.info('First subscription item:', firstItem)
  
  if (!firstItem) {
    throw new Error('No subscription items found for this subscription')
  }
  
  // Get the product ID (could be string or object)
  const productId = typeof firstItem.price.product === 'string' ? firstItem.price.product : firstItem.price.product.id
  
  // Fetch the full product details from Stripe
  let product
  try {
    product = await stripe.products.retrieve(productId)
    console.info('Fetched product from Stripe:', product)
  } catch (err) {
    throw new Error(`Failed to fetch product from Stripe: ${err.message}`)
  }
  
  return { subscription, product }
}

/**
 * Finds plan in database by name
 */
async function findPlanByName(planName) {
  const { data: plan, error: planError } = await supabase
    .from('subscription_plans')
    .select('id, credits_per_month')
    .eq('name', planName.toLowerCase())
    .single()
  
  console.info('Plan lookup:', plan, 'Error:', planError)
  
  if (planError || !plan) {
    throw new Error('Plan not found in subscription_plans')
  }
  
  return plan
}

/**
 * Updates user subscription in the database
 */
async function updateUserSubscription(userId, updateData) {
  console.info('Update data for user_subscriptions:', updateData)
  
  const { error: updateError } = await supabase
    .from('user_subscriptions')
    .update(updateData)
    .eq('user_id', userId)
  
  console.info('Update error (should be null):', updateError)
  
  if (updateError) {
    throw new Error('Failed to update user_subscriptions')
  }
}

/**
 * Moves user to pay-as-you-go plan
 */
async function moveUserToPayAsYouGo(userId) {
  // Find the pay-as-you-go plan
  const { data: paygPlan, error: paygPlanError } = await supabase
    .from('subscription_plans')
    .select('id')
    .eq('name', 'payg')
    .single()
  
  console.info('Payg plan lookup:', paygPlan, 'Error:', paygPlanError)
  
  if (paygPlanError || !paygPlan) {
    throw new Error('Pay as you go plan not found in subscription_plans')
  }
  
  // Update user's subscription to inactive pay-as-you-go
  const updateData = {
    plan_id: paygPlan.id,
    is_active: false,
    auto_renew: false,
    end_date: new Date().toISOString(),
    start_date: new Date().toISOString(),
  }
  
  await updateUserSubscription(userId, updateData)
}

// === EVENT HANDLERS ===

/**
 * Handles one-time credit purchases (checkout.session.completed for non-subscriptions)
 */
async function handleOneTimeCreditPurchase(stripeEvent) {
  const session = stripeEvent.data.object
  console.info('Checkout session:', session)
  
  // Only process if this is NOT a subscription session
  if (session.mode === 'subscription') {
    console.info('Checkout session is for a subscription, skipping one-time credit logic.')
    return { ignored: true, reason: 'subscription session handled elsewhere' }
  }
  
  // Extract session details
  const sessionId = session.id
  const customerEmail = session.customer_details?.email
  console.info('Customer email from session:', customerEmail)
  
  if (!customerEmail) {
    throw new Error('No customer email found in session')
  }

  // Get purchase details and user info
  const lineItems = await getCheckoutLineItems(sessionId)
  const userId = await findUserByEmail(customerEmail)

  // Calculate credits to add based on subscription_plans table
  let totalCredits = 0
  for (const item of lineItems) {
    // Get the product from the line item
    const productId = typeof item.price.product === 'string' ? item.price.product : item.price.product.id
    
    try {
      // Fetch product details from Stripe
      const product = await stripe.products.retrieve(productId)
      console.info('Product for credit calculation:', product)
      
      // Find corresponding plan in our database
      const plan = await findPlanByName(product.name)
      console.info('Found plan for credit purchase:', plan)
      
      // Calculate credits based on plan's credits_per_month and quantity
      const creditsPerItem = plan.credits_per_month || 0
      totalCredits += (item.quantity || 0) * creditsPerItem
      
    } catch (err) {
      console.error(`Error processing product ${productId}:`, err.message)
      throw new Error(`Failed to calculate credits for product: ${err.message}`)
    }
  }
  console.info('Total credits to add:', totalCredits)
  
  if (totalCredits === 0) {
    throw new Error('No credits to add')
  }

  // Update user's credit balance
  const newTotal = await updateUserCredits(userId, totalCredits)
  
  return { 
    success: true, 
    credits_added: totalCredits, 
    new_total: newTotal 
  }
}

/**
 * Handles subscription cancellation (customer.subscription.deleted)
 */
async function handleSubscriptionCancellation(stripeEvent) {
  const customerEmail = await extractCustomerEmail(stripeEvent)
  const userId = await findUserByEmail(customerEmail)
  
  console.info('Processing subscription cancellation for user:', userId)
  
  // Move user to pay-as-you-go plan (keeps existing credits)
  await moveUserToPayAsYouGo(userId)
  
  return { 
    success: true, 
    result: 'User moved to pay as you go after cancellation' 
  }
}

/**
 * Handles subscription payments and updates (invoice.payment_succeeded, customer.subscription.updated)
 */
async function handleSubscriptionPaymentAndUpdates(stripeEvent) {
  const customerEmail = await extractCustomerEmail(stripeEvent)
  const userId = await findUserByEmail(customerEmail)
  
  // Get subscription and product details from Stripe
  const { subscription, product } = await getStripeSubscriptionDetails(stripeEvent)
  
  // Find the corresponding plan in our database
  const planName = (product.name || '').toLowerCase()
  console.info('Plan name from product:', planName)
  const plan = await findPlanByName(planName)
  
  // Determine subscription status
  const isActive = subscription.status === 'active'
  const isCancelled = subscription.status === 'canceled' || subscription.cancel_at_period_end === true
  const availableCredit = isActive ? plan.credits_per_month : 0
  console.info('Subscription status:', subscription.status, 'isActive:', isActive, 'isCancelled:', isCancelled, 'availableCredit:', availableCredit)

  // Update user subscription in database
  const updateData = {
    plan_id: plan.id,
    is_active: isActive,
    auto_renew: !isCancelled,
    end_date: isCancelled ? new Date().toISOString() : null,
    start_date: new Date().toISOString(),
    available_credit: availableCredit,
  }
  
  await updateUserSubscription(userId, updateData)
  
  return { 
    success: true, 
    result: 'Subscription updated', 
    plan: planName 
  }
}

// === MAIN HANDLER ===

export default defineEventHandler(async (event) => {
  try {
    // === REQUEST METHOD VALIDATION ===
    if (event.node.req.method !== 'POST') {
      console.info('Request method not allowed:', event.node.req.method)
      event.node.res.writeHead(405)
      event.node.res.end('Method Not Allowed')
      return
    }

    // === WEBHOOK SIGNATURE VALIDATION ===
    const stripeEvent = await validateStripeWebhook(event)

    // === WEBHOOK PROCESSING ===
    console.info('Processing webhook request')
    console.info('Received webhook body:', JSON.stringify(stripeEvent))
    
    const eventType = stripeEvent.type
    console.info('Stripe event type:', eventType)

    // === FILTER RELEVANT EVENTS ===
    const supportedEvents = [
      'checkout.session.completed', 
      'invoice.payment_succeeded', 
      'customer.subscription.deleted', 
      'customer.subscription.updated'
    ]
    
    if (!supportedEvents.includes(eventType)) {
      console.info('Event ignored:', eventType)
      event.node.res.writeHead(200)
      event.node.res.end('Event ignored')
      return
    }

    // === ROUTE TO APPROPRIATE HANDLER ===
    let result
    
    switch (eventType) {
      case 'checkout.session.completed':
        result = await handleOneTimeCreditPurchase(stripeEvent)
        break
        
      case 'customer.subscription.deleted':
        result = await handleSubscriptionCancellation(stripeEvent)
        break
        
      case 'invoice.payment_succeeded':
      case 'customer.subscription.updated':
        result = await handleSubscriptionPaymentAndUpdates(stripeEvent)
        break
        
      default:
        // This shouldn't happen due to our filter above, but just in case
        event.node.res.writeHead(200)
        event.node.res.end('Event ignored')
        return
    }

    // === RETURN SUCCESS RESPONSE ===
    if (result.ignored) {
      event.node.res.writeHead(200)
      event.node.res.end(result.reason)
    } else {
      event.node.res.setHeader('Content-Type', 'application/json')
      event.node.res.end(JSON.stringify(result))
    }

  } catch (error) {
    // === ERROR HANDLING ===
    console.error('Webhook processing error:', error.message)
    event.node.res.writeHead(400)
    event.node.res.end(error.message)
  }
})
