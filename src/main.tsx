import 'core-js/stable';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Simplified browser compatibility check
const isCompatible = () => {
  try {
    // Basic feature detection
    return !!(
      window.fetch && 
      window.Promise && 
      Array.from && 
      window.requestAnimationFrame
    );
  } catch (error) {
    console.error('Compatibility check failed:', error);
    return true; // Allow app to try loading anyway
  }
};

// Enhanced error handling with user-friendly messages
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
  hideLoadingScreen();
  showErrorMessage('應用程式發生錯誤，請重新整理頁面。');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  hideLoadingScreen();
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

// Hide loading screen function
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }
    }, 500);
  }
}

// Force hide loading screen after maximum wait time
setTimeout(() => {
  hideLoadingScreen();
}, 10000); // 10 seconds maximum

if (!isCompatible()) {
  hideLoadingScreen();
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif; background: #08449E; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
      <img src="https://iili.io/3rSv1St.png" alt="銀齡樂" style="width: 80px; height: 80px; margin: 0 auto 20px;" />
      <h1 style="color: white; font-size: 24px; margin-bottom: 16px;">需要更新瀏覽器</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.5; margin-bottom: 16px; max-width: 400px; margin-left: auto; margin-right: auto;">
        為了獲得最佳體驗，請將瀏覽器更新至最新版本，或使用 Chrome、Safari、Firefox 等現代瀏覽器。
      </p>
      <p style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.5; max-width: 400px; margin-left: auto; margin-right: auto;">
        To use SilverCare, please update your browser to the latest version or try using a modern browser like Chrome, Safari, or Firefox.
      </p>
    </div>
  `;
} else {
  try {
    const root = document.getElementById('root');
    if (!root) {
      throw new Error('Root element not found');
    }

    // Create React root and render app immediately
    const reactRoot = createRoot(root);
    
    // Render the app
    reactRoot.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    // Hide loading screen after React renders
    setTimeout(() => {
      hideLoadingScreen();
    }, 1000);

    // Also hide loading screen when the app is fully loaded
    if (document.readyState === 'complete') {
      setTimeout(() => {
        hideLoadingScreen();
      }, 500);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          hideLoadingScreen();
        }, 500);
      });
    }

  } catch (error) {
    console.error('Failed to render app:', error);
    hideLoadingScreen();
    showErrorMessage('應用程式載入時發生錯誤，請重新整理頁面或稍後再試。');
  }
}