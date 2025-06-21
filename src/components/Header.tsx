import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      event_label: 'header_cta',
      language: 'en'
    });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold">
            Silver<span className="text-blue-600">Care</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
            How It Works
          </a>
          <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">
            Benefits
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
            Testimonials
          </a>
          <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">
            FAQ
          </a>
          <a 
            href="#get-started" 
            onClick={handleStartClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
        </nav>
        <button className="md:hidden text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;