# Octofit Tracker Frontend

The React 19 presentation tier provides routed views for athletes, activities, teams, the leaderboard, and workout recommendations.

## API configuration

Define `VITE_CODESPACE_NAME` in `frontend/.env.local` when the backend is hosted in a GitHub Codespace:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

With that value, the application calls `https://your-codespace-name-8000.app.github.dev/api/<resource>/`. When `VITE_CODESPACE_NAME` is unset, it safely calls the local API at `http://localhost:8000/api/<resource>/` instead.

## Commands

```bash
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
```