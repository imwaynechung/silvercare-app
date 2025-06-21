import 'core-js/stable';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check for browser compatibility
const isCompatible = () => {
  const minVersions = {
    chrome: 49,
    firefox: 52,
    safari: 10,
    edge: 14,
    opera: 36,
    ios: 10,
    android: 5
  };

  const ua = navigator.userAgent.toLowerCase();
  
  // Check if running on iOS
  if (/iphone|ipad|ipod/.test(ua)) {
    const version = parseInt(ua.match(/os (\d+)_/)?.[1] || '0');
    return version >= minVersions.ios;
  }
  
  // Check if running on Android
  if (/android/.test(ua)) {
    const version = parseInt(ua.match(/android (\d+)/)?.[1] || '0');
    return version >= minVersions.android;
  }
  
  // Check desktop browsers
  const browser = 
    /edge/.test(ua) ? 'edge' :
    /chrome/.test(ua) ? 'chrome' :
    /firefox/.test(ua) ? 'firefox' :
    /safari/.test(ua) ? 'safari' :
    /opera/.test(ua) ? 'opera' : '';
    
  if (browser) {
    const version = parseInt(ua.match(new RegExp(`${browser}\\/([\\d]+)`))?.[1] || '0');
    return version >= (minVersions[browser] || 0);
  }
  
  return false;
};

if (!isCompatible()) {
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif;">
      <h1 style="color: #1e40af; font-size: 24px; margin-bottom: 16px;">Browser Update Required</h1>
      <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
        To use SilverCare, please update your browser to the latest version or try using a modern browser like Chrome, Firefox, Safari, or Edge.
      </p>
      <p style="color: #374151; font-size: 16px; line-height: 1.5;">
        需要更新瀏覽器才能使用銀齡樂。請將瀏覽器更新至最新版本，或使用 Chrome、Firefox、Safari 或 Edge 等現代瀏覽器。
      </p>
    </div>
  `;
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}