import React, { useState, useEffect } from 'react';
import { AlertTriangle, Play, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../../store/quiz';

interface InstructionProps {
  test: 'sitToStand' | 'tandemStance' | 'tandemWalk' | 'singleLeg' | null;
  onComplete?: () => void;
  onNextTest?: (nextTest: 'sitToStand' | 'tandemStance' | 'tandemWalk' | 'singleLeg' | null) => void;
}

const PhysicalAssessmentInstructionsZh: React.FC<InstructionProps> = ({ test, onComplete, onNextTest }) => {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [testPhase, setTestPhase] = useState<'tutorial' | 'countdown' | 'test' | 'results'>('tutorial');
  const [countdown, setCountdown] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const quizStore = useQuizStore();

  const questionsPerTest: Record<string, { label: string; field: string }[]> = {
    sitToStand: [
      { label: '您能在12秒內完成5次坐站動作嗎？', field: 'sitToStand12' },
      { label: '您能在30秒內完成15次坐站動作嗎？', field: 'sitToStand30' }
    ],
    tandemStance: [
      { label: '您能保持串聯步姿勢22秒嗎？', field: 'tandemStance22' },
      { label: '您能保持串聯步姿勢30秒嗎？', field: 'tandemStance30' }
    ],
    tandemWalk: [
      { label: '您能完成3步串聯步行嗎？', field: 'tandemWalk' }
    ],
    singleLeg: [
      { label: '您能保持單腿站立6.5秒或以上嗎？', field: 'singleLimbStance' }
    ]
  };

  const instructions = {
    sitToStand: {
      title: '坐站測試',
      tutorial: [
        { title: '準備場地', content: ['找穩固椅子（43厘米高）', '椅子靠牆放置', '清理周圍空間', '穿防滑鞋'], image: 'https://iili.io/3g5leZQ.jpg' },
        { title: '起始姿勢', content: ['坐在椅子中間', '雙腳平放地上', '雙腳與肩同寬', '雙臂交叉胸前'], image: 'https://iili.io/3g5leZQ.jpg' },
        { title: '動作要領', content: ['完全站起', '慢慢坐下', '保持穩定', '注意姿勢'], image: 'https://iili.io/3g5leZQ.jpg' },
        { title: '目標', content: ['目標一：12秒內完成5次坐站', '目標二：30秒內完成15次坐站'] }
      ],
      nextTest: 'tandemStance'
    },
    tandemStance: {
      title: '串聯步姿勢測試',
      tutorial: [
        { title: '準備場地', content: ['找平坦地面', '確保防滑', '附近有牆或支撐', '穿平底鞋'], image: 'https://iili.io/3gVkgne.jpg' },
        { title: '起始姿勢', content: ['一腳腳跟貼另一腳腳尖', '雙手叉腰', '目視前方', '保持平衡'], image: 'https://iili.io/3gVkgne.jpg' },
        { title: '姿勢要求', content: ['雙腳保持一直線', '維持姿勢', '保持靜止', '專注前方'], image: 'https://iili.io/3gVkgne.jpg' },
        { title: '目標', content: ['目標一：保持姿勢22秒', '目標二：保持姿勢30秒'] }
      ],
      nextTest: 'tandemWalk'
    },
    tandemWalk: {
      title: '串聯步行測試',
      tutorial: [
        { title: '準備場地', content: ['找平坦直線地面（約3公尺）', '清理地面障礙物', '穿防滑鞋', '附近有支撐物'], image: 'https://iili.io/3gVk46b.jpg' },
        { title: '起始姿勢', content: ['雙腳併攏站立', '雙手叉腰', '目視前方', '保持穩定'], image: 'https://iili.io/3gVk46b.jpg' },
        { title: '測試要求', content: ['一步一步腳跟貼腳尖行走', '保持直線前進', '保持平衡', '步伐穩定'], image: 'https://iili.io/3gVk46b.jpg' },
        { title: '目標', content: ['平穩完成3步'] }
      ],
      nextTest: 'singleLeg'
    },
    singleLeg: {
      title: '單腿站立測試',
      tutorial: [
        { title: '準備場地', content: ['找平坦地面', '確保防滑', '附近有牆或支撐', '穿平底鞋'], image: 'https://iili.io/3gVkPFj.jpg' },
        { title: '起始姿勢', content: ['單腿站立', '雙手叉腰', '目視前方', '保持平衡'], image: 'https://iili.io/3gVkPFj.jpg' },
        { title: '姿勢要求', content: ['保持單腿站立', '維持姿勢', '保持靜止', '專注前方'], image: 'https://iili.io/3gVkPFj.jpg' },
        { title: '目標', content: ['保持姿勢6.5秒或以上'] }
      ],
      nextTest: null
    }
  };

  useEffect(() => {
    setTutorialStep(0);
    setTestPhase('tutorial');
    setCountdown(30);
    setIsTimerRunning(false);
    setQuizStep(0);
  }, [test]);

  useEffect(() => {
    // Track when test phase changes
    if (testPhase !== 'tutorial') {
      gtag('event', 'physical_test_phase', {
        event_category: 'engagement',
        event_label: `${test}_${testPhase}_zh`,
        test_type: test,
        phase: testPhase,
        language: 'zh'
      });
    }
  }, [testPhase, test]);

  const handleAnswer = (question: string, value: boolean) => {
    // Track test completion
    gtag('event', 'physical_test_complete', {
      event_category: 'engagement',
      event_label: `${test}_complete_zh`,
      test_type: test,
      result: value ? 'success' : 'failure',
      language: 'zh'
    });

    quizStore.setAnswer(question, value);
    const nextStep = quizStep + 1;
    const questions = questionsPerTest[test!];
    
    if (nextStep >= questions.length) {
      setQuizStep(0);
      setTestPhase('tutorial');
      setTutorialStep(0);
      setCountdown(30);
      setIsTimerRunning(false);
      
      if (onNextTest) {
        const nextTest = instructions[test!].nextTest;
        if (nextTest) {
          onNextTest(nextTest);
        } else {
          onNextTest(null);
        }
      }
    } else {
      setQuizStep(nextStep);
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
          return 30;
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
    setQuizStep(0);
  };

  const handleSkip = () => {
    setIsTimerRunning(false);
    setTestPhase('results');
  };

  if (!test || !instructions[test]) {
    return null;
  }

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
          className="text-6xl font-bold"
          style={{ color: '#08449E' }}
        >
          {countdown}
        </motion.div>
        <p className="mt-4 text-gray-600">準備開始...</p>
      </div>
    );
  }

  if (testPhase === 'test') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6">
        <div className="w-32 h-32 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#E6EEF8' }}>
          <span className="text-4xl font-bold" style={{ color: '#08449E' }}>{countdown}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{currentTest.title}</h3>
        <p className="text-gray-600 mb-6 text-center">
          {test === 'sitToStand' ? '盡可能多做坐站動作！' : 
           test === 'tandemStance' ? '保持串聯步姿勢不動！' : 
           test === 'tandemWalk' ? '保持串聯步行姿勢！' :
           '保持單腿站立姿勢不動！'}
        </p>
        <div className="flex flex-col w-full gap-3 px-4">
          <button
            onClick={resetTest}
            className="flex items-center justify-center px-6 py-3 text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#08449E' }}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            重新開始
          </button>
          <button
            onClick={handleSkip}
            className="flex items-center justify-center px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            跳過
          </button>
        </div>
      </div>
    );
  }

  if (testPhase === 'results') {
    const questions = questionsPerTest[test];
    if (!questions || !questions[quizStep]) {
      return null;
    }

    const currentQuestion = questions[quizStep];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6">
        <h3 className="text-xl font-bold mb-6 text-center">{currentTest.title}</h3>
        <div className="w-full max-w-md">
          <p className="text-lg font-semibold mb-6 text-center">{currentQuestion.label}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleAnswer(currentQuestion.field, true)}
              className="w-full py-4 text-white rounded-lg transition-colors text-lg"
              style={{ backgroundColor: '#08449E' }}
            >
              能
            </button>
            <button
              onClick={() => handleAnswer(currentQuestion.field, false)}
              className="w-full py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-lg"
            >
              不能
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{currentTest.title}</h3>
          <span className="text-sm text-gray-500">
            第 {tutorialStep + 1} / {totalSteps} 步
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
          <motion.div
            className="h-1 rounded-full"
            style={{ backgroundColor: '#08449E' }}
            initial={{ width: 0 }}
            animate={{ width: `${((tutorialStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {quizStore.hasFrailty && (
          <div className="mb-3">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                建議有人在旁陪同
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
                  <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: '#E6EEF8' }}>
                    <p className="text-base font-semibold" style={{ color: '#08449E' }}>{goal}</p>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-2">
                {currentTutorial.content.map((item, index) => (
                  <li key={index} className="flex items-center bg-gray-50 p-2 rounded">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2 flex-shrink-0" style={{ backgroundColor: '#08449E' }}>
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

      <div className="sticky bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex justify-between items-center">
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
          返回
        </button>
        
        {tutorialStep === totalSteps - 1 ? (
          <button
            onClick={startTest}
            className="flex items-center px-6 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#08449E' }}
          >
            <Play className="w-5 h-5 mr-2" />
            開始測試
          </button>
        ) : (
          <button
            onClick={() => setTutorialStep(prev => Math.min(totalSteps - 1, prev + 1))}
            className="flex items-center px-6 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#08449E' }}
          >
            下一步
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PhysicalAssessmentInstructionsZh;