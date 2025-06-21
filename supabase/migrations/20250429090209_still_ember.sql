/*
  # Add concerns tracking to registrations table

  1. Changes
    - Add `concerns` column to `registrations` table to track specific concerns
    - Update existing policies to include the new column

  2. Security
    - Maintain existing RLS policies
    - Ensure new column is included in public registration policy
*/

-- Add concerns column
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' AND column_name = 'concerns'
  ) THEN
    ALTER TABLE registrations ADD COLUMN concerns text[];
  END IF;
END $$;

-- Update the public registration policy to include concerns
DROP POLICY IF EXISTS "Allow public to create registrations" ON registrations;
CREATE POLICY "Allow public to create registrations"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  first_name IS NOT NULL AND
  email IS NOT NULL AND
  relation IS NOT NULL AND
  (status IS NULL OR status = 'pending')
);