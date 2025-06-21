-- Make email field optional in registrations table
ALTER TABLE registrations ALTER COLUMN email DROP NOT NULL;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to create registrations" ON registrations;
DROP POLICY IF EXISTS "Allow anonymous chatbot registrations" ON registrations;

-- Create new policy that doesn't require email
CREATE POLICY "Allow public to create registrations"
ON registrations
FOR INSERT
TO public
WITH CHECK (
  first_name IS NOT NULL AND
  relation IS NOT NULL AND
  (status IS NULL OR status = 'pending')
);

-- Add comment to document the change
COMMENT ON COLUMN registrations.email IS 'Optional email field for user registration';