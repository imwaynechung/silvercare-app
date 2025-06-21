import React from 'react';
import { Heart, TrendingUp, Calendar, AlertCircle, User, Bell, Play, CheckCircle } from 'lucide-react';

const DashboardScreen: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      {/* Header with GOFA Pro branding */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-3">
              <Heart className="w-6 h-6 text-blue-900" />
            </div>
            <div>
              <span className="text-white text-lg font-bold">GOFA</span>
              <span className="bg-white text-blue-900 px-2 py-1 rounded text-xs font-bold ml-2">PRO</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold text-white mr-4">您好，健樂</h1>
          <div className="bg-white/20 rounded-full p-3">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 text-lg">👨‍⚕️</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-blue-100">歡迎回到銀齡樂</p>
      </div>

      <div className="px-4 -mt-6 relative z-10 pb-6">
        {/* Most Popular Health Assessments */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">最熱門的健康檢測</h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop" 
                alt="Fall Risk Assessment" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">長者跌倒風險檢測</h3>
                <p className="text-sm opacity-90">跌倒風險機率</p>
              </div>
              <button className="absolute bottom-4 right-4 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                開始檢測
              </button>
            </div>
          </div>
        </div>

        {/* Recovery Programs */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">復康計劃</h2>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <div className="bg-white rounded-2xl shadow-lg min-w-[280px] overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=150&fit=crop" 
                  alt="Muscle Training" 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  0/8
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">整體肌力提升訓練</h3>
                <p className="text-sm text-gray-600">14天 計劃 | 8 課程</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg min-w-[280px] overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=150&fit=crop" 
                  alt="Balance Training" 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  3/12
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">平衡力強化課程</h3>
                <p className="text-sm text-gray-600">21天 計劃 | 12 課程</p>
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
                  <Play className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">晨間平衡運動</p>
                  <p className="text-sm text-gray-600">10分鐘 • 初級</p>
                </div>
              </div>
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                開始
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

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-500">本週</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-gray-600">平衡分數</p>
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
      </div>
    </div>
  );
};

export default DashboardScreen;