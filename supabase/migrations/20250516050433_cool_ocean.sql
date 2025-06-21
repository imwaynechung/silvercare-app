/*
  # Add assessment results columns to registrations table

  1. Changes
    - Add columns to store assessment results
    - Add columns for risk level and probability
    - Add column for unique report ID

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS assessment_data jsonb,
ADD COLUMN IF NOT EXISTS risk_level text,
ADD COLUMN IF NOT EXISTS fall_probability numeric,
ADD COLUMN IF NOT EXISTS report_id uuid DEFAULT gen_random_uuid();