# Collapsible Sidebar Extension

This Chrome extension adds a collapsible sidebar to ChatGPT, Claude, Perplexity and Gemini conversations.

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Build the extension:
   ```
   npm run build
   ```

3. Load the extension in Chrome:
   - Go to `chrome://extensions/`.
   - Enable "Developer Mode".
   - Click "Load Unpacked" and select the `dist/` folder.

## Behavior
1. It adds a button "Show GPTBuddy" on the right side edge of all these 4 websites. Clicking it opens a sidebar with all the questions in that conversation. Clicking a question scrolls the view to that question. The sidebar can be hidden by clicking the "Hide GPTBuddy" button.
2. The sidebar can also be toggled by clicking on the extension icon in the chrome toolbar.
3. It can also be toggled by the hotkey combination "Ctrl + Shift + 0"