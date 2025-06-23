import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Heart, Lightbulb, Calendar, Clock, Send, Mic, Bot, User, RefreshCw } from 'lucide-react';
import { AIChatService } from '../services/aiChatService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const CompanionScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '早安，健樂！今天感覺如何？我是您的AI健康助理，可以為您提供運動、營養和健康方面的建議。有什麼我可以幫助您的嗎？',
      sender: 'bot',
      timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    }
  ]);
  const [activeTab, setActiveTab] = useState<'chat' | 'tips'>('chat');
  const [isTyping, setIsTyping] = useState(false);
  const [dailyTip, setDailyTip] = useState('每天練習「腳跟對腳尖」步行2分鐘。這個簡單的運動可以顯著改善您的平衡力，降低跌倒風險達25%。');
  const [isGeneratingTip, setIsGeneratingTip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Generate a daily tip when component mounts
    generateDailyTip();
  }, []);

  const quickResponses = [
    '我想了解運動建議',
    '如何改善平衡力？',
    '營養飲食建議',
    '家居安全貼士',
    '我感覺很好',
    '今天有點累'
  ];

  const generateDailyTip = async () => {
    setIsGeneratingTip(true);
    try {
      const tip = await AIChatService.generateHealthTip();
      setDailyTip(tip);
    } catch (error) {
      console.error('Failed to generate daily tip:', error);
    } finally {
      setIsGeneratingTip(false);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      const currentMessage = message.trim();
      setMessage('');
      setIsTyping(true);

      try {
        // Prepare conversation history for AI
        const conversationHistory: ChatMessage[] = messages.slice(-5).map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

        // Add current user message
        conversationHistory.push({
          role: 'user',
          content: currentMessage
        });

        // Get AI response
        const aiResponse = await AIChatService.sendMessage(conversationHistory);

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Failed to get AI response:', error);
        
        // Fallback response
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: '抱歉，我現在遇到一些技術問題。請稍後再試，或者您可以瀏覽「每日貼士」獲取健康建議。',
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleQuickResponse = (response: string) => {
    setMessage(response);
    setTimeout(() => handleSendMessage(), 100);
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
          <div className="flex-1 overflow-y-auto p-4" style={{ paddingBottom: '140px' }}>
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
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 flex-shrink-0 max-w-md mx-auto z-50 safe-area-bottom">
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
                    alert('語音輸入功能即將推出');
                  }}
                >
                  <Mic className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  className={`p-3 rounded-full transition-colors ${
                    message.trim() && !isTyping
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
        <div className="flex-1 overflow-y-auto p-4" style={{ paddingBottom: '100px' }}>
          {/* Today's Tip */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl p-6 mb-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                <h2 className="text-lg font-semibold">今日貼士</h2>
              </div>
              <button
                onClick={generateDailyTip}
                disabled={isGeneratingTip}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isGeneratingTip ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <p className="text-blue-100 mb-4">
              {dailyTip}
            </p>
            <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
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

            {/* AI-Powered Health Tips Section */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center mb-3">
                <Bot className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-semibold">AI個人化建議</h3>
              </div>
              <p className="text-green-100 mb-4">
                想要更個人化的健康建議嗎？在對話中告訴我您的具體需求，我會為您提供專屬的建議！
              </p>
              <button 
                onClick={() => setActiveTab('chat')}
                className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
              >
                開始對話
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanionScreen;