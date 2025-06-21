/*
  # Create chatbot interactions table

  1. New Tables
    - `chatbot_interactions`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with time zone)
      - `session_id` (text)
      - `event_type` (text)
      - `device_type` (text)
      - `device_os` (text)
      - `device_browser` (text)
      - `country` (text)
      - `region` (text)
      - `city` (text)

  2. Security
    - Enable RLS
    - Allow public insert access
    - Allow service role full access
*/

-- Create chatbot_interactions table
CREATE TABLE IF NOT EXISTS chatbot_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    session_id TEXT,
    event_type TEXT NOT NULL,
    device_type TEXT,
    device_os TEXT,
    device_browser TEXT,
    country TEXT,
    region TEXT,
    city TEXT
);

-- Enable RLS
ALTER TABLE chatbot_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public insert" ON chatbot_interactions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Service role has full access" ON chatbot_interactions FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Add comment
COMMENT ON TABLE chatbot_interactions IS 'Stores chatbot interaction events and analytics data';