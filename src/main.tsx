import 'core-js/stable';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced error handling with user-friendly messages
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
  showErrorMessage('應用程式發生錯誤，請重新整理頁面。');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  showErrorMessage('載入時發生問題，請重新整理頁面。');
});

function showErrorMessage(message: string) {
  // Remove any existing error messages
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #08449E;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 20px;
    text-align: center;
  `;
  
  errorDiv.innerHTML = `
    <img src="https://iili.io/3rSv1St.png" alt="銀齡樂" style="width: 80px; height: 80px; margin-bottom: 20px;" />
    <h1 style="font-size: 24px; margin-bottom: 16px; color: white;">載入錯誤</h1>
    <p style="font-size: 16px; margin-bottom: 20px; color: rgba(255,255,255,0.9);">${message}</p>
    <button onclick="window.location.reload()" style="background: white; color: #08449E; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer;">
      重新載入
    </button>
  `;
  
  document.body.appendChild(errorDiv);
}

try {
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element not found');
  }

  // Create React root and render app immediately
  const reactRoot = createRoot(root);
  
  // Render the app with error boundary - NO LOADING SCREEN
  reactRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

} catch (error) {
  console.error('Failed to render app:', error);
  showErrorMessage('應用程式載入時發生錯誤，請重新整理頁面或稍後再試。');
}