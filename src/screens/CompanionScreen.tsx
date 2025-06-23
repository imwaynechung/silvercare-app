import React, { useState } from 'react';
import { MessageCircle, Heart, Lightbulb, Calendar, Clock, Send, Mic, Bot } from 'lucide-react';

const CompanionScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'tips'>('chat');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-4 text-white">
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
      <div className="flex bg-white border-b">
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
          <div className="flex-1 p-4 overflow-y-auto pb-24">
            <div className="space-y-4">
              {/* AI Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-4 h-4 text-blue-900" />
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-gray-900">早安，健樂！今天感覺如何？我注意到您昨天完成了平衡訓練，做得很好！</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">上午9:30</p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex items-start justify-end">
                <div className="flex-1 max-w-xs">
                  <div className="bg-blue-900 rounded-lg p-3">
                    <p className="text-white">感覺不錯！不過運動後有點累。</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">上午9:32</p>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-4 h-4 text-blue-900" />
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-gray-900">這很正常！運動後感到疲累表示您的肌肉在工作。記得要多喝水，需要時可以休息。要我為您推薦一些恢復性的伸展運動嗎？</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">上午9:33</p>
                </div>
              </div>

              {/* Quick Responses */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button className="px-3 py-2 bg-blue-100 text-blue-900 rounded-full text-sm">
                  好的，教我伸展
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                  我的進度如何？
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                  設定提醒
                </button>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="輸入您的訊息..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <button className="p-2 bg-gray-100 rounded-full">
                <Mic className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-900 rounded-full"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto pb-24">
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