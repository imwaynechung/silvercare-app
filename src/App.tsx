import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import ChatbotAssessment from './components/ChatbotAssessment';
import ChatbotAssessmentZh from './components/zh/ChatbotAssessmentZh';
import ReportZh from './components/zh/ReportZh';
import MobileLayout from './components/MobileLayout';
import AssessmentSelectionScreen from './components/AssessmentSelectionScreen';
import CognitiveAssessmentScreen from './components/CognitiveAssessmentScreen';
import PersonalizedDietScreen from './components/PersonalizedDietScreen';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('ErrorBoundary caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component Error:', error, errorInfo);
    // You could log to an error tracking service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 text-white p-4 z-50">
          <img 
            src="https://iili.io/3rSv1St.png" 
            alt="銀齡樂" 
            className="w-20 h-20 mb-6"
          />
          <h1 className="text-2xl font-bold mb-2">應用程式錯誤</h1>
          <p className="text-blue-100 mb-8 text-center">
            {this.state.error?.message || '應用程式遇到錯誤，請重新載入頁面。'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium min-h-[44px]"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            重新載入
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const LoadingFallback: React.FC = () => {
  useEffect(() => {
    // Ensure viewport is properly set during loading
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-40">
      <div className="text-center p-4">
        <img 
          src="https://iili.io/3rSv1St.png" 
          alt="銀齡樂" 
          className="w-16 h-16 mx-auto mb-4 animate-pulse"
        />
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto"></div>
      </div>
    </div>
  );
};

function AppContent() {
  // Handle Safari viewport on route changes
  useEffect(() => {
    const hideAddressBar = () => {
      if (window.scrollY === 0) {
        setTimeout(() => window.scrollTo(0, 1), 100);
      }
    };

    window.addEventListener('popstate', hideAddressBar);
    return () => window.removeEventListener('popstate', hideAddressBar);
  }, []);

  return (
    <LanguageProvider>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<MobileLayout />} />
          <Route path="/assessment-selection" element={<AssessmentSelectionScreen />} />
          <Route path="/cognitive-assessment" element={<CognitiveAssessmentScreen />} />
          <Route path="/personalized-diet" element={<PersonalizedDietScreen />} />
          <Route 
            path="/chatbot" 
            element={<ChatbotAssessment onComplete={(state) => console.log('Assessment completed:', state)} />} 
          />
          <Route path="/chatbot-zh" element={<ChatbotAssessmentZh />} />
          <Route path="/report-zh/:reportId" element={<ReportZh />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
}

function App() {
  // Initialize mobile optimizations
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    const hideAddressBar = () => {
      if (window.scrollY === 0) {
        window.scrollTo(0, 1);
      }
    };

    setViewportHeight();
    hideAddressBar();

    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 500);
    });

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 500);
      });
    };
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;