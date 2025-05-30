-- Supabase Schema for Career Planner App
-- Supports user plans, credits, and subscriptions

-- Subscription Plans Table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- 'payg', 'annual', 'monthly'
  display_name TEXT NOT NULL,
  price_cents INTEGER NOT NULL, -- price in cents
  billing_period TEXT NOT NULL, -- 'monthly', 'annual', 'payg'
  credits_per_month INTEGER NOT NULL DEFAULT 0, -- 500 for subscription, 0 for payg
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- User Subscriptions Table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES subscription_plans(id),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  auto_renew BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- User Credits Table
CREATE TABLE IF NOT EXISTS user_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  change INTEGER NOT NULL, -- positive for add, negative for spend
  reason TEXT, -- e.g. 'purchase', 'subscription', 'spend', 'admin_adjustment'
  balance_after INTEGER, -- optional: store balance after this change
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- User Plans Table
CREATE TABLE IF NOT EXISTS user_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Insert default plans
INSERT INTO subscription_plans (name, display_name, price_cents, billing_period, credits_per_month)
VALUES
  ('payg', 'Pay as you go', 0, 'payg', 0)
ON CONFLICT (name) DO NOTHING;

INSERT INTO subscription_plans (name, display_name, price_cents, billing_period, credits_per_month)
VALUES
  ('annual', 'Annual Subscription', 500, 'annual', 500)
ON CONFLICT (name) DO NOTHING;

INSERT INTO subscription_plans (name, display_name, price_cents, billing_period, credits_per_month)
VALUES
  ('monthly', 'Monthly Subscription', 700, 'monthly', 500)
ON CONFLICT (name) DO NOTHING;

--
-- Plan details:
-- Pay as you go: buy credits as needed, no monthly allocation
-- Annual: $5/month (billed annually), 500 credits/month
-- Monthly: $7/month (billed monthly), 500 credits/month
-- 