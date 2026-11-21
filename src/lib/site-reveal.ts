// Shared "site revealed" signal for the first-load preloader (same pattern as the
// Beach Hotel site).
//
// The inline boot script in `app/layout.tsx` sets `window.__siteRevealed` to
// `false` while the full-screen loader is going to play, and `true` when it is
// skipped (already seen this session). `SitePreloader` flips it to `true` and
// fires SITE_REVEALED_EVENT once the loader starts fading out.
// Anything that is undefined (SSR, in-app navigations) counts as revealed.

declare global {
  interface Window {
    /** false while the first-load preloader is showing */
    __siteRevealed?: boolean;
  }
}

export const SITE_REVEALED_EVENT = "site:revealed";
export const PRELOADER_SEEN_KEY = "smi-preloader-seen";
// Hides the loader even if React/JS never loads (kept just above SitePreloader's 3s cap).
const BOOT_FAILSAFE_MS = 4000;

/**
 * Inline, render-blocking boot script for <head>. Runs during HTML parse —
 * before first paint and before React — so the loader is either shown from the
 * first frame or hidden without ever flashing.
 */
export const PRELOADER_BOOT_SCRIPT = `(function(){
var d=document.documentElement,w=window;
try{if(sessionStorage.getItem(${JSON.stringify(PRELOADER_SEEN_KEY)})){d.classList.add("preloader-skip");w.__siteRevealed=true;return;}}catch(e){}
d.classList.add("preloading");w.__siteRevealed=false;
setTimeout(function(){if(w.__siteRevealed===false){d.classList.remove("preloading");d.classList.add("preloader-skip");w.__siteRevealed=true;w.dispatchEvent(new Event(${JSON.stringify(SITE_REVEALED_EVENT)}));}},${BOOT_FAILSAFE_MS});
})();`;

export function isSiteRevealed(): boolean {
  return typeof window === "undefined" || window.__siteRevealed !== false;
}

/** Resolves once the site is revealed (immediately if it already is). */
export function waitForSiteReveal(): Promise<void> {
  if (isSiteRevealed()) return Promise.resolve();
  return new Promise((resolve) =>
    window.addEventListener(SITE_REVEALED_EVENT, () => resolve(), { once: true })
  );
}

export function markSiteRevealed() {
  window.__siteRevealed = true;
  window.dispatchEvent(new Event(SITE_REVEALED_EVENT));
}
