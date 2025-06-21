/*
  # Add session_id to views table
  
  1. Changes
    - Add session_id column to views table
    - This column will be used to track unique views per session
  
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE views 
ADD COLUMN IF NOT EXISTS session_id text;