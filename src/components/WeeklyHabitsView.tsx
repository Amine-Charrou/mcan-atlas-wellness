import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Droplets, Moon, Activity, Smile } from "lucide-react";

interface WeeklyData {
  date: string;
  water: number;
  sleep: number;
  activity: number;
  mood: string;
  dayName: string;
}

interface MoodCount {
  mood: string;
  count: number;
  emoji: string;
}

export function WeeklyHabitsView() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [moodData, setMoodData] = useState<MoodCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const moodEmojis: { [key: string]: string } = {
    'very_sad': '😟',
    'sad': '😕',
    'okay': '😐',
    'good': '😊',
    'excellent': '😄'
  };

  const moodLabels: { [key: string]: string } = {
    'very_sad': 'Very Sad',
    'sad': 'Sad',
    'okay': 'Okay',
    'good': 'Good',
    'excellent': 'Excellent'
  };

  useEffect(() => {
    if (user) {
      loadWeeklyData();
    }
  }, [user]);

  // Real-time subscription for habit entries updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('habit_entries_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'habit_entries',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          loadWeeklyData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadWeeklyData = async () => {
    if (!user) return;

    try {
      // Get last 7 days of data
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 6);

      const { data, error } = await supabase
        .from('habit_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;

      // Create array for all 7 days
      const weekData: WeeklyData[] = [];
      const moodCounts: { [key: string]: number } = {};
      
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];
        
        const dayEntry = data?.find(entry => entry.date === dateString);
        
        weekData.push({
          date: dateString,
          water: dayEntry?.water_glasses || 0,
          sleep: dayEntry?.sleep_hours || 0,
          activity: dayEntry?.activity_minutes || 0,
          mood: dayEntry?.mood || 'okay',
          dayName: currentDate.toLocaleDateString('en', { weekday: 'short' })
        });

        // Count moods
        const mood = dayEntry?.mood || 'okay';
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
      }

      setWeeklyData(weekData);
      
      // Convert mood counts to array
      const moodArray = Object.entries(moodCounts).map(([mood, count]) => ({
        mood: moodLabels[mood] || mood,
        count,
        emoji: moodEmojis[mood] || '😐'
      }));
      
      setMoodData(moodArray);
    } catch (error) {
      console.error('Error loading weekly data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="animate-pulse">Loading weekly data...</div>
      </div>
    );
  }

  if (!user || weeklyData.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-4">No Weekly Data</h2>
          <p className="text-muted-foreground">
            Start tracking your daily habits to see weekly progress charts.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Weekly Progress</h1>
        <p className="text-muted-foreground">Your habit trends over the past 7 days</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Water Intake Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <Droplets className="text-wellness-blue" size={24} />
            Water Intake (Glasses)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dayName" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="water" 
                stroke="hsl(var(--wellness-blue))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--wellness-blue))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-2 text-sm text-muted-foreground">
            Target: 8 glasses per day
          </div>
        </Card>

        {/* Sleep Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <Moon className="text-primary" size={24} />
            Sleep Hours
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dayName" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sleep" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-2 text-sm text-muted-foreground">
            Target: 8 hours per day
          </div>
        </Card>

        {/* Activity Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <Activity className="text-wellness-green" size={24} />
            Physical Activity (Minutes)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dayName" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="activity" 
                fill="hsl(var(--wellness-green) / 0.8)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-sm text-muted-foreground">
            Target: 60 minutes per day
          </div>
        </Card>

        {/* Mood Distribution */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <Smile className="text-moroccan-orange" size={24} />
            Weekly Mood Distribution
          </h3>
          <div className="space-y-4">
            {moodData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-medium">{item.mood}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-moroccan-orange rounded-full transition-all duration-300"
                      style={{ width: `${(item.count / 7) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-moroccan-orange">
                    {item.count} day{item.count !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Summary */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-wellness-blue mb-1">
              {Math.round(weeklyData.reduce((sum, day) => sum + day.water, 0) / 7 * 10) / 10}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Glasses/Day</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((weeklyData.reduce((sum, day) => sum + day.water, 0) / 7 / 8) * 100)}% of target
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {Math.round(weeklyData.reduce((sum, day) => sum + day.sleep, 0) / 7 * 10) / 10}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Hours/Day</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((weeklyData.reduce((sum, day) => sum + day.sleep, 0) / 7 / 8) * 100)}% of target
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-wellness-green mb-1">
              {Math.round(weeklyData.reduce((sum, day) => sum + day.activity, 0) / 7)}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Minutes/Day</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((weeklyData.reduce((sum, day) => sum + day.activity, 0) / 7 / 60) * 100)}% of target
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}