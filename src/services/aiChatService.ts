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
  private static readonly API_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL;
  private static readonly API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  private static getSystemMessage(): ChatMessage {
    return {
      role: 'system',
      content: `你是銀齡樂的AI健康助理，專門為長者提供健康建議和支援。你的特點：

1. 使用繁體中文回應
2. 語氣親切、耐心、專業
3. 專注於長者健康、運動、營養和安全
4. 提供實用的建議，但不替代專業醫療意見
5. 鼓勵積極的生活態度
6. 回應簡潔明瞭，避免過於複雜的醫學術語

當用戶詢問關於：
- 運動：推薦適合長者的安全運動
- 營養：提供健康飲食建議
- 安全：給出防跌倒和家居安全建議
- 健康：提供一般健康維護建議，但建議諮詢醫生
- 情緒：提供正面支持和建議

請保持回應在150字以內，語氣溫暖友善。如有嚴重健康問題，請建議用戶諮詢專業醫生。`
    };
  }

  static async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      // Add system message at the beginning
      const systemMessage = this.getSystemMessage();
      const chatMessages = [systemMessage, ...messages];

      const response = await fetch(`${this.API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          messages: chatMessages,
          model: 'gpt-4o',
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', response.status, errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data.choices[0]?.message?.content || '抱歉，我沒有收到完整的回應。';
    } catch (error) {
      console.error('AI Chat Service Error:', error);
      
      // Provide contextual fallback responses
      const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
      
      if (lastUserMessage.includes('運動') || lastUserMessage.includes('平衡')) {
        return '建議您每天進行簡單的平衡練習，如單腳站立或腳跟對腳尖步行。請在安全的環境下進行，必要時可扶著椅子。如有疑問，請諮詢物理治療師。';
      } else if (lastUserMessage.includes('營養') || lastUserMessage.includes('飲食')) {
        return '建議多攝取富含鈣質和維生素D的食物，如牛奶、深綠色蔬菜和魚類。保持均衡飲食，多喝水。如需詳細營養建議，請諮詢營養師。';
      } else if (lastUserMessage.includes('安全') || lastUserMessage.includes('跌倒')) {
        return '家居安全很重要：移除地毯、確保照明充足、在浴室安裝扶手。穿防滑鞋，避免急速轉身。如有平衡問題，請諮詢醫生。';
      } else {
        return '我現在遇到一些技術問題，請稍後再試。如果您有緊急健康問題，請立即諮詢醫生。您也可以瀏覽「每日貼士」獲取健康建議。';
      }
    }
  }

  static async generateHealthTip(): Promise<string> {
    const healthTipPrompts = [
      '請給我一個關於長者平衡訓練的健康小貼士，不超過50字。',
      '請提供一個長者營養飲食的簡短建議，不超過50字。',
      '請給出一個家居安全防跌倒的小貼士，不超過50字。',
      '請分享一個長者日常運動的簡單建議，不超過50字。',
      '請提供一個長者心理健康的小貼士，不超過50字。'
    ];

    const randomPrompt = healthTipPrompts[Math.floor(Math.random() * healthTipPrompts.length)];

    try {
      const response = await this.sendMessage([
        {
          role: 'user',
          content: randomPrompt
        }
      ]);
      return response;
    } catch (error) {
      console.error('Failed to generate health tip:', error);
      
      // Fallback tips
      const fallbackTips = [
        '每天練習「腳跟對腳尖」步行2分鐘，可以顯著改善平衡力，降低跌倒風險。',
        '起床時先坐在床邊30秒，讓身體適應後再站起，避免頭暈跌倒。',
        '在浴室安裝扶手，洗澡時使用防滑墊，確保安全。',
        '每天攝取足夠鈣質和維生素D，強化骨骼健康。',
        '保持社交活動，與朋友家人聯繫，有助心理健康。'
      ];
      
      return fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
    }
  }
}