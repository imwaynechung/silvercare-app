/*
  # Fix RLS policies for registrations table

  1. Security Updates
    - Ensure RLS is enabled on registrations table
    - Drop existing policies if they exist to avoid conflicts
    - Recreate policies with proper permissions for anonymous chatbot registrations
    - Allow public to view reports by report_id
    - Allow service role full access

  2. Changes
    - Safe policy creation using DROP IF EXISTS followed by CREATE
    - Maintains existing functionality while fixing conflicts
*/

-- First, ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous chatbot registrations" ON registrations;
DROP POLICY IF EXISTS "Allow public to view reports by report_id" ON registrations;
DROP POLICY IF EXISTS "Service role can manage registrations" ON registrations;

-- Recreate the policies
CREATE POLICY "Allow anonymous chatbot registrations" ON registrations
FOR ALL TO anon
USING (
  -- Allow reading if email matches JWT claim or report_id is provided
  (email IS NOT NULL AND email = (current_setting('request.jwt.claims', true)::json ->> 'email')) OR
  (report_id IS NOT NULL)
)
WITH CHECK (
  -- Allow inserting with required fields and proper status
  first_name IS NOT NULL AND
  status = 'pending' AND
  report_id IS NOT NULL AND
  -- Must have either assessment data or email
  (assessment_data IS NOT NULL OR email IS NOT NULL)
);

CREATE POLICY "Allow public to view reports by report_id" ON registrations
FOR SELECT TO anon, authenticated
USING (report_id IS NOT NULL);

CREATE POLICY "Service role can manage registrations" ON registrations
FOR ALL TO service_role
USING (true)
WITH CHECK (true);