/*
  # Fix and consolidate database schema

  1. Tables
    - Ensure all tables exist with correct columns
    - Add missing constraints
    - Fix any duplicate or conflicting migrations

  2. Security
    - Verify RLS policies
    - Ensure proper access controls
*/

-- Create registrations table if it doesn't exist
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  email text UNIQUE NOT NULL,
  relation text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  concerns text[],
  whatsapp_number text,
  assessment_data jsonb,
  risk_level text,
  fall_probability numeric,
  report_id uuid DEFAULT gen_random_uuid() UNIQUE
);

-- Create views table if it doesn't exist
CREATE TABLE IF NOT EXISTS views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  page text NOT NULL,
  user_agent text,
  ip_address text,
  device_type text,
  device_os text,
  device_browser text,
  region text,
  country text,
  city text,
  session_id text
);

-- Create section_interactions table if it doesn't exist
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

-- Enable RLS on all tables
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE views ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_interactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Service role can manage registrations" ON registrations;
DROP POLICY IF EXISTS "Allow public to create registrations" ON registrations;
DROP POLICY IF EXISTS "Users can view their own registrations" ON registrations;
DROP POLICY IF EXISTS "Allow public to view reports by report_id" ON registrations;
DROP POLICY IF EXISTS "Service role can manage views" ON views;
DROP POLICY IF EXISTS "Authenticated users can read views" ON views;
DROP POLICY IF EXISTS "Service role can manage section_interactions" ON section_interactions;
DROP POLICY IF EXISTS "Authenticated users can read section_interactions" ON section_interactions;

-- Recreate policies for registrations
CREATE POLICY "Service role can manage registrations"
  ON registrations
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public to create registrations"
  ON registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    first_name IS NOT NULL AND
    email IS NOT NULL AND
    relation IS NOT NULL AND
    (status IS NULL OR status = 'pending')
  );

CREATE POLICY "Users can view their own registrations"
  ON registrations
  FOR SELECT
  TO anon, authenticated
  USING (email = current_user);

CREATE POLICY "Allow public to view reports by report_id"
  ON registrations
  FOR SELECT
  TO anon, authenticated
  USING (report_id IS NOT NULL);

-- Recreate policies for views
CREATE POLICY "Service role can manage views"
  ON views
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read views"
  ON views
  FOR SELECT
  TO authenticated
  USING (true);

-- Recreate policies for section_interactions
CREATE POLICY "Service role can manage section_interactions"
  ON section_interactions
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read section_interactions"
  ON section_interactions
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comments for documentation
COMMENT ON TABLE registrations IS 'Stores user registrations and assessment results';
COMMENT ON TABLE views IS 'Tracks page views and visitor information';
COMMENT ON TABLE section_interactions IS 'Tracks user interactions with specific page sections';
COMMENT ON COLUMN views.ip_address IS 'Actual IP address of the visitor';