import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { setShowBetaQuizPrompt } = useLanguage();

  const handleStartClick = () => {
    gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: 'hero_section',
      language: 'en'
    });
    setShowBetaQuizPrompt(true);
  };

  return (
    <section className="relative h-screen">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://media.istockphoto.com/id/1438415244/photo/cheerful-active-senior-couple-jogging-in-the-park.jpg?s=612x612&w=0&k=20&c=_k6Aj_AZo7JuB-_jWL7V-Hzf_ZaV0BXRQbXiYOTSC0s=")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Worried about losing your loved one to a fall?
            </h1>
            <p className="text-xl text-white mb-8">
              Every 1 in 3 seniors falls each year — but most falls can be prevented.
              SilverCare by GOFA makes it easy to protect what matters most.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-white">Detect hidden fall risks early with AI-powered assessments</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-white">Prevent injuries with simple, guided exercises</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-white">Protect independence and give families lasting peace of mind</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="#get-started" 
                onClick={handleStartClick}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
              >
                Start Your FREE Fall Risk Check
              </a>
              <div className="bg-white/90 px-4 py-2 rounded-lg">
                <p className="text-sm font-bold text-blue-600">Takes just 10 minutes!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;