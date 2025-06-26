import React from 'react';
import { Play, Clock } from 'lucide-react';

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
    </>
  );
};

export default TodayExercise;