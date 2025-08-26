import { useState } from "react";
import { MessageCircle, Droplets, Moon, Activity, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { n8nClient } from "@/lib/n8n-client";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { toast } = useToast();
  
  const habits = [
    {
      name: "Sleep Quality",
      icon: Moon,
      current: 7.5,
      target: 8,
      unit: "hours",
      color: "text-primary",
      bgColor: "bg-primary/10",
      tip: "النوم المبكر نعمة - Early sleep is a blessing"
    },
    {
      name: "Hydration",
      icon: Droplets,
      current: 6,
      target: 8,
      unit: "glasses",
      color: "text-wellness-blue",
      bgColor: "bg-wellness-blue/10",
      tip: "الماء أساس الحياة - Water is the essence of life"
    },
    {
      name: "Physical Activity",
      icon: Activity,
      current: 45,
      target: 60,
      unit: "minutes",
      color: "text-wellness-green",
      bgColor: "bg-wellness-green/10",
      tip: "الحركة بركة - Movement is a blessing"
    },
    {
      name: "Daily Mood",
      icon: Smile,
      current: 4,
      target: 5,
      unit: "/5",
      color: "text-accent",
      bgColor: "bg-accent/10",
      tip: "البسمة صدقة - A smile is charity"
    },
  ];

  const moroccanProverbs = [
    {
      arabic: "الصحة تاج على رؤوس الأصحاء لا يراه إلا المرضى",
      english: "Health is a crown on the heads of the healthy, seen only by the sick",
      category: "health"
    },
    {
      arabic: "من جد وجد، ومن زرع حصد",
      english: "Who seeks finds, who plants harvests",
      category: "motivation"
    },
    {
      arabic: "العقل السليم في الجسم السليم",
      english: "A healthy mind in a healthy body",
      category: "wellness"
    },
    {
      arabic: "الصبر مفتاح الفرج",
      english: "Patience is the key to relief",
      category: "mental-health"
    }
  ];

  const todayProverb = moroccanProverbs[new Date().getDay() % moroccanProverbs.length];

  const loadDashboardData = async () => {
    try {
      await n8nClient.sendDashboardLoad("user_123");
      toast({
        title: "Data synced! ✨",
        description: "Your wellness data has been updated."
      });
    } catch (error) {
      console.log("Offline mode - using cached data");
    }
  };

  return (
    <div className="pb-20 min-h-screen moroccan-pattern">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-header font-bold">أهلاً وسهلاً</h1>
            <h2 className="text-xl font-header font-semibold mt-1">Welcome back!</h2>
            <p className="text-primary-foreground/90 text-sm font-body mt-2">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" 
              alt="Mcan Logo" 
              className="h-16 w-auto mb-2"
            />
            <div className="text-xs text-primary-foreground/80 text-center">
              AI Health Assistant
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-6">
        {/* Daily Inspiration Card */}
        <Card className="p-6 border-2 border-moroccan-gold/30 bg-gradient-to-r from-card to-accent/5 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-moroccan-gold/20 flex items-center justify-center flex-shrink-0">
              <span className="text-moroccan-gold text-xl">✨</span>
            </div>
            <div className="flex-1">
              <h3 className="font-header font-semibold text-moroccan-gold mb-3 text-lg">
                Daily Inspiration • إلهام يومي
              </h3>
              <p className="text-foreground font-body text-sm leading-relaxed mb-2 text-right" dir="rtl">
                {todayProverb.arabic}
              </p>
              <p className="text-foreground/80 font-body text-sm leading-relaxed">
                {todayProverb.english}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="font-header font-bold text-xl mb-4 text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => onNavigate("chat")}
              className="h-20 bg-primary hover:bg-primary-light font-header text-white flex flex-col gap-2 shadow-lg"
            >
              <MessageCircle size={24} />
              <span className="text-sm font-semibold">Chat with Mcan</span>
            </Button>
            <Button
              onClick={() => onNavigate("habits")}
              variant="outline"
              className="h-20 border-2 border-accent/30 hover:bg-accent/10 font-header flex flex-col gap-2 shadow-lg"
            >
              <Activity size={24} className="text-accent" />
              <span className="text-sm font-semibold text-accent">Track Habits</span>
            </Button>
          </div>
        </div>

        {/* Today's Progress */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-header font-bold text-xl text-foreground">Today's Progress</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={loadDashboardData}
              className="text-primary hover:text-primary-light"
            >
              Sync Data
            </Button>
          </div>
          
          <div className="grid gap-4">
            {habits.map((habit, index) => {
              const percentage = Math.min((habit.current / habit.target) * 100, 100);
              const Icon = habit.icon;
              
              return (
                <Card key={index} className="p-5 hover:shadow-lg transition-all duration-300 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${habit.bgColor} shadow-sm`}>
                        <Icon size={22} className={habit.color} />
                      </div>
                      <div>
                        <h3 className="font-header font-semibold text-base">{habit.name}</h3>
                        <p className="text-sm text-muted-foreground font-body">
                          {habit.current} / {habit.target} {habit.unit}
                        </p>
                        <p className="text-xs text-moroccan-gold font-body italic mt-1">
                          {habit.tip}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xl font-bold ${habit.color}`}>
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  </div>
                  
                  <Progress 
                    value={percentage} 
                    className="h-3 bg-muted/50"
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