import React, { useState } from 'react';
import PhysicalAssessmentInstructionsZh from './PhysicalAssessmentInstructionsZh';

type TestType = 'sitToStand' | 'tandemStance' | 'singleLeg' | null;

interface PhysicalAssessmentProps {
  onComplete?: () => void;
}

const PhysicalAssessment: React.FC<PhysicalAssessmentProps> = ({ onComplete }) => {
  const [currentTest, setCurrentTest] = useState<TestType>('sitToStand');

  const handleNextTest = (nextTest: TestType) => {
    setCurrentTest(nextTest);
  };

  const handleComplete = () => {
    onComplete?.();
  };

  return (
    <PhysicalAssessmentInstructionsZh
      test={currentTest}
      onNextTest={handleNextTest}
      onComplete={handleComplete}
    />
  );
};

export default PhysicalAssessment;