chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveClipboard') {
    const copiedText = message.text;
    chrome.storage.local.get(['clipboardHistory'], (result) => {
      let history = result.clipboardHistory || [];
      if (!history.includes(copiedText)) {
        history.unshift(copiedText);
        if (history.length > 20) history.pop();
        chrome.storage.local.set({ clipboardHistory: history });
      }
    });
  }
});