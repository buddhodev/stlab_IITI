// Intercept and sanitize any cross-origin script error triggers for sandbox environments
(function() {
  const isScriptError = (msg: string) => {
    if (!msg) return true;
    const lower = msg.toLowerCase();
    return lower.includes("script error") || lower.includes("translate.google") || lower.includes("googletranslateelementinit");
  };

  // 1. Configure robust global onerror handler
  const prevOnError = window.onerror;
  window.onerror = function(message, url, line, col, error) {
    const msgStr = typeof message === "string" ? message : "";
    if (isScriptError(msgStr)) {
      return true; // Bypass default error handling
    }
    if (prevOnError) {
      return prevOnError.apply(window, [message, url, line, col, error]);
    }
    return false;
  };

  // 2. Intercept any runtime error listeners to filter out cross-origin "Script error."
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = function(this: any, type: string, listener: any, options?: any) {
    if (type === "error") {
      const wrappedListener = function(this: any, event: ErrorEvent) {
        const msg = event?.message || "";
        if (isScriptError(msg)) {
          try {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
          } catch (e) {}
          return;
        }
        if (typeof listener === "function") {
          listener.apply(this, arguments as any);
        } else if (listener && typeof listener.handleEvent === "function") {
          listener.handleEvent(event);
        }
      };
      
      // Store reference on wrappedListener so removeEventListener can find it if needed
      (wrappedListener as any)._originalListener = listener;
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
