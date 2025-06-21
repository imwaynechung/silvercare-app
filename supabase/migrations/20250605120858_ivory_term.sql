/*
  # Update registrations table RLS policies

  1. Changes
    - Add RLS policy to allow anonymous users to create registrations
    - Add RLS policy to allow service role to manage all registrations
    - Add RLS policy to allow users to view their own registrations
    - Add RLS policy to allow public access to reports by report_id

  2. Security
    - Enable RLS on registrations table
    - Add policies for INSERT, SELECT operations
    - Restrict UPDATE/DELETE to service role only
*/

-- First enable RLS if not already enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public to create registrations" ON registrations;
DROP POLICY IF EXISTS "Service role can manage registrations" ON registrations;
DROP POLICY IF EXISTS "Users can view their own registrations" ON registrations;
DROP POLICY IF EXISTS "Allow public to view reports by report_id" ON registrations;

-- Create policy to allow anonymous users to create registrations
CREATE POLICY "Allow public to create registrations"
ON registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (first_name IS NOT NULL) AND 
  (relation IS NOT NULL) AND
  ((status IS NULL) OR (status = 'pending'))
);

-- Create policy for service role to have full access
CREATE POLICY "Service role can manage registrations"
ON registrations
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Create policy to allow users to view their own registrations
CREATE POLICY "Users can view their own registrations"
ON registrations
FOR SELECT
TO anon, authenticated
USING (email = current_user);

-- Create policy to allow public access to reports by report_id
CREATE POLICY "Allow public to view reports by report_id"
ON registrations
FOR SELECT
TO anon, authenticated
USING (report_id IS NOT NULL);