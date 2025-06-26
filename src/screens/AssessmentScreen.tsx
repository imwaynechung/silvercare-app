import React, { useState } from 'react';
import { Brain, Clock, TrendingUp, Play, BarChart3, ArrowLeft, FileText, Utensils, Dumbbell, Target, AlertTriangle, Shield } from 'lucide-react';
import ChatbotAssessment from '../components/ChatbotAssessment';
import ExerciseProgramScreen from './ExerciseProgramScreen';

const AssessmentScreen: React.FC = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'diet'>('overview');
  const [userRiskProfile] = useState({
    balanceRisk: 'high', // high, medium, low
    frailtyLevel: 'high', // robust, pre-frail, frail
    fallRisk: 85, // percentage
    riskFactors: ['平衡問題', '肌力不足', '曾經跌倒'],
    frailtyStatus: 'frail' // robust, pre-frail, frail
  });

  if (showAssessment) {
    return <ChatbotAssessment onComplete={() => setShowAssessment(false)} />;
  }

  if (showDetails) {
    return (
      <div className="min-h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b flex items-center">
          <button 
            onClick={() => setShowDetails(false)}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">復康計劃詳情</h1>
        </div>

        <div className="px-4 py-6">
          {/* Hero Image */}
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop" 
              alt="Rehabilitation Program" 
              className="w-full h-48 object-cover rounded-2xl"
            />
          </div>

          {/* Title and Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">個人化復康計劃</h2>
            <p className="text-gray-600 mb-4">針對您的需求設計的全面復康方案</p>
            
            <div className="bg-blue-900 text-white px-4 py-2 rounded-lg inline-block mb-6">
              平衡力提升 + 肌力強化
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">計劃簡介</h3>
            <p className="text-gray-700 leading-relaxed">
              根據您的評估結果，我們為您制定了個人化的復康計劃，包括運動訓練和營養指導，幫助您改善平衡力、增強肌力，並降低跌倒風險。
            </p>
          </div>

          {/* Program Content */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">計劃內容</h3>
              <p className="text-sm text-gray-600">為期12週，每日30分鐘</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Dumbbell className="w-8 h-8 text-blue-900" />
                </div>
                <p className="font-medium text-gray-900 mb-1">運動計劃</p>
                <p className="text-sm text-gray-600">個人化訓練課程</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Utensils className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-medium text-gray-900 mb-1">營養計劃</p>
                <p className="text-sm text-gray-600">均衡飲食指導</p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => setShowAssessment(true)}
            className="w-full bg-blue-900 text-white py-4 rounded-2xl font-medium text-lg"
          >
            開始復康計劃
          </button>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Health Assessment Overview */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">您的健康評估</h2>
              
              <div className="grid grid-cols-1 gap-4 mb-4">
                {/* Overall Risk Score */}
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">跌倒風險評估</p>
                        <p className="text-sm text-red-600">需要特別注意</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">{userRiskProfile.fallRisk}%</p>
                      <p className="text-xs text-gray-600">風險指數</p>
                    </div>
                  </div>
                  <div className="w-full bg-red-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${userRiskProfile.fallRisk}%` }}
                    ></div>
                  </div>
                </div>

                {/* Frailty Level Assessment */}
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <Shield className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">體弱程度評估</p>
                        <p className="text-sm text-orange-600">
                          {userRiskProfile.frailtyStatus === 'robust' && '健壯'}
                          {userRiskProfile.frailtyStatus === 'pre-frail' && '前期體弱'}
                          {userRiskProfile.frailtyStatus === 'frail' && '體弱'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        userRiskProfile.frailtyStatus === 'robust' ? 'bg-green-100 text-green-800' :
                        userRiskProfile.frailtyStatus === 'pre-frail' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {userRiskProfile.frailtyStatus === 'robust' && '健壯'}
                        {userRiskProfile.frailtyStatus === 'pre-frail' && '前期體弱'}
                        {userRiskProfile.frailtyStatus === 'frail' && '體弱'}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {userRiskProfile.frailtyStatus === 'robust' && '您的體力狀況良好，繼續保持現有的活動水平。'}
                    {userRiskProfile.frailtyStatus === 'pre-frail' && '您處於前期體弱狀態，建議增加運動和營養攝取。'}
                    {userRiskProfile.frailtyStatus === 'frail' && '您目前處於體弱狀態，需要特別注意安全並進行適當的復康訓練。'}
                  </div>
                </div>

                {/* Risk Factors Summary */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-orange-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">體力狀況</p>
                        <p className="text-xs text-orange-600">需要加強</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">平衡能力</p>
                        <p className="text-xs text-red-600">需要改善</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-purple-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">體弱程度</p>
                        <p className="text-xs text-purple-600">
                          {userRiskProfile.frailtyStatus === 'robust' && '健壯'}
                          {userRiskProfile.frailtyStatus === 'pre-frail' && '前期體弱'}
                          {userRiskProfile.frailtyStatus === 'frail' && '體弱'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">專為您設計的運動計劃</h3>
                <p className="text-blue-700">
                  根據您的評估結果，我們推薦從安全的坐式運動開始，逐步改善平衡和體力
                </p>
              </div>
            </div>

            {/* Featured Program */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="relative">
                <img 
                  src="https://media.istockphoto.com/id/1390751416/photo/asian-chinese-senior-woman-friends-enjoying-home-workout-during-evening-in-apartment-living.jpg?s=612x612&w=0&k=20&c=zfF6PzUHp00AXqI1Du7nPLkJoUsi3utpMZROh2X3I_E=" 
                  alt="Rehabilitation Program" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">個人化復康計劃</h3>
                  <p className="text-sm opacity-90">平衡力 + 肌力提升</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">根據您的評估結果制定的專屬復康方案，包含運動訓練和營養指導</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => window.location.href = '/chatbot-zh'}
                    className="w-full bg-blue-900 text-white py-4 rounded-xl font-medium text-lg"
                  >
                    生成計劃
                  </button>
                </div>
              </div>
            </div>

            {/* Progress History */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">復康記錄</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">平衡力評估</p>
                    <p className="text-sm text-gray-600">2025年1月15日</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">改善 +15%</p>
                    <p className="text-sm text-gray-500">分數: 85/100</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">肌力測試</p>
                    <p className="text-sm text-gray-600">2025年1月12日</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">改善 +12%</p>
                    <p className="text-sm text-gray-500">分數: 78/100</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">整體評估</p>
                    <p className="text-sm text-gray-600">2025年1月8日</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">基線測試</p>
                    <p className="text-sm text-gray-500">分數: 68/100</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'workout':
        return <ExerciseProgramScreen />;
      case 'diet':
        return (
          <>
            {/* Personalized Diet Plan */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">個人化飲食計劃</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Utensils className="w-4 h-4 mr-1" />
                  <span>均衡營養</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500">
                  <h3 className="font-medium text-gray-900 mb-2">🌅 早餐建議</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 燕麥粥配新鮮水果</li>
                    <li>• 低脂牛奶或豆漿</li>
                    <li>• 堅果（杏仁、核桃）</li>
                  </ul>
                  <p className="text-xs text-orange-600 mt-2">富含纖維和蛋白質，提供持久能量</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                  <h3 className="font-medium text-gray-900 mb-2">🍽️ 午餐建議</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 瘦肉或魚類（手掌大小）</li>
                    <li>• 深色蔬菜（菠菜、西蘭花）</li>
                    <li>• 糙米或全麥麵包</li>
                  </ul>
                  <p className="text-xs text-green-600 mt-2">均衡蛋白質和維生素，支持肌肉健康</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <h3 className="font-medium text-gray-900 mb-2">🌙 晚餐建議</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 清蒸魚或豆腐</li>
                    <li>• 蒸蔬菜</li>
                    <li>• 少量優質碳水化合物</li>
                  </ul>
                  <p className="text-xs text-blue-600 mt-2">清淡易消化，促進夜間恢復</p>
                </div>
              </div>
            </div>

            {/* Nutritional Goals */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">營養目標</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-900">1800</div>
                  <div className="text-sm text-gray-600">每日卡路里</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">80g</div>
                  <div className="text-sm text-gray-600">蛋白質</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">1200mg</div>
                  <div className="text-sm text-gray-600">鈣質</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">800IU</div>
                  <div className="text-sm text-gray-600">維生素D</div>
                </div>
              </div>
            </div>

            {/* Hydration Reminder */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">水分補充</h2>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-6 h-6 text-blue-900">💧</div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">每日飲水目標</p>
                    <p className="text-sm text-gray-600">已完成 6/8 杯</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-900">75%</div>
                  <div className="text-sm text-gray-600">完成度</div>
                </div>
              </div>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Rehab 復康中心</h1>
        <p className="text-gray-600">個人化復康計劃，改善您的健康狀況</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          總覽
        </button>
        <button
          onClick={() => setActiveTab('workout')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'workout'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          運動計劃
        </button>
        <button
          onClick={() => setActiveTab('diet')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'diet'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          飲食計劃
        </button>
      </div>

      <div className="px-4 py-6 pb-24">
        {renderScreen()}
      </div>
    </div>
  );
};

export default AssessmentScreen;