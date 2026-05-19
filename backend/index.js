const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const http = require("http");
const { setupSocket } = require("./socket");

require("dotenv").config();

const auth = require("./auth/auth.controller");
const user = require("./user/user.controller");
const project = require("./project/project.controller");
const discussionRoutes = require("./team-discussion/discussion.routes");
const diagram = require("./diagram/diagram.controller");
const invitations = require("./project/invitation/invitation.controller");
const notificationRoutes = require("./notification/notification.controller");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

[path.join(__dirname, "uploads"), path.join(__dirname, "uploads/projects")].forEach(
  (dir) => fs.mkdirSync(dir, { recursive: true }),
);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/project", project);
app.use("/api/discussions", discussionRoutes);
app.use("/api/diagram", diagram);
app.use("/api/invitations", invitations);
app.use("/api/notifications", notificationRoutes);

const getMongoOptions = (uri) => {
  const isAtlas = uri.startsWith("mongodb+srv://");
  const base = {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 30000,
  };

  if (isAtlas) {
    return {
      ...base,
      tls: true,
    };
  }

  return base;
};

const normalizeDbUrl = () => {
  const raw = process.env.DB_URL;
  if (!raw || typeof raw !== "string") {
    throw new Error("DB_URL is missing in backend/.env");
  }

  // Trim whitespace / stray quotes (common when editing .env on Windows)
  let uri = raw.trim().replace(/^["']|["']$/g, "");

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(
      `DB_URL must start with mongodb:// or mongodb+srv:// (got: "${uri.slice(0, 40)}..."). ` +
        "Check backend/.env: no spaces after =, use straight quotes only, one active DB_URL line.",
    );
  }

  return uri;
};

const connectToMongoDB = async () => {
  const uri = normalizeDbUrl();

  await mongoose.connect(uri, getMongoOptions(uri));
  console.log(
    uri.startsWith("mongodb+srv://")
      ? "Connected to MongoDB Atlas successfully!"
      : "Connected to MongoDB",
  );
};

const startServer = async () => {
  try {
    await connectToMongoDB();
    setupSocket(server, app);
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`LAN access: http://<this-machine-ip>:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    console.error(
      "\nAtlas could not be reached (port 27017). This is NOT fixed by IP whitelist if 0.0.0.0/0 is already set.",
    );
    console.error("Checks on this Mac:");
    console.error("  • Turn OFF VPN / iCloud Private Relay");
    console.error("  • System Settings → Network → Firewall → allow Node");
    console.error("  • Atlas → Deployments → cluster not Paused");
    console.error("  • Atlas → Connect → reset DB password → paste new DB_URL");
    console.error("\nFor multiple devices: deploy backend to Render (see backend/DEPLOY.md).");
    console.error("Temporary dev on this Mac only:\n  DB_URL=\"mongodb://127.0.0.1:27017/hussain\"");
    process.exit(1);
  }
};

startServer();
