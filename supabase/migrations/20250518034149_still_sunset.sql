/*
  # Add RLS policies for section interactions table

  1. Security Changes
    - Add RLS policies to allow anonymous and authenticated users to insert section interactions
    - Add RLS policy to allow authenticated users to read section interactions
    - Add RLS policy to allow service role full access

  This migration adds the necessary row level security policies to the section_interactions
  table to allow tracking of section views and interactions while maintaining data security.
*/

-- Enable RLS if not already enabled
ALTER TABLE section_interactions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert section interactions
CREATE POLICY "Allow insert section interactions for all users"
  ON section_interactions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read section interactions
CREATE POLICY "Allow read section interactions for authenticated users"
  ON section_interactions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role full access
CREATE POLICY "Service role can manage section interactions"
  ON section_interactions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);