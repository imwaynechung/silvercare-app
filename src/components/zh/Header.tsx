import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowLeadCapture } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartClick = () => {
    gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: 'header_cta_zh'
    });
    setShowLeadCapture(true);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Heart className={`h-8 w-8 ${isScrolled ? 'text-[#08449E]' : 'text-white'}`} />
          <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            GOFA <span style={{ color: '#08449E' }}>銀齡樂</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#how-it-works" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-[#08449E] transition-colors`}>
            運作方式
          </a>
          <a href="#benefits" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-[#08449E] transition-colors`}>
            服務優勢
          </a>
          <a href="#testimonials" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-[#08449E] transition-colors`}>
            用戶評價
          </a>
          <a href="#faq" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-[#08449E] transition-colors`}>
            常見問題
          </a>
          <button 
            onClick={handleStartClick}
            style={{ backgroundColor: '#08449E' }}
            className="text-white px-6 py-2 rounded-full font-medium hover:bg-[#063275] transition-colors"
          >
            立即登記
          </button>
        </nav>
        <button className={`md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;