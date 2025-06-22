import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import EnglishLayout from './layouts/EnglishLayout';
import ChineseLayout from './layouts/ChineseLayout';
import LanguageSelector from './components/LanguageSelector';
import ChatbotAssessment from './components/ChatbotAssessment';
import ChatbotAssessmentZh from './components/zh/ChatbotAssessmentZh';
import ThankYou from './components/ThankYou';
import ThankYouZh from './components/zh/ThankYouZh';
import SimpleThankYou from './components/SimpleThankYou';
import SimpleThankYouZh from './components/zh/SimpleThankYouZh';
import Report from './components/Report';
import ReportZh from './components/zh/ReportZh';
import BetaQuizPrompt from './components/BetaQuizPrompt';
import BetaQuizPromptZh from './components/zh/BetaQuizPromptZh';
import SimpleLeadCapture from './components/SimpleLeadCapture';
import SimpleLeadCaptureZh from './components/zh/SimpleLeadCaptureZh';
import DirectLeadCaptureZh from './components/DirectLeadCaptureZh';
import MobileLayout from './components/MobileLayout';

function AppContent() {
  const location = useLocation();
  const { language, showBetaQuizPrompt, showLeadCapture } = useLanguage();

  useEffect(() => {
    try {
      // Send page view to Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
          page_path: location.pathname + location.search + location.hash,
          page_title: document.title,
          page_location: window.location.href
        });
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }, [location]);

  // Only show language selector on specific routes
  const showLanguageSelector = location.pathname === '/website' || location.pathname === '/website/zh';
  
  // Don't show prompts on chatbot-zh route
  const isChatbotZh = location.pathname === '/chatbot-zh';

  return (
    <>
      {showLanguageSelector && <LanguageSelector />}
      {!isChatbotZh && showBetaQuizPrompt && (language === 'zh' ? <BetaQuizPromptZh /> : <BetaQuizPrompt />)}
      {!isChatbotZh && showLeadCapture && (language === 'zh' ? <SimpleLeadCaptureZh /> : <SimpleLeadCapture />)}
      <Routes>
        {/* Default route - Mobile App Dashboard */}
        <Route path="/" element={<MobileLayout />} />
        
        {/* Website routes (moved to /website) */}
        <Route path="/website" element={<EnglishLayout />} />
        <Route path="/website/zh" element={<ChineseLayout />} />
        
        {/* Assessment routes */}
        <Route path="/chatbot" element={<ChatbotAssessment onComplete={(state) => console.log('Assessment completed:', state)} />} />
        <Route path="/chatbot-zh" element={<ChatbotAssessmentZh />} />
        
        {/* Thank you routes */}
        <Route path="/thank-you/:reportId" element={<ThankYou />} />
        <Route path="/thank-you-zh/:reportId" element={<ThankYouZh />} />
        <Route path="/simple-thank-you" element={<SimpleThankYou />} />
        <Route path="/simple-thank-you-zh" element={<SimpleThankYouZh />} />
        
        {/* Report routes */}
        <Route path="/report/:reportId" element={<Report />} />
        <Route path="/report-zh/:reportId" element={<ReportZh />} />

        {/* Direct Lead Capture route */}
        <Route path="/simple-lead-capture-zh" element={<DirectLeadCaptureZh />} />
        
        {/* Legacy app route redirect */}
        <Route path="/app" element={<Navigate to="/" replace />} />
        
        {/* Catch all route - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;