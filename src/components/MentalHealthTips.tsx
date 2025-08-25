import { useState } from "react";
import { Heart, AlertTriangle, Lightbulb, BookOpen, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Tip {
  id: string;
  category: "stress" | "anxiety" | "sadness" | "fatigue";
  title: string;
  description: string;
  action: string;
  moroccanWisdom?: string;
}

export function MentalHealthTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>("stress");

  const categories = [
    { id: "stress", label: "Stress", icon: AlertTriangle, color: "text-moroccan-red" },
    { id: "anxiety", label: "Anxiety", icon: Heart, color: "text-wellness-blue" },
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
    <div className="pb-20 bg-gradient-to-b from-background to-accent/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Wellness Tips</h1>
            <p className="text-primary-foreground/80 text-sm">
              Moroccan-inspired mental health guidance
            </p>
          </div>
          <img src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" alt="Mcan Logo" className="h-10 w-auto" />
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Category Selection */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3 text-center">What would you like help with?</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="h-16 flex flex-col gap-1"
                >
                  <Icon size={20} className={selectedCategory === category.id ? "" : category.color} />
                  <span className="text-xs">{category.label}</span>
                </Button>
              );
            })}
          </div>
        </Card>

        {/* Burnout Alert */}
        {selectedCategory === "stress" && (
          <Card className="p-4 mb-6 border-moroccan-red/30 bg-moroccan-red/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-moroccan-red mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-moroccan-red mb-1">Burnout Alert</h3>
                <p className="text-sm text-foreground/80">
                  If you're experiencing chronic stress, consider taking a break and speaking with a healthcare professional.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Tips Display */}
        <div className="space-y-4">
          {filteredTips.map((tip, index) => (
            <Card key={tip.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-full bg-${currentCategory?.color.split('-')[1]}/10 mt-1`}>
                  <BookOpen size={16} className={currentCategory?.color} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {tip.description}
                  </p>
                  
                  <div className="bg-accent/30 rounded-lg p-3 mb-3">
                    <h5 className="font-medium text-sm mb-1 text-primary">Action Step:</h5>
                    <p className="text-sm">{tip.action}</p>
                  </div>

                  {tip.moroccanWisdom && (
                    <div className="border-l-2 border-moroccan-gold pl-3">
                      <p className="text-sm italic text-moroccan-gold">{tip.moroccanWisdom}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Emergency Support */}
        <Card className="p-4 mt-6 border-wellness-blue/30 bg-wellness-blue/5">
          <div className="text-center">
            <Heart className="text-wellness-blue mx-auto mb-2" size={24} />
            <h3 className="font-semibold text-wellness-blue mb-1">Need immediate support?</h3>
            <p className="text-sm text-foreground/80 mb-3">
              Remember, it's okay to seek help. You're not alone in this journey.
            </p>
            <Button variant="outline" size="sm" className="text-wellness-blue border-wellness-blue/30">
              Find Professional Help
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}