import { MessageCircle, Droplets, Moon, Activity, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const habits = [
    {
      name: "Water Intake",
      icon: Droplets,
      current: 6,
      target: 8,
      unit: "glasses",
      color: "text-wellness-blue",
      bgColor: "bg-wellness-blue/10",
    },
    {
      name: "Sleep",
      icon: Moon,
      current: 7.5,
      target: 8,
      unit: "hours",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      name: "Activity",
      icon: Activity,
      current: 45,
      target: 60,
      unit: "minutes",
      color: "text-wellness-green",
      bgColor: "bg-wellness-green/10",
    },
    {
      name: "Mood",
      icon: Smile,
      current: 4,
      target: 5,
      unit: "/5",
      color: "text-moroccan-orange",
      bgColor: "bg-moroccan-orange/10",
    },
  ];

  const moroccanProverbs = [
    "الصحة تاج على رؤوس الأصحاء لا يراه إلا المرضى",
    "A healthy mind in a healthy body",
    "من جد وجد، ومن زرع حصد",
    "Take care of your body, it's the only place you have to live"
  ];

  const todayProverb = moroccanProverbs[new Date().getDay() % moroccanProverbs.length];

  return (
    <div className="pb-20 bg-gradient-to-b from-background to-accent/20">
      {/* Header with Logo */}
      <div className="bg-primary text-primary-foreground px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Welcome back!</h1>
            <p className="text-primary-foreground/80 text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <img 
            src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" 
            alt="Mcan Logo" 
            className="h-12 w-auto"
          />
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Daily Proverb Card */}
        <Card className="mb-6 p-4 border border-moroccan-gold/30 bg-gradient-to-r from-moroccan-gold/5 to-moroccan-orange/5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-moroccan-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-moroccan-gold text-sm">✨</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-moroccan-gold mb-1">Daily Inspiration</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">{todayProverb}</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-3 text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => onNavigate("chat")}
              className="h-16 bg-primary hover:bg-primary-light flex flex-col gap-1"
            >
              <MessageCircle size={20} />
              <span className="text-xs">Chat with Mcan</span>
            </Button>
            <Button
              onClick={() => onNavigate("habits")}
              variant="outline"
              className="h-16 border-primary/20 hover:bg-primary/5 flex flex-col gap-1"
            >
              <Activity size={20} />
              <span className="text-xs">Log Habits</span>
            </Button>
          </div>
        </div>

        {/* Today's Progress */}
        <div>
          <h2 className="font-bold text-lg mb-3 text-foreground">Today's Progress</h2>
          <div className="space-y-4">
            {habits.map((habit, index) => {
              const percentage = (habit.current / habit.target) * 100;
              const Icon = habit.icon;
              
              return (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${habit.bgColor}`}>
                        <Icon size={18} className={habit.color} />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{habit.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {habit.current} / {habit.target} {habit.unit}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${habit.color}`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}