/*
  # Create views table for tracking page visits

  1. New Tables
    - `views`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with time zone)
      - `page` (text) - stores which page was viewed
      - `user_agent` (text) - stores browser info
      - `ip_hash` (text) - stores hashed IP for analytics while preserving privacy

  2. Security
    - Enable RLS on `views` table
    - Add policy for service role to manage views
    - Add policy for authenticated users to read views
*/

CREATE TABLE IF NOT EXISTS views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  page text NOT NULL,
  user_agent text,
  ip_hash text
);

-- Enable RLS
ALTER TABLE views ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role can manage views"
  ON views
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read views
CREATE POLICY "Authenticated users can read views"
  ON views
  FOR SELECT
  TO authenticated
  USING (true);