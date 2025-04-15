// content.js

function injectScriptFromExtension() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injected.js'); // Safe, trusted source
  script.type = 'text/javascript';

  script.onload = () => {
    console.log('[Content] injected.js loaded successfully');
    script.remove(); // Clean up after injection
  };

  script.onerror = (err) => {
    console.error('[Content] Failed to load injected.js', err);
  };

  const container = document.head || document.documentElement;
  if (container) {
    container.appendChild(script);
  } else {
    console.error('[Content] Could not find a container to inject script');
  }
}

// Ensure DOM is ready before injecting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectScriptFromExtension);
} else {
  injectScriptFromExtension();
}

// Listen for messages from injected.js
window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data?.source !== 'clipboard-extension') return;

  const text = event.data.text;
  if (!text || typeof text !== 'string') return;

  try {
    chrome.runtime.sendMessage({ action: 'saveClipboard', text });
  } catch (err) {
    console.error('[Content] Error sending clipboard text:', err);
  }
});
