import React from 'react';
import { Heart, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

const DashboardScreen: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Good morning, Margaret</h1>
        <p className="text-gray-600">Here's your health overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs text-gray-500">This week</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">85%</p>
          <p className="text-sm text-gray-600">Balance Score</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-gray-500">Streak</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600">Days Active</p>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Activities</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Heart className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Morning Balance Exercise</p>
                <p className="text-sm text-gray-600">10 minutes • Beginner</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
              Start
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Weekly Assessment</p>
                <p className="text-sm text-gray-600">5 minutes • Due today</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
              Take
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Completed balance training</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Assessment score improved</p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Family member checked in</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;