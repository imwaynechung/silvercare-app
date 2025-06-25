import React from 'react';
import { Home, Brain, Dumbbell, Users, MessageCircle } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'companion', label: 'AI助理', icon: MessageCircle },
    { id: 'assessment', label: '復康計劃', icon: Brain },
    { id: 'dashboard', label: '首頁', icon: Home },
    { id: 'self-assessment', label: '自我評估', icon: Dumbbell },
    { id: 'community', label: '社區', icon: Users },
  ];

  // Comprehensive solution for Safari toolbar behavior
  React.useEffect(() => {
    // Set initial viewport height
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.body.style.height = `${window.innerHeight}px`;
    };

    const handleScroll = () => {
      if (tab === 'self-assessment') {
        // Navigate to assessment selection for 自我評估
        navigate('/assessment-selection');
        window.scrollTo(0, 1);
      }
    };

    // Handle orientation changes
    const handleResize = () => {
      setViewportHeight();
      window.scrollTo(0, 1);
    };

    // Initialize
    setViewportHeight();
    window.scrollTo(0, 1);

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <div 
      className="nav-mobile fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
      style={{
        position: 'fixed',
        bottom: '0',
        width: '100%',
        // Handle safe areas (notches and home indicators)
        paddingBottom: 'env(safe-area-inset-bottom)',
        // Prevent rubber band effect
        overflow: 'hidden',
        // Ensure proper layering
        zIndex: 9999,
      }}
    >
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 ${
                isActive
                  ? 'text-blue-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ 
                minHeight: '60px',
                // iOS-specific optimizations
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                touchAction: 'manipulation',
                // Prevent text selection
                userSelect: 'none',
              }}
              aria-label={tab.label}
            >
              {tab.id === 'dashboard' && isActive ? (
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center mb-1 shadow-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 mb-1 transition-colors ${isActive ? 'text-blue-900' : 'text-gray-600'}`} />
              )}
              <span className={`text-xs font-medium truncate transition-colors ${isActive ? 'text-blue-900' : 'text-gray-600'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;