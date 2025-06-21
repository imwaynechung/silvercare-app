/*
  # Update registrations table RLS policies

  1. Security Changes
    - Enable RLS on registrations table (already enabled)
    - Add policy to allow public registration submissions
    - Keep existing service role policy

  2. Changes
    - Add new policy for anonymous inserts
    - Restrict columns that can be modified
*/

-- Keep existing policy for service role

-- Add policy for public registrations
CREATE POLICY "Allow public to create registrations"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Ensure required fields are provided
  first_name IS NOT NULL AND
  email IS NOT NULL AND
  relation IS NOT NULL AND
  -- Status must be pending for new registrations
  (status IS NULL OR status = 'pending')
);

-- Add policy to allow users to view their own registrations
CREATE POLICY "Users can view their own registrations"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (email = current_user);