-- Add missing subscription plans to match Stripe products
-- Run this in your Supabase SQL editor

-- Pro Plan ($4.99/month, 100 credits)
INSERT INTO subscription_plans (name, display_name, price_cents, billing_period, credits_per_month)
VALUES ('pro', 'Pro', 499, 'monthly', 100)
ON CONFLICT (name) DO UPDATE SET
  price_cents = EXCLUDED.price_cents,
  credits_per_month = EXCLUDED.credits_per_month;

-- Super Hero Plan ($9.99/month, 500 credits)  
INSERT INTO subscription_plans (name, display_name, price_cents, billing_period, credits_per_month)
VALUES ('super hero', 'Super Hero', 999, 'monthly', 500)
ON CONFLICT (name) DO UPDATE SET
  price_cents = EXCLUDED.price_cents,
  credits_per_month = EXCLUDED.credits_per_month;

-- Buy Credit Plan ($5.00 one-time, 50 credits)
INSERT INTO subscription_plans (name, display_name, price_cents, billing_period, credits_per_month)
VALUES ('buy credit', 'Buy Credit', 500, 'one-time', 50)
ON CONFLICT (name) DO UPDATE SET
  price_cents = EXCLUDED.price_cents,
  credits_per_month = EXCLUDED.credits_per_month;

-- Verify the plans were added
SELECT name, display_name, price_cents, credits_per_month 
FROM subscription_plans 
ORDER BY created_at;
