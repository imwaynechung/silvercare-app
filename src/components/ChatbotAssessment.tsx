import React, { useState, useEffect } from 'react';
import { useQuizStore } from '../store/quiz';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, AlertTriangle } from 'lucide-react';
import Results from './Results';
import ChatbotWelcome from './ChatbotWelcome';
import PhysicalAssessmentInstructions from './PhysicalAssessmentInstructions';

interface ChatbotAssessmentProps {
  onComplete?: (state: any) => void;
}

const ChatbotAssessment: React.FC<ChatbotAssessmentProps> = ({ onComplete }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [step, setStep] = useState(0);
  const [showFrailtyPrompt, setShowFrailtyPrompt] = useState(false);
  const quizStore = useQuizStore();

  useEffect(() => {
    // Track assessment start when welcome screen is dismissed
    if (!showWelcome) {
      gtag('event', 'assessment_start', {
        event_category: 'engagement',
        event_label: 'assessment_started',
        language: 'en'
      });
    }
  }, [showWelcome]);

  useEffect(() => {
    // Track progress through assessment steps
    if (step > 0) {
      gtag('event', 'assessment_step', {
        event_category: 'engagement',
        event_label: `step_${step}`,
        language: 'en'
      });
    }
  }, [step]);

  const questions = [
    {
      title: "Let's start with your age group",
      options: [
        { label: 'Under 60', value: 'under60' },
        { label: '60-69', value: '60to69' },
        { label: '70-79', value: '70to79' },
        { label: '80 or above', value: '80plus' }
      ],
      field: 'ageGroup'
    },
    {
      title: "Initial Screening Questions",
      questions: [
        { text: "Have you fallen in the last year?", field: 'fallenLastYear' },
        { text: "Are you taking any psychoactive medications?", field: 'takingPsychoactiveMeds' },
        { text: "Do you have difficulty with daily activities?", field: 'difficultyWithADL' },
        { text: "Are you fearful of falling?", field: 'fearfulOfFalling' },
        { text: "Do you use an assistive device (like a walker)?", field: 'useAssistiveDevice' }
      ]
    },
    {
      title: "Fall Severity Assessment",
      questions: [
        { text: "Did you get injured from any fall?", field: 'gotInjuryFromFall' },
        { text: "Have you fallen multiple times in the last year?", field: 'multipleLastYear' },
        { text: "Were you ever unable to get up after falling?", field: 'unableToGetUp' },
        { text: "Did you lose consciousness during any fall?", field: 'lostConsciousness' },
        { text: "Do you have signs of frailty?", field: 'hasFrailty' }
      ]
    },
    {
      title: "Physical Assessment",
      questions: [
        { text: "Can you hold tandem stance for 22 seconds?", field: 'tandemStance22' },
        { text: "Can you hold tandem stance for 30 seconds?", field: 'tandemStance30' },
        { text: "Can you perform tandem walk?", field: 'tandemWalk' },
        { text: "Can you do 12 sit-to-stands in 30 seconds?", field: 'sitToStand12' },
        { text: "Can you do 30 sit-to-stands in 1 minute?", field: 'sitToStand30' },
        { text: "Can you stand on one leg for 30 seconds?", field: 'singleLimbStance' }
      ]
    }
  ];

  const handleAnswer = (field: string, value: any) => {
    quizStore.setAnswer(field, value);

    // Check if this is a frailty assessment question
    const frailtyFields = ['gotInjuryFromFall', 'multipleLastYear', 'unableToGetUp', 'lostConsciousness', 'hasFrailty'];
    if (frailtyFields.includes(field) && value === true) {
      quizStore.setAnswer('hasFrailty', true);
      setShowFrailtyPrompt(true);
    }
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

    if (step < questions.length) {
      setStep(step + 1);
      setShowFrailtyPrompt(false);
    }
    if (step === questions.length - 1) {
      onComplete?.(quizStore);
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
    
    const currentQuestions = questions[step].questions;
    return currentQuestions?.every(q => quizStore[q.field as keyof typeof quizStore] !== null);
  };

  if (showWelcome) {
    return <ChatbotWelcome onStart={() => setShowWelcome(false)} />;
  }

  if (step === questions.length) {
    return <Results state={quizStore} />;
  }

  return (
    <div className="h-screen bg-white flex flex-col max-w-md mx-auto">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="px-4 py-3 border-b flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-900">
              {questions[step].title}
            </h2>
            <span className="text-sm text-gray-500">
              Step {step + 1} of {questions.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1">
            <motion.div
              className="bg-blue-600 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
          {showFrailtyPrompt ? (
            <div className="bg-yellow-50 p-6 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Important Safety Notice
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    Based on your answers, you have indicated signs of frailty. For your safety, please ensure you have someone to assist and accompany you during the physical assessment tests.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowFrailtyPrompt(false);
                        setStep(3);
                      }}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      I Understand
                    </button>
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Go Back
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
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : step === 3 ? (
            <div className="space-y-4">
              <div className="mb-4">
                <PhysicalAssessmentInstructions test="sitToStand" />
              </div>
              <div className="space-y-3">
                {questions[step].questions?.map((question, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <p className="mb-3">{question.text}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAnswer(question.field, true)}
                        className={`flex-1 py-3 rounded-lg transition-all ${
                          quizStore[question.field as keyof typeof quizStore] === true
                            ? 'bg-blue-600 text-white'
                            : 'bg-white hover:bg-gray-100'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAnswer(question.field, false)}
                        className={`flex-1 py-3 rounded-lg transition-all ${
                          quizStore[question.field as keyof typeof quizStore] === false
                            ? 'bg-blue-600 text-white'
                            : 'bg-white hover:bg-gray-100'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {questions[step].questions?.map((question, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                  <p className="mb-3">{question.text}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnswer(question.field, true)}
                      className={`flex-1 py-3 rounded-lg transition-all ${
                        quizStore[question.field as keyof typeof quizStore] === true
                          ? 'bg-blue-600 text-white'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleAnswer(question.field, false)}
                      className={`flex-1 py-3 rounded-lg transition-all ${
                        quizStore[question.field as keyof typeof quizStore] === false
                          ? 'bg-blue-600 text-white'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Navigation - Fixed at bottom */}
        {!showFrailtyPrompt && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex justify-between items-center max-w-md mx-auto">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className={`ml-auto flex items-center px-6 py-2 rounded-lg ${
                isStepComplete()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === questions.length - 1 ? 'View Results' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotAssessment;