import React, { useState } from 'react';
import { Play, Clock, CheckCircle, Star, Target, Calendar, ArrowLeft } from 'lucide-react';

const ProgramScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'programs'>('today');
  const [showProgramDetail, setShowProgramDetail] = useState(false);

  if (showProgramDetail) {
    return (
      <div className="min-h-full bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 pt-12 pb-8 rounded-b-3xl">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setShowProgramDetail(false)}
              className="mr-3 p-2 bg-white/20 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">復康計劃詳情</h1>
          </div>

          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold text-white mr-4">午安，健樂</h2>
            <div className="bg-white/20 rounded-full p-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-lg">👨‍⚕️</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-purple-100">歡迎來到 GOFA Rehab</p>
        </div>

        <div className="px-4 -mt-6 relative z-10 pb-6">
          {/* Program Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop" 
                alt="Recovery Program" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                1/12
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-2">第一階段 - 復康治療</h3>
              <p className="text-gray-600 mb-4">兩星期 | 關節炎</p>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">進度</span>
                  <span className="text-sm font-medium text-purple-600">8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>

              <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium">
                繼續訓練
              </button>
            </div>
          </div>

          {/* Health Course */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">康體課程</h3>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 text-purple-600">🏃‍♂️</div>
              </div>
            </div>
            <p className="text-gray-600">每天運動三十分鐘，建立良好運動習慣</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">訓練計劃</h1>
        <p className="text-gray-600">個人化運動改善您的平衡和力量</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white border-b">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'today'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          今日
        </button>
        <button
          onClick={() => setActiveTab('programs')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'programs'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          康體課程
        </button>
      </div>

      <div className="px-4 py-6">
        {activeTab === 'today' ? (
          <>
            {/* Today's Program */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">今日計劃</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>總共25分鐘</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-l-4 border-blue-900">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Play className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">平衡訓練</p>
                      <p className="text-sm text-gray-600">單腳站立 • 10分鐘</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium">
                    開始
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">力量訓練</p>
                      <p className="text-sm text-gray-600">坐立訓練 • 10分鐘</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                    排隊
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <Star className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">放鬆運動</p>
                      <p className="text-sm text-gray-600">伸展運動 • 5分鐘</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                    排隊
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">本週進度</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-blue-900">5</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">課程</p>
                  <p className="text-xs text-gray-600">已完成</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-green-600">125</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">分鐘</p>
                  <p className="text-xs text-gray-600">運動時間</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-purple-600">85%</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">目標</p>
                  <p className="text-xs text-gray-600">已達成</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Recovery Programs */}
            <div className="space-y-4">
              <div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setShowProgramDetail(true)}
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop" 
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

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop" 
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

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1506629905607-c28b47e8d3b3?w=400&h=200&fit=crop" 
                    alt="Flexibility Training" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    1/6
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">柔韌性改善計劃</h3>
                  <p className="text-sm text-gray-600">10天 計劃 | 6 課程</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramScreen;