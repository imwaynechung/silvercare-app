/*
  # Fix RLS policies for user_profiles table

  1. Changes
    - Drop existing RLS policies that are causing violations
    - Create new policies with proper authentication checks
    - Ensure proper access control for profile creation and management
  
  2. Security
    - Enable RLS on user_profiles table
    - Add policies for authenticated users to:
      - Create their own profiles
      - Read all profiles
      - Update their own profiles
    - Add policy for service role full access
*/

-- First, drop existing policies to start fresh
DROP POLICY IF EXISTS "Enable profile creation for authenticated users" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable service role full access" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable update for users based on created_by" ON public.user_profiles;

-- Re-create policies with proper checks
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