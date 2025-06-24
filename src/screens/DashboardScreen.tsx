import React, { useEffect } from 'react';
import { Heart, TrendingUp, Calendar, User, Bell, CheckCircle, Utensils, Dumbbell } from 'lucide-react';

const DashboardScreen: React.FC = () => {
  useEffect(() => {
    // Track dashboard view
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: 'Dashboard',
        page_location: window.location.href
      });
    }
  }, []);

  return (
    <div className="min-h-full bg-gray-50 mobile-scroll">
      {/* Header with proper GOFA logo and photo avatar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 pt-8 pb-4 rounded-b-3xl safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* Use proper GOFA logo */}
            <img 
              src="https://iili.io/3rSv1St.png" 
              alt="GOFA Logo" 
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center touch-manipulation btn-mobile">
              <Bell className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center mb-3">
          <h1 className="text-xl font-bold text-white mr-3">您好，健樂</h1>
          {/* Photo Avatar */}
          <div className="bg-white/20 rounded-full p-2">
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <p className="text-blue-100 text-sm">歡迎回到銀齡樂</p>
      </div>

      <div className="px-4 -mt-2 relative z-10 pb-24">
        {/* Weekly Progress Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg card-mobile">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-500">本週</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-gray-600">復康進度</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg card-mobile">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-900" />
              </div>
              <span className="text-xs text-gray-500">連續</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">天活躍</p>
          </div>
        </div>

        {/* Most Popular Health Assessments */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">跌倒風險評估</h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-mobile">
            <div className="relative">
              <img 
                src="https://seniorhelpers.com.au/wp-content/uploads/2021/06/Fall-Prevention-for-Older-Adults.jpg" 
                alt="Fall Risk Assessment" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">個人化跌倒風險評估</h3>
                <p className="text-sm opacity-90">AI智能分析 + 專業建議</p>
              </div>
              <button className="absolute bottom-4 right-4 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium btn-mobile">
                開始評估
              </button>
            </div>
          </div>
        </div>

        {/* Personalized Plans */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">個人化計劃</h2>
          
          <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
            <div className="bg-white rounded-2xl shadow-lg min-w-[280px] overflow-hidden card-mobile">
              <div className="relative">
                <img 
                  src="hhttps://media.istockphoto.com/id/1390751416/photo/asian-chinese-senior-woman-friends-enjoying-home-workout-during-evening-in-apartment-living.jpg?s=612x612&w=0&k=20&c=zfF6PzUHp00AXqI1Du7nPLkJoUsi3utpMZROh2X3I_E=" 
                  alt="Workout Plan" 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  3/12
                </div>
                <div className="absolute top-3 left-3 bg-blue-900 text-white px-2 py-1 rounded-full text-xs flex items-center">
                  <Dumbbell className="w-3 h-3 mr-1" />
                  運動
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">個人化運動計劃</h3>
                <p className="text-sm text-gray-600">12週計劃 | 平衡力 + 肌力訓練</p>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-900 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">進度: 25%</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg min-w-[280px] overflow-hidden card-mobile">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=150&fit=crop" 
                  alt="Diet Plan" 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  7/7
                </div>
                <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
                  <Utensils className="w-3 h-3 mr-1" />
                  飲食
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">個人化飲食計劃</h3>
                <p className="text-sm text-gray-600">本週計劃 | 均衡營養指導</p>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">進度: 100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 card-mobile">
          <h2 className="text-lg font-bold text-gray-900 mb-4">今日活動</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border-l-4 border-blue-900">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Dumbbell className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">平衡力訓練</p>
                  <p className="text-sm text-gray-600">15分鐘 • 中級</p>
                </div>
              </div>
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium btn-mobile">
                開始
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border-l-4 border-green-600">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Utensils className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">營養記錄</p>
                  <p className="text-sm text-gray-600">記錄今日飲食</p>
                </div>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium btn-mobile">
                記錄
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">每週評估</p>
                  <p className="text-sm text-gray-600">5分鐘 • 今日到期</p>
                </div>
              </div>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium btn-mobile">
                進行
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;