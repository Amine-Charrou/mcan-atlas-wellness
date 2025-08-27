-- Fix the day_of_week trigger to match frontend calculation
-- The issue is timezone difference in day calculation

DROP TRIGGER IF EXISTS set_day_of_week_trigger ON public.habit_entries;
DROP FUNCTION IF EXISTS public.set_day_of_week();

-- Create updated function that uses UTC for consistency
CREATE OR REPLACE FUNCTION public.set_day_of_week()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Use TO_CHAR with Day format to get the full day name
  -- This will match the frontend calculation better
  NEW.day_of_week = TRIM(TO_CHAR(NEW.date, 'Day'));
  RETURN NEW;
END;
$function$;

-- Recreate the trigger
CREATE TRIGGER set_day_of_week_trigger
    BEFORE INSERT OR UPDATE ON public.habit_entries
    FOR EACH ROW
    EXECUTE FUNCTION public.set_day_of_week();

-- Update existing records to fix the day_of_week values
UPDATE public.habit_entries 
SET day_of_week = TRIM(TO_CHAR(date, 'Day'));