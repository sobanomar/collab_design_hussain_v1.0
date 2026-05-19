const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

function generateHtmlToSend(filePath, replacements) {
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  return template(replacements);
}

function getFromAddress() {
  return process.env.MAIL_FROM || process.env.MAIL_EMAIL;
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

function smtpConfigured() {
  return Boolean(
    process.env.MAIL_HOST &&
      process.env.MAIL_EMAIL &&
      process.env.MAIL_PASSWORD,
  );
}

async function sendViaSmtp({ to, subject, html }) {
  if (!smtpConfigured()) {
    throw new Error(
      "SMTP not configured. Set MAIL_HOST, MAIL_EMAIL, MAIL_PASSWORD on Render (or use SENDGRID_API_KEY).",
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
 * Prefer SENDGRID_API_KEY on Render free tier (SMTP ports 25/465/587 are blocked).
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
    console.warn("sendEmail: attachments are not supported with SendGrid API mode.");
  }

  const htmlBody =
    html == null ? generateHtmlToSend(filePath, replacements) : html;

  try {
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
      !process.env.SENDGRID_API_KEY &&
      /ECONNREFUSED|ETIMEDOUT|blocked|timeout/i.test(error.message)
    ) {
      console.error(
        "Hint: Render free tier blocks SMTP. Use SendGrid (SENDGRID_API_KEY) or upgrade Render.",
      );
    }
    throw error;
  }
}

module.exports = { sendEmail };
