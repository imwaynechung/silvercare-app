import React from 'react';
import { Award } from 'lucide-react';

interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  sessions: Array<{
    id: number;
    name: string;
    status: 'completed' | 'current' | 'locked';
    score: number;
    grade: string;
  }>;
}

interface TrainingRecordsProps {
  workoutPlans: WorkoutPlan[];
}

const TrainingRecords: React.FC<TrainingRecordsProps> = ({ workoutPlans }) => {
  return (
    <>
      {/* Training Records Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">訓練記錄與評分</h2>
            <p className="text-purple-100">追蹤您的運動進度和成績</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {workoutPlans.reduce((total, plan) => 
                total + plan.sessions.filter(s => s.status === 'completed').length, 0
              )}
            </div>
            <div className="text-purple-100 text-sm">已完成</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Math.round(
                workoutPlans
                  .flatMap(plan => plan.sessions)
                  .filter(s => s.status === 'completed')
                  .reduce((sum, s) => sum + s.score, 0) / 
                workoutPlans
                  .flatMap(plan => plan.sessions)
                  .filter(s => s.status === 'completed').length
              )}
            </div>
            <div className="text-purple-100 text-sm">平均分數</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {workoutPlans
                .flatMap(plan => plan.sessions)
                .filter(s => s.status === 'completed' && s.grade === 'A').length
              }
            </div>
            <div className="text-purple-100 text-sm">A級成績</div>
          </div>
        </div>
      </div>

      {/* Training Records */}
      <div className="space-y-6 mb-6">
        {workoutPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {plan.sessions.filter(s => s.status === 'completed').length}/{plan.sessions.length} 完成
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(plan.sessions.filter(s => s.status === 'completed').length / plan.sessions.length) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {plan.sessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`p-3 rounded-xl border-l-4 transition-all ${
                    session.status === 'completed' ? 'bg-green-50 border-green-500' :
                    session.status === 'current' ? 'bg-blue-50 border-blue-500' :
                    'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 font-bold text-sm ${
                        session.status === 'completed' ? 'bg-green-100 text-green-700' :
                        session.status === 'current' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {session.id}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{session.name}</h4>
                        <p className="text-sm text-gray-600">
                          {session.status === 'completed' ? '已完成' :
                           session.status === 'current' ? '進行中' :
                           '待解鎖'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {session.status === 'completed' ? (
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className={`text-2xl font-bold ${
                              session.score >= 90 ? 'text-green-600' :
                              session.score >= 80 ? 'text-blue-600' :
                              session.score >= 70 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {session.grade}
                            </div>
                            <div className="text-sm text-gray-500">{session.score}分</div>
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                session.score >= 90 ? 'bg-green-500' :
                                session.score >= 80 ? 'bg-blue-500' :
                                session.score >= 70 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${session.score}%` }}
                            />
                          </div>
                        </div>
                      ) : session.status === 'current' ? (
                        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                          開始訓練
                        </button>
                      ) : (
                        <div className="flex items-center text-gray-400 text-sm">
                          <span className="mr-1">🔒</span>
                          <span>已鎖定</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Plan Summary */}
            {plan.sessions.some(s => s.status === 'completed') && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">平均分數</span>
                  <span className="text-lg font-bold text-purple-600">
                    {Math.round(
                      plan.sessions
                        .filter(s => s.status === 'completed')
                        .reduce((sum, s) => sum + s.score, 0) / 
                      plan.sessions.filter(s => s.status === 'completed').length
                    )}分
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TrainingRecords;