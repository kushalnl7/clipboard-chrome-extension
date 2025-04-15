document.addEventListener('copy', () => {
  const selectedText = document.getSelection()?.toString();
  if (selectedText && selectedText.trim()) {
    window.postMessage({
      source: 'clipboard-extension',
      type: 'COPIED_TEXT',
      text: selectedText
    }, '*');
  }
});