import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import DashboardScreen from '../screens/DashboardScreen';
import AssessmentScreen from '../screens/AssessmentScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CompanionScreen from '../screens/CompanionScreen';

const MobileLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === 'program') {
      // Navigate to Chinese chatbot for 自我評估
      navigate('/chatbot-zh');
      return;
    }
    setActiveTab(tab);
  };

  const renderScreen = () => {
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
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 text-white max-w-md mx-auto">
        <img 
          src="https://iili.io/3rSv1St.png" 
          alt="銀齡樂" 
          className="w-20 h-20 mb-6"
        />
        <h1 className="text-2xl font-bold mb-2">銀齡樂</h1>
        <p className="text-blue-100 mb-8">AI智能防跌評估系統</p>
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-100 text-sm">正在載入您的健康助理...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto relative overflow-hidden">
      {/* Main Content - with proper padding for fixed navigation */}
      <div className="flex-1 overflow-y-auto pb-20 smooth-scroll">
        <div className="fade-in">
          {renderScreen()}
        </div>
      </div>
      
      {/* Bottom Navigation - Fixed */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default MobileLayout;