import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, MessageCircle, Shield, Users, Sparkles, Zap, Brain, Radio } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import aiCompanion from "@/assets/ai-companion.png";

interface WelcomeProps {
  onNavigate: (page: string) => void;
}

export const Welcome = ({ onNavigate }: WelcomeProps) => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Welcome to Mcan AI Health System",
      subtitle: "Your Personal Health & Wellness Companion",
      description: "Take control of your mental and physical health with AI-powered insights, habit tracking, and personalized wellness guidance.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      features: {
        title: "Why Choose Mcan AI Health?",
        items: [
          {
            icon: Heart,
            title: "Mental Wellness",
            description: "AI-powered mental health support and personalized tips for emotional well-being."
          },
          {
            icon: Activity,
            title: "Habit Tracking",
            description: "Track your daily habits and build healthy routines with smart reminders."
          },
          {
            icon: MessageCircle,
            title: "AI Chat Assistant",
            description: "Get instant health advice and support from our intelligent AI companion."
          },
          {
            icon: Shield,
            title: "Privacy First",
            description: "Your health data is encrypted and secure. We prioritize your privacy above all."
          },
          {
            icon: Users,
            title: "Community Support",
            description: "Connect with others on similar wellness journeys for motivation and support."
          },
          {
            icon: Sparkles,
            title: "Personalized Experience",
            description: "AI learns your preferences to provide tailored health recommendations."
          }
        ]
      },
      cta: {
        title: "Ready to Transform Your Health?",
        description: "Join thousands of users who have improved their wellness with Mcan AI Health System.",
        button: "Start Your Journey"
      }
    },
    fr: {
      title: "Bienvenue sur Mcan AI Health System",
      subtitle: "Votre Compagnon Personnel de Santé et Bien-être",
      description: "Prenez le contrôle de votre santé mentale et physique avec des insights alimentés par l'IA, le suivi d'habitudes et des conseils de bien-être personnalisés.",
      getStarted: "Commencer",
      learnMore: "En Savoir Plus",
      features: {
        title: "Pourquoi Choisir Mcan AI Health?",
        items: [
          {
            icon: Heart,
            title: "Bien-être Mental",
            description: "Support de santé mentale alimenté par l'IA et conseils personnalisés pour le bien-être émotionnel."
          },
          {
            icon: Activity,
            title: "Suivi d'Habitudes",
            description: "Suivez vos habitudes quotidiennes et créez des routines saines avec des rappels intelligents."
          },
          {
            icon: MessageCircle,
            title: "Assistant Chat IA",
            description: "Obtenez des conseils de santé instantanés et du support de notre compagnon IA intelligent."
          },
          {
            icon: Shield,
            title: "Confidentialité d'Abord",
            description: "Vos données de santé sont cryptées et sécurisées. Nous priorisons votre confidentialité avant tout."
          },
          {
            icon: Users,
            title: "Support Communautaire",
            description: "Connectez-vous avec d'autres sur des parcours de bien-être similaires pour motivation et support."
          },
          {
            icon: Sparkles,
            title: "Expérience Personnalisée",
            description: "L'IA apprend vos préférences pour fournir des recommandations de santé sur mesure."
          }
        ]
      },
      cta: {
        title: "Prêt à Transformer Votre Santé?",
        description: "Rejoignez des milliers d'utilisateurs qui ont amélioré leur bien-être avec Mcan AI Health System.",
        button: "Commencez Votre Parcours"
      }
    },
    ar: {
      title: "مرحباً بك في نظام مكان للصحة الذكي",
      subtitle: "رفيقك الشخصي للصحة والعافية",
      description: "تحكم في صحتك النفسية والجسدية مع رؤى مدعومة بالذكاء الاصطناعي وتتبع العادات وإرشادات العافية المخصصة.",
      getStarted: "ابدأ الآن",
      learnMore: "اعرف المزيد",
      features: {
        title: "لماذا تختار مكان للصحة الذكي؟",
        items: [
          {
            icon: Heart,
            title: "العافية النفسية",
            description: "دعم الصحة النفسية المدعوم بالذكاء الاصطناعي ونصائح مخصصة للرفاهية العاطفية."
          },
          {
            icon: Activity,
            title: "تتبع العادات",
            description: "تتبع عاداتك اليومية وبناء روتين صحي مع تذكيرات ذكية."
          },
          {
            icon: MessageCircle,
            title: "مساعد المحادثة الذكي",
            description: "احصل على نصائح صحية فورية ودعم من رفيقنا الذكي المدعوم بالذكاء الاصطناعي."
          },
          {
            icon: Shield,
            title: "الخصوصية أولاً",
            description: "بياناتك الصحية مشفرة وآمنة. نحن نعطي الأولوية لخصوصيتك قبل كل شيء."
          },
          {
            icon: Users,
            title: "دعم المجتمع",
            description: "تواصل مع الآخرين في رحلات عافية مماثلة للحصول على الدافع والدعم."
          },
          {
            icon: Sparkles,
            title: "تجربة مخصصة",
            description: "الذكاء الاصطناعي يتعلم تفضيلاتك لتقديم توصيات صحية مخصصة."
          }
        ]
      },
      cta: {
        title: "هل أنت مستعد لتحويل صحتك؟",
        description: "انضم إلى آلاف المستخدمين الذين حسنوا عافيتهم مع نظام مكان للصحة الذكي.",
        button: "ابدأ رحلتك"
      }
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 moroccan-pattern">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Moroccan decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-moroccan-gold/30 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-16 h-16 border-2 border-moroccan-terracotta/30 rotate-12 animate-bounce" style={{animationDelay: '1s'}}></div>
        
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="mx-auto max-w-4xl">
            {/* Floating Dynamic Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 animate-pulse">
                <Heart className="w-8 h-8 text-primary/30" />
              </div>
              <div className="absolute top-32 right-16 animate-bounce">
                <Zap className="w-6 h-6 text-accent/40" />
              </div>
              <div className="absolute bottom-40 left-20 animate-pulse" style={{animationDelay: '1s'}}>
                <Brain className="w-7 h-7 text-primary/25" />
              </div>
              <div className="absolute bottom-60 right-12 animate-bounce" style={{animationDelay: '0.5s'}}>
                <Radio className="w-5 h-5 text-accent/35" />
              </div>
            </div>
            
            <div className="mb-8 flex justify-center">
              <img 
                src="/mcan-logo.png" 
                alt="Mcan AI Health System Logo" 
                className="w-24 h-24 md:w-32 md:h-32 drop-shadow-lg object-contain hover-scale"
              />
            </div>
            <h1 className={`mb-6 text-4xl font-bold tracking-tight md:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-fade-in ${language === 'ar' ? 'arabic-text font-amiri' : ''}`}>
              {t.title}
            </h1>
            <p className={`mb-4 text-xl text-muted-foreground md:text-2xl font-medium animate-fade-in ${language === 'ar' ? 'arabic-text font-amiri' : ''}`} style={{animationDelay: '0.1s'}}>
              {t.subtitle}
            </p>
            <p className={`mb-8 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in ${language === 'ar' ? 'arabic-text font-amiri' : ''}`} style={{animationDelay: '0.2s'}}>
              {t.description}
            </p>
            
            {/* AI Companion Image */}
            <div className="mb-8 flex justify-center">
              <img 
                src={aiCompanion}
                alt="AI Health Companion" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain animate-scale-in hover-scale"
                style={{animationDelay: '0.4s'}}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Button size="lg" onClick={() => onNavigate('auth')} className="text-lg px-8 py-6 hover-scale bg-gradient-to-r from-moroccan-orange to-moroccan-red hover:from-moroccan-red hover:to-moroccan-orange">
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                {t.getStarted}
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 hover-scale moroccan-border">
                {t.learnMore}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold mb-4 ${language === 'ar' ? 'arabic-text font-amiri' : ''}`}>{t.features.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.features.items.map((feature, index) => (
            <Card key={index} className="border-border/50 hover:border-moroccan-gold/50 transition-colors hover-scale animate-fade-in bg-gradient-to-br from-card to-card/90" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-moroccan-gold/20 to-moroccan-orange/20 flex items-center justify-center mb-4 hover-scale">
                  <feature.icon className="w-6 h-6 text-moroccan-orange animate-pulse" style={{animationDelay: `${index * 0.2}s`}} />
                </div>
                <CardTitle className={`text-xl ${language === 'ar' ? 'arabic-text font-amiri' : ''}`}>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={`text-base leading-relaxed ${language === 'ar' ? 'arabic-text font-amiri' : ''}`}>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <Card className="max-w-4xl mx-auto text-center bg-gradient-to-r from-moroccan-gold/10 via-moroccan-orange/5 to-moroccan-terracotta/10 border-moroccan-gold/30 moroccan-pattern">
          <CardHeader className="pb-8">
            <CardTitle className={`text-3xl mb-4 ${language === 'ar' ? 'arabic-text font-amiri' : ''}`}>{t.cta.title}</CardTitle>
            <CardDescription className={`text-lg max-w-2xl mx-auto ${language === 'ar' ? 'arabic-text font-amiri' : ''}`}>
              {t.cta.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={() => onNavigate('auth')} className="text-lg px-8 py-6 bg-gradient-to-r from-moroccan-orange to-moroccan-red hover:from-moroccan-red hover:to-moroccan-orange hover-scale">
              {t.cta.button}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};