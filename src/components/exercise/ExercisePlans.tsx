import React from 'react';
import { Award, TrendingUp, Lock } from 'lucide-react';
import { LessonPlan } from '../../types/lessonPlan';

interface ExercisePlansProps {
  levelPlans: {
    level1: LessonPlan | null;
    level2: LessonPlan | null;
    level3: LessonPlan | null;
  };
  loading: boolean;
  onPlanClick: (plan: LessonPlan) => void;
}

const ExercisePlans: React.FC<ExercisePlansProps> = ({ levelPlans, loading, onPlanClick }) => {
  return (
    <>
      {/* Risk Assessment Overview for Programs Tab */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">安全運動計劃</h2>
            <p className="text-green-100">簡單安全，適合在家進行</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {(levelPlans.level1?.duration || 0) + (levelPlans.level2?.duration || 0) + (levelPlans.level3?.duration || 0)}
            </div>
            <div className="text-green-100 text-sm">總運動</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">5</div>
            <div className="text-green-100 text-sm">已完成</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">14%</div>
            <div className="text-green-100 text-sm">完成度</div>
          </div>
        </div>
      </div>

      {/* Exercise Plans */}
      <div className="space-y-4 mb-6">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mx-auto mb-2"></div>
            <p className="text-gray-600">載入訓練計劃中...</p>
          </div>
        )}
        
        {levelPlans.level1 && (
          <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => onPlanClick(levelPlans.level1!)}
          >
            <div className="relative">
              <img 
                src={levelPlans.level1.planImage} 
                alt="Stage 1 Training" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                5/12 進行中
              </div>
              <div className="absolute top-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                坐式運動
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">
                {levelPlans.level1.title.zh_Hant}
              </h3>
              <p className="text-sm text-gray-600 mb-3">安全簡單的坐著運動</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 mr-1 text-green-600">▶</div>
                  <span>進行中</span>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {levelPlans.level2 && (
          <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow opacity-60"
            onClick={() => onPlanClick(levelPlans.level2!)}
          >
            <div className="relative">
              <img 
                src={levelPlans.level2.planImage} 
                alt="Stage 2 Training" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-3 right-3 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                0/12 待開始
              </div>
              <div className="absolute top-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                站立運動
              </div>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">
                {levelPlans.level2.title.zh_Hant}
              </h3>
              <p className="text-sm text-gray-600 mb-3">簡單的站立運動（需要完成坐式運動後開放）</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Lock className="w-4 h-4 mr-1" />
                  <span>完成坐式運動後開放</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {levelPlans.level3 && (
          <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow opacity-50"
            onClick={() => onPlanClick(levelPlans.level3!)}
          >
            <div className="relative">
              <img 
                src={levelPlans.level3.planImage} 
                alt="Stage 3 Training" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-3 right-3 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                0/12 待開始
              </div>
              <div className="absolute top-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                進階運動
              </div>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">
                {levelPlans.level3.title.zh_Hant}
              </h3>
              <p className="text-sm text-gray-600 mb-3">更多運動選擇（需要完成前面運動後開放）</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Lock className="w-4 h-4 mr-1" />
                  <span>完成前面運動後開放</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expected Improvements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">預期改善效果</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">平衡能力提升</p>
              <p className="text-sm text-gray-600">減少跌倒風險，增強日常活動信心</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <div className="w-4 h-4 text-blue-600">💪</div>
            </div>
            <div>
              <p className="font-medium text-gray-900">肌力增強</p>
              <p className="text-sm text-gray-600">改善日常生活功能，提升生活品質</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <div className="w-4 h-4 text-purple-600">😊</div>
            </div>
            <div>
              <p className="font-medium text-gray-900">心情愉悅</p>
              <p className="text-sm text-gray-600">規律運動有助於改善心理健康</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisePlans;