import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const ChatbotWelcomeZh: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://iili.io/3OCevNn.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <img 
              src="https://iili.io/3rSv1St.png" 
              alt="跌倒風險評估標誌" 
              className="h-16 mx-auto mb-6"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              歡迎進行跌倒風險評估
            </h1>
            <p className="text-xl text-white mb-8">
              感謝您邁出預防跌倒的重要一步。
              接下來的10分鐘，我們將為您進行全面評估。
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg p-6 sm:p-8 mb-8"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={onStart}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white md:py-4 md:text-lg md:px-10 transition-colors hover:bg-[#063275]"
              style={{ backgroundColor: '#08449E' }}
            >
              開始評估
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <p className="mt-4 text-sm text-white">大約需時10分鐘完成</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWelcomeZh;