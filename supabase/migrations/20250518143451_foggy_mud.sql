/*
  # Create user_profiles table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_type` (text, not null)
      - `country` (text)
      - `region` (text) 
      - `city` (text)
      - `created_at` (timestamptz)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_type text NOT NULL CHECK (user_type IN ('caregiver', 'senior')),
  country text,
  region text,
  city text,
  created_at timestamptz DEFAULT now(),
  created_by uuid DEFAULT auth.uid() REFERENCES auth.users(id)
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all profiles
CREATE POLICY "Users can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to create their own profile
CREATE POLICY "Users can create their own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);