/*
  # Store actual IP address in views table
  
  1. Changes
    - Rename ip_hash column to ip_address to reflect actual IP storage
    - Update column type to text
  
  2. Security
    - RLS policies remain unchanged
    - Only authenticated users can read views
    - Service role maintains full access
*/

ALTER TABLE views 
  RENAME COLUMN ip_hash TO ip_address;

COMMENT ON COLUMN views.ip_address IS 'Actual IP address of the visitor';