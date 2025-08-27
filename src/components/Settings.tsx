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
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export function Settings() {
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  
  // Add fallback for when context is not available
  let language = 'en';
  let setLanguage = (lang: string) => {
    console.warn('setLanguage called but LanguageProvider not available');
  };
  let t;
  try {
    const context = useLanguage();
    language = context.language;
    setLanguage = context.setLanguage;
    t = context.t;
  } catch (error) {
    console.warn('LanguageProvider not available in Settings, using fallback translations');
    // Fallback translations
    t = {
      settingsTitle: "Settings",
      customizeExperience: "Customize your Mcan experience",
      welcomeUser: "Welcome, User!",
      memberSince: "Member since",
      wellnessWarrior: "🏆 Wellness Warrior Level",
      mcanAI: "Mcan",
      aiPoweredAssistant: "AI-Powered Health Assistant",
      version: "Version 1.0.0 • Built with ❤️ in Morocco",
      builtWithLove: "Health is a crown on healthy heads, seen only by the sick",
      languageLabel: "Language",
      notifications: "Notifications",
      habitReminders: "Habit Reminders",
      dailyWellnessCheckins: "Daily wellness check-ins",
      moroccanWisdomHealth: "Moroccan wisdom & health advice",
      achievementAlerts: "Achievement Alerts",
      celebrateMilestones: "Celebrate your milestones",
      account: "Account",
      editProfile: "Edit Profile",
      privacySettings: "Privacy Settings",
      support: "Support",
      helpFAQ: "Help & FAQ",
      signOut: "Sign Out",
      languageUpdated: "Language Updated",
      languageChangedTo: "Language changed to"
    };
  }
  const [notifications, setNotifications] = useState({
    reminders: true,
    tips: true,
    achievements: false,
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const languages = [
    { id: "ar", label: "العربية", nativeLabel: "Arabic" },
    { id: "fr", label: "Français", nativeLabel: "French" },
    { id: "en", label: "English", nativeLabel: "English" },
  ];

  const settingsGroups = [
    {
      title: t.account,
      items: [
        { id: "profile", label: t.editProfile, icon: User, action: () => {} },
        { id: "privacy", label: t.privacySettings, icon: Shield, action: () => {} },
      ],
    },
    {
      title: t.support,
      items: [
        { id: "help", label: t.helpFAQ, icon: HelpCircle, action: () => {} },
        { id: "logout", label: t.signOut, icon: LogOut, action: handleSignOut, danger: true },
      ],
    },
  ];

  const updateLanguage = (langId: string) => {
    setLanguage(langId as 'en' | 'fr' | 'ar');
    const lang = languages.find(l => l.id === langId);
    toast({
      title: t.languageUpdated,
      description: `${t.languageChangedTo} ${lang?.nativeLabel}`,
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
        <h1 className="text-3xl font-bold text-primary mb-2">{t.settingsTitle}</h1>
        <p className="text-muted-foreground">{t.customizeExperience}</p>
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
              <h3 className="text-xl font-semibold mb-1">{t.welcomeUser}</h3>
              <p className="text-muted-foreground mb-2">
                {user?.email || 'User'}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                {t.memberSince} {new Date().getFullYear()}
              </p>
              <p className="text-sm text-moroccan-gold">
                {t.wellnessWarrior}
              </p>
            </div>
          </Card>

          {/* App Info */}
          <Card className="p-6 text-center">
            <img src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" alt="Mcan Logo" className="h-16 w-auto mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-1">{t.mcanAI}</h3>
            <p className="text-muted-foreground mb-2">
              {t.aiPoweredAssistant}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {t.version}
            </p>
            <div className="pt-4 border-t">
              <p className="text-sm text-moroccan-gold italic mb-1">
                "الصحة تاج على رؤوس الأصحاء لا يراه إلا المرضى"
              </p>
              <p className="text-xs text-muted-foreground">
                {t.builtWithLove}
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
              <h3 className="text-xl font-semibold">{t.languageLabel} / اللغة</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => updateLanguage(lang.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    language === lang.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{lang.label}</span>
                      <p className="text-sm text-muted-foreground">{lang.nativeLabel}</p>
                    </div>
                    {language === lang.id && (
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
              <h3 className="text-xl font-semibold">{t.notifications}</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">{t.habitReminders}</p>
                  <p className="text-muted-foreground">{t.dailyWellnessCheckins}</p>
                </div>
                <Switch
                  checked={notifications.reminders}
                  onCheckedChange={() => toggleNotification("reminders")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">{t.wellnessTips}</p>
                  <p className="text-muted-foreground">{t.moroccanWisdomHealth}</p>
                </div>
                <Switch
                  checked={notifications.tips}
                  onCheckedChange={() => toggleNotification("tips")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-lg">{t.achievementAlerts}</p>
                  <p className="text-muted-foreground">{t.celebrateMilestones}</p>
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
