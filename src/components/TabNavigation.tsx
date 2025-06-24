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
    { id: 'program', label: '自我評估', icon: Dumbbell },
    { id: 'community', label: '社區', icon: Users },
  ];

  // Enhanced mobile Safari address bar hiding
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const hideAddressBar = () => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Multiple strategies for different mobile browsers
      timeoutId = setTimeout(() => {
        // Force scroll to hide address bar
        window.scrollTo(0, 1);
        
        // Then scroll back to top
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 50);
        
        // Set viewport height variables
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Force body dimensions
        document.body.style.height = '100vh';
        document.body.style.height = '100dvh';
      }, 100);
    };

    // Hide address bar on various events
    const events = ['scroll', 'touchstart', 'touchend', 'resize', 'orientationchange'];
    
    events.forEach(event => {
      window.addEventListener(event, hideAddressBar, { passive: true });
    });

    // Initial hide
    hideAddressBar();

    // Cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      events.forEach(event => {
        window.removeEventListener(event, hideAddressBar);
      });
    };
  }, []);

  return (
    <div 
      className="nav-mobile fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
      style={{
        // Enhanced mobile Safari compatibility
        overflow: 'hidden',
        position: 'fixed',
        bottom: '0',
        width: '100%',
        paddingBottom: 'env(safe-area-inset-bottom)',
        // Prevent Safari's rubber band effect
        WebkitOverflowScrolling: 'touch',
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
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 touch-manipulation ${
                isActive
                  ? 'text-blue-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ 
                minHeight: '60px',
                // Enhanced touch handling for iOS
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                // Ensure proper touch target size
                touchAction: 'manipulation',
              }}
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