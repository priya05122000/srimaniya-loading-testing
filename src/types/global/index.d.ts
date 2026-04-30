// src/types/global/index.d.ts

export {}; // ✅ REQUIRED here (different from previous case)

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetOrName: string | Date,
      params?: Record<string, any>
    ) => void;
  }
}

declare module "*.css";