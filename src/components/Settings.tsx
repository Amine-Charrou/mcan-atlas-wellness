import { useState } from "react";
import { 
  Globe, 
  Bell, 
  Shield, 
  User, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Check 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  const { toast } = useToast();
  
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [notifications, setNotifications] = useState({
    reminders: true,
    tips: true,
    achievements: false,
  });

  const languages = [
    { id: "darija", label: "الدارجة المغربية", nativeLabel: "Darija" },
    { id: "ar", label: "العربية", nativeLabel: "Arabic" },
    { id: "fr", label: "Français", nativeLabel: "French" },
    { id: "en", label: "English", nativeLabel: "English" },
  ];

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { id: "profile", label: "Edit Profile", icon: User, action: () => {} },
        { id: "privacy", label: "Privacy Settings", icon: Shield, action: () => {} },
      ],
    },
    {
      title: "Support",
      items: [
        { id: "help", label: "Help & FAQ", icon: HelpCircle, action: () => {} },
        { id: "logout", label: "Sign Out", icon: LogOut, action: () => {}, danger: true },
      ],
    },
  ];

  const updateLanguage = (langId: string) => {
    setSelectedLanguage(langId);
    const lang = languages.find(l => l.id === langId);
    toast({
      title: "Language Updated",
      description: `Language changed to ${lang?.nativeLabel}`,
    });
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="pb-20 bg-gradient-to-b from-background to-accent/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Settings</h1>
            <p className="text-primary-foreground/80 text-sm">
              Customize your Mcan experience
            </p>
          </div>
          <img src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" alt="Mcan Logo" className="h-10 w-auto" />
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-6">
        {/* Profile Summary */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Welcome, User!</h3>
              <p className="text-sm text-muted-foreground">
                Member since {new Date().getFullYear()}
              </p>
              <p className="text-xs text-moroccan-gold mt-1">
                🏆 Wellness Warrior Level
              </p>
            </div>
          </div>
        </Card>

        {/* Language Settings */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-primary" size={20} />
            <h3 className="font-semibold">Language / اللغة</h3>
          </div>
          
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => updateLanguage(lang.id)}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  selectedLanguage === lang.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{lang.label}</span>
                    <p className="text-sm text-muted-foreground">{lang.nativeLabel}</p>
                  </div>
                  {selectedLanguage === lang.id && (
                    <Check size={18} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-primary" size={20} />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Habit Reminders</p>
                <p className="text-sm text-muted-foreground">Daily wellness check-ins</p>
              </div>
              <Switch
                checked={notifications.reminders}
                onCheckedChange={() => toggleNotification("reminders")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Wellness Tips</p>
                <p className="text-sm text-muted-foreground">Moroccan wisdom & health advice</p>
              </div>
              <Switch
                checked={notifications.tips}
                onCheckedChange={() => toggleNotification("tips")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Achievement Alerts</p>
                <p className="text-sm text-muted-foreground">Celebrate your milestones</p>
              </div>
              <Switch
                checked={notifications.achievements}
                onCheckedChange={() => toggleNotification("achievements")}
              />
            </div>
          </div>
        </Card>

        {/* Other Settings */}
        {settingsGroups.map((group, groupIndex) => (
          <Card key={groupIndex} className="p-4">
            <h3 className="font-semibold mb-3">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`w-full p-3 rounded-lg flex items-center justify-between hover:bg-accent/50 transition-colors ${
                      item.danger ? "text-moroccan-red" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </Card>
        ))}

        {/* App Info */}
        <Card className="p-4 text-center">
          <img src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" alt="Mcan Logo" className="h-12 w-auto mx-auto mb-3" />
          <h3 className="font-semibold text-primary mb-1">Mcan</h3>
          <p className="text-sm text-muted-foreground mb-2">
            AI-Powered Health Assistant
          </p>
          <p className="text-xs text-muted-foreground">
            Version 1.0.0 • Built with ❤️ in Morocco
          </p>
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-moroccan-gold italic">
              "الصحة تاج على رؤوس الأصحاء لا يراه إلا المرضى"
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Health is a crown on healthy heads, seen only by the sick
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
