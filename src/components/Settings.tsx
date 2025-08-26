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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your Mcan experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Summary */}
          <Card className="p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-1">Welcome, User!</h3>
              <p className="text-muted-foreground mb-2">
                Member since {new Date().getFullYear()}
              </p>
              <p className="text-sm text-moroccan-gold">
                🏆 Wellness Warrior Level
              </p>
            </div>
          </Card>

          {/* App Info */}
          <Card className="p-6 text-center">
            <img src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" alt="Mcan Logo" className="h-16 w-auto mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-1">Mcan</h3>
            <p className="text-muted-foreground mb-2">
              AI-Powered Health Assistant
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Version 1.0.0 • Built with ❤️ in Morocco
            </p>
            <div className="pt-4 border-t">
              <p className="text-sm text-moroccan-gold italic mb-1">
                "الصحة تاج على رؤوس الأصحاء لا يراه إلا المرضى"
              </p>
              <p className="text-xs text-muted-foreground">
                Health is a crown on healthy heads, seen only by the sick
              </p>
            </div>
          </Card>
        </div>

        {/* Right Columns - Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-primary" size={24} />
              <h3 className="text-xl font-semibold">Language / اللغة</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => updateLanguage(lang.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
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
                      <Check size={20} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-primary" size={24} />
              <h3 className="text-xl font-semibold">Notifications</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">Habit Reminders</p>
                  <p className="text-muted-foreground">Daily wellness check-ins</p>
                </div>
                <Switch
                  checked={notifications.reminders}
                  onCheckedChange={() => toggleNotification("reminders")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">Wellness Tips</p>
                  <p className="text-muted-foreground">Moroccan wisdom & health advice</p>
                </div>
                <Switch
                  checked={notifications.tips}
                  onCheckedChange={() => toggleNotification("tips")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">Achievement Alerts</p>
                  <p className="text-muted-foreground">Celebrate your milestones</p>
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
            <Card key={groupIndex} className="p-6">
              <h3 className="text-xl font-semibold mb-4">{group.title}</h3>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className={`w-full p-4 rounded-lg flex items-center justify-between hover:bg-accent/50 transition-colors ${
                        item.danger ? "text-moroccan-red" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        <span className="text-lg">{item.label}</span>
                      </div>
                      <ChevronRight size={18} className="text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
