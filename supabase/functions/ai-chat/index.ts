import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, model, temperature, max_tokens }: ChatRequest = await req.json()

    // Get OpenAI API key from environment
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    // Add system message for health companion context
    const systemMessage: ChatMessage = {
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

請保持回應在150字以內，語氣溫暖友善。`
    };

    // Prepare messages with system context
    const chatMessages = [systemMessage, ...messages];

    // Call the external API
    const externalApiUrl = 'https://walrus-app-zl2gh.ondigitalocean.app/api/chat/completions'
    
    const response = await fetch(externalApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: chatMessages,
        model: model || 'gpt-4o',
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 500,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('AI Chat error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        fallback_response: {
          choices: [{
            message: {
              role: 'assistant',
              content: '抱歉，我現在無法回應。請稍後再試，或聯絡我們的支援團隊。如果您有緊急健康問題，請立即諮詢醫生。'
            }
          }]
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})