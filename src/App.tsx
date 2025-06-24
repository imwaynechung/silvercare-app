import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatbotAssessment from './components/ChatbotAssessment';
import ChatbotAssessmentZh from './components/zh/ChatbotAssessmentZh';
import ReportZh from './components/zh/ReportZh';
import MobileLayout from './components/MobileLayout';
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
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<MobileLayout />} />
          {/* Assessment routes */}
          <Route path="/chatbot" element={<ChatbotAssessment onComplete={(state) => console.log('Assessment completed:', state)} />} />
          <Route path="/chatbot-zh" element={<ChatbotAssessmentZh />} />
          {/* Report routes */}
          <Route path="/report-zh/:reportId" element={<ReportZh />} />
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
        <Router>
          <AppContent />
        </Router>
    </ErrorBoundary>
  );
}

export default App;