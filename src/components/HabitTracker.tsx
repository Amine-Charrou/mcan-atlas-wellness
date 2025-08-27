import { useState, useEffect } from "react";
import { Droplets, Moon, Activity, Smile, Plus, Minus, Check, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface HabitData {
  id: string;
  name: string;
  icon: any;
  current: number;
  target: number;
  unit: string;
  color: string;
  bgColor: string;
  min: number;
  max: number;
}

export function HabitTracker() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [mood, setMood] = useState(4);
  const [entryId, setEntryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [streak, setStreak] = useState(0);
  
  const [habits, setHabits] = useState<HabitData[]>([
    {
      id: "water",
      name: t.waterIntake,
      icon: Droplets,
      current: 0,
      target: 8,
      unit: t.glasses,
      color: "text-wellness-blue",
      bgColor: "bg-wellness-blue/10",
      min: 0,
      max: 15,
    },
    {
      id: "sleep",
      name: t.sleep,
      icon: Moon,
      current: 0,
      target: 8,
      unit: t.hours,
      color: "text-primary",
      bgColor: "bg-primary/10",
      min: 0,
      max: 12,
    },
    {
      id: "activity",
      name: t.physicalActivity,
      icon: Activity,
      current: 0,
      target: 60,
      unit: t.minutes,
      color: "text-wellness-green",
      bgColor: "bg-wellness-green/10",
      min: 0,
      max: 180,
    },
  ]);

  const moodLabels = ["😟", "😕", "😐", "😊", "😄"];
  const moodDescriptions = [t.verySad, t.sad, t.okayMood, t.good, t.excellent];

  // Load today's data on component mount
  useEffect(() => {
    if (user) {
      loadTodaysData();
      calculateStreak();
    }
  }, [user]);

  const loadTodaysData = async () => {
    if (!user) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('habit_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setEntryId(data.id);
        setMood(data.mood || 4);
        setHabits(prev => prev.map(habit => {
          switch (habit.id) {
            case 'water':
              return { ...habit, current: data.water_glasses || 0 };
            case 'sleep':
              return { ...habit, current: data.sleep_hours || 0 };
            case 'activity':
              return { ...habit, current: data.activity_minutes || 0 };
            default:
              return habit;
          }
        }));
      }
    } catch (error) {
      console.error('Error loading today\'s data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStreak = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('habit_entries')
        .select('date, water_glasses, sleep_hours, activity_minutes, mood')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(30);

      if (error) throw error;

      let currentStreak = 0;
      const today = new Date();
      
      for (let i = 0; i < (data?.length || 0); i++) {
        const entryDate = new Date(data![i].date);
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);
        
        if (entryDate.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
          // Check if goals were met (at least 80% of each target)
          const waterMet = (data![i].water_glasses || 0) >= 6; // 75% of 8
          const sleepMet = (data![i].sleep_hours || 0) >= 6; // 75% of 8  
          const activityMet = (data![i].activity_minutes || 0) >= 45; // 75% of 60
          const moodGood = (data![i].mood || 0) >= 3; // At least neutral
          
          if (waterMet && sleepMet && activityMet && moodGood) {
            currentStreak++;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      
      setStreak(currentStreak);
    } catch (error) {
      console.error('Error calculating streak:', error);
    }
  };

  const updateHabit = (habitId: string, value: number) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === habitId ? { ...habit, current: value } : habit
      )
    );
  };

  const quickAdd = (habitId: string, amount: number) => {
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id === habitId) {
          const newValue = Math.max(habit.min, Math.min(habit.max, habit.current + amount));
          return { ...habit, current: newValue };
        }
        return habit;
      })
    );
  };

  const saveProgress = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your progress.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const waterHabit = habits.find(h => h.id === 'water');
      const sleepHabit = habits.find(h => h.id === 'sleep');
      const activityHabit = habits.find(h => h.id === 'activity');

      const habitData = {
        user_id: user.id,
        date: today,
        mood,
        water_glasses: Math.round(waterHabit?.current || 0),
        sleep_hours: sleepHabit?.current || 0,
        activity_minutes: Math.round(activityHabit?.current || 0),
      };

      let result;
      if (entryId) {
        // Update existing entry
        result = await supabase
          .from('habit_entries')
          .update(habitData)
          .eq('id', entryId)
          .select()
          .single();
      } else {
        // Create new entry
        result = await supabase
          .from('habit_entries')
          .insert(habitData)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      setEntryId(result.data.id);
      await calculateStreak();
      
      toast({
        title: t.progressSaved,
        description: t.progressSavedDesc,
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="animate-pulse">Loading your habits...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-muted-foreground">
            Please sign in to track your daily habits and view your progress.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">{t.habitTracker}</h1>
          <p className="text-muted-foreground">{t.logDaily}</p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-moroccan-orange/10 to-primary/10 p-4 rounded-xl">
            <Flame className="text-moroccan-orange" size={24} />
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Mood Tracker */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Smile className="text-moroccan-orange" size={24} />
              {t.howMoodToday}
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-5 gap-2">
                {moodLabels.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => setMood(index + 1)}
                    className={`text-3xl p-3 rounded-xl transition-all ${
                      mood === index + 1 
                        ? "bg-moroccan-orange/20 scale-110 shadow-md" 
                        : "hover:bg-muted"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="text-center">
                <span className="text-lg font-medium text-moroccan-orange">
                  {moodDescriptions[mood - 1]}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Columns - Habit Tracking */}
        <div className="lg:col-span-2 space-y-6">
          {habits.map((habit) => {
            const Icon = habit.icon;
            const percentage = (habit.current / habit.target) * 100;
            
            return (
              <Card key={habit.id} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${habit.bgColor}`}>
                      <Icon size={24} className={habit.color} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{habit.name}</h3>
                      <p className="text-muted-foreground">
                        {t.target}: {habit.target} {habit.unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${habit.color}`}>
                      {habit.current}
                    </span>
                    <p className="text-sm text-muted-foreground">{habit.unit}</p>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    onClick={() => quickAdd(habit.id, -1)}
                    className="flex-shrink-0"
                  >
                    <Minus size={18} />
                  </Button>
                  
                  <div className="flex-1">
                    <Slider
                      value={[habit.current]}
                      onValueChange={([value]) => updateHabit(habit.id, value)}
                      max={habit.max}
                      min={habit.min}
                      step={habit.id === "sleep" ? 0.5 : 1}
                      className="w-full"
                    />
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => quickAdd(habit.id, 1)}
                    className="flex-shrink-0"
                  >
                    <Plus size={18} />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{t.progress}</span>
                    <span className={`font-bold ${habit.color}`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${habit.bgColor.replace('/10', '/50')}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Save Button */}
          <Button 
            onClick={saveProgress}
            disabled={isSaving}
            className="w-full h-14 bg-primary hover:bg-primary-light text-lg font-semibold disabled:opacity-50"
          >
            <Check size={20} className="mr-2" />
            {isSaving ? "Saving..." : t.saveTodaysProgress}
          </Button>
        </div>
      </div>
    </div>
  );
}