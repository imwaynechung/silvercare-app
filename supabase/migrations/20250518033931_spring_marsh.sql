/*
  # Add section interactions RLS policies

  1. Security Changes
    - Add RLS policy to allow all users to insert section interactions
    - Add RLS policy to allow authenticated users to read section interactions
    
  This migration adds necessary RLS policies to the section_interactions table to:
    - Allow both anonymous and authenticated users to track section views and interactions
    - Allow authenticated users to read the interaction data
*/

-- Enable RLS if not already enabled
ALTER TABLE section_interactions ENABLE ROW LEVEL SECURITY;

-- Allow all users (anonymous and authenticated) to insert section interactions
CREATE POLICY "Allow all users to insert section interactions"
ON section_interactions
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to read section interactions
CREATE POLICY "Allow authenticated users to read section interactions"
ON section_interactions
FOR SELECT
TO authenticated
USING (true);