import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const ChatbotWelcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <img 
            src="https://iili.io/3rSv1St.png" 
            alt="Fall Risk Assessment Logo" 
            className="h-16 mx-auto mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Fall Risk Assessment
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for taking this important step towards fall prevention.
            In the next 10 minutes, we'll guide you through a comprehensive assessment.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Your Journey in 3 Simple Steps
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Initial Screening</h3>
                <p className="text-gray-600">Quick questions about your fall history and general health</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Risk Assessment</h3>
                <p className="text-gray-600">Detailed evaluation of potential fall risk factors</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Personalized Results</h3>
                <p className="text-gray-600">Get your risk level and tailored recommendations</p>
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
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
          >
            Let's Begin Your Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <p className="mt-4 text-sm text-gray-500">Takes approximately 10 minutes to complete</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatbotWelcome;