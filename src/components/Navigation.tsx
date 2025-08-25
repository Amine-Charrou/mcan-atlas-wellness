import { useState } from "react";
import { Home, MessageCircle, Activity, Heart, Settings } from "lucide-react";

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export function Navigation({ activeScreen, onScreenChange }: NavigationProps) {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "chat", icon: MessageCircle, label: "Chat" },
    { id: "habits", icon: Activity, label: "Habits" },
    { id: "mental", icon: Heart, label: "Wellness" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onScreenChange(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              activeScreen === id
                ? "text-primary bg-accent/50"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}