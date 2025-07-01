// @ts-ignore: No type declarations for 'stripe'
import Stripe from 'stripe'
// @ts-ignore: No type declarations for 'raw-body'
import getRawBody from 'raw-body'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    event.node.res.writeHead(405)
    event.node.res.end('Method Not Allowed')
    return
  }

  const req = event.node.req
  const res = event.node.res
  let rawBody: Buffer
  try {
    rawBody = await getRawBody(req)
  } catch (err: any) {
    res.writeHead(400)
    res.end('Could not read body')
    return
  }

  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig!, webhookSecret!)
  } catch (err: any) {
    res.writeHead(400)
    res.end(`Webhook Error: ${err.message}`)
    return
  }

  // Handle the event
  switch (stripeEvent.type) {
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object
      // TODO: Update user plan/credits in your DB using Supabase client
      break
    }
    case 'invoice.payment_succeeded': {
      // Handle recurring payments, update credits, etc.
      break
    }
    // Add more event types as needed
    default:
      break
  }

  res.writeHead(200)
  res.end('Received')
}) 