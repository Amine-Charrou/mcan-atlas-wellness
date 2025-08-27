-- Add day column to habit_entries table
ALTER TABLE public.habit_entries 
ADD COLUMN day_of_week TEXT;

-- Create function to automatically set day_of_week based on date
CREATE OR REPLACE FUNCTION public.set_day_of_week()
RETURNS TRIGGER AS $$
BEGIN
  -- Set day_of_week based on the date (Monday = 1, Sunday = 7)
  -- Convert to text format like 'Monday', 'Tuesday', etc.
  NEW.day_of_week = TO_CHAR(NEW.date, 'Day');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set day_of_week on insert/update
CREATE TRIGGER set_habit_entry_day_of_week
  BEFORE INSERT OR UPDATE ON public.habit_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.set_day_of_week();

-- Update existing records to populate the day_of_week column
UPDATE public.habit_entries 
SET day_of_week = TO_CHAR(date, 'Day');