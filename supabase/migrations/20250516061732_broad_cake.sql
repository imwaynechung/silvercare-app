/*
  # Add assessment data columns to registrations table

  1. Changes
    - Add assessment_data column to store the full assessment results
    - Add risk_level column to store the calculated risk level
    - Add fall_probability column to store the calculated fall probability
    - Add report_id column to generate unique report URLs

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS assessment_data jsonb,
ADD COLUMN IF NOT EXISTS risk_level text,
ADD COLUMN IF NOT EXISTS fall_probability numeric,
ADD COLUMN IF NOT EXISTS report_id uuid DEFAULT gen_random_uuid();