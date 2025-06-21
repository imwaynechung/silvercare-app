import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Brain, Globe } from 'lucide-react';

const BetaQuizPrompt: React.FC = () => {
  const { setShowBetaQuizPrompt, setShowLeadCapture } = useLanguage();

  const handleStartSignup = () => {
    gtag('event', 'signup_start', {
      event_category: 'engagement',
      event_label: 'start_signup_en',
      language: 'en'
    });
    setShowBetaQuizPrompt(false);
    setShowLeadCapture(true);
  };

  const handleExplore = () => {
    gtag('event', 'beta_quiz_explore', {
      event_category: 'engagement',
      event_label: 'explore_website_en',
      language: 'en'
    });
    setShowBetaQuizPrompt(false);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Take the Next Step?
        </h2>
        <p className="text-gray-600 mb-6">
          Join our founding community and get a free fall risk assessment. Be one of the first 100 members to shape the future of fall prevention technology and receive exclusive benefits.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleStartSignup}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Brain className="w-5 h-5" />
            Sign Up for Free Assessment
          </button>
          
          <button
            onClick={handleExplore}
            className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Globe className="w-5 h-5" />
            Explore Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetaQuizPrompt;