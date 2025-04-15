document.addEventListener('DOMContentLoaded', () => {
  const historyEl = document.getElementById('history');
  const searchBar = document.getElementById('searchBar');
  const toast = document.getElementById('toast');
  let clipboardHistory = [];

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  function renderHistory(data) {
    historyEl.innerHTML = '';
    data.forEach((text, index) => {
      const li = document.createElement('li');
      li.className = 'entry';

      const span = document.createElement('span');
      span.textContent = text;
      span.className = 'text-block';
      span.title = text;
      span.onclick = () => {
        navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!');
      };

      const del = document.createElement('span');
      del.innerHTML = '<i class="fa-solid fa-trash-alt delete-icon"></i>';
      del.className = 'delete-icon';
      del.onclick = (e) => {
        e.stopPropagation();
        clipboardHistory.splice(index, 1);
        chrome.storage.local.set({ clipboardHistory }, () => renderHistory(clipboardHistory));
      };

      li.appendChild(span);
      li.appendChild(del);
      historyEl.appendChild(li);
    });
  }

  function loadHistory() {
    chrome.storage.local.get(['clipboardHistory'], (result) => {
      clipboardHistory = result.clipboardHistory || [];
      renderHistory(clipboardHistory);
    });
  }

  loadHistory();

  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filtered = clipboardHistory.filter(text => text.toLowerCase().includes(query));
    renderHistory(filtered);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.clipboardHistory) {
      clipboardHistory = changes.clipboardHistory.newValue || [];
      renderHistory(clipboardHistory);
    }
  });
});
