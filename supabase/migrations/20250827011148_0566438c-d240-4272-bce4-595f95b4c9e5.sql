-- Update mood column to use text instead of integer
ALTER TABLE public.habit_entries 
DROP CONSTRAINT IF EXISTS habit_entries_mood_check;

ALTER TABLE public.habit_entries 
ALTER COLUMN mood TYPE TEXT USING 
  CASE mood 
    WHEN 1 THEN 'very_sad'
    WHEN 2 THEN 'sad' 
    WHEN 3 THEN 'okay'
    WHEN 4 THEN 'good'
    WHEN 5 THEN 'excellent'
    ELSE 'okay'
  END;

-- Add constraint for valid mood values
ALTER TABLE public.habit_entries 
ADD CONSTRAINT habit_entries_mood_check 
CHECK (mood IN ('very_sad', 'sad', 'okay', 'good', 'excellent'));