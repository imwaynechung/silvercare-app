import React from 'react';
import { Heart, TrendingUp, Calendar, AlertCircle, User, Bell, Play, CheckCircle, Utensils, Dumbbell } from 'lucide-react';

const DashboardScreen: React.FC = () => {
  return (
    <div className="min-h-full bg-gray-50">
      {/* Reduced Header with GOFA Pro branding */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 pt-8 pb-4 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3">
              <Heart className="w-5 h-5 text-blue-900" />
            </div>
            <div>
              <span className="text-white text-lg font-bold">GOFA</span>
              <span className="bg-white text-blue-900 px-2 py-1 rounded text-xs font-bold ml-2">PRO</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </button>
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center mb-3">
          <h1 className="text-xl font-bold text-white mr-3">您好，健樂</h1>
          <div className="bg-white/20 rounded-full p-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 text-sm">👨‍⚕️</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-blue-100 text-sm">歡迎回到銀齡樂</p>
      </div>

      <div className="px-4 -mt-2 relative z-10 pb-6">
        {/* Weekly Progress Stats - Added below header */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-500">本週</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-gray-600">復康進度</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg">
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
          <h2 className="text-lg font-bold text-blue-900 mb-4">Rehab 復康中心</h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop" 
                alt="Rehabilitation Program" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">個人化復康計劃</h3>
                <p className="text-sm opacity-90">運動訓練 + 營養指導</p>
              </div>
              <button className="absolute bottom-4 right-4 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                開始復康
              </button>
            </div>
          </div>
        </div>

        {/* Personalized Plans */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">個人化計劃</h2>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <div className="bg-white rounded-2xl shadow-lg min-w-[280px] overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=150&fit=crop" 
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

            <div className="bg-white rounded-2xl shadow-lg min-w-[280px] overflow-hidden">
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
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
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
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
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
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
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
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
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