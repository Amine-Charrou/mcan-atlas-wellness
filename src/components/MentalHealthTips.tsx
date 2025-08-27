import { useState } from "react";
import { Heart, AlertTriangle, Lightbulb, BookOpen, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Tip {
  id: string;
  category: "stress" | "anxiety" | "sadness" | "fatigue";
  title: string;
  description: string;
  action: string;
  moroccanWisdom?: string;
}

export function MentalHealthTips() {
  // Add fallback for when context is not available
  let t;
  try {
    const context = useLanguage();
    t = context.t;
  } catch (error) {
    console.warn('LanguageProvider not available in MentalHealthTips, using fallback translations');
    // Fallback translations
    t = {
      mentalHealthTips: "Mental Health Tips",
      wellnessTips: "Wellness Tips",
      stressRelief: "Stress Relief",
      anxietyManagement: "Anxiety Management",
      burnoutPrevention: "Burnout Prevention",
      emotionalWellness: "Emotional Wellness"
    };
  }
  const [selectedCategory, setSelectedCategory] = useState<string>("stress");

  const categories = [
    { id: "stress", label: t.stressRelief, icon: AlertTriangle, color: "text-moroccan-red" },
    { id: "anxiety", label: t.anxietyManagement, icon: Heart, color: "text-wellness-blue" },
    { id: "sadness", label: "Sadness", icon: Lightbulb, color: "text-moroccan-orange" },
    { id: "fatigue", label: "Fatigue", icon: RefreshCw, color: "text-wellness-green" },
  ];

  const tips: Tip[] = [
    {
      id: "1",
      category: "stress",
      title: "Moroccan Breathing Technique",
      description: "Practice the 4-7-8 breathing method while imagining the calm Atlas mountains.",
      action: "Inhale for 4, hold for 7, exhale for 8. Repeat 3 times.",
      moroccanWisdom: "\"الهدوء مفتاح الحل\" - Calmness is the key to solutions",
    },
    {
      id: "2",
      category: "stress",
      title: "Mint Tea Meditation",
      description: "Prepare traditional Moroccan mint tea mindfully, focusing on each step.",
      action: "Boil water, add green tea and fresh mint. Focus on the aroma and warmth.",
    },
    {
      id: "3",
      category: "anxiety",
      title: "Grounding in the Souk",
      description: "Use the 5-4-3-2-1 technique imagining you're in a bustling Marrakech market.",
      action: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
    },
    {
      id: "4",
      category: "anxiety",
      title: "Prayer Beads Focus",
      description: "Use tasbih (prayer beads) or any repetitive object for mindful counting.",
      action: "Count slowly from 1-33, focusing only on the numbers and touch.",
    },
    {
      id: "5",
      category: "sadness",
      title: "Community Connection",
      description: "In Moroccan culture, community support is vital for emotional well-being.",
      action: "Reach out to a friend or family member. Share a meal or tea together.",
      moroccanWisdom: "\"الصديق وقت الضيق\" - A friend in need is a friend indeed",
    },
    {
      id: "6",
      category: "sadness",
      title: "Gratitude Reflection",
      description: "Practice gratitude while watching the sunset, a daily Moroccan tradition.",
      action: "List 3 things you're grateful for. Thank Allah for small blessings.",
    },
    {
      id: "7",
      category: "fatigue",
      title: "Dates and Almonds Energy",
      description: "Follow the Prophet's tradition of eating dates with almonds for natural energy.",
      action: "Eat 3 dates with 7 almonds. Drink plenty of water and rest for 10 minutes.",
    },
    {
      id: "8",
      category: "fatigue",
      title: "Gentle Movement",
      description: "Do light stretches inspired by traditional Moroccan dance movements.",
      action: "Gentle arm circles, shoulder rolls, and slow hip movements for 5 minutes.",
    },
  ];

  const filteredTips = tips.filter(tip => tip.category === selectedCategory);
  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">{t.mentalHealthTips}</h1>
        <p className="text-muted-foreground">Moroccan-inspired mental health guidance and support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Category Selection */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">What would you like help with?</h3>
            <div className="space-y-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full h-14 flex items-center justify-start gap-3 text-left"
                  >
                    <Icon size={20} className={selectedCategory === category.id ? "" : category.color} />
                    <span>{category.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Burnout Alert */}
            {selectedCategory === "stress" && (
              <Card className="p-4 mt-6 border-moroccan-red/30 bg-moroccan-red/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-moroccan-red mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-moroccan-red mb-1">Burnout Alert</h4>
                    <p className="text-sm text-foreground/80">
                      If experiencing chronic stress, consider professional help.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </Card>
        </div>

        {/* Right Columns - Tips Display */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTips.map((tip) => (
              <Card key={tip.id} className="p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-full bg-${currentCategory?.color.split('-')[1]}/10`}>
                    <BookOpen size={20} className={currentCategory?.color} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{tip.title}</h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
                
                <div className="bg-accent/30 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold mb-2 text-primary">Action Step:</h5>
                  <p className="text-sm">{tip.action}</p>
                </div>

                {tip.moroccanWisdom && (
                  <div className="border-l-4 border-moroccan-gold pl-4">
                    <p className="text-sm italic text-moroccan-gold">{tip.moroccanWisdom}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Emergency Support */}
          <Card className="p-6 mt-8 border-wellness-blue/30 bg-wellness-blue/5">
            <div className="text-center">
              <Heart className="text-wellness-blue mx-auto mb-3" size={32} />
              <h3 className="text-xl font-semibold text-wellness-blue mb-2">Need immediate support?</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Remember, it's okay to seek help. You're not alone in this journey.
              </p>
              <Button variant="outline" className="text-wellness-blue border-wellness-blue/30 hover:bg-wellness-blue/10">
                Find Professional Help
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}