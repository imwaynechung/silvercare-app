import React, { useState } from 'react';
import { Play, Clock, CheckCircle, Star, Target, Calendar } from 'lucide-react';

const ProgramScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exercises' | 'progress'>('exercises');

  return (
    <div className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Training Program</h1>
        <p className="text-gray-600">Personalized exercises to improve your balance and strength</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-lg p-1 mb-6 shadow-sm">
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'exercises'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Exercises
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'progress'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Progress
        </button>
      </div>

      {activeTab === 'exercises' ? (
        <>
          {/* Today's Program */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Today's Program</h2>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>25 min total</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Play className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Balance Training</p>
                    <p className="text-sm text-gray-600">Single leg stands • 10 minutes</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  Start
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <Target className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Strength Training</p>
                    <p className="text-sm text-gray-600">Sit-to-stand • 10 minutes</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  Queue
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <Star className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Cool Down</p>
                    <p className="text-sm text-gray-600">Stretching • 5 minutes</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                  Queue
                </button>
              </div>
            </div>
          </div>

          {/* Exercise Categories */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Exercise Library</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-3">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <p className="font-medium text-gray-900">Balance</p>
                <p className="text-sm text-gray-600">12 exercises</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mb-3">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <p className="font-medium text-gray-900">Strength</p>
                <p className="text-sm text-gray-600">8 exercises</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mb-3">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <p className="font-medium text-gray-900">Flexibility</p>
                <p className="text-sm text-gray-600">6 exercises</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mb-3">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <p className="font-medium text-gray-900">Seated</p>
                <p className="text-sm text-gray-600">10 exercises</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Progress Overview */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">This Week's Progress</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-blue-600">5</span>
                </div>
                <p className="text-sm font-medium text-gray-900">Sessions</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-green-600">125</span>
                </div>
                <p className="text-sm font-medium text-gray-900">Minutes</p>
                <p className="text-xs text-gray-600">Exercised</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-purple-600">85%</span>
                </div>
                <p className="text-sm font-medium text-gray-900">Goal</p>
                <p className="text-xs text-gray-600">Achieved</p>
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Balance Training</p>
                    <p className="text-sm text-gray-600">Today • 25 minutes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Completed</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Strength & Flexibility</p>
                    <p className="text-sm text-gray-600">Yesterday • 20 minutes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Completed</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <Star className="w-3 h-3 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgramScreen;