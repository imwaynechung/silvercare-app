import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, AlertTriangle, Clock, Users, TrendingUp } from 'lucide-react';

const AssessmentSelectionScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleFallRiskAssessment = () => {
    // Track selection
    if (typeof gtag !== 'undefined') {
      gtag('event', 'assessment_selection', {
        event_category: 'engagement',
        event_label: 'fall_risk_selected_zh',
        assessment_type: 'fall_risk',
        language: 'zh'
      });
    }
    navigate('/chatbot-zh');
  };

  const handleCognitiveAssessment = () => {
    // Track selection
    if (typeof gtag !== 'undefined') {
      gtag('event', 'assessment_selection', {
        event_category: 'engagement',
        event_label: 'cognitive_selected_zh',
        assessment_type: 'cognitive',
        language: 'zh'
      });
    }
    navigate('/cognitive-assessment');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-4 py-6 flex-shrink-0">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/')}
            className="mr-3 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">自我評估</h1>
            <p className="text-blue-100 text-sm">選擇評估類型</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">選擇評估類型</h2>
          <p className="text-gray-600">
            請選擇您想要進行的評估類型，我們將為您提供專業的分析和建議。
          </p>
        </div>

        {/* Assessment Options */}
        <div className="space-y-4">
          {/* Fall Risk Assessment */}
          <div 
            onClick={handleFallRiskAssessment}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="relative">
              <img 
                src="https://dam.northwell.edu/m/4d3fe0e06d78c830/Drupal-NEWS_falls-older-adult-cane.jpg" 
                alt="跌倒風險評估" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <h3 className="text-lg font-bold">跌倒風險評估</h3>
                <p className="text-sm opacity-90">AI智能分析 + 專業建議</p>
              </div>
              <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                推薦
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                <span className="font-medium text-gray-900">跌倒風險評估</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                透過AI智能分析您的平衡能力、肌力和跌倒風險，提供個人化的預防建議和運動計劃。
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">10分鐘</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">90%準確</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">專業認證</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>立即可用</span>
                </div>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  開始評估
                </button>
              </div>
            </div>
          </div>

          {/* Cognitive Assessment */}
          <div 
            onClick={handleCognitiveAssessment}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 opacity-75"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=200&fit=crop" 
                alt="認知評估" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <h3 className="text-lg font-bold">認知評估</h3>
                <p className="text-sm opacity-90">記憶力 + 專注力測試</p>
              </div>
              <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                可用
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-gray-900">認知能力評估</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                評估記憶力、專注力和認知功能，及早發現認知衰退的徵象，提供腦部健康建議。
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">15分鐘</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">科學驗證</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">專業設計</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>立即可用</span>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  開始評估
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">為什麼要進行評估？</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
              <p className="text-blue-800 text-sm">及早發現健康風險，預防勝於治療</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
              <p className="text-blue-800 text-sm">獲得個人化的健康建議和改善計劃</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
              <p className="text-blue-800 text-sm">追蹤健康狀況，保持最佳狀態</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSelectionScreen;