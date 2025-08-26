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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground p-8 rounded-xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-primary-foreground/80 text-lg">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Daily Proverb & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Daily Proverb Card */}
          <Card className="p-6 border border-moroccan-gold/30 bg-gradient-to-r from-moroccan-gold/5 to-moroccan-orange/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-moroccan-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="text-moroccan-gold text-lg">✨</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-moroccan-gold mb-2">Daily Inspiration</h3>
                <p className="text-foreground/80 leading-relaxed">{todayProverb}</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div>
            <h2 className="font-bold text-xl mb-4 text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => onNavigate("chat")}
                className="h-16 bg-primary hover:bg-primary-light flex items-center justify-center gap-3 text-lg"
              >
                <MessageCircle size={24} />
                <span>Chat with Mcan AI</span>
              </Button>
              <Button
                onClick={() => onNavigate("habits")}
                variant="outline"
                className="h-16 border-primary/20 hover:bg-primary/5 flex items-center justify-center gap-3 text-lg"
              >
                <Activity size={24} />
                <span>Log Your Habits</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Today's Progress */}
        <div className="lg:col-span-2">
          <h2 className="font-bold text-xl mb-6 text-foreground">Today's Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {habits.map((habit, index) => {
              const percentage = (habit.current / habit.target) * 100;
              const Icon = habit.icon;
              
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${habit.bgColor}`}>
                        <Icon size={24} className={habit.color} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{habit.name}</h3>
                        <p className="text-muted-foreground">
                          {habit.current} / {habit.target} {habit.unit}
                        </p>
                      </div>
                    </div>
                    <span className={`text-lg font-bold ${habit.color}`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-3"
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