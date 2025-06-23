import React, { useState, useEffect } from 'react';
import { AlertTriangle, Play, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../store/quiz';

interface InstructionProps {
  test: 'sitToStand' | 'tandemStance';
  onComplete?: () => void;
}

const PhysicalAssessmentInstructions: React.FC<InstructionProps> = ({ test, onComplete }) => {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [testPhase, setTestPhase] = useState<'tutorial' | 'countdown' | 'test' | 'results'>('tutorial');
  const [countdown, setCountdown] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const quizStore = useQuizStore();

  useEffect(() => {
    // Track when test phase changes
    if (testPhase !== 'tutorial') {
      gtag('event', 'physical_test_phase', {
        event_category: 'engagement',
        event_label: `${test}_${testPhase}_en`,
        test_type: test,
        phase: testPhase,
        language: 'en'
      });
    }
  }, [testPhase, test]);

  const handleAnswer = (question: string, value: boolean) => {
    // Track test completion
    gtag('event', 'physical_test_complete', {
      event_category: 'engagement',
      event_label: `${test}_complete_en`,
      test_type: test,
      result: value ? 'success' : 'failure',
      language: 'en'
    });

    quizStore.setAnswer(question, value);
    if (onComplete) {
      onComplete();
    }
  };

  const instructions = {
    sitToStand: {
      title: "Sit-to-Stand Test",
      tutorial: [
        {
          title: "Prepare Your Space",
          content: [
            "Find a sturdy chair (17 inches high)",
            "Place against wall",
            "Clear the area",
            "Wear non-slip shoes"
          ],
          image: "https://iili.io/3g5leZQ.jpg"
        },
        {
          title: "Starting Position",
          content: [
            "Sit in middle of chair",
            "Feet flat on floor",
            "Shoulder-width apart",
            "Arms crossed on chest"
          ],
          image: "https://iili.io/3g5leZQ.jpg"
        },
        {
          title: "The Movement",
          content: [
            "Stand up fully",
            "Sit back down",
            "Keep steady pace",
            "Watch your posture"
          ],
          image: "https://iili.io/3g5leZQ.jpg"
        },
        {
          title: "Goals",
          content: [
            "Goal 1: 5 sit-to-stands in 12 seconds",
            "Goal 2: 15 sit-to-stands in 30 seconds"
          ]
        }
      ]
    },
    tandemStance: {
      title: "Tandem Stance Test",
      tutorial: [
        {
          title: "Prepare Your Space",
          content: [
            "Clear flat surface",
            "Non-slip floor",
            "Wall or support nearby",
            "Wear flat shoes"
          ],
          image: "https://iili.io/3g5leZQ.jpg"
        },
        {
          title: "Starting Position",
          content: [
            "Stand heel-to-toe",
            "Arms by sides",
            "Look straight ahead",
            "Stay balanced"
          ],
          image: "https://iili.io/3g5leZQ.jpg"
        },
        {
          title: "The Position",
          content: [
            "Keep feet in line",
            "Maintain posture",
            "Stay still",
            "Focus ahead"
          ],
          image: "https://iili.io/3g5leZQ.jpg"
        },
        {
          title: "Goals",
          content: [
            "Goal 1: Hold position for 22 seconds",
            "Goal 2: Hold position for 30 seconds"
          ]
        }
      ]
    }
  };

  const startTest = () => {
    setTestPhase('countdown');
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTestPhase('test');
          setIsTimerRunning(true);
          return test === 'sitToStand' ? 30 : 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setTestPhase('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const resetTest = () => {
    setTestPhase('tutorial');
    setTutorialStep(0);
    setCountdown(30);
    setIsTimerRunning(false);
  };

  const currentTest = instructions[test];
  const currentTutorial = currentTest.tutorial[tutorialStep];
  const totalSteps = currentTest.tutorial.length;

  if (testPhase === 'countdown') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <motion.div
          key={countdown}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="text-6xl font-bold text-blue-600"
        >
          {countdown}
        </motion.div>
        <p className="mt-4 text-gray-600">Get ready to start...</p>
      </div>
    );
  }

  if (testPhase === 'test') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6">
        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <span className="text-4xl font-bold text-blue-600">{countdown}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Test in Progress</h3>
        <p className="text-gray-600 mb-6">
          {test === 'sitToStand' ? 'Complete as many as you can!' : 'Hold the position!'}
        </p>
        <div className="flex flex-col w-full gap-3 px-4">
          <button
            onClick={resetTest}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Restart Test
          </button>
        </div>
      </div>
    );
  }

  if (testPhase === 'results') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6">
        <h3 className="text-2xl font-bold mb-6">Please answer these questions:</h3>
        <div className="w-full max-w-md">
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">Could you complete 5 sit-to-stands in 12 seconds?</p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  quizStore.setAnswer('sitToStand12', true);
                  onComplete?.();
                }}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  quizStore.setAnswer('sitToStand12', false);
                  onComplete?.();
                }}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
      <div className="px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{currentTest.title}</h3>
          <span className="text-sm text-gray-500">
            Step {tutorialStep + 1} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
          <motion.div
            className="bg-blue-600 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((tutorialStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 pb-20">
        {quizStore.hasFrailty && (
          <div className="mb-3">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                Have someone nearby for safety
              </p>
            </div>
          </div>
        )}

        <motion.div
          key={tutorialStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          {tutorialStep < 3 && (
            <div className="relative w-full pt-[100%] mb-4">
              <img 
                src={currentTutorial.image} 
                alt={currentTutorial.title} 
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          )}

          <div>
            <h4 className="text-base font-semibold text-gray-800 mb-3">{currentTutorial.title}</h4>
            {tutorialStep === 3 ? (
              <div className="space-y-2">
                {currentTutorial.content.map((goal, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-base font-semibold text-blue-800">{goal}</p>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-2">
                {currentTutorial.content.map((item, index) => (
                  <li key={index} className="flex items-center bg-gray-50 p-2 rounded">
                    <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-medium mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex justify-between items-center max-w-md mx-auto z-50">
        <button
          onClick={() => setTutorialStep(prev => Math.max(0, prev - 1))}
          disabled={tutorialStep === 0}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            tutorialStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        
        {tutorialStep === totalSteps - 1 ? (
          <button
            onClick={startTest}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Test
          </button>
        ) : (
          <button
            onClick={() => setTutorialStep(prev => Math.min(totalSteps - 1, prev + 1))}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PhysicalAssessmentInstructions;