/*
  # Add assessment data fields to registrations table

  1. Changes
    - Add assessment_data column to store full assessment results
    - Add risk_level column to store calculated risk level
    - Add fall_probability column to store calculated probability
    - Add report_id column for unique report identification

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS assessment_data jsonb,
ADD COLUMN IF NOT EXISTS risk_level text,
ADD COLUMN IF NOT EXISTS fall_probability numeric,
ADD COLUMN IF NOT EXISTS report_id uuid DEFAULT gen_random_uuid();