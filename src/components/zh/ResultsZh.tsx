import React, { useState, useEffect } from 'react';
import { QuizState, AGE_GROUPS } from '../../types';
import { Home, Lock } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import LoadingAnimation from '../LoadingAnimation';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultsProps {
  state: QuizState;
}

const ResultsZh: React.FC<ResultsProps> = ({ state }) => {
  const navigate = useNavigate();

  const calculateRiskLevel = () => {
    // Check for frailty first - if yes, immediately return HIGH risk
    if (state.hasFrailty) {
      return {
        level: 'HIGH',
        recommendation: '您屬於高風險。強烈建議您諮詢醫生或物理治療師進行全面的跌倒風險評估。任何體能活動都應在監督下進行。'
      };
    }

    const initialScreeningAnswers = [
      state.fallenLastYear,
      state.takingPsychoactiveMeds,
      state.difficultyWithADL,
      state.fearfulOfFalling,
      state.useAssistiveDevice
    ];

    const hasAnyInitialYes = initialScreeningAnswers.some(answer => answer === true);

    if (!hasAnyInitialYes) {
      return {
        level: 'LOW',
        recommendation: '您屬於低風險。建議繼續保持規律運動和監測，以維持目前的良好狀態。'
      };
    }

    const severityAnswers = [
      state.gotInjuryFromFall,
      state.multipleLastYear,
      state.unableToGetUp,
      state.lostConsciousness
    ];

    const hasAnySeverityYes = severityAnswers.some(answer => answer === true);

    if (hasAnySeverityYes) {
      return {
        level: 'HIGH',
        recommendation: '您屬於高風險。強烈建議您諮詢醫生或物理治療師進行全面的跌倒風險評估。'
      };
    }

    return {
      level: 'INTERMEDIATE',
      recommendation: '您屬於中等風險。建議進行規律運動和監測，以改善穩定性和力量。'
    };
  };

  const calculateProbabilityDetails = (preTestProb: number) => {
    const preTestOdds = preTestProb / (1 - preTestProb);
    const lrs = calculateLikelihoodRatios();
    const postTestOdds = lrs.reduce((acc, lr) => acc * lr, preTestOdds);
    const postTestProb = (postTestOdds / (1 + postTestOdds)) * 100;
    
    return {
      postTestProb: postTestProb.toFixed(1)
    };
  };

  const calculateLikelihoodRatios = () => {
    let lrs: number[] = [];

    if (state.fallenLastYear) lrs.push(1.8);
    else lrs.push(0.8);
    
    if (state.takingPsychoactiveMeds) lrs.push(1.4);
    else lrs.push(0.8);
    
    if (state.difficultyWithADL) lrs.push(1.4);
    else lrs.push(0.8);
    
    if (state.fearfulOfFalling) lrs.push(1.4);
    else lrs.push(0.9);
    
    if (state.useAssistiveDevice) lrs.push(1.3);
    else lrs.push(0.9);

    if (!state.tandemStance22) lrs.push(3.0);
    else lrs.push(0.4);
    
    if (!state.tandemStance30) lrs.push(1.3);
    else lrs.push(0.8);
    
    if (!state.tandemWalk) lrs.push(1.3);
    else lrs.push(0.2);
    
    if (!state.sitToStand12) lrs.push(1.6);
    else lrs.push(0.7);
    
    if (!state.sitToStand30) lrs.push(3.9);
    else lrs.push(0.4);
    
    if (!state.singleLimbStance) lrs.push(1.9);
    else lrs.push(0.9);

    return lrs;
  };

  const riskResult = calculateRiskLevel();
  const riskLevel = riskResult.level;
  const riskColors = {
    LOW: { bg: 'bg-green-100', text: 'text-green-800', chart: ['#22c55e', '#dcfce7'] },
    INTERMEDIATE: { bg: 'bg-yellow-100', text: 'text-yellow-800', chart: ['#eab308', '#fef9c3'] },
    HIGH: { bg: 'bg-red-100', text: 'text-red-800', chart: ['#ef4444', '#fee2e2'] }
  };

  const riskLevelTranslations = {
    LOW: '低',
    INTERMEDIATE: '中等',
    HIGH: '高'
  };

  const handleRestart = () => {
    navigate('/chatbot-zh');
  };

  const handleGenerateReversalPlan = () => {
    // Track reversal plan generation
    if (typeof gtag !== 'undefined') {
      gtag('event', 'reversal_plan_generate', {
        event_category: 'engagement',
        event_label: 'generate_reversal_plan_zh',
        risk_level: riskLevel,
        language: 'zh'
      });
    }
    
    // Navigate to home page or specific reversal plan page
    navigate('/');
  };

  const ageGroupTranslations = {
    'under60': '60歲以下',
    '60to69': '60-69歲',
    '70to79': '70-79歲',
    '80plus': '80歲或以上'
  };

  const selectedAgeGroup = state.ageGroup ? AGE_GROUPS[state.ageGroup] : null;
  const calculations = selectedAgeGroup ? calculateProbabilityDetails(selectedAgeGroup.pretestProbability) : null;

  const chartData = {
    labels: ['風險等級'],
    datasets: [
      {
        data: [Number(calculations?.postTestProb), 100 - Number(calculations?.postTestProb)],
        backgroundColor: riskColors[riskLevel as keyof typeof riskColors].chart,
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <img 
            src="https://cdn.prod.website-files.com/6749371aeca98a5cf92ef948/674d69054e9f9c936fbcca00_Frame%201321317504.png" 
            alt="跌倒風險評估標誌" 
            className="h-10 sm:h-12 w-auto"
          />
          <h1 className="text-2xl sm:text-3xl font-bold">評估結果</h1>
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          <Home size={18} className="sm:w-5 sm:h-5" />
          開始新評估
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${riskColors[riskLevel as keyof typeof riskColors].bg}`}>
          <h2 className="text-xl font-bold mb-4">風險等級</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <Doughnut data={chartData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className={`text-3xl font-bold ${riskColors[riskLevel as keyof typeof riskColors].text}`}>
                    {riskLevelTranslations[riskLevel as keyof typeof riskLevelTranslations]}
                  </p>
                  <p className="text-sm text-gray-600">風險等級</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{riskResult.recommendation}</p>
        </div>

        {selectedAgeGroup && calculations && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-2">跌倒機率</h2>
            <p className="text-sm text-gray-600 mb-4">
              根據您的年齡組別（{ageGroupTranslations[state.ageGroup as keyof typeof ageGroupTranslations]}）和評估結果，這是您在未來12個月內跌倒的估計機率。
            </p>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <Doughnut 
                  data={{
                    labels: ['機率'],
                    datasets: [{
                      data: [Number(calculations.postTestProb), 100 - Number(calculations.postTestProb)],
                      backgroundColor: ['#3b82f6', '#dbeafe'],
                      borderWidth: 0
                    }]
                  }} 
                  options={chartOptions}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {calculations.postTestProb}%
                    </p>
                    <p className="text-sm text-gray-600">機率</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">個人化建議</h2>
          <p className="text-gray-600 mb-6">
            根據您的評估結果，我們為您制定了詳細的3個月改善計劃：
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">運動計劃</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 個人化平衡訓練</li>
                <li>• 肌力訓練計劃</li>
                <li>• 進度追蹤</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">安全建議</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 家居改善指南</li>
                <li>• 日常活動調整</li>
                <li>• 風險預防策略</li>
              </ul>
            </div>
          </div>
          
          {/* Frailty Risk Section */}
          {state.hasFrailty && (
            <div className="bg-orange-50 p-4 rounded-lg mb-6 border-l-4 border-orange-500">
              <h3 className="font-semibold text-orange-800 mb-2">體弱風險提示</h3>
              <p className="text-orange-700 text-sm">
                您的評估顯示存在體弱徵狀，建議尋求專業醫療建議並在進行任何運動前諮詢醫生。
              </p>
            </div>
          )}
          
          <div className="text-center">
            <button
              onClick={handleGenerateReversalPlan}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors mb-4"
            >
              生成逆轉計劃
            </button>
            <p className="text-sm text-gray-600">
              個人化3個月計劃可大幅降低30%跌倒風險
            </p>
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="mt-6 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3">關於您的評估結果</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
            <p>此評估基於國際認可的跌倒風險評估標準</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
            <p>建議每3-6個月重新評估一次</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
            <p>如有任何健康疑慮，請諮詢專業醫療人員</p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleRestart}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          重新評估
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          返回首頁
        </button>
      </div>
    </div>
  );
};

export default ResultsZh;