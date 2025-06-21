import React, { useState } from 'react';
import { MessageCircle, Heart, Lightbulb, Calendar, Clock, Send, Mic } from 'lucide-react';

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
    <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-bold text-gray-900 mb-1">AI Companion</h1>
        <p className="text-gray-600 text-sm">Your personal health assistant</p>
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
          Chat
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'tips'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Daily Tips
        </button>
      </div>

      {activeTab === 'chat' ? (
        <>
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto pb-20">
            <div className="space-y-4">
              {/* AI Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-4 h-4 text-blue-900" />
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-gray-900">Good morning, Margaret! How are you feeling today? I noticed you completed your balance exercises yesterday - that's wonderful!</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">9:30 AM</p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex items-start justify-end">
                <div className="flex-1 max-w-xs">
                  <div className="bg-blue-900 rounded-lg p-3">
                    <p className="text-white">I'm feeling good! A bit tired after the exercises though.</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">9:32 AM</p>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-4 h-4 text-blue-900" />
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-gray-900">That's completely normal! Feeling a bit tired after exercise shows you're working your muscles. Remember to stay hydrated and take breaks when needed. Would you like me to suggest some gentle stretches for recovery?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">9:33 AM</p>
                </div>
              </div>

              {/* Quick Responses */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button className="px-3 py-2 bg-blue-100 text-blue-900 rounded-full text-sm">
                  Yes, show me stretches
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                  How's my progress?
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                  Schedule reminder
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
                  placeholder="Type your message..."
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
        <div className="flex-1 p-4 overflow-y-auto pb-20">
          {/* Today's Tip */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl p-6 mb-6 text-white">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-6 h-6 mr-2" />
              <h2 className="text-lg font-semibold">Today's Tip</h2>
            </div>
            <p className="text-blue-100 mb-4">
              Practice the "heel-to-toe" walk for 2 minutes daily. This simple exercise can significantly improve your balance and reduce fall risk by up to 25%.
            </p>
            <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">
              Try it now
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
                  <h3 className="font-semibold text-gray-900 mb-1">Morning Hydration</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Start your day with a glass of water. Proper hydration helps maintain blood pressure and reduces dizziness.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Best time: Upon waking</span>
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
                  <h3 className="font-semibold text-gray-900 mb-1">Medication Schedule</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Take medications at the same time each day. Set reminders to avoid missed doses that could affect balance.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Next reminder: 2:00 PM</span>
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
                  <h3 className="font-semibold text-gray-900 mb-1">Home Safety Check</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Remove loose rugs and ensure good lighting in hallways. Small changes can prevent big accidents.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Weekly reminder</span>
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
                  <h3 className="font-semibold text-gray-900 mb-1">Social Connection</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Call a friend or family member today. Social connections boost mental health and motivation for staying active.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Suggested: Afternoon</span>
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