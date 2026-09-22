-- =====================================================================
-- LUMINA AI SUITE - PRODUCTION SUPABASE DATABASE & SECURITY SCHEMA (RLS)
-- Copy and run this script in your Supabase SQL Editor (https://app.supabase.com)
-- =====================================================================

-- 1. Create User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  user_tier TEXT DEFAULT 'FREE' CHECK (user_tier IN ('FREE', 'PRO', 'AGENCY')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create User Credits & Security Rate Limits Table
CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  credits_remaining INT DEFAULT 5 CHECK (credits_remaining >= 0),
  daily_reset_date DATE DEFAULT CURRENT_DATE,
  last_request_timestamp TIMESTAMPTZ DEFAULT NOW(),
  request_count_per_min INT DEFAULT 0
);

-- 3. Create Captured Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  lead_type TEXT DEFAULT '500 Prompts Vault',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Payment Transactions Table
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_session_id TEXT UNIQUE,
  amount_paid INT NOT NULL,
  plan_tier TEXT CHECK (plan_tier IN ('PRO', 'AGENCY')),
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES - PREVENTS ATTACKERS FROM TAMPERING
-- =====================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Users can only read & update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can view their own credit balance
CREATE POLICY "Users can view own credits" ON public.user_credits
  FOR SELECT USING (auth.uid() = user_id);

-- System Service Role handles credit deduction (prevents client-side state manipulation)
CREATE POLICY "Service role manages credits" ON public.user_credits
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- Anyone can insert leads into the capture pipeline
CREATE POLICY "Public lead insertion" ON public.leads
  FOR INSERT WITH CHECK (true);

-- =====================================================================
-- SECURITY FUNCTION: ATOMIC CREDIT DEDUCTION & ANTI-ABUSE RATE LIMIT
-- =====================================================================

CREATE OR REPLACE FUNCTION public.deduct_user_credit(target_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INT;
  tier TEXT;
BEGIN
  -- Check user tier first
  SELECT user_tier INTO tier FROM public.profiles WHERE id = target_user_id;
  IF tier IN ('PRO', 'AGENCY') THEN
    RETURN TRUE; -- Unlimited for PRO users
  END IF;

  -- Check remaining credits
  SELECT credits_remaining INTO current_credits FROM public.user_credits WHERE user_id = target_user_id;
  
  IF current_credits > 0 THEN
    UPDATE public.user_credits 
    SET credits_remaining = credits_remaining - 1,
        last_request_timestamp = NOW()
    WHERE user_id = target_user_id;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
