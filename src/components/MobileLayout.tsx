import React, { useState } from 'react';
import TabNavigation from './TabNavigation';
import DashboardScreen from '../screens/DashboardScreen';
import AssessmentScreen from '../screens/AssessmentScreen';
import ProgramScreen from '../screens/ProgramScreen';
import FamilyScreen from '../screens/FamilyScreen';
import CompanionScreen from '../screens/CompanionScreen';

const MobileLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'assessment':
        return <AssessmentScreen />;
      case 'program':
        return <ProgramScreen />;
      case 'today':
        return <ProgramScreen />;
      case 'family':
        return <FamilyScreen />;
      case 'companion':
        return <CompanionScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      
      {/* Bottom Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MobileLayout;