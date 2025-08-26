import { useState, useEffect } from "react";
import { Send, ThumbsUp, ThumbsDown, Smile, Frown, Meh, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { n8nClient, type ChatMessage } from "@/lib/n8n-client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  feedback?: "helpful" | "not-helpful";
}

export function ChatAssistant() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "السلام عليكم! مرحباً بك في مكان 🌟 I'm Mcan, your AI health companion with Moroccan wisdom. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const [inputText, setInputText] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);

  const moods = [
    { id: "happy", icon: Smile, label: "سعيد Happy", color: "text-wellness-green" },
    { id: "neutral", icon: Meh, label: "عادي Okay", color: "text-accent" },
    { id: "stressed", icon: Frown, label: "متوتر Stressed", color: "text-moroccan-red" },
  ];

  const sendMessage = async () => {
    if (!inputText.trim() && !selectedMood) return;

    const messageText = selectedMood ? `Mood: ${selectedMood}. ${inputText}` : inputText;
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Prepare chat message for n8n
    const chatMessage: ChatMessage = {
      userId: "user_123",
      message: messageText,
      mood: selectedMood,
      context: {
        recentHabits: [],
        moodPatterns: []
      }
    };

    try {
      // Send to n8n backend
      await n8nClient.sendChatMessage(chatMessage);
    } catch (error) {
      console.log("Offline mode - using local AI responses");
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(messageText, selectedMood);
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);

    setInputText("");
    setSelectedMood("");
  };

  const getAIResponse = (userText: string, mood: string) => {
    const responses = {
      happy: [
        "الحمد لله! That's wonderful to hear! 🌟 To maintain this positive energy, try the Moroccan tradition of drinking green tea with mint - أتاي بالنعناع. It's excellent for mental clarity and keeping your spirits high!",
        "ما شاء الله! Keep this beautiful energy flowing! In Morocco, we say 'الصحة تاج على رؤوس الأصحاء' - health is a crown worn by the healthy. Consider adding some dates and almonds to your diet for sustained energy.",
        "Excellent, habibi! 😊 Your positive mood is contagious. Try some light movement - maybe a walk while listening to Andalusian music. Movement with mindfulness is a cornerstone of Moroccan wellness traditions."
      ],
      neutral: [
        "I understand, sometimes we feel في الوسط - in the middle. This is perfectly normal, أخي/أختي. Try taking 5 deep breaths like the calm morning breeze in the Atlas Mountains. Would you like to share what's on your mind?",
        "Being في حالة عادية is okay, habibi. Consider having some chamomile tea - البابونج - it's a traditional Moroccan remedy for finding inner peace. Small steps lead to big changes, as we say 'من جد وجد'.",
        "That's perfectly fine, صديقي. Sometimes we need to honor our current state. Try the Moroccan practice of gratitude - think of 3 things you're thankful for right now. Even small blessings count!"
      ],
      stressed: [
        "أعوذ بالله، I can feel your stress, and I'm here for you. 🤗 In Moroccan tradition, we believe in community support. Try the '3-3-3' technique: name 3 things you see, 3 sounds you hear, 3 parts of your body you can move. Like finding calm in a busy souk.",
        "استرح، take a breath, my friend. Stress is like a sandstorm - it passes. Try some deep breathing with lavender scent, or if you have it, زعتر (thyme) tea. In Morocco, we say 'الصبر مفتاح الفرج' - patience is the key to relief.",
        "I hear you, and your feelings are completely valid. Consider calling someone you trust - في المغرب we say 'الإنسان مدني بالطبع' - humans are social by nature. Also, try gentle neck rolls, like the graceful movements of Moroccan dance."
      ]
    };

    const fallbackResponses = [
      "شكراً for sharing with me. Every conversation helps me understand you better. What would be most helpful for you right now - practical advice, emotional support, or maybe some Moroccan wellness wisdom?",
      "I appreciate your trust in sharing this with me. Remember, في كل محنة منحة - in every hardship there's a blessing. How can I best support you today?",
      "Thank you for being open with me, صديقي. Your wellness journey is unique, and I'm here to walk alongside you with both modern insights and traditional Moroccan wisdom."
    ];

    const moodResponses = responses[mood as keyof typeof responses] || fallbackResponses;
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  };

  const giveFeedback = async (messageId: number, feedback: "helpful" | "not-helpful") => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );

    try {
      await n8nClient.sendChatFeedback(messageId.toString(), feedback, "user_123");
      toast({
        title: feedback === "helpful" ? "شكراً! Thank you!" : "Feedback noted",
        description: feedback === "helpful" ? "Your feedback helps Mcan learn!" : "We'll work on improving our responses"
      });
    } catch (error) {
      console.log("Feedback saved locally");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background pb-20">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground px-6 py-5 flex items-center gap-4 shadow-lg">
        <img src="/lovable-uploads/b08888ad-2807-4919-a00e-2fd1b123b8f9.png" alt="Mcan" className="h-10 w-auto" />
        <div className="flex-1">
          <h1 className="font-header font-bold text-xl">Mcan Assistant</h1>
          <p className="text-sm text-primary-foreground/90 font-body">مساعدك الذكي للصحة • Your wellness companion</p>
        </div>
        <MessageCircle className="text-primary-foreground/80" size={24} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 moroccan-pattern">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[85%]">
              <Card
                className={`p-4 shadow-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground ml-2"
                    : "bg-card border-accent/20 mr-2"
                }`}
              >
                <p className="text-sm leading-relaxed font-body">{message.text}</p>
                <p className="text-xs mt-3 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </Card>
              
              {message.sender === "ai" && (
                <div className="flex gap-2 mt-3 justify-start">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => giveFeedback(message.id, "helpful")}
                    className={`h-8 px-3 text-xs font-body ${
                      message.feedback === "helpful" ? "bg-wellness-green/20 text-wellness-green" : "hover:bg-muted"
                    }`}
                  >
                    <ThumbsUp size={14} />
                    <span className="ml-1">مفيد</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => giveFeedback(message.id, "not-helpful")}
                    className={`h-8 px-3 text-xs font-body ${
                      message.feedback === "not-helpful" ? "bg-moroccan-red/20 text-moroccan-red" : "hover:bg-muted"
                    }`}
                  >
                    <ThumbsDown size={14} />
                    <span className="ml-1">غير مفيد</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="p-4 bg-muted max-w-[85%] mr-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-xs font-body">Mcan is typing...</span>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Enhanced Mood Selection */}
      <div className="px-4 py-4 border-t bg-card/80 backdrop-blur-sm">
        <p className="text-sm font-header font-medium mb-3">كيف حالك؟ How are you feeling?</p>
        <div className="flex gap-2">
          {moods.map(({ id, icon: Icon, label, color }) => (
            <Button
              key={id}
              size="sm"
              variant={selectedMood === id ? "default" : "outline"}
              onClick={() => setSelectedMood(selectedMood === id ? "" : id)}
              className="flex-1 h-12 font-body text-xs"
            >
              <Icon size={16} className={selectedMood === id ? "" : color} />
              <span className="ml-1">{label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-3">
          <Input
            placeholder="اكتب رسالتك... Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 font-body"
            dir="auto"
          />
          <Button 
            onClick={sendMessage} 
            size="icon" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            disabled={isTyping}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}