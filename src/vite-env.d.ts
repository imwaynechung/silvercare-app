/// <reference types="vite/client" />

interface Window {
  gtag: (command: string, ...args: any[]) => void;
  dataLayer: any[];
}

declare function gtag(...args: any[]): void;