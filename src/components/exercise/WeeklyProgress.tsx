import React from 'react';
import { BarChart3 } from 'lucide-react';

const WeeklyProgress: React.FC = () => {
  return (
    <>
      {/* Weekly Progress */}
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">本週運動記錄</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-green-600">5</span>
            </div>
            <p className="text-sm font-medium text-gray-900">次數</p>
            <p className="text-xs text-gray-600">已完成</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-blue-600">75</span>
            </div>
            <p className="text-sm font-medium text-gray-900">總時間</p>
            <p className="text-xs text-gray-600">運動時間</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-purple-600">83%</span>
            </div>
            <p className="text-sm font-medium text-gray-900">完成度</p>
            <p className="text-xs text-gray-600">已達成</p>
          </div>
        </div>
      </div>

      {/* Current Progress */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">復康進度</h2>
            <p className="text-green-100">第3週 - 持續改善中</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-end">
          <span className="text-3xl font-bold">75%</span>
          <span className="ml-2 text-green-100">完成度</span>
        </div>
      </div>
    </>
  );
};

export default WeeklyProgress;