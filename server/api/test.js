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
  if (!['invoice.payment_succeeded', 'customer.subscription.deleted', 'checkout.session.completed'].includes(eventType)) {
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
  console.info('User', userId)

  if (eventType === 'customer.subscription.deleted') {
    // Move user to pay as you go plan, set inactive, do not change available_credit
    const { data: paygPlan, error: paygPlanError } = await supabase
      .from('subscription_plans')
      .select('id')
      .eq('name', 'payg')
      .single()
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
    if (updateError) {
      event.node.res.writeHead(500)
      event.node.res.end('Failed to update user_subscriptions for cancellation')
      return
    }
    event.node.res.setHeader('Content-Type', 'application/json')
    event.node.res.end(JSON.stringify({ success: true, result: 'User moved to pay as you go after cancellation' }))
    return
  }

  // Handle one-off credit purchase via checkout.session.completed
  if (body.type === 'checkout.session.completed') {
    const session = body.data.object;
    const sessionId = session.id;
    const customerEmail = session.customer_details?.email;
    console.info('Customer email', customerEmail)
    if (!customerEmail) {
      event.node.res.writeHead(400);
      event.node.res.end('No customer email found in session');
      return;
    }

    // 1. Fetch line items for this session
    let lineItems;
    try {
      const lineItemsResponse = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 });
      lineItems = lineItemsResponse.data;
      console.info('Line items', lineItems)
    } catch (err) {
      event.node.res.writeHead(500);
      event.node.res.end('Failed to fetch line items from Stripe');
      return;
    }

    // 2. Calculate total credits to add
    let totalCredits = 0;
    for (const item of lineItems) {
      totalCredits += (item.quantity || 0) * 50;
    }
    console.info('Total credits', totalCredits)
    if (totalCredits === 0) {
      event.node.res.writeHead(400);
      event.node.res.end('No credits to add');
      return;
    }

    // 3. Find user in user_profile
    const { data: user, error: userError } = await supabase
      .from('user_profile')
      .select('id')
      .eq('email', customerEmail)
      .single();

    console.info('User', user)

    if (userError || !user) {
      event.node.res.writeHead(404);
      event.node.res.end('User not found in user_profile');
      return;
    }
    const userId = user.id;
    console.info('User ID', userId)
    // 4. Update user_subscriptions: add credits to the most recent subscription
    const { data: sub, error: subError } = await supabase
      .from('user_subscriptions')
      .select('available_credit')
      .eq('user_id', userId)
      .order('start_date', { ascending: false })
      .limit(1)
      .single();
    console.info('Subscription', sub)
    if (subError || !sub) {
      event.node.res.writeHead(404);
      event.node.res.end('Active subscription not found for user');
      return;
    }

    const newCredits = (sub.available_credit || 0) + totalCredits;
    console.info('New credits', newCredits)
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({ available_credit: newCredits })
      .eq('user_id', userId);
    console.info('Update error', updateError)
    if (updateError) {
      event.node.res.writeHead(500);
      event.node.res.end('Failed to update user_subscriptions');
      return;
    }

    event.node.res.setHeader('Content-Type', 'application/json');
    event.node.res.end(JSON.stringify({ success: true, credits_added: totalCredits, new_total: newCredits }));
    return;
  }

  // For payment succeeded, continue as before
  // 2. Fetch subscriptions for the customer
  let subscription
  try {
    const subs = await stripe.subscriptions.list({ customer: customer.id, status: 'all', limit: 10 })
    if (!subs.data.length) {
      event.node.res.writeHead(404)
      event.node.res.end('No subscriptions found for this customer')
      return
    }
    console.info('Subscriptions first pass ', subs)
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
    console.info('First item', firstItem)
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
  console.info('Plan', plan)

  // Determine subscription status
  const isActive = subscription.status === 'active'
  const isCancelled = subscription.status === 'canceled' || subscription.cancel_at_period_end === true
  const availableCredit = isActive ? plan.credits_per_month : 0

  // Update user_subscriptions (not upsert)
  let updateData = {
    plan_id: plan.id,
    is_active: isActive,
    auto_renew: !isCancelled,
    end_date: isCancelled ? new Date().toISOString() : null,
    start_date: new Date().toISOString(),
    available_credit: availableCredit,
    // You can add more fields as needed
  }

  const { error: updateError } = await supabase
    .from('user_subscriptions')
    .update(updateData)
    .eq('user_id', userId)
  if (updateError) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to update user_subscriptions')
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
