import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { LessonPlan } from '../../types/lessonPlan';

interface PlanDetailProps {
  selectedPlan: LessonPlan;
  onBack: () => void;
}

const PlanDetail: React.FC<PlanDetailProps> = ({ selectedPlan, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Fixed */}
      <div className="bg-white px-4 py-3 border-b flex items-center flex-shrink-0">
        <button 
          onClick={onBack}
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
                        <div className="w-8 h-8 text-blue-600">▶</div>
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
};

export default PlanDetail;