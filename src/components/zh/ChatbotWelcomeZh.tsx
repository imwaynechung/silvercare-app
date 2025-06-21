import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, CheckCircle, TrendingUp, Heart } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const ChatbotWelcomeZh: React.FC<WelcomeProps> = ({ onStart }) => {
  // Mock last assessment data
  const lastAssessment = {
    date: '2025年1月15日',
    riskLevel: '低風險',
    score: 85,
    color: 'text-green-600'
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header with GOFA logo - consistent with other pages */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">
              GOFA <span className="text-blue-200">銀齡樂</span>
            </span>
          </div>
        </div>

        <div className="flex items-center mb-3">
          <h1 className="text-2xl font-bold text-white mr-3">自我評估</h1>
          <div className="bg-white/20 rounded-full p-2">
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-900" />
            </div>
          </div>
        </div>
        <p className="text-blue-100">了解您的跌倒風險，制定個人化預防計劃</p>
      </div>

      <div className="px-4 -mt-2 relative z-10 pb-6">
        {/* Last Assessment Score - moved below header like other pages */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#08449E' }}>
            上次評估結果
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">評估日期</p>
              <p className="text-lg font-medium text-gray-900">{lastAssessment.date}</p>
            </div>
            <div className="flex items-center">
              <div className="text-right mr-3">
                <p className={`text-xl font-bold ${lastAssessment.color}`}>{lastAssessment.riskLevel}</p>
                <p className="text-sm text-gray-600">分數: {lastAssessment.score}/100</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              您的平衡能力比上次評估提升了8%！繼續保持良好的運動習慣。
            </p>
          </div>
        </motion.div>

        {/* Assessment Journey - redesigned to match other pages */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#08449E' }}>
            評估流程
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#08449E' }}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-900">初步篩查</h3>
                <p className="text-sm text-gray-600">了解您的跌倒歷史和整體健康狀況</p>
              </div>
              <div className="text-sm text-gray-500">5分鐘</div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-900">風險評估</h3>
                <p className="text-sm text-gray-600">詳細評估潛在的跌倒風險因素</p>
              </div>
              <div className="text-sm text-gray-500">3分鐘</div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-900">個人化結果</h3>
                <p className="text-sm text-gray-600">獲取風險等級和針對性建議</p>
              </div>
              <div className="text-sm text-gray-500">2分鐘</div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#08449E' }}>
            評估優勢
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold" style={{ color: '#08449E' }}>90%+</div>
              <div className="text-sm text-gray-600">準確度</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">10</div>
              <div className="text-sm text-gray-600">分鐘完成</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">AI</div>
              <div className="text-sm text-gray-600">智能分析</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">免費</div>
              <div className="text-sm text-gray-600">專業評估</div>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pb-8"
        >
          <button
            onClick={onStart}
            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white transition-colors hover:bg-[#063275]"
            style={{ backgroundColor: '#08449E' }}
          >
            開始新評估
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <p className="mt-3 text-center text-sm text-gray-500">大約需時10分鐘完成</p>
          
          {/* Additional Info */}
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800 text-center">
              ✓ 由專業物理治療師設計　✓ 臨床驗證有效　✓ 個人化建議
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatbotWelcomeZh;