import { useState } from "react";
import { Droplets, Moon, Activity, Smile, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

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
  
  const [habits, setHabits] = useState<HabitData[]>([
    {
      id: "water",
      name: "Water Intake",
      icon: Droplets,
      current: 6,
      target: 8,
      unit: "glasses",
      color: "text-wellness-blue",
      bgColor: "bg-wellness-blue/10",
      min: 0,
      max: 15,
    },
    {
      id: "sleep",
      name: "Sleep",
      icon: Moon,
      current: 7.5,
      target: 8,
      unit: "hours",
      color: "text-primary",
      bgColor: "bg-primary/10",
      min: 0,
      max: 12,
    },
    {
      id: "activity",
      name: "Physical Activity",
      icon: Activity,
      current: 45,
      target: 60,
      unit: "minutes",
      color: "text-wellness-green",
      bgColor: "bg-wellness-green/10",
      min: 0,
      max: 180,
    },
  ]);

  const [mood, setMood] = useState(4);

  const moodLabels = ["😟", "😕", "😐", "😊", "😄"];
  const moodDescriptions = ["Very sad", "Sad", "Okay", "Good", "Excellent"];

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
      title: "Progress Saved! 🎉",
      description: "Your daily habits have been updated successfully.",
    });
  };

  return (
    <div className="pb-20 bg-gradient-to-b from-background to-accent/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Track Your Habits</h1>
            <p className="text-primary-foreground/80 text-sm">
              Log your daily wellness activities
            </p>
          </div>
          <img src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" alt="Mcan Logo" className="h-10 w-auto" />
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-6">
        {/* Mood Tracker */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Smile className="text-moroccan-orange" size={20} />
            How's your mood today?
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              {moodLabels.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMood(index + 1)}
                  className={`text-2xl p-2 rounded-full transition-all ${
                    mood === index + 1 
                      ? "bg-moroccan-orange/20 scale-125" 
                      : "hover:bg-muted"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                {moodDescriptions[mood - 1]}
              </span>
            </div>
          </div>
        </Card>

        {/* Habit Tracking */}
        {habits.map((habit) => {
          const Icon = habit.icon;
          const percentage = (habit.current / habit.target) * 100;
          
          return (
            <Card key={habit.id} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${habit.bgColor}`}>
                    <Icon size={18} className={habit.color} />
                  </div>
                  <div>
                    <h3 className="font-medium">{habit.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Target: {habit.target} {habit.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${habit.color}`}>
                    {habit.current}
                  </span>
                  <p className="text-xs text-muted-foreground">{habit.unit}</p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-3 mb-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => quickAdd(habit.id, -1)}
                  className="flex-shrink-0"
                >
                  <Minus size={16} />
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
                  size="sm"
                  variant="outline"
                  onClick={() => quickAdd(habit.id, 1)}
                  className="flex-shrink-0"
                >
                  <Plus size={16} />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className={habit.color}>
                    {Math.round(percentage)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${habit.bgColor.replace('/10', '/50')}`}
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
          className="w-full h-12 bg-primary hover:bg-primary-light text-lg font-semibold"
        >
          <Check size={20} className="mr-2" />
          Save Today's Progress
        </Button>
      </div>
    </div>
  );
}