import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

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
    return
  }

  // Stripe webhook event type
  const eventType = body.type
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
    console.info('Product', product)
  } catch (err) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to fetch product from Stripe')
    return
  }

  // 4. Update the database (pseudo-code, replace with your actual DB logic)
  // Example: update user_subscriptions table with subscription status and product info
  // const { data, error } = await supabase
  //   .from('user_subscriptions')
  //   .update({
  //     subscription_status: subscription.status,
  //     is_cancelled: subscription.status === 'canceled' || subscription.cancel_at_period_end === true,
  //     product_id: product.id,
  //     updated_at: new Date().toISOString(),
  //   })
  //   .eq('user_email', customer.email)

  // Respond with a summary
  const result = {
    customer_name: customer.name || null,
    email: customer.email,
    product,
    subscription_status: subscription.status,
    is_cancelled: subscription.status === 'canceled' || subscription.cancel_at_period_end === true
  }
  console.info('Result', result)

  event.node.res.setHeader('Content-Type', 'application/json')
  event.node.res.end(JSON.stringify({ success: true, result }))
})
