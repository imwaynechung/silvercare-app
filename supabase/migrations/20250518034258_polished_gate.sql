/*
  # Fix section interactions RLS policies

  1. Changes
    - Remove duplicate and conflicting policies
    - Create clear, unified policies for section interactions
    - Enable both authenticated and anonymous users to insert and read data
    - Maintain service role full access

  2. Security
    - Consolidate policies for better maintainability
    - Ensure both authenticated and anonymous users can track interactions
    - Maintain service role administrative access
*/

-- First, drop existing conflicting policies
DROP POLICY IF EXISTS "Allow all users to insert section interactions" ON section_interactions;
DROP POLICY IF EXISTS "Allow authenticated users to read section interactions" ON section_interactions;
DROP POLICY IF EXISTS "Allow insert section interactions for all users" ON section_interactions;
DROP POLICY IF EXISTS "Allow read section interactions for authenticated users" ON section_interactions;
DROP POLICY IF EXISTS "Authenticated users can read section_interactions" ON section_interactions;
DROP POLICY IF EXISTS "Service role can manage section interactions" ON section_interactions;
DROP POLICY IF EXISTS "Service role can manage section_interactions" ON section_interactions;

-- Create new, clear policies
CREATE POLICY "Enable read access for all users"
ON section_interactions
FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for all users"
ON section_interactions
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Service role has full access"
ON section_interactions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);