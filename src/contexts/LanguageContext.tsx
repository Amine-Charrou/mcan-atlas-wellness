import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar';

interface Translation {
  // Dashboard
  welcomeBack: string;
  dailyInspiration: string;
  quickActions: string;
  chatWithMcan: string;
  logYourHabits: string;
  todaysProgress: string;
  
  // Navigation
  dashboard: string;
  chat: string;
  habits: string;
  mentalHealth: string;
  settings: string;
  
  // Habits
  waterIntake: string;
  sleep: string;
  physicalActivity: string;
  mood: string;
  glasses: string;
  hours: string;
  minutes: string;
  habitTracker: string;
  logDaily: string;
  howMoodToday: string;
  target: string;
  progress: string;
  saveTodaysProgress: string;
  
  // Chat
  aiChatAssistant: string;
  personalizedWellness: string;
  howFeeling: string;
  typeMessage: string;
  helpful: string;
  notHelpful: string;
  happy: string;
  okay: string;
  notGreat: string;
  
  // Mental Health
  mentalHealthTips: string;
  wellnessTips: string;
  stressRelief: string;
  anxietyManagement: string;
  burnoutPrevention: string;
  emotionalWellness: string;
  
  // Settings
  settingsTitle: string;
  customizeExperience: string;
  welcomeUser: string;
  memberSince: string;
  wellnessWarrior: string;
  mcanAI: string;
  aiPoweredAssistant: string;
  version: string;
  builtWithLove: string;
  languageLabel: string;
  notifications: string;
  habitReminders: string;
  dailyWellnessCheckins: string;
  moroccanWisdomHealth: string;
  achievementAlerts: string;
  celebrateMilestones: string;
  account: string;
  editProfile: string;
  privacySettings: string;
  support: string;
  helpFAQ: string;
  signOut: string;
  languageUpdated: string;
  languageChangedTo: string;
  
  // Mood descriptions
  verySad: string;
  sad: string;
  okayMood: string;
  good: string;
  excellent: string;
  
  // Progress saved
  progressSaved: string;
  progressSavedDesc: string;
  
  // Weekly view
  weeklyProgress: string;
  habitTrendsWeek: string;
  waterIntakeGlasses: string;
  sleepHours: string;
  physicalActivityMinutes: string;
  weeklyMoodDistribution: string;
  weeklySummary: string;
  avgGlassesDay: string;
  avgHoursDay: string;
  avgMinutesDay: string;
  ofTarget: string;
  day: string;
  days: string;
  noWeeklyData: string;
  startTrackingHabits: string;
  targetGlassesDay: string;
  targetHoursDay: string;
  targetMinutesDay: string;
  loadingWeeklyData: string;
  daily: string;
  weekly: string;
}

const translations: Record<Language, Translation> = {
  en: {
    // Dashboard
    welcomeBack: "Welcome back!",
    dailyInspiration: "Daily Inspiration",
    quickActions: "Quick Actions",
    chatWithMcan: "Chat with Mcan AI",
    logYourHabits: "Log Your Habits",
    todaysProgress: "Today's Progress",
    
    // Navigation
    dashboard: "Dashboard",
    chat: "Chat",
    habits: "Habits",
    mentalHealth: "Mental Health",
    settings: "Settings",
    
    // Habits
    waterIntake: "Water Intake",
    sleep: "Sleep",
    physicalActivity: "Physical Activity",
    mood: "Mood",
    glasses: "glasses",
    hours: "hours",
    minutes: "minutes",
    habitTracker: "Habit Tracker",
    logDaily: "Log your daily wellness activities and track progress",
    howMoodToday: "How's your mood today?",
    target: "Target",
    progress: "Progress",
    saveTodaysProgress: "Save Today's Progress",
    
    // Chat
    aiChatAssistant: "AI Chat Assistant",
    personalizedWellness: "Get personalized wellness guidance with Moroccan cultural insights",
    howFeeling: "How are you feeling?",
    typeMessage: "Type your message...",
    helpful: "Helpful",
    notHelpful: "Not helpful",
    happy: "Happy",
    okay: "Okay",
    notGreat: "Not great",
    
    // Mental Health
    mentalHealthTips: "Mental Health Tips",
    wellnessTips: "Wellness Tips",
    stressRelief: "Stress Relief",
    anxietyManagement: "Anxiety Management",
    burnoutPrevention: "Burnout Prevention",
    emotionalWellness: "Emotional Wellness",
    
    // Settings
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
    languageChangedTo: "Language changed to",
    
    // Mood descriptions
    verySad: "Very sad",
    sad: "Sad",
    okayMood: "Okay",
    good: "Good",
    excellent: "Excellent",
    
    // Progress saved
    progressSaved: "Progress Saved! 🎉",
    progressSavedDesc: "Your daily habits have been updated successfully.",
    
    // Weekly view
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
    daily: "Daily",
    weekly: "Weekly",
  },
  fr: {
    // Dashboard
    welcomeBack: "Bon retour !",
    dailyInspiration: "Inspiration du jour",
    quickActions: "Actions rapides",
    chatWithMcan: "Discuter avec Mcan AI",
    logYourHabits: "Enregistrer vos habitudes",
    todaysProgress: "Progrès d'aujourd'hui",
    
    // Navigation
    dashboard: "Tableau de bord",
    chat: "Chat",
    habits: "Habitudes",
    mentalHealth: "Santé mentale",
    settings: "Paramètres",
    
    // Habits
    waterIntake: "Consommation d'eau",
    sleep: "Sommeil",
    physicalActivity: "Activité physique",
    mood: "Humeur",
    glasses: "verres",
    hours: "heures",
    minutes: "minutes",
    habitTracker: "Suivi des habitudes",
    logDaily: "Enregistrez vos activités de bien-être quotidiennes et suivez vos progrès",
    howMoodToday: "Comment vous sentez-vous aujourd'hui ?",
    target: "Objectif",
    progress: "Progrès",
    saveTodaysProgress: "Sauvegarder les progrès d'aujourd'hui",
    
    // Chat
    aiChatAssistant: "Assistant Chat IA",
    personalizedWellness: "Obtenez des conseils de bien-être personnalisés avec des perspectives culturelles marocaines",
    howFeeling: "Comment vous sentez-vous ?",
    typeMessage: "Tapez votre message...",
    helpful: "Utile",
    notHelpful: "Pas utile",
    happy: "Heureux",
    okay: "Correct",
    notGreat: "Pas terrible",
    
    // Mental Health
    mentalHealthTips: "Conseils de santé mentale",
    wellnessTips: "Conseils de bien-être",
    stressRelief: "Soulagement du stress",
    anxietyManagement: "Gestion de l'anxiété",
    burnoutPrevention: "Prévention de l'épuisement",
    emotionalWellness: "Bien-être émotionnel",
    
    // Settings
    settingsTitle: "Paramètres",
    customizeExperience: "Personnalisez votre expérience Mcan",
    welcomeUser: "Bienvenue, Utilisateur !",
    memberSince: "Membre depuis",
    wellnessWarrior: "🏆 Niveau Guerrier du Bien-être",
    mcanAI: "Mcan",
    aiPoweredAssistant: "Assistant Santé alimenté par IA",
    version: "Version 1.0.0 • Conçu avec ❤️ au Maroc",
    builtWithLove: "La santé est une couronne sur la tête des bien-portants, que seuls les malades voient",
    languageLabel: "Langue",
    notifications: "Notifications",
    habitReminders: "Rappels d'habitudes",
    dailyWellnessCheckins: "Vérifications quotidiennes de bien-être",
    moroccanWisdomHealth: "Sagesse marocaine et conseils santé",
    achievementAlerts: "Alertes de réussite",
    celebrateMilestones: "Célébrez vos étapes importantes",
    account: "Compte",
    editProfile: "Modifier le profil",
    privacySettings: "Paramètres de confidentialité",
    support: "Support",
    helpFAQ: "Aide et FAQ",
    signOut: "Se déconnecter",
    languageUpdated: "Langue mise à jour",
    languageChangedTo: "Langue changée vers",
    
    // Mood descriptions
    verySad: "Très triste",
    sad: "Triste",
    okayMood: "Correct",
    good: "Bien",
    excellent: "Excellent",
    
    // Progress saved
    progressSaved: "Progrès sauvegardé ! 🎉",
    progressSavedDesc: "Vos habitudes quotidiennes ont été mises à jour avec succès.",
    
    // Weekly view
    weeklyProgress: "Progrès hebdomadaire",
    habitTrendsWeek: "Vos tendances d'habitudes au cours des 7 derniers jours",
    waterIntakeGlasses: "Consommation d'eau (Verres)",
    sleepHours: "Heures de sommeil",
    physicalActivityMinutes: "Activité physique (Minutes)",
    weeklyMoodDistribution: "Distribution hebdomadaire de l'humeur",
    weeklySummary: "Résumé hebdomadaire",
    avgGlassesDay: "Moy. Verres/Jour",
    avgHoursDay: "Moy. Heures/Jour",
    avgMinutesDay: "Moy. Minutes/Jour",
    ofTarget: "% de l'objectif",
    day: "jour",
    days: "jours",
    noWeeklyData: "Aucune donnée hebdomadaire",
    startTrackingHabits: "Commencez à suivre vos habitudes quotidiennes pour voir les graphiques de progrès hebdomadaires.",
    targetGlassesDay: "Objectif : 8 verres par jour",
    targetHoursDay: "Objectif : 8 heures par jour",
    targetMinutesDay: "Objectif : 60 minutes par jour",
    loadingWeeklyData: "Chargement des données hebdomadaires...",
    daily: "Quotidien",
    weekly: "Hebdomadaire",
  },
  ar: {
    // Dashboard
    welcomeBack: "مرحباً بعودتك!",
    dailyInspiration: "إلهام يومي",
    quickActions: "إجراءات سريعة",
    chatWithMcan: "تحدث مع Mcan AI",
    logYourHabits: "سجل عاداتك",
    todaysProgress: "تقدم اليوم",
    
    // Navigation
    dashboard: "لوحة القيادة",
    chat: "الدردشة",
    habits: "العادات",
    mentalHealth: "الصحة النفسية",
    settings: "الإعدادات",
    
    // Habits
    waterIntake: "شرب الماء",
    sleep: "النوم",
    physicalActivity: "النشاط البدني",
    mood: "المزاج",
    glasses: "أكواب",
    hours: "ساعات",
    minutes: "دقائق",
    habitTracker: "متتبع العادات",
    logDaily: "سجل أنشطة العافية اليومية وتتبع التقدم",
    howMoodToday: "كيف مزاجك اليوم؟",
    target: "الهدف",
    progress: "التقدم",
    saveTodaysProgress: "احفظ تقدم اليوم",
    
    // Chat
    aiChatAssistant: "مساعد الدردشة بتقنية الذكاء الاصطناعي",
    personalizedWellness: "احصل على إرشادات شخصية للعافية مع رؤى ثقافية مغربية",
    howFeeling: "كيف تشعر؟",
    typeMessage: "اكتب رسالتك...",
    helpful: "مفيد",
    notHelpful: "غير مفيد",
    happy: "سعيد",
    okay: "جيد",
    notGreat: "ليس رائعاً",
    
    // Mental Health
    mentalHealthTips: "نصائح الصحة النفسية",
    wellnessTips: "نصائح العافية",
    stressRelief: "تخفيف التوتر",
    anxietyManagement: "إدارة القلق",
    burnoutPrevention: "منع الإرهاق",
    emotionalWellness: "العافية العاطفية",
    
    // Settings
    settingsTitle: "الإعدادات",
    customizeExperience: "خصص تجربة Mcan الخاصة بك",
    welcomeUser: "مرحباً، المستخدم!",
    memberSince: "عضو منذ",
    wellnessWarrior: "🏆 مستوى محارب العافية",
    mcanAI: "Mcan",
    aiPoweredAssistant: "مساعد صحي بتقنية الذكاء الاصطناعي",
    version: "الإصدار 1.0.0 • صُنع بـ ❤️ في المغرب",
    builtWithLove: "الصحة تاج على رؤوس الأصحاء لا يراه إلا المرضى",
    languageLabel: "اللغة",
    notifications: "الإشعارات",
    habitReminders: "تذكيرات العادات",
    dailyWellnessCheckins: "فحوصات العافية اليومية",
    moroccanWisdomHealth: "الحكمة المغربية ونصائح الصحة",
    achievementAlerts: "تنبيهات الإنجازات",
    celebrateMilestones: "احتفل بإنجازاتك",
    account: "الحساب",
    editProfile: "تعديل الملف الشخصي",
    privacySettings: "إعدادات الخصوصية",
    support: "الدعم",
    helpFAQ: "المساعدة والأسئلة الشائعة",
    signOut: "تسجيل الخروج",
    languageUpdated: "تم تحديث اللغة",
    languageChangedTo: "تم تغيير اللغة إلى",
    
    // Mood descriptions
    verySad: "حزين جداً",
    sad: "حزين",
    okayMood: "جيد",
    good: "جيد جداً",
    excellent: "ممتاز",
    
    // Progress saved
    progressSaved: "تم حفظ التقدم! 🎉",
    progressSavedDesc: "تم تحديث عاداتك اليومية بنجاح.",
    
    // Weekly view
    weeklyProgress: "التقدم الأسبوعي",
    habitTrendsWeek: "اتجاهات عاداتك خلال الـ 7 أيام الماضية",
    waterIntakeGlasses: "شرب الماء (أكواب)",
    sleepHours: "ساعات النوم",
    physicalActivityMinutes: "النشاط البدني (دقائق)",
    weeklyMoodDistribution: "توزيع المزاج الأسبوعي",
    weeklySummary: "الملخص الأسبوعي",
    avgGlassesDay: "متوسط أكواب/يوم",
    avgHoursDay: "متوسط ساعات/يوم",
    avgMinutesDay: "متوسط دقائق/يوم",
    ofTarget: "% من الهدف",
    day: "يوم",
    days: "أيام",
    noWeeklyData: "لا توجد بيانات أسبوعية",
    startTrackingHabits: "ابدأ في تتبع عاداتك اليومية لرؤية مخططات التقدم الأسبوعي.",
    targetGlassesDay: "الهدف: 8 أكواب يومياً",
    targetHoursDay: "الهدف: 8 ساعات يومياً",
    targetMinutesDay: "الهدف: 60 دقيقة يومياً",
    loadingWeeklyData: "جار تحميل البيانات الأسبوعية...",
    daily: "يومي",
    weekly: "أسبوعي",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('mcan-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('mcan-language', language);
    // Set document direction for RTL languages
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}