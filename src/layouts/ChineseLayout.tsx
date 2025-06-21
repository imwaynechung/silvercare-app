import React, { useEffect } from 'react';
import HeaderZh from '../components/zh/Header';
import HeroZh from '../components/zh/Hero';
import HowItWorksZh from '../components/zh/HowItWorks';
import BenefitsZh from '../components/zh/Benefits';
import TestimonialsZh from '../components/zh/Testimonials';
import FAQZh from '../components/zh/FAQ';
import FooterZh from '../components/zh/FooterZh';
import CommunityBenefits from '../components/zh/CommunityBenefits';
import { useLanguage } from '../contexts/LanguageContext';

const ChineseLayout: React.FC = () => {
  const { setShowLeadCapture } = useLanguage();

  useEffect(() => {
    // Update document properties
    document.title = "銀齡樂 | 香港首個AI智能防跌評估系統";
    document.documentElement.lang = 'zh-HK';
    
    // Update meta tags
    const metaTags = {
      'description': '立即體驗AI智能評估，10分鐘了解跌倒風險！香港首個經臨床實證的長者防跌系統，準確度超過90%。由物理治療師設計，適合長者及照顧者使用。',
      'keywords': '防跌倒, 長者照顧, 人工智能醫療, 居家安老, 長者安全, 跌倒風險評估, 長者健康科技, 照顧者支援, 銀齡科技, 智能長者照顧, 物理治療',
      'author': 'GOFA Limited',
      'robots': 'index, follow',
      'viewport': 'width=device-width, initial-scale=1.0',
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update Open Graph tags
    const ogTags = {
      'og:title': '銀齡樂 | 香港首個AI智能防跌評估系統',
      'og:description': '立即體驗AI智能評估，10分鐘了解跌倒風險！香港首個經臨床實證的長者防跌系統，準確度超過90%。由物理治療師設計，適合長者及照顧者使用。',
      'og:image': 'https://iili.io/3rSv1St.png',
      'og:url': 'https://silvercare.gofa.co/zh',
      'og:type': 'website',
      'og:locale': 'zh_HK',
      'og:site_name': '銀齡樂 SilverCare',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': '銀齡樂 | 香港首個AI智能防跌評估系統',
      'twitter:description': '立即體驗AI智能評估，10分鐘了解跌倒風險！香港首個經臨床實證的長者防跌系統，準確度超過90%。由物理治療師設計，適合長者及照顧者使用。',
      'twitter:image': 'https://iili.io/3rSv1St.png',
      'twitter:site': '@gofaapp',
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://silvercare.gofa.co/zh');

    // Add alternate language links
    const alternateLinks = [
      { hreflang: 'zh-HK', href: 'https://silvercare.gofa.co/zh' },
      { hreflang: 'en', href: 'https://silvercare.gofa.co' },
      { hreflang: 'x-default', href: 'https://silvercare.gofa.co' },
    ];

    alternateLinks.forEach(({ hreflang, href }) => {
      let link = document.querySelector(`link[hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    });

    // Update favicon
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      document.head.appendChild(favicon);
    }
    favicon.setAttribute('type', 'image/png');
    favicon.setAttribute('href', 'https://iili.io/3rSv1St.png');
  }, []);

  const handleCTAClick = () => {
    gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: 'main_cta_zh'
    });
    setShowLeadCapture(true);
  };

  return (
    <div className="min-h-screen">
      <HeaderZh />
      <main>
        <section><HeroZh /></section>
        <section><HowItWorksZh /></section>
        <section><BenefitsZh /></section>
        <section><TestimonialsZh /></section>
        <section><CommunityBenefits /></section>
        <section><FAQZh /></section>
        
        {/* CTA Section */}
        <section className="py-20" style={{ background: `linear-gradient(135deg, #08449E, #063275)` }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                立即了解您的跌倒風險
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                只需10分鐘，即可獲得專業評估和個人化建議。及早預防，守護摯愛。
              </p>
              <div className="space-y-6">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1 max-w-xs">
                    <p className="text-white text-lg">✓ AI智能評估</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1 max-w-xs">
                    <p className="text-white text-lg">✓ 準確度超過90%</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1 max-w-xs">
                    <p className="text-white text-lg">✓ 專業評估與訓練</p>
                  </div>
                </div>
                <button
                  onClick={handleCTAClick}
                  className="inline-block bg-white px-12 py-4 rounded-full text-xl font-bold hover:bg-blue-50 transition-colors transform hover:-translate-y-1 hover:shadow-xl"
                  style={{ color: '#08449E' }}
                >
                  立即登記
                </button>
                <p className="text-blue-100 text-sm mt-4">
                  已幫助超過1000位長者預防跌倒
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterZh />
    </div>
  );
};

export default ChineseLayout;