# UPSC ZONE AI — Multi-page HTML/CSS/JavaScript demo

## Included pages
- `index.html` — homepage
- `preparation.html` — subject cards, resources and saved daily checklist
- `current-affairs.html` — searchable, filterable illustrative briefing cards
- `world-affairs.html` — regional and international-relations study themes
- `practice.html` — interactive quiz with explanations, score, previous/next and restart
- `syllabus.html` — searchable/filterable checklist saved in the browser
- `previous-year-questions.html` — illustrative questions with subject filtering and expandable explanations
- `subjects/` — individual Polity, History, Geography, Economy, Environment and Ethics study checklists

## Run locally
Extract the ZIP and open `index.html` in a browser, or open the folder in VS Code and use Live Server.

## Interactions
- Mobile navigation opens and closes.
- The quiz answers, provides feedback, calculates score and supports previous/next/restart.
- Current-affairs briefings can be searched and filtered by theme.
- Syllabus topics can be searched, filtered and checked off.
- Subject checklists and daily planner are saved in local browser storage.
- Previous-year-style questions can be searched, filtered and expanded to reveal answers.

## Important demo notes
- All pages are static frontend pages. There is no backend, account system, or live AI connection.
- Current-affairs cards are illustrative study examples, not live news.
- Questions are practice examples and are not claimed to be verbatim official UPSC past-paper questions.
- For official syllabus and exam details, check the current UPSC notification.
- LocalStorage saves progress only in the current browser/device.


## AI Study Mentor
- A floating “Ask Study Mentor” button is added across all pages. It provides study planning, concept-learning tips, revision guidance and sample practice in demo mode.
- For generated answers, run the included Node.js 18+ server and configure an API key securely on the server.

### Run with the AI backend
1. Install Node.js 18 or newer.
2. In the project folder, set `OPENAI_API_KEY` as an environment variable (and optionally `OPENAI_MODEL`). Never place the key in frontend JavaScript or commit it to GitHub.
3. Run `npm start`.
4. Open `http://localhost:3000` (not the Live Server URL).

On Windows PowerShell, set the key for the current terminal with `$env:OPENAI_API_KEY="your-key"` and then run `npm start`. API usage may incur charges. If no API key is configured, the tutor automatically falls back to demo study guidance.
