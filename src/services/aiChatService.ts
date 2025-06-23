interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

export class AIChatService {
  private static readonly API_BASE_URL = import.meta.env.VITE_SUPABASE_URL;
  private static readonly API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  static async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/functions/v1/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          messages,
          model: 'gpt-4o',
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      
      // Handle fallback response in case of API errors
      if (data.fallback_response) {
        return data.fallback_response.choices[0]?.message?.content || '抱歉，我現在無法回應。';
      }

      return data.choices[0]?.message?.content || '抱歉，我沒有收到完整的回應。';
    } catch (error) {
      console.error('AI Chat Service Error:', error);
      
      // Fallback responses for different types of errors
      const fallbackResponses = [
        '我現在遇到一些技術問題，請稍後再試。如果您有緊急健康問題，請立即諮詢醫生。',
        '抱歉，我暫時無法回應。請嘗試重新發送您的訊息，或聯絡我們的支援團隊。',
        '系統正在維護中，請稍後再試。如有緊急情況，請聯絡您的醫療提供者。'
      ];
      
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  }

  static async generateHealthTip(): Promise<string> {
    const healthTipPrompt: ChatMessage[] = [
      {
        role: 'user',
        content: '請給我一個簡短的長者健康小貼士，關於運動、營養或安全，不超過50字。'
      }
    ];

    try {
      return await this.sendMessage(healthTipPrompt);
    } catch (error) {
      console.error('Failed to generate health tip:', error);
      return '每天練習「腳跟對腳尖」步行2分鐘，可以顯著改善平衡力，降低跌倒風險。';
    }
  }
}