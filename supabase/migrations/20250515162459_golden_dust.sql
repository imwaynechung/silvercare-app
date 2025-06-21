/*
  # Add WhatsApp field to registrations table
  
  1. Changes
    - Add whatsapp_number column to store WhatsApp contact number
  
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS whatsapp_number text;