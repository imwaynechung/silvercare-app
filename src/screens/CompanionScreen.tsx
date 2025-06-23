import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Heart, Lightbulb, Calendar, Clock, Send, Mic, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const CompanionScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '早安，健樂！今天感覺如何？我注意到您昨天完成了平衡訓練，做得很好！',
      sender: 'bot',
      timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    }
  ]);
  const [activeTab, setActiveTab] = useState<'chat' | 'tips'>('chat');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses = [
    '好的，教我伸展',
    '我的進度如何？',
    '設定提醒',
    '今天的運動計劃',
    '我感覺很好',
    '有點累'
  ];

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        const botResponse = generateBotResponse(userMessage.text);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleQuickResponse = (response: string) => {
    setMessage(response);
    setTimeout(() => handleSendMessage(), 100);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('伸展') || lowerMessage.includes('運動')) {
      return '很好！我為您推薦幾個簡單的伸展運動：\n\n1. 頸部轉動 - 慢慢左右轉動頭部\n2. 肩膀聳動 - 向上提肩膀，然後放鬆\n3. 腳踝轉動 - 坐著轉動腳踝\n\n每個動作做5-10次，記得動作要緩慢。需要我詳細說明任何一個動作嗎？';
    }
    
    if (lowerMessage.includes('進度') || lowerMessage.includes('表現')) {
      return '您的進度很棒！本週您已經：\n\n✅ 完成了5次平衡訓練\n✅ 運動時間達75分鐘\n✅ 達成83%的目標\n\n比上週進步了15%！繼續保持這個節奏，您會越來越強壯的。';
    }
    
    if (lowerMessage.includes('提醒') || lowerMessage.includes('設定')) {
      return '我可以為您設定以下提醒：\n\n🔔 每日運動提醒\n🔔 服藥時間提醒\n🔔 喝水提醒\n🔔 休息提醒\n\n您想設定哪種提醒呢？';
    }
    
    if (lowerMessage.includes('累') || lowerMessage.includes('疲勞')) {
      return '感到疲累是正常的，這表示您的身體在努力工作！建議您：\n\n💧 多喝水補充水分\n🛋️ 適當休息15-20分鐘\n🧘‍♀️ 做一些深呼吸放鬆\n\n如果持續感到不適，請諮詢您的醫生。';
    }
    
    if (lowerMessage.includes('好') || lowerMessage.includes('不錯')) {
      return '太好了！保持這種積極的心態很重要。既然您感覺良好，要不要嘗試今天的推薦運動？或者我可以分享一些健康小貼士給您。';
    }
    
    if (lowerMessage.includes('計劃') || lowerMessage.includes('今天')) {
      return '今天為您安排的活動：\n\n🏃‍♀️ 平衡力訓練 (15分鐘)\n📝 營養記錄\n⚖️ 每週評估\n\n您想從哪一項開始呢？我可以引導您完成。';
    }
    
    // Default responses
    const defaultResponses = [
      '我明白您的意思。請告訴我更多詳情，我會盡力幫助您。',
      '這是一個很好的問題。根據您的情況，我建議您可以嘗試一些簡單的運動。',
      '感謝您的分享。保持積極的心態對健康很重要。有什麼我可以幫助您的嗎？',
      '我會記住這個資訊。如果您有任何關於運動或健康的問題，隨時可以問我。'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-4 text-white flex-shrink-0">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI健康助理</h1>
            <p className="text-blue-100 text-sm">您的專屬健康顧問</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white border-b flex-shrink-0">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'chat'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          對話
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'tips'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          每日貼士
        </button>
      </div>

      {activeTab === 'chat' ? (
        <>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 pb-4" style={{ paddingBottom: '120px' }}>
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-900" />
                    </div>
                  )}
                  <div className={`flex-1 max-w-xs sm:max-w-md ${msg.sender === 'user' ? 'order-1' : ''}`}>
                    <div className={`rounded-lg p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-blue-900 text-white ml-auto' 
                        : 'bg-white shadow-sm'
                    }`}>
                      <p className={`${msg.sender === 'user' ? 'text-white' : 'text-gray-900'} whitespace-pre-line`}>
                        {msg.text}
                      </p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                      {msg.timestamp.toLocaleTimeString('zh-HK', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-4 h-4 text-blue-900" />
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            {messages.length <= 1 && (
              <div className="max-w-4xl mx-auto mt-4">
                <p className="text-sm text-gray-600 mb-3">快速回覆：</p>
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickResponse(response)}
                      className="px-3 py-2 bg-blue-100 text-blue-900 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {response}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Message Input - Fixed at bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex-shrink-0 max-w-md mx-auto z-50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="輸入您的訊息..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                    rows={1}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                    }}
                  />
                </div>
                <button 
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    // Voice input functionality could be added here
                    alert('語音輸入功能即將推出');
                  }}
                >
                  <Mic className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`p-3 rounded-full transition-colors ${
                    message.trim() 
                      ? 'bg-blue-900 hover:bg-blue-800 text-white' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-4" style={{ paddingBottom: '120px' }}>
          {/* Today's Tip */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl p-6 mb-6 text-white">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-6 h-6 mr-2" />
              <h2 className="text-lg font-semibold">今日貼士</h2>
            </div>
            <p className="text-blue-100 mb-4">
              每天練習「腳跟對腳尖」步行2分鐘。這個簡單的運動可以顯著改善您的平衡力，降低跌倒風險達25%。
            </p>
            <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">
              立即嘗試
            </button>
          </div>

          {/* Daily Tips */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">晨間補水</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    起床後先喝一杯水。適當的水分補充有助維持血壓，減少頭暈。
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>最佳時間：起床後</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">藥物時間表</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    每天在相同時間服藥。設定提醒避免漏服，以免影響平衡。
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>下次提醒：下午2:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">家居安全檢查</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    移除鬆散的地毯，確保走廊有足夠照明。小改變可以預防大意外。
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>每週提醒</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-5 h-5 text-blue-900" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">社交聯繫</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    今天打電話給朋友或家人。社交聯繫有助心理健康，增強保持活躍的動力。
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>建議：下午時間</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanionScreen;