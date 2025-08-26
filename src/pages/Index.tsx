import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { HabitTracker } from "@/components/HabitTracker";
import { MentalHealthTips } from "@/components/MentalHealthTips";
import { Settings } from "@/components/Settings";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveScreen} />;
      case "chat":
        return <ChatAssistant />;
      case "habits":
        return <HabitTracker />;
      case "mental":
        return <MentalHealthTips />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-md mx-auto bg-background min-h-screen">
        {renderScreen()}
      </main>
      <Navigation 
        activeScreen={activeScreen} 
        onScreenChange={setActiveScreen} 
      />
    </div>
  );
};

export default Index;
