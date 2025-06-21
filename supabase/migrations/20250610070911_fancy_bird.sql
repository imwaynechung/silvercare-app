/*
  # Remove Views and Sections Tables

  This migration removes all tables related to view tracking and section interactions:
  
  1. Dropped Tables
     - `section_views` - tracked section viewing data
     - `section_interactions` - tracked user interactions with page sections  
     - `views` - tracked page views with device/location info
     - `visitor_sessions` - tracked visitor session data
     
  2. Cleanup
     - All foreign key constraints will be automatically dropped (CASCADE)
     - All indexes and policies on these tables will be removed
     - All data in these tables will be permanently deleted
*/

-- Drop all views and sections related tables
DROP TABLE IF EXISTS public.section_views CASCADE;
DROP TABLE IF EXISTS public.section_interactions CASCADE; 
DROP TABLE IF EXISTS public.views CASCADE;
DROP TABLE IF EXISTS public.visitor_sessions CASCADE;