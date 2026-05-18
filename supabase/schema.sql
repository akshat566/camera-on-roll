-- ATOM Database Schema for Camera On Roll Production
-- Run this in your Supabase SQL Editor

-- Users table (synced from Clerk via webhook)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  clerk_id text unique not null,
  email text unique,
  full_name text,
  avatar_url text,
  plan text default 'free' check (plan in ('free', 'basic', 'pro', 'enterprise')),
  generations_used integer default 0,
  generations_limit integer default 0,
  subscription_status text default 'inactive' check (subscription_status in ('active', 'inactive', 'past_due', 'cancelled')),
  subscription_expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Generations table (stores AI generation requests & results)
create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  prompt text not null,
  type text default 'text' check (type in ('text', 'image', 'video', 'audio')),
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  result_url text,
  r2_key text,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Subscriptions table (Razorpay payment records)
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_subscription_id text,
  plan text not null check (plan in ('basic', 'pro', 'enterprise')),
  amount integer not null, -- in paise/cents
  currency text default 'INR',
  status text default 'created' check (status in ('created', 'authorized', 'captured', 'failed', 'refunded')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Payments table (individual payment records)
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  razorpay_payment_id text unique,
  razorpay_order_id text,
  amount integer not null,
  currency text default 'INR',
  status text default 'pending' check (status in ('pending', 'captured', 'failed', 'refunded')),
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.generations enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;

-- RLS Policies

-- Users: users can read/update their own row
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid()::text = clerk_id);

-- Generations: users can CRUD their own generations
CREATE POLICY "Users can read own generations" ON public.generations
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text)
  );

CREATE POLICY "Users can insert own generations" ON public.generations
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text)
  );

CREATE POLICY "Users can update own generations" ON public.generations
  FOR UPDATE USING (
    user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text)
  );

-- Subscriptions: users can read their own
CREATE POLICY "Users can read own subscriptions" ON public.subscriptions
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text)
  );

-- Payments: users can read their own
CREATE POLICY "Users can read own payments" ON public.payments
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.users WHERE clerk_id = auth.uid()::text)
  );

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER generations_updated_at BEFORE UPDATE ON public.generations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Realtime for generations
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;

alter publication supabase_realtime add table public.generations;
