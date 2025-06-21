/*
  # Update RLS policies for registrations table

  1. Changes
    - Add new policy to allow public access to reports by report_id
    - Keep existing policies intact

  2. Security
    - Maintain existing RLS policies
    - Add new policy for public report access
*/

-- Add policy for public report access
CREATE POLICY "Allow public to view reports by report_id"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (report_id IS NOT NULL);

-- Keep existing policies
CREATE POLICY "Users can view their own registrations"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (email = current_user);

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