import React, { useState } from 'react';
import { Brain, Clock, TrendingUp, Play, BarChart3, ArrowLeft, FileText } from 'lucide-react';
import ChatbotAssessment from '../components/ChatbotAssessment';

const AssessmentScreen: React.FC = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (showAssessment) {
    return <ChatbotAssessment onComplete={() => setShowAssessment(false)} />;
  }

  if (showDetails) {
    return (
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b flex items-center">
          <button 
            onClick={() => setShowDetails(false)}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">健康檢測內容</h1>
        </div>

        <div className="px-4 py-6 pb-20">
          {/* Hero Image */}
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop" 
              alt="Fall Risk Assessment" 
              className="w-full h-48 object-cover rounded-2xl"
            />
          </div>

          {/* Title and Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">長者跌倒風險檢測</h2>
            <p className="text-gray-600 mb-4">主要識別的狀況</p>
            
            <div className="bg-blue-900 text-white px-4 py-2 rounded-lg inline-block mb-6">
              跌倒風險機率
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">簡介</h3>
            <p className="text-gray-700 leading-relaxed">
              評估長者柔軟度及整體肌力功能，識別潛在的跌倒風險機率，以推斷可能出現的損傷或狀況。
            </p>
          </div>

          {/* Assessment Content */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">檢測內容</h3>
              <p className="text-sm text-gray-600">共5項評估，大約15分鐘</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-blue-900" />
                </div>
                <p className="font-medium text-gray-900 mb-1">自我檢測問卷 x1</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <div className="w-8 h-8 text-blue-900">🏃‍♂️</div>
                </div>
                <p className="font-medium text-gray-900 mb-1">智能動態檢測 x4</p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => setShowAssessment(true)}
            className="w-full bg-blue-900 text-white py-4 rounded-2xl font-medium text-lg"
          >
            開始檢測
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">健康檢測</h1>
        <p className="text-gray-600">追蹤您的進度並識別改善領域</p>
      </div>

      <div className="px-4 py-6 pb-20">
        {/* Current Risk Level */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">目前風險等級</h2>
              <p className="text-green-100">3天前最後評估</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold">低</span>
            <span className="ml-2 text-green-100">風險</span>
          </div>
        </div>

        {/* Featured Assessment */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
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
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-4">評估長者柔軟度及整體肌力功能，識別潛在的跌倒風險機率</p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowDetails(true)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
              >
                查看詳情
              </button>
              <button 
                onClick={() => setShowAssessment(true)}
                className="flex-1 bg-blue-900 text-white py-3 rounded-xl font-medium"
              >
                開始檢測
              </button>
            </div>
          </div>
        </div>

        {/* Assessment History */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">評估記錄</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">全面評估</p>
                <p className="text-sm text-gray-600">2025年1月15日</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">低風險</p>
                <p className="text-sm text-gray-500">分數: 85/100</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">快速檢查</p>
                <p className="text-sm text-gray-600">2025年1月12日</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">低風險</p>
                <p className="text-sm text-gray-500">分數: 82/100</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">全面評估</p>
                <p className="text-sm text-gray-600">2025年1月8日</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-yellow-600">中等風險</p>
                <p className="text-sm text-gray-500">分數: 68/100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">建議</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <TrendingUp className="w-3 h-3 text-blue-900" />
              </div>
              <div>
                <p className="font-medium text-gray-900">繼續每日平衡運動</p>
                <p className="text-sm text-gray-600">您的平衡能力本月已改善15%</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <Brain className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">增加認知訓練</p>
                <p className="text-sm text-gray-600">雙重任務運動可進一步降低跌倒風險</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentScreen;