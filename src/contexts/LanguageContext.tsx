import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'zh';
type UserType = 'caregiver' | 'senior' | null;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  showSelector: boolean;
  setShowSelector: (show: boolean) => void;
  userType: UserType;
  setUserType: (type: UserType) => void;
  showUserTypeSelector: boolean;
  setShowUserTypeSelector: (show: boolean) => void;
  showBetaQuizPrompt: boolean;
  setShowBetaQuizPrompt: (show: boolean) => void;
  showLeadCapture: boolean;
  setShowLeadCapture: (show: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [showSelector, setShowSelector] = useState(true);
  const [userType, setUserType] = useState<UserType>(null);
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [showBetaQuizPrompt, setShowBetaQuizPrompt] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setShowSelector(false);
    if (lang === 'zh') {
      setShowUserTypeSelector(true);
    }
  };

  const handleSetUserType = async (type: UserType) => {
    try {
      // Store user profile locally instead of database
      const userProfile = {
        user_type: type,
        created_at: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem('user_profile', JSON.stringify(userProfile));
      
      // Update state
      setUserType(type);
      setShowUserTypeSelector(false);
      
      // Track in Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'user_type_selected', {
          event_category: 'engagement',
          event_label: type
        });
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
      // Still set user type even if save fails
      setUserType(type);
      setShowUserTypeSelector(false);
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage,
        showSelector,
        setShowSelector,
        userType,
        setUserType: handleSetUserType,
        showUserTypeSelector,
        setShowUserTypeSelector,
        showBetaQuizPrompt,
        setShowBetaQuizPrompt,
        showLeadCapture,
        setShowLeadCapture
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}