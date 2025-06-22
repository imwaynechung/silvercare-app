import 'core-js/stable';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced browser compatibility check
const isCompatible = () => {
  // Check for basic modern browser features
  if (!window.fetch || !window.Promise || !Array.from) {
    return false;
  }

  const ua = navigator.userAgent.toLowerCase();
  
  // Check if running on iOS
  if (/iphone|ipad|ipod/.test(ua)) {
    const version = parseInt(ua.match(/os (\d+)_/)?.[1] || '0');
    return version >= 12; // iOS 12+
  }
  
  // Check if running on Android
  if (/android/.test(ua)) {
    const version = parseInt(ua.match(/android (\d+)/)?.[1] || '0');
    return version >= 7; // Android 7+
  }
  
  // Check desktop browsers
  const browser = 
    /edge/.test(ua) ? 'edge' :
    /chrome/.test(ua) ? 'chrome' :
    /firefox/.test(ua) ? 'firefox' :
    /safari/.test(ua) ? 'safari' :
    /opera/.test(ua) ? 'opera' : '';
    
  const minVersions = {
    chrome: 70,
    firefox: 65,
    safari: 12,
    edge: 79,
    opera: 57
  };
    
  if (browser && minVersions[browser]) {
    const version = parseInt(ua.match(new RegExp(`${browser}\\/([\\d]+)`))?.[1] || '0');
    return version >= minVersions[browser];
  }
  
  return true; // Allow unknown browsers to try
};

// Error handling
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
  // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // You could send this to an error tracking service
});

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

    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
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
      </div>
    `;
  }
}