# Collab Design (Hussain thesis)

Collaborative diagramming app with team chat and project management.

## Structure

| Folder | Description |
|--------|-------------|
| `frontend/` | React + Vite UI |
| `backend/` | Express API, MongoDB, Socket.io |
| `apollon/` | Diagram editor module (used by Canvas) |

## Setup

### Backend

```bash
cd backend
cp .env.example .env   # fill in Atlas DB_URL and secrets
npm install
npm start
```

See `backend/DEPLOY.md` for deploying the API (recommended if Atlas is blocked on your network).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Update `src/constants/BACKEND.js` and `src/api.js` if the API is not on `localhost:3000`.

### Apollon

Built separately; the frontend imports from `apollon/public/index` when opening the canvas.

```bash
cd apollon
npm install
npm run build   # if you change the diagram module
```
