// @ts-ignore: No type declarations for 'stripe'
import Stripe from 'stripe'
import { readRawBody } from 'h3'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  if (event.node.req.method !== 'POST') {
    event.node.res.writeHead(405)
    event.node.res.end('Method Not Allowed')
    return
  }

  let rawBody
  try {
    rawBody = await readRawBody(event)
  } catch (err) {
    event.node.res.writeHead(400)
    event.node.res.end('Could not read body')
    return
  }

  const sig = event.node.req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    event.node.res.writeHead(400)
    event.node.res.end(`Webhook Error: ${err.message}`)
    return
  }

  // Get customer email
  let customerEmail = null
  if (stripeEvent.data?.object?.customer_email) {
    customerEmail = stripeEvent.data.object.customer_email
  } else if (stripeEvent.data?.object?.customer) {
    try {
      const customer = await stripe.customers.retrieve(stripeEvent.data.object.customer)
      customerEmail = customer.email
    } catch {}
  }

  if (!customerEmail) {
    event.node.res.writeHead(200)
    event.node.res.end('No customer email found, skipping')
    return
  }

  // Find user in Supabase
  const { data: user, error: userError } = await supabase
    .from('user_profile')
    .select('id')
    .eq('email', customerEmail)
    .single()
  if (userError || !user) {
    event.node.res.writeHead(200)
    event.node.res.end('User not found, skipping')
    return
  }
  const userId = user.id

  // Fetch the latest subscription for this customer from Stripe
  let latestSub = null
  try {
    const list = await stripe.subscriptions.list({
      customer: stripeEvent.data.object.customer,
      status: 'all',
      limit: 1,
      expand: ['data.items.data.price.product']
    })
    if (list.data.length > 0) {
      latestSub = list.data[0]
    }
  } catch (err) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to fetch subscription from Stripe')
    return
  }

  // Default to payg plan
  let planName = 'payg'
  let isActive = false
  let autoRenew = false
  let availableCredit = 0

  if (latestSub && latestSub.status !== 'canceled') {
    const product = latestSub.items.data[0]?.price?.product
    planName = typeof product === 'object' && product?.name ? product.name.toLowerCase() : planName
    isActive = true
    autoRenew = latestSub.cancel_at_period_end === false
  }

  // Find the plan in subscription_plans
  const { data: plan } = await supabase
    .from('subscription_plans')
    .select('id, credits_per_month')
    .eq('name', planName)
    .single()
  if (plan) {
    availableCredit = plan.credits_per_month
  }

  // Update user_subscriptions (assume one row per user)
  await supabase
    .from('user_subscriptions')
    .update({
      plan_id: plan?.id,
      is_active: isActive,
      auto_renew: autoRenew,
      available_credit: availableCredit,
    })
    .eq('user_id', userId)

  event.node.res.writeHead(200)
  event.node.res.end('Processed')
}) 