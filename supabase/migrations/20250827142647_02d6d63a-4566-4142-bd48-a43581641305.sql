-- Fix security issue: Update function to set search_path
CREATE OR REPLACE FUNCTION public.set_day_of_week()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Set day_of_week based on the date (Monday = 1, Sunday = 7)
  -- Convert to text format like 'Monday', 'Tuesday', etc.
  NEW.day_of_week = TO_CHAR(NEW.date, 'Day');
  RETURN NEW;
END;
$$;