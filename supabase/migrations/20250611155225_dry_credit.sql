/*
  # Fix RLS policies for registrations table

  1. Security Updates
    - Ensure RLS is enabled on registrations table
    - Create policies for anonymous chatbot registrations
    - Allow public access to reports by report_id
    - Grant full access to service role

  2. Changes
    - Drop existing policies if they exist to avoid conflicts
    - Recreate policies with proper permissions
    - Maintain backward compatibility
*/

-- First, ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous chatbot registrations" ON registrations;
DROP POLICY IF EXISTS "Allow public to view reports by report_id" ON registrations;
DROP POLICY IF EXISTS "Service role can manage registrations" ON registrations;

-- Create policy for anonymous chatbot registrations
CREATE POLICY "Allow anonymous chatbot registrations" ON registrations
FOR ALL TO anon
USING (
  -- Allow reading if email matches JWT claim or report_id is provided
  (email IS NOT NULL AND email = (current_setting('request.jwt.claims', true)::json ->> 'email')) OR
  (report_id IS NOT NULL)
)
WITH CHECK (
  -- Allow inserting with required fields and assessment data
  first_name IS NOT NULL AND
  status = 'pending' AND
  report_id IS NOT NULL AND
  (assessment_data IS NOT NULL OR email IS NOT NULL)
);

-- Allow public to view reports by report_id
CREATE POLICY "Allow public to view reports by report_id" ON registrations
FOR SELECT TO anon, authenticated
USING (report_id IS NOT NULL);

-- Service role has full access
CREATE POLICY "Service role can manage registrations" ON registrations
FOR ALL TO service_role
USING (true)
WITH CHECK (true);