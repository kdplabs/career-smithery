import { d as defineEventHandler, a as readRawBody } from '../../nitro/nitro.mjs';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'fs';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15"
});
const stripeWebhook = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  if (event.node.req.method !== "POST") {
    event.node.res.writeHead(405);
    event.node.res.end("Method Not Allowed");
    return;
  }
  let rawBody;
  try {
    rawBody = await readRawBody(event);
  } catch (err) {
    event.node.res.writeHead(400);
    event.node.res.end("Could not read body");
    return;
  }
  const sig = event.node.req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    event.node.res.writeHead(400);
    event.node.res.end(`Webhook Error: ${err.message}`);
    return;
  }
  let customerEmail = null;
  if ((_b = (_a = stripeEvent.data) == null ? void 0 : _a.object) == null ? void 0 : _b.customer_email) {
    customerEmail = stripeEvent.data.object.customer_email;
  } else if ((_d = (_c = stripeEvent.data) == null ? void 0 : _c.object) == null ? void 0 : _d.customer) {
    try {
      const customer = await stripe.customers.retrieve(stripeEvent.data.object.customer);
      customerEmail = customer.email;
    } catch {
    }
  }
  if (!customerEmail) {
    event.node.res.writeHead(200);
    event.node.res.end("No customer email found, skipping");
    return;
  }
  const { data: user, error: userError } = await supabase.from("user_profile").select("id").eq("email", customerEmail).single();
  if (userError || !user) {
    event.node.res.writeHead(200);
    event.node.res.end("User not found, skipping");
    return;
  }
  const userId = user.id;
  let latestSub = null;
  try {
    const list = await stripe.subscriptions.list({
      customer: stripeEvent.data.object.customer,
      status: "all",
      limit: 1,
      expand: ["data.items.data.price.product"]
    });
    if (list.data.length > 0) {
      latestSub = list.data[0];
    }
  } catch (err) {
    event.node.res.writeHead(500);
    event.node.res.end("Failed to fetch subscription from Stripe");
    return;
  }
  let planName = "payg";
  let isActive = false;
  let autoRenew = false;
  let availableCredit = 0;
  if (latestSub && latestSub.status !== "canceled") {
    const product = (_f = (_e = latestSub.items.data[0]) == null ? void 0 : _e.price) == null ? void 0 : _f.product;
    planName = typeof product === "object" && (product == null ? void 0 : product.name) ? product.name.toLowerCase() : planName;
    isActive = true;
    autoRenew = latestSub.cancel_at_period_end === false;
  }
  const { data: plan } = await supabase.from("subscription_plans").select("id, credits_per_month").eq("name", planName).single();
  if (plan) {
    availableCredit = plan.credits_per_month;
  }
  await supabase.from("user_subscriptions").update({
    plan_id: plan == null ? void 0 : plan.id,
    is_active: isActive,
    auto_renew: autoRenew,
    available_credit: availableCredit
  }).eq("user_id", userId);
  event.node.res.writeHead(200);
  event.node.res.end("Processed");
});

export { stripeWebhook as default };
//# sourceMappingURL=stripe-webhook.mjs.map
