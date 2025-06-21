/*
  # Create registrations table

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `email` (text, unique)
      - `relation` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `registrations` table
    - Add policy for service role to manage registrations
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  email text UNIQUE NOT NULL,
  relation text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage registrations"
  ON registrations
  TO service_role
  USING (true)
  WITH CHECK (true);