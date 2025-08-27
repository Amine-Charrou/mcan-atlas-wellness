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
  
  // Add fallback for when context is not available
  let t, language = 'en';
  try {
    const context = useLanguage();
    t = context.t;
    language = context.language;
  } catch (error) {
    console.warn('LanguageProvider not available in WeeklyHabitsView, using fallback translations');
    // Fallback translations
    t = {
      weeklyProgress: "Weekly Progress",
      habitTrendsWeek: "Your habit trends over the past 7 days",
      waterIntakeGlasses: "Water Intake (Glasses)",
      sleepHours: "Sleep Hours",
      physicalActivityMinutes: "Physical Activity (Minutes)",
      weeklyMoodDistribution: "Weekly Mood Distribution",
      weeklySummary: "Weekly Summary",
      avgGlassesDay: "Avg. Glasses/Day",
      avgHoursDay: "Avg. Hours/Day",
      avgMinutesDay: "Avg. Minutes/Day",
      ofTarget: "% of target",
      day: "day",
      days: "days",
      noWeeklyData: "No Weekly Data",
      startTrackingHabits: "Start tracking your daily habits to see weekly progress charts.",
      targetGlassesDay: "Target: 8 glasses per day",
      targetHoursDay: "Target: 8 hours per day",
      targetMinutesDay: "Target: 60 minutes per day",
      loadingWeeklyData: "Loading weekly data...",
      verySad: "Very sad",
      sad: "Sad",
      okayMood: "Okay",
      good: "Good",
      excellent: "Excellent"
    };
  }
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

  const getMoodLabel = (moodKey: string): string => {
    switch (moodKey) {
      case 'very_sad': return t.verySad;
      case 'sad': return t.sad;
      case 'okay': return t.okayMood;
      case 'good': return t.good;
      case 'excellent': return t.excellent;
      default: return t.okayMood;
    }
  };

  const getLocalizedDayName = (date: Date): string => {
    // Use proper locale codes and handle Arabic specifically
    const locale = language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US';
    try {
      return date.toLocaleDateString(locale, { weekday: 'short' });
    } catch (error) {
      // Fallback to English if locale is not supported
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
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
        (payload) => {
          console.log('Real-time update received:', payload);
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
      setIsLoading(true);
      
      // Get current week from Monday to Sunday
      const today = new Date();
      const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Adjust for Monday start
      
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + mondayOffset);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from('habit_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;

      console.log('Weekly data loaded:', data);

      // Create array for all 7 days (Monday to Sunday) with proper structure
      const weekData: WeeklyData[] = [];
      const moodCounts: { [key: string]: number } = {};
      
      // Generate all 7 days from Monday to Sunday
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];
        
        // Find data for this specific date
        const dayEntry = data?.find(entry => entry.date === dateString);
        
        // Create structured day data
        const dayData: WeeklyData = {
          date: dateString,
          water: dayEntry?.water_glasses || 0,
          sleep: dayEntry?.sleep_hours || 0,
          activity: dayEntry?.activity_minutes || 0,
          mood: dayEntry?.mood || 'okay',
          dayName: getLocalizedDayName(currentDate)
        };
        
        weekData.push(dayData);

        // Count moods for distribution - only count actual entries, not default values
        if (dayEntry?.mood) {
          const mood = dayEntry.mood;
          moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        }
      }
      
      // Ensure we have exactly 7 days in correct order (Mon-Sun)
      console.log('Week structure:', weekData.map(d => ({ day: d.dayName, date: d.date, hasData: d.water > 0 || d.sleep > 0 || d.activity > 0 })));
      
      // Validate that we always have exactly 7 days
      if (weekData.length !== 7) {
        console.error('Week data should have exactly 7 days, got:', weekData.length);
      }

      setWeeklyData(weekData);
      
      // Convert mood counts to array with proper labels
      const moodArray = Object.entries(moodCounts).map(([mood, count]) => ({
        mood: getMoodLabel(mood),
        count,
        emoji: moodEmojis[mood] || '😐'
      }));
      
      setMoodData(moodArray);
      console.log('Weekly data processed:', { weekData, moodArray });
    } catch (error) {
      console.error('Error loading weekly data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="animate-pulse">{t.loadingWeeklyData}</div>
      </div>
    );
  }

  if (!user || weeklyData.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-4">{t.noWeeklyData}</h2>
          <p className="text-muted-foreground">
            {t.startTrackingHabits}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">{t.weeklyProgress}</h1>
        <p className="text-muted-foreground">{t.habitTrendsWeek}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Water Intake Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <Droplets className="text-wellness-blue" size={24} />
            {t.waterIntakeGlasses}
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
            {t.targetGlassesDay}
          </div>
        </Card>

        {/* Sleep Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <Moon className="text-primary" size={24} />
            {t.sleepHours}
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
            {t.targetHoursDay}
          </div>
        </Card>

        {/* Activity Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <Activity className="text-wellness-green" size={24} />
            {t.physicalActivityMinutes}
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dayName" />
              <YAxis />
              <Tooltip 
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    const dayData = payload[0].payload as WeeklyData;
                    return `${label} (${dayData.date})`;
                  }
                  return label;
                }}
                formatter={(value: number, name: string) => {
                  if (value === 0) {
                    return ['No activity recorded', name];
                  }
                  return [`${value} minutes`, name];
                }}
              />
              <Bar 
                dataKey="activity" 
                fill="hsl(var(--wellness-green) / 0.8)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4">
            <div className="text-sm text-muted-foreground mb-2">
              {t.targetMinutesDay}
            </div>
            {/* Show missed days */}
            <div className="flex flex-wrap gap-1">
              {weeklyData.map((day, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs ${
                    day.activity === 0
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      : 'bg-wellness-green/20 text-wellness-green'
                  }`}
                >
                  {day.dayName}: {day.activity}min
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Mood Distribution */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <Smile className="text-moroccan-orange" size={24} />
            {t.weeklyMoodDistribution}
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
                    {item.count} {item.count === 1 ? t.day : t.days}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

        {/* Weekly Summary - Dynamic calculations */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">{t.weeklySummary}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-wellness-blue mb-1">
                {weeklyData.length > 0 ? (Math.round(weeklyData.reduce((sum, day) => sum + day.water, 0) / weeklyData.length * 10) / 10) : 0}
              </div>
              <div className="text-sm text-muted-foreground">{t.avgGlassesDay}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {weeklyData.length > 0 ? Math.round((weeklyData.reduce((sum, day) => sum + day.water, 0) / weeklyData.length / 8) * 100) : 0}{t.ofTarget}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {weeklyData.length > 0 ? (Math.round(weeklyData.reduce((sum, day) => sum + day.sleep, 0) / weeklyData.length * 10) / 10) : 0}
              </div>
              <div className="text-sm text-muted-foreground">{t.avgHoursDay}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {weeklyData.length > 0 ? Math.round((weeklyData.reduce((sum, day) => sum + day.sleep, 0) / weeklyData.length / 8) * 100) : 0}{t.ofTarget}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-wellness-green mb-1">
                {weeklyData.length > 0 ? Math.round(weeklyData.reduce((sum, day) => sum + day.activity, 0) / weeklyData.length) : 0}
              </div>
              <div className="text-sm text-muted-foreground">{t.avgMinutesDay}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {weeklyData.length > 0 ? Math.round((weeklyData.reduce((sum, day) => sum + day.activity, 0) / weeklyData.length / 60) * 100) : 0}{t.ofTarget}
              </div>
            </div>
          </div>
          
          {/* Weekly insights */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-lg font-semibold mb-3">Weekly Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-wellness-blue/10 p-4 rounded-lg">
                <h5 className="font-medium text-wellness-blue mb-2">Hydration Trend</h5>
                <p className="text-sm text-muted-foreground">
                  {weeklyData.length > 0 && weeklyData.reduce((sum, day) => sum + day.water, 0) / weeklyData.length >= 6 
                    ? "Great hydration habits! Keep it up!" 
                    : "Try to drink more water daily for better health."}
                </p>
              </div>
              <div className="bg-wellness-green/10 p-4 rounded-lg">
                <h5 className="font-medium text-wellness-green mb-2">Activity Level</h5>
                <p className="text-sm text-muted-foreground">
                  {weeklyData.length > 0 && weeklyData.reduce((sum, day) => sum + day.activity, 0) / weeklyData.length >= 30
                    ? "Excellent activity levels this week!"
                    : "Consider adding more physical activity to your routine."}
                </p>
              </div>
            </div>
          </div>
        </Card>
    </div>
  );
}