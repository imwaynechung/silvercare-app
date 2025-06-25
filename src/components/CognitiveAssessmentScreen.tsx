import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Clock, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';

interface TestResult {
  testName: string;
  score: number;
  maxScore: number;
  category: string;
  performance: 'excellent' | 'good' | 'fair' | 'poor';
}

interface CognitiveResults {
  totalScore: number;
  maxTotalScore: number;
  testResults: TestResult[];
  overallPerformance: 'normal' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment';
  recommendations: string[];
}

const CognitiveAssessmentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentTest, setCurrentTest] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<CognitiveResults | null>(null);

  // MMSE-based test structure
  const tests = [
    {
      name: '記憶力測試',
      description: '測試短期記憶和學習能力',
      duration: 300, // 5 minutes
      questions: [
        {
          id: 'orientation_time',
          type: 'multiple_choice',
          question: '現在是什麼年份？',
          options: ['2023年', '2024年', '2025年', '2026年'],
          correct: 2,
          category: 'orientation',
          points: 1
        },
        {
          id: 'orientation_place',
          type: 'multiple_choice',
          question: '我們現在在哪個城市？',
          options: ['台北', '香港', '上海', '深圳'],
          correct: 1,
          category: 'orientation',
          points: 1
        },
        {
          id: 'word_recall_learning',
          type: 'instruction',
          question: '請記住以下三個詞語：蘋果、鉛筆、手錶',
          instruction: '我會說三個詞語，請您重複一遍，然後記住它們。稍後我會再問您。',
          category: 'memory',
          points: 3
        },
        {
          id: 'word_recall_test',
          type: 'text_input',
          question: '請說出剛才我讓您記住的三個詞語：',
          category: 'memory',
          points: 3,
          answers: ['蘋果', '鉛筆', '手錶']
        },
        {
          id: 'attention_calculation',
          type: 'multiple_choice',
          question: '從100開始，每次減7：100 - 7 = ?',
          options: ['93', '92', '94', '91'],
          correct: 0,
          category: 'attention',
          points: 1
        }
      ]
    },
    {
      name: '專注力測試',
      description: '測試注意力和執行功能',
      duration: 240, // 4 minutes
      questions: [
        {
          id: 'digit_span_forward',
          type: 'sequence',
          question: '請按順序重複以下數字：3-8-2-9',
          sequence: [3, 8, 2, 9],
          category: 'attention',
          points: 2
        },
        {
          id: 'digit_span_backward',
          type: 'sequence_reverse',
          question: '請倒序重複以下數字：7-4-1',
          sequence: [7, 4, 1],
          expected: [1, 4, 7],
          category: 'attention',
          points: 2
        },
        {
          id: 'sustained_attention',
          type: 'letter_cancellation',
          question: '在以下字母中，請點擊所有的字母"A"：',
          letters: 'BAFGAHKALMNAOPQAR',
          target: 'A',
          category: 'attention',
          points: 3
        },
        {
          id: 'working_memory',
          type: 'multiple_choice',
          question: '如果今天是星期三，那麼三天後是星期幾？',
          options: ['星期四', '星期五', '星期六', '星期日'],
          correct: 2,
          category: 'executive',
          points: 2
        }
      ]
    },
    {
      name: '語言能力測試',
      description: '測試語言理解和表達能力',
      duration: 360, // 6 minutes
      questions: [
        {
          id: 'naming_objects',
          type: 'image_naming',
          question: '請說出圖片中物品的名稱：',
          images: [
            { src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop', answer: '手錶' },
            { src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop', answer: '鉛筆' }
          ],
          category: 'language',
          points: 2
        },
        {
          id: 'sentence_repetition',
          type: 'text_input',
          question: '請重複以下句子："今天天氣很好，我們去公園散步"',
          correct_answer: '今天天氣很好，我們去公園散步',
          category: 'language',
          points: 2
        },
        {
          id: 'reading_comprehension',
          type: 'multiple_choice',
          question: '請閱讀以下句子並按照指示做："請舉起您的右手"',
          instruction: '請按照句子的指示行動，然後選擇您做了什麼：',
          options: ['舉起左手', '舉起右手', '舉起雙手', '沒有動作'],
          correct: 1,
          category: 'language',
          points: 1
        },
        {
          id: 'verbal_fluency',
          type: 'timed_input',
          question: '請在60秒內說出盡可能多以"動"字開頭的詞語：',
          timeLimit: 60,
          category: 'language',
          points: 3
        },
        {
          id: 'writing_task',
          type: 'text_input',
          question: '請寫一個完整的句子（任何內容都可以）：',
          category: 'language',
          points: 1
        }
      ]
    }
  ];

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive]);

  const startTest = (testIndex: number) => {
    setCurrentTest(testIndex);
    setCurrentQuestion(0);
    setTimeLeft(tests[testIndex].duration);
    setIsTimerActive(true);
  };

  const handleTimeUp = () => {
    setIsTimerActive(false);
    if (currentTest < tests.length - 1) {
      setCurrentTest(currentTest + 1);
      setCurrentQuestion(0);
    } else {
      calculateResults();
    }
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    const currentTestData = tests[currentTest];
    if (currentQuestion < currentTestData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentTest < tests.length - 1) {
      setCurrentTest(currentTest + 1);
      setCurrentQuestion(0);
      setTimeLeft(tests[currentTest + 1].duration);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    let maxTotalScore = 0;
    const testResults: TestResult[] = [];

    tests.forEach(test => {
      let testScore = 0;
      let testMaxScore = 0;

      test.questions.forEach(question => {
        testMaxScore += question.points;
        const userAnswer = answers[question.id];

        // Score based on question type
        switch (question.type) {
          case 'multiple_choice':
            if (userAnswer === question.correct) {
              testScore += question.points;
            }
            break;
          case 'text_input':
            if (question.answers) {
              // Word recall test
              const correctWords = question.answers.filter(word => 
                userAnswer?.toLowerCase().includes(word.toLowerCase())
              ).length;
              testScore += correctWords;
            } else if (question.correct_answer) {
              // Exact match required
              if (userAnswer?.toLowerCase().trim() === question.correct_answer.toLowerCase()) {
                testScore += question.points;
              }
            } else {
              // Writing task - give points if any text provided
              if (userAnswer && userAnswer.trim().length > 0) {
                testScore += question.points;
              }
            }
            break;
          case 'sequence':
          case 'sequence_reverse':
            if (JSON.stringify(userAnswer) === JSON.stringify(question.expected || question.sequence)) {
              testScore += question.points;
            }
            break;
          case 'letter_cancellation':
            // Count correct target identifications
            const targetCount = (question.letters.match(new RegExp(question.target, 'g')) || []).length;
            const userSelections = userAnswer || [];
            const correctSelections = userSelections.filter((pos: number) => 
              question.letters[pos] === question.target
            ).length;
            testScore += Math.min(correctSelections, targetCount) / targetCount * question.points;
            break;
          case 'timed_input':
            // Verbal fluency scoring
            const words = userAnswer?.split(/\s+/).filter((word: string) => 
              word.trim().length > 0 && word.startsWith('動')
            ) || [];
            testScore += Math.min(words.length / 3, 1) * question.points; // 3+ words = full points
            break;
          case 'image_naming':
            let namingScore = 0;
            question.images.forEach((img, index) => {
              if (userAnswer?.[index]?.toLowerCase().includes(img.answer.toLowerCase())) {
                namingScore += question.points / question.images.length;
              }
            });
            testScore += namingScore;
            break;
        }
      });

      totalScore += testScore;
      maxTotalScore += testMaxScore;

      const percentage = (testScore / testMaxScore) * 100;
      let performance: 'excellent' | 'good' | 'fair' | 'poor';
      if (percentage >= 90) performance = 'excellent';
      else if (percentage >= 75) performance = 'good';
      else if (percentage >= 60) performance = 'fair';
      else performance = 'poor';

      testResults.push({
        testName: test.name,
        score: Math.round(testScore * 10) / 10,
        maxScore: testMaxScore,
        category: test.name,
        performance
      });
    });

    // Overall cognitive assessment
    const overallPercentage = (totalScore / maxTotalScore) * 100;
    let overallPerformance: 'normal' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment';
    let recommendations: string[] = [];

    if (overallPercentage >= 80) {
      overallPerformance = 'normal';
      recommendations = [
        '您的認知功能表現良好',
        '建議繼續保持健康的生活方式',
        '定期進行腦部訓練活動',
        '保持社交活動和學習新事物'
      ];
    } else if (overallPercentage >= 65) {
      overallPerformance = 'mild_impairment';
      recommendations = [
        '認知功能有輕微下降',
        '建議增加腦部訓練活動',
        '保持規律運動和充足睡眠',
        '考慮諮詢專業醫生進行詳細評估'
      ];
    } else if (overallPercentage >= 50) {
      overallPerformance = 'moderate_impairment';
      recommendations = [
        '認知功能有明顯下降',
        '強烈建議諮詢神經科醫生',
        '需要進行更詳細的認知評估',
        '考慮認知訓練和復健治療'
      ];
    } else {
      overallPerformance = 'severe_impairment';
      recommendations = [
        '認知功能嚴重下降',
        '請立即諮詢專業醫生',
        '需要全面的神經心理學評估',
        '可能需要專業的認知復健治療'
      ];
    }

    const finalResults: CognitiveResults = {
      totalScore: Math.round(totalScore * 10) / 10,
      maxTotalScore,
      testResults,
      overallPerformance,
      recommendations
    };

    setResults(finalResults);
    setShowResults(true);
    setIsTimerActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestion = () => {
    const currentTestData = tests[currentTest];
    const question = currentTestData.questions[currentQuestion];

    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <div className="grid grid-cols-1 gap-3">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, index)}
                  className={`p-4 text-left rounded-lg border-2 transition-all ${
                    answers[question.id] === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'text_input':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              rows={3}
              placeholder="請在此輸入您的答案..."
            />
          </div>
        );

      case 'sequence':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                {question.sequence?.map((num, index) => (
                  <div key={index} className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-lg font-bold">
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="mb-4">請按順序點擊數字：</p>
              <div className="flex justify-center space-x-2">
                {question.sequence?.map((num, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const currentAnswer = answers[question.id] || [];
                      handleAnswer(question.id, [...currentAnswer, num]);
                    }}
                    className="w-12 h-12 bg-gray-200 rounded-lg hover:bg-gray-300 text-lg font-bold"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <p>您的答案：{(answers[question.id] || []).join(' - ')}</p>
              </div>
            </div>
          </div>
        );

      case 'letter_cancellation':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {question.letters?.split('').map((letter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const currentSelections = answers[question.id] || [];
                    const newSelections = currentSelections.includes(index)
                      ? currentSelections.filter((i: number) => i !== index)
                      : [...currentSelections, index];
                    handleAnswer(question.id, newSelections);
                  }}
                  className={`w-10 h-10 rounded-lg text-lg font-bold transition-all ${
                    (answers[question.id] || []).includes(index)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        );

      case 'instruction':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">{question.instruction}</p>
            </div>
            <button
              onClick={() => {
                handleAnswer(question.id, 'completed');
                nextQuestion();
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              我已記住，繼續
            </button>
          </div>
        );

      default:
        return <div>未知題型</div>;
    }
  };

  if (showResults && results) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6 flex-shrink-0">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => navigate('/assessment-selection')}
              className="mr-3 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">認知評估結果</h1>
              <p className="text-purple-100 text-sm">評估完成</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          {/* Overall Score */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#8b5cf6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(results.totalScore / results.maxTotalScore) * 251.2} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">
                    {Math.round((results.totalScore / results.maxTotalScore) * 100)}%
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900">總體評分</h2>
              <p className="text-gray-600">{results.totalScore} / {results.maxTotalScore} 分</p>
            </div>

            <div className={`p-4 rounded-lg ${
              results.overallPerformance === 'normal' ? 'bg-green-50 border border-green-200' :
              results.overallPerformance === 'mild_impairment' ? 'bg-yellow-50 border border-yellow-200' :
              results.overallPerformance === 'moderate_impairment' ? 'bg-orange-50 border border-orange-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center mb-2">
                {results.overallPerformance === 'normal' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                )}
                <span className="font-semibold">
                  {results.overallPerformance === 'normal' ? '認知功能正常' :
                   results.overallPerformance === 'mild_impairment' ? '輕微認知下降' :
                   results.overallPerformance === 'moderate_impairment' ? '中度認知下降' :
                   '嚴重認知下降'}
                </span>
              </div>
            </div>
          </div>

          {/* Individual Test Results */}
          <div className="space-y-4 mb-6">
            {results.testResults.map((test, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{test.testName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    test.performance === 'excellent' ? 'bg-green-100 text-green-800' :
                    test.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                    test.performance === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {test.performance === 'excellent' ? '優秀' :
                     test.performance === 'good' ? '良好' :
                     test.performance === 'fair' ? '一般' : '需改善'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full ${
                        test.performance === 'excellent' ? 'bg-green-500' :
                        test.performance === 'good' ? 'bg-blue-500' :
                        test.performance === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(test.score / test.maxScore) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{test.score}/{test.maxScore}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">專業建議</h3>
            <div className="space-y-3">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2"></div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => {
                setCurrentTest(0);
                setCurrentQuestion(0);
                setAnswers({});
                setShowResults(false);
                setResults(null);
              }}
              className="w-full flex items-center justify-center bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              重新測試
            </button>
            <button
              onClick={() => navigate('/assessment-selection')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              返回評估選擇
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentTest === -1) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6 flex-shrink-0">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => navigate('/assessment-selection')}
              className="mr-3 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">認知評估</h1>
              <p className="text-purple-100 text-sm">選擇測試項目</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">認知功能評估</h2>
            <p className="text-gray-600">
              基於MMSE（簡易智能狀態檢查）的標準化認知評估，包含記憶力、專注力和語言能力測試。
            </p>
          </div>

          <div className="space-y-4">
            {tests.map((test, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <Brain className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <h3 className="font-bold text-gray-900">{test.name}</h3>
                      <p className="text-sm text-gray-600">{test.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{Math.floor(test.duration / 60)}分鐘</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {test.questions.length} 個題目
                    </div>
                  </div>

                  <button
                    onClick={() => startTest(index)}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    開始測試
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">測試說明</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• 請在安靜的環境中進行測試</p>
              <p>• 每個測試都有時間限制，請專心作答</p>
              <p>• 測試結果僅供參考，如有疑慮請諮詢專業醫生</p>
              <p>• 建議定期進行評估以追蹤認知功能變化</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTestData = tests[currentTest];
  const question = currentTestData.questions[currentQuestion];

  return (
    <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentTest(-1)}
              className="mr-3 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">{currentTestData.name}</h1>
              <p className="text-purple-100 text-sm">
                題目 {currentQuestion + 1} / {currentTestData.questions.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-white">
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-purple-800 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / currentTestData.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {renderQuestion()}
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                } else if (currentTest > 0) {
                  setCurrentTest(currentTest - 1);
                  setCurrentQuestion(tests[currentTest - 1].questions.length - 1);
                }
              }}
              disabled={currentTest === 0 && currentQuestion === 0}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一題
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={!answers[question.id]}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === currentTestData.questions.length - 1 && currentTest === tests.length - 1 
                ? '完成測試' 
                : '下一題'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveAssessmentScreen;