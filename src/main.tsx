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

// Mobile address bar hiding functionality
function hideAddressBar() {
  // Force scroll to hide address bar on mobile
  if (window.innerHeight < window.outerHeight) {
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }
  
  // Set viewport height to hide address bar
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Add class to body to prevent scrolling
  document.body.classList.add('hide-address-bar');
}

// Initialize mobile optimizations
function initMobileOptimizations() {
  // Hide address bar
  hideAddressBar();
  
  // Prevent zoom on double tap
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Prevent pull-to-refresh
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });
  
  document.addEventListener('touchmove', (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  }, { passive: false });
  
  // Handle orientation changes
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      hideAddressBar();
      // Force a reflow to ensure proper sizing
      document.body.style.height = '100vh';
      document.body.style.height = '100dvh';
    }, 500);
  });
  
  // Handle resize events
  window.addEventListener('resize', () => {
    hideAddressBar();
  });
  
  // Prevent context menu on long press
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

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
    height: 100vh;
    height: 100dvh;
    background: #08449E;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    padding: 20px;
    text-align: center;
    overflow: hidden;
  `;
  
  errorDiv.innerHTML = `
    <img src="https://iili.io/3rSv1St.png" alt="銀齡樂" style="width: 80px; height: 80px; margin-bottom: 20px;" />
    <h1 style="font-size: 24px; margin-bottom: 16px; color: white;">載入錯誤</h1>
    <p style="font-size: 16px; margin-bottom: 20px; color: rgba(255,255,255,0.9);">${message}</p>
    <button onclick="window.location.reload()" style="background: white; color: #08449E; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; min-height: 44px;">
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

  // Initialize mobile optimizations immediately
  initMobileOptimizations();

  // Create React root and render app immediately - NO LOADING SCREEN
  const reactRoot = createRoot(root);
  
  // Render the app with error boundary immediately
  reactRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // Additional mobile setup after render
  setTimeout(() => {
    hideAddressBar();
    
    // Ensure proper viewport height
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateVH();
    window.addEventListener('resize', updateVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateVH, 500);
    });
  }, 100);

} catch (error) {
  console.error('Failed to render app:', error);
  showErrorMessage('應用程式載入時發生錯誤，請重新整理頁面或稍後再試。');
}