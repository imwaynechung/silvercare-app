import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../../store/quiz';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, AlertTriangle } from 'lucide-react';
import LoadingAnimation from '../LoadingAnimation';
import AssessmentLeadCaptureZh from './AssessmentLeadCaptureZh';
import ChatbotWelcomeZh from './ChatbotWelcomeZh';
import PhysicalAssessmentInstructionsZh from './PhysicalAssessmentInstructionsZh';

const ChatbotAssessmentZh: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [step, setStep] = useState(0);
  const [showFrailtyPrompt, setShowFrailtyPrompt] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhysicalTest, setCurrentPhysicalTest] = useState<
    'sitToStand' | 'tandemStance' | 'tandemWalk' | 'singleLeg' | null
  >('sitToStand');
  const navigate = useNavigate();
  const quizStore = useQuizStore();

  useEffect(() => {
    if (!showWelcome) {
      gtag('event', 'assessment_start', {
        event_category: 'engagement',
        event_label: 'assessment_started_zh',
        language: 'zh'
      });
    }
  }, [showWelcome]);

  useEffect(() => {
    if (step > 0) {
      gtag('event', 'assessment_step', {
        event_category: 'engagement',
        event_label: `step_${step}_zh`,
        step_number: step,
        language: 'zh'
      });
    }
  }, [step]);

  useEffect(() => {
    if (currentPhysicalTest) {
      gtag('event', 'physical_assessment_start', {
        event_category: 'engagement',
        event_label: `physical_test_${currentPhysicalTest}_zh`,
        test_type: currentPhysicalTest,
        language: 'zh'
      });
    }
  }, [currentPhysicalTest]);

  const questions = [
    {
      title: "請選擇您的年齡組別",
      options: [
        { label: '60歲以下', value: 'under60' },
        { label: '60-69歲', value: '60to69' },
        { label: '70-79歲', value: '70to79' },
        { label: '80歲或以上', value: '80plus' }
      ],
      field: 'ageGroup'
    },
    {
      title: "初步篩查問題",
      questions: [
        { text: "過去一年內，您有跌倒過嗎？", field: 'fallenLastYear' },
        { text: "您正在服用任何精神活性藥物嗎？", field: 'takingPsychoactiveMeds' },
        { text: "您在日常活動中有困難嗎？", field: 'difficultyWithADL' },
        { text: "您害怕跌倒嗎？", field: 'fearfulOfFalling' },
        { text: "您使用助行器（如助行架）嗎？", field: 'useAssistiveDevice' }
      ]
    },
    {
      title: "跌倒嚴重程度評估",
      questions: [
        { text: "您曾因跌倒而受傷嗎？", field: 'gotInjuryFromFall' },
        { text: "過去一年內，您跌倒過多次嗎？", field: 'multipleLastYear' },
        { text: "跌倒後，您曾無法自行站起來嗎？", field: 'unableToGetUp' },
        { text: "跌倒時，您曾失去意識嗎？", field: 'lostConsciousness' },
        { text: "您有體弱徵狀嗎？", field: 'hasFrailty' }
      ]
    }
  ];

  const handleAnswer = (field: string, value: any) => {
    quizStore.setAnswer(field, value);

    const frailtyFields = ['gotInjuryFromFall', 'multipleLastYear', 'unableToGetUp', 'lostConsciousness', 'hasFrailty'];
    if (frailtyFields.includes(field) && value === true) {
      quizStore.setAnswer('hasFrailty', true);
      setShowFrailtyPrompt(true);
    }
  };

  const handlePhysicalAssessmentComplete = () => {
    setShowLeadCapture(true);
  };

  const checkAllInitialScreeningNo = () => {
    const initialScreeningAnswers = [
      quizStore.fallenLastYear,
      quizStore.takingPsychoactiveMeds,
      quizStore.difficultyWithADL,
      quizStore.fearfulOfFalling,
      quizStore.useAssistiveDevice
    ];
    return initialScreeningAnswers.every(answer => answer === false);
  };

  const handleNext = () => {
    if (step === 1 && checkAllInitialScreeningNo()) {
      setStep(3);
      return;
    }

    if (step === 2 && showFrailtyPrompt) {
      return;
    }

    if (step < 3) {
      setStep(step + 1);
      setShowFrailtyPrompt(false);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setShowFrailtyPrompt(false);
    }
  };

  const isStepComplete = () => {
    if (step === 0) {
      return quizStore.ageGroup !== null;
    }
    
    if (step === 3) {
      return true;
    }
    
    const currentQuestions = questions[step]?.questions;
    return currentQuestions?.every(q => quizStore[q.field as keyof typeof quizStore] !== null);
  };

  if (showWelcome) {
    return <ChatbotWelcomeZh onStart={() => setShowWelcome(false)} />;
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (showLeadCapture) {
    return <AssessmentLeadCaptureZh onComplete={() => {}} />;
  }

  const totalSteps = 4;
  const currentTitle = step === 3 ? "體能評估" : questions[step]?.title;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="px-4 py-3 border-b">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-900">
              {currentTitle}
            </h2>
            <span className="text-sm text-gray-500">
              第 {step + 1} 步，共 {totalSteps} 步
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1">
            <motion.div
              className="h-1 rounded-full"
              style={{ backgroundColor: '#08449E' }}
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="px-4 py-4">
          {showFrailtyPrompt ? (
            <div className="bg-yellow-50 p-6 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    重要安全提示
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    根據您的回答，您可能存在體弱徵狀。為了您的安全，請確保在進行體能評估測試時有人陪同協助。
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowFrailtyPrompt(false);
                        setStep(3);
                      }}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      我明白
                    </button>
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      返回
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : step === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {questions[0].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer('ageGroup', option.value)}
                  className={`p-4 rounded-lg transition-all ${
                    quizStore.ageGroup === option.value
                      ? 'text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: quizStore.ageGroup === option.value ? '#08449E' : undefined
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : step === 3 ? (
            <div className="space-y-4">
              <PhysicalAssessmentInstructionsZh
                test={currentPhysicalTest}
                onNextTest={(nextTest) => {
                  if (nextTest) {
                    setCurrentPhysicalTest(nextTest);
                  } else {
                    handlePhysicalAssessmentComplete();
                  }
                }}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {questions[step].questions.map((question, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                  <p className="mb-3">{question.text}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnswer(question.field, true)}
                      className={`flex-1 py-3 rounded-lg transition-all ${
                        quizStore[question.field as keyof typeof quizStore] === true
                          ? 'text-white'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: quizStore[question.field as keyof typeof quizStore] === true ? '#08449E' : undefined
                      }}
                    >
                      是
                    </button>
                    <button
                      onClick={() => handleAnswer(question.field, false)}
                      className={`flex-1 py-3 rounded-lg transition-all ${
                        quizStore[question.field as keyof typeof quizStore] === false
                          ? 'text-white'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: quizStore[question.field as keyof typeof quizStore] === false ? '#08449E' : undefined
                      }}
                    >
                      否
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!showFrailtyPrompt && step !== 3 && (
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex justify-between items-center">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                返回
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className={`ml-auto flex items-center px-6 py-2 rounded-lg ${
                isStepComplete()
                  ? 'text-white hover:bg-[#063275] transition-colors'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              style={{
                backgroundColor: isStepComplete() ? '#08449E' : undefined
              }}
            >
              {step === 2 ? '開始體能評估' : '下一步'}
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotAssessmentZh;