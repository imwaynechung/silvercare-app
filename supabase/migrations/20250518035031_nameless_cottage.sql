/*
  # Update section interactions RLS policies

  1. Changes
    - Drop all existing policies to avoid conflicts
    - Add new policies for public access
    - Enable both read and insert for all users
    - Maintain service role access

  2. Security
    - Allow public access for both reading and inserting
    - Maintain service role full access
    - Clean up any conflicting policies
*/

-- First, drop existing conflicting policies
DROP POLICY IF EXISTS "Allow all users to insert section interactions" ON section_interactions;
DROP POLICY IF EXISTS "Allow authenticated users to read section interactions" ON section_interactions;
DROP POLICY IF EXISTS "Allow insert section interactions for all users" ON section_interactions;
DROP POLICY IF EXISTS "Allow read section interactions for authenticated users" ON section_interactions;
DROP POLICY IF EXISTS "Authenticated users can read section_interactions" ON section_interactions;
DROP POLICY IF EXISTS "Service role can manage section interactions" ON section_interactions;
DROP POLICY IF EXISTS "Service role can manage section_interactions" ON section_interactions;
DROP POLICY IF EXISTS "Enable read access for all users" ON section_interactions;
DROP POLICY IF EXISTS "Enable insert for all users" ON section_interactions;
DROP POLICY IF EXISTS "Service role has full access" ON section_interactions;

-- Enable RLS
ALTER TABLE section_interactions ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Enable public access"
ON section_interactions
FOR ALL
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role has full access"
ON section_interactions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);