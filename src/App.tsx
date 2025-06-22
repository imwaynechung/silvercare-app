import React, { useEffect, Suspense } from 'react';
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

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 text-white max-w-md mx-auto p-4">
          <img 
            src="https://iili.io/3rSv1St.png" 
            alt="銀齡樂" 
            className="w-20 h-20 mb-6"
          />
          <h1 className="text-2xl font-bold mb-2">應用程式錯誤</h1>
          <p className="text-blue-100 mb-8 text-center">
            應用程式遇到錯誤，請重新載入頁面。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium"
          >
            重新載入
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <img 
        src="https://iili.io/3rSv1St.png" 
        alt="銀齡樂" 
        className="w-16 h-16 mx-auto mb-4"
      />
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto"></div>
    </div>
  </div>
);

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
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;