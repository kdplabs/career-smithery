// @ts-ignore: No type declarations for 'stripe'
import Stripe from 'stripe'
import { readRawBody } from 'h3'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
  // Use the official Supabase JS client for server-side
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )

  console.info('[Stripe Webhook] Incoming request')
  if (event.node.req.method !== 'POST') {
    console.info('[Stripe Webhook] Method not allowed:', event.node.req.method)
    event.node.res.writeHead(405)
    event.node.res.end('Method Not Allowed')
    return
  }

  const req = event.node.req
  const res = event.node.res
  let rawBody
  try {
    rawBody = await readRawBody(event)
    console.info('[Stripe Webhook] Raw body parsed')
  } catch (err) {
    console.error('[Stripe Webhook] Error reading raw body:', err)
    res.writeHead(400)
    res.end('Could not read body')
    return
  }

  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  console.info('[Stripe Webhook] Signature:', sig)
  console.info('[Stripe Webhook] Webhook Secret:', webhookSecret ? 'set' : 'not set')

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
    console.info('[Stripe Webhook] Stripe event constructed:', stripeEvent.type)
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err)
    res.writeHead(400)
    res.end(`Webhook Error: ${err.message}`)
    return
  }

  // Handle the event
  switch (stripeEvent.type) {
    case 'invoice.payment_succeeded': {
      const invoice = stripeEvent.data.object
      console.info('[Stripe Webhook] invoice.payment_succeeded event:', JSON.stringify(invoice, null, 2))

      // Get customer email and subscription ID
      const customerEmail = invoice.customer_email
      let subscriptionId = invoice.subscription

      // Fallback: try to get subscriptionId from line item if not present
      if (!subscriptionId && invoice.lines?.data?.[0]) {
        subscriptionId =
          invoice.lines.data[0].subscription ||
          invoice.lines.data[0].parent?.subscription_details?.subscription ||
          invoice.lines.data[0].parent?.subscription ||
          invoice.lines.data[0].id // fallback, but usually not the subscription id
      }
      if (!customerEmail || !subscriptionId) {
        console.warn('[Stripe Webhook] Missing customer_email or subscription ID on invoice')
        break
      }
      console.info('[Stripe Webhook] Customer email:', customerEmail)
      console.info('[Stripe Webhook] Subscription ID:', subscriptionId)

      // Get the first line item (assume 1 subscription per invoice)
      const line = invoice.lines?.data?.[0]
      if (!line) {
        console.warn('[Stripe Webhook] No line items found on invoice')
        break
      }
      const priceId = line.pricing?.price_details?.price
      const productId = line.pricing?.price_details?.product
      console.info('[Stripe Webhook] Price ID:', priceId)
      console.info('[Stripe Webhook] Product ID:', productId)

      // Optionally fetch product details from Stripe
      let product
      try {
        product = await stripe.products.retrieve(productId)
        console.info('[Stripe Webhook] Stripe product:', JSON.stringify(product, null, 2))
      } catch (err) {
        console.warn('[Stripe Webhook] Could not fetch product from Stripe:', err)
      }

      // Map product/price to your plan name (you may need a mapping table)
      // For demo, assume product.name matches your plan name
      const planName = product?.name?.toLowerCase()
      if (!planName) {
        console.warn('[Stripe Webhook] Could not determine plan name from product')
        break
      }

      // Find the user in Supabase by email
      const { data: user, error: userError } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', customerEmail)
        .single()
      if (userError || !user) {
        console.error('[Stripe Webhook] Could not find user by email:', customerEmail, userError)
        break
      }
      const userId = user.id

      // Find the plan in subscription_plans
      const { data: plan, error: planError } = await supabase
        .from('subscription_plans')
        .select('id, credits_per_month')
        .eq('name', planName)
        .single()
      if (planError || !plan) {
        console.error('[Stripe Webhook] Could not find plan in subscription_plans:', planError)
        break
      }

      // Update user_subscriptions
      const { error: updateError } = await supabase
        .from('user_subscriptions')
        .update({
          plan_id: plan.id,
          is_active: true,
          auto_renew: true,
          available_credit: plan.credits_per_month,
        })
        .eq('user_id', userId)
      //  .eq('id', subscriptionId)
      if (updateError) {
        console.error('[Stripe Webhook] Failed to update user_subscriptions:', updateError)
      } else {
        console.info('[Stripe Webhook] Updated user_subscriptions for user', userId, 'to plan', planName)
      }
      break
    }
    case 'customer.subscription_deleted': {
      const subscription = stripeEvent.data.object
      const subscriptionId = subscription.id
      const userId = subscription.metadata?.user_id
      if (!userId) {
        console.warn('[Stripe Webhook] Missing user_id in subscription metadata')
        break
      }
      // Find the payg plan
      const { data: paygPlan, error: paygError } = await supabase
        .from('subscription_plans')
        .select('id')
        .eq('name', 'payg')
        .single()
      if (paygError || !paygPlan) {
        console.error('[Stripe Webhook] Could not find payg plan:', paygError)
        break
      }
      // Update user_subscriptions: set plan_id to payg, is_active=false, auto_renew=false
      const { error: updateError } = await supabase
        .from('user_subscriptions')
        .update({
          plan_id: paygPlan.id,
          is_active: false,
          auto_renew: false,
        })
        .eq('user_id', userId)
        .eq('id', subscriptionId)
      if (updateError) {
        console.error('[Stripe Webhook] Failed to update user_subscriptions to payg:', updateError)
      } else {
        console.info('[Stripe Webhook] Set user', userId, 'to payg plan after cancellation')
      }
      break
    }
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object
      console.info('[Stripe Webhook] checkout.session.completed:', JSON.stringify(session, null, 2))
      // (No DB update here, handled by invoice.payment_succeeded)
      break
    }
    default:
      console.info('[Stripe Webhook] Unhandled event type:', stripeEvent.type)
      break
  }

  res.writeHead(200)
  res.end('Received')
}) 