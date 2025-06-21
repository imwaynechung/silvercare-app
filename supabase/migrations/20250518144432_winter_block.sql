/*
  # Update user_profiles RLS policies

  1. Changes
    - Drop existing RLS policies for user_profiles table
    - Create new policies that properly handle profile creation and management
    
  2. Security
    - Enable RLS on user_profiles table
    - Add policies for:
      - Creating own profile
      - Reading all profiles
      - Updating own profile
      - Service role full access
*/

-- First, drop existing policies
DROP POLICY IF EXISTS "Users can create their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Create new policies with proper checks
CREATE POLICY "Enable insert for authenticated users"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

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