# Collab Design (Hussain thesis)

Collaborative diagramming app with team chat and project management.

## Repository structure

| Folder | Description |
|--------|-------------|
| `frontend/` | React + Vite UI |
| `backend/` | Express API, MongoDB, Socket.io |
| `apollon/` | UML diagram editor (used by the canvas) |

## Prerequisites

- **Node.js** 18.17+ ([nodejs.org](https://nodejs.org))
- **npm** (comes with Node)
- **MongoDB** — [MongoDB Atlas](https://www.mongodb.com/atlas) (recommended) or local MongoDB on `127.0.0.1:27017`
- **Git**

Optional (for full features):

- Google / GitHub OAuth apps (sign-in)
- SendGrid or SMTP (verification email, password reset, invitations)

---

## Installation (local development)

Clone the repo and install dependencies in each folder.

### 1. Clone the repository

```bash
git clone https://github.com/sobanomar/collab_design_hussain_v1.0.git
cd collab_design_hussain_v1.0
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
```

Edit `backend/.env`:

| Variable | Local example | Notes |
|----------|---------------|--------|
| `DB_URL` | `mongodb+srv://USER:PASS@cluster.mongodb.net/hussain?retryWrites=true&w=majority` | From Atlas → Connect → Drivers |
| `JWT_SECRET` | any long random string | |
| `PASSPORT_SECRET` | any long random string | |
| `BACKEND_URL` | `http://localhost:3000` | |
| `FRONT_APP_URL_DEV` | `http://localhost:5173` | |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | from Google Cloud Console | optional |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | from GitHub OAuth app | optional |
| Mail | SMTP or `SENDGRID_API_KEY` + `MAIL_FROM` | see `backend/.env.example` |

Start the API:

```bash
npm start
```

Server runs at **http://localhost:3000**.

### 3. Apollon (diagram module)

Required for local canvas/diagram editing (frontend imports Apollon source).

```bash
cd ../apollon
npm install
```

You only need `npm run build` inside `apollon/` if you change the diagram module itself.

### 4. Frontend

```bash
cd ../frontend
npm install
```

Point the UI at your API. For local backend, set both files to:

```js
// frontend/src/constants/BACKEND.js
export const BACKEND_URL = "http://localhost:3000";

// frontend/src/api.js — axios baseURL
baseURL: "http://localhost:3000",
```

Start the dev server:

```bash
npm run dev
```

App runs at **http://localhost:5173**.

### 5. Google OAuth (local)

In [Google Cloud Console](https://console.cloud.google.com/) → OAuth client:

- **Authorized redirect URI:** `http://localhost:3000/api/auth/google/callback`
- **Authorized JavaScript origin:** `http://localhost:5173`

Use the same `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `backend/.env`.

---

## Run everything (summary)

Use **three terminals**:

```bash
# Terminal 1 — API
cd backend && npm start

# Terminal 2 — UI
cd frontend && npm run dev
```

Apollon is loaded via the frontend build; run `cd apollon && npm install` once after clone.

---

## Production deployment

| Part | Platform | Docs |
|------|----------|------|
| Frontend | Vercel | Root `vercel.json`, set `BACKEND_URL` in `frontend/src/constants/BACKEND.js` and `frontend/src/api.js` to your Render URL |
| Backend | Render | `backend/DEPLOY.md` |
| Database | MongoDB Atlas | Connection string in Render env `DB_URL` |

Example production API URL:

```text
https://collab-design-hussain-v1-0.onrender.com
```

On Render, set `BACKEND_URL` and `FRONT_APP_URL_DEV` (your Vercel URL). Email on Render free tier: use **SendGrid** (`SENDGRID_API_KEY`) — see `backend/DEPLOY.md`.

---

## Useful commands

| Command | Where | Purpose |
|---------|--------|---------|
| `npm start` | `backend/` | Run API |
| `npm run dev` | `frontend/` | Run UI (dev) |
| `npm run build` | `frontend/` | Production build |
| `npm install` | `backend/`, `frontend/`, `apollon/` | Install dependencies |

---

## Troubleshooting

- **Atlas connection timeout on Mac** — deploy backend to Render (`backend/DEPLOY.md`) or use local MongoDB in `DB_URL`.
- **Diagram canvas fails to load** — run `npm install` in `apollon/`; ensure `frontend` has Apollon deps (`npm install` in `frontend/`).
- **Google login → localhost** — fix `BACKEND_URL` on Render and redirect URI in Google Console.
- **Emails not sending on Render** — use SendGrid, not Gmail SMTP (free Render blocks SMTP ports).

---

## License

See individual packages (`apollon/` is MIT per upstream Apollon project).
