/*
  # Create section_interactions table for tracking user engagement

  1. New Tables
    - `section_interactions`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with time zone)
      - `page` (text) - stores which page the section is on
      - `section_id` (text) - stores which section was interacted with
      - `event_type` (text) - stores the type of interaction (view, exit)
      - `user_agent` (text) - stores browser info
      - `ip_address` (text) - stores IP for analytics
      - `device_type` (text) - stores device category
      - `device_os` (text) - stores operating system
      - `device_browser` (text) - stores browser info
      - `region` (text) - stores visitor's region
      - `country` (text) - stores visitor's country
      - `city` (text) - stores visitor's city
      - `session_id` (text) - stores session identifier
      - `time_spent` (integer) - stores time spent in seconds (for exit events)

  2. Security
    - Enable RLS on `section_interactions` table
    - Add policy for service role to manage interactions
    - Add policy for authenticated users to read interactions
*/

CREATE TABLE IF NOT EXISTS section_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  page text NOT NULL,
  section_id text NOT NULL,
  event_type text NOT NULL,
  user_agent text,
  ip_address text,
  device_type text,
  device_os text,
  device_browser text,
  region text,
  country text,
  city text,
  session_id text,
  time_spent integer
);

-- Enable RLS
ALTER TABLE section_interactions ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role can manage section_interactions"
  ON section_interactions
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read section_interactions
CREATE POLICY "Authenticated users can read section_interactions"
  ON section_interactions
  FOR SELECT
  TO authenticated
  USING (true);