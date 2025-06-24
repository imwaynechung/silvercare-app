import 'core-js/stable';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Consolidated mobile viewport management
class ViewportManager {
  private static instance: ViewportManager;
  private resizeTimeout: NodeJS.Timeout | null = null;
  private monitoringInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.init();
  }

  public static getInstance(): ViewportManager {
    if (!ViewportManager.instance) {
      ViewportManager.instance = new ViewportManager();
    }
    return ViewportManager.instance;
  }

  private init() {
    this.setViewportHeight();
    this.hideAddressBar();
    this.setupEventListeners();
    this.startContinuousMonitoring();
  }

  private setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.body.style.height = `${window.innerHeight}px`;
  }

  private hideAddressBar() {
    if (window.scrollY === 0) {
      window.scrollTo({
        top: 1,
        behavior: 'instant' as ScrollBehavior
      });
    }
  }

  private setupEventListeners() {
    // Debounced resize handler
    window.addEventListener('resize', () => {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.setViewportHeight();
        this.hideAddressBar();
      }, 100);
    });

    // Orientation change handling
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.setViewportHeight();
        this.hideAddressBar();
      }, 500);
    });

    // Touch event prevention
    document.addEventListener('touchstart', this.preventZoom, { passive: false });
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
  }

  private preventZoom(e: TouchEvent) {
    if (e.touches.length > 1) e.preventDefault();
  }

  private preventScroll(e: TouchEvent) {
    if (e.scale && e.scale !== 1) e.preventDefault();
  }

  private startContinuousMonitoring() {
    if (!this.isMobile()) return;

    if (this.monitoringInterval) clearInterval(this.monitoringInterval);
    this.monitoringInterval = setInterval(() => {
      if (Math.abs(window.innerHeight - window.visualViewport.height) > 10) {
        this.setViewportHeight();
        this.hideAddressBar();
      }
    }, 1000);
  }

  private isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  public cleanup() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    if (this.monitoringInterval) clearInterval(this.monitoringInterval);
    document.removeEventListener('touchstart', this.preventZoom);
    document.removeEventListener('touchmove', this.preventScroll);
  }
}

// Error handling utilities
class ErrorHandler {
  static showError(message: string) {
    const existingError = document.getElementById('global-error');
    if (existingError) return;

    const errorHTML = `
      <div id="global-error" style="
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
        padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      ">
        <img src="https://iili.io/3rSv1St.png" alt="Logo" style="width: 80px; height: 80px; margin-bottom: 20px;">
        <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">載入錯誤</h1>
        <p style="margin-bottom: 2rem; max-width: 80%; text-align: center;">${message}</p>
        <button onclick="window.location.reload()" style="
          background: white;
          color: #08449E;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          min-height: 44px;
        ">
          重新載入
        </button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', errorHTML);
  }
}

// Initialize application
function initializeApp() {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error('Missing root element');

    // Initialize viewport manager
    const viewportManager = ViewportManager.getInstance();

    // Render application
    const reactRoot = createRoot(rootElement);
    reactRoot.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    // Final viewport adjustment after render
    setTimeout(() => {
      viewportManager.setViewportHeight();
      viewportManager.hideAddressBar();
    }, 300);

  } catch (error) {
    console.error('Application initialization failed:', error);
    ErrorHandler.showError('應用程式載入時發生錯誤，請重新整理頁面或稍後再試。');
  }
}

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  ErrorHandler.showError('應用程式發生錯誤，請重新整理頁面。');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
  ErrorHandler.showError('系統載入時遇到問題，請重新整理頁面。');
});

// Start the application
initializeApp();