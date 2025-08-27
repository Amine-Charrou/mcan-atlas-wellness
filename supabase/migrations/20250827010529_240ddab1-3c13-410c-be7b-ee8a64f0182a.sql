-- Create habit_entries table for tracking daily habits
CREATE TABLE public.habit_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood INTEGER CHECK (mood >= 1 AND mood <= 5),
  water_glasses INTEGER DEFAULT 0 CHECK (water_glasses >= 0),
  sleep_hours DECIMAL(3,1) DEFAULT 0 CHECK (sleep_hours >= 0),
  activity_minutes INTEGER DEFAULT 0 CHECK (activity_minutes >= 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.habit_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own habit entries" 
ON public.habit_entries 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habit entries" 
ON public.habit_entries 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habit entries" 
ON public.habit_entries 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_habit_entries_updated_at
BEFORE UPDATE ON public.habit_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();