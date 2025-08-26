import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthProps {
  onNavigate: (page: string) => void;
}

export const Auth = ({ onNavigate }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();

  const content = {
    en: {
      backToHome: "Back to Home",
      loginTitle: "Welcome Back",
      loginDesc: "Sign in to your health dashboard",
      signupTitle: "Create Account",
      signupDesc: "Start your wellness journey today",
      email: "Email",
      password: "Password",
      fullName: "Full Name",
      signIn: "Sign In",
      signUp: "Sign Up",
      signInButton: "Signing In...",
      signUpButton: "Creating Account...",
      switchToSignup: "Don't have an account? Sign up",
      switchToLogin: "Already have an account? Sign in",
      emailPlaceholder: "your@email.com",
      passwordPlaceholder: "Enter your password",
      fullNamePlaceholder: "Your full name",
      signupSuccess: "Account created successfully! Please check your email to verify your account.",
      signupError: "Failed to create account. Please try again.",
      signinError: "Failed to sign in. Please check your credentials.",
      emailRequired: "Email is required",
      passwordRequired: "Password is required",
      nameRequired: "Full name is required"
    },
    fr: {
      backToHome: "Retour à l'Accueil",
      loginTitle: "Bon Retour",
      loginDesc: "Connectez-vous à votre tableau de bord santé",
      signupTitle: "Créer un Compte",
      signupDesc: "Commencez votre parcours bien-être aujourd'hui",
      email: "Email",
      password: "Mot de Passe",
      fullName: "Nom Complet",
      signIn: "Se Connecter",
      signUp: "S'Inscrire",
      signInButton: "Connexion...",
      signUpButton: "Création du Compte...",
      switchToSignup: "Pas de compte? S'inscrire",
      switchToLogin: "Déjà un compte? Se connecter",
      emailPlaceholder: "votre@email.com",
      passwordPlaceholder: "Entrez votre mot de passe",
      fullNamePlaceholder: "Votre nom complet",
      signupSuccess: "Compte créé avec succès! Veuillez vérifier votre email pour valider votre compte.",
      signupError: "Échec de création du compte. Veuillez réessayer.",
      signinError: "Échec de connexion. Veuillez vérifier vos identifiants.",
      emailRequired: "L'email est requis",
      passwordRequired: "Le mot de passe est requis",
      nameRequired: "Le nom complet est requis"
    },
    ar: {
      backToHome: "العودة للرئيسية",
      loginTitle: "مرحباً بعودتك",
      loginDesc: "سجل دخولك إلى لوحة الصحة الخاصة بك",
      signupTitle: "إنشاء حساب",
      signupDesc: "ابدأ رحلة العافية اليوم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      fullName: "الاسم الكامل",
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      signInButton: "جاري تسجيل الدخول...",
      signUpButton: "جاري إنشاء الحساب...",
      switchToSignup: "لا تملك حساب؟ أنشئ حساباً",
      switchToLogin: "لديك حساب بالفعل؟ سجل دخولك",
      emailPlaceholder: "بريدك@الإلكتروني.com",
      passwordPlaceholder: "أدخل كلمة المرور",
      fullNamePlaceholder: "اسمك الكامل",
      signupSuccess: "تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني للتأكيد.",
      signupError: "فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.",
      signinError: "فشل في تسجيل الدخول. يرجى التحقق من بياناتك.",
      emailRequired: "البريد الإلكتروني مطلوب",
      passwordRequired: "كلمة المرور مطلوبة",
      nameRequired: "الاسم الكامل مطلوب"
    }
  };

  const t = content[language as keyof typeof content];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: t.emailRequired,
        variant: "destructive",
      });
      return;
    }
    
    if (!password) {
      toast({
        title: "Error", 
        description: t.passwordRequired,
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && !fullName) {
      toast({
        title: "Error",
        description: t.nameRequired,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Error",
            description: t.signinError,
            variant: "destructive",
          });
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Error",
              description: "This email is already registered. Please sign in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: t.signupError,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Success",
            description: t.signupSuccess,
          });
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: isLogin ? t.signinError : t.signupError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => onNavigate('welcome')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToHome}
        </Button>
        
        <Card className="border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? t.loginTitle : t.signupTitle}
            </CardTitle>
            <CardDescription>
              {isLogin ? t.loginDesc : t.signupDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t.fullName}</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={t.fullNamePlaceholder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? t.signInButton : t.signUpButton}
                  </>
                ) : (
                  isLogin ? t.signIn : t.signUp
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {isLogin ? t.switchToSignup : t.switchToLogin}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};