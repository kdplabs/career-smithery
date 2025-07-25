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
create table public.user_subscriptions (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  plan_id uuid not null,
  start_date timestamp with time zone not null default timezone ('utc'::text, now()),
  end_date timestamp with time zone null,
  is_active boolean not null default true,
  auto_renew boolean not null default true,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  available_credit bigint null default '0'::bigint,
  constraint user_subscriptions_pkey primary key (id),
  constraint user_subscriptions_plan_id_fkey foreign KEY (plan_id) references subscription_plans (id),
  constraint user_subscriptions_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

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
create table public.user_plans (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  assessment_data jsonb not null,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  last_updated timestamp with time zone null default timezone ('utc'::text, now()),
  personalized_report jsonb null,
  constraint user_plans_pkey primary key (id),
  constraint user_plans_user_id_key unique (user_id),
  constraint user_plans_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

--
-- User Profile Table
--
CREATE TABLE IF NOT EXISTS public.user_profile (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Function to upsert into user_profile on auth.users insert or update
CREATE OR REPLACE FUNCTION public.handle_user_profile_upsert()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profile (id, email, metadata, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data, timezone('utc', now()), timezone('utc', now()))
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        metadata = EXCLUDED.metadata,
        updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for INSERT on auth.users
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_user_profile_upsert();

-- Trigger for UPDATE on auth.users (email or metadata changes)
CREATE TRIGGER on_auth_user_updated
AFTER UPDATE OF email, raw_user_meta_data ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_user_profile_upsert();

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

--\n-- One-time script to backfill user_profile for existing users\n--\n
INSERT INTO public.user_profile 
(id, email, metadata, created_at, updated_at)
SELECT
  id,  email, raw_user_meta_data, timezone('utc', now()), timezone('utc', now())
FROM auth.users
ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      metadata = EXCLUDED.metadata,
      updated_at = timezone('utc', now());


CREATE TABLE IF NOT EXISTS user_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('leadership', 'domain_knowledge', 'technical_skills', 'networking_marketing')),
  quarter TEXT NOT NULL, -- e.g. '2024-Q3'
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo', -- 'todo', 'in_progress', 'done', 'archived'
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Storage bucket and policies for profile images
-- Create the profile-images bucket (run this in Supabase Dashboard or via SQL if bucket doesn't exist)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('profile-images', 'profile-images', true);

-- RLS Policies for profile-images storage bucket
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to upload files to profile-images bucket
CREATE POLICY "Allow anyone to upload profile images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-images');

-- Policy to allow anyone to view profile images (for public access)
CREATE POLICY "Allow anyone to view profile images" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-images');

-- Policy to allow anyone to update profile images
CREATE POLICY "Allow anyone to update profile images" ON storage.objects
FOR UPDATE USING (bucket_id = 'profile-images');

-- Policy to allow anyone to delete profile images
CREATE POLICY "Allow anyone to delete profile images" ON storage.objects
FOR DELETE USING (bucket_id = 'profile-images');

-- Alternative: If you want to restrict operations to authenticated users only, 
-- replace the policies above with these:
/*
CREATE POLICY "Allow authenticated users to upload profile images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view profile images" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update profile images" ON storage.objects
FOR UPDATE USING (bucket_id = 'profile-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete profile images" ON storage.objects
FOR DELETE USING (bucket_id = 'profile-images' AND auth.role() = 'authenticated');
*/


CREATE TABLE IF NOT EXISTS support_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category VARCHAR(100) DEFAULT 'general',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_support_requests_user_id ON support_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_support_requests_status ON support_requests(status);
CREATE INDEX IF NOT EXISTS idx_support_requests_created_at ON support_requests(created_at);

-- Enable RLS
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own support requests
CREATE POLICY "Users can view own support requests" ON support_requests
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own support requests
CREATE POLICY "Users can create support requests" ON support_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own support requests (but not status/priority/admin_notes)
CREATE POLICY "Users can update own support requests" ON support_requests
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_support_requests_updated_at
  BEFORE UPDATE ON support_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();npm 