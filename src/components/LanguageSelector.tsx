import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

const LanguageSelector: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    showSelector, 
    showUserTypeSelector,
    setShowUserTypeSelector,
    setUserType,
    userType
  } = useLanguage();
  const navigate = useNavigate();

  const handleUserTypeSelect = async (type: 'caregiver' | 'senior') => {
    try {
      // Get location data
      const response = await fetch('https://ipapi.co/json/');
      const locationData = await response.json();

      // Save to Supabase
      const { error } = await supabase
        .from('user_profiles')
        .insert([{
          user_type: type,
          country: locationData.country_name || null,
          region: locationData.region || null,
          city: locationData.city || null
        }]);

      if (error) {
        console.error('Error saving user profile:', error);
        // Continue with the flow even if save fails
      }

      // Update context
      setUserType(type);
      setShowUserTypeSelector(false);

      // Track in Google Analytics
      gtag('event', 'user_type_selected', {
        event_category: 'engagement',
        event_label: type
      });

      // Navigate to appropriate page
      navigate(language === 'zh' ? '/zh' : '/');
    } catch (error) {
      console.error('Error saving user profile:', error);
      // Still set user type even if save fails
      setUserType(type);
      setShowUserTypeSelector(false);
      navigate(language === 'zh' ? '/zh' : '/');
    }
  };

  if (!showSelector && !showUserTypeSelector) return null;

  if (showUserTypeSelector) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-center mb-6">您是？</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleUserTypeSelect('caregiver')}
              className={`p-4 rounded-lg border-2 transition-all ${
                userType === 'caregiver'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className="text-lg font-medium">照顧者</div>
              <div className="text-sm text-gray-500">我是家人或照顧者</div>
            </button>
            <button
              onClick={() => handleUserTypeSelect('senior')}
              className={`p-4 rounded-lg border-2 transition-all ${
                userType === 'senior'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className="text-lg font-medium">長者</div>
              <div className="text-sm text-gray-500">我是長者</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-6">Select Your Language</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setLanguage('en')}
            className={`p-4 rounded-lg border-2 transition-all ${
              language === 'en'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-400'
            }`}
          >
            <div className="text-lg font-medium">English</div>
            <div className="text-sm text-gray-500">Continue in English</div>
          </button>
          <button
            onClick={() => setLanguage('zh')}
            className={`p-4 rounded-lg border-2 transition-all ${
              language === 'zh'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-400'
            }`}
          >
            <div className="text-lg font-medium">中文</div>
            <div className="text-sm text-gray-500">繼續使用中文</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;