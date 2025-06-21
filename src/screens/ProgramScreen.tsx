import React, { useState } from 'react';
import { Play, Clock, CheckCircle, Star, Target, Calendar, ArrowLeft, Award, TrendingUp, Lock } from 'lucide-react';

const ProgramScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'programs'>('programs');
  const [showProgramDetail, setShowProgramDetail] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<1 | 2 | 3>(1);

  if (showProgramDetail) {
    return (
      <div className="min-h-full bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-4 pt-12 pb-8 rounded-b-3xl">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setShowProgramDetail(false)}
              className="mr-3 p-2 bg-white/20 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">個人化運動計劃詳情</h1>
          </div>

          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold text-white mr-4">3個月改善計劃</h2>
            <div className="bg-white/20 rounded-full p-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="text-blue-900 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
          <p className="text-blue-100">循序漸進，從基礎到進階</p>
        </div>

        <div className="px-4 -mt-6 relative z-10 pb-6">
          {/* Month Selection */}
          <div className="flex bg-white rounded-2xl shadow-lg p-2 mb-6">
            {[1, 2, 3].map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month as 1 | 2 | 3)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                  selectedMonth === month
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                第{month}個月
              </button>
            ))}
          </div>

          {/* Month Details */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="p-6">
              {selectedMonth === 1 && (
                <>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">基</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">第一個月 - 基礎建立</h3>
                      <p className="text-gray-600">建立運動習慣，學習基本動作</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-gray-600">課程</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">15分鐘</div>
                      <div className="text-sm text-gray-600">每課時長</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">課程 1-4：基礎平衡</p>
                        <p className="text-sm text-gray-600">靜態平衡、雙腳站立</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">課程 5-8：坐立訓練</p>
                        <p className="text-sm text-gray-600">椅子坐立、腿部力量</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-900">
                      <div>
                        <p className="font-medium text-gray-900">課程 9-12：柔韌性</p>
                        <p className="text-sm text-gray-600">伸展運動、關節活動</p>
                      </div>
                      <Play className="w-5 h-5 text-blue-900" />
                    </div>
                  </div>
                </>
              )}

              {selectedMonth === 2 && (
                <>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-orange-600 font-bold">中</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">第二個月 - 進階訓練</h3>
                      <p className="text-gray-600">增加難度，提升穩定性</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">12</div>
                      <div className="text-sm text-gray-600">課程</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">20分鐘</div>
                      <div className="text-sm text-gray-600">每課時長</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">課程 1-4：動態平衡</p>
                        <p className="text-sm text-gray-600">單腳站立、重心轉移</p>
                      </div>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">課程 5-8：串聯步行</p>
                        <p className="text-sm text-gray-600">腳跟對腳尖、直線行走</p>
                      </div>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">課程 9-12：阻力訓練</p>
                        <p className="text-sm text-gray-600">彈力帶、輕量負重</p>
                      </div>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </>
              )}

              {selectedMonth === 3 && (
                <>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold">高</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">第三個月 - 高級挑戰</h3>
                      <p className="text-gray-600">綜合訓練，鞏固成果</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-sm text-gray-600">課程</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">25分鐘</div>
                      <div className="text-sm text-gray-600">每課時長</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">課程 1-4：複合動作</p>
                        <p className="text-sm text-gray-600">多方向平衡、協調訓練</p>
                      </div>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">課程 5-8：功能性訓練</p>
                        <p className="text-sm text-gray-600">日常動作模擬、實用技能</p>
                      </div>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">課程 9-12：維持訓練</p>
                        <p className="text-sm text-gray-600">長期維持、習慣養成</p>
                      </div>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">整體進度</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-green-600">12</span>
                </div>
                <p className="text-sm font-medium text-gray-900">已完成</p>
                <p className="text-xs text-gray-600">第一個月</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-blue-600">8</span>
                </div>
                <p className="text-sm font-medium text-gray-900">進行中</p>
                <p className="text-xs text-gray-600">第二個月</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-gray-400">0</span>
                </div>
                <p className="text-sm font-medium text-gray-900">待開始</p>
                <p className="text-xs text-gray-600">第三個月</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">個人化運動計劃</h1>
        <p className="text-gray-600">3個月循序漸進改善計劃，每月12課程</p>
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
          今日課程
        </button>
        <button
          onClick={() => setActiveTab('programs')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'programs'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          3個月計劃
        </button>
      </div>

      <div className="px-4 py-6">
        {activeTab === 'today' ? (
          <>
            {/* Today's Lesson */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-6 mb-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">今日課程</h2>
                  <p className="text-blue-100">第二個月 - 課程 8</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">串聯步行進階訓練</h3>
              <p className="text-blue-100 mb-4">練習腳跟對腳尖步行，提升動態平衡能力</p>
              <div className="flex items-center text-sm text-blue-100">
                <Clock className="w-4 h-4 mr-1" />
                <span>預計時間：20分鐘</span>
              </div>
            </div>

            {/* Today's Program */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">課程內容</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="w-4 h-4 mr-1" />
                  <span>中級難度</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-l-4 border-blue-900">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-900 font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">熱身運動</p>
                      <p className="text-sm text-gray-600">關節活動、輕度伸展 • 5分鐘</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium">
                    開始
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">串聯步行練習</p>
                      <p className="text-sm text-gray-600">腳跟對腳尖、直線行走 • 10分鐘</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                    排隊
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">放鬆伸展</p>
                      <p className="text-sm text-gray-600">肌肉放鬆、深呼吸 • 5分鐘</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                    排隊
                  </button>
                </div>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">本週進度</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-green-600">7</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">課程</p>
                  <p className="text-xs text-gray-600">已完成</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-blue-600">140</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">分鐘</p>
                  <p className="text-xs text-gray-600">運動時間</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-purple-600">88%</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">目標</p>
                  <p className="text-xs text-gray-600">已達成</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 3-Month Program Overview */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-6 text-white">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">3個月改善計劃</h2>
                  <p className="text-green-100">循序漸進，從基礎到進階</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">36</div>
                  <div className="text-green-100 text-sm">總課程</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">20</div>
                  <div className="text-green-100 text-sm">已完成</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">56%</div>
                  <div className="text-green-100 text-sm">完成度</div>
                </div>
              </div>
            </div>

            {/* Month Programs */}
            <div className="space-y-4">
              <div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setShowProgramDetail(true)}
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop" 
                    alt="Month 1 Training" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    12/12 完成
                  </div>
                  <div className="absolute top-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                    第一個月
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">基礎建立階段</h3>
                  <p className="text-sm text-gray-600 mb-3">建立運動習慣，學習基本平衡和坐立動作</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                      <span>已完成</span>
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>平衡力提升 15%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setShowProgramDetail(true)}
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop" 
                    alt="Month 2 Training" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    8/12 進行中
                  </div>
                  <div className="absolute top-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                    第二個月
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">進階訓練階段</h3>
                  <p className="text-sm text-gray-600 mb-3">增加難度，動態平衡和串聯步行訓練</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Play className="w-4 h-4 mr-1 text-blue-600" />
                      <span>進行中</span>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden opacity-75">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1506629905607-c28b47e8d3b3?w=400&h=200&fit=crop" 
                    alt="Month 3 Training" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    0/12 待開始
                  </div>
                  <div className="absolute top-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                    第三個月
                  </div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">高級挑戰階段</h3>
                  <p className="text-sm text-gray-600 mb-3">複合動作訓練，功能性運動和習慣維持</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Lock className="w-4 h-4 mr-1" />
                      <span>完成第二個月後解鎖</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expected Improvements */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">預期改善效果</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">平衡力改善</p>
                      <p className="text-sm text-gray-600">預期提升 30-40%</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-bold">+35%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">肌力增強</p>
                      <p className="text-sm text-gray-600">下肢力量提升</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-bold">+25%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Star className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">跌倒風險降低</p>
                      <p className="text-sm text-gray-600">整體風險減少</p>
                    </div>
                  </div>
                  <span className="text-purple-600 font-bold">-50%</span>
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