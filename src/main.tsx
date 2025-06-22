import 'core-js/stable';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced browser compatibility check with better mobile support
const isCompatible = () => {
  try {
    // Check for basic modern browser features
    if (!window.fetch || !window.Promise || !Array.from) {
      return false;
    }

    // Check for React-required features
    if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
      return false;
    }

    const ua = navigator.userAgent.toLowerCase();
    
    // Check if running on iOS
    if (/iphone|ipad|ipod/.test(ua)) {
      const version = parseInt(ua.match(/os (\d+)_/)?.[1] || '0');
      return version >= 10; // iOS 10+ (more lenient)
    }
    
    // Check if running on Android
    if (/android/.test(ua)) {
      const version = parseInt(ua.match(/android (\d+)/)?.[1] || '0');
      return version >= 5; // Android 5+ (more lenient)
    }
    
    // Check desktop browsers with more lenient requirements
    const browser = 
      /edge/.test(ua) ? 'edge' :
      /chrome/.test(ua) ? 'chrome' :
      /firefox/.test(ua) ? 'firefox' :
      /safari/.test(ua) ? 'safari' :
      /opera/.test(ua) ? 'opera' : '';
        
    const minVersions = {
      chrome: 60,  // More lenient
      firefox: 55, // More lenient
      safari: 10,  // More lenient
      edge: 16,    // More lenient
      opera: 47    // More lenient
    };
        
    if (browser && minVersions[browser]) {
      const version = parseInt(ua.match(new RegExp(`${browser}\\/([\\d]+)`))?.[1] || '0');
      return version >= minVersions[browser];
    }
    
    return true; // Allow unknown browsers to try
  } catch (error) {
    console.error('Compatibility check failed:', error);
    return true; // If check fails, allow the app to try loading
  }
};

// Enhanced error handling
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
  // Show user-friendly error message
  showErrorMessage('應用程式發生錯誤，請重新整理頁面。');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Show user-friendly error message
  showErrorMessage('載入時發生問題，請重新整理頁面。');
});

function showErrorMessage(message: string) {
  const errorDiv = document.createElement('div');
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
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

if (!isCompatible()) {
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

    // Create React root and render app
    const reactRoot = createRoot(root);
    
    // Render the app
    reactRoot.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    // Hide loading screen after a short delay to ensure app is rendered
    setTimeout(() => {
      hideLoadingScreen();
    }, 2000);

    // Also hide loading screen when the app is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        hideLoadingScreen();
      }, 1000);
    });

  } catch (error) {
    console.error('Failed to render app:', error);
    hideLoadingScreen();
    
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif; background: #08449E; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
        <img src="https://iili.io/3rSv1St.png" alt="銀齡樂" style="width: 80px; height: 80px; margin: 0 auto 20px;" />
        <h1 style="color: white; font-size: 24px; margin-bottom: 16px;">載入錯誤</h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
          應用程式載入時發生錯誤，請重新整理頁面或稍後再試。
        </p>
        <button onclick="window.location.reload()" style="background: white; color: #08449E; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer;">
          重新載入
        </button>
        <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin-top: 20px;">
          錯誤詳情: ${error.message}
        </p>
      </div>
    `;
  }
}