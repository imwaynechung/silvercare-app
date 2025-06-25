import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Activity, Clock, Users, CheckCircle, Star } from 'lucide-react';

const AssessmentSelectionScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleFallRiskAssessment = () => {
    // Track selection
    if (typeof gtag !== 'undefined') {
      gtag('event', 'assessment_selection', {
        event_category: 'engagement',
        event_label: 'fall_risk_selected',
        assessment_type: 'fall_risk'
      });
    }
    navigate('/chatbot-zh');
  };

  const handleCognitiveAssessment = () => {
    // Track selection
    if (typeof gtag !== 'undefined') {
      gtag('event', 'assessment_selection', {
        event_category: 'engagement',
        event_label: 'cognitive_selected',
        assessment_type: 'cognitive'
      });
    }
    // For now, show coming soon alert - you can implement this later
    alert('認知評估功能即將推出，敬請期待！');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex items-center flex-shrink-0">
        <button 
          onClick={() => navigate('/')}
          className="mr-3 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">選擇評估類型</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Introduction */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-blue-900" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">專業健康評估</h2>
          <p className="text-gray-600">
            選擇適合您的評估類型，獲得個人化的健康建議
          </p>
        </div>

        {/* Assessment Options */}
        <div className="space-y-4 mb-8">
          {/* Fall Risk Assessment */}
          <div 
            onClick={handleFallRiskAssessment}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=150&fit=crop" 
                alt="Fall Risk Assessment" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-3 left-3 bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                推薦
              </div>
              <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                免費
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Activity className="w-6 h-6 text-blue-900 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">跌倒風險評估</h3>
              </div>
              <p className="text-gray-600 mb-4">
                全面評估您的跌倒風險，包括平衡力、肌力和日常活動能力測試
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">10分鐘</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">專業認證</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">90%準確</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>平衡力測試</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>肌力評估</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>個人化建議</span>
                </div>
              </div>

              <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors">
                開始評估
              </button>
            </div>
          </div>

          {/* Cognitive Assessment */}
          <div 
            onClick={handleCognitiveAssessment}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow opacity-75"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=150&fit=crop" 
                alt="Cognitive Assessment" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                即將推出
              </div>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/90 px-4 py-2 rounded-lg">
                  <span className="text-gray-800 font-medium">即將推出</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Brain className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">認知能力評估</h3>
              </div>
              <p className="text-gray-600 mb-4">
                評估記憶力、注意力和認知功能，及早發現認知能力變化
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">15分鐘</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">專業認證</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">科學驗證</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>記憶力測試</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>注意力評估</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>認知訓練建議</span>
                </div>
              </div>

              <button 
                disabled
                className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-medium cursor-not-allowed"
              >
                即將推出
              </button>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">為什麼要進行評估？</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-sm">1</span>
              </div>
              <div>
                <p className="font-medium text-blue-900">及早發現風險</p>
                <p className="text-blue-700 text-sm">在問題出現前識別潛在風險</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-sm">2</span>
              </div>
              <div>
                <p className="font-medium text-blue-900">個人化建議</p>
                <p className="text-blue-700 text-sm">根據評估結果提供專屬建議</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-sm">3</span>
              </div>
              <div>
                <p className="font-medium text-blue-900">持續追蹤</p>
                <p className="text-blue-700 text-sm">定期評估，監測健康變化</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSelectionScreen;