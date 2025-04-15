# 📋 Clipboard History Chrome Extension

Effortlessly manage and reuse everything you copy across the web! This Chrome Extension automatically captures copied text from any webpage, stores it persistently, and offers a beautiful popup UI to search, delete, and re-copy your clipboard history.

---

## 🚀 Features

- ✅ **Automatic Clipboard Tracking**: Seamlessly captures text when you copy from any tab.
- 📋 **Popup UI**: One-click access to your entire clipboard history.
- 🔍 **Search**: Quickly filter through your saved entries.
- 🗑️ **Delete Individual Entries**: Each item has a delete icon to remove it easily.
- 📦 **Persistent Storage**: Clipboard history is stored using `chrome.storage.local`.
- 📱 **Responsive Design**: Works smoothly across different screen sizes.
- 📢 **Toaster Notification**: Lets you know when a text is copied from the popup.

---

## 🧩 Architecture Overview

```plaintext
                +---------------------------+
                |        Webpage           |
                |    (ChatGPT, blogs, etc) |
                +---------------------------+
                            |
                [ injected.js ]  ← runs in page context
                            |
           window.postMessage({ text })
                            ▼
                +---------------------------+
                |       content.js          |
                |  (content script sandbox) |
                +---------------------------+
                            |
              chrome.runtime.sendMessage({ text })
                            ▼
                +---------------------------+
                |      background.js        |
                |  (persistent background)  |
                +---------------------------+
                            |
                chrome.storage.local.set()
                            ▼
                +---------------------------+
                |         popup.js          |
                | (popup.html + style.css)  |
                +---------------------------+
```

---

## 📁 Project Structure

```
clipboard-extension/
├── manifest.json         # Chrome Extension manifest (v3)
├── background.js         # Background script to store clipboard
├── content.js            # Content script injected into all pages
├── injected.js           # Runs inside actual web page (DOM-access)
├── popup.html            # UI shown when extension icon is clicked
├── popup.js              # Handles rendering, events in popup
├── style.css             # Stylish and responsive popup design
└── icon.png              # Extension icon (optional)
```

---

## ⚙️ How It Works

### 1. Clipboard Tracking
- `injected.js` runs inside web pages and listens for `copy` events.
- When the user copies any text, it grabs the selection and sends it via `window.postMessage(...)`.

### 2. Message Bridging
- `content.js` listens for that message.
- It uses `chrome.runtime.sendMessage(...)` to relay the copied text to the background script.

### 3. Storage
- `background.js` listens for those messages and stores the copied texts in `chrome.storage.local`, avoiding duplicates and trimming to 20 entries.

### 4. Popup UI
- `popup.html` loads `popup.js`, which fetches and displays stored history.
- Search bar filters results live.
- Clicking a text copies it back to clipboard and shows a toast.
- Each entry includes a delete icon to remove that item.

---

## 🛠️ Installation (for development)

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode** (top-right corner)
4. Click **Load Unpacked** and select the project folder.
5. Visit any webpage and start copying text!

---

## ✨ Screenshots

> 📌 Add your screenshots here for UI preview (popup, copy event, toaster message, etc.)

---

## 🔐 Permissions Used

- `clipboardRead`, `clipboardWrite` – To access and write clipboard content
- `storage` – To persist clipboard history locally
- `activeTab`, `scripting` – To inject scripts into pages

---

## 🔧 Future Enhancements

- 🌓 Dark mode support
- 📥 Export clipboard history to `.csv`
- 🔁 Sync history across devices (via `chrome.storage.sync`)
- 📌 Pin or favorite entries
- 📅 Timestamp each copy

---

## 👨‍💻 Author
Built with ❤️ by [Your Name].

Contributions, feedback, and suggestions are welcome!

---

## 📄 License
MIT License – feel free to use, fork, and enhance!

