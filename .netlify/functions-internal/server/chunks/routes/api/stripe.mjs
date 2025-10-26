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
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function validateStripeWebhook(event) {
  const stripeSignature = event.node.req.headers["stripe-signature"];
  if (!stripeSignature) {
    throw new Error("Missing Stripe signature header");
  }
  const rawBody = await readRawBody(event, "utf8");
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.info("Stripe signature validated successfully");
    return stripeEvent;
  } catch (err) {
    throw new Error(`Stripe signature validation failed: ${err.message}`);
  }
}
async function extractCustomerEmail(stripeEvent) {
  var _a, _b, _c, _d, _e, _f, _g;
  let customerEmail = null;
  if ((_c = (_b = (_a = stripeEvent.data) == null ? void 0 : _a.object) == null ? void 0 : _b.customer_details) == null ? void 0 : _c.email) {
    customerEmail = stripeEvent.data.object.customer_details.email;
    console.info("Customer email from customer_details:", customerEmail);
  } else if ((_e = (_d = stripeEvent.data) == null ? void 0 : _d.object) == null ? void 0 : _e.customer_email) {
    customerEmail = stripeEvent.data.object.customer_email;
    console.info("Customer email from event object:", customerEmail);
  } else if ((_g = (_f = stripeEvent.data) == null ? void 0 : _f.object) == null ? void 0 : _g.customer) {
    try {
      const customerObj = await stripe.customers.retrieve(stripeEvent.data.object.customer);
      customerEmail = customerObj.email;
      console.info("Customer email from Stripe customer lookup:", customerEmail);
    } catch (err) {
      throw new Error(`Could not retrieve customer email from Stripe: ${err.message}`);
    }
  }
  if (!customerEmail) {
    throw new Error("No customer email found in event");
  }
  return customerEmail;
}
async function findUserByEmail(email) {
  const { data: user, error: userError } = await supabase.from("user_profile").select("id").eq("email", email).single();
  console.info("User lookup by email:", email, "Result:", user, "Error:", userError);
  if (userError || !user) {
    throw new Error("User not found in user_profile");
  }
  return user.id;
}
async function getCheckoutLineItems(sessionId) {
  try {
    const lineItemsResponse = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 });
    console.info("Line items for session", sessionId, ":", lineItemsResponse.data);
    return lineItemsResponse.data;
  } catch (err) {
    throw new Error(`Failed to fetch line items from Stripe: ${err.message}`);
  }
}
async function updateUserCredits(userId, creditsToAdd) {
  const { data: sub, error: subError } = await supabase.from("user_subscriptions").select("available_credit").eq("user_id", userId).order("start_date", { ascending: false }).limit(1).single();
  console.info("User subscription lookup:", sub, "Error:", subError);
  if (subError || !sub) {
    throw new Error("Active subscription not found for user");
  }
  const newCredits = (sub.available_credit || 0) + creditsToAdd;
  console.info("New available_credit after update:", newCredits);
  const { error: updateError } = await supabase.from("user_subscriptions").update({ available_credit: newCredits }).eq("user_id", userId);
  console.info("Update error (should be null):", updateError);
  if (updateError) {
    throw new Error("Failed to update user_subscriptions");
  }
  return newCredits;
}
async function getStripeSubscriptionDetails(stripeEvent) {
  var _a, _b, _c, _d, _e, _f;
  let subscriptionId = stripeEvent.data.object.subscription || ((_b = (_a = stripeEvent.data.object.parent) == null ? void 0 : _a.subscription_details) == null ? void 0 : _b.subscription);
  console.info("Initial subscriptionId from object or parent:", subscriptionId);
  if (!subscriptionId && ((_d = (_c = stripeEvent.data.object.lines) == null ? void 0 : _c.data) == null ? void 0 : _d.length)) {
    for (const line of stripeEvent.data.object.lines.data) {
      if ((_f = (_e = line.parent) == null ? void 0 : _e.subscription_item_details) == null ? void 0 : _f.subscription) {
        subscriptionId = line.parent.subscription_item_details.subscription;
        console.info("Found subscriptionId from line item:", subscriptionId);
        break;
      }
    }
  }
  if (!subscriptionId) {
    throw new Error("No subscriptionId found in event payload");
  }
  console.info("Final subscriptionId to fetch:", subscriptionId);
  let subscription;
  try {
    subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.info("Fetched subscription from Stripe:", subscription);
  } catch (err) {
    throw new Error(`Failed to fetch subscription from Stripe: ${err.message}`);
  }
  const firstItem = subscription.items.data[0];
  console.info("First subscription item:", firstItem);
  if (!firstItem) {
    throw new Error("No subscription items found for this subscription");
  }
  const productId = typeof firstItem.price.product === "string" ? firstItem.price.product : firstItem.price.product.id;
  let product;
  try {
    product = await stripe.products.retrieve(productId);
    console.info("Fetched product from Stripe:", product);
  } catch (err) {
    throw new Error(`Failed to fetch product from Stripe: ${err.message}`);
  }
  return { subscription, product };
}
async function findPlanByName(planName) {
  const cleanPlanName = planName.trim().toLowerCase();
  console.info("Looking for plan with cleaned name:", cleanPlanName);
  let { data: plan, error: planError } = await supabase.from("subscription_plans").select("id, credits_per_month, name, display_name").eq("name", cleanPlanName).single();
  if (planError || !plan) {
    console.info("Exact match not found, trying case-insensitive search...");
    const { data: plans, error: searchError } = await supabase.from("subscription_plans").select("id, credits_per_month, name, display_name").ilike("name", cleanPlanName);
    if (!searchError && plans && plans.length > 0) {
      plan = plans[0];
      planError = null;
    } else {
      planError = searchError;
    }
  }
  console.info("Plan lookup result:", plan, "Error:", planError);
  if (planError || !plan) {
    const { data: allPlans } = await supabase.from("subscription_plans").select("name, display_name");
    console.info("Available plans in database:", allPlans);
    throw new Error(`Plan not found in subscription_plans. Looking for: "${cleanPlanName}"`);
  }
  return plan;
}
async function updateUserSubscription(userId, updateData) {
  console.info("Update data for user_subscriptions:", updateData);
  const { error: updateError } = await supabase.from("user_subscriptions").update(updateData).eq("user_id", userId);
  console.info("Update error (should be null):", updateError);
  if (updateError) {
    throw new Error("Failed to update user_subscriptions");
  }
}
async function moveUserToPayAsYouGo(userId) {
  const { data: paygPlan, error: paygPlanError } = await supabase.from("subscription_plans").select("id").eq("name", "payg").single();
  console.info("Payg plan lookup:", paygPlan, "Error:", paygPlanError);
  if (paygPlanError || !paygPlan) {
    throw new Error("Pay as you go plan not found in subscription_plans");
  }
  const updateData = {
    plan_id: paygPlan.id,
    is_active: false,
    auto_renew: false,
    end_date: (/* @__PURE__ */ new Date()).toISOString(),
    start_date: (/* @__PURE__ */ new Date()).toISOString()
  };
  await updateUserSubscription(userId, updateData);
}
async function handleOneTimeCreditPurchase(stripeEvent) {
  var _a;
  const session = stripeEvent.data.object;
  console.info("Checkout session:", session);
  if (session.mode === "subscription") {
    console.info("Checkout session is for a subscription, skipping one-time credit logic.");
    return { ignored: true, reason: "subscription session handled elsewhere" };
  }
  const sessionId = session.id;
  const customerEmail = (_a = session.customer_details) == null ? void 0 : _a.email;
  console.info("Customer email from session:", customerEmail);
  if (!customerEmail) {
    throw new Error("No customer email found in session");
  }
  const lineItems = await getCheckoutLineItems(sessionId);
  const userId = await findUserByEmail(customerEmail);
  let totalCredits = 0;
  for (const item of lineItems) {
    const productId = typeof item.price.product === "string" ? item.price.product : item.price.product.id;
    try {
      const product = await stripe.products.retrieve(productId);
      console.info("Product for credit calculation:", product);
      const plan = await findPlanByName(product.name);
      console.info("Found plan for credit purchase:", plan);
      const creditsPerItem = plan.credits_per_month || 0;
      totalCredits += (item.quantity || 0) * creditsPerItem;
    } catch (err) {
      console.error(`Error processing product ${productId}:`, err.message);
      throw new Error(`Failed to calculate credits for product: ${err.message}`);
    }
  }
  console.info("Total credits to add:", totalCredits);
  if (totalCredits === 0) {
    throw new Error("No credits to add");
  }
  const newTotal = await updateUserCredits(userId, totalCredits);
  return {
    success: true,
    credits_added: totalCredits,
    new_total: newTotal
  };
}
async function handleSubscriptionCheckout(stripeEvent) {
  var _a;
  const session = stripeEvent.data.object;
  console.info("Subscription checkout session:", session);
  if (session.mode !== "subscription") {
    console.info("Checkout session is not for a subscription, skipping subscription logic.");
    return { ignored: true, reason: "non-subscription session handled elsewhere" };
  }
  const customerEmail = (_a = session.customer_details) == null ? void 0 : _a.email;
  console.info("Customer email from subscription session:", customerEmail);
  if (!customerEmail) {
    throw new Error("No customer email found in subscription session");
  }
  const userId = await findUserByEmail(customerEmail);
  console.info("Subscription checkout completed for user:", userId, "Subscription ID:", session.subscription);
  return {
    success: true,
    result: "Subscription checkout processed, credits will be added via subscription events",
    subscription_id: session.subscription
  };
}
async function handleSubscriptionCancellation(stripeEvent) {
  const customerEmail = await extractCustomerEmail(stripeEvent);
  const userId = await findUserByEmail(customerEmail);
  console.info("Processing subscription cancellation for user:", userId);
  await moveUserToPayAsYouGo(userId);
  return {
    success: true,
    result: "User moved to pay as you go after cancellation"
  };
}
async function handleSubscriptionPaymentAndUpdates(stripeEvent) {
  const customerEmail = await extractCustomerEmail(stripeEvent);
  const userId = await findUserByEmail(customerEmail);
  const { subscription, product } = await getStripeSubscriptionDetails(stripeEvent);
  const planName = (product.name || "").toLowerCase();
  console.info("Plan name from product:", planName);
  const plan = await findPlanByName(planName);
  const isActive = subscription.status === "active";
  const isCancelled = subscription.status === "canceled" || subscription.cancel_at_period_end === true;
  const creditsToAdd = isActive ? plan.credits_per_month : 0;
  console.info("Subscription status:", subscription.status, "isActive:", isActive, "isCancelled:", isCancelled, "creditsToAdd:", creditsToAdd);
  const updateData = {
    plan_id: plan.id,
    is_active: isActive,
    auto_renew: !isCancelled,
    end_date: isCancelled ? (/* @__PURE__ */ new Date()).toISOString() : null,
    start_date: (/* @__PURE__ */ new Date()).toISOString()
  };
  await updateUserSubscription(userId, updateData);
  let newTotal = 0;
  if (isActive && creditsToAdd > 0) {
    newTotal = await updateUserCredits(userId, creditsToAdd);
    console.info("Added subscription credits. New total:", newTotal);
  }
  return {
    success: true,
    result: "Subscription updated",
    plan: planName,
    credits_added: creditsToAdd,
    new_total: newTotal
  };
}
const stripe$1 = defineEventHandler(async (event) => {
  try {
    if (event.node.req.method !== "POST") {
      console.info("Request method not allowed:", event.node.req.method);
      event.node.res.writeHead(405);
      event.node.res.end("Method Not Allowed");
      return;
    }
    const stripeEvent = await validateStripeWebhook(event);
    console.info("Processing webhook request");
    console.info("Received webhook body:", JSON.stringify(stripeEvent));
    const eventType = stripeEvent.type;
    console.info("Stripe event type:", eventType);
    const supportedEvents = [
      "checkout.session.completed",
      "invoice.payment_succeeded",
      "customer.subscription.deleted",
      "customer.subscription.updated"
    ];
    if (!supportedEvents.includes(eventType)) {
      console.info("Event ignored:", eventType);
      event.node.res.writeHead(200);
      event.node.res.end("Event ignored");
      return;
    }
    let result;
    switch (eventType) {
      case "checkout.session.completed":
        const session = stripeEvent.data.object;
        if (session.mode === "subscription") {
          result = await handleSubscriptionCheckout(stripeEvent);
        } else {
          result = await handleOneTimeCreditPurchase(stripeEvent);
        }
        break;
      case "customer.subscription.deleted":
        result = await handleSubscriptionCancellation(stripeEvent);
        break;
      case "invoice.payment_succeeded":
      case "customer.subscription.updated":
        result = await handleSubscriptionPaymentAndUpdates(stripeEvent);
        break;
      default:
        event.node.res.writeHead(200);
        event.node.res.end("Event ignored");
        return;
    }
    if (result.ignored) {
      event.node.res.writeHead(200);
      event.node.res.end(result.reason);
    } else {
      event.node.res.setHeader("Content-Type", "application/json");
      event.node.res.end(JSON.stringify(result));
    }
  } catch (error) {
    console.error("Webhook processing error:", error.message);
    event.node.res.writeHead(400);
    event.node.res.end(error.message);
  }
});

export { stripe$1 as default };
//# sourceMappingURL=stripe.mjs.map
