import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { HabitTracker } from "@/components/HabitTracker";
import { MentalHealthTips } from "@/components/MentalHealthTips";
import { Settings } from "@/components/Settings";
import { usePWA } from "@/hooks/use-pwa";
import { useOffline } from "@/hooks/use-offline";
import { Button } from "@/components/ui/button";
import { Download, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const { isInstallable, installApp } = usePWA();
  const { isOnline } = useOffline();
  const { toast } = useToast();

  const handleInstallApp = async () => {
    const success = await installApp();
    if (success) {
      toast({
        title: "App Installed! 🎉",
        description: "Mcan is now available on your home screen"
      });
    }
  };

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
    <div className="min-h-screen bg-background relative">
      {/* PWA Install Prompt */}
      {isInstallable && (
        <div className="fixed top-4 left-4 right-4 z-50">
          <div className="bg-primary text-primary-foreground p-3 rounded-lg shadow-lg flex items-center gap-3">
            <Download size={20} />
            <div className="flex-1 text-sm">
              <p className="font-semibold">Install Mcan App</p>
              <p className="text-primary-foreground/80">Get the full experience</p>
            </div>
            <Button 
              size="sm" 
              variant="secondary"
              onClick={handleInstallApp}
              className="bg-white/20 hover:bg-white/30"
            >
              Install
            </Button>
          </div>
        </div>
      )}

      {/* Network Status Indicator */}
      <div className="fixed top-4 right-4 z-40">
        <div className={`p-2 rounded-full shadow-lg ${isOnline ? 'bg-wellness-green/20' : 'bg-moroccan-red/20'}`}>
          {isOnline ? (
            <Wifi size={16} className="text-wellness-green" />
          ) : (
            <WifiOff size={16} className="text-moroccan-red" />
          )}
        </div>
      </div>

      <main className="max-w-md mx-auto bg-background min-h-screen relative">
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
