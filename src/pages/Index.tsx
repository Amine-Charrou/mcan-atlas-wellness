import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
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
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeScreen={activeScreen} 
        onScreenChange={setActiveScreen} 
      />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default Index;
