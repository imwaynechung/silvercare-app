import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Brain, Globe, ChevronRight, ChevronLeft } from 'lucide-react';

const BetaQuizPromptZh: React.FC = () => {
  const { setShowBetaQuizPrompt, setShowLeadCapture } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    gtag('event', 'beta_quiz_prompt_displayed', {
      event_category: 'engagement',
      event_label: 'beta_quiz_prompt_zh',
      language: 'zh'
    });
  }, []);

  const steps = [
    {
      title: "您知道嗎？每年約有30%長者跌倒！",
      content: "大部分個案都會導致長者失去活動能力，為長者和家人帶來巨大的情緒壓力。跌倒不僅影響身體健康，更可能導致長者失去自信，減少社交活動，影響生活質素。"
    },
    {
      title: "80%的跌倒發生在家中無人看管的情況下",
      content: "研究顯示，長者每年會流失高達5%的肌肉量，大大增加跌倒風險。隨著年齡增長，平衡力和肌力逐漸下降，但透過適當的評估和訓練，是可以預防的！"
    },
    {
      title: "銀齡樂為您提供專業解決方案",
      content: "由專業團隊設計智能評估系統，只需使用手機，即可進行專業評估，獲取個人化預防建議。"
    },
    {
      title: "立即加入銀齡樂大家庭",
      content: "銀齡樂助您預防跌倒！AI評估風險，定制運動計劃，家屬隨時掌握進度。立即登記，享永久會籍、免費工作坊等專屬權益！"
    }
  ];

  const handleStartSignup = () => {
    gtag('event', 'signup_start', {
      event_category: 'engagement',
      event_label: 'start_signup_zh',
      language: 'zh',
      button_clicked: 'start_signup'
    });
    setShowBetaQuizPrompt(false);
    setShowLeadCapture(true);
  };

  const handleExplore = () => {
    gtag('event', 'beta_quiz_explore', {
      event_category: 'engagement',
      event_label: 'explore_website_zh',
      language: 'zh',
      button_clicked: 'explore_website'
    });
    setShowBetaQuizPrompt(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full mx-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {steps[currentStep].title}
            </h2>
            <span className="text-sm text-gray-500">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 h-1 rounded-full mb-6">
            <div 
              className="h-1 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                backgroundColor: '#08449E'
              }}
            />
          </div>

          <div className="text-gray-600 text-lg leading-relaxed mb-8 whitespace-pre-line">
            {steps[currentStep].content}
          </div>

          <div className="flex justify-between items-center mb-8">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                返回
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleNext}
                className="flex items-center text-white px-6 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#08449E' }}
              >
                下一步
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </div>
        
        {currentStep === steps.length - 1 && (
          <div className="space-y-4">
            <button
              onClick={handleStartSignup}
              className="w-full flex items-center justify-center gap-3 text-white px-6 py-4 rounded-lg transition-colors"
              style={{ backgroundColor: '#08449E' }}
            >
              <Brain className="w-5 h-5" />
              立即登記免費評估
            </button>
            
            <button
              onClick={handleExplore}
              className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Globe className="w-5 h-5" />
              瀏覽網站
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BetaQuizPromptZh;