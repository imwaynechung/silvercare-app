/*
  # Fix user_profiles RLS policies

  1. Changes
    - Drop existing restrictive RLS policies
    - Add new policies that properly handle user profile creation and updates
    
  2. Security
    - Enable RLS (already enabled)
    - Add policy for authenticated users to create their own profiles
    - Add policy for authenticated users to read all profiles
    - Add policy for authenticated users to update their own profiles
    - Add policy for service role to have full access
    
  3. Validation
    - Maintain existing check constraint for user_type
*/

-- First, drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable service role full access" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable update for users based on created_by" ON public.user_profiles;

-- Create new policies with proper checks
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

CREATE POLICY "Enable update for users based on created_by"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Enable service role full access"
ON public.user_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);