// global.d.ts

interface Gtag {
  (command: 'config', targetId: string, config?: Record<string, any>): void;
  (command: 'event', eventName: string, eventParams?: Record<string, any>): void;
  (command: 'js', date: Date): void;
}

declare global {
  interface Window {
    gtag: Gtag;
  }
}

export {};
