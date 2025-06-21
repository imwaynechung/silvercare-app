import React, { useState } from 'react';
import { Brain, Clock, TrendingUp, Play, BarChart3 } from 'lucide-react';
import ChatbotAssessment from '../components/ChatbotAssessment';

const AssessmentScreen: React.FC = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return <ChatbotAssessment onComplete={() => setShowAssessment(false)} />;
  }

  return (
    <div className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Fall Risk Assessment</h1>
        <p className="text-gray-600">Track your progress and identify areas for improvement</p>
      </div>

      {/* Current Risk Level */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Current Risk Level</h2>
            <p className="text-green-100">Last assessed 3 days ago</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-end">
          <span className="text-3xl font-bold">LOW</span>
          <span className="ml-2 text-green-100">Risk</span>
        </div>
      </div>

      {/* Quick Assessment */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Quick Assessment</h2>
            <p className="text-gray-600">Take a 5-minute check-in</p>
          </div>
          <Clock className="w-6 h-6 text-blue-600" />
        </div>
        <button 
          onClick={() => setShowAssessment(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Quick Assessment
        </button>
      </div>

      {/* Assessment History */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Assessment History</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Comprehensive Assessment</p>
              <p className="text-sm text-gray-600">January 15, 2025</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-600">Low Risk</p>
              <p className="text-sm text-gray-500">Score: 85/100</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Quick Check-in</p>
              <p className="text-sm text-gray-600">January 12, 2025</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-600">Low Risk</p>
              <p className="text-sm text-gray-500">Score: 82/100</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Comprehensive Assessment</p>
              <p className="text-sm text-gray-600">January 8, 2025</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-yellow-600">Medium Risk</p>
              <p className="text-sm text-gray-500">Score: 68/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <TrendingUp className="w-3 h-3 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Continue daily balance exercises</p>
              <p className="text-sm text-gray-600">Your balance has improved by 15% this month</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <Brain className="w-3 h-3 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Add cognitive training</p>
              <p className="text-sm text-gray-600">Dual-task exercises can further reduce fall risk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentScreen;