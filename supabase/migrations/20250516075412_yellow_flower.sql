/*
  # Add assessment data columns to registrations table

  1. Changes
    - Add assessment_data column to store full assessment results
    - Add risk_level column to store calculated risk level
    - Add fall_probability column to store calculated probability
    - Add report_id column for unique report identification
    - Add unique constraint to report_id to ensure one report per registration

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS assessment_data jsonb,
ADD COLUMN IF NOT EXISTS risk_level text,
ADD COLUMN IF NOT EXISTS fall_probability numeric,
ADD COLUMN IF NOT EXISTS report_id uuid DEFAULT gen_random_uuid();

-- Add unique constraint to report_id
ALTER TABLE registrations
ADD CONSTRAINT registrations_report_id_key UNIQUE (report_id);