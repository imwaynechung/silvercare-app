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

  return (
    <div className="nav-mobile">
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
              style={{ minHeight: '60px' }}
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