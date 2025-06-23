import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, CheckCircle, TrendingUp, ArrowLeft } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
  onBack?: () => void;
}

const ChatbotWelcomeZh: React.FC<WelcomeProps> = ({ onStart, onBack }) => {
  // Mock last assessment data - in real app, this would come from API/database
  const lastAssessment = {
    date: '2025年1月15日',
    riskLevel: '低風險',
    score: 85,
    color: 'text-green-600'
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header with back button */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回
        </button>
        <div className="flex items-center">
          <img 
            src="https://iili.io/3rSv1St.png" 
            alt="GOFA Logo" 
            className="h-8 w-auto"
          />
        </div>
        <div className="w-16"></div> {/* Spacer for centering */}
      </div>

      <div className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            跌倒風險評估
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            感謝您邁出預防跌倒的重要一步。
            接下來的10分鐘，我們將為您進行全面評估。
          </p>
        </motion.div>

        {/* Last Assessment Score - Enhanced Design */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: '#08449E' }}>
                上次評估結果
              </h2>
              <p className="text-sm text-gray-600">{lastAssessment.date}</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-2xl font-bold ${lastAssessment.color}`}>{lastAssessment.riskLevel}</p>
                <p className="text-sm text-gray-600">整體評分: {lastAssessment.score}/100</p>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">+8%</div>
                    <div className="text-xs text-gray-500">改善</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-green-800">
              💪 您的平衡能力比上次評估提升了8%！繼續保持良好的運動習慣。
            </p>
          </div>
        </motion.div>

        {/* Assessment Journey Steps - Enhanced */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">3</span>
            </div>
            <h2 className="text-xl font-semibold" style={{ color: '#08449E' }}>
              三個簡單步驟，開始您的評估之旅
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#08449E' }}>
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">初步篩查</h3>
                <p className="text-gray-600 text-sm">簡單了解您的跌倒歷史和整體健康狀況</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#08449E' }}>
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">風險評估</h3>
                <p className="text-gray-600 text-sm">詳細評估潛在的跌倒風險因素</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#08449E' }}>
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">個人化結果</h3>
                <p className="text-gray-600 text-sm">獲取您的風險等級和針對性建議</p>
              </div>
            </div>
          </div>
        </motion.div>
          
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#08449E' }}>
            為什麼要進行評估？
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-700 text-sm">及早發現跌倒風險，預防勝於治療</p>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-700 text-sm">獲得個人化運動和生活建議</p>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-700 text-sm">追蹤改善進度，保持健康活力</p>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center pb-8"
        >
          <button
            onClick={onStart}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white transition-all hover:bg-[#063275] w-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{ backgroundColor: '#08449E' }}
          >
            開始新評估
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <p className="mt-4 text-sm text-gray-500">大約需時10分鐘完成</p>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default ChatbotWelcomeZh;