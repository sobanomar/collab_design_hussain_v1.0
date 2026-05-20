const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

function generateHtmlToSend(filePath, replacements) {
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  return template(replacements);
}

function getFromAddress() {
  const raw = (process.env.MAIL_FROM || process.env.MAIL_EMAIL || "").trim();
  if (!raw) return "";
  const angle = raw.match(/<([^>]+)>/);
  return (angle ? angle[1] : raw).trim();
}

function getFromName() {
  return process.env.MAIL_FROM_NAME || "Collab Design";
}

function smtpConfigured() {
  return Boolean(
    process.env.MAIL_HOST &&
      process.env.MAIL_EMAIL &&
      process.env.MAIL_PASSWORD,
  );
}

function getMailMode() {
  if (process.env.BREVO_API_KEY) return "brevo";
  if (process.env.SENDGRID_API_KEY) return "sendgrid";
  if (smtpConfigured()) return "smtp";
  return "none";
}

function logMailConfig() {
  const mode = getMailMode();
  const from = getFromAddress();
  if (mode === "brevo") {
    console.log("Mail: Brevo API (from:", from || "MAIL_FROM not set", ")");
  } else if (mode === "sendgrid") {
    console.log("Mail: SendGrid API (from:", from || "MAIL_FROM not set", ")");
  } else if (mode === "smtp") {
    console.log(
      "Mail: SMTP",
      process.env.MAIL_HOST + ":" + (process.env.MAIL_PORT || 587),
    );
  } else {
    console.warn(
      "Mail: NOT CONFIGURED — set BREVO_API_KEY + MAIL_FROM (Render) or MAIL_HOST/MAIL_EMAIL/MAIL_PASSWORD (local SMTP).",
    );
  }
}

function createSmtpTransport() {
  const port = Number(process.env.MAIL_PORT) || 587;
  const secure = port === 465;

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port,
    secure,
    requireTLS: !secure && port === 587,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });
}

async function sendViaSmtp({ to, subject, html }) {
  if (!smtpConfigured()) {
    throw new Error(
      "SMTP not configured. Set MAIL_HOST, MAIL_EMAIL, MAIL_PASSWORD (local) or BREVO_API_KEY (Render).",
    );
  }

  const transport = createSmtpTransport();
  await transport.verify();
  const info = await transport.sendMail({
    from: getFromAddress(),
    to,
    subject,
    html,
  });
  console.log("Email sent (SMTP):", info.messageId || info.response);
  return info;
}

async function sendViaBrevo({ to, subject, html }) {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = getFromAddress();

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not set.");
  }
  if (!fromEmail) {
    throw new Error("MAIL_FROM is required (must match your verified Brevo sender).");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: getFromName(), email: fromEmail },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo error ${response.status}: ${body}`);
  }

  console.log("Email sent (Brevo) to:", to);
}

async function sendViaSendGrid({ to, subject, html }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = getFromAddress();

  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY is not set.");
  }
  if (!from) {
    throw new Error("MAIL_FROM or MAIL_EMAIL is required for SendGrid.");
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`SendGrid error ${response.status}: ${body}`);
  }

  console.log("Email sent (SendGrid) to:", to);
}

/**
 * Sends transactional email.
 * On Render free tier use BREVO_API_KEY or SENDGRID_API_KEY (SMTP ports are blocked).
 */
async function sendEmail(
  subject,
  filePath,
  email,
  replacements,
  html = null,
  attachments = null,
) {
  if (attachments) {
    console.warn("sendEmail: attachments are not supported with API mail providers.");
  }

  const htmlBody =
    html == null ? generateHtmlToSend(filePath, replacements) : html;

  try {
    if (process.env.BREVO_API_KEY) {
      await sendViaBrevo({ to: email, subject, html: htmlBody });
      return;
    }
    if (process.env.SENDGRID_API_KEY) {
      await sendViaSendGrid({ to: email, subject, html: htmlBody });
      return;
    }

    await sendViaSmtp({ to: email, subject, html: htmlBody });
  } catch (error) {
    console.error("sendEmail failed:", {
      to: email,
      subject,
      message: error.message,
    });
    if (
      smtpConfigured() &&
      !process.env.BREVO_API_KEY &&
      !process.env.SENDGRID_API_KEY &&
      /ECONNREFUSED|ETIMEDOUT|blocked|timeout/i.test(error.message)
    ) {
      console.error(
        "Hint: Render free tier blocks SMTP. Set BREVO_API_KEY + MAIL_FROM on Render.",
      );
    }
    throw error;
  }
}

module.exports = { sendEmail, logMailConfig, getMailMode };
