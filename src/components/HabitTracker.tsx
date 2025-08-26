import { useState } from "react";
import { Droplets, Moon, Activity, Smile, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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
  
  const [habits, setHabits] = useState<HabitData[]>([
    {
      id: "water",
      name: t.waterIntake,
      icon: Droplets,
      current: 6,
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
      current: 7.5,
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
      current: 45,
      target: 60,
      unit: t.minutes,
      color: "text-wellness-green",
      bgColor: "bg-wellness-green/10",
      min: 0,
      max: 180,
    },
  ]);

  const [mood, setMood] = useState(4);

  const moodLabels = ["😟", "😕", "😐", "😊", "😄"];
  const moodDescriptions = [t.verySad, t.sad, t.okayMood, t.good, t.excellent];

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

  const saveProgress = () => {
    toast({
      title: t.progressSaved,
      description: t.progressSavedDesc,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">{t.habitTracker}</h1>
        <p className="text-muted-foreground">{t.logDaily}</p>
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
            className="w-full h-14 bg-primary hover:bg-primary-light text-lg font-semibold"
          >
            <Check size={20} className="mr-2" />
            {t.saveTodaysProgress}
          </Button>
        </div>
      </div>
    </div>
  );
}