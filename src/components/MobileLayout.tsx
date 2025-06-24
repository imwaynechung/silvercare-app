import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import DashboardScreen from '../screens/DashboardScreen';
import AssessmentScreen from '../screens/AssessmentScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CompanionScreen from '../screens/CompanionScreen';

const MobileLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Aggressive address bar hiding on mount
    const hideAddressBar = () => {
      // Multiple strategies for different browsers
      window.scrollTo(0, 1);
      setTimeout(() => window.scrollTo(0, 0), 50);
      
      // Force viewport height
      const vh = Math.min(window.innerHeight, window.screen.height) * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Force body dimensions
      document.body.style.height = '100%';
      document.body.style.minHeight = '100vh';
      document.body.style.minHeight = '100dvh';
      document.body.style.minHeight = '-webkit-fill-available';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    };

    hideAddressBar();

    // Track page view safely
    try {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
          page_title: 'Mobile App Dashboard',
          page_location: window.location.href
        });
      }
    } catch (e) {
      console.warn('Analytics not available:', e);
    }

    // Prevent pull-to-refresh and zoom
    const preventDefaultTouch = (e: any) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventZoom = (e: TouchEvent) => {
      if (e.scale !== 1) {
        e.preventDefault(); 
      }
    };

    document.addEventListener('touchstart', preventDefaultTouch, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });

    // Continuous address bar hiding for mobile
    let interval: NodeJS.Timeout;
    
    // Check if it's iOS Safari specifically
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
    
    if (isIOS && isSafari) {
      // More aggressive for iOS Safari
      interval = setInterval(hideAddressBar, 1000);
      
      // Add scroll event listener to hide toolbar on scroll
      window.addEventListener('scroll', () => {
        setTimeout(hideAddressBar, 100);
      });
    } else if (/Android/i.test(navigator.userAgent)) {
      // Less aggressive for Android
      interval = setInterval(hideAddressBar, 3000);
    }
    
    return () => {
      document.removeEventListener('touchstart', preventDefaultTouch);
      document.removeEventListener('touchmove', preventZoom);
      clearInterval(interval);
    };
  }, []);

  const handleTabChange = (tab: string) => {
    try {
      if (tab === 'program') {
        // Navigate to Chinese chatbot for 自我評估
        navigate('/chatbot-zh');
        return;
      }
      setActiveTab(tab);
    } catch (error) {
      console.error('Tab change error:', error);
      setError('導航錯誤');
    }
  };

  const renderScreen = () => {
    try {
      switch (activeTab) {
        case 'dashboard':
          return <DashboardScreen />;
        case 'assessment':
          return <AssessmentScreen />;
        case 'companion':
          return <CompanionScreen />;
        case 'community':
          return <CommunityScreen />;
        default:
          return <DashboardScreen />;
      }
    } catch (error) {
      console.error('Screen render error:', error);
      return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-4">
          <div className="text-center">
            <img 
              src="https://iili.io/3rSv1St.png" 
              alt="銀齡樂" 
              className="w-16 h-16 mx-auto mb-4"
            />
            <h2 className="text-lg font-bold text-gray-900 mb-2">載入錯誤</h2>
            <p className="text-gray-600 mb-4">頁面載入時發生錯誤</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg btn-mobile"
            >
              重新載入
            </button>
          </div>
        </div>
      );
    }
  };

  if (error) {
    return (
      <div className="h-screen-mobile flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 text-white max-w-md mx-auto p-4">
        <img 
          src="https://iili.io/3rSv1St.png" 
          alt="銀齡樂" 
          className="w-20 h-20 mb-6"
        />
        <h1 className="text-2xl font-bold mb-2">載入錯誤</h1>
        <p className="text-blue-100 mb-8 text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium btn-mobile"
        >
          重新載入
        </button>
      </div>
    );
  }

  // Render immediately without any loading state - optimized for mobile
  return (
    <div className="mobile-screen flex flex-col bg-gray-50 max-w-md mx-auto relative prevent-scroll ios-fix">
      {/* Main Content - with proper padding for fixed navigation and address bar hiding */}
      <div className="flex-1 mobile-scroll">
        <div className="fade-in h-full">
          {renderScreen()}
        </div>
      </div>
      
      {/* Bottom Navigation - Fixed with safe area */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default MobileLayout;