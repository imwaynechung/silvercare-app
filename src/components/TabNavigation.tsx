import React from 'react';
import { Home, Brain, Dumbbell, Users, MessageCircle, Calendar } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'today', label: '今日', icon: Calendar },
    { id: 'assessment', label: '健康檢測', icon: Brain },
    { id: 'dashboard', label: '首頁', icon: Home },
    { id: 'program', label: '自我評估', icon: Dumbbell },
    { id: 'family', label: '記錄', icon: Users },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom z-50">
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 ${
                isActive
                  ? 'text-blue-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.id === 'dashboard' && isActive ? (
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center mb-1">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-900' : 'text-gray-600'}`} />
              )}
              <span className={`text-xs font-medium truncate ${isActive ? 'text-blue-900' : 'text-gray-600'}`}>
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