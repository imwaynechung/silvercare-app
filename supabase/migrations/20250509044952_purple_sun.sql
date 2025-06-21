/*
  # Add device and region info to views table

  1. Changes
    - Add device_type column to store device category (mobile, tablet, desktop)
    - Add device_os column to store operating system
    - Add device_browser column to store browser name and version
    - Add region column to store visitor's region
    - Add country column to store visitor's country
    - Add city column to store visitor's city

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE views 
ADD COLUMN IF NOT EXISTS device_type text,
ADD COLUMN IF NOT EXISTS device_os text,
ADD COLUMN IF NOT EXISTS device_browser text,
ADD COLUMN IF NOT EXISTS region text,
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS city text;