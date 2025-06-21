/*
  # Fix RLS policies for registrations table

  1. Changes
    - Add INSERT policy for anonymous users to create registrations
    - Ensure RLS is enabled on registrations table
    - Keep existing policies intact

  2. Security
    - Enable RLS on registrations table
    - Allow anonymous users to create new registrations
    - Maintain existing policies for authenticated users and service role
*/

-- Enable RLS on registrations table (in case it's not already enabled)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing INSERT policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Allow public to create registrations" ON registrations;

-- Create new INSERT policy for anonymous users
CREATE POLICY "Allow public to create registrations"
ON registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Basic validation rules
  first_name IS NOT NULL AND
  relation IS NOT NULL AND
  (status IS NULL OR status = 'pending') AND
  -- If email is provided, ensure it's not null
  (
    email IS NULL OR 
    LENGTH(TRIM(email)) > 0
  )
);