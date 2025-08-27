-- Fix the day_of_week trigger to match frontend calculation
-- Drop the existing trigger with correct name
DROP TRIGGER IF EXISTS set_habit_entry_day_of_week ON public.habit_entries;
DROP FUNCTION IF EXISTS public.set_day_of_week() CASCADE;

-- Create updated function that calculates day consistently  
CREATE OR REPLACE FUNCTION public.set_day_of_week()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Use TO_CHAR with Day format to get the full day name, trimmed
  NEW.day_of_week = TRIM(TO_CHAR(NEW.date, 'Day'));
  RETURN NEW;
END;
$function$;

-- Recreate the trigger
CREATE TRIGGER set_habit_entry_day_of_week
    BEFORE INSERT OR UPDATE ON public.habit_entries
    FOR EACH ROW
    EXECUTE FUNCTION public.set_day_of_week();

-- Update existing records to fix the day_of_week values
UPDATE public.habit_entries 
SET day_of_week = TRIM(TO_CHAR(date, 'Day'));