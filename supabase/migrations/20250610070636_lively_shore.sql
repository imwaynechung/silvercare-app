/*
  # Fix RLS policies for registrations table

  1. Security Updates
    - Ensure RLS is enabled on registrations table
    - Add policy for anonymous chatbot registrations with proper validation
    - Maintain existing policies for report access and service role management

  2. Changes
    - Drop existing conflicting policies if they exist
    - Recreate policies with proper conditions
    - Ensure assessment data validation for anonymous registrations
*/

-- First, ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous chatbot registrations" ON registrations;
DROP POLICY IF EXISTS "Allow public to view reports by report_id" ON registrations;
DROP POLICY IF EXISTS "Service role can manage registrations" ON registrations;

-- Add new policy for anonymous chatbot registrations
CREATE POLICY "Allow anonymous chatbot registrations" ON registrations
FOR ALL TO anon
USING (
  -- Allow reading if email matches JWT claim or report_id is provided
  (email IS NOT NULL AND email = ((current_setting('request.jwt.claims', true))::json ->> 'email')) OR
  (report_id IS NOT NULL)
)
WITH CHECK (
  -- For inserts, ensure required fields are present
  first_name IS NOT NULL AND
  status = 'pending' AND
  report_id IS NOT NULL AND
  -- Allow either assessment data OR email to be provided
  (assessment_data IS NOT NULL OR email IS NOT NULL)
);

-- Policy for public report access
CREATE POLICY "Allow public to view reports by report_id" ON registrations
FOR SELECT TO anon, authenticated
USING (report_id IS NOT NULL);

-- Service role policy for full access
CREATE POLICY "Service role can manage registrations" ON registrations
FOR ALL TO service_role
USING (true)
WITH CHECK (true);