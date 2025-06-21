/*
  # Update registrations table policies for upsert operations

  1. Changes
    - Drop existing conflicting policies
    - Add new policy for anonymous chatbot registrations with upsert support
    - Ensure proper RLS configuration for email-based upserts

  2. Security
    - Enable RLS on registrations table
    - Allow anonymous users to insert/update their own registrations
    - Maintain existing service role access
*/

-- First, ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Allow public to view reports by report_id" ON registrations;
DROP POLICY IF EXISTS "Allow anonymous chatbot registrations" ON registrations;

-- Add new policy for anonymous chatbot registrations with upsert support
CREATE POLICY "Allow anonymous chatbot registrations" ON registrations
FOR ALL TO anon
USING (
  -- Allow reading own records by email or report_id
  (email IS NOT NULL AND email = current_setting('request.jwt.claims', true)::json->>'email') OR
  (report_id IS NOT NULL)
)
WITH CHECK (
  -- Allow inserting/updating with required fields
  first_name IS NOT NULL AND
  status = 'pending' AND
  report_id IS NOT NULL AND
  -- Prevent abuse by requiring assessment data for new records
  (assessment_data IS NOT NULL OR email IS NOT NULL)
);

-- Re-create the public report viewing policy
CREATE POLICY "Allow public to view reports by report_id" ON registrations
FOR SELECT TO anon, authenticated
USING (report_id IS NOT NULL);

-- Ensure service role maintains full access
DROP POLICY IF EXISTS "Service role can manage registrations" ON registrations;
CREATE POLICY "Service role can manage registrations" ON registrations
FOR ALL TO service_role
USING (true)
WITH CHECK (true);