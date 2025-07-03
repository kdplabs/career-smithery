import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    console.info('Request method not allowed:', event.node.req.method)
    event.node.res.writeHead(405)
    event.node.res.end('Method Not Allowed')
    return
  }

  let body
  try {
    body = await readBody(event)
    console.info('Received webhook body:', JSON.stringify(body))
  } catch (err) {
    console.info('Invalid request body', err)
    event.node.res.writeHead(400)
    event.node.res.end('Invalid request body')
    return
  }

  const eventType = body.type
  console.info('Stripe event type:', eventType)

  if (!['checkout.session.completed', 'invoice.payment_succeeded', 'customer.subscription.deleted', 'customer.subscription.updated'].includes(eventType)) {
    console.info('Event ignored:', eventType)
    event.node.res.writeHead(200)
    event.node.res.end('Event ignored')
    return
  }

  // --- 1. Handle One-Time Credit Purchases (not subscriptions) ---
  if (eventType === 'checkout.session.completed') {
    const session = body.data.object
    console.info('Checkout session:', session)
    // Only process if not a subscription session
    if (session.mode === 'subscription') {
      console.info('Checkout session is for a subscription, skipping one-time credit logic.')
      event.node.res.writeHead(200)
      event.node.res.end('Event ignored: subscription session handled elsewhere')
      return
    }
    const sessionId = session.id
    const customerEmail = session.customer_details?.email
    console.info('Customer email from session:', customerEmail)
    if (!customerEmail) {
      console.info('No customer email found in session')
      event.node.res.writeHead(400)
      event.node.res.end('No customer email found in session')
      return
    }

    // Fetch line items
    let lineItems
    try {
      const lineItemsResponse = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 })
      lineItems = lineItemsResponse.data
      console.info('Line items for session', sessionId, ':', lineItems)
    } catch (err) {
      console.info('Failed to fetch line items from Stripe', err)
      event.node.res.writeHead(500)
      event.node.res.end('Failed to fetch line items from Stripe')
      return
    }

    // Find user
    const { data: user, error: userError } = await supabase
      .from('user_profile')
      .select('id')
      .eq('email', customerEmail)
      .single()
    console.info('User lookup by email:', customerEmail, 'Result:', user, 'Error:', userError)
    if (userError || !user) {
      event.node.res.writeHead(404)
      event.node.res.end('User not found in user_profile')
      return
    }
    const userId = user.id
    console.info('User ID:', userId)

    // Update available_credit for each line item (assume 50 credits per quantity)
    let totalCredits = 0
    for (const item of lineItems) {
      totalCredits += (item.quantity || 0) * 50
    }
    console.info('Total credits to add:', totalCredits)
    if (totalCredits === 0) {
      event.node.res.writeHead(400)
      event.node.res.end('No credits to add')
      return
    }

    // Update the most recent user_subscriptions record
    const { data: sub, error: subError } = await supabase
      .from('user_subscriptions')
      .select('available_credit')
      .eq('user_id', userId)
      .order('start_date', { ascending: false })
      .limit(1)
      .single()
    console.info('User subscription lookup:', sub, 'Error:', subError)
    if (subError || !sub) {
      event.node.res.writeHead(404)
      event.node.res.end('Active subscription not found for user')
      return
    }
    const newCredits = (sub.available_credit || 0) + totalCredits
    console.info('New available_credit after update:', newCredits)
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({ available_credit: newCredits })
      .eq('user_id', userId)
    console.info('Update error (should be null):', updateError)
    if (updateError) {
      event.node.res.writeHead(500)
      event.node.res.end('Failed to update user_subscriptions')
      return
    }

    event.node.res.setHeader('Content-Type', 'application/json')
    event.node.res.end(JSON.stringify({ success: true, credits_added: totalCredits, new_total: newCredits }))
    return
  }

  // --- 2. Handle Subscription Products ---
  // Get customer email from event
  let customerEmail = null
  if (body.data?.object?.customer_email) {
    customerEmail = body.data.object.customer_email
    console.info('Customer email from event object:', customerEmail)
  } else if (body.data?.object?.customer) {
    try {
      const customerObj = await stripe.customers.retrieve(body.data.object.customer)
      customerEmail = customerObj.email
      console.info('Customer email from Stripe customer lookup:', customerEmail)
    } catch (err) {
      console.info('Could not retrieve customer email from Stripe customer', err)
      event.node.res.writeHead(400)
      event.node.res.end('Could not retrieve customer email')
      return
    }
  }
  if (!customerEmail) {
    console.info('No customer email found in event')
    event.node.res.writeHead(400)
    event.node.res.end('No customer email found in event')
    return
  }

  // Find user
  const { data: user, error: userError } = await supabase
    .from('user_profile')
    .select('id')
    .eq('email', customerEmail)
    .single()
  console.info('User lookup by email:', customerEmail, 'Result:', user, 'Error:', userError)
  if (userError || !user) {
    event.node.res.writeHead(404)
    event.node.res.end('User not found in user_profile')
    return
  }
  const userId = user.id
  console.info('User ID:', userId)

  // Handle subscription cancellation/deletion
  if (eventType === 'customer.subscription.deleted') {
    console.info('Processing subscription cancellation for user:', userId)
    // Move user to payg plan, set inactive, do not change available_credit
    const { data: paygPlan, error: paygPlanError } = await supabase
      .from('subscription_plans')
      .select('id')
      .eq('name', 'payg')
      .single()
    console.info('Payg plan lookup:', paygPlan, 'Error:', paygPlanError)
    if (paygPlanError || !paygPlan) {
      event.node.res.writeHead(404)
      event.node.res.end('Pay as you go plan not found in subscription_plans')
      return
    }
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        plan_id: paygPlan.id,
        is_active: false,
        auto_renew: false,
        end_date: new Date().toISOString(),
        start_date: new Date().toISOString(),
      })
      .eq('user_id', userId)
    console.info('Update error (should be null):', updateError)
    if (updateError) {
      event.node.res.writeHead(500)
      event.node.res.end('Failed to update user_subscriptions for cancellation')
      return
    }
    event.node.res.setHeader('Content-Type', 'application/json')
    event.node.res.end(JSON.stringify({ success: true, result: 'User moved to pay as you go after cancellation' }))
    return
  }

  // For payment succeeded or subscription updated, update plan
  if (eventType === 'invoice.payment_succeeded' || eventType === 'customer.subscription.updated') {
    // Robustly extract subscription ID
    let subscriptionId = body.data.object.subscription
      || body.data.object.parent?.subscription_details?.subscription;
    console.info('Initial subscriptionId from object or parent:', subscriptionId)
    // Fallback: try to get from line items if still not found
    if (!subscriptionId && body.data.object.lines?.data?.length) {
      for (const line of body.data.object.lines.data) {
        if (line.parent?.subscription_item_details?.subscription) {
          subscriptionId = line.parent.subscription_item_details.subscription;
          console.info('Found subscriptionId from line item:', subscriptionId)
          break;
        }
      }
    }
    if (!subscriptionId) {
      console.info('No subscriptionId found in event payload')
      event.node.res.writeHead(400)
      event.node.res.end('No subscriptionId found in event payload')
      return
    }
    console.info('Final subscriptionId to fetch:', subscriptionId)
    // Fetch subscription from Stripe
    let subscription
    try {
      subscription = await stripe.subscriptions.retrieve(subscriptionId)
      console.info('Fetched subscription from Stripe:', subscription)
    } catch (err) {
      console.info('Failed to fetch subscription from Stripe', err)
      event.node.res.writeHead(500)
      event.node.res.end('Failed to fetch subscription from Stripe')
      return
    }
    // Get product from first subscription item
    const firstItem = subscription.items.data[0]
    console.info('First subscription item:', firstItem)
    if (!firstItem) {
      event.node.res.writeHead(404)
      event.node.res.end('No subscription items found for this subscription')
      return
    }
    const productId = typeof firstItem.price.product === 'string' ? firstItem.price.product : firstItem.price.product.id
    let product
    try {
      product = await stripe.products.retrieve(productId)
      console.info('Fetched product from Stripe:', product)
    } catch (err) {
      console.info('Failed to fetch product from Stripe', err)
      event.node.res.writeHead(500)
      event.node.res.end('Failed to fetch product from Stripe')
      return
    }
    // Map product name to plan name (all lowercase)
    let planName = (product.name || '').toLowerCase()
    console.info('Plan name from product:', planName)
    // Find the plan in subscription_plans
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('id, credits_per_month')
      .eq('name', planName)
      .single()
    console.info('Plan lookup:', plan, 'Error:', planError)
    if (planError || !plan) {
      event.node.res.writeHead(404)
      event.node.res.end('Plan not found in subscription_plans')
      return
    }
    // Determine subscription status
    const isActive = subscription.status === 'active'
    const isCancelled = subscription.status === 'canceled' || subscription.cancel_at_period_end === true
    const availableCredit = isActive ? plan.credits_per_month : 0
    console.info('Subscription status:', subscription.status, 'isActive:', isActive, 'isCancelled:', isCancelled, 'availableCredit:', availableCredit)

    // Update user_subscriptions
    let updateData = {
      plan_id: plan.id,
      is_active: isActive,
      auto_renew: !isCancelled,
      end_date: isCancelled ? new Date().toISOString() : null,
      start_date: new Date().toISOString(),
      available_credit: availableCredit,
    }
    console.info('Update data for user_subscriptions:', updateData)
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update(updateData)
      .eq('user_id', userId)
    console.info('Update error (should be null):', updateError)
    if (updateError) {
      event.node.res.writeHead(500)
      event.node.res.end('Failed to update user_subscriptions')
      return
    }
    event.node.res.setHeader('Content-Type', 'application/json')
    event.node.res.end(JSON.stringify({ success: true, result: 'Subscription updated', plan: planName }))
    return
  }
})
