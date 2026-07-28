import nodemailer from "nodemailer";
import dns from "node:dns";
import { EMAIL_CONFIG } from "../../config/emailConfig.js";

dns.lookup("smtp-relay.brevo.com", (err, address, family) => {
  console.log("DNS LOOKUP:");
  console.log({
    err,
    address,
    family,
  });
});

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  requireTLS: true,

  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,

  logger: true,
  debug: true,
});

(async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP VERIFIED");
  } catch (err) {
    console.error("❌ VERIFY FAILED");
    console.error(err);
  }
})();