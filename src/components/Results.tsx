import React, { useState, useEffect } from 'react';
import { QuizState, AGE_GROUPS } from '../types';
import { Home, Lock } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import LoadingAnimation from './LoadingAnimation';
import AssessmentLeadCapture from './AssessmentLeadCapture';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultsProps {
  state: QuizState;
}

const Results: React.FC<ResultsProps> = ({ state }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  useEffect(() => {
    // Check if user has already signed up
    const signupStatus = localStorage.getItem('assessmentSignup');
    if (signupStatus === 'completed') {
      setHasSignedUp(true);
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (signupStatus !== 'completed') {
        setShowSignup(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignupComplete = () => {
    setShowSignup(false);
    setHasSignedUp(true);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (showSignup) {
    return <AssessmentLeadCapture onComplete={handleSignupComplete} />;
  }

  const calculateRiskLevel = () => {
    // Check for frailty first - if yes, immediately return HIGH risk
    if (state.hasFrailty) {
      return {
        level: 'HIGH',
        recommendation: 'You are at HIGH RISK. We strongly recommend consulting a medical doctor or physiotherapist for a multifactorial fall assessment. Any physical activities should be performed with supervision.'
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
        recommendation: 'You are at LOW RISK. Continue with regular exercise and monitoring to maintain your current status.'
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
        recommendation: 'You are at HIGH RISK. We strongly recommend consulting a medical doctor or physiotherapist for a multifactorial fall assessment.'
      };
    }

    return {
      level: 'INTERMEDIATE',
      recommendation: 'You are at INTERMEDIATE RISK. Regular exercise and monitoring are recommended to improve your stability and strength.'
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

  const handleRestart = () => {
    window.location.reload();
  };

  const selectedAgeGroup = state.ageGroup ? AGE_GROUPS[state.ageGroup] : null;
  const calculations = selectedAgeGroup ? calculateProbabilityDetails(selectedAgeGroup.pretestProbability) : null;

  const chartData = {
    labels: ['Risk Level'],
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
            alt="Fall Risk Assessment Logo" 
            className="h-10 sm:h-12 w-auto"
          />
          <h1 className="text-2xl sm:text-3xl font-bold">Assessment Results</h1>
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          <Home size={18} className="sm:w-5 sm:h-5" />
          Start New Assessment
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${riskColors[riskLevel as keyof typeof riskColors].bg}`}>
          <h2 className="text-xl font-bold mb-4">Risk Level</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <Doughnut data={chartData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className={`text-3xl font-bold ${riskColors[riskLevel as keyof typeof riskColors].text}`}>
                    {riskLevel}
                  </p>
                  <p className="text-sm text-gray-600">Risk Level</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{riskResult.recommendation}</p>
        </div>

        {selectedAgeGroup && calculations && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-2">Fall Probability</h2>
            <p className="text-sm text-gray-600 mb-4">
              Based on your age group ({selectedAgeGroup.label}) and assessment results, this is your estimated probability of experiencing a fall in the next 12 months.
            </p>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <Doughnut 
                  data={{
                    labels: ['Probability'],
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
                    <p className="text-sm text-gray-600">Probability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <div className="p-6 filter blur-sm">
            <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
            <p className="text-gray-600 mb-6">
              Get a detailed 3-month improvement plan based on your assessment results:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Exercise Program</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Customized balance exercises</li>
                  <li>• Strength training routine</li>
                  <li>• Progress tracking</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Safety Recommendations</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Home modification guide</li>
                  <li>• Daily activity adjustments</li>
                  <li>• Risk prevention strategies</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Unlock Full Results</h3>
              <p className="text-white/80 mb-4 max-w-sm mx-auto">
                Get a personalized 3-month plan that can reduce fall risk by up to 30%, detailed insights, and an AI-powered fall risk assessment for a more accurate and detailed understanding of your risk.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                Unlock Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;