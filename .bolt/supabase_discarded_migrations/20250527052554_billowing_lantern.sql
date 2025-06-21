/*
  # Update registrations table RLS policies

  1. Changes
    - Add new RLS policy to allow anonymous users to create registrations from chatbot
    - Keep existing policies intact
    - Ensure data security while allowing necessary access

  2. Security
    - Enable RLS on registrations table
    - Add policy for anonymous chatbot registrations
    - Maintain existing policies for authenticated users
*/

-- First, ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Add new policy for anonymous chatbot registrations
CREATE POLICY "Allow anonymous chatbot registrations" ON registrations
FOR INSERT TO anon
WITH CHECK (
  -- Ensure required fields are present
  first_name IS NOT NULL AND
  status = 'pending' AND
  report_id IS NOT NULL AND
  -- Prevent abuse by requiring assessment data
  assessment_data IS NOT NULL
);

-- Keep existing policies
CREATE POLICY "Allow public to view reports by report_id" ON registrations
FOR SELECT TO anon, authenticated
USING (report_id IS NOT NULL);

CREATE POLICY "Service role can manage registrations" ON registrations
FOR ALL TO service_role
USING (true)
WITH CHECK (true);