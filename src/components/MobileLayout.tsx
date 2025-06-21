import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import DashboardScreen from '../screens/DashboardScreen';
import AssessmentScreen from '../screens/AssessmentScreen';
import ProgramScreen from '../screens/ProgramScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CompanionScreen from '../screens/CompanionScreen';

const MobileLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

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

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto relative">
      {/* Main Content - with proper padding for fixed navigation */}
      <div className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </div>
      
      {/* Bottom Navigation - Fixed */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default MobileLayout;