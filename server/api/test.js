import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// Example: import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    event.node.res.writeHead(405)
    event.node.res.end('Method Not Allowed')
    return
  }

  let body
  try {
    body = await readBody(event)
  } catch (err) {
    event.node.res.writeHead(400)
    event.node.res.end('Invalid request body')
    console.info('Invalid request body', err)
    return
  }

  // Stripe webhook event type
  const eventType = body.type
  console.info('Event type', eventType)
  if (!['invoice.payment_succeeded', 'customer.subscription.deleted'].includes(eventType)) {
    event.node.res.writeHead(200)
    event.node.res.end('Event ignored')
    console.info('Event ignored', eventType)
    return
  }

  // Get customer email from event
  let customerEmail = null
  if (body.data?.object?.customer_email) {
    customerEmail = body.data.object.customer_email
  } else if (body.data?.object?.customer) {
    try {
      const customerObj = await stripe.customers.retrieve(body.data.object.customer)
      customerEmail = customerObj.email
      console.info('Customer email', customerEmail)
    } catch (err) {
      event.node.res.writeHead(400)
      event.node.res.end('Could not retrieve customer email')
      return
    }
  }
  if (!customerEmail) {
    event.node.res.writeHead(400)
    event.node.res.end('No customer email found in event')
    return
  }

  // 1. Fetch customer by email
  let customer
  try {
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 })
    if (!customers.data.length) {
      event.node.res.writeHead(404)
      event.node.res.end('No customer found with this email')
      return
    }
    customer = customers.data[0]
    console.info('Customer', customer)
  } catch (err) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to fetch customer from Stripe')
    return
  }

  // 2. Fetch subscriptions for the customer
  let subscription
  try {
    const subs = await stripe.subscriptions.list({ customer: customer.id, status: 'all', limit: 10 })
    if (!subs.data.length) {
      event.node.res.writeHead(404)
      event.node.res.end('No subscriptions found for this customer')
      return
    }
    // Prefer active subscription, else first
    subscription = subs.data.find(sub => sub.status === 'active') || subs.data[0]
    console.info('Subscription', subscription)
  } catch (err) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to fetch subscriptions from Stripe')
    return
  }

  // 3. Fetch product for the first subscription item
  let product = null
  let planName = 'payg'
  try {
    const firstItem = subscription.items.data[0]
    if (!firstItem) {
      event.node.res.writeHead(404)
      event.node.res.end('No subscription items found for this subscription')
      return
    }
    // price.product can be either a string (id) or object
    const productId = typeof firstItem.price.product === 'string' ? firstItem.price.product : firstItem.price.product.id
    const prod = await stripe.products.retrieve(productId)
    product = prod
    planName = (product.name || '').toLowerCase()
    // Map product name to plan name if needed
    if (!['payg', 'pro', 'super hero'].includes(planName)) {
      planName = 'payg'
    }
    console.info('Product', product)
  } catch (err) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to fetch product from Stripe')
    return
  }

  // 4. Update the database
  // Find user in user_profile
  const { data: user, error: userError } = await supabase
    .from('user_profile')
    .select('id')
    .eq('email', customer.email)
    .single()
  if (userError || !user) {
    event.node.res.writeHead(404)
    event.node.res.end('User not found in user_profile')
    return
  }
  const userId = user.id

  // Find the plan in subscription_plans
  const { data: plan, error: planError } = await supabase
    .from('subscription_plans')
    .select('id, credits_per_month')
    .eq('name', planName)
    .single()
  if (planError || !plan) {
    event.node.res.writeHead(404)
    event.node.res.end('Plan not found in subscription_plans')
    return
  }

  // Determine subscription status
  const isActive = subscription.status === 'active'
  const isCancelled = subscription.status === 'canceled' || subscription.cancel_at_period_end === true
  const availableCredit = isActive ? plan.credits_per_month : 0

  // Upsert user_subscriptions
  const { error: upsertError } = await supabase
    .from('user_subscriptions')
    .upsert([
      {
        user_id: userId,
        plan_id: plan.id,
        is_active: isActive,
        auto_renew: !isCancelled,
        available_credit: availableCredit,
        end_date: isCancelled ? new Date().toISOString() : null,
        start_date: new Date().toISOString(),
        // You can add more fields as needed
      }
    ], { onConflict: ['user_id'] })
  if (upsertError) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to upsert user_subscriptions')
    return
  }

  // Respond with a summary
  const result = {
    customer_name: customer.name || null,
    email: customer.email,
    product,
    subscription_status: subscription.status,
    is_cancelled: isCancelled,
    available_credit: availableCredit,
    plan: planName
  }
  console.info('Result', result)

  event.node.res.setHeader('Content-Type', 'application/json')
  event.node.res.end(JSON.stringify({ success: true, result }))
})
