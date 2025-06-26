import React from 'react';

interface CurrentPlanInfoProps {
  todaysLesson: {
    planName: string;
  } | null;
}

const CurrentPlanInfo: React.FC<CurrentPlanInfoProps> = ({ todaysLesson }) => {
  if (!todaysLesson) return null;

  return (
    <div className="bg-blue-50 rounded-2xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">您的運動計劃</h3>
      <p className="text-blue-800 font-medium">{todaysLesson.planName}</p>
      <p className="text-blue-600 text-sm mt-1">
        專為長者設計的安全運動，所有動作都可以坐著完成
      </p>
    </div>
  );
};

export default CurrentPlanInfo;