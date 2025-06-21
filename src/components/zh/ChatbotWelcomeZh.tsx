import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, CheckCircle, TrendingUp, ArrowLeft, Bell, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WelcomeProps {
  onStart: () => void;
}

const ChatbotWelcomeZh: React.FC<WelcomeProps> = ({ onStart }) => {
  const navigate = useNavigate();

  // Mock last assessment data
  const lastAssessment = {
    date: '2025年1月15日',
    riskLevel: '低風險',
    score: 85,
    color: 'text-green-600'
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header with gradient background matching ProgramScreen */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="mr-3 p-2 bg-white/20 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center">
            <img 
              src="https://iili.io/3rSv1St.png" 
              alt="GOFA Logo" 
              className="h-8 w-auto mr-2"
            />
          </div>
        </div>

        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold text-white mr-4">您好，健樂</h2>
          <div className="bg-white/20 rounded-full p-3">
            <div className="w-16 h-16 bg-white rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="ml-auto">
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        <p className="text-blue-100">歡迎來到 GOFA 銀齡樂</p>
      </div>

      <div className="px-4 -mt-6 relative z-10 pb-6">
        {/* Last Assessment Score Card - overlapping header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
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

        {/* Three Simple Steps Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#08449E' }}>
            三個簡單步驟，開始您的評估之旅
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E6EEF8' }}>
                <Shield className="w-5 h-5" style={{ color: '#08449E' }} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">初步篩查</h3>
                <p className="text-gray-600">簡單了解您的跌倒歷史和整體健康狀況</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E6EEF8' }}>
                <Clock className="w-5 h-5" style={{ color: '#08449E' }} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">風險評估</h3>
                <p className="text-gray-600">詳細評估潛在的跌倒風險因素</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E6EEF8' }}>
                <CheckCircle className="w-5 h-5" style={{ color: '#08449E' }} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">個人化結果</h3>
                <p className="text-gray-600">獲取您的風險等級和針對性建議</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start Assessment Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center pb-8"
        >
          <button
            onClick={onStart}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white transition-colors hover:bg-[#063275] w-full"
            style={{ backgroundColor: '#08449E' }}
          >
            開始新評估
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <p className="mt-4 text-sm text-gray-500">大約需時10分鐘完成</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatbotWelcomeZh;