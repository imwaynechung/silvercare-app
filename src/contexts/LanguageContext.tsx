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

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage,
        showSelector,
        setShowSelector,
        userType,
        setUserType,
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