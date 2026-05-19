# Deploy backend (Atlas works from cloud, not from your Mac)

Your Mac cannot reach MongoDB Atlas on port **27017** (timeouts on Wi‑Fi and hotspot).
Deploy the API to **Render** (free tier). Render’s network can reach Atlas; any device uses the same cloud API + Atlas DB.

## 1. Push code to GitHub

Ensure `backend/` is in a GitHub repo.

## 2. Create Render Web Service

1. [render.com](https://render.com) → **New +** → **Web Service**
2. Connect the repo
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Instance type:** Free

## 3. Environment variables (Render dashboard)

Copy from your local `.env`, but set:

| Key | Value |
|-----|--------|
| `DB_URL` | Your full Atlas `mongodb+srv://...` string (from Atlas → Connect → Drivers) |
| `PORT` | `3000` (Render sets `PORT` automatically; keep compatible) |
| `BACKEND_URL` | `https://YOUR-SERVICE-NAME.onrender.com` |
| `FRONT_APP_URL_DEV` | Frontend URL (e.g. `http://localhost:5173` or Vercel URL) |
| `JWT_SECRET` | same as local |
| `PASSPORT_SECRET` | same as local |
| `GOOGLE_CLIENT_ID` | same |
| `GOOGLE_CLIENT_SECRET` | same |
| `GITHUB_CLIENT_ID` | same |
| `GITHUB_CLIENT_SECRET` | same |
| Mail vars | if you use email features |

## 4. Google OAuth (required for Google sign-in)

In [Google Cloud Console](https://console.cloud.google.com/) → APIs & Credentials → your OAuth client:

- **Authorized redirect URIs:** add  
  `https://YOUR-SERVICE-NAME.onrender.com/api/auth/google/callback`

## 5. Point frontend at Render

In `frontend/src/constants/BACKEND.js` and `frontend/src/api.js`:

```js
export const BACKEND_URL = "https://YOUR-SERVICE-NAME.onrender.com";
// axios baseURL: same URL
```

## 6. Verify

- Render logs should show: `Connected to MongoDB Atlas successfully!`
- Open `https://YOUR-SERVICE-NAME.onrender.com/api/auth/google` in browser (should redirect to Google)

## Atlas checklist (if Render also fails)

1. **Database → Deployments** → cluster **not Paused**
2. **Database Access** → reset DB user password → copy new connection string
3. **Network Access** → `0.0.0.0/0` active (you already have this)
4. **Browse Collections** in Atlas UI — if this works, Atlas is fine; only your Mac is blocked
