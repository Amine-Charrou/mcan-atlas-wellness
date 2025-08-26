// N8N Integration Client
interface N8nConfig {
  baseUrl: string;
  apiKey?: string;
}

interface HabitData {
  userId: string;
  habitType: 'sleep' | 'hydration' | 'activity' | 'mood';
  value: number;
  timestamp: Date;
}

interface ChatMessage {
  userId: string;
  message: string;
  mood?: string;
  context?: {
    recentHabits: HabitData[];
    moodPatterns: any[];
  };
}

class N8nClient {
  private config: N8nConfig;

  constructor(config: N8nConfig) {
    this.config = config;
  }

  private async makeRequest(endpoint: string, data: any) {
    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`N8N request failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('N8N request error:', error);
      throw error;
    }
  }

  async sendDashboardLoad(userId: string) {
    return this.makeRequest('/webhook/mcan/dashboard-load', {
      userId,
      timestamp: new Date().toISOString()
    });
  }

  async sendHabitUpdate(habitData: HabitData) {
    return this.makeRequest('/webhook/mcan/habit-update', {
      ...habitData,
      timestamp: habitData.timestamp.toISOString()
    });
  }

  async sendChatMessage(messageData: ChatMessage) {
    return this.makeRequest('/webhook/mcan/chat-message', {
      ...messageData,
      timestamp: new Date().toISOString()
    });
  }

  async sendChatFeedback(messageId: string, feedback: 'helpful' | 'not-helpful', userId: string) {
    return this.makeRequest('/webhook/mcan/chat-feedback', {
      messageId,
      feedback,
      userId,
      timestamp: new Date().toISOString()
    });
  }

  async analyzeMoodPattern(userId: string, moodData: any[]) {
    return this.makeRequest('/webhook/mcan/mood-analysis', {
      userId,
      moodData,
      timestamp: new Date().toISOString()
    });
  }

  async sendNotification(userId: string, notificationData: any) {
    return this.makeRequest('/webhook/mcan/notifications', {
      userId,
      ...notificationData,
      timestamp: new Date().toISOString()
    });
  }

  async updateUserPreferences(userId: string, preferences: any) {
    return this.makeRequest('/webhook/mcan/user-preferences', {
      userId,
      preferences,
      timestamp: new Date().toISOString()
    });
  }
}

// Initialize N8n client with environment configuration
const n8nConfig: N8nConfig = {
  baseUrl: import.meta.env.VITE_N8N_BASE_URL || 'http://localhost:5678',
  apiKey: import.meta.env.VITE_N8N_API_KEY
};

export const n8nClient = new N8nClient(n8nConfig);
export type { HabitData, ChatMessage };