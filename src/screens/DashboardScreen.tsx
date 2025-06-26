import React, { useState, useEffect } from 'react';
import { LessonPlanService } from '../services/lessonPlanService';
import { LessonPlan } from '../types/lessonPlan';
import TodayExercise from '../components/exercise/TodayExercise';
import WeeklyProgress from '../components/exercise/WeeklyProgress';
  const [activeTab, setActiveTab] = useState<'today' | 'programs' | 'records'>('today');
import ExercisePlans from '../components/exercise/ExercisePlans';
import TrainingRecords from '../components/exercise/TrainingRecords';
import PlanDetail from '../components/exercise/PlanDetail';

const ExerciseProgramScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'programs' | 'records'>('today');
  const [showProgramDetail, setShowProgramDetail] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<LessonPlan | null>(null);
  const [todaysLesson, setTodaysLesson] = useState<{
    title: string;
    description: string;
    duration: number;
    planName: string;
    stage: string;
    lessonNumber: number;
    imageUrl: string;
  } | null>(null);
  const [levelPlans, setLevelPlans] = useState<{
    level1: LessonPlan | null;
    level2: LessonPlan | null;
    level3: LessonPlan | null;
  }>({ level1: null, level2: null, level3: null });
  const [loading, setLoading] = useState(false);

  // Mock workout plans data for training records
  const workoutPlans = [
    {
      id: 1,
      name: '基礎平衡訓練',
      description: '改善平衡能力的基礎訓練課程',
      sessions: [
        { id: 1, name: '坐式平衡練習', status: 'completed', score: 85, grade: 'B' },
        { id: 2, name: '站立平衡練習', status: 'completed', score: 78, grade: 'B' },
        { id: 3, name: '動態平衡練習', status: 'current', score: 0, grade: '' },
        { id: 4, name: '進階平衡挑戰', status: 'locked', score: 0, grade: '' }
      ]
    },
    {
      id: 2,
      name: '肌力強化訓練',
      description: '針對核心肌群和下肢的強化訓練',
      sessions: [
        { id: 1, name: '上肢肌力訓練', status: 'completed', score: 92, grade: 'A' },
        { id: 2, name: '下肢肌力訓練', status: 'completed', score: 88, grade: 'B' },
        { id: 3, name: '核心穩定訓練', status: 'locked', score: 0, grade: '' },
        { id: 4, name: '全身協調訓練', status: 'locked', score: 0, grade: '' }
      ]
    },
    {
      id: 3,
      name: '柔韌性提升',
      description: '增加關節活動度和肌肉柔韌性',
      sessions: [
        { id: 1, name: '頸部伸展', status: 'completed', score: 90, grade: 'A' },
        { id: 2, name: '肩膀放鬆', status: 'locked', score: 0, grade: '' },
        { id: 3, name: '腰背伸展', status: 'locked', score: 0, grade: '' },
        { id: 4, name: '腿部拉伸', status: 'locked', score: 0, grade: '' }
      ]
    }
  ];

  // Mock workout plans data for training records
  const workoutPlans = [
    {
      id: 1,
      name: '基礎平衡訓練',
      description: '改善平衡能力的基礎訓練課程',
      sessions: [
        { id: 1, name: '坐式平衡練習', status: 'completed' as const, score: 85, grade: 'B' },
        { id: 2, name: '站立平衡練習', status: 'completed' as const, score: 78, grade: 'B' },
        { id: 3, name: '動態平衡練習', status: 'current' as const, score: 0, grade: '' },
        { id: 4, name: '進階平衡挑戰', status: 'locked' as const, score: 0, grade: '' }
      ]
    },
    {
      id: 2,
      name: '肌力強化訓練',
      description: '針對核心肌群和下肢的強化訓練',
      sessions: [
        { id: 1, name: '上肢肌力訓練', status: 'completed' as const, score: 92, grade: 'A' },
        { id: 2, name: '下肢肌力訓練', status: 'completed' as const, score: 88, grade: 'B' },
        { id: 3, name: '核心穩定訓練', status: 'locked' as const, score: 0, grade: '' },
        { id: 4, name: '全身協調訓練', status: 'locked' as const, score: 0, grade: '' }
      ]
    },
    {
      id: 3,
      name: '柔韌性提升',
      description: '增加關節活動度和肌肉柔韌性',
      sessions: [
        { id: 1, name: '頸部伸展', status: 'completed' as const, score: 90, grade: 'A' },
        { id: 2, name: '肩膀放鬆', status: 'locked' as const, score: 0, grade: '' },
        { id: 3, name: '腰背伸展', status: 'locked' as const, score: 0, grade: '' },
        { id: 4, name: '腿部拉伸', status: 'locked' as const, score: 0, grade: '' }
      ]
    }
  ];

  useEffect(() => {
    const fetchLevelPlans = async () => {
      setLoading(true);
      try {
        const plans = await LessonPlanService.getLevelBasedPlans();
        setLevelPlans(plans);
        
        // Set today's lesson from the first available plan
        if (plans.level1) {
          await setTodaysLessonFromPlan(plans.level1);
        }
      } catch (error) {
        console.error('Failed to fetch lesson plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevelPlans();
  }, []);

  const setTodaysLessonFromPlan = async (plan: LessonPlan) => {
    try {
      // If we have detailed lesson data, use the first lesson
      if (plan.lessonsData && plan.lessonsData.length > 0) {
        const firstLesson = plan.lessonsData[0];
        setTodaysLesson({
          title: '輕鬆坐式運動',
          description: '安全舒適的坐著運動，幫助您保持活力',
          duration: firstLesson.duration,
          planName: plan.title.zh_Hant,
          stage: '第一階段',
          lessonNumber: 1,
          imageUrl: firstLesson.thumbImageUrl || firstLesson.imageUrl
        });
      } else {
        // Fallback to mock lesson data
        setTodaysLesson({
          title: '輕鬆坐式運動',
          description: '安全舒適的坐著運動，幫助您保持活力',
          duration: 15,
          planName: plan.title.zh_Hant,
          stage: '第一階段',
          lessonNumber: 1,
          imageUrl: plan.planImage
        });
      }
    } catch (error) {
      console.error('Failed to set today\'s lesson:', error);
    }
  };

  const handlePlanClick = async (plan: LessonPlan) => {
    setLoading(true);
    try {
      // Fetch detailed plan with lessons data
      const detailedPlan = await LessonPlanService.getLessonPlan(plan.id);
      setSelectedPlan(detailedPlan);
      setShowProgramDetail(true);
    } catch (error) {
      console.error('Failed to fetch plan details:', error);
      // Fallback to basic plan data
      setSelectedPlan(plan);
      setShowProgramDetail(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromDetail = () => {
    setShowProgramDetail(false);
    setSelectedPlan(null);
  };

  if (showProgramDetail && selectedPlan) {
    return <PlanDetail selectedPlan={selectedPlan} onBack={handleBackFromDetail} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Fixed */}
      <div className="bg-white px-4 py-6 border-b flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">輕鬆運動</h1>
        <p className="text-gray-600">安全簡單的坐著運動，適合在家進行</p>
      </div>

      {/* Tab Navigation - Fixed */}
      <div className="flex bg-white border-b flex-shrink-0">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'today'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          今日運動
        </button>
        <button
          onClick={() => setActiveTab('programs')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'programs'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          運動計劃
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'records'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          訓練記錄
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'records'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          訓練記錄
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 pb-8">
          {activeTab === 'today' ? (
            <>
              <TodayExercise todaysLesson={todaysLesson} />
              <WeeklyProgress />
              <CurrentPlanInfo todaysLesson={todaysLesson} />
            </>
          ) : activeTab === 'programs' ? (
            <ExercisePlans 
              levelPlans={levelPlans} 
              loading={loading} 
              onPlanClick={handlePlanClick} 
            />
          ) : (
            <TrainingRecords workoutPlans={workoutPlans} />
          )}
          ) : activeTab === 'records' ? (
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
                {workoutPlans.map((plan, planIndex) => (
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
                      {plan.sessions.map((session, sessionIndex) => (
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
        </div>
      </div>
    </div>
  );
};

export default ExerciseProgramScreen;