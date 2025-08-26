import { useState } from "react";
import { Send, ThumbsUp, ThumbsDown, Smile, Frown, Meh } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  feedback?: "helpful" | "not-helpful";
}

export function ChatAssistant() {
  const { t } = useLanguage();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "مرحبا! I'm Mcan, your AI health companion. How are you feeling today? 😊",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const [inputText, setInputText] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("");

  const moods = [
    { id: "happy", icon: Smile, label: t.happy, color: "text-wellness-green" },
    { id: "neutral", icon: Meh, label: t.okay, color: "text-moroccan-orange" },
    { id: "sad", icon: Frown, label: t.notGreat, color: "text-moroccan-red" },
  ];

  const sendMessage = () => {
    if (!inputText.trim() && !selectedMood) return;

    const userMessage: Message = {
      id: Date.now(),
      text: selectedMood ? `I'm feeling ${selectedMood}. ${inputText}` : inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage.text, selectedMood);
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);

    setInputText("");
    setSelectedMood("");
  };

  const getAIResponse = (userText: string, mood: string) => {
    const responses = {
      happy: [
        "That's wonderful! 🌟 To maintain this positive energy, try the Moroccan tradition of drinking green tea with mint. It's great for mental clarity!",
        "Excellent! Keep this momentum going with some light stretching. In Morocco, we say 'الصحة تاج' - health is a crown. Wear it proudly!",
      ],
      neutral: [
        "I understand. Sometimes we need small steps. Try taking 5 deep breaths - it's like the calm of a Marrakech morning. How about a short walk?",
        "That's okay, habibi. Consider having some dates with almonds - a traditional Moroccan energy boost that can lift your spirits naturally.",
      ],
      sad: [
        "I'm here for you. 🤗 In Moroccan culture, we believe in community support. Consider calling a loved one, and try some chamomile tea to soothe your mind.",
        "Your feelings are valid. Try the '3-3-3' technique: name 3 things you see, 3 sounds you hear, 3 parts of your body you can move. Like finding peace in a busy souk.",
      ],
    };

    const moodResponses = responses[mood as keyof typeof responses] || responses.neutral;
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  };

  const giveFeedback = (messageId: number, feedback: "helpful" | "not-helpful") => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">{t.aiChatAssistant}</h1>
        <p className="text-muted-foreground">{t.personalizedWellness}</p>
      </div>

      {/* Chat Container */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[70%]">
                <Card
                  className={`p-4 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent/50"
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Card>
                
                {message.sender === "ai" && (
                  <div className="flex gap-2 mt-2 justify-start">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => giveFeedback(message.id, "helpful")}
                      className={`h-8 px-3 ${
                        message.feedback === "helpful" ? "bg-wellness-green/20 text-wellness-green" : ""
                      }`}
                    >
                      <ThumbsUp size={14} />
                      <span className="ml-1 text-xs">{t.helpful}</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => giveFeedback(message.id, "not-helpful")}
                      className={`h-8 px-3 ${
                        message.feedback === "not-helpful" ? "bg-moroccan-red/20 text-moroccan-red" : ""
                      }`}
                    >
                      <ThumbsDown size={14} />
                      <span className="ml-1 text-xs">{t.notHelpful}</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mood Selection */}
        <div className="p-6 border-t bg-card/50">
          <p className="font-medium mb-3">{t.howFeeling}</p>
          <div className="grid grid-cols-3 gap-3">
            {moods.map(({ id, icon: Icon, label, color }) => (
              <Button
                key={id}
                variant={selectedMood === id ? "default" : "outline"}
                onClick={() => setSelectedMood(selectedMood === id ? "" : id)}
                className="h-12 flex items-center justify-center gap-2"
              >
                <Icon size={18} className={selectedMood === id ? "" : color} />
                <span className="text-sm">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t bg-card">
          <div className="flex gap-3">
            <Input
              placeholder={t.typeMessage}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} className="bg-primary hover:bg-primary-light px-6">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}