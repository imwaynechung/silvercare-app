import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { userType, setShowBetaQuizPrompt } = useLanguage();

  const handleStartClick = () => {
    gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: 'hero_section_zh',
      user_type: userType
    });
    // Navigate to the main app instead of showing prompt
    window.location.href = '/';
  };

  const handleWatchVideo = () => {
    gtag('event', 'watch_video_click', {
      event_category: 'engagement',
      event_label: 'hero_video_zh',
      user_type: userType
    });
  };

  const heroContent = userType === 'senior' ? {
    backgroundImage: 'https://iili.io/3PJOqZB.md.png',
    title: '一時不穩，可能導致骨折？',
    description: '每年約有 30% 長者發生跌倒，其中一半以上會導致骨折或長期健康問題。95% 髖骨骨折來自跌倒！可能失去行動能力，更會大幅降低生活質素。'
  } : {
    backgroundImage: 'https://iili.io/3OCevNn.jpg',
    title: '擔心家中長者跌倒，可大可小？',
    description: '每三位長者就有一位每年經歷跌倒事故，約有75%會受包括頭部創傷或骨折； 95% 髖骨骨折由跌倒引起。嚴重可能導致失去行動力、長期臥床，甚至喪失自理能力。'
  };

  return (
    <>
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${heroContent.backgroundImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                  {heroContent.title}
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                  {heroContent.description}
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-white">不用出門</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-white">不用複雜安裝</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-white">不用醫生陪診</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-white">可慳減時間和診金</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleStartClick}
                    className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
                    style={{ backgroundColor: '#08449E' }}
                  >
                    立即登記
                  </button>
                  <div className="bg-white/90 px-4 py-2 rounded-lg">
                    <p className="text-sm font-bold" style={{ color: '#08449E' }}>免費評估！</p>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block lg:w-1/2">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/NdO9QaRa-pA?autoplay=1&mute=1&loop=1&playlist=NdO9QaRa-pA"
                    title="銀齡樂介紹影片"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:hidden bg-gray-900 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              了解更多關於銀齡樂
            </h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl mb-8">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/NdO9QaRa-pA?autoplay=1&mute=1&loop=1&playlist=NdO9QaRa-pA"
                title="銀齡樂介紹影片"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="text-center">
              <a
                href="https://youtu.be/NdO9QaRa-pA"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWatchVideo}
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
              >
                銀齡樂介紹影片
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;