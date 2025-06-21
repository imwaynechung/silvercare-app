/*
  # Fix user_profiles RLS policies

  1. Changes
    - Drop existing policies
    - Create new RLS policies with proper authentication checks
    - Add policy for public profile creation
    - Add policy for authenticated users to read profiles
    - Add policy for users to update their own profiles
    - Add policy for service role full access

  2. Security
    - Enable RLS
    - Ensure proper user type validation
    - Restrict profile updates to profile owners
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable profile creation for authenticated users" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable service role full access" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable update for users based on created_by" ON public.user_profiles;

-- Create new policies
CREATE POLICY "Enable profile creation for authenticated users"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = created_by AND
  user_type IN ('caregiver', 'senior')
);

CREATE POLICY "Enable read access for authenticated users"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable service role full access"
ON public.user_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable update for users based on created_by"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Ensure RLS is enabled
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;