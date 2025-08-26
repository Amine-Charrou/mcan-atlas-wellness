import { Home, MessageCircle, Activity, Heart, Settings } from "lucide-react";

interface SidebarProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export function Sidebar({ activeScreen, onScreenChange }: SidebarProps) {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "chat", icon: MessageCircle, label: "AI Chat" },
    { id: "habits", icon: Activity, label: "Habit Tracker" },
    { id: "mental", icon: Heart, label: "Mental Wellness" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" 
            alt="Mcan Logo" 
            className="h-10 w-auto"
          />
          <div>
            <h1 className="text-xl font-bold text-primary">Mcan</h1>
            <p className="text-sm text-muted-foreground">Health Assistant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onScreenChange(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeScreen === id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Mcan Health Assistant
          </p>
        </div>
      </div>
    </div>
  );
}