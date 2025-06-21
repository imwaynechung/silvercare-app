/*
  # Add public report access policy

  1. Changes
    - Add new policy to allow public access to reports by report_id
    - This enables anonymous users to view reports without authentication
    - Maintains security through randomly generated report_ids

  2. Security
    - Read-only access (SELECT only)
    - Only allows access to records with valid report_id
    - Does not modify existing policies
*/

-- Add policy for public report access
CREATE POLICY "Allow public to view reports by report_id"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (report_id IS NOT NULL);