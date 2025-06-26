import React, { useState, useEffect } from 'react';
import { Play, Clock, CheckCircle, Star, Target, Calendar, ArrowLeft, Award, TrendingUp, Lock } from 'lucide-react';
import { LessonPlanService } from '../services/lessonPlanService';
import { LessonPlan } from '../types/lessonPlan';

const ExerciseProgramScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'programs'>('today');
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

  // Mock past rehabilitation records data
  const pastRecords = [
    {
      id: '1',
      date: '2025年1月15日',
      lessonTitle: '坐式平衡訓練 - 第5課',
      duration: 15,
      score: 85,
      category: '平衡訓練',
      status: 'completed',
      improvements: ['平衡力提升 +12%', '核心穩定性改善']
    },
    {
      id: '2', 
      date: '2025年1月12日',
      lessonTitle: '坐式肌力強化 - 第4課',
      duration: 18,
      score: 78,
      category: '肌力訓練',
      status: 'completed',
      improvements: ['下肢力量增強 +8%']
    },
    {
      id: '3',
      date: '2025年1月10日',
      lessonTitle: '坐式伸展運動 - 第3課',
      duration: 12,
      score: 92,
      category: '柔韌性',
      status: 'completed',
      improvements: ['關節活動度提升 +15%', '肌肉放鬆改善']
    }
  ];

  const averageScore = Math.round(pastRecords.reduce((sum, record) => sum + record.score, 0) / pastRecords.length);

  React.useEffect(() => {
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

  if (showProgramDetail && selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header - Fixed */}
        <div className="bg-white px-4 py-3 border-b flex items-center flex-shrink-0">
          <button 
            onClick={() => {
              setShowProgramDetail(false);
              setSelectedPlan(null);
            }}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">計劃詳情</h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 pb-8">
            {/* Plan Header */}
            <div className="mb-6">
              <img 
                src={selectedPlan.planImage} 
                alt={selectedPlan.title.zh_Hant} 
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                {selectedPlan.title.zh_Hant}
              </h2>
              <p className="text-gray-600 mb-4">
                專為長者設計的安全運動計劃，所有動作都可以坐著完成，讓您安心運動
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPlan.targetAreas.map((area, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="bg-blue-900 text-white px-4 py-2 rounded-lg inline-block mb-6">
                {selectedPlan.duration} 個簡單課程
              </div>
            </div>

            {/* Plan Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-blue-900">{selectedPlan.duration}</div>
                <div className="text-sm text-gray-600">簡單課程</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-green-600">
                  {selectedPlan.lessonsData ? selectedPlan.lessonsData.reduce((total, lesson) => total + lesson.duration, 0) : selectedPlan.duration * 15}
                </div>
                <div className="text-sm text-gray-600">總時間（分鐘）</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedPlan.tags.length}
                </div>
                <div className="text-sm text-gray-600">運動種類</div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">運動內容</h3>
              
              {selectedPlan.lessonsData && selectedPlan.lessonsData.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {selectedPlan.lessonsData.map((lesson, index) => (
                    <div key={lesson.id || index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="relative">
                        <img 
                          src={lesson.thumbImageUrl || lesson.imageUrl} 
                          alt="坐式運動" 
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {lesson.duration}分鐘
                        </div>
                        <div className="absolute top-2 left-2 bg-blue-900/80 text-white px-2 py-1 rounded text-xs">
                          第{index + 1}個
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                          坐式運動 {index + 1}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          安全簡單的坐著運動
                        </p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center text-xs text-gray-500">
                            <Star className="w-3 h-3 mr-1 text-yellow-500" />
                            <span>強度 {lesson.intensity}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Fallback for plans without detailed lesson data
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: selectedPlan.duration }, (_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="relative">
                        <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <Play className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          15分鐘
                        </div>
                        <div className="absolute top-2 left-2 bg-blue-900/80 text-white px-2 py-1 rounded text-xs">
                          第{index + 1}個
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          課程 {index + 1}
                        </h4>
                        <p className="text-xs text-gray-600">
                          安全簡單的坐著運動
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Start Button */}
            <div className="sticky bottom-0 bg-gray-50 pt-4 pb-4">
              <button
                className="w-full bg-blue-900 text-white py-4 rounded-2xl font-medium text-lg"
              >
                開始運動
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
          復康記錄
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 pb-8">
          {activeTab === 'today' ? (
            <>              
              {/* Today's Exercise */}
              <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
                {todaysLesson?.imageUrl && (
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src={todaysLesson.imageUrl} 
                      alt="Today's lesson background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">今日運動</h2>
                    <p className="text-blue-100">
                      {todaysLesson?.stage || '第一階段'} - 第 {todaysLesson?.lessonNumber || 1} 個
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {todaysLesson?.title || '輕鬆坐式運動'}
                </h3>
                <p className="text-blue-100 mb-4">
                  {todaysLesson?.description || '安全舒適的坐著運動，幫助您保持活力'}
                </p>
                <div className="flex items-center text-sm text-blue-100">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>預計時間：{todaysLesson?.duration || 15}分鐘</span>
                </div>
                </div>
              </div>

              {/* Today's Exercise Program */}
              <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">運動內容</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="w-4 h-4 mr-1" />
                    <span>輕鬆簡單</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-l-4 border-blue-900">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-900 font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">輕鬆熱身</p>
                        <p className="text-sm text-gray-600">坐著輕輕活動手腳 • 3分鐘</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium">
                      開始
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-600 font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {todaysLesson?.title || '坐式運動'}
                        </p>
                        <p className="text-sm text-gray-600">
                          安全簡單的坐著運動 • {Math.max((todaysLesson?.duration || 15) - 5, 8)}分鐘
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                      排隊
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-600 font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">輕鬆放鬆</p>
                        <p className="text-sm text-gray-600">坐著放鬆、深呼吸 • 2分鐘</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                      排隊
                    </button>
                  </div>
                </div>
              </div>

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

              {/* Current Plan Info */}
              {todaysLesson && (
                <div className="bg-blue-50 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">您的運動計劃</h3>
                  <p className="text-blue-800 font-medium">{todaysLesson.planName}</p>
                  <p className="text-blue-600 text-sm mt-1">
                    專為長者設計的安全運動，所有動作都可以坐著完成
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Past Rehabilitation Records Overview */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">復康進度總覽</h2>
                    <p className="text-green-100">您的運動成果和改善記錄</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {pastRecords.length}
                    </div>
                    <div className="text-green-100 text-sm">已完成課程</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{averageScore}</div>
                    <div className="text-green-100 text-sm">平均分數</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{pastRecords.reduce((sum, record) => sum + record.duration, 0)}</div>
                    <div className="text-green-100 text-sm">總運動時間(分)</div>
                  </div>
                </div>
              </div>

              {/* Past Rehabilitation Records */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">復康記錄</h2>
                <div className="space-y-4">
                  {pastRecords.map((record) => (
                    <div key={record.id} className="bg-white rounded-2xl shadow-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className={`w-3 h-3 rounded-full mr-2 ${
                              record.score >= 90 ? 'bg-green-500' :
                              record.score >= 75 ? 'bg-blue-500' :
                              record.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <h3 className="font-bold text-gray-900">{record.lessonTitle}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{record.date}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{record.duration}分鐘</span>
                            </div>
                            <div className="flex items-center">
                              <Target className="w-4 h-4 mr-1" />
                              <span>{record.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            record.score >= 90 ? 'text-green-600' :
                            record.score >= 75 ? 'text-blue-600' :
                            record.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {record.score}
                          </div>
                          <div className="text-xs text-gray-500">分數</div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              record.score >= 90 ? 'bg-green-500' :
                              record.score >= 75 ? 'bg-blue-500' :
                              record.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${record.score}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Improvements */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">改善成果：</h4>
                        <div className="space-y-1">
                          {record.improvements.map((improvement, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-700">
                              <TrendingUp className="w-3 h-3 text-green-500 mr-2" />
                              <span>{improvement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 mb-4">整體進步趨勢</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">+18%</div>
                    <div className="text-sm text-gray-600">平衡力改善</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">+15%</div>
                    <div className="text-sm text-gray-600">肌力提升</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">+22%</div>
                    <div className="text-sm text-gray-600">柔韌性增加</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">-35%</div>
                    <div className="text-sm text-gray-600">跌倒風險降低</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseProgramScreen;