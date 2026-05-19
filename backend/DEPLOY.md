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
| Mail vars | see **Email** section below |

## 4. Email (verification, password reset, invitations)

**Render free tier blocks outbound SMTP** (ports 25, 465, 587). Gmail/`MAIL_HOST` SMTP will fail silently or timeout in production.

### Option A — SendGrid (recommended on free Render)

1. [sendgrid.com](https://sendgrid.com) → create account → **Settings → API Keys** → Create key.
2. **Settings → Sender Authentication** → verify a single sender email (e.g. your Gmail).
3. On **Render**, add:

| Key | Value |
|-----|--------|
| `SENDGRID_API_KEY` | `SG....` from SendGrid |
| `MAIL_FROM` | The **same verified** email address |

Remove or leave SMTP vars empty; the app uses SendGrid when `SENDGRID_API_KEY` is set.

### Option B — SMTP (local dev or Render paid instance)

Gmail example:

| Key | Value |
|-----|--------|
| `MAIL_HOST` | `smtp.gmail.com` |
| `MAIL_PORT` | `587` |
| `MAIL_EMAIL` | your Gmail |
| `MAIL_PASSWORD` | [App Password](https://myaccount.google.com/apppasswords) (not your normal password) |
| `MAIL_FROM` | `yourname@gmail.com` |

### Check Render logs

After sign-up or “forgot password”, logs should show `Email sent (SendGrid)` or `Email sent (SMTP)`.  
If you see `sendEmail failed`, fix the vars above.

## 5. Google OAuth (required for Google sign-in)

In [Google Cloud Console](https://console.cloud.google.com/) → APIs & Credentials → your OAuth client:

- **Authorized redirect URIs:** add  
  `https://YOUR-SERVICE-NAME.onrender.com/api/auth/google/callback`

## 6. Point frontend at Render

In `frontend/src/constants/BACKEND.js` and `frontend/src/api.js`:

```js
export const BACKEND_URL = "https://YOUR-SERVICE-NAME.onrender.com";
// axios baseURL: same URL
```

## 7. Verify

- Render logs should show: `Connected to MongoDB Atlas successfully!`
- Open `https://YOUR-SERVICE-NAME.onrender.com/api/auth/google` in browser (should redirect to Google)

## Atlas checklist (if Render also fails)

1. **Database → Deployments** → cluster **not Paused**
2. **Database Access** → reset DB user password → copy new connection string
3. **Network Access** → `0.0.0.0/0` active (you already have this)
4. **Browse Collections** in Atlas UI — if this works, Atlas is fine; only your Mac is blocked
