import React from 'react';
import { Play, Clock, Target } from 'lucide-react';

interface TodayExerciseProps {
  todaysLesson: {
    title: string;
    description: string;
    duration: number;
    planName: string;
    stage: string;
    lessonNumber: number;
    imageUrl: string;
  } | null;
}

const TodayExercise: React.FC<TodayExerciseProps> = ({ todaysLesson }) => {
  return (
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
    </>
  );
};

export default TodayExercise;